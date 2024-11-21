import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';
export type { Database };

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
      .from('blogs')
      .select('*');

    if (publicError) {
      console.error('Public client error:', publicError);
    } else {
      console.log('Public client success, blogs found:', publicData?.length || 0);
    }

    if (supabaseAdmin) {
      console.log('Testing connection with admin client...');
      const { data: adminData, error: adminError } = await supabaseAdmin
        .from('blogs')
        .select('*');

      if (adminError) {
        console.error('Admin client error:', adminError);
      } else {
        console.log('Admin client success, blogs found:', adminData?.length || 0);
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
    console.log('Checking for existing blogs...');
    const { data: existingBlogs, error: checkError } = await supabaseAdmin
      .from('blogs')
      .select('id');

    if (checkError) {
      console.error('Error checking blogs:', checkError);
      return;
    }

    console.log('Found existing blogs:', existingBlogs?.length || 0);

    if (existingBlogs && existingBlogs.length > 0) {
      console.log('Blogs already exist, skipping sample data');
      return;
    }

    // Sample posts in Uzbek
    const samplePosts = [
      {
        id: crypto.randomUUID(),
        title: 'Sog\'lom turmush tarzi haqida',
        content: 'Sog\'lom turmush tarzi - bu...',
        slug: 'soglom-turmush-tarzi-haqida',
        excerpt: 'Sog\'lom turmush tarzi haqida qisqacha ma\'lumot',
        category_id: 'lifestyle',
        published: true,
        image_url: '/images/healthy-lifestyle.jpg',
        read_time: '5 min',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: crypto.randomUUID(),
        title: 'Vitaminlar va ularning ahamiyati',
        content: 'Vitaminlar inson organizmi uchun...',
        slug: 'vitaminlar-va-ularning-ahamiyati',
        excerpt: 'Vitaminlar haqida muhim ma\'lumotlar',
        category_id: 'nutrition',
        published: true,
        image_url: '/images/vitamins.jpg',
        read_time: '7 min',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];

    console.log('Attempting to insert sample posts...');
    const { error: insertError } = await supabaseAdmin
      .from('blogs')
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
