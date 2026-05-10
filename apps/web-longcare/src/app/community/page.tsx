import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Users,
  Calendar,
  Wrench,
  Flame,
  Handshake,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  Globe,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { HeroCommunity } from '@/components/illustrations/hero-community';
import { CommunityNewsletter } from './newsletter-client';

export const metadata: Metadata = getPageMetadata({
  title: 'Join the AU AI Community | LongCare AU',
  description:
    'LongCare AI Community: Australian SME practitioners sharing what works. Events, workshops, bootcamps, partners and a Slack network. Free to join.',
  path: '/community',
});

type Pillar = {
  slug: string;
  title: string;
  href: string;
  Icon: typeof Calendar;
  description: string;
  cta: string;
};

const PILLARS: Pillar[] = [
  {
    slug: 'events',
    title: 'Events',
    href: '/community/events',
    Icon: Calendar,
    description: 'Networking nights, AI showcases, panels.',
    cta: 'Browse events',
  },
  {
    slug: 'workshops',
    title: 'Workshops',
    href: '/community/workshops',
    Icon: Wrench,
    description: 'Hands-on, focused 2-hour sessions.',
    cta: 'See workshops',
  },
  {
    slug: 'bootcamps',
    title: 'Bootcamps',
    href: '/community/bootcamps',
    Icon: Flame,
    description: 'Multi-day intensive programs.',
    cta: 'View bootcamps',
  },
  {
    slug: 'partners',
    title: 'Partners',
    href: '/community/partners',
    Icon: Handshake,
    description: 'Referrers, integrators, channel partners.',
    cta: 'Become a partner',
  },
  {
    slug: 'network',
    title: 'Network',
    href: '/community/network',
    Icon: Users,
    description: 'Slack workspace + member directory.',
    cta: 'Join the network',
  },
];

const REASONS = [
  'Real case studies from Australian SME peers',
  'Early access to new AI tools and templates',
  'Direct access to LongCare mentors and engineers',
  'AU-specific context: APP, Fair Work, GST, ATO',
];

export default function CommunityHubPage() {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'LongCare AI Community',
    url: 'https://longcare.au/community',
    description:
      'A community of Australian small-to-medium business AI practitioners.',
    sameAs: [
      'https://www.linkedin.com/company/longcare-au',
      'https://longcare.au',
    ],
    memberOf: {
      '@type': 'Organization',
      name: 'LongCare AU',
      url: 'https://longcare.au',
    },
  };

  const upcomingEventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'AI for Healthcare Roundtable',
    startDate: '2026-06-18T18:00:00+10:00',
    endDate: '2026-06-18T20:30:00+10:00',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: 'Sydney',
      address: { '@type': 'PostalAddress', addressLocality: 'Sydney', addressCountry: 'AU' },
    },
    organizer: { '@type': 'Organization', name: 'LongCare AU', url: 'https://longcare.au' },
    url: 'https://longcare.au/community/events',
  };

  return (
    <main className="bg-[#F8FAFC] text-slate-800 pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(upcomingEventSchema) }} />

      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Community', url: '/community' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-6 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
              <Sparkles className="size-3" /> LongCare Community
            </Badge>
            <h1 className="mt-4 font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Join the LongCare AI Community
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Where Australian SMEs share what works, what doesn&apos;t, and what&apos;s next.
            </p>
          </div>
          <div className="hidden lg:block">
            <HeroCommunity className="text-emerald-700" width={420} height={320} />
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { label: 'members', value: '200+' },
            { label: 'monthly events', value: 'Monthly' },
            { label: 'industries', value: '12' },
            { label: 'channels', value: 'Slack + LinkedIn' },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm">
              <div className="text-xl font-semibold text-slate-900">{s.value}</div>
              <div className="text-xs text-slate-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pillars grid */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <h2 className="text-2xl font-semibold text-slate-900 mb-6">Five ways to plug in</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map(({ slug, title, href, Icon, description, cta }) => (
            <Link
              key={slug}
              href={href}
              className="group bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-sky-300 transition flex flex-col"
            >
              <div className="size-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center mb-4">
                <Icon className="size-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 group-hover:text-sky-700 transition">
                {title}
              </h3>
              <p className="mt-2 text-sm text-slate-700 flex-1">{description}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-sky-700 group-hover:gap-2 transition-all">
                {cta} <ArrowRight className="size-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why join */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Why join?</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {REASONS.map((r) => (
              <li key={r} className="flex items-start gap-3 text-slate-700">
                <CheckCircle2 className="size-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10">
        <div className="bg-slate-900 text-white rounded-xl p-8 sm:p-12 text-center">
          <Globe className="size-10 text-sky-400 mx-auto" />
          <h2 className="mt-4 text-2xl sm:text-3xl font-semibold">Get the weekly community digest</h2>
          <p className="mt-3 text-slate-300 max-w-xl mx-auto">
            Five things, one case study, one tool. Curated for Australian SME AI practitioners.
          </p>
          <div className="mt-6">
            <CommunityNewsletter source="community" />
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Already subscribed? Visit the <Link href="/community/network" className="text-sky-400 hover:underline">network</Link> to join the Slack.
          </p>
        </div>
      </section>

      {/* Cross-links */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-16">
        <div className="flex flex-wrap gap-3 justify-center text-sm">
          <Link href="/academy" className="px-4 py-2 rounded-full border border-slate-200 bg-white hover:border-sky-300 hover:text-sky-700 transition">
            Visit the AI Academy
          </Link>
          <Link href="/solutions" className="px-4 py-2 rounded-full border border-slate-200 bg-white hover:border-sky-300 hover:text-sky-700 transition">
            Industry solutions
          </Link>
          <Link href="/contact" className="px-4 py-2 rounded-full border border-slate-200 bg-white hover:border-sky-300 hover:text-sky-700 transition">
            <MessageSquare className="size-4 inline mr-1" /> Contact us
          </Link>
        </div>
      </section>
    </main>
  );
}

