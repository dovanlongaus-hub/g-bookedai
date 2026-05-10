import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Mail,
  FileText,
  FileSpreadsheet,
  Mic,
  MessageCircle,
  Megaphone,
  Users,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Wallet,
  ScrollText,
  Server,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { HeroToolkitMotion } from '@/components/illustrations/animated';
import { WaitlistForm } from './waitlist-form';

export const metadata: Metadata = getPageMetadata({
  title: 'AI Toolkit — 7 Apps for SMEs | LongCare AU',
  description:
    'Seven specialised AI mini-apps for Australian SMEs: email, documents, proposals, meetings, support, social, and HR. One plan, A$29/month, AU data residency.',
  path: '/toolkit',
});

type Tool = {
  slug: string;
  name: string;
  Icon: typeof Mail;
  blurb: string;
  saves: string;
};

const TOOLS: Tool[] = [
  {
    slug: 'email-assistant',
    name: 'Email Assistant',
    Icon: Mail,
    blurb: 'Reply, summarise, draft. Tone-aware.',
    saves: 'Saves ~6 hrs/week',
  },
  {
    slug: 'document-generator',
    name: 'Document Generator',
    Icon: FileText,
    blurb: 'Briefs, reports, SOPs from prompts.',
    saves: 'Saves ~4 hrs/week',
  },
  {
    slug: 'proposal-writer',
    name: 'Proposal Writer',
    Icon: FileSpreadsheet,
    blurb: 'Sales proposals tailored to each prospect.',
    saves: 'Cuts proposal time 70%',
  },
  {
    slug: 'meeting-assistant',
    name: 'Meeting Assistant',
    Icon: Mic,
    blurb: 'Notes, action items, follow-ups.',
    saves: 'Saves ~3 hrs/week',
  },
  {
    slug: 'customer-support',
    name: 'Customer Support',
    Icon: MessageCircle,
    blurb: 'AI replies for tickets and chat.',
    saves: 'First-response in seconds',
  },
  {
    slug: 'social-media',
    name: 'Social Media',
    Icon: Megaphone,
    blurb: 'Posts, captions, calendar across 4 platforms.',
    saves: '30 posts in 30 minutes',
  },
  {
    slug: 'hr-assistant',
    name: 'HR Assistant',
    Icon: Users,
    blurb: 'Job specs, interview Qs, onboarding checklists.',
    saves: 'Fair Work-aligned',
  },
];

const WHY_BULLETS = [
  {
    title: 'One bill, seven tools',
    body: 'Single A$29/month subscription replaces a stack of point tools and seat-based add-ons.',
    Icon: Wallet,
  },
  {
    title: 'Shared brand voice',
    body: 'Train your tone once. Every tool — emails, proposals, social — speaks with the same voice.',
    Icon: Sparkles,
  },
  {
    title: 'AU data residency',
    body: 'Hosted in australia-southeast1 (Sydney) on Vertex AI. Your prompts never train public models.',
    Icon: ShieldCheck,
  },
  {
    title: 'Audit trail by default',
    body: 'Every generation, edit, and approval is logged with actor and timestamp for governance.',
    Icon: ScrollText,
  },
];

const PRICING = [
  {
    name: 'Free',
    price: 'A$0',
    cadence: 'forever',
    features: [
      '100 generations / month per tool',
      'All 7 tools included',
      'AU data residency',
      'Email support',
    ],
    cta: 'Join waitlist',
    highlight: false,
  },
  {
    name: 'SME',
    price: 'A$29',
    cadence: 'per month, GST inclusive',
    features: [
      'Unlimited generations',
      'All 7 tools included',
      'Brand voice memory',
      'Priority support',
      '5 team seats',
    ],
    cta: 'Join waitlist',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    cadence: 'annual contract',
    features: [
      'Unlimited seats',
      'SSO + SCIM',
      'Custom data retention',
      'Dedicated success manager',
      'SLA & DPA',
    ],
    cta: 'Book a call',
    highlight: false,
  },
];

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'LongCare AI Toolkit',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: 'https://longcare.au/toolkit',
  description:
    'Seven specialised AI mini-apps for Australian SMEs: Email Assistant, Document Generator, Proposal Writer, Meeting Assistant, Customer Support, Social Media, HR Assistant.',
  offers: {
    '@type': 'Offer',
    price: '29.00',
    priceCurrency: 'AUD',
    availability: 'https://schema.org/PreOrder',
  },
  featureList: [
    'AI email replies and drafts',
    'AI document and SOP generator',
    'AI proposal writer',
    'AI meeting notes and action items',
    'AI customer support replies',
    'AI social media calendar',
    'AI HR assistant for hiring and onboarding',
    'Australian data residency (Sydney)',
    'Brand voice memory',
    'Audit trail and approval workflow',
  ],
  provider: {
    '@type': 'Organization',
    name: 'LongCare AU',
    url: 'https://longcare.au',
  },
};

export default function ToolkitHubPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />

      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Toolkit', url: '/toolkit' },
          ]}
        />

        {/* Hero */}
        <section className="mt-6 grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-100">
              <Sparkles className="size-3.5" aria-hidden />
              Launching Q3 2026 · Early access open
            </span>
            <h1 className="font-heading mt-5 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              AI Toolkit for Australian SMEs
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-700">
              Seven specialised AI mini-apps that save your team 10+ hours per week.
              Built for Australian small-to-medium businesses, hosted in Sydney, billed
              in AUD.
            </p>

            {/* Stats strip */}
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-slate-600">
              <span>
                <strong className="text-slate-900">7</strong> tools
              </span>
              <span aria-hidden className="text-slate-300">
                ·
              </span>
              <span>
                <strong className="text-slate-900">1</strong> plan
              </span>
              <span aria-hidden className="text-slate-300">
                ·
              </span>
              <span>
                <strong className="text-slate-900">A$29</strong>/mo
              </span>
              <span aria-hidden className="text-slate-300">
                ·
              </span>
              <span>
                Free tier <strong className="text-slate-900">100 runs</strong>/month
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#waitlist"
                className="inline-flex items-center gap-2 rounded-full bg-sky-700 px-6 py-3 font-semibold text-white no-underline transition hover:bg-sky-600"
              >
                Join the waitlist <ArrowRight className="size-4" aria-hidden />
              </a>
              <a
                href="https://book.longcare.au?service=toolkit-discovery"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 no-underline transition hover:border-slate-400"
              >
                Book a Discovery Call
              </a>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroToolkitMotion className="text-sky-700" width={420} height={320} />
          </div>
        </section>

        {/* Tool grid */}
        <section className="mt-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="font-heading text-2xl font-semibold text-slate-900 sm:text-3xl">
              The seven tools
            </h2>
            <p className="hidden text-sm text-slate-500 sm:block">
              All included in every plan
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map(({ slug, name, Icon, blurb, saves }) => (
              <Link
                key={slug}
                href={`/toolkit/${slug}`}
                className="group flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md sm:p-8"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-sky-50 text-sky-700 ring-1 ring-sky-100">
                  <Icon className="size-6" aria-hidden />
                </div>
                <h3 className="font-heading mt-5 text-xl font-semibold text-slate-900 group-hover:text-sky-700">
                  {name}
                </h3>
                <p className="mt-2 text-sm text-slate-700">{blurb}</p>
                <p className="mt-3 text-xs font-medium text-emerald-700">{saves}</p>
                <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-sky-700 transition-transform group-hover:translate-x-0.5">
                  Explore tool <ArrowRight className="size-4" aria-hidden />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Why one platform */}
        <section className="mt-20 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <h2 className="font-heading text-2xl font-semibold text-slate-900 sm:text-3xl">
            Why one platform?
          </h2>
          <p className="mt-3 max-w-2xl text-slate-700">
            Most SMEs end up with five different AI subscriptions, none of which talk
            to each other. The Toolkit fixes that.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {WHY_BULLETS.map(({ title, body, Icon }) => (
              <div key={title} className="flex gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                  <Icon className="size-5" aria-hidden />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{title}</h3>
                  <p className="mt-1 text-sm text-slate-700">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="mt-20">
          <div className="text-center">
            <h2 className="font-heading text-2xl font-semibold text-slate-900 sm:text-3xl">
              Plans &amp; pricing
            </h2>
            <p className="mt-3 text-slate-700">
              Simple, predictable, GST inclusive.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {PRICING.map((plan) => (
              <div
                key={plan.name}
                className={`flex flex-col rounded-xl border p-6 shadow-sm sm:p-8 ${
                  plan.highlight
                    ? 'border-sky-300 bg-sky-50/40 ring-1 ring-sky-200'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-lg font-semibold text-slate-900">
                    {plan.name}
                  </h3>
                  {plan.highlight ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-2 py-0.5 text-xs font-semibold text-sky-700">
                      Most popular
                    </span>
                  ) : null}
                </div>
                <p className="mt-4 text-3xl font-semibold text-slate-900">
                  {plan.price}
                </p>
                <p className="text-xs text-slate-500">{plan.cadence}</p>
                <ul className="mt-6 space-y-2 text-sm text-slate-700">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckCircle2
                        className="mt-0.5 size-4 shrink-0 text-emerald-600"
                        aria-hidden
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={
                    plan.name === 'Enterprise'
                      ? 'https://book.longcare.au?service=toolkit-discovery'
                      : '#waitlist'
                  }
                  className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold no-underline transition ${
                    plan.highlight
                      ? 'bg-sky-700 text-white hover:bg-sky-600'
                      : 'border border-slate-300 text-slate-700 hover:border-slate-400'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="size-4" aria-hidden />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Under the hood */}
        <section className="mt-20 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <div className="flex items-center gap-3">
            <Server className="size-6 text-sky-700" aria-hidden />
            <h2 className="font-heading text-2xl font-semibold text-slate-900">
              Built on the Google-first stack
            </h2>
          </div>
          <ul className="mt-6 grid grid-cols-1 gap-4 text-sm text-slate-700 sm:grid-cols-3">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden />
              Gemini 2.0 Flash via Vertex AI for low-latency, high-quality output.
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden />
              Hosted in <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">australia-southeast1</code> for AU
              data residency.
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden />
              Your prompts never train public models. Privacy Act 1988 (APP 1–13) aligned.
            </li>
          </ul>
        </section>

        {/* Waitlist */}
        <section
          id="waitlist"
          className="mt-20 rounded-xl border border-sky-200 bg-gradient-to-br from-sky-50 to-emerald-50 p-6 shadow-sm sm:p-12"
        >
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-2xl font-semibold text-slate-900 sm:text-3xl">
              Get early access
            </h2>
            <p className="mt-3 text-slate-700">
              Drop your email and we&apos;ll invite you when the Toolkit goes live in
              Q3 2026. Early access pilots get three months at the launch price locked
              in for the first year.
            </p>
            <div className="mt-8">
              <WaitlistForm source="toolkit-waitlist" />
            </div>
            <p className="mt-4 text-xs text-slate-500">
              No spam. Unsubscribe any time. Read our{' '}
              <Link href="/privacy" className="underline">
                privacy policy
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mt-16 text-center">
          <h2 className="font-heading text-2xl font-semibold text-slate-900">
            Want a guided walkthrough?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-700">
            Book a 30-minute discovery call. We&apos;ll map your highest-leverage
            workflows and show you how the Toolkit replaces what you currently pay for.
          </p>
          <a
            href="https://book.longcare.au?service=toolkit-discovery"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-sky-700 px-6 py-3 font-semibold text-white no-underline transition hover:bg-sky-600"
          >
            Book a Discovery Call <ArrowRight className="size-4" aria-hidden />
          </a>
        </section>
      </div>
    </main>
  );
}
