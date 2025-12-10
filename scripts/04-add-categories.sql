-- Add categories table for Music, Arts, Dance, etc.
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  color VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert categories
INSERT INTO categories (name, description, icon, color) VALUES
('Music', 'Music production, composition, and performance', 'music', 'purple'),
('Arts', 'Visual arts, illustration, and creative design', 'palette', 'pink'),
('Dance', 'Dance choreography and performance', 'dance', 'red'),
('Development', 'Software and web development', 'code', 'blue'),
('Design', 'UI/UX and graphic design', 'design', 'cyan'),
('Writing', 'Content writing and storytelling', 'pen-tool', 'orange'),
('Photography', 'Photography and videography', 'camera', 'amber'),
('Business', 'Entrepreneurship and business strategy', 'briefcase', 'green')
ON CONFLICT (name) DO NOTHING;

-- Add columns to users table if they don't exist
ALTER TABLE users ADD COLUMN IF NOT EXISTS category_id INTEGER REFERENCES categories(id);
ALTER TABLE users ADD COLUMN IF NOT EXISTS highlights TEXT[] DEFAULT '{}';
ALTER TABLE users ADD COLUMN IF NOT EXISTS rating DECIMAL(3,2) DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS total_ratings INTEGER DEFAULT 0;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_category_id ON users(category_id);
CREATE INDEX IF NOT EXISTS idx_users_rating ON users(rating DESC);
