-- Add excerpt column to blogs table
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS excerpt TEXT;

-- Update RLS policies to include excerpt
ALTER POLICY "Enable read access for all users" ON blogs
    USING (true);

ALTER POLICY "Enable insert for authenticated users only" ON blogs
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

ALTER POLICY "Enable update for authenticated users only" ON blogs
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');
