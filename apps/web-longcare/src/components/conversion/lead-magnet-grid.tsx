'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Calculator,
  ClipboardCheck,
  Clock,
  FileText,
  Mail,
  Sparkles,
  Users,
} from 'lucide-react';
import type {
  LeadMagnet,
  LeadMagnetAudience,
  LeadMagnetFormat,
} from '@/data/lead-magnets';

type Props = {
  items: LeadMagnet[];
  /** Optional initial filter. Pass to render the grid without the filter UI. */
  filterAudience?: LeadMagnetAudience;
  /** Hide the filter chip row (e.g. when embedding inside another section). */
  hideFilters?: boolean;
};

const AUDIENCE_LABELS: Record<LeadMagnetAudience | 'all', string> = {
  all: 'All',
  individual: 'Individual',
  sme: 'SME',
  startup: 'Startup',
  organisation: 'Organisation',
};

const FORMAT_LABELS: Record<LeadMagnetFormat, string> = {
  pdf: 'PDF',
  quiz: 'Quiz',
  calculator: 'Calculator',
  'email-course': 'Email course',
  'template-pack': 'Templates',
  workshop: 'Workshop',
  newsletter: 'Newsletter',
};

function FormatIcon({ format, className }: { format: LeadMagnetFormat; className?: string }) {
  const cls = className ?? 'size-6';
  switch (format) {
    case 'pdf':
      return <BookOpen className={cls} aria-hidden="true" />;
    case 'quiz':
      return <ClipboardCheck className={cls} aria-hidden="true" />;
    case 'calculator':
      return <Calculator className={cls} aria-hidden="true" />;
    case 'email-course':
      return <Mail className={cls} aria-hidden="true" />;
    case 'template-pack':
      return <FileText className={cls} aria-hidden="true" />;
    case 'workshop':
      return <Users className={cls} aria-hidden="true" />;
    case 'newsletter':
      return <Sparkles className={cls} aria-hidden="true" />;
  }
}

function isExternal(href: string): boolean {
  return /^(https?:|mailto:|tel:)/i.test(href);
}

function MagnetCard({ magnet }: { magnet: LeadMagnet }) {
  const wrapperClass =
    'group relative flex h-full flex-col rounded-2xl border border-emerald-200 bg-white p-5 ring-1 ring-emerald-100/40 transition-all hover:-translate-y-0.5 hover:shadow-md hover:ring-emerald-200/80 sm:p-6';

  const Inner = (
    <>
      <div className="flex items-center justify-between">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
          <FormatIcon format={magnet.format} className="size-6" />
        </div>
        {magnet.featured && (
          <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800">
            Most popular
          </span>
        )}
      </div>

      <div className="mt-4 flex-1">
        <h3 className="text-base font-semibold text-slate-900">{magnet.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{magnet.description}</p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700">
          {FORMAT_LABELS[magnet.format]}
        </span>
        {magnet.estimatedReadMinutes !== undefined && (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700">
            <Clock className="size-3" aria-hidden="true" />
            {magnet.estimatedReadMinutes} min
          </span>
        )}
        {magnet.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700"
          >
            {tag}
          </span>
        ))}
      </div>

      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 transition-transform group-hover:translate-x-0.5">
        Get it now
        <ArrowRight className="size-4" aria-hidden="true" />
      </span>
    </>
  );

  if (isExternal(magnet.url)) {
    return (
      <a
        href={magnet.url}
        rel="noopener noreferrer"
        className={`${wrapperClass} no-underline`}
        aria-label={`${magnet.title} — open external resource`}
      >
        {Inner}
      </a>
    );
  }

  return (
    <Link href={magnet.url} className={`${wrapperClass} no-underline`} aria-label={magnet.title}>
      {Inner}
    </Link>
  );
}

export function LeadMagnetGrid({ items, filterAudience, hideFilters }: Props) {
  const [active, setActive] = useState<LeadMagnetAudience | 'all'>(
    filterAudience ?? 'all',
  );

  const filtered = useMemo(() => {
    if (active === 'all') return items;
    return items.filter((m) => m.audience.includes(active));
  }, [items, active]);

  const chips: (LeadMagnetAudience | 'all')[] = [
    'all',
    'individual',
    'sme',
    'startup',
    'organisation',
  ];

  return (
    <div>
      {!hideFilters && (
        <div
          role="tablist"
          aria-label="Filter resources by audience"
          className="mb-6 flex flex-wrap gap-2"
        >
          {chips.map((chip) => {
            const isActive = active === chip;
            return (
              <button
                key={chip}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(chip)}
                className={
                  'inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium transition-colors ' +
                  (isActive
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50')
                }
              >
                {AUDIENCE_LABELS[chip]}
              </button>
            );
          })}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-600">
          No resources match this filter yet. Try another audience.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m) => (
            <MagnetCard key={m.id} magnet={m} />
          ))}
        </div>
      )}
    </div>
  );
}
