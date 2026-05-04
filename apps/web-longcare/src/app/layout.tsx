import './globals.css';
import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import { LocalBusinessSchema } from '../components/schema-markup';
import { Analytics } from '../components/analytics';
import { Nav } from '../components/nav';
import { ChatWidget } from '../components/chat-widget';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'Longcare — AI Mentor & Learning Platform',
  description:
    'AI-powered mentoring sessions and personalised learning programs for individuals and SMEs. Book expert sessions with smart scheduling, progress tracking, and AI-generated insights.',
  metadataBase: new URL('https://longcare.au'),
  keywords: [
    'AI mentoring',
    'online learning',
    'AI tutor',
    'smart booking',
    'personalised learning',
    'Melbourne mentor',
    'SME training',
    'Longcare',
  ],
  authors: [{ name: 'Longcare' }],
  openGraph: {
    title: 'Longcare — AI Mentor & Learning',
    description:
      'AI-powered mentoring sessions and learning programs for individuals and SMEs in Australia.',
    url: 'https://longcare.au',
    siteName: 'Longcare AU',
    locale: 'en_AU',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Longcare — AI Mentor & Learning',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Longcare — AI Mentor & Learning',
    description:
      'Personalised AI mentoring from $29 AUD. Google Meet + AI notes.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} dark`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#050510" />
      </head>
      <body className="font-body antialiased bg-[#050510] text-[#f8f9fa]" style={{ paddingTop: '64px' }}>
        <Nav />
        <Analytics />
        <LocalBusinessSchema />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
