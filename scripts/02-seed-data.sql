-- Insert sample skills
INSERT INTO skills (name, category) VALUES
('JavaScript', 'Programming'),
('Python', 'Programming'),
('React', 'Frontend'),
('Node.js', 'Backend'),
('UI/UX Design', 'Design'),
('Figma', 'Design'),
('PostgreSQL', 'Database'),
('MongoDB', 'Database'),
('Machine Learning', 'AI/ML'),
('DevOps', 'Infrastructure'),
('Project Management', 'Management'),
('Data Analysis', 'Analytics')
ON CONFLICT (name) DO NOTHING;

-- Insert sample interests
INSERT INTO interests (name) VALUES
('Hackathons'),
('Open Source'),
('Startups'),
('AI/ML Projects'),
('Web Development'),
('Mobile Development'),
('Game Development'),
('Data Science'),
('Blockchain'),
('IoT Projects')
ON CONFLICT (name) DO NOTHING;

-- Insert sample roles
INSERT INTO roles (name, description) VALUES
('Frontend Developer', 'Responsible for user interface and user experience'),
('Backend Developer', 'Handles server-side logic and database management'),
('Full Stack Developer', 'Works on both frontend and backend development'),
('UI/UX Designer', 'Creates user interfaces and designs user experiences'),
('Product Manager', 'Manages product development and strategy'),
('Data Scientist', 'Analyzes data and builds predictive models'),
('DevOps Engineer', 'Manages deployment and infrastructure'),
('Mobile Developer', 'Develops mobile applications')
ON CONFLICT (name) DO NOTHING;

-- Insert sample events
INSERT INTO events (title, description, start_date, end_date, registration_deadline, max_team_size) VALUES
('Global Hackathon 2024', 'A 48-hour hackathon focused on solving real-world problems with technology', 
 NOW() + INTERVAL '30 days', NOW() + INTERVAL '32 days', NOW() + INTERVAL '25 days', 4),
('Open Source Contribution Week', 'Week-long event to contribute to popular open source projects',
 NOW() + INTERVAL '15 days', NOW() + INTERVAL '22 days', NOW() + INTERVAL '10 days', 3),
('AI Innovation Challenge', 'Build innovative AI solutions for healthcare and education',
 NOW() + INTERVAL '45 days', NOW() + INTERVAL '47 days', NOW() + INTERVAL '40 days', 5),
('Startup Weekend', 'Create and pitch a startup idea in 54 hours',
 NOW() + INTERVAL '20 days', NOW() + INTERVAL '22 days', NOW() + INTERVAL '15 days', 4);
