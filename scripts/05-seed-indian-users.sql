-- Seed 10 Indian users with Music, Arts, and Dance categories
INSERT INTO users (email, name, bio, experience_level, category_id, highlights, rating, total_ratings, availability_status)
VALUES
('arjun.sharma@teamforge.com', 'Arjun Sharma', 'Electronic music producer and beat maker. Creating ambient and house music.', 'advanced', 
  (SELECT id FROM categories WHERE name = 'Music'), 
  ARRAY['Grammy Nominated', '500K+ Streams', 'Music Tech Enthusiast'], 4.8, 156, 'available'),
  
('priya.kapoor@teamforge.com', 'Priya Kapoor', 'Classical dancer and choreographer specializing in Bharatanatyam. Teaching workshops across India.', 'expert', 
  (SELECT id FROM categories WHERE name = 'Dance'), 
  ARRAY['Bharatanatyam Expert', 'Workshop Trainer', '15+ Years Experience'], 4.9, 203, 'available'),
  
('rajesh.kumar@teamforge.com', 'Rajesh Kumar', 'Digital artist and illustrator. Creating stunning visual artwork for brands and indie games.', 'advanced', 
  (SELECT id FROM categories WHERE name = 'Arts'), 
  ARRAY['Award-Winning', 'Game Art Specialist', '8 Years Experience'], 4.7, 178, 'busy'),
  
('neha.singh@teamforge.com', 'Neha Singh', 'Contemporary dancer and performer. Exploring fusion styles and cultural expressions.', 'intermediate', 
  (SELECT id FROM categories WHERE name = 'Dance'), 
  ARRAY['Fusion Dancer', 'TED Speaker', 'Cultural Advocate'], 4.6, 142, 'available'),
  
('vikram.patel@teamforge.com', 'Vikram Patel', 'Jazz pianist and composer. Blending traditional and modern jazz elements.', 'expert', 
  (SELECT id FROM categories WHERE name = 'Music'), 
  ARRAY['Jazz Composer', 'International Tours', 'Album Released'], 4.9, 189, 'available'),
  
('ananya.desai@teamforge.com', 'Ananya Desai', 'Graphic designer and visual artist. Creating brand identities and digital art.', 'intermediate', 
  (SELECT id FROM categories WHERE name = 'Arts'), 
  ARRAY['Brand Designer', 'Adobe Expert', 'Portfolio: 50+ Projects'], 4.5, 127, 'available'),
  
('rohan.gupta@teamforge.com', 'Rohan Gupta', 'Hip-hop dancer and choreographer. Passionate about street dance culture.', 'advanced', 
  (SELECT id FROM categories WHERE name = 'Dance'), 
  ARRAY['Hip-Hop Master', 'Choreography Pro', 'Social Media: 200K Followers'], 4.7, 165, 'available'),
  
('divya.nair@teamforge.com', 'Divya Nair', 'Singer-songwriter creating indie folk music with Indian classical influences.', 'intermediate', 
  (SELECT id FROM categories WHERE name = 'Music'), 
  ARRAY['Indie Folk Artist', 'Spotify: 100K Listeners', 'Original Compositions'], 4.4, 98, 'available'),
  
('aditya.iyer@teamforge.com', 'Aditya Iyer', 'Motion graphics designer and animator. Creating visual effects for films and digital media.', 'advanced', 
  (SELECT id FROM categories WHERE name = 'Arts'), 
  ARRAY['Motion Expert', 'Film Industry Experience', 'VFX Specialist'], 4.8, 171, 'available'),
  
('meera.sharma@teamforge.com', 'Meera Sharma', 'Classical vocalist in Indian classical music (Hindustani). Teaching and performing.', 'expert', 
  (SELECT id FROM categories WHERE name = 'Music'), 
  ARRAY['Hindustani Classical', 'PhD in Music', 'Concert Performer'], 4.9, 197, 'available')
ON CONFLICT (email) DO NOTHING;
