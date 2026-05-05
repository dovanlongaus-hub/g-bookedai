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
        <header style={{
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <a href="https://longcare.au" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src="/logo.svg" alt="Longcare" style={{ height: 32 }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            <span style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>Longcare</span>
          </a>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <a href="https://longcare.au/pricing" style={{ color: '#8b92a5', textDecoration: 'none', fontSize: '0.85rem' }}>Pricing</a>
            <a href="https://g.longcare.au" style={{ color: '#8b92a5', textDecoration: 'none', fontSize: '0.85rem' }}>AI Chat</a>
            <a href="https://wa.me/61455301335" style={{ color: '#25D366', textDecoration: 'none', fontSize: '0.85rem' }}>WhatsApp</a>
          </div>
        </header>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
