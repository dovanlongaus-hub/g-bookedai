'use client';

import { useState } from 'react';
import { Globe, Check } from 'lucide-react';
import { locales, localeLabels, type Locale } from '@/i18n/config';

type LocaleSwitcherProps = {
  current: Locale;
  // When wired with next-intl, this becomes a router.replace(pathname, { locale }).
  onChange?: (locale: Locale) => void;
};

export function LocaleSwitcher({ current, onChange }: LocaleSwitcherProps) {
  const [open, setOpen] = useState(false);
  const cur = localeLabels[current];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language"
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 hover:border-slate-300 text-sm text-slate-700 bg-white"
      >
        <Globe aria-hidden className="size-4" />
        <span>{cur.flag} {cur.native}</span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Languages"
          className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 bg-white shadow-lg p-1 z-50"
        >
          {locales.map((loc) => {
            const label = localeLabels[loc];
            const isActive = loc === current;
            return (
              <li key={loc} role="option" aria-selected={isActive}>
                <button
                  onClick={() => { onChange?.(loc); setOpen(false); }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-left ${
                    isActive ? 'bg-sky-50 text-sky-700' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{label.flag} {label.native}</span>
                  {isActive && <Check aria-hidden className="size-4" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
