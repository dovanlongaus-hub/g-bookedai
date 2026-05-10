import type { Metadata } from 'next';
import { Outfit, Geist } from 'next/font/google';
import './globals.css';
import { Analytics } from '../components/analytics';
import { ChatWidget } from '../components/chat-widget';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'BookedAI — AI Revenue Engine for Service Businesses',
  description:
    'Automate chat, booking, payments, meetings, and customer care for your service business. Set up in minutes.',
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
    title: 'BookedAI — AI Revenue Engine for Service Businesses',
    description:
      'Automate chat, booking, payments, meetings, and customer care for your service business. Set up in minutes.',
    url: 'https://g.bookedai.au',
    siteName: 'BookedAI',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'BookedAI — AI Revenue Engine' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BookedAI — AI Revenue Engine for Service Businesses',
    description: 'Automate chat, booking, payments, meetings, and customer care for your service business. Set up in minutes.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/logo-icon.svg',
  },
  themeColor: '#6366f1',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="antialiased notranslate" style={{ fontFamily: 'var(--font-outfit), -apple-system, BlinkMacSystemFont, sans-serif' }} translate="no">
        <Analytics />
        <div className="translate" translate="yes">
          {children}
        </div>
        <ChatWidget />
        <div id="google_translate_element" style={{ display: 'none' }} />
      </body>
    </html>
  );
}
