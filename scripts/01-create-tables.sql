-- Create users table with profile information
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  experience_level VARCHAR(50) CHECK (experience_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
  availability_status VARCHAR(50) CHECK (availability_status IN ('available', 'busy', 'unavailable')) DEFAULT 'available',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  category VARCHAR(50) NOT NULL
);

-- Create user_skills junction table
CREATE TABLE IF NOT EXISTS user_skills (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  skill_id INTEGER REFERENCES skills(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, skill_id)
);

-- Create interests table
CREATE TABLE IF NOT EXISTS interests (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL
);

-- Create user_interests junction table
CREATE TABLE IF NOT EXISTS user_interests (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  interest_id INTEGER REFERENCES interests(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, interest_id)
);

-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT
);

-- Create user_roles junction table
CREATE TABLE IF NOT EXISTS user_roles (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, role_id)
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  registration_deadline TIMESTAMP WITH TIME ZONE,
  max_team_size INTEGER DEFAULT 4,
  status VARCHAR(50) CHECK (status IN ('upcoming', 'active', 'completed', 'cancelled')) DEFAULT 'upcoming',
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create event_required_skills junction table
CREATE TABLE IF NOT EXISTS event_required_skills (
  event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
  skill_id INTEGER REFERENCES skills(id) ON DELETE CASCADE,
  PRIMARY KEY (event_id, skill_id)
);

-- Create event_required_roles junction table
CREATE TABLE IF NOT EXISTS event_required_roles (
  event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
  role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1,
  PRIMARY KEY (event_id, role_id)
);

-- Create teams table
CREATE TABLE IF NOT EXISTS teams (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
  created_by UUID REFERENCES users(id),
  max_members INTEGER DEFAULT 4,
  status VARCHAR(50) CHECK (status IN ('forming', 'full', 'active', 'completed')) DEFAULT 'forming',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
  team_id INTEGER REFERENCES teams(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role_id INTEGER REFERENCES roles(id),
  status VARCHAR(50) CHECK (status IN ('pending', 'accepted', 'declined')) DEFAULT 'accepted',
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (team_id, user_id)
);

-- Create team_invitations table
CREATE TABLE IF NOT EXISTS team_invitations (
  id SERIAL PRIMARY KEY,
  team_id INTEGER REFERENCES teams(id) ON DELETE CASCADE,
  inviter_id UUID REFERENCES users(id) ON DELETE CASCADE,
  invitee_id UUID REFERENCES users(id) ON DELETE CASCADE,
  message TEXT,
  status VARCHAR(50) CHECK (status IN ('pending', 'accepted', 'declined')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create event_registrations table
CREATE TABLE IF NOT EXISTS event_registrations (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
  registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, event_id)
);

-- Create ratings table
CREATE TABLE IF NOT EXISTS ratings (
  id SERIAL PRIMARY KEY,
  rater_id UUID REFERENCES users(id) ON DELETE CASCADE,
  rated_id UUID REFERENCES users(id) ON DELETE CASCADE,
  event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(rater_id, rated_id, event_id)
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50) NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_events_start_date ON events(start_date);
CREATE INDEX IF NOT EXISTS idx_teams_event_id ON teams(event_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_ratings_rated_id ON ratings(rated_id);
