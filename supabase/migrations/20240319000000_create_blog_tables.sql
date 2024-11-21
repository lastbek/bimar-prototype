-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create tags table
CREATE TABLE IF NOT EXISTS tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content JSONB, -- For TipTap JSON content
    category_id UUID NOT NULL REFERENCES categories(id),
    image_url TEXT,
    read_time TEXT,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create blog_tags junction table
CREATE TABLE IF NOT EXISTS blog_tags (
    blog_id UUID REFERENCES blogs(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (blog_id, tag_id)
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;

-- Create policies for categories
CREATE POLICY "Allow public read access to categories"
    ON categories FOR SELECT
    USING (true);

CREATE POLICY "Allow authenticated users to insert categories"
    ON categories FOR INSERT
    WITH CHECK (true);

-- Create policies for tags
CREATE POLICY "Allow public read access to tags"
    ON tags FOR SELECT
    USING (true);

CREATE POLICY "Allow authenticated users to insert tags"
    ON tags FOR INSERT
    WITH CHECK (true);

-- Create policies for blogs
CREATE POLICY "Allow public read access to published blogs"
    ON blogs FOR SELECT
    USING (published = true);

CREATE POLICY "Allow authenticated users to insert blogs"
    ON blogs FOR INSERT
    WITH CHECK (true);

-- Create policies for blog_tags
CREATE POLICY "Allow public read access to blog_tags"
    ON blog_tags FOR SELECT
    USING (true);

CREATE POLICY "Allow authenticated users to insert blog_tags"
    ON blog_tags FOR INSERT
    WITH CHECK (true);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tags_updated_at
    BEFORE UPDATE ON tags
    FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blogs_updated_at
    BEFORE UPDATE ON blogs
    FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
