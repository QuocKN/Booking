import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, MapPin, Star, X } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';

interface Property {
  id: string;
  name: string;
  image: string;
  location: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
}

// Mock data for search results
const mockProperties: Property[] = [
  {
    id: '1',
    name: 'Grand Hotel Plaza',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'New York, USA',
    description: 'Luxury hotel in the heart of Manhattan with stunning views of Central Park.',
    price: 299,
    rating: 4.8,
    reviewCount: 1243
  },
  {
    id: '2',
    name: 'Seaside Resort & Spa',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'Miami, USA',
    description: 'Beachfront resort with private access to the ocean and full-service spa.',
    price: 349,
    rating: 4.7,
    reviewCount: 876
  },
  {
    id: '3',
    name: 'Mountain View Lodge',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'Aspen, USA',
    description: 'Cozy lodge with breathtaking mountain views and ski-in/ski-out access.',
    price: 249,
    rating: 4.6,
    reviewCount: 654
  },
  {
    id: '4',
    name: 'Urban Boutique Hotel',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'San Francisco, USA',
    description: 'Stylish boutique hotel in downtown with modern amenities and rooftop bar.',
    price: 279,
    rating: 4.5,
    reviewCount: 432
  },
  {
    id: '5',
    name: 'Riverside Inn',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'Chicago, USA',
    description: 'Charming inn located along the river with beautiful views and cozy rooms.',
    price: 189,
    rating: 4.3,
    reviewCount: 321
  },
  {
    id: '6',
    name: 'Desert Oasis Resort',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'Phoenix, USA',
    description: 'Luxurious desert resort with multiple pools, spa services, and golf courses.',
    price: 319,
    rating: 4.9,
    reviewCount: 567
  }
];

const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  const destination = searchParams.get('destination') || '';
  const dates = searchParams.get('dates') || '';
  const guests = searchParams.get('guests') || '';
  
  useEffect(() => {
    // Simulate API call with a delay
    const timer = setTimeout(() => {
      setProperties(mockProperties);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [destination]);
  
  return (
    <div className="bg-gray-100 min-h-screen pb-12">
      <div className="bg-booking-blue py-4">
        <div className="container-custom">
          <h1 className="text-white text-2xl font-bold">
            {destination ? `Properties in ${destination}` : 'Search Results'}
          </h1>
          {dates && (
            <p className="text-white text-sm mt-1">
              {dates} · {guests}
            </p>
          )}
        </div>
      </div>
      
      <div className="container-custom py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar */}
          <div className={`md:w-1/4 bg-white rounded-lg shadow-md p-4 ${filtersOpen ? 'block' : 'hidden md:block'}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">Filters</h2>
              <button 
                className="md:hidden"
                onClick={() => setFiltersOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3">Your budget (per night)</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>$0 - $100</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>$100 - $200</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>$200 - $300</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>$300+</span>
                </label>
              </div>
            </div>
            
            <div className="border-t pt-4 mt-4">
              <h3 className="font-semibold mb-3">Star rating</h3>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button 
                    key={star}
                    className="border border-gray-300 rounded px-3 py-1 flex items-center hover:border-booking-blue"
                  >
                    {star} <Star size={14} className="ml-1 fill-yellow-500 text-yellow-500" />
                  </button>
                ))}
              </div>
            </div>
            
            <div className="border-t pt-4 mt-4">
              <h3 className="font-semibold mb-3">Property type</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>Hotels</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>Apartments</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>Resorts</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>Villas</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>Cabins</span>
                </label>
              </div>
            </div>
            
            <div className="border-t pt-4 mt-4">
              <h3 className="font-semibold mb-3">Facilities</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>Breakfast included</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>Free WiFi</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>Pool</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>Free parking</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>Air conditioning</span>
                </label>
              </div>
            </div>
          </div>
          
          {/* Mobile filter button */}
          <button 
            className="md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10 bg-booking-blue text-white py-2 px-4 rounded-full shadow-lg flex items-center"
            onClick={() => setFiltersOpen(true)}
          >
            <Filter size={18} className="mr-2" />
            Filters
          </button>
          
          {/* Results */}
          <div className="md:w-3/4">
            {loading ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-booking-blue mx-auto mb-4"></div>
                <p className="text-gray-600">Finding the best properties for you...</p>
              </div>
            ) : properties.length > 0 ? (
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                  <p className="text-lg">
                    <span className="font-bold">{properties.length}</span> properties found
                    {destination && <span> in <span className="font-semibold">{destination}</span></span>}
                  </p>
                </div>
                
                {properties.map((property) => (
                  <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="md:flex">
                      <div className="md:w-1/3 h-48 md:h-auto">
                        <img 
                          src={property.image} 
                          alt={property.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-4 flex flex-col">
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <h2 className="text-xl font-bold text-booking-blue">{property.name}</h2>
                            <div className="flex items-center">
                              <div className="bg-booking-blue text-white px-2 py-1 rounded font-bold mr-2">
                                {property.rating.toFixed(1)}
                              </div>
                              <div className="text-sm text-gray-600">
                                {property.reviewCount} reviews
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 flex items-center mt-1">
                            <MapPin size={14} className="mr-1" />
                            {property.location}
                          </p>
                          
                          <p className="mt-3">{property.description}</p>
                        </div>
                        
                        <div className="flex justify-between items-end mt-4">
                          <div className="text-sm text-green-600 font-semibold">
                            Free cancellation • No prepayment needed
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold">${property.price}</p>
                            <p className="text-gray-600 text-sm">per night</p>
                            <button className="btn-primary mt-2">
                              See availability
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-xl mb-4">No properties found</p>
                <p className="text-gray-600">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;