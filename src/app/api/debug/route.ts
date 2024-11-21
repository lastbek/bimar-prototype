import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  try {
    // Query all published blog posts
    const postsQuery = supabase
      .from('blogs')
      .select('*')
      .eq('published', true);

    console.log('All posts query SQL:', await postsQuery.toSQL());
    const { data: posts, error: postsError } = await postsQuery;

    if (postsError) {
      console.error('Error fetching posts:', postsError);
      console.error('Error details:', {
        code: postsError.code,
        message: postsError.message,
        details: postsError.details
      });
      return NextResponse.json({ error: postsError.message }, { status: 500 });
    }

    // Query the specific post
    const specificQuery = supabase
      .from('blogs')
      .select('*')
      .eq('slug', 'yengi-maqola')
      .single();

    console.log('Specific post query SQL:', await specificQuery.toSQL());
    const { data: specificPost, error: specificError } = await specificQuery;

    if (specificError) {
      console.error('Error fetching specific post:', specificError);
      console.error('Error details:', {
        code: specificError.code,
        message: specificError.message,
        details: specificError.details
      });
    }

    return NextResponse.json({
      allPosts: posts,
      specificPost,
      totalPosts: posts?.length || 0,
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
