import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.API_URL || 'http://localhost:8180';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ ref: string }> }) {
  const { ref } = await params;
  try {
    // Look up booking by ref pattern (BOOK-XXXXXXXX)
    const bookingId = ref.replace('BOOK-', '').toLowerCase();
    const res = await fetch(`${API_URL}/dashboard/user/booking/${bookingId}`);
    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    }
    return NextResponse.json({ success: false, data: null });
  } catch {
    return NextResponse.json({ success: false, data: null });
  }
}
