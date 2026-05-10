import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Wrench,
  Clock,
  Users,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { HeroCommunity } from '@/components/illustrations/hero-community';

export const metadata: Metadata = getPageMetadata({
  title: 'AI Workshops Australia | LongCare AU',
  description:
    'Hands-on 2-hour AI workshops for Australian SMEs. Limit 12 attendees. AUD prices include 10% GST. Delivered online with live mentors.',
  path: '/community/workshops',
});

type Workshop = {
  slug: string;
  title: string;
  price: string;
  priceNumber: number;
  duration: string;
  format: string;
  date: string;
  capacity: string;
  description: string;
  takeaways: string[];
};

const WORKSHOPS: Workshop[] = [
  {
    slug: 'prompt-engineering-intensive',
    title: 'Prompt Engineering Intensive',
    price: 'A$149',
    priceNumber: 149,
    duration: '2 hrs',
    format: 'Online (Google Meet)',
    date: 'Sat 31 May 2026 · 10am AEST',
    capacity: 'Limit 12',
    description:
      'Write prompts that produce reliable, consistent output. Frameworks, templates, and live critique on your real prompts.',
    takeaways: [
      'A 5-pattern prompt library you can reuse',
      'Live critique on 3 of your own prompts',
      'Eval checklist to test output quality',
    ],
  },
  {
    slug: 'build-your-first-ai-agent',
    title: 'Build Your First AI Agent',
    price: 'A$199',
    priceNumber: 199,
    duration: '2 hrs',
    format: 'Online (Google Meet)',
    date: 'Sat 14 June 2026 · 10am AEST',
    capacity: 'Limit 12',
    description:
      'From zero to a working AI agent that handles a single business task end-to-end. We pick the task together at the start of the session.',
    takeaways: [
      'A working agent in your Google Workspace',
      'Tool-use and guardrail patterns',
      'Cost and latency benchmarks for AU',
    ],
  },
  {
    slug: 'ai-for-customer-service-teams',
    title: 'AI for Customer Service Teams',
    price: 'A$179',
    priceNumber: 179,
    duration: '2 hrs',
    format: 'Online (Google Meet)',
    date: 'Sat 21 June 2026 · 10am AEST',
    capacity: 'Limit 12',
    description:
      'Triage, deflection, and tone-aware replies — without losing the human touch. Designed for teams of 2 to 20.',
    takeaways: [
      'Tone-of-voice prompt template',
      'Triage workflow (urgent / standard / FYI)',
      'Escalation rules every team should ship',
    ],
  },
  {
    slug: 'ai-compliance-workshop-app',
    title: 'AI Compliance Workshop (APP)',
    price: 'A$149',
    priceNumber: 149,
    duration: '2 hrs',
    format: 'Online (Google Meet)',
    date: 'Sat 28 June 2026 · 10am AEST',
    capacity: 'Limit 12',
    description:
      'Australian Privacy Principles applied to AI: where data flows, what to log, and what to disclose. Practical, not legal advice.',
    takeaways: [
      'APP-aligned data-flow diagram template',
      'Vendor due-diligence checklist',
      'Customer-facing AI disclosure copy',
    ],
  },
];

export default function CommunityWorkshopsPage() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'LongCare AU Workshops',
    itemListElement: WORKSHOPS.map((w, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Course',
        name: w.title,
        description: w.description,
        provider: {
          '@type': 'Organization',
          name: 'LongCare AU',
          url: 'https://longcare.au',
        },
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'online',
          courseWorkload: 'PT2H',
          location: { '@type': 'VirtualLocation', url: 'https://meet.google.com/longcare' },
        },
        offers: {
          '@type': 'Offer',
          price: w.priceNumber.toFixed(2),
          priceCurrency: 'AUD',
          availability: 'https://schema.org/InStock',
          url: `https://book.longcare.au?service=workshop-${w.slug}`,
        },
        url: `https://longcare.au/community/workshops#${w.slug}`,
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
            { name: 'Workshops', url: '/community/workshops' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-6 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
              <Wrench className="size-3" /> Workshops
            </Badge>
            <h1 className="mt-4 font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Hands-On AI Workshops
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Focused 2-hour workshops on specific AI skills. Limit 12 attendees per session.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-600">
              <span className="inline-flex items-center gap-1.5"><ShieldCheck className="size-4 text-emerald-600" /> All prices include GST</span>
              <span className="inline-flex items-center gap-1.5"><Sparkles className="size-4 text-sky-700" /> Recording shared with attendees</span>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroCommunity className="text-emerald-700" width={360} height={280} />
          </div>
        </div>
      </section>

      {/* Upcoming workshops */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <h2 className="text-2xl font-semibold text-slate-900 mb-6">Upcoming workshops</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {WORKSHOPS.map((w) => (
            <article
              key={w.slug}
              id={w.slug}
              className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-lg font-semibold text-slate-900">{w.title}</h3>
                <span className="text-lg font-semibold text-sky-700 whitespace-nowrap">{w.price}</span>
              </div>
              <p className="text-sm text-slate-700">{w.description}</p>

              <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-slate-600">
                <div className="inline-flex items-center gap-1.5"><Clock className="size-3.5 text-sky-700" /> {w.duration}</div>
                <div className="inline-flex items-center gap-1.5"><Users className="size-3.5 text-sky-700" /> {w.capacity}</div>
                <div className="inline-flex items-center gap-1.5 col-span-2 text-slate-700"><Sparkles className="size-3.5 text-sky-700" /> {w.format} · {w.date}</div>
              </div>

              <ul className="mt-4 space-y-2 text-sm text-slate-700 flex-1">
                {w.takeaways.map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

              <a
                href={`https://book.longcare.au?service=workshop-${w.slug}`}
                className="mt-6 inline-flex items-center justify-center gap-2 bg-sky-700 hover:bg-sky-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition"
              >
                Register <ArrowRight className="size-4" />
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* Private workshop CTA */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Want a private workshop for your team?</h2>
            <p className="mt-2 text-slate-700">
              We&apos;ll tailor any workshop to your tools, data, and policies. From A$1,200 inc GST for up to 10 staff.
            </p>
          </div>
          <Link
            href="/contact?topic=private-workshop"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-600 text-white px-6 py-3 rounded-full font-semibold whitespace-nowrap"
          >
            Request a quote <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap gap-3 justify-center text-sm">
          <Link href="/community/bootcamps" className="px-4 py-2 rounded-full border border-slate-200 bg-white hover:border-sky-300 hover:text-sky-700 transition">
            Looking for something deeper? See Bootcamps
          </Link>
          <Link href="/academy" className="px-4 py-2 rounded-full border border-slate-200 bg-white hover:border-sky-300 hover:text-sky-700 transition">
            Self-paced AI Academy
          </Link>
        </div>
      </section>
    </main>
  );
}
