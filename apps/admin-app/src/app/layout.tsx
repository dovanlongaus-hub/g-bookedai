import './globals.css';
import type { Metadata } from 'next';
import { Analytics } from '../components/analytics';
import { ChatWidget } from '../components/chat-widget';
import { AdminNav } from '../components/nav';

export const metadata: Metadata = {
  title: 'Admin — Longcare',
  description: 'Admin and revenue operations dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ paddingTop: 56 }}>
        <AdminNav />
        <Analytics />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
