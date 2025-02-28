/*
  # Create bookings table

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key)
      - `property_id` (uuid, foreign key to properties)
      - `room_id` (uuid, foreign key to rooms, nullable)
      - `user_id` (uuid, foreign key to users)
      - `check_in_date` (date)
      - `check_out_date` (date)
      - `guests` (integer)
      - `total_price` (numeric)
      - `status` (text) - 'pending', 'confirmed', 'cancelled', 'completed'
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on bookings table
    - Add policy for users to read their own bookings
    - Add policy for users to create bookings
    - Add policy for users to update their own bookings
    - Add policy for property owners to read bookings for their properties
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  room_id uuid REFERENCES rooms(id) ON DELETE SET NULL,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  check_in_date date NOT NULL,
  check_out_date date NOT NULL,
  guests integer NOT NULL,
  total_price numeric NOT NULL,
  status text NOT NULL DEFAULT 'confirmed',
  created_at timestamptz DEFAULT now(),
  CONSTRAINT check_dates CHECK (check_out_date > check_in_date)
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Policy for users to read their own bookings
CREATE POLICY "Users can read own bookings"
  ON bookings
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy for users to create bookings
CREATE POLICY "Users can create bookings"
  ON bookings
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to update their own bookings
CREATE POLICY "Users can update own bookings"
  ON bookings
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy for property owners to read bookings for their properties
CREATE POLICY "Property owners can read bookings for their properties"
  ON bookings
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = bookings.property_id
      AND properties.host_id = auth.uid()
    )
  );

-- Policy for admins to read all bookings
CREATE POLICY "Admins can read all bookings"
  ON bookings
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );