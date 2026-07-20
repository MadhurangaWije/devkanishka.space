import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const MEMORIES_HOST = 'memories.devkanishka.space';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const { pathname } = request.nextUrl;

  // /api routes are served as-is on every host, including this subdomain —
  // the memories frontend calls them same-origin (e.g. fetch('/api/memories')).
  const onMemoriesHost = host === MEMORIES_HOST || host.startsWith(`${MEMORIES_HOST}:`);
  if (onMemoriesHost && !pathname.startsWith('/api/')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname === '/' ? '/memories/index.html' : `/memories${pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!_next/).*)',
};
