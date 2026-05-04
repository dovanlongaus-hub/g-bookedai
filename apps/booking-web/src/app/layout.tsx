import './globals.css';
import type { Metadata } from 'next';

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
      <body>{children}</body>
    </html>
  );
}
