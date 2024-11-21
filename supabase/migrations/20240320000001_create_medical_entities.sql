-- Create diseases table
CREATE TABLE diseases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR NOT NULL,
  slug VARCHAR NOT NULL UNIQUE,
  description TEXT,
  symptoms TEXT[],
  causes TEXT[],
  treatments TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  image_url TEXT
);

-- Create symptoms table
CREATE TABLE symptoms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR NOT NULL,
  slug VARCHAR NOT NULL UNIQUE,
  description TEXT,
  severity VARCHAR,
  common_causes TEXT[],
  when_to_see_doctor TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  image_url TEXT
);

-- Create diseases_symptoms junction table
CREATE TABLE diseases_symptoms (
  disease_id UUID REFERENCES diseases(id) ON DELETE CASCADE,
  symptom_id UUID REFERENCES symptoms(id) ON DELETE CASCADE,
  PRIMARY KEY (disease_id, symptom_id)
);

-- Create clinics table
CREATE TABLE clinics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR NOT NULL,
  slug VARCHAR NOT NULL UNIQUE,
  description TEXT,
  address TEXT,
  phone VARCHAR,
  email VARCHAR,
  website VARCHAR,
  working_hours JSONB,
  services TEXT[],
  rating DECIMAL(3,2),
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  image_url TEXT,
  location POINT
);

-- Create pharmacies table
CREATE TABLE pharmacies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR NOT NULL,
  slug VARCHAR NOT NULL UNIQUE,
  description TEXT,
  address TEXT,
  phone VARCHAR,
  email VARCHAR,
  website VARCHAR,
  working_hours JSONB,
  has_delivery BOOLEAN DEFAULT false,
  rating DECIMAL(3,2),
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  image_url TEXT,
  location POINT
);

-- Create specialists table
CREATE TABLE specialists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR NOT NULL,
  slug VARCHAR NOT NULL UNIQUE,
  specialization VARCHAR NOT NULL,
  description TEXT,
  education TEXT[],
  experience TEXT,
  achievements TEXT[],
  clinic_id UUID REFERENCES clinics(id),
  phone VARCHAR,
  email VARCHAR,
  consultation_price DECIMAL(10,2),
  rating DECIMAL(3,2),
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  image_url TEXT
);

-- Create blogs table (for both blog posts and news)
CREATE TABLE blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR NOT NULL,
  slug VARCHAR NOT NULL UNIQUE,
  content TEXT,
  excerpt TEXT,
  author_id UUID REFERENCES specialists(id),
  is_news BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  image_url TEXT,
  tags TEXT[]
);

-- Create RLS policies
ALTER TABLE diseases ENABLE ROW LEVEL SECURITY;
ALTER TABLE symptoms ENABLE ROW LEVEL SECURITY;
ALTER TABLE diseases_symptoms ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinics ENABLE ROW LEVEL SECURITY;
ALTER TABLE pharmacies ENABLE ROW LEVEL SECURITY;
ALTER TABLE specialists ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Create public read policies
CREATE POLICY "Allow public read access" ON diseases FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON symptoms FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON diseases_symptoms FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON clinics FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON pharmacies FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON specialists FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON blogs FOR SELECT USING (true);

-- Create indexes for better performance
CREATE INDEX diseases_name_idx ON diseases USING GIN (to_tsvector('simple', name));
CREATE INDEX symptoms_name_idx ON symptoms USING GIN (to_tsvector('simple', name));
CREATE INDEX clinics_name_idx ON clinics USING GIN (to_tsvector('simple', name));
CREATE INDEX pharmacies_name_idx ON pharmacies USING GIN (to_tsvector('simple', name));
CREATE INDEX specialists_name_idx ON specialists USING GIN (to_tsvector('simple', name));
CREATE INDEX blogs_title_idx ON blogs USING GIN (to_tsvector('simple', title));

-- Create spatial index for locations
CREATE INDEX clinics_location_idx ON clinics USING GIST (location);
CREATE INDEX pharmacies_location_idx ON pharmacies USING GIST (location);
