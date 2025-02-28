import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
export const supabase = createClient(supabaseUrl, supabaseKey);

// API URL
const API_URL = 'http://localhost:3001/api';

// Helper function for making API requests
const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }
  
  return data;
};

// Auth API
export const authApi = {
  register: (userData: any) => 
    fetchApi('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
    
  login: (credentials: any) => 
    fetchApi('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
};

// Properties API
export const propertiesApi = {
  getAll: (params: any = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value as string);
      }
    });
    
    return fetchApi(`/properties?${queryParams.toString()}`);
  },
  
  getById: (id: string) => 
    fetchApi(`/properties/${id}`),
    
  create: (propertyData: any) => 
    fetchApi('/properties', {
      method: 'POST',
      body: JSON.stringify(propertyData),
    }),
    
  update: (id: string, propertyData: any) => 
    fetchApi(`/properties/${id}`, {
      method: 'PUT',
      body: JSON.stringify(propertyData),
    }),
    
  delete: (id: string) => 
    fetchApi(`/properties/${id}`, {
      method: 'DELETE',
    }),
};

// Bookings API
export const bookingsApi = {
  getMyBookings: () => 
    fetchApi('/bookings/my-bookings'),
    
  getById: (id: string) => 
    fetchApi(`/bookings/${id}`),
    
  create: (bookingData: any) => 
    fetchApi('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    }),
    
  cancel: (id: string) => 
    fetchApi(`/bookings/${id}/cancel`, {
      method: 'PUT',
    }),
};

// Users API
export const usersApi = {
  getProfile: () => 
    fetchApi('/users/profile'),
    
  updateProfile: (profileData: any) => 
    fetchApi('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    }),
    
  changePassword: (passwordData: any) => 
    fetchApi('/users/change-password', {
      method: 'PUT',
      body: JSON.stringify(passwordData),
    }),
};