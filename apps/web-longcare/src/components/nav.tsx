'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '/services', label: 'Services' },
  { href: '/agents', label: 'Agents' },
  { href: '/toolkit', label: 'Toolkit' },
  { href: '/academy', label: 'Academy' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/resources', label: 'Resources' },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      // Active state for in-page anchors only (#section-id).
      const anchors = links
        .filter((l) => l.href.startsWith('#'))
        .map((l) => l.href.slice(1));
      let current = '';
      for (const id of anchors) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-[#F8FAFC]/95 backdrop-blur-md transition-all duration-200 ${
        scrolled ? 'shadow-[0_1px_3px_rgba(15,23,42,0.08)] border-b border-slate-200/70' : 'border-b border-transparent'
      }`}
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-[1120px] flex items-center justify-between h-16 px-8 sm:px-10">
        <a href="/" className="flex items-center gap-2.5 no-underline">
          <Image
            src="/logo.png"
            alt="Longcare — AI Transformation for the Next Generation of Businesses"
            width={208}
            height={44}
            priority
            className="h-10 w-auto"
          />
        </a>

        <div className="hidden md:flex items-center gap-5 lg:gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-[13px] font-medium transition-colors no-underline cursor-pointer ${
                active === l.href.slice(1)
                  ? 'text-sky-700 border-b-2 border-sky-700 pb-0.5'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/discovery-call"
            className="cursor-pointer btn-cta inline-flex items-center gap-1.5 px-5 py-2.5 text-[13px] font-semibold rounded-full no-underline"
          >
            Book a consult
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-slate-700 cursor-pointer"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          aria-controls="mobile-nav-menu"
        >
          {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
        </button>
      </div>

      {open && (
        <div id="mobile-nav-menu" className="md:hidden bg-[#F8FAFC] border-t border-slate-200 px-8 py-5 space-y-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-[15px] font-medium text-slate-700 no-underline py-1 cursor-pointer"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/discovery-call"
            onClick={() => setOpen(false)}
            className="block mt-3 btn-cta px-5 py-3 text-sm font-semibold rounded-full text-center no-underline cursor-pointer"
          >
            Book a consult
          </a>
        </div>
      )}
    </nav>
  );
}
