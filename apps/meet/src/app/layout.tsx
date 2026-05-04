import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meeting Room — Longcare AU',
  description: 'Join your AI mentoring session via Google Meet',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
