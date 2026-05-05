import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'bookedai.au';
  const subtitle = searchParams.get('subtitle') || 'The AI Revenue Engine';

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
          background: 'linear-gradient(135deg, #0f2942 0%, #1a3a5c 50%, #0f2942 100%)',
          fontFamily: 'Inter, system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Grid pattern */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.05, display: 'flex' }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} style={{ width: 60, height: '100%', borderRight: '1px solid white' }} />
          ))}
        </div>

        {/* Gradient orb */}
        <div style={{
          position: 'absolute', top: -100, right: -100,
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(13,148,136,0.3), transparent)',
        }} />

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, padding: 60 }}>
          {/* Logo bar chart icon */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
            <div style={{ width: 16, height: 32, borderRadius: 4, background: 'linear-gradient(to top, #0d9488, #2dd4bf)' }} />
            <div style={{ width: 16, height: 48, borderRadius: 4, background: 'linear-gradient(to top, #0d9488, #2dd4bf)' }} />
            <div style={{ width: 16, height: 64, borderRadius: 4, background: 'linear-gradient(to top, #2dd4bf, #4ade80)' }} />
          </div>

          <div style={{ fontSize: 56, fontWeight: 800, color: 'white', textAlign: 'center', lineHeight: 1.1, letterSpacing: -2 }}>
            {title}
          </div>

          <div style={{ fontSize: 24, color: '#9fb3c8', textAlign: 'center', maxWidth: 600 }}>
            {subtitle}
          </div>

          <div style={{
            marginTop: 16, padding: '12px 32px', borderRadius: 12,
            background: 'linear-gradient(135deg, #0d9488, #14b8a6)',
            color: 'white', fontSize: 18, fontWeight: 600,
          }}>
            g.bookedai.au
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
