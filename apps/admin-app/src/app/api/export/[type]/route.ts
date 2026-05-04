import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.API_URL || 'http://localhost:8090';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  try {
    const res = await fetch(`${API_URL}/export/${type}`);
    const contentType = res.headers.get('content-type') || 'text/csv';
    const body = await res.text();
    return new NextResponse(body, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': res.headers.get('content-disposition') || `attachment; filename=${type}`,
      },
    });
  } catch {
    return NextResponse.json({ error: 'Export failed' }, { status: 502 });
  }
}
