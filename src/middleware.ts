import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Password protection disabled - allow all requests
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
