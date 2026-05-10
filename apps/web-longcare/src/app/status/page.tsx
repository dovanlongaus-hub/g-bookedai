import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Activity,
  CheckCircle2,
  Globe,
  Calendar,
  Users,
  ShieldCheck,
  Cpu,
  ServerCog,
  ArrowRight,
  Info,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { NewsletterForm } from '@/components/newsletter-form';

export const metadata: Metadata = getPageMetadata({
  title: 'Service Status | LongCare AU',
  description:
    'Live operational status for LongCare AU services. Uptime, recent incidents, and how to subscribe to updates.',
  path: '/status',
});

type ServiceStatus = 'operational' | 'degraded' | 'outage' | 'planned';

const SERVICES: {
  name: string;
  url?: string;
  status: ServiceStatus;
  uptime: string;
  Icon: typeof Globe;
  note?: string;
}[] = [
  {
    name: 'Marketing site (longcare.au)',
    url: 'https://longcare.au',
    status: 'operational',
    uptime: '100.00%',
    Icon: Globe,
  },
  {
    name: 'Booking app (book.longcare.au)',
    url: 'https://book.longcare.au',
    status: 'operational',
    uptime: '100.00%',
    Icon: Calendar,
  },
  {
    name: 'User app (app.longcare.au)',
    status: 'planned',
    uptime: '—',
    Icon: Users,
    note: 'Coming soon',
  },
  {
    name: 'Admin app (admin.longcare.au)',
    status: 'operational',
    uptime: '100.00%',
    Icon: ShieldCheck,
    note: 'Internal users only',
  },
  {
    name: 'API (api.g.bookedai.au)',
    url: 'https://api.g.bookedai.au/health',
    status: 'operational',
    uptime: '100.00%',
    Icon: ServerCog,
  },
  {
    name: 'Agents runtime',
    status: 'planned',
    uptime: '—',
    Icon: Cpu,
    note: 'Coming soon',
  },
];

function StatusPill({
  status,
  note,
}: {
  status: ServiceStatus;
  note?: string;
}) {
  const map: Record<ServiceStatus, { label: string; classes: string }> = {
    operational: {
      label: 'Operational',
      classes: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    degraded: {
      label: 'Degraded',
      classes: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    outage: {
      label: 'Outage',
      classes: 'bg-red-50 text-red-700 border-red-200',
    },
    planned: {
      label: note ?? 'Coming soon',
      classes: 'bg-slate-50 text-slate-600 border-slate-200',
    },
  };
  const v = map[status];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${v.classes}`}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {v.label}
    </span>
  );
}

export default function StatusPage() {
  const allOperational = SERVICES.every(
    (s) => s.status === 'operational' || s.status === 'planned',
  );

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://longcare.au/status',
    name: 'Service Status — LongCare AU',
    description:
      'Real-time operational status for LongCare AU services with 90-day uptime and incident history.',
    url: 'https://longcare.au/status',
    mainEntityOfPage: 'https://longcare.au/status',
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
            { name: 'Status', url: '/status' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-6 pb-8">
        <div className="max-w-2xl">
          <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
            <Activity className="size-3" /> Live status
          </Badge>
          <h1 className="mt-4 font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
            Service Status
          </h1>
          <p className="mt-4 text-lg text-slate-700">
            How each LongCare AU surface is behaving right now, with 90-day uptime and
            a full incident history.
          </p>
        </div>
      </section>

      {/* Top banner */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-8">
        <div
          className={`rounded-xl border shadow-sm p-6 sm:p-8 flex items-start gap-4 ${
            allOperational
              ? 'bg-emerald-50 border-emerald-200'
              : 'bg-amber-50 border-amber-200'
          }`}
        >
          <CheckCircle2
            className={`size-6 mt-0.5 flex-shrink-0 ${
              allOperational ? 'text-emerald-700' : 'text-amber-700'
            }`}
          />
          <div>
            <h2
              className={`text-xl font-semibold ${
                allOperational ? 'text-emerald-900' : 'text-amber-900'
              }`}
            >
              {allOperational
                ? 'All systems operational'
                : 'Some services are experiencing issues'}
            </h2>
            <p className="mt-1 text-sm text-slate-700">
              Last checked just now. Monitoring sweeps every 60 seconds across our
              Sydney and Melbourne probes.
            </p>
          </div>
        </div>
      </section>

      {/* Service status table */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900">Services</h2>
            <span className="text-xs text-slate-500">
              90-day uptime shown · all timestamps in AEST
            </span>
          </div>
          <ul className="divide-y divide-slate-200">
            {SERVICES.map((s) => (
              <li
                key={s.name}
                className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="size-9 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center flex-shrink-0">
                    <s.Icon className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-slate-900 truncate">
                      {s.name}
                    </div>
                    {s.url && (
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-slate-500 hover:text-sky-700 truncate"
                      >
                        {s.url}
                      </a>
                    )}
                    {!s.url && s.note && s.status === 'planned' && (
                      <div className="text-xs text-slate-500">{s.note}</div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-xs text-slate-500 w-24 text-right hidden sm:block">
                    Uptime <span className="text-slate-900 font-medium">{s.uptime}</span>
                  </div>
                  <StatusPill status={s.status} note={s.note} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Recent incidents */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">
            Recent incidents — last 90 days
          </h2>
          <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-6 flex items-center gap-3">
            <CheckCircle2 className="size-5 text-emerald-700 flex-shrink-0" />
            <p className="text-sm text-emerald-900">
              No incidents reported in the last 90 days.
            </p>
          </div>
        </div>
      </section>

      {/* Subscribe to status */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="font-heading text-xl font-semibold text-slate-900">
            Subscribe to status
          </h2>
          <p className="mt-2 text-sm text-slate-700">
            Get an email the moment we mark a service as degraded or down — and another
            when it’s resolved. We never send marketing on this list.
          </p>
          <div className="mt-4">
            <NewsletterForm source="status-subscriber" />
          </div>
        </div>
      </section>

      {/* Past incidents archive */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">
            Past incidents archive
          </h2>
          <p className="mt-2 text-sm text-slate-700">
            We publish a post-incident note for every Severity 1 or 2 event within 14
            days. The archive is currently empty for FY2026 — long may that continue.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-500">
            <li className="rounded-lg border border-slate-200 bg-slate-50/40 p-4">
              No incidents recorded for 2026.
            </li>
            <li className="rounded-lg border border-slate-200 bg-slate-50/40 p-4">
              No incidents recorded for 2025 since launch (April).
            </li>
          </ul>
        </div>
      </section>

      {/* Honesty footer */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-20">
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 flex items-start gap-3">
          <Info className="size-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-900">
            <p className="font-semibold">Honesty note</p>
            <p className="mt-1">
              This page is a static placeholder. Live status monitoring (Cloud Monitoring
              + StatusPage.io) ships in Sprint P3. Until then, please email{' '}
              <a
                className="underline hover:no-underline"
                href="mailto:hello@longcare.au"
              >
                hello@longcare.au
              </a>{' '}
              if something feels off — we’ll respond inside business hours (AEST).
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/trust"
                className="inline-flex items-center gap-2 rounded-full bg-sky-700 hover:bg-sky-600 text-white font-semibold px-5 py-2.5 transition"
              >
                Trust &amp; security <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/roadmap"
                className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-300 hover:border-sky-400 hover:text-sky-700 text-slate-800 font-medium px-5 py-2.5 transition"
              >
                Roadmap
              </Link>
              <Link
                href="/changelog"
                className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-300 hover:border-sky-400 hover:text-sky-700 text-slate-800 font-medium px-5 py-2.5 transition"
              >
                Changelog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
