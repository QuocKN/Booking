import React from 'react';
import PropertyCard from './PropertyCard';

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

const properties: Property[] = [
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
  }
];

const Deals: React.FC = () => {
  return (
    <section className="py-12">
      <div className="container-custom">
        <h2 className="text-2xl font-bold mb-6">Deals and special offers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property) => (
            <PropertyCard 
              key={property.id}
              {...property}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Deals;