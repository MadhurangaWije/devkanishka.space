import { NextRequest, NextResponse } from 'next/server';
import {
  checkOwnerPassword,
  createOwnerSessionToken,
  OWNER_COOKIE_MAX_AGE_SECONDS,
  OWNER_COOKIE_NAME,
} from '@/lib/owner-auth';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid submission.' }, { status: 400 });
  }

  const password = typeof body.password === 'string' ? body.password : '';
  if (!password) {
    return NextResponse.json({ error: 'Password required.' }, { status: 400 });
  }

  let ok: boolean;
  try {
    ok = checkOwnerPassword(password);
  } catch (err) {
    console.error('Memories login: owner auth not configured', err);
    return NextResponse.json({ error: "This isn't set up yet." }, { status: 500 });
  }

  if (!ok) {
    return NextResponse.json({ error: 'Wrong password.' }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(OWNER_COOKIE_NAME, createOwnerSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: OWNER_COOKIE_MAX_AGE_SECONDS,
    path: '/',
  });
  return response;
}
