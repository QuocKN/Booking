import React from 'react';
import SearchForm from '../components/SearchForm';
import FeaturedDestinations from '../components/FeaturedDestinations';
import PropertyTypes from '../components/PropertyTypes';
import Deals from '../components/Deals';
import Newsletter from '../components/Newsletter';

const HomePage: React.FC = () => {
  return (
    <div>
      <section className="bg-booking-blue pt-8 pb-16">
        <div className="container-custom">
          <div className="text-white mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Find your next stay</h1>
            <p className="text-xl">Search deals on hotels, homes, and much more...</p>
          </div>
        </div>
      </section>
      
      <SearchForm />
      
      <div className="container-custom mt-12">
        <div className="bg-booking-yellow/20 border border-booking-yellow rounded-lg p-4 flex items-start">
          <div className="bg-booking-yellow rounded-full p-1 mr-3 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-lg">Get instant discounts</h3>
            <p>Simply sign in to your Booking.com account to save 10% or more with Genius rewards</p>
          </div>
        </div>
      </div>
      
      <FeaturedDestinations />
      <PropertyTypes />
      <Deals />
      <Newsletter />
    </div>
  );
};

export default HomePage;