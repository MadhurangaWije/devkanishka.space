import { NextResponse } from 'next/server';
import { OWNER_COOKIE_NAME } from '@/lib/owner-auth';

export const runtime = 'nodejs';

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(OWNER_COOKIE_NAME, '', { httpOnly: true, maxAge: 0, path: '/' });
  return response;
}
