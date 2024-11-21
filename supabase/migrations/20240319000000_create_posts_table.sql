-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT,
    category TEXT,
    image_url TEXT,
    read_time TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow anonymous users to read published posts
CREATE POLICY "Allow anonymous read access"
    ON posts
    FOR SELECT
    USING (true);

-- Allow authenticated users to insert posts
CREATE POLICY "Allow authenticated users to insert"
    ON posts
    FOR INSERT
    WITH CHECK (true);

-- Allow authenticated users to update their own posts
CREATE POLICY "Allow authenticated users to update own posts"
    ON posts
    FOR UPDATE
    USING (true)
    WITH CHECK (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_posts_updated_at
    BEFORE UPDATE
    ON posts
    FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
