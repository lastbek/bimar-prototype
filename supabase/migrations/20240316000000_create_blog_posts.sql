-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT,
    read_time TEXT DEFAULT '5 daqiqa',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('UTC'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('UTC'::text, now()) NOT NULL
);

-- Insert sample posts
INSERT INTO posts (title, slug, excerpt, content, category, image_url) VALUES
(
    'Yurak kasalliklari: Asosiy belgilari va profilaktikasi',
    'yurak-kasalliklari-belgilari-profilaktikasi',
    'Yurak kasalliklarining dastlabki belgilari va ularni oldini olish usullari haqida batafsil ma''lumot.',
    'Yurak kasalliklari bugungi kunda eng ko''p tarqalgan kasalliklardan biri hisoblanadi...',
    'Kasalliklar',
    '/images/heart-disease.jpg'
),
(
    'Sog''lom ovqatlanish asoslari',
    'soglom-ovqatlanish-asoslari',
    'Kundalik hayotda sog''lom ovqatlanish qoidalari va foydali maslahatlar.',
    'Sog''lom ovqatlanish - bu nafaqat tana vazni nazorati, balki umuman salomatlik uchun muhim omil...',
    'Sog''lom hayot',
    '/images/healthy-eating.jpg'
),
(
    'Stress va uning salomatlikka ta''siri',
    'stress-va-salomatlik',
    'Stress qanday paydo bo''ladi va uning organizmga ta''siri. Stressni boshqarish usullari.',
    'Zamonaviy hayotning tez sur''ati ko''pincha stress holatiga olib keladi...',
    'Tibbiy maslahatlar',
    '/images/stress-management.jpg'
),
(
    'Vitaminlar va minerallar: Kundalik ehtiyoj',
    'vitaminlar-minerallar-kundalik-ehtiyoj',
    'Organizm uchun zarur bo''lgan vitaminlar va minerallar haqida muhim ma''lumotlar.',
    'Vitaminlar va minerallar sog''lom hayot uchun muhim ozuqa moddalari hisoblanadi...',
    'Foydali ma''lumotlar',
    '/images/vitamins.jpg'
),
(
    'Gripp va ORVI: Farqlash va davolash',
    'gripp-orvi-farqlash-davolash',
    'Gripp va O''RVI kasalliklarining belgilari, farqlari va davolash usullari.',
    'Gripp va O''RVI - nafas yo''llari kasalliklari bo''lib, ularning belgilari o''xshash, ammo davolash usullari farq qiladi...',
    'Kasalliklar',
    '/images/flu.jpg'
),
(
    'Uyqu va salomatlik',
    'uyqu-va-salomatlik',
    'Yaxshi uyquning salomatlik uchun ahamiyati va sifatli uyqu uchun maslahatlar.',
    'Sifatli uyqu sog''lom hayot tarzining ajralmas qismi hisoblanadi...',
    'Sog''lom hayot',
    '/images/sleep.jpg'
),
(
    'Qandli diabet: Profilaktika va nazorat',
    'qandli-diabet-profilaktika-nazorat',
    'Qandli diabetning kelib chiqish sabablari, belgilari va uni nazorat qilish usullari.',
    'Qandli diabet - modda almashinuvi buzilishi bilan bog''liq kasallik bo''lib...',
    'Kasalliklar',
    '/images/diabetes.jpg'
),
(
    'Sog''lom tishlar uchun maslahatlar',
    'soglom-tishlar-maslahatlar',
    'Tishlarni parvarish qilish va og''iz bo''shlig''i gigienasi haqida muhim ma''lumotlar.',
    'Tishlar salomatligi umumiy sog''liqning muhim qismi hisoblanadi...',
    'Tibbiy maslahatlar',
    '/images/dental-health.jpg'
),
(
    'Immunitetni mustahkamlash yo''llari',
    'immunitetni-mustahkamlash',
    'Tabiiy usullar bilan immunitetni ko''tarish va kasalliklarga qarshi kurashish qobiliyatini oshirish.',
    'Kuchli immunitet - sog''lom hayotning asosi...',
    'Sog''lom hayot',
    '/images/immune-system.jpg'
),
(
    'Bel og''rig''i: Sabablari va davolash',
    'bel-ogrigi-sabablari-davolash',
    'Bel og''rig''ining kelib chiqish sabablari va uni davolash usullari haqida.',
    'Bel og''rig''i - zamonaviy hayotning eng ko''p uchraydigan muammolaridan biri...',
    'Kasalliklar',
    '/images/back-pain.jpg'
),
(
    'Ko''z salomatligi: Profilaktika va parvarish',
    'koz-salomatligi-profilaktika',
    'Ko''z kasalliklarining oldini olish va ko''rish qobiliyatini saqlash bo''yicha maslahatlar.',
    'Ko''z - insonning eng muhim sezgi organi...',
    'Tibbiy maslahatlar',
    '/images/eye-health.jpg'
),
(
    'Allergiya: Sabablari va davolash usullari',
    'allergiya-sabablari-davolash',
    'Allergik reaksiyalarning kelib chiqish sabablari va ularni davolash yo''llari.',
    'Allergiya - immunitetning noto''g''ri reaksiyasi natijasida kelib chiqadigan holat...',
    'Kasalliklar',
    '/images/allergy.jpg'
);
