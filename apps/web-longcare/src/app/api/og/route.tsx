import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { logError, logInfo } from '@/lib/logger';

export const runtime = 'edge';

const MAX_TITLE = 100;
const MAX_SUBTITLE = 200;

type Theme = {
  bg: string;
  accent: string;
  emoji: string;
};

const colorThemes: Record<string, Theme> = {
  services: { bg: '#0F172A', accent: '#0369A1', emoji: '🎓' },
  agents: { bg: '#0F172A', accent: '#059669', emoji: '🤖' },
  toolkit: { bg: '#0F172A', accent: '#D97706', emoji: '🧰' },
  academy: { bg: '#0F172A', accent: '#7C3AED', emoji: '📚' },
  solutions: { bg: '#0F172A', accent: '#0369A1', emoji: '🏢' },
  governance: { bg: '#0F172A', accent: '#DC2626', emoji: '🛡️' },
  community: { bg: '#0F172A', accent: '#059669', emoji: '👥' },
  blog: { bg: '#0F172A', accent: '#0369A1', emoji: '✍️' },
  page: { bg: '#0F172A', accent: '#0369A1', emoji: '✨' },
};

const ALLOWED_CATEGORIES = new Set(Object.keys(colorThemes));

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const rawTitle = searchParams.get('title') || 'LongCare AU';
    const rawSubtitle = searchParams.get('subtitle') || 'Practical AI for Australian SMEs';
    const rawCategory = searchParams.get('category') || 'page';

    // next/og renders text content via React children (not innerHTML), so
    // there is no HTML injection surface. We still clamp length to avoid
    // oversized layouts and resource abuse.
    const title = rawTitle.slice(0, MAX_TITLE);
    const subtitle = rawSubtitle.slice(0, MAX_SUBTITLE);
    const category = ALLOWED_CATEGORIES.has(rawCategory) ? rawCategory : 'page';
    const theme = colorThemes[category];

    logInfo('og.rendered', {
      route: '/api/og',
      category,
      title_len: title.length,
      subtitle_len: subtitle.length,
    });

    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: `linear-gradient(135deg, ${theme.bg} 0%, ${theme.accent} 100%)`,
            padding: '80px',
            color: '#ffffff',
            fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
            position: 'relative',
          }}
        >
          {/* Decorative grid pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.08,
              background:
                'radial-gradient(circle at 25% 25%, #ffffff 1px, transparent 1px), radial-gradient(circle at 75% 75%, #ffffff 1px, transparent 1px)',
              backgroundSize: '50px 50px',
              display: 'flex',
            }}
          />

          {/* Top header row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: '0.04em',
              opacity: 0.9,
              zIndex: 1,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 48,
                height: 48,
                borderRadius: 12,
                background: 'rgba(255,255,255,0.12)',
                fontSize: 28,
              }}
            >
              {theme.emoji}
            </div>
            <div style={{ display: 'flex' }}>LONGCARE AU</div>
            <div
              style={{
                display: 'flex',
                marginLeft: 'auto',
                alignItems: 'center',
                gap: 10,
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                background: 'rgba(255,255,255,0.12)',
                padding: '8px 18px',
                borderRadius: 999,
              }}
            >
              {category}
            </div>
          </div>

          {/* Centered title block */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              flex: 1,
              gap: 24,
              zIndex: 1,
            }}
          >
            <div
              style={{
                fontSize: 72,
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                maxWidth: 1040,
                display: 'flex',
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: 32,
                opacity: 0.85,
                maxWidth: 980,
                lineHeight: 1.35,
                display: 'flex',
              }}
            >
              {subtitle}
            </div>
          </div>

          {/* Bottom row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              fontSize: 22,
              opacity: 0.85,
              zIndex: 1,
              borderTop: '1px solid rgba(255,255,255,0.18)',
              paddingTop: 24,
            }}
          >
            <div style={{ display: 'flex', fontWeight: 600 }}>longcare.au</div>
            <div
              style={{
                display: 'flex',
                marginLeft: 'auto',
                gap: 18,
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex' }}>GST-inclusive</div>
              <div style={{ display: 'flex', opacity: 0.5 }}>·</div>
              <div style={{ display: 'flex' }}>Australian SMEs</div>
            </div>
          </div>
        </div>
      ),
      { width: 1200, height: 630 },
    );
  } catch (err) {
    logError('og.render_failed', {
      route: '/api/og',
      error: err instanceof Error ? err.message : 'unknown',
    });
    return new Response('Failed to render OG image', { status: 500 });
  }
}
