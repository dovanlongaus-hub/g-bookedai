import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Map as MapIcon,
  Sparkles,
  ArrowRight,
  Hammer,
  CalendarClock,
  Telescope,
  CheckCircle2,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { ThemedRoadmap } from '@/components/illustrations/themed-roadmap';
import { NewsletterForm } from '@/components/newsletter-form';
import {
  roadmapItems,
  type RoadmapItem,
  type RoadmapStatus,
  type RoadmapAudience,
} from '@/data/roadmap';

export const metadata: Metadata = getPageMetadata({
  title: 'Public Roadmap | LongCare AU',
  description:
    'What we are shipping now, next, and later. Public roadmap with target audiences, estimated quarters, and links to recent releases.',
  path: '/roadmap',
});

const COLUMNS: {
  status: RoadmapStatus;
  title: string;
  subtitle: string;
  Icon: typeof Hammer;
  accent: string;
}[] = [
  {
    status: 'now',
    title: 'Now',
    subtitle: 'In active development',
    Icon: Hammer,
    accent: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  {
    status: 'next',
    title: 'Next',
    subtitle: 'Next 90 days',
    Icon: CalendarClock,
    accent: 'bg-sky-50 text-sky-700 border-sky-200',
  },
  {
    status: 'later',
    title: 'Later',
    subtitle: '6+ months out',
    Icon: Telescope,
    accent: 'bg-violet-50 text-violet-700 border-violet-200',
  },
  {
    status: 'shipped',
    title: 'Shipped',
    subtitle: 'Recent releases',
    Icon: CheckCircle2,
    accent: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
];

const AUDIENCE_LABEL: Record<RoadmapAudience, string> = {
  individual: 'Individuals',
  startup: 'Startups',
  sme: 'SMEs',
  organisation: 'Organisations',
};

function ItemCard({ item }: { item: RoadmapItem }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col gap-2">
      <h3 className="text-sm font-semibold text-slate-900 leading-snug">
        {item.title}
      </h3>
      <p className="text-xs text-slate-700 leading-relaxed">{item.description}</p>
      <div className="flex flex-wrap gap-1.5 mt-1">
        {item.audience.map((a) => (
          <span
            key={a}
            className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-700"
          >
            {AUDIENCE_LABEL[a]}
          </span>
        ))}
        {item.estimatedQuarter && item.status !== 'shipped' && (
          <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-2 py-0.5 text-[11px] font-medium text-sky-700">
            {item.estimatedQuarter}
          </span>
        )}
        {item.shippedDate && (
          <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
            Shipped {new Date(item.shippedDate).toLocaleDateString('en-AU', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </span>
        )}
      </div>
    </div>
  );
}

export default function RoadmapPage() {
  const grouped: Record<RoadmapStatus, RoadmapItem[]> = {
    now: [],
    next: [],
    later: [],
    shipped: [],
  };
  for (const item of roadmapItems) grouped[item.status].push(item);

  // sort shipped by shippedDate desc
  grouped.shipped.sort((a, b) =>
    (b.shippedDate ?? '').localeCompare(a.shippedDate ?? ''),
  );

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://longcare.au/roadmap',
    name: 'Public Roadmap — LongCare AU',
    description:
      'Now, next, later, and shipped. A transparent plan of what we are building for Australian SMEs.',
    url: 'https://longcare.au/roadmap',
    mainEntityOfPage: 'https://longcare.au/roadmap',
    isPartOf: {
      '@type': 'WebSite',
      name: 'LongCare AU',
      url: 'https://longcare.au',
    },
    publisher: {
      '@type': 'Organization',
      name: 'LongCare AU',
      url: 'https://longcare.au',
    },
  };

  return (
    <main className="bg-[#F8FAFC] text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Roadmap', url: '/roadmap' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-6 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <Badge
              variant="outline"
              className="border-sky-200 bg-sky-50 text-sky-700"
            >
              <MapIcon className="size-3" /> Public roadmap
            </Badge>
            <h1 className="mt-4 font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              What we’re building
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Updated as plans change. Anything you see here can shift if we learn it
              isn’t the right call — but we will tell you when it does.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact?topic=roadmap-suggestion"
                className="inline-flex items-center gap-2 rounded-full bg-sky-700 hover:bg-sky-600 text-white font-semibold px-5 py-2.5 transition"
              >
                Suggest a feature <Sparkles className="size-4" />
              </Link>
              <Link
                href="/changelog"
                className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-300 hover:border-sky-400 hover:text-sky-700 text-slate-800 font-medium px-5 py-2.5 transition"
              >
                See what shipped <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <ThemedRoadmap className="text-sky-700" width={460} height={260} />
          </div>
        </div>

        {/* Legend */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
          {COLUMNS.map((c) => (
            <div
              key={c.status}
              className={`flex items-center gap-2 rounded-lg border px-3 py-2 ${c.accent}`}
            >
              <c.Icon className="size-4" />
              <div className="text-xs">
                <div className="font-semibold">{c.title}</div>
                <div className="opacity-80">{c.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Columns */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {COLUMNS.map((col) => {
            const items = grouped[col.status];
            return (
              <div
                key={col.status}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className={`size-8 rounded-lg flex items-center justify-center border ${col.accent}`}>
                    <col.Icon className="size-4" />
                  </div>
                  <h2 className="text-base font-semibold text-slate-900">
                    {col.title}
                  </h2>
                  <span className="ml-auto text-xs text-slate-500">
                    {items.length}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-4">{col.subtitle}</p>
                <div className="flex flex-col gap-3">
                  {items.length === 0 && (
                    <div className="text-xs text-slate-500 italic">
                      Nothing here right now.
                    </div>
                  )}
                  {items.map((item) => (
                    <ItemCard key={item.id} item={item} />
                  ))}
                </div>
                {col.status === 'shipped' && items.length > 0 && (
                  <Link
                    href="/changelog"
                    className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-sky-700 hover:underline"
                  >
                    Full release history <ArrowRight className="size-3" />
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Subscribe + suggest */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-20">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
            <h2 className="font-heading text-xl font-semibold text-slate-900">
              Subscribe to roadmap updates
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Get a short monthly note about what moved between Now, Next, and Shipped.
              No marketing fluff — and you can unsubscribe in one click.
            </p>
            <div className="mt-4">
              <NewsletterForm source="roadmap-updates" />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col">
            <h2 className="font-heading text-xl font-semibold text-slate-900">
              Have a feature idea?
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Tell us what would make your week easier. We review every suggestion at our
              fortnightly product review and reply within five business days.
            </p>
            <div className="mt-auto pt-4 flex flex-wrap gap-3">
              <Link
                href="/contact?topic=roadmap-suggestion"
                className="inline-flex items-center gap-2 rounded-full bg-sky-700 hover:bg-sky-600 text-white font-semibold px-5 py-2.5 transition"
              >
                Submit a suggestion <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/trust"
                className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-300 hover:border-sky-400 hover:text-sky-700 text-slate-800 font-medium px-5 py-2.5 transition"
              >
                Review trust &amp; security
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
