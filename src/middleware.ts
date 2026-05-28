import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_COOKIE_NAME = 'gridline-auth';

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get(AUTH_COOKIE_NAME);

  // If no auth cookie, redirect to login with return URL
  if (!authCookie?.value) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/pipeline/:path*', '/api/pipeline-data/:path*', '/api/pipeline-chat/:path*'],
};
