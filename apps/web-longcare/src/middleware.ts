import { NextRequest, NextResponse } from 'next/server';

/**
 * CORS allowlist for /api/* routes.
 *
 * - Same-origin requests (no Origin header) pass through unchanged.
 * - Cross-origin requests must come from an entry in ALLOWED_ORIGINS.
 * - Preflight (OPTIONS) is answered with 204 + CORS headers.
 *
 * Configure via env: `ALLOWED_ORIGINS=https://longcare.au,https://www.longcare.au`
 */
const allowed = (process.env.ALLOWED_ORIGINS ?? 'https://longcare.au')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

export function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  const origin = req.headers.get('origin');

  // Same-origin (no Origin header) — allow through.
  if (!origin) return NextResponse.next();

  if (!allowed.includes(origin)) {
    return new NextResponse('Forbidden origin', { status: 403 });
  }

  const res =
    req.method === 'OPTIONS'
      ? new NextResponse(null, { status: 204 })
      : NextResponse.next();

  res.headers.set('Access-Control-Allow-Origin', origin);
  res.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.headers.set('Vary', 'Origin');
  return res;
}

export const config = {
  matcher: ['/api/:path*'],
};
