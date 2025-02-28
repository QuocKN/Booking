import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 pt-10 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/help" className="hover:underline">Help Center</Link></li>
              <li><Link to="/safety" className="hover:underline">Safety Information</Link></li>
              <li><Link to="/cancellation" className="hover:underline">Cancellation Options</Link></li>
              <li><Link to="/covid" className="hover:underline">COVID-19 Response</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Destinations</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/countries" className="hover:underline">Countries</Link></li>
              <li><Link to="/regions" className="hover:underline">Regions</Link></li>
              <li><Link to="/cities" className="hover:underline">Cities</Link></li>
              <li><Link to="/districts" className="hover:underline">Districts</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Property Types</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/hotels" className="hover:underline">Hotels</Link></li>
              <li><Link to="/apartments" className="hover:underline">Apartments</Link></li>
              <li><Link to="/resorts" className="hover:underline">Resorts</Link></li>
              <li><Link to="/villas" className="hover:underline">Villas</Link></li>
              <li><Link to="/hostels" className="hover:underline">Hostels</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">For Travelers</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/reviews" className="hover:underline">Reviews</Link></li>
              <li><Link to="/community" className="hover:underline">Community</Link></li>
              <li><Link to="/seasonal" className="hover:underline">Seasonal Deals</Link></li>
              <li><Link to="/travel-articles" className="hover:underline">Travel Articles</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">For Partners</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/partners" className="hover:underline">Partner Help</Link></li>
              <li><Link to="/list-property" className="hover:underline">List Your Property</Link></li>
              <li><Link to="/partner-hub" className="hover:underline">Partner Hub</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-300 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Booking.com Clone. This is a demo project.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;