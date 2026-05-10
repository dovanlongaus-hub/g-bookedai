import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type Props = {
  icon: ReactNode;
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  badge?: string;
  className?: string;
};

function isExternal(href: string): boolean {
  return /^(https?:|mailto:|tel:)/i.test(href);
}

export function LeadMagnetCard({
  icon,
  title,
  body,
  ctaLabel,
  ctaHref,
  badge,
  className,
}: Props) {
  const wrapperClass =
    'group flex items-stretch gap-4 rounded-2xl border border-emerald-200 bg-white p-5 ring-1 ring-emerald-100/40 transition-all hover:-translate-y-0.5 hover:shadow-md hover:ring-emerald-200/80 sm:gap-5 sm:p-6' +
    (className ? ` ${className}` : '');

  const Inner = (
    <>
      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 sm:size-14">
        <span aria-hidden="true" className="[&_svg]:size-6 sm:[&_svg]:size-7">
          {icon}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          {badge && (
            <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
              {badge}
            </span>
          )}
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{body}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 transition-transform group-hover:translate-x-0.5">
          {ctaLabel}
          <ArrowRight className="size-4" />
        </span>
      </div>
    </>
  );

  if (isExternal(ctaHref)) {
    return (
      <a
        href={ctaHref}
        rel="noopener noreferrer"
        className={`${wrapperClass} no-underline`}
      >
        {Inner}
      </a>
    );
  }

  return (
    <Link href={ctaHref} className={`${wrapperClass} no-underline`}>
      {Inner}
    </Link>
  );
}
