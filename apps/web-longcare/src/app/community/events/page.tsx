import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Calendar,
  MapPin,
  Users,
  ArrowRight,
  PlayCircle,
  Mic,
  Globe,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { HeroCommunity } from '@/components/illustrations/hero-community';

export const metadata: Metadata = getPageMetadata({
  title: 'AU AI Community Events | LongCare AU',
  description:
    'Free monthly community events for Australian SME AI practitioners. Networking nights, AI showcases, and panels in Sydney, Melbourne, and online.',
  path: '/community/events',
});

type CommunityEvent = {
  slug: string;
  name: string;
  date: string;
  startISO: string;
  endISO: string;
  location: string;
  format: 'In-person' | 'Online' | 'Hybrid';
  capacity: string;
  description: string;
};

const UPCOMING: CommunityEvent[] = [
  {
    slug: 'ai-healthcare-roundtable-syd-jun26',
    name: 'AI for Healthcare Roundtable',
    date: 'Thu 18 June 2026 · 6:00pm – 8:30pm AEST',
    startISO: '2026-06-18T18:00:00+10:00',
    endISO: '2026-06-18T20:30:00+10:00',
    location: 'Sydney CBD',
    format: 'In-person',
    capacity: '40 seats',
    description:
      'Three AU clinics share what AI patient-comms looks like in production, with a live Q&A on TGA, APP, and clinical safety.',
  },
  {
    slug: 'ai-tools-showcase-mel-jul26',
    name: 'AI Tools Showcase: Best of 2026',
    date: 'Wed 22 July 2026 · 6:00pm – 9:00pm AEST',
    startISO: '2026-07-22T18:00:00+10:00',
    endISO: '2026-07-22T21:00:00+10:00',
    location: 'Melbourne CBD',
    format: 'In-person',
    capacity: '60 seats',
    description:
      'Six community members demo the AI tools they actually pay for, with honest pricing and ROI breakdowns.',
  },
  {
    slug: 'first-ai-workflow-online-jun26',
    name: 'Building Your First AI Workflow',
    date: 'Tue 10 June 2026 · 12:00pm – 1:00pm AEST',
    startISO: '2026-06-10T12:00:00+10:00',
    endISO: '2026-06-10T13:00:00+10:00',
    location: 'Online (Google Meet)',
    format: 'Online',
    capacity: 'Unlimited',
    description:
      'A 60-minute live build: turn your inbox into an AI triage workflow you can ship the same afternoon.',
  },
];

const PAST = [
  {
    title: 'AI for Retail Owners — March 2026 (Brisbane)',
    href: '/blog/recap-ai-retail-brisbane-2026',
  },
  {
    title: 'Prompt Engineering Live — February 2026 (Online)',
    href: '/blog/recap-prompt-engineering-live-2026',
  },
  {
    title: 'AI & Compliance Panel — January 2026 (Sydney)',
    href: '/blog/recap-ai-compliance-panel-2026',
  },
];

export default function CommunityEventsPage() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'LongCare AU Community Events',
    itemListElement: UPCOMING.map((ev, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Event',
        name: ev.name,
        startDate: ev.startISO,
        endDate: ev.endISO,
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode:
          ev.format === 'Online'
            ? 'https://schema.org/OnlineEventAttendanceMode'
            : ev.format === 'Hybrid'
            ? 'https://schema.org/MixedEventAttendanceMode'
            : 'https://schema.org/OfflineEventAttendanceMode',
        location:
          ev.format === 'Online'
            ? {
                '@type': 'VirtualLocation',
                url: 'https://meet.google.com/longcare-community',
              }
            : {
                '@type': 'Place',
                name: ev.location,
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: ev.location.replace(' CBD', ''),
                  addressCountry: 'AU',
                },
              },
        description: ev.description,
        organizer: { '@type': 'Organization', name: 'LongCare AU', url: 'https://longcare.au' },
        url: `https://longcare.au/contact?topic=event-rsvp&event=${ev.slug}`,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'AUD',
          availability: 'https://schema.org/InStock',
          url: `https://longcare.au/contact?topic=event-rsvp&event=${ev.slug}`,
        },
      },
    })),
  };

  return (
    <main className="bg-[#F8FAFC] text-slate-800 pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Community', url: '/community' },
            { name: 'Events', url: '/community/events' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-6 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
              <Calendar className="size-3" /> Community Events
            </Badge>
            <h1 className="mt-4 font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Community Events
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Free monthly events for Australian SME AI practitioners.
            </p>
          </div>
          <div className="hidden lg:block">
            <HeroCommunity className="text-emerald-700" width={360} height={280} />
          </div>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <h2 className="text-2xl font-semibold text-slate-900 mb-6">Upcoming events</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {UPCOMING.map((ev) => (
            <article
              key={ev.slug}
              className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col"
            >
              <div className="flex items-center gap-2 mb-3">
                <Badge
                  variant="outline"
                  className={
                    ev.format === 'Online'
                      ? 'border-sky-200 bg-sky-50 text-sky-700'
                      : 'border-emerald-200 bg-emerald-50 text-emerald-700'
                  }
                >
                  {ev.format}
                </Badge>
                <span className="text-xs text-slate-500">{ev.capacity}</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{ev.name}</h3>
              <div className="mt-3 space-y-1.5 text-sm text-slate-700">
                <div className="flex items-center gap-2">
                  <Calendar className="size-4 text-sky-700 shrink-0" />
                  <span>{ev.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  {ev.format === 'Online' ? (
                    <Globe className="size-4 text-sky-700 shrink-0" />
                  ) : (
                    <MapPin className="size-4 text-sky-700 shrink-0" />
                  )}
                  <span>{ev.location}</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-700 flex-1">{ev.description}</p>
              <Link
                href={`/contact?topic=event-rsvp&event=${ev.slug}`}
                className="mt-6 inline-flex items-center justify-center gap-2 bg-sky-700 hover:bg-sky-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition"
              >
                RSVP <ArrowRight className="size-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Past events */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Past events</h2>
          <p className="mt-2 text-slate-500 text-sm">
            Read the recaps and watch session highlights.
          </p>
          <ul className="mt-6 divide-y divide-slate-200">
            {PAST.map((p) => (
              <li key={p.title} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-slate-700">
                  <PlayCircle className="size-5 text-sky-700 shrink-0" />
                  <span>{p.title}</span>
                </div>
                <Link
                  href={p.href}
                  className="text-sm font-medium text-sky-700 hover:text-sky-800 inline-flex items-center gap-1"
                >
                  Recap <ArrowRight className="size-3.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Host with us */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10">
        <div className="bg-slate-900 text-white rounded-xl p-8 sm:p-12 text-center">
          <Mic className="size-10 text-sky-400 mx-auto" />
          <h2 className="mt-4 text-2xl sm:text-3xl font-semibold">Host with us</h2>
          <p className="mt-3 text-slate-300 max-w-xl mx-auto">
            Got a venue, a panel idea, or a customer story worth telling? Co-host an event with the LongCare community.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Link
              href="/community/partners"
              className="bg-sky-600 hover:bg-sky-500 text-white px-6 py-3 rounded-full text-sm font-semibold inline-flex items-center gap-2"
            >
              Partner options <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/contact?topic=event-host"
              className="border border-slate-600 hover:border-slate-400 px-6 py-3 rounded-full text-sm font-semibold inline-flex items-center gap-2"
            >
              <Users className="size-4" /> Pitch your event
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
