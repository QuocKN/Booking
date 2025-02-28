import React, { useState } from 'react';
import { Mail } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };
  
  return (
    <section className="py-12 bg-booking-blue text-white">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <Mail size={40} className="mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-3">Save time, save money!</h2>
          <p className="mb-6">Sign up and we'll send the best deals to you</p>
          
          {subscribed ? (
            <div className="bg-white text-booking-blue p-4 rounded-lg">
              <p className="font-semibold">Thank you for subscribing!</p>
              <p className="text-sm">We'll send you the best travel deals soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow py-3 px-4 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-booking-yellow"
                required
              />
              <button 
                type="submit"
                className="btn-secondary py-3 px-6"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;