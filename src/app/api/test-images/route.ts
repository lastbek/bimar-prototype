import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getImageUrl } from '@/lib/utils/image';

export async function GET() {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  try {
    // Get some posts with images
    const { data: posts, error: postsError } = await supabase
      .from('blogs')
      .select('title, image_url')
      .limit(5);

    if (postsError) {
      throw postsError;
    }

    // Get some categories with images
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('name, image_url')
      .limit(5);

    if (categoriesError) {
      throw categoriesError;
    }

    // Test image URLs
    const imageUrls = {
      posts: posts?.map(post => ({
        title: post.title,
        originalUrl: post.image_url,
        processedUrl: getImageUrl(post.image_url)
      })),
      categories: categories?.map(category => ({
        name: category.name,
        originalUrl: category.image_url,
        processedUrl: getImageUrl(category.image_url)
      }))
    };

    return NextResponse.json({
      success: true,
      data: imageUrls,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL
    });
  } catch (error) {
    console.error('Error testing images:', error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
