'use client';

import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';

type SiteSearchInputProps = {
  placeholder?: string;
  className?: string;
  defaultValue?: string;
  autoFocus?: boolean;
};

/**
 * Compact, reusable search input that routes to /search?q=...
 * Safe to embed anywhere (header, footer, hero CTA).
 */
export function SiteSearchInput({
  placeholder = 'Search LongCare…',
  className = '',
  defaultValue = '',
  autoFocus = false,
}: SiteSearchInputProps) {
  const router = useRouter();
  const [q, setQ] = useState(defaultValue);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = q.trim();
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push('/search');
    }
  };

  return (
    <form
      role="search"
      onSubmit={onSubmit}
      className={`relative w-full max-w-md ${className}`.trim()}
    >
      <Search
        aria-hidden="true"
        className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
      />
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        aria-label="Search the site"
        autoFocus={autoFocus}
        className="w-full pl-9 pr-4 py-2 rounded-full border border-slate-200 focus:border-sky-700 focus:ring-2 focus:ring-sky-700/20 bg-white text-sm text-slate-900 placeholder:text-slate-400 outline-none transition"
      />
    </form>
  );
}
