import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  try {
    // For blog posts, verify the URL format
    if (req.nextUrl.pathname.startsWith('/blog/')) {
      const slug = req.nextUrl.pathname.replace('/blog/', '');
      
      // Basic slug validation
      if (!slug || slug.length < 1) {
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
