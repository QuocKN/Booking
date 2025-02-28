import React from 'react';
import { Link } from 'react-router-dom';
import { Building, Home, Building2, Warehouse, Trees, Hotel } from 'lucide-react';

interface PropertyType {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
}

const propertyTypes: PropertyType[] = [
  {
    id: '1',
    name: 'Hotels',
    icon: <Hotel size={24} className="text-booking-blue" />,
    count: 856234
  },
  {
    id: '2',
    name: 'Apartments',
    icon: <Building size={24} className="text-booking-blue" />,
    count: 753912
  },
  {
    id: '3',
    name: 'Resorts',
    icon: <Building2 size={24} className="text-booking-blue" />,
    count: 142567
  },
  {
    id: '4',
    name: 'Villas',
    icon: <Home size={24} className="text-booking-blue" />,
    count: 423891
  },
  {
    id: '5',
    name: 'Cabins',
    icon: <Trees size={24} className="text-booking-blue" />,
    count: 98765
  },
  {
    id: '6',
    name: 'Cottages',
    icon: <Warehouse size={24} className="text-booking-blue" />,
    count: 123456
  }
];

const PropertyTypes: React.FC = () => {
  return (
    <section className="py-12">
      <div className="container-custom">
        <h2 className="text-2xl font-bold mb-6">Browse by property type</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {propertyTypes.map((type) => (
            <Link 
              key={type.id}
              to={`/search?type=${encodeURIComponent(type.name)}`}
              className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow text-center"
            >
              <div className="flex justify-center mb-3">
                {type.icon}
              </div>
              <h3 className="font-semibold">{type.name}</h3>
              <p className="text-sm text-gray-600">{type.count.toLocaleString()} properties</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyTypes;