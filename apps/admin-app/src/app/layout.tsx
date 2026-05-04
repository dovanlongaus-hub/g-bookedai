import './globals.css';
import type { Metadata } from 'next';
import { Analytics } from '../components/analytics';

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
      <body>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
