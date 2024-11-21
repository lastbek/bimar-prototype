import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    // Query all published blog posts
    const postsQuery = supabase
      .from('blogs')
      .select('*')
      .eq('published', true);

    const { data: posts, error: postsError } = await postsQuery;

    if (postsError) {
      throw postsError;
    }

    // Query the specific post
    const specificQuery = supabase
      .from('blogs')
      .select('*')
      .eq('slug', 'yengi-maqola')
      .single();

    const { data: specificPost, error: specificError } = await specificQuery;

    if (specificError) {
      throw specificError;
    }

    return NextResponse.json({
      allPosts: posts,
      specificPost,
      totalPosts: posts?.length || 0,
    });
  } catch (error: any) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
