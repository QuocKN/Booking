import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, Users } from 'lucide-react';

const SearchForm: React.FC = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('');
  const [guests, setGuests] = useState('2 adults · 0 children · 1 room');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?destination=${encodeURIComponent(destination)}&dates=${encodeURIComponent(dates)}&guests=${encodeURIComponent(guests)}`);
  };
  
  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow-lg -mt-8 relative z-10 max-w-5xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Where are you going?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="pl-10 pr-3 py-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-booking-blue-light"
            required
          />
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Check-in — Check-out"
            value={dates}
            onChange={(e) => setDates(e.target.value)}
            className="pl-10 pr-3 py-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-booking-blue-light"
            required
          />
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Users size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="2 adults · 0 children · 1 room"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="pl-10 pr-3 py-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-booking-blue-light"
          />
        </div>
        
        <button 
          type="submit" 
          className="bg-booking-blue-light text-white font-bold py-3 px-6 rounded-md hover:bg-blue-800 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;