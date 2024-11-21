import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

// Function to get client IP address
function getClientIP() {
  const forwardedFor = headers().get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  return headers().get('x-real-ip') || 'unknown';
}

export async function POST(request: Request) {
  try {
    const { slug } = await request.json();
    
    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      );
    }

    const supabase = createRouteHandlerClient({ cookies });
    const clientIP = getClientIP();

    // First, get the blog post
    const { data: post, error: fetchError } = await supabase
      .from('blogs')
      .select('id, views')
      .eq('slug', slug)
      .single();

    if (fetchError) {
      console.error('Error fetching post:', fetchError);
      return NextResponse.json(
        { error: 'Failed to fetch post' },
        { status: 500 }
      );
    }

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Check if this IP has viewed this post in the last 24 hours
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    const { data: existingView } = await supabase
      .from('blog_views')
      .select('*')
      .eq('blog_id', post.id)
      .eq('ip_address', clientIP)
      .gte('created_at', twentyFourHoursAgo.toISOString())
      .maybeSingle();

    // If no existing view from this IP in the last 24 hours
    if (!existingView) {
      // Create a new view record
      const { error: viewError } = await supabase
        .from('blog_views')
        .insert({
          blog_id: post.id,
          ip_address: clientIP
        });

      if (viewError) {
        console.error('Error recording view:', viewError);
        throw viewError;
      }

      // Increment the view count
      const newViews = (post.views || 0) + 1;
      const { error: updateError } = await supabase
        .from('blogs')
        .update({ views: newViews })
        .eq('id', post.id);

      if (updateError) {
        console.error('Error updating views:', updateError);
        throw updateError;
      }

      return NextResponse.json({ views: newViews });
    }

    // If the IP has already viewed the post, return current view count
    return NextResponse.json({ views: post.views || 0 });
  } catch (error: any) {
    console.error('Error in view counter:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
