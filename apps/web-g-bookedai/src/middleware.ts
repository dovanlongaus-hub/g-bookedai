// i18n is handled client-side via language switcher in page.tsx
// Middleware passes through all requests unchanged
import { NextResponse } from 'next/server';

export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
