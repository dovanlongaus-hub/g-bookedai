import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import { Analytics } from '../components/analytics';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'bookedai.au — The AI Revenue Engine',
  description:
    'bookedai.au is the AI-powered revenue engine that converts customer intent into confirmed bookings, payments, and growth — automatically. Built for Australian service businesses.',
  metadataBase: new URL('https://g.bookedai.au'),
  keywords: [
    'bookedai.au',
    'AI booking',
    'revenue automation',
    'AI mentoring',
    'smart scheduling',
    'AI business automation',
    'Australian SaaS',
  ],
  authors: [{ name: 'bookedai.au' }],
  openGraph: {
    title: 'BookedAI — AI Revenue Engine',
    description:
      'Turn customer intent into revenue — automatically.',
    url: 'https://g.longcare.au',
    siteName: 'BookedAI',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'BookedAI — AI Revenue Engine' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BookedAI — AI Revenue Engine',
    description: 'Turn customer intent into revenue — automatically.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/logo-icon.svg',
  },
  themeColor: '#0d9488',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="antialiased notranslate" style={{ fontFamily: 'var(--font-outfit), system-ui, sans-serif' }} translate="no">
        <Analytics />
        <div className="translate" translate="yes">
          {children}
        </div>
        <div id="google_translate_element" style={{ display: 'none' }} />
      </body>
    </html>
  );
}
