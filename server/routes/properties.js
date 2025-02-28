import express from 'express';
import { supabase } from '../index.js';
import { authenticateToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all properties with optional filtering
router.get('/', async (req, res) => {
  try {
    const { 
      destination, 
      type, 
      minPrice, 
      maxPrice, 
      rating,
      checkIn,
      checkOut,
      guests,
      limit = 20,
      page = 1
    } = req.query;

    let query = supabase
      .from('properties')
      .select('*, property_images(url), property_amenities(amenity_id, amenities(name))', { count: 'exact' });

    // Apply filters if provided
    if (destination) {
      query = query.or(`location.ilike.%${destination}%,city.ilike.%${destination}%,country.ilike.%${destination}%`);
    }

    if (type) {
      query = query.eq('type', type);
    }

    if (minPrice) {
      query = query.gte('price_per_night', minPrice);
    }

    if (maxPrice) {
      query = query.lte('price_per_night', maxPrice);
    }

    if (rating) {
      query = query.gte('rating', rating);
    }

    // Pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    
    query = query.range(from, to);

    const { data: properties, error, count } = await query;

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Format the response
    const formattedProperties = properties.map(property => ({
      id: property.id,
      name: property.name,
      description: property.description,
      location: property.location,
      city: property.city,
      country: property.country,
      type: property.type,
      pricePerNight: property.price_per_night,
      rating: property.rating,
      reviewCount: property.review_count,
      images: property.property_images.map(img => img.url),
      amenities: property.property_amenities.map(item => item.amenities.name),
      maxGuests: property.max_guests,
      bedrooms: property.bedrooms,
      beds: property.beds,
      bathrooms: property.bathrooms,
      host_id: property.host_id,
      created_at: property.created_at
    }));

    res.status(200).json({
      properties: formattedProperties,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get property by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { data: property, error } = await supabase
      .from('properties')
      .select('*, property_images(url), property_amenities(amenity_id, amenities(name)), rooms(*), reviews(*, users(first_name, last_name))')
      .eq('id', id)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Format the response
    const formattedProperty = {
      id: property.id,
      name: property.name,
      description: property.description,
      location: property.location,
      city: property.city,
      country: property.country,
      type: property.type,
      pricePerNight: property.price_per_night,
      rating: property.rating,
      reviewCount: property.review_count,
      images: property.property_images.map(img => img.url),
      amenities: property.property_amenities.map(item => item.amenities.name),
      maxGuests: property.max_guests,
      bedrooms: property.bedrooms,
      beds: property.beds,
      bathrooms: property.bathrooms,
      host_id: property.host_id,
      created_at: property.created_at,
      rooms: property.rooms.map(room => ({
        id: room.id,
        name: room.name,
        description: room.description,
        price: room.price_per_night,
        capacity: room.max_guests,
        amenities: room.amenities || []
      })),
      reviews: property.reviews.map(review => ({
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        created_at: review.created_at,
        user: {
          firstName: review.users.first_name,
          lastName: review.users.last_name
        }
      }))
    };

    res.status(200).json(formattedProperty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new property (requires authentication)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      name,
      description,
      location,
      city,
      country,
      type,
      pricePerNight,
      maxGuests,
      bedrooms,
      beds,
      bathrooms,
      images,
      amenities
    } = req.body;

    // Insert property
    const { data: property, error: propertyError } = await supabase
      .from('properties')
      .insert([
        {
          name,
          description,
          location,
          city,
          country,
          type,
          price_per_night: pricePerNight,
          max_guests: maxGuests,
          bedrooms,
          beds,
          bathrooms,
          host_id: req.user.id,
          rating: 0,
          review_count: 0
        }
      ])
      .select()
      .single();

    if (propertyError) {
      return res.status(400).json({ error: propertyError.message });
    }

    // Insert images
    if (images && images.length > 0) {
      const imageInserts = images.map(url => ({
        property_id: property.id,
        url
      }));

      const { error: imagesError } = await supabase
        .from('property_images')
        .insert(imageInserts);

      if (imagesError) {
        return res.status(400).json({ error: imagesError.message });
      }
    }

    // Insert amenities
    if (amenities && amenities.length > 0) {
      // First, get amenity IDs
      const { data: amenityData, error: amenityError } = await supabase
        .from('amenities')
        .select('id, name')
        .in('name', amenities);

      if (amenityError) {
        return res.status(400).json({ error: amenityError.message });
      }

      // Map amenity names to IDs
      const amenityMap = amenityData.reduce((acc, item) => {
        acc[item.name] = item.id;
        return acc;
      }, {});

      // Insert property amenities
      const amenityInserts = amenities
        .filter(name => amenityMap[name]) // Only include amenities that exist
        .map(name => ({
          property_id: property.id,
          amenity_id: amenityMap[name]
        }));

      if (amenityInserts.length > 0) {
        const { error: amenitiesError } = await supabase
          .from('property_amenities')
          .insert(amenityInserts);

        if (amenitiesError) {
          return res.status(400).json({ error: amenitiesError.message });
        }
      }
    }

    res.status(201).json({
      message: 'Property created successfully',
      propertyId: property.id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a property (requires authentication)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      location,
      city,
      country,
      type,
      pricePerNight,
      maxGuests,
      bedrooms,
      beds,
      bathrooms
    } = req.body;

    // Check if property exists and belongs to the user
    const { data: existingProperty, error: checkError } = await supabase
      .from('properties')
      .select('host_id')
      .eq('id', id)
      .single();

    if (checkError) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Check if user is the owner or an admin
    if (existingProperty.host_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to update this property' });
    }

    // Update property
    const { data: property, error: updateError } = await supabase
      .from('properties')
      .update({
        name,
        description,
        location,
        city,
        country,
        type,
        price_per_night: pricePerNight,
        max_guests: maxGuests,
        bedrooms,
        beds,
        bathrooms
      })
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      return res.status(400).json({ error: updateError.message });
    }

    res.status(200).json({
      message: 'Property updated successfully',
      property
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a property (requires authentication)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if property exists and belongs to the user
    const { data: existingProperty, error: checkError } = await supabase
      .from('properties')
      .select('host_id')
      .eq('id', id)
      .single();

    if (checkError) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Check if user is the owner or an admin
    if (existingProperty.host_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to delete this property' });
    }

    // Delete property (this will cascade delete related records due to foreign key constraints)
    const { error: deleteError } = await supabase
      .from('properties')
      .delete()
      .eq('id', id);

    if (deleteError) {
      return res.status(400).json({ error: deleteError.message });
    }

    res.status(200).json({
      message: 'Property deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;