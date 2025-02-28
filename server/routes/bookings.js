import express from 'express';
import { supabase } from '../index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all bookings for the authenticated user
router.get('/my-bookings', authenticateToken, async (req, res) => {
  try {
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select(`
        *,
        properties(
          id,
          name,
          location,
          city,
          country,
          property_images(url)
        )
      `)
      .eq('user_id', req.user.id)
      .order('check_in_date', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Format the response
    const formattedBookings = bookings.map(booking => ({
      id: booking.id,
      checkInDate: booking.check_in_date,
      checkOutDate: booking.check_out_date,
      guests: booking.guests,
      totalPrice: booking.total_price,
      status: booking.status,
      createdAt: booking.created_at,
      property: {
        id: booking.properties.id,
        name: booking.properties.name,
        location: booking.properties.location,
        city: booking.properties.city,
        country: booking.properties.country,
        image: booking.properties.property_images[0]?.url || null
      }
    }));

    res.status(200).json(formattedBookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific booking by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const { data: booking, error } = await supabase
      .from('bookings')
      .select(`
        *,
        properties(
          *,
          property_images(url),
          rooms(*)
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Check if the booking belongs to the authenticated user
    if (booking.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to view this booking' });
    }

    // Format the response
    const formattedBooking = {
      id: booking.id,
      checkInDate: booking.check_in_date,
      checkOutDate: booking.check_out_date,
      guests: booking.guests,
      totalPrice: booking.total_price,
      status: booking.status,
      createdAt: booking.created_at,
      property: {
        id: booking.properties.id,
        name: booking.properties.name,
        description: booking.properties.description,
        location: booking.properties.location,
        city: booking.properties.city,
        country: booking.properties.country,
        type: booking.properties.type,
        pricePerNight: booking.properties.price_per_night,
        images: booking.properties.property_images.map(img => img.url),
        rooms: booking.properties.rooms.map(room => ({
          id: room.id,
          name: room.name,
          description: room.description,
          price: room.price_per_night,
          capacity: room.max_guests
        }))
      }
    };

    res.status(200).json(formattedBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new booking
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      propertyId,
      roomId,
      checkInDate,
      checkOutDate,
      guests,
      totalPrice
    } = req.body;

    // Check if the property exists
    const { data: property, error: propertyError } = await supabase
      .from('properties')
      .select('id, price_per_night')
      .eq('id', propertyId)
      .single();

    if (propertyError) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Check if the room exists if roomId is provided
    if (roomId) {
      const { data: room, error: roomError } = await supabase
        .from('rooms')
        .select('id, property_id')
        .eq('id', roomId)
        .eq('property_id', propertyId)
        .single();

      if (roomError) {
        return res.status(404).json({ error: 'Room not found or does not belong to the property' });
      }
    }

    // Check if the dates are available
    const { data: existingBookings, error: bookingError } = await supabase
      .from('bookings')
      .select('id')
      .eq('property_id', propertyId)
      .eq('status', 'confirmed')
      .or(`check_in_date.lte.${checkOutDate},check_out_date.gte.${checkInDate}`);

    if (bookingError) {
      return res.status(400).json({ error: bookingError.message });
    }

    if (existingBookings.length > 0) {
      return res.status(400).json({ error: 'The selected dates are not available' });
    }

    // Create the booking
    const { data: booking, error: createError } = await supabase
      .from('bookings')
      .insert([
        {
          property_id: propertyId,
          room_id: roomId,
          user_id: req.user.id,
          check_in_date: checkInDate,
          check_out_date: checkOutDate,
          guests,
          total_price: totalPrice,
          status: 'confirmed'
        }
      ])
      .select()
      .single();

    if (createError) {
      return res.status(400).json({ error: createError.message });
    }

    res.status(201).json({
      message: 'Booking created successfully',
      booking
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cancel a booking
router.put('/:id/cancel', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the booking exists and belongs to the user
    const { data: existingBooking, error: checkError } = await supabase
      .from('bookings')
      .select('user_id, status')
      .eq('id', id)
      .single();

    if (checkError) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Check if the booking belongs to the authenticated user
    if (existingBooking.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to cancel this booking' });
    }

    // Check if the booking is already cancelled
    if (existingBooking.status === 'cancelled') {
      return res.status(400).json({ error: 'Booking is already cancelled' });
    }

    // Update the booking status
    const { data: booking, error: updateError } = await supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      return res.status(400).json({ error: updateError.message });
    }

    res.status(200).json({
      message: 'Booking cancelled successfully',
      booking
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;