import './globals.css';
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { Analytics } from '../components/analytics';
import { ChatWidget } from '../components/chat-widget';
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-sans',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: 'Book — Longcare AU',
  description: 'Book your AI mentoring session. From $29 AUD. Google Meet + AI notes.',
  metadataBase: new URL('https://book.longcare.au'),
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
    <html lang="en" className={cn(inter.variable, poppins.variable, "font-sans")}>
      <body className="antialiased bg-[#F8FAFC] text-[#334155]" style={{ paddingTop: '64px' }}>
        <Analytics />

        {/* Nav — matching longcare.au */}
        <nav
          className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
          style={{
            background: 'rgba(248, 250, 252, 0.88)',
            backdropFilter: 'saturate(160%) blur(14px)',
            borderBottom: '1px solid #E2E8F0',
          }}
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="mx-auto max-w-[1120px] flex items-center justify-between h-16 px-8 sm:px-10">
            <a href="https://longcare.au" className="flex items-center gap-2.5 no-underline">
              <img
                src="/logo.png"
                alt="LongCare.au — Long Term Care. AI Powered. Future Ready."
                className="h-10 w-auto"
              />
            </a>

            <div className="flex items-center gap-5 lg:gap-7">
              <a href="https://longcare.au/#pricing" className="hidden sm:inline text-[13px] font-medium text-slate-600 hover:text-slate-900 transition-colors no-underline">
                Pricing
              </a>
              <a href="https://longcare.au/#results" className="hidden sm:inline text-[13px] font-medium text-slate-600 hover:text-slate-900 transition-colors no-underline">
                Results
              </a>
              <a href="https://longcare.au/quiz" className="hidden sm:inline text-[13px] font-medium text-slate-600 hover:text-slate-900 transition-colors no-underline">
                AI Quiz
              </a>
              <a
                href="https://wa.me/61455301335"
                className="hidden md:inline text-[13px] font-medium text-emerald-600 hover:text-emerald-700 transition-colors no-underline"
              >
                WhatsApp
              </a>
              <a href="https://longcare.au" className="btn-cta inline-flex items-center gap-1.5 px-5 py-2.5 text-[13px] font-semibold rounded-full no-underline" style={{ margin: 0, width: 'auto', minHeight: 'auto' }}>
                longcare.au
              </a>
            </div>
          </div>
        </nav>

        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
