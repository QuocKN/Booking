/*
  # Create properties table and related tables

  1. New Tables
    - `properties`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `location` (text)
      - `city` (text)
      - `country` (text)
      - `type` (text)
      - `price_per_night` (numeric)
      - `max_guests` (integer)
      - `bedrooms` (integer)
      - `beds` (integer)
      - `bathrooms` (numeric)
      - `host_id` (uuid, foreign key to users)
      - `rating` (numeric)
      - `review_count` (integer)
      - `created_at` (timestamptz)
    
    - `property_images`
      - `id` (uuid, primary key)
      - `property_id` (uuid, foreign key to properties)
      - `url` (text)
      - `created_at` (timestamptz)
    
    - `amenities`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `created_at` (timestamptz)
    
    - `property_amenities`
      - `id` (uuid, primary key)
      - `property_id` (uuid, foreign key to properties)
      - `amenity_id` (uuid, foreign key to amenities)
      - `created_at` (timestamptz)
    
    - `rooms`
      - `id` (uuid, primary key)
      - `property_id` (uuid, foreign key to properties)
      - `name` (text)
      - `description` (text)
      - `price_per_night` (numeric)
      - `max_guests` (integer)
      - `amenities` (text[])
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on all tables
    - Add policies for reading properties
    - Add policies for property owners to manage their properties
    - Add policies for admins to manage all properties
*/

-- Properties table
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  city text NOT NULL,
  country text NOT NULL,
  type text NOT NULL,
  price_per_night numeric NOT NULL,
  max_guests integer NOT NULL,
  bedrooms integer NOT NULL,
  beds integer NOT NULL,
  bathrooms numeric NOT NULL,
  host_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating numeric DEFAULT 0,
  review_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Property images table
CREATE TABLE IF NOT EXISTS property_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Amenities table
CREATE TABLE IF NOT EXISTS amenities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Property amenities table
CREATE TABLE IF NOT EXISTS property_amenities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  amenity_id uuid NOT NULL REFERENCES amenities(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(property_id, amenity_id)
);

-- Rooms table
CREATE TABLE IF NOT EXISTS rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text NOT NULL,
  price_per_night numeric NOT NULL,
  max_guests integer NOT NULL,
  amenities text[],
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;

-- Policies for properties
CREATE POLICY "Anyone can read properties"
  ON properties
  FOR SELECT
  USING (true);

CREATE POLICY "Hosts can insert their own properties"
  ON properties
  FOR INSERT
  WITH CHECK (auth.uid() = host_id);

CREATE POLICY "Hosts can update their own properties"
  ON properties
  FOR UPDATE
  USING (auth.uid() = host_id);

CREATE POLICY "Hosts can delete their own properties"
  ON properties
  FOR DELETE
  USING (auth.uid() = host_id);

-- Policies for property_images
CREATE POLICY "Anyone can read property images"
  ON property_images
  FOR SELECT
  USING (true);

CREATE POLICY "Hosts can manage their property images"
  ON property_images
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = property_images.property_id
      AND properties.host_id = auth.uid()
    )
  );

-- Policies for amenities
CREATE POLICY "Anyone can read amenities"
  ON amenities
  FOR SELECT
  USING (true);

-- Only admins can manage amenities (insert, update, delete)
CREATE POLICY "Admins can manage amenities"
  ON amenities
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

-- Policies for property_amenities
CREATE POLICY "Anyone can read property amenities"
  ON property_amenities
  FOR SELECT
  USING (true);

CREATE POLICY "Hosts can manage their property amenities"
  ON property_amenities
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = property_amenities.property_id
      AND properties.host_id = auth.uid()
    )
  );

-- Policies for rooms
CREATE POLICY "Anyone can read rooms"
  ON rooms
  FOR SELECT
  USING (true);

CREATE POLICY "Hosts can manage their rooms"
  ON rooms
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = rooms.property_id
      AND properties.host_id = auth.uid()
    )
  );

-- Insert common amenities
INSERT INTO amenities (name) VALUES
  ('Free WiFi'),
  ('Air conditioning'),
  ('Heating'),
  ('TV'),
  ('Kitchen'),
  ('Washing machine'),
  ('Free parking'),
  ('Pool'),
  ('Hot tub'),
  ('Gym'),
  ('Breakfast included'),
  ('Pets allowed'),
  ('Smoking allowed'),
  ('Elevator'),
  ('Wheelchair accessible')
ON CONFLICT (name) DO NOTHING;