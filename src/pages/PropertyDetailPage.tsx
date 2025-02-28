import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, Check, X, Calendar, Users, Heart, Share2 } from 'lucide-react';

interface Property {
  id: string;
  name: string;
  images: string[];
  location: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  features: string[];
  rooms: Room[];
}

interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  capacity: number;
  amenities: string[];
}

// Mock data for property details
const mockProperty: Property = {
  id: '1',
  name: 'Grand Hotel Plaza',
  images: [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  ],
  location: 'New York, USA',
  description: 'Luxury hotel in the heart of Manhattan with stunning views of Central Park. The Grand Hotel Plaza offers a perfect blend of elegance and comfort, with spacious rooms, world-class dining, and exceptional service. Guests can enjoy the rooftop pool, fitness center, and spa facilities. Located just minutes away from major attractions, shopping, and dining options.',
  price: 299,
  rating: 4.8,
  reviewCount: 1243,
  features: [
    'Free WiFi',
    'Spa and wellness center',
    'Swimming pool',
    'Fitness center',
    'Restaurant',
    'Room service',
    'Bar',
    'Breakfast available',
    'Air conditioning',
    'Non-smoking rooms'
  ],
  rooms: [
    {
      id: 'r1',
      name: 'Deluxe King Room',
      description: 'Spacious room with king-size bed, city view, and luxury amenities.',
      price: 299,
      capacity: 2,
      amenities: ['King bed', 'City view', 'Free WiFi', 'Flat-screen TV', 'Mini bar', 'Coffee machine']
    },
    {
      id: 'r2',
      name: 'Executive Suite',
      description: 'Luxurious suite with separate living area and panoramic views of the city.',
      price: 499,
      capacity: 2,
      amenities: ['King bed', 'Separate living area', 'Panoramic view', 'Free WiFi', 'Flat-screen TV', 'Mini bar', 'Coffee machine', 'Bathtub']
    },
    {
      id: 'r3',
      name: 'Family Room',
      description: 'Comfortable room for families with two queen beds and extra space.',
      price: 399,
      capacity: 4,
      amenities: ['Two queen beds', 'City view', 'Free WiFi', 'Flat-screen TV', 'Mini bar', 'Coffee machine']
    }
  ]
};

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');
  const [dates, setDates] = useState('');
  const [guests, setGuests] = useState('2 adults · 0 children · 1 room');
  
  useEffect(() => {
    // Simulate API call with a delay
    const timer = setTimeout(() => {
      setProperty(mockProperty);
      setMainImage(mockProperty.images[0]);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  if (loading) {
    return (
      <div className="container-custom py-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-booking-blue mx-auto mb-4"></div>
        <p className="text-gray-600">Loading property details...</p>
      </div>
    );
  }
  
  if (!property) {
    return (
      <div className="container-custom py-12 text-center">
        <p className="text-xl mb-4">Property not found</p>
        <Link to="/" className="btn-primary">Return to home</Link>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-100 pb-12">
      <div className="bg-white shadow-md">
        <div className="container-custom py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{property.name}</h1>
              <p className="flex items-center text-gray-600 mt-1">
                <MapPin size={16} className="mr-1" />
                {property.location}
              </p>
            </div>
            
            <div className="flex items-center mt-4 md:mt-0 space-x-4">
              <button className="flex items-center text-booking-blue hover:text-booking-blue-light">
                <Heart size={20} className="mr-1" />
                <span className="hidden md:inline">Save</span>
              </button>
              <button className="flex items-center text-booking-blue hover:text-booking-blue-light">
                <Share2 size={20} className="mr-1" />
                <span className="hidden md:inline">Share</span>
              </button>
              <div className="flex items-center">
                <div className="bg-booking-blue text-white px-2 py-1 rounded font-bold">
                  {property.rating.toFixed(1)}
                </div>
                <div className="ml-2">
                  <div className="font-semibold">Excellent</div>
                  <div className="text-sm text-gray-600">{property.reviewCount} reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container-custom py-6">
        {/* Image gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-8">
          <div className="md:col-span-2 md:row-span-2">
            <img 
              src={mainImage} 
              alt={property.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          {property.images.slice(1, 5).map((image, index) => (
            <div key={index} onClick={() => setMainImage(image)}>
              <img 
                src={image} 
                alt={`${property.name} ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
              />
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Property details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">About this property</h2>
              <p className="mb-6">{property.description}</p>
              
              <h3 className="text-xl font-semibold mb-3">Property features</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check size={16} className="text-green-600 mr-2" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">Available rooms</h2>
              
              {property.rooms.map((room) => (
                <div key={room.id} className="border-b last:border-b-0 pb-6 mb-6 last:pb-0 last:mb-0">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div>
                      <h3 className="text-xl font-semibold">{room.name}</h3>
                      <p className="text-gray-600 mt-1">{room.description}</p>
                      
                      <div className="mt-3">
                        <p className="font-semibold">Room amenities:</p>
                        <div className="grid grid-cols-2 gap-y-1 gap-x-4 mt-2">
                          {room.amenities.map((amenity, index) => (
                            <div key={index} className="flex items-center text-sm">
                              <Check size={14} className="text-green-600 mr-1" />
                              <span>{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0 md:ml-4 md:text-right">
                      <p className="text-2xl font-bold">${room.price}</p>
                      <p className="text-gray-600 text-sm">per night</p>
                      <button className="btn-primary mt-3 w-full md:w-auto">
                        Reserve
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right column - Booking form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-xl font-bold mb-4">Price for your stay</h3>
              
              <div className="border rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-semibold">Check-in / Check-out</div>
                  <Calendar size={18} className="text-gray-500" />
                </div>
                <input
                  type="text"
                  placeholder="Add dates"
                  value={dates}
                  onChange={(e) => setDates(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 mb-3"
                />
                
                <div className="flex justify-between items-center mb-2">
                  <div className="font-semibold">Guests</div>
                  <Users size={18} className="text-gray-500" />
                </div>
                <input
                  type="text"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              
              <div className="bg-booking-blue/10 rounded-lg p-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span>$299 x 1 night</span>
                  <span>$299</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Service fee</span>
                  <span>$30</span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t">
                  <span>Total</span>
                  <span>$329</span>
                </div>
              </div>
              
              <button className="btn-primary w-full mb-4">
                Reserve
              </button>
              
              <p className="text-center text-sm text-gray-600">
                You won't be charged yet
              </p>
              
              <div className="mt-4 text-sm text-gray-600">
                <div className="flex items-start mb-2">
                  <Check size={16} className="text-green-600 mr-2 mt-0.5" />
                  <span>Free cancellation before June 15</span>
                </div>
                <div className="flex items-start">
                  <Check size={16} className="text-green-600 mr-2 mt-0.5" />
                  <span>No payment needed today – pay when you stay</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;