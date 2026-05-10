import Image from 'next/image';

const linkClass =
  'text-slate-600 hover:text-sky-700 transition-colors no-underline';
const headingClass =
  'text-[11px] font-semibold tracking-[0.16em] uppercase text-slate-400 mb-3';

const columns: { heading: string; links: { href: string; label: string }[] }[] = [
  {
    heading: 'Services & Products',
    links: [
      { href: '/services', label: 'Mentor services' },
      { href: '/agents', label: 'Agent marketplace' },
      { href: '/toolkit', label: 'AI Toolkit' },
      { href: '/solutions', label: 'Industry solutions' },
      { href: '/agents/automation-packages', label: 'Automation bundles' },
      { href: '/agents/deployment-services', label: 'Deployment services' },
    ],
  },
  {
    heading: 'Learn & assess',
    links: [
      { href: '/academy', label: 'Academy' },
      { href: '/resources/ai-readiness', label: 'AI Readiness Quiz' },
      { href: '/resources/roi-calculator', label: 'ROI Calculator' },
      { href: '/guide', label: 'Free AI Guide' },
      { href: '/governance', label: 'Governance' },
      { href: '/community', label: 'Community' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/blog', label: 'Blog' },
      { href: '/testimonials', label: 'Case studies' },
      { href: '/referral', label: 'Refer & Earn' },
      { href: '/contact', label: 'Contact' },
      { href: '/privacy', label: 'Privacy' },
      { href: '/terms', label: 'Terms' },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#F8FAFC] border-t border-slate-200">
      <div className="mx-auto max-w-[1120px] px-8 sm:px-10 py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 text-sm text-slate-600">
          <div className="lg:col-span-2">
            <div className="mb-3">
              <Image
                src="/logo.png"
                alt="Longcare"
                width={228}
                height={48}
                className="h-12 w-auto"
              />
            </div>
            <p className="leading-relaxed text-slate-600">
              Long Term Care. AI Powered. Future Ready. Mentoring, strategy, and
              full-stack agent implementation for Individuals, SMEs &amp; Organisations.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.heading}>
              <div className={headingClass}>{col.heading}</div>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <a className={linkClass} href={l.href}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200/70 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-slate-500">
          <div>&copy; 2026 Longcare. All rights reserved. ABN-registered Australian business.</div>
          <div>GST-inclusive pricing &middot; APP 1-13 compliant &middot; WCAG 2.2 AA</div>
        </div>
      </div>
    </footer>
  );
}
