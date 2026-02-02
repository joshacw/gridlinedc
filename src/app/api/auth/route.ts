import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const SITE_PASSWORD = process.env.SITE_PASSWORD || 'GR1DL1NE26';
const AUTH_COOKIE_NAME = 'gridline-auth';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (password === SITE_PASSWORD) {
      const cookieStore = await cookies();

      // Set auth cookie - expires in 7 days
      cookieStore.set(AUTH_COOKIE_NAME, 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
