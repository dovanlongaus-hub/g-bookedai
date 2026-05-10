import type { ReactNode } from 'react';

export type SocialProofStat = {
  value: string;
  label: string;
  icon?: ReactNode;
};

type Props = {
  stats: SocialProofStat[];
  align?: 'center' | 'left';
  className?: string;
};

export function SocialProofStrip({ stats, align = 'center', className }: Props) {
  const justify = align === 'center' ? 'sm:justify-center' : 'sm:justify-start';
  const text = align === 'center' ? 'text-center' : 'text-left';

  return (
    <section
      className={`rounded-2xl bg-white p-6 ring-1 ring-slate-200 sm:p-8${
        className ? ` ${className}` : ''
      }`}
      aria-label="Social proof stats"
    >
      <ul
        className={`grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8 ${justify}`}
      >
        {stats.map((s, i) => (
          <li
            key={`${s.label}-${i}`}
            className={`flex flex-col items-${align} ${text}`}
          >
            {s.icon && (
              <span
                aria-hidden="true"
                className="mb-2 inline-flex size-10 items-center justify-center rounded-lg bg-sky-50 text-sky-700 ring-1 ring-sky-100 [&_svg]:size-5"
              >
                {s.icon}
              </span>
            )}
            <span className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {s.value}
            </span>
            <span className="mt-1 text-sm text-slate-600">{s.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
