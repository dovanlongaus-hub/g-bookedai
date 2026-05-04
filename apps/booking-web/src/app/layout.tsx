import './globals.css';
import type { Metadata } from 'next';
import { Analytics } from '../components/analytics';
import { ChatWidget } from '../components/chat-widget';

export const metadata: Metadata = {
  title: 'Book — Longcare',
  description: 'Book your AI mentoring session',
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
