import './globals.css';
import type { Metadata } from 'next';
import { Analytics } from '../components/analytics';
import { ChatWidget } from '../components/chat-widget';

export const metadata: Metadata = {
  title: 'Book — Longcare',
  description: 'Book your AI mentoring session',
  openGraph: {
    title: 'Book AI Mentoring — Longcare AU',
    description: 'Book your AI mentoring session. From $29 AUD. Google Meet + AI notes.',
    url: 'https://book.longcare.au',
    siteName: 'Longcare AU',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Analytics />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
