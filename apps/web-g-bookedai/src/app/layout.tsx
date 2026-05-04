import type { Metadata } from 'next';
import './globals.css';
import { Analytics } from '../components/analytics';

export const metadata: Metadata = {
  title: 'bookedai.au — AI Revenue Engine',
  description: 'Turn customer intent into revenue — automatically',
  themeColor: '#050510',
  manifest: '/manifest.json',
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
