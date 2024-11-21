import { createClient } from '@supabase/supabase-js';
import { type Database } from './database.types';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_URL');
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

console.log('Initializing Supabase clients...');
console.log('URL:', supabaseUrl);
console.log('Service Key Available:', !!process.env.SUPABASE_SERVICE_ROLE_KEY);

// Create a Supabase client for anonymous access (public)
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Admin client with full access
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
export const supabaseAdmin = supabaseServiceRoleKey 
  ? createClient<Database>(
      supabaseUrl,
      supabaseServiceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    )
  : null;

// Test the connection and table
const testConnection = async () => {
  try {
    console.log('Testing connection with public client...');
    const { data: publicData, error: publicError } = await supabase
      .from('posts')
      .select('*');

    if (publicError) {
      console.error('Public client error:', publicError);
    } else {
      console.log('Public client success, posts found:', publicData?.length || 0);
    }

    if (supabaseAdmin) {
      console.log('Testing connection with admin client...');
      const { data: adminData, error: adminError } = await supabaseAdmin
        .from('posts')
        .select('*');

      if (adminError) {
        console.error('Admin client error:', adminError);
      } else {
        console.log('Admin client success, posts found:', adminData?.length || 0);
      }
    } else {
      console.log('No admin client available');
    }
  } catch (err) {
    console.error('Exception in connection test:', err);
  }
};

// Add sample posts if none exist
const addSamplePosts = async () => {
  if (!supabaseAdmin) {
    console.log('Skipping sample posts: No admin access available');
    return;
  }

  try {
    console.log('Checking for existing posts...');
    const { data: existingPosts, error: checkError } = await supabaseAdmin
      .from('posts')
      .select('id');

    if (checkError) {
      console.error('Error checking posts:', checkError);
      return;
    }

    console.log('Found existing posts:', existingPosts?.length || 0);

    if (existingPosts && existingPosts.length > 0) {
      console.log('Posts already exist, skipping sample data');
      return;
    }

    // Sample posts in Uzbek
    const samplePosts = [
      {
        title: "Qandli diabet bilan kurashish yo'llari",
        slug: "qandli-diabet-bilan-kurashish",
        excerpt: "Qandli diabetni nazorat qilish va uning oldini olish bo'yicha muhim maslahatlar.",
        content: `
<h2>Qandli diabet nima?</h2>

<p>Qandli diabet - bu modda almashinuvi kasalligi bo'lib, unda organizmda insulin gormoni yetishmaydi yoki to'qimalar insulinga sezgir bo'lmaydi. Bu kasallik qondagi qand miqdorining oshishi bilan xarakterlanadi.</p>

<h3>Qandli diabetning asosiy turlari:</h3>

<ul>
  <li><strong>1-tip diabet</strong> - insulin ishlab chiqarilmasligi</li>
  <li><strong>2-tip diabet</strong> - insulin qarshiligi</li>
  <li><strong>Homiladorlik diabeti</strong> - homiladorlik davrida rivojlanadi</li>
</ul>

<h3>Kasallik belgilari:</h3>

<ul>
  <li>Tez-tez siyish</li>
  <li>Doimiy chanqash</li>
  <li>Tushuntirib bo'lmaydigan vazn yo'qotish</li>
  <li>Charchoq va holsizlik</li>
  <li>Ko'rish qobiliyatining buzilishi</li>
</ul>

<h2>Davolash va nazorat qilish</h2>

<p>Qandli diabetni davolashda quyidagi yo'nalishlarga e'tibor qaratiladi:</p>

<ol>
  <li><strong>Ovqatlanish rejimi:</strong>
    <ul>
      <li>Uglevodlarni nazorat qilish</li>
      <li>Yog'li ovqatlarni cheklash</li>
      <li>To'g'ri ovqatlanish vaqtlari</li>
    </ul>
  </li>
  <li><strong>Jismoniy faollik:</strong>
    <ul>
      <li>Muntazam mashqlar</li>
      <li>Sayr qilish</li>
      <li>Suzish</li>
    </ul>
  </li>
  <li><strong>Dori-darmonlar:</strong>
    <ul>
      <li>Insulin</li>
      <li>Qand tushiruvchi tabletkalar</li>
    </ul>
  </li>
</ol>

<h2>Profilaktika choralari</h2>

<p>Qandli diabetning oldini olish uchun quyidagi tavsiyalarga amal qiling:</p>

<ul>
  <li>Sog'lom ovqatlanish</li>
  <li>Jismoniy faol bo'lish</li>
  <li>Ortiqcha vaznni nazorat qilish</li>
  <li>Muntazam tibbiy ko'rikdan o'tish</li>
</ul>

<blockquote>
  <p><em>Eslatma: Ushbu maqolada keltirilgan ma'lumotlar umumiy xarakterga ega. Aniq tibbiy maslahat uchun shifokorga murojaat qiling.</em></p>
</blockquote>`,
        category: "Kasalliklar",
        image_url: "https://picsum.photos/800/600",
        read_time: "5 daqiqa"
      },
      {
        title: "Yurak salomatligini saqlash",
        slug: "yurak-salomatligini-saqlash",
        excerpt: "Yurak-qon tomir kasalliklarining oldini olish va sog'lom turmush tarzi haqida.",
        content: `
<h2>Yurak salomatligi nima uchun muhim?</h2>

<p>Yurak - bu organizmning eng muhim a'zolaridan biri. U butun tana bo'ylab qonni haydab, barcha a'zolarni kislorod va ozuqa moddalar bilan ta'minlaydi.</p>

<h3>Yurak kasalliklari xavf omillari:</h3>

<ul>
  <li><strong>O'zgartirib bo'lmaydigan omillar:</strong>
    <ul>
      <li>Yosh</li>
      <li>Jins</li>
      <li>Oilaviy kasallik tarixi</li>
    </ul>
  </li>
  <li><strong>O'zgartirilishi mumkin bo'lgan omillar:</strong>
    <ul>
      <li>Chekish</li>
      <li>Gipertoniya</li>
      <li>Qandli diabet</li>
      <li>Ortiqcha vazn</li>
    </ul>
  </li>
</ul>

<h2>Yurak salomatligini saqlash yo'llari</h2>

<h3>1. Sog'lom ovqatlanish</h3>

<p>Yurak uchun foydali mahsulotlar:</p>

<ul>
  <li>Baliq (omega-3 yog' kislotalari)</li>
  <li>Yong'oqlar va urug'lar</li>
  <li>Mevalar va sabzavotlar</li>
  <li>To'liq donli mahsulotlar</li>
</ul>

<h3>2. Jismoniy faollik</h3>

<p>Muntazam jismoniy mashqlar:</p>

<ul>
  <li>Kuniga 30 daqiqa tez yurish</li>
  <li>Suzish</li>
  <li>Velosiped haydash</li>
  <li>Raqs</li>
</ul>

<h3>3. Stress boshqaruvi</h3>

<p>Stress yurak kasalliklari xavfini oshiradi. Uni kamaytirish usullari:</p>

<ul>
  <li>Meditatsiya</li>
  <li>Yoga</li>
  <li>Chuqur nafas olish mashqlari</li>
  <li>Yetarli uyqu</li>
</ul>

<blockquote>
  <p><em>Muhim: Yurak og'rig'i, nafas qisilishi kabi belgilar paydo bo'lganda zudlik bilan tibbiy yordam so'rang.</em></p>
</blockquote>`,
        category: "Profilaktika",
        image_url: "https://picsum.photos/800/600",
        read_time: "7 daqiqa"
      },
      {
        title: "Vitaminlar va minerallar ahamiyati",
        slug: "vitaminlar-minerallar-ahamiyati",
        excerpt: "Organizmning normal ishlashi uchun zarur bo'lgan vitaminlar va minerallar haqida.",
        content: `
<h2>Vitaminlar va minerallarning ahamiyati</h2>

<p>Vitaminlar va minerallar sog'lom hayot uchun zarur ozuqa moddalaridir. Ular turli biologik jarayonlarda ishtirok etadi va organizmning normal ishlashi uchun muhimdir.</p>

<h3>Asosiy vitaminlar va ularning manbalari</h3>

<h4>A vitamini</h4>
<ul>
  <li><strong>Vazifasi:</strong> Ko'rish, immunitet, teri salomatligi</li>
  <li><strong>Manbalar:</strong>
    <ul>
      <li>Sabzi</li>
      <li>Tuxum</li>
      <li>Baliq</li>
      <li>O'rik</li>
    </ul>
  </li>
</ul>

<h4>C vitamini</h4>
<ul>
  <li><strong>Vazifasi:</strong> Immunitet, temir so'rilishi, yaralar bitishi</li>
  <li><strong>Manbalar:</strong>
    <ul>
      <li>Sitrus mevalar</li>
      <li>Qizil bulg'or qalampiri</li>
      <li>Kivi</li>
      <li>Pomidor</li>
    </ul>
  </li>
</ul>

<h3>Muhim minerallar</h3>

<h4>Temir</h4>
<p>Qon yaratilishi uchun zarur. Manbalari:</p>
<ul>
  <li>Go'sht</li>
  <li>Dukkakli o'simliklar</li>
  <li>Ismaloq</li>
</ul>

<h4>Kalsiy</h4>
<p>Suyak va tishlar uchun zarur. Manbalari:</p>
<ul>
  <li>Sut mahsulotlari</li>
  <li>Bodom</li>
  <li>Karam</li>
</ul>

<h2>Vitamin va mineral yetishmovchiligi</h2>

<p>Quyidagi holatlarda vitamin va minerallar yetishmovchiligi kuzatilishi mumkin:</p>

<ul>
  <li>Noto'g'ri ovqatlanish</li>
  <li>Stress</li>
  <li>Kasalliklar</li>
  <li>Homiladorlik</li>
</ul>

<blockquote>
  <p><em>Eslatma: Vitamin va mineral preparatlarini shifokor bilan maslahatlashib qabul qiling.</em></p>
</blockquote>`,
        category: "Ovqatlanish",
        image_url: "https://picsum.photos/800/600",
        read_time: "6 daqiqa"
      }
    ];

    console.log('Attempting to insert sample posts...');
    const { error: insertError } = await supabaseAdmin
      .from('posts')
      .insert(samplePosts);

    if (insertError) {
      console.error('Error inserting sample posts:', insertError);
    } else {
      console.log('Sample posts inserted successfully');
    }
  } catch (err) {
    console.error('Exception in addSamplePosts:', err);
  }
};

// Run initialization
console.log('Starting initialization...');
testConnection().then(() => {
  console.log('Connection test complete');
  addSamplePosts().then(() => {
    console.log('Sample posts initialization complete');
  });
});

export type UserRole = 'admin' | 'author' | 'reader';

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          bio: string | null;
          role: UserRole;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          role?: UserRole;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          role?: UserRole;
          created_at?: string;
          updated_at?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          title: string;
          content: string;
          slug: string;
          excerpt: string;
          category: string | null;
          author_id: string;
          created_at: string;
          updated_at: string;
          published: boolean;
          image_url: string | null;
          read_time: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          slug: string;
          excerpt: string;
          category?: string | null;
          author_id: string;
          created_at?: string;
          updated_at?: string;
          published?: boolean;
          image_url?: string | null;
          read_time?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          slug?: string;
          excerpt?: string;
          category?: string | null;
          author_id?: string;
          created_at?: string;
          updated_at?: string;
          published?: boolean;
          image_url?: string | null;
          read_time?: string | null;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      comments: {
        Row: {
          id: string;
          post_id: string;
          author_id: string;
          content: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          author_id: string;
          content: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          author_id?: string;
          content?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      tags: {
        Row: {
          id: string;
          name: string;
          slug: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          created_at?: string;
        };
      };
      posts_tags: {
        Row: {
          post_id: string;
          tag_id: string;
        };
        Insert: {
          post_id: string;
          tag_id: string;
        };
        Update: {
          post_id?: string;
          tag_id?: string;
        };
      };
    };
  };
};
