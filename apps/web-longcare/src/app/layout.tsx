import './globals.css';
import type { Metadata } from 'next';
import { LocalBusinessSchema } from '../components/schema-markup';

export const metadata: Metadata = {
  title: 'Longcare — AI Mentor & Learning',
  description: 'AI-powered mentoring sessions and learning programs for individuals and SMEs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0070f3" />
      </head>
      <body>
        <LocalBusinessSchema />
        {children}
      </body>
    </html>
  );
}
