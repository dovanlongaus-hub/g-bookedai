import './globals.css';
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { LocalBusinessSchema, FAQSchema } from '../components/schema-markup';
import { Analytics } from '../components/analytics';
import { Nav } from '../components/nav';
import { SiteFooter } from '../components/site-footer';
// Chat widget + exit-intent are lazy-loaded with ssr:false; they live behind
// a client boundary in `global-overlays` because Next 15 disallows
// `ssr: false` dynamic imports inside server components.
import { GlobalOverlays } from '../components/global-overlays';
import { SocialProofToast } from '../components/social-proof-toast';
import { FloatingCTABar, DesktopStickyCTA } from '../components/floating-cta-bar';
import { ResourceHints } from '../components/resource-hints';
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-sans',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: 'Longcare — AI Training & Implementation for Australian SMEs',
  description:
    'Australia\'s SME-focused AI services studio. Mentor sessions, strategy sprints, and full-stack agent implementation. From $29 courses to enterprise deployment — GST-inclusive.',
  metadataBase: new URL('https://longcare.au'),
  keywords: [
    'AI training Australia',
    'AI implementation SME',
    'AI consulting Melbourne',
    'AI mentor sessions',
    'AI strategy consulting',
    'agentic AI deployment',
    'AI for small business',
    'Longcare',
  ],
  authors: [{ name: 'Longcare' }],
  openGraph: {
    title: 'Longcare — AI Training & Implementation for Australian SMEs',
    description: 'Mentor sessions, strategy sprints, and agent implementation for SMEs across Australia.',
    url: 'https://longcare.au',
    siteName: 'Longcare AU',
    locale: 'en_AU',
    type: 'website',
    images: [{
      url: 'https://longcare.au/api/og?title=AI+Training+%26+Implementation&subtitle=For+Australian+SMEs',
      width: 1200, height: 630,
      alt: 'Longcare — AI Training & Implementation',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Longcare — AI Training & Implementation',
    description: 'AI mentoring from $29 AUD. Strategy sprints. Full agent deployment. GST-inclusive.',
    images: ['/api/og?title=Longcare%20%E2%80%94%20AI%20Training%20%26%20Implementation'],
  },
  icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(inter.variable, poppins.variable, "font-sans")}>
      <head>
        {/* Resource hints — preconnect/dns-prefetch for GTM, GA4,
            book.longcare.au, app.longcare.au, Google Fonts. Rendering
            early in <head> warms DNS/TLS before any analytics or CTA fires.
            Server Component, no hydration cost. */}
        <ResourceHints />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#F8FAFC" />
      </head>
      <body className="antialiased bg-[#F8FAFC] text-[#334155]" style={{ paddingTop: '64px' }}>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Nav />
        <Analytics />
        <LocalBusinessSchema />
        <FAQSchema />
        {children}
        <SiteFooter />
        <GlobalOverlays />
        <SocialProofToast />
        <FloatingCTABar />
        <DesktopStickyCTA />
        <script dangerouslySetInnerHTML={{ __html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
              navigator.serviceWorker.register('/sw.js').catch(() => {});
            });
          }
        `}} />
      </body>
    </html>
  );
}
