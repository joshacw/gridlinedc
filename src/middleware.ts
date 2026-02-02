import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SITE_PASSWORD = process.env.SITE_PASSWORD || 'GR1DL1NE26';
const AUTH_COOKIE_NAME = 'gridline-auth';

export function middleware(request: NextRequest) {
  // Check if user is already authenticated
  const authCookie = request.cookies.get(AUTH_COOKIE_NAME);

  if (authCookie?.value === 'authenticated') {
    return NextResponse.next();
  }

  // Check if this is the login page or API route
  if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Redirect to login page
  const loginUrl = new URL('/login', request.url);
  loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (login page)
     */
    '/((?!_next/static|_next/image|favicon.ico|login).*)',
  ],
};
