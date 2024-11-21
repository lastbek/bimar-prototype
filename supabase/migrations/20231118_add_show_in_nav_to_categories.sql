-- Add show_in_nav column to categories table
ALTER TABLE categories ADD COLUMN show_in_nav BOOLEAN DEFAULT false;

-- Update RLS policies
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON categories
    FOR SELECT TO authenticated, anon
    USING (true);

CREATE POLICY "Enable all access for admin users" ON categories
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND auth.users.email LIKE '%@admin.com'
        )
    );
