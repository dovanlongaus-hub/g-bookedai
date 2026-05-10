import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Flame,
  Calendar,
  Users,
  ArrowRight,
  CheckCircle2,
  Award,
  MessageSquare,
  Quote,
  GraduationCap,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { HeroCommunity } from '@/components/illustrations/hero-community';

export const metadata: Metadata = getPageMetadata({
  title: 'AI Bootcamps for Australian SMEs | LongCare AU',
  description:
    '5-day intensive AI bootcamps for Australian SME owners and practitioners. Ship a working AI workflow that pays for itself. AUD inc GST.',
  path: '/community/bootcamps',
});

type Bootcamp = {
  slug: string;
  title: string;
  price: string;
  priceNumber: number;
  audience: string;
  outcome: string;
  format: string;
  curriculum: { day: string; title: string; description: string }[];
  includes: string[];
};

const BOOTCAMPS: Bootcamp[] = [
  {
    slug: 'ai-for-sme-owners',
    title: 'AI for SME Owners Bootcamp',
    price: 'A$1,499',
    priceNumber: 1499,
    audience: 'Owners, founders, GMs running 5–50 staff businesses.',
    outcome: 'Ship one AI workflow into your business by end of week.',
    format: '5 days · 4 days online + 1 in-person Sydney day · Limit 12',
    curriculum: [
      { day: 'Day 1', title: 'AI mapping for your business', description: 'Audit your top 20 weekly tasks. Pick the one workflow worth automating.' },
      { day: 'Day 2', title: 'Tools & cost', description: 'Pick a stack — ChatGPT Team, Gemini, or Claude — within an AU SME budget.' },
      { day: 'Day 3', title: 'Build day', description: 'Build your workflow live with mentors. Test on real inputs from your business.' },
      { day: 'Day 4', title: 'Compliance & rollout', description: 'APP, staff change-management, and a one-page rollout plan.' },
      { day: 'Day 5 (Sydney)', title: 'Showcase + network', description: 'Present in front of peers, get feedback, leave with next steps.' },
    ],
    includes: [
      '1-on-1 mentor for the full 5 days',
      'Slack access (community workspace)',
      'Certificate of completion',
      'A$200 in AI tool credits',
      '30-day post-bootcamp office hours',
    ],
  },
  {
    slug: 'ai-practitioner',
    title: 'AI Practitioner Bootcamp',
    price: 'A$1,899',
    priceNumber: 1899,
    audience: 'Tech leads, ops engineers, and AI-curious developers.',
    outcome: 'Build and deploy a multi-step AI agent into a live workspace.',
    format: '5 days online · Limit 12',
    curriculum: [
      { day: 'Day 1', title: 'Architectures', description: 'Single-call, RAG, and agentic patterns. When to pick which.' },
      { day: 'Day 2', title: 'Tool use & evals', description: 'Function calling, structured output, and how to evaluate quality.' },
      { day: 'Day 3', title: 'Build day', description: 'Build your agent on Vertex AI / OpenAI with mentors live.' },
      { day: 'Day 4', title: 'Guardrails & cost control', description: 'Rate limits, fallbacks, prompt-injection defence, AUD-budget guardrails.' },
      { day: 'Day 5', title: 'Deploy & monitor', description: 'Cloud Run deploy, logging, alerting, and a runbook.' },
    ],
    includes: [
      '2 dedicated mentors',
      'Vertex AI sandbox lab access',
      'Certificate of completion',
      'A$300 in cloud credits',
      '90-day Slack access (community + practitioners channel)',
    ],
  },
];

const TESTIMONIALS = [
  {
    quote:
      'Day 5 we shipped a quote-generation workflow that saved my team six hours a week. The maths paid for the bootcamp before the next invoice.',
    name: 'Priya M.',
    role: 'Owner, Allied Health Practice (Sydney)',
  },
  {
    quote:
      'The compliance day alone was worth it. We rolled the agent out three weeks later with a clean APP review.',
    name: 'James T.',
    role: 'Tech Lead, Property Services (Melbourne)',
  },
];

export default function CommunityBootcampsPage() {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'LongCare AU Bootcamps',
    url: 'https://longcare.au/community/bootcamps',
    parentOrganization: { '@type': 'Organization', name: 'LongCare AU' },
  };

  const courseSchemas = BOOTCAMPS.map((b) => ({
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: b.title,
    description: b.outcome,
    provider: { '@type': 'Organization', name: 'LongCare AU', url: 'https://longcare.au' },
    educationalCredentialAwarded: 'Certificate of Completion',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: b.slug === 'ai-for-sme-owners' ? 'blended' : 'online',
      courseWorkload: 'P5D',
    },
    offers: {
      '@type': 'Offer',
      price: b.priceNumber.toFixed(2),
      priceCurrency: 'AUD',
      availability: 'https://schema.org/InStock',
      url: `https://book.longcare.au?service=bootcamp-${b.slug}`,
    },
    url: `https://longcare.au/community/bootcamps#${b.slug}`,
  }));

  return (
    <main className="bg-[#F8FAFC] text-slate-800 pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      {courseSchemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Community', url: '/community' },
            { name: 'Bootcamps', url: '/community/bootcamps' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-6 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">
              <Flame className="size-3" /> Bootcamps
            </Badge>
            <h1 className="mt-4 font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              AI Bootcamps for SMEs
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              5-day intensive programs to ship one AI workflow that pays for itself.
            </p>
          </div>
          <div className="hidden lg:block">
            <HeroCommunity className="text-amber-700" width={360} height={280} />
          </div>
        </div>
      </section>

      {/* Bootcamp cards */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <div className="grid gap-8 lg:grid-cols-2">
          {BOOTCAMPS.map((b) => (
            <article
              key={b.slug}
              id={b.slug}
              className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-2xl font-semibold text-slate-900">{b.title}</h2>
                <div className="text-right">
                  <div className="text-2xl font-semibold text-sky-700 whitespace-nowrap">{b.price}</div>
                  <div className="text-xs text-slate-500">inc GST</div>
                </div>
              </div>
              <p className="mt-2 text-sm text-slate-500">{b.audience}</p>

              <div className="mt-4 inline-flex items-start gap-2 text-slate-700 bg-emerald-50 border border-emerald-100 rounded-lg p-3">
                <CheckCircle2 className="size-5 text-emerald-700 shrink-0 mt-0.5" />
                <span className="text-sm"><strong className="text-emerald-900">Outcome:</strong> {b.outcome}</span>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm text-slate-700">
                <Calendar className="size-4 text-sky-700 shrink-0" />
                <span>{b.format}</span>
              </div>

              <h3 className="mt-6 text-sm font-semibold text-slate-900 uppercase tracking-wide">Curriculum</h3>
              <ol className="mt-3 space-y-3">
                {b.curriculum.map((c) => (
                  <li key={c.day} className="flex gap-3">
                    <div className="shrink-0 w-20 text-xs font-semibold text-sky-700 pt-0.5">{c.day}</div>
                    <div>
                      <div className="text-sm font-medium text-slate-900">{c.title}</div>
                      <div className="text-sm text-slate-600">{c.description}</div>
                    </div>
                  </li>
                ))}
              </ol>

              <h3 className="mt-6 text-sm font-semibold text-slate-900 uppercase tracking-wide">Includes</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {b.includes.map((it) => (
                  <li key={it} className="flex items-start gap-2">
                    <Award className="size-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>

              <a
                href={`https://book.longcare.au?service=bootcamp-${b.slug}`}
                className="mt-8 inline-flex items-center justify-center gap-2 bg-sky-700 hover:bg-sky-600 text-white px-5 py-3 rounded-full text-sm font-semibold transition"
              >
                Apply <ArrowRight className="size-4" />
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <h2 className="text-2xl font-semibold text-slate-900 mb-6">What past attendees say</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm"
            >
              <Quote className="size-6 text-sky-700" />
              <blockquote className="mt-3 text-slate-700">{t.quote}</blockquote>
              <figcaption className="mt-4 text-sm text-slate-500">
                <strong className="text-slate-900">{t.name}</strong> — {t.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Cross-links */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10">
        <div className="bg-slate-900 text-white rounded-xl p-8 sm:p-12 text-center">
          <Users className="size-10 text-sky-400 mx-auto" />
          <h2 className="mt-4 text-2xl sm:text-3xl font-semibold">Not ready for 5 days?</h2>
          <p className="mt-3 text-slate-300 max-w-xl mx-auto">
            Try a 2-hour <Link href="/community/workshops" className="underline text-sky-400">workshop</Link>, browse the self-paced <Link href="/academy" className="underline text-sky-400">Academy</Link>, or join our weekly <Link href="/community/network" className="underline text-sky-400">community digest</Link>.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Link href="/community/workshops" className="bg-sky-600 hover:bg-sky-500 text-white px-6 py-3 rounded-full text-sm font-semibold inline-flex items-center gap-2">
              <GraduationCap className="size-4" /> Workshops
            </Link>
            <Link href="/contact?topic=bootcamp-info" className="border border-slate-600 hover:border-slate-400 px-6 py-3 rounded-full text-sm font-semibold inline-flex items-center gap-2">
              <MessageSquare className="size-4" /> Talk to us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
