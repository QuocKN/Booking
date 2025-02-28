/*
  # Create reviews table

  1. New Tables
    - `reviews`
      - `id` (uuid, primary key)
      - `property_id` (uuid, foreign key to properties)
      - `user_id` (uuid, foreign key to users)
      - `booking_id` (uuid, foreign key to bookings)
      - `rating` (integer) - 1 to 5
      - `comment` (text)
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on reviews table
    - Add policy for anyone to read reviews
    - Add policy for users to create reviews for their bookings
    - Add policy for users to update their own reviews
    - Add policy for users to delete their own reviews
*/

CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  booking_id uuid REFERENCES bookings(id) ON DELETE SET NULL,
  rating integer NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(booking_id) -- One review per booking
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Policy for anyone to read reviews
CREATE POLICY "Anyone can read reviews"
  ON reviews
  FOR SELECT
  USING (true);

-- Policy for users to create reviews for their bookings
CREATE POLICY "Users can create reviews for their bookings"
  ON reviews
  FOR INSERT
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM bookings
      WHERE bookings.id = reviews.booking_id
      AND bookings.user_id = auth.uid()
      AND bookings.status = 'completed'
    )
  );

-- Policy for users to update their own reviews
CREATE POLICY "Users can update their own reviews"
  ON reviews
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy for users to delete their own reviews
CREATE POLICY "Users can delete their own reviews"
  ON reviews
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to update property rating when a review is added, updated, or deleted
CREATE OR REPLACE FUNCTION update_property_rating()
RETURNS TRIGGER AS $$
BEGIN
  -- Update the property's rating and review count
  IF TG_OP = 'INSERT' THEN
    UPDATE properties
    SET 
      rating = (
        SELECT COALESCE(AVG(rating), 0)
        FROM reviews
        WHERE property_id = NEW.property_id
      ),
      review_count = (
        SELECT COUNT(*)
        FROM reviews
        WHERE property_id = NEW.property_id
      )
    WHERE id = NEW.property_id;
  ELSIF TG_OP = 'UPDATE' THEN
    UPDATE properties
    SET 
      rating = (
        SELECT COALESCE(AVG(rating), 0)
        FROM reviews
        WHERE property_id = NEW.property_id
      )
    WHERE id = NEW.property_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE properties
    SET 
      rating = (
        SELECT COALESCE(AVG(rating), 0)
        FROM reviews
        WHERE property_id = OLD.property_id
      ),
      review_count = (
        SELECT COUNT(*)
        FROM reviews
        WHERE property_id = OLD.property_id
      )
    WHERE id = OLD.property_id;
  END IF;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to call the function
CREATE TRIGGER after_review_insert
AFTER INSERT ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_property_rating();

CREATE TRIGGER after_review_update
AFTER UPDATE ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_property_rating();

CREATE TRIGGER after_review_delete
AFTER DELETE ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_property_rating();