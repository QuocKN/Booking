import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

interface PropertyCardProps {
  id: string;
  name: string;
  image: string;
  location: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  name,
  image,
  location,
  description,
  price,
  rating,
  reviewCount,
}) => {
  return (
    <Link to={`/property/${id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="h-48 overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg text-booking-blue">{name}</h3>
          <p className="text-gray-600 text-sm mb-2">{location}</p>
          <p className="text-gray-700 text-sm mb-3 line-clamp-2">{description}</p>
          
          <div className="flex justify-between items-end">
            <div>
              <div className="flex items-center mb-1">
                <div className="bg-booking-blue text-white px-1 py-0.5 rounded text-xs font-bold flex items-center mr-2">
                  <span>{rating.toFixed(1)}</span>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      size={14} 
                      className={i < Math.round(rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-600 ml-1">({reviewCount})</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold">${price}</p>
              <p className="text-gray-600 text-xs">per night</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;