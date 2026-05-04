import { NextResponse } from 'next/server';

const API_URL = process.env.API_URL || 'http://localhost:8090';

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/partners/list`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ success: false, data: [] }, { status: 502 });
  }
}
