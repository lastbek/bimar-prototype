-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT,
    read_time TEXT DEFAULT '5 daqiqa',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('UTC'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('UTC'::text, now()) NOT NULL
);

-- Insert sample posts
INSERT INTO posts (title, excerpt, content, category, image_url) VALUES
(
    'Yurak kasalliklari: Asosiy belgilari va profilaktikasi',
    'Yurak kasalliklarining dastlabki belgilari va ularni oldini olish usullari haqida batafsil ma''lumot.',
    'Yurak kasalliklari bugungi kunda eng ko''p tarqalgan kasalliklardan biri hisoblanadi...',
    'Kasalliklar',
    '/images/heart-disease.jpg'
),
(
    'Sog''lom ovqatlanish asoslari',
    'Kundalik hayotda sog''lom ovqatlanish qoidalari va foydali maslahatlar.',
    'Sog''lom ovqatlanish - bu nafaqat tana vazni nazorati, balki umuman salomatlik uchun muhim omil...',
    'Sog''lom hayot',
    '/images/healthy-eating.jpg'
),
(
    'Stress va uning salomatlikka ta''siri',
    'Stress qanday paydo bo''ladi va uning organizmga ta''siri. Stressni boshqarish usullari.',
    'Zamonaviy hayotning tez sur''ati ko''pincha stress holatiga olib keladi...',
    'Tibbiy maslahatlar',
    '/images/stress-management.jpg'
),
(
    'Vitaminlar va minerallar: Kundalik ehtiyoj',
    'Organizm uchun zarur bo''lgan vitaminlar va minerallar haqida muhim ma''lumotlar.',
    'Vitaminlar va minerallar sog''lom hayot uchun muhim ozuqa moddalari hisoblanadi...',
    'Foydali ma''lumotlar',
    '/images/vitamins.jpg'
),
(
    'Gripp va ORVI: Farqlash va davolash',
    'Gripp va O''RVI kasalliklarining belgilari, farqlari va davolash usullari.',
    'Gripp va O''RVI - nafas yo''llari kasalliklari bo''lib, ularning belgilari o''xshash, ammo davolash usullari farq qiladi...',
    'Kasalliklar',
    '/images/flu.jpg'
),
(
    'Uyqu va salomatlik',
    'Yaxshi uyquning salomatlik uchun ahamiyati va sifatli uyqu uchun maslahatlar.',
    'Sifatli uyqu sog''lom hayot tarzining ajralmas qismi hisoblanadi...',
    'Sog''lom hayot',
    '/images/sleep.jpg'
);
