import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get('title') || 'Longcare AU';
  const subtitle = searchParams.get('subtitle') || 'AI-Powered Mentoring';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #0b0c10, #1a1a2e)',
          fontFamily: 'system-ui',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 60px' }}>
          <div style={{ fontSize: 28, color: '#66fcf1', marginBottom: 16, fontWeight: 700 }}>LONGCARE AU</div>
          <div style={{ fontSize: 56, fontWeight: 800, color: '#ffffff', textAlign: 'center', lineHeight: 1.2, maxWidth: 900 }}>{title}</div>
          <div style={{ fontSize: 24, color: '#9ba1a6', marginTop: 20, textAlign: 'center' }}>{subtitle}</div>
          <div style={{ display: 'flex', gap: 32, marginTop: 40 }}>
            <div style={{ color: '#66fcf1', fontSize: 18 }}>longcare.au</div>
            <div style={{ color: '#555', fontSize: 18 }}>Powered by BookedAI</div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
