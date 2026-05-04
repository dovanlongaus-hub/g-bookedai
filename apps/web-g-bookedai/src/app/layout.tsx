import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import { Analytics } from '../components/analytics';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'BookedAI — AI Revenue Engine | Turn Intent into Revenue',
  description:
    'BookedAI is the AI-powered revenue engine that converts customer intent into confirmed bookings, payments, and growth — automatically.',
  metadataBase: new URL('https://g.bookedai.au'),
  keywords: [
    'AI booking',
    'revenue automation',
    'AI mentoring',
    'smart scheduling',
    'AI business automation',
    'BookedAI',
  ],
  authors: [{ name: 'BookedAI' }],
  openGraph: {
    title: 'BookedAI — AI Revenue Engine',
    description:
      'Turn customer intent into revenue — automatically. AI Chat, Smart Booking, Learning Engine & Marketing in one platform.',
    url: 'https://g.bookedai.au',
    siteName: 'BookedAI',
    locale: 'en_AU',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BookedAI — AI Revenue Engine',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BookedAI — AI Revenue Engine',
    description: 'Turn customer intent into revenue — automatically.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  themeColor: '#050510',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} dark`}>
      <body className="font-body antialiased bg-dark-bg text-text-main">
        <Analytics />
        {children}
      </body>
    </html>
  );
}
