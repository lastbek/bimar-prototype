import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  console.log('Middleware - Request URL:', req.url);
  console.log('Middleware - Current path:', req.nextUrl.pathname);

  try {
    // Refresh session if expired - required for Server Components
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      console.error('Middleware - Session error:', error);
      // Don't block the request for session errors
    }

    // For blog posts, verify the URL format
    if (req.nextUrl.pathname.startsWith('/blog/')) {
      const slug = req.nextUrl.pathname.replace('/blog/', '');
      console.log('Middleware - Blog post slug:', slug);
      
      // Basic slug validation
      if (!slug || slug.length < 1) {
        console.error('Middleware - Invalid blog slug');
        return NextResponse.redirect(new URL('/404', req.url));
      }
    }

    return res;
  } catch (error) {
    console.error('Middleware - Unexpected error:', error);
    return res;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}
