import React from 'react';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  brandName?: string;
  brandDescription?: string;
  columns?: FooterColumn[];
  bottomLinks?: FooterLink[];
  className?: string;
}

export function Footer({
  brandName = 'BookedAI',
  brandDescription = 'Turn customer intent into revenue — automatically.',
  columns = [],
  bottomLinks = [],
  className = '',
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`relative border-t border-white/[0.06] bg-[#050510] ${className}`}
    >
      {/* Gradient accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#6366f1]/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#22d3ee] flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="text-lg font-bold text-white font-heading">
                {brandName}
              </span>
            </div>
            <p className="text-sm text-[#8b92a5] leading-relaxed max-w-xs">
              {brandDescription}
            </p>
          </div>

          {/* Link Columns */}
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[#8b92a5] hover:text-[#22d3ee] transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#8b92a5]">
            &copy; {currentYear} {brandName}. All rights reserved. ABN registered in Australia.
          </p>
          {bottomLinks.length > 0 && (
            <div className="flex gap-6">
              {bottomLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs text-[#8b92a5] hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
