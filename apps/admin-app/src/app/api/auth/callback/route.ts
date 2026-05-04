import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(new URL('/login?error=no_code', request.url));
  }

  // For now, redirect to dashboard with success
  // TODO: Exchange code for tokens via backend API
  return NextResponse.redirect(new URL('/?login=success', request.url));
}
