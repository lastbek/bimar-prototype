-- Create blog_views table
CREATE TABLE IF NOT EXISTS blog_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_id UUID NOT NULL REFERENCES blogs(id) ON DELETE CASCADE,
  ip_address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create unique constraint to prevent duplicate views from same IP
CREATE UNIQUE INDEX IF NOT EXISTS blog_views_blog_id_ip_address_idx ON blog_views(blog_id, ip_address);

-- Create function to check if a blog has been viewed by an IP
CREATE OR REPLACE FUNCTION check_blog_view(blog_id_param UUID, ip_address_param TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM blog_views
    WHERE blog_id = blog_id_param
    AND ip_address = ip_address_param
  );
END;
$$;

-- Create function to increment blog views
CREATE OR REPLACE FUNCTION increment_blog_view(blog_id_param UUID, ip_address_param TEXT)
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO blog_views (blog_id, ip_address)
  VALUES (blog_id_param, ip_address_param)
  ON CONFLICT (blog_id, ip_address) DO NOTHING;
END;
$$;
