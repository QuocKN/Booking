import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bed, PlaneTakeoff, Car, Construction as Attractions, CarTaxiFront as Taxi, Menu, X, User, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-booking-blue text-white">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">Booking.com</Link>
          
          <div className="hidden md:flex items-center space-x-4">
            <button className="border border-white rounded-md px-3 py-1 flex items-center space-x-1">
              <Globe size={16} />
              <span>EN</span>
            </button>
            <Link to="/help" className="hover:underline">Help</Link>
            
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 btn-secondary">
                  <User size={16} />
                  <span>{user.firstName}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 hidden group-hover:block">
                  <div className="py-2">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Profile</Link>
                    <Link to="/bookings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Bookings</Link>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link to="/register" className="btn-secondary">Register</Link>
                <Link to="/login" className="btn-secondary">Sign in</Link>
              </>
            )}
          </div>
          
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            {user ? (
              <>
                <div className="px-3 py-2 bg-booking-blue-light rounded mb-2">
                  <p className="font-semibold">Hello, {user.firstName}</p>
                  <p className="text-sm opacity-80">{user.email}</p>
                </div>
                <Link to="/profile" className="block py-2 hover:bg-booking-blue-light px-3 rounded">My Profile</Link>
                <Link to="/bookings" className="block py-2 hover:bg-booking-blue-light px-3 rounded">My Bookings</Link>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left py-2 hover:bg-booking-blue-light px-3 rounded"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/register" className="block btn-secondary w-full text-center">Register</Link>
                <Link to="/login" className="block btn-secondary w-full text-center">Sign in</Link>
              </>
            )}
            <Link to="/help" className="block py-2 hover:bg-booking-blue-light px-3 rounded">Help</Link>
            <button className="flex items-center space-x-2 py-2 hover:bg-booking-blue-light px-3 rounded w-full">
              <Globe size={16} />
              <span>English</span>
            </button>
          </div>
        )}
        
        <nav className="mt-4">
          <ul className="flex overflow-x-auto pb-2 space-x-6 text-sm">
            <li className="flex-shrink-0">
              <Link to="/stays" className="flex flex-col items-center hover:text-booking-yellow">
                <Bed size={20} />
                <span>Stays</span>
              </Link>
            </li>
            <li className="flex-shrink-0">
              <Link to="/flights" className="flex flex-col items-center hover:text-booking-yellow">
                <PlaneTakeoff size={20} />
                <span>Flights</span>
              </Link>
            </li>
            <li className="flex-shrink-0">
              <Link to="/car-rentals" className="flex flex-col items-center hover:text-booking-yellow">
                <Car size={20} />
                <span>Car rentals</span>
              </Link>
            </li>
            <li className="flex-shrink-0">
              <Link to="/attractions" className="flex flex-col items-center hover:text-booking-yellow">
                <Attractions size={20} />
                <span>Attractions</span>
              </Link>
            </li>
            <li className="flex-shrink-0">
              <Link to="/airport-taxis" className="flex flex-col items-center hover:text-booking-yellow">
                <Taxi size={20} />
                <span>Airport taxis</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;