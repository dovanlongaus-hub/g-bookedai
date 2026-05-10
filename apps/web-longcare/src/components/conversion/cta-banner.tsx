import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type Variant = 'sky' | 'emerald' | 'navy';

type Props = {
  title: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  variant?: Variant;
  className?: string;
};

const VARIANT_CLASSES: Record<
  Variant,
  { wrapper: string; eyebrow: string; primary: string; secondary: string; body: string; title: string }
> = {
  sky: {
    wrapper: 'bg-gradient-to-br from-sky-50 via-sky-100 to-emerald-50 ring-1 ring-sky-100',
    eyebrow: 'bg-sky-700/10 text-sky-700',
    title: 'text-slate-900',
    body: 'text-slate-700',
    primary: 'bg-sky-700 text-white hover:bg-sky-800',
    secondary: 'border-sky-200 bg-white text-sky-700 hover:bg-sky-50',
  },
  emerald: {
    wrapper: 'bg-gradient-to-br from-emerald-50 via-emerald-100 to-sky-50 ring-1 ring-emerald-100',
    eyebrow: 'bg-emerald-700/10 text-emerald-700',
    title: 'text-slate-900',
    body: 'text-slate-700',
    primary: 'bg-emerald-700 text-white hover:bg-emerald-800',
    secondary: 'border-emerald-200 bg-white text-emerald-700 hover:bg-emerald-50',
  },
  navy: {
    wrapper: 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 ring-1 ring-slate-700',
    eyebrow: 'bg-white/10 text-sky-200',
    title: 'text-white',
    body: 'text-slate-300',
    primary: 'bg-sky-500 text-white hover:bg-sky-400',
    secondary: 'border-slate-600 bg-transparent text-white hover:bg-white/10',
  },
};

function isExternal(href: string): boolean {
  return /^(https?:|mailto:|tel:)/i.test(href);
}

export function CTABanner({
  title,
  body,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  variant = 'sky',
  className,
}: Props) {
  const v = VARIANT_CLASSES[variant];
  const wrapperClass = `relative overflow-hidden rounded-2xl p-8 sm:p-12 ${v.wrapper}${
    className ? ` ${className}` : ''
  }`;

  const PrimaryLink = isExternal(primaryHref) ? (
    <a
      href={primaryHref}
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold no-underline transition-colors ${v.primary}`}
    >
      {primaryLabel}
      <ArrowRight className="size-4" />
    </a>
  ) : (
    <Link
      href={primaryHref}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold no-underline transition-colors ${v.primary}`}
    >
      {primaryLabel}
      <ArrowRight className="size-4" />
    </Link>
  );

  let SecondaryLink: React.ReactNode = null;
  if (secondaryLabel && secondaryHref) {
    SecondaryLink = isExternal(secondaryHref) ? (
      <a
        href={secondaryHref}
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center rounded-lg border px-6 py-3 text-sm font-semibold no-underline transition-colors ${v.secondary}`}
      >
        {secondaryLabel}
      </a>
    ) : (
      <Link
        href={secondaryHref}
        className={`inline-flex items-center justify-center rounded-lg border px-6 py-3 text-sm font-semibold no-underline transition-colors ${v.secondary}`}
      >
        {secondaryLabel}
      </Link>
    );
  }

  return (
    <section className={wrapperClass}>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="max-w-2xl">
          <h2 className={`text-2xl font-bold tracking-tight sm:text-3xl ${v.title}`}>{title}</h2>
          <p className={`mt-3 text-base leading-relaxed sm:text-lg ${v.body}`}>{body}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 lg:flex-nowrap">
          {PrimaryLink}
          {SecondaryLink}
        </div>
      </div>
    </section>
  );
}
