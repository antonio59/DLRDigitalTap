-- Enable Row Level Security on all tables
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Create policies for votes table
CREATE POLICY "Allow public read access to votes" ON votes
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert to votes" ON votes
  FOR INSERT WITH CHECK (true);

-- Create policies for comments table
CREATE POLICY "Allow public read access to comments" ON comments
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert to comments" ON comments
  FOR INSERT WITH CHECK (true);

-- Create policies for analytics table
CREATE POLICY "Allow public insert to analytics" ON analytics
  FOR INSERT WITH CHECK (true);

-- Only allow authenticated users to read analytics
CREATE POLICY "Allow authenticated read access to analytics" ON analytics
  FOR SELECT USING (auth.role() = 'authenticated');
