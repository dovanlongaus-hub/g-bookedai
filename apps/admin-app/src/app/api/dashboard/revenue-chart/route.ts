import { NextResponse } from 'next/server';
const API_URL = process.env.API_URL || 'http://localhost:8090';
export async function GET() {
  try {
    const res = await fetch(`${API_URL}/dashboard/admin/revenue-chart`);
    return NextResponse.json(await res.json());
  } catch { return NextResponse.json({ success: false }, { status: 502 }); }
}
