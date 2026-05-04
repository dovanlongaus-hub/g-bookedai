import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.API_URL || 'http://localhost:8090';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const path = body._action || 'hold'; // hold, confirm, cancel, reschedule

    const res = await fetch(`${API_URL}/booking/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(request.headers.get('authorization')
          ? { Authorization: request.headers.get('authorization')! }
          : {}),
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json(
      { success: false, error: { code: 'PROXY_ERROR', message: 'Failed to reach API' } },
      { status: 502 },
    );
  }
}
