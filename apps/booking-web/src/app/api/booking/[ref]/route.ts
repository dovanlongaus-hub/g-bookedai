import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.API_URL || 'http://localhost:8180';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ ref: string }> }) {
  const { ref } = await params;
  try {
    // Look up booking by its public reference (BOOK-XXXXXXXX) via the API.
    const res = await fetch(`${API_URL}/guest-booking/by-ref/${encodeURIComponent(ref)}`, {
      cache: 'no-store',
    });
    const data = await res.json().catch(() => null);
    if (res.ok && data?.success) {
      return NextResponse.json(data);
    }
    return NextResponse.json({ success: false, data: null });
  } catch {
    return NextResponse.json({ success: false, data: null });
  }
}
