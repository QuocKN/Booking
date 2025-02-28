# Booking.com Clone

A full-stack booking platform clone built with React, Node.js, Express, and Supabase.

## Features

- User authentication (register, login, profile management)
- Property listings with search and filtering
- Property details with rooms, amenities, and reviews
- Booking system with date selection and guest management
- User reviews and ratings
- Responsive design for all devices

## Tech Stack

### Frontend
- React with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Lucide React for icons
- Context API for state management

### Backend
- Node.js with Express
- Supabase for database and authentication
- JWT for token-based authentication
- RESTful API architecture

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Supabase account

### Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   PORT=3001
   JWT_SECRET=your_jwt_secret_key
   ```

4. Run the database migrations:
   - Connect to Supabase using the "Connect to Supabase" button
   - The migrations will create all necessary tables and relationships

5. Start the development server:
   ```
   npm run dev:full
   ```

## Project Structure

```
booking-clone/
├── public/              # Static assets
├── server/              # Backend code
│   ├── index.js         # Server entry point
│   ├── middleware/      # Express middleware
│   └── routes/          # API routes
├── src/                 # Frontend code
│   ├── components/      # React components
│   ├── context/         # React context providers
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── App.tsx          # Main App component
│   └── main.tsx         # Entry point
├── supabase/            # Supabase migrations
│   └── migrations/      # SQL migration files
└── package.json         # Project dependencies
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user

### Properties
- `GET /api/properties` - Get all properties with optional filtering
- `GET /api/properties/:id` - Get a specific property by ID
- `POST /api/properties` - Create a new property (requires authentication)
- `PUT /api/properties/:id` - Update a property (requires authentication)
- `DELETE /api/properties/:id` - Delete a property (requires authentication)

### Bookings
- `GET /api/bookings/my-bookings` - Get all bookings for the authenticated user
- `GET /api/bookings/:id` - Get a specific booking by ID
- `POST /api/bookings` - Create a new booking
- `PUT /api/bookings/:id/cancel` - Cancel a booking

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/change-password` - Change user password

## License

This project is for educational purposes only.