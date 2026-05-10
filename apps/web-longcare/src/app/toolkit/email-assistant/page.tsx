import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Mail,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  ServerCog,
  Lock,
  Briefcase,
  Stethoscope,
  ShoppingBag,
  FileText,
  FileSpreadsheet,
  Mic,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { FlowThreeStep } from '@/components/illustrations/flow-three-step';
import { WaitlistForm } from '../waitlist-form';

export const metadata: Metadata = getPageMetadata({
  title: 'AI Email Assistant — Smart Replies & Drafts | LongCare AU',
  description:
    'Reply 3x faster. Tone-matched, brand-aware AI replies and drafts for Australian SMEs. Free tier 100 runs/month. Hosted in Sydney.',
  path: '/toolkit/email-assistant',
});

const FEATURES = [
  {
    title: 'Smart reply suggestions',
    body: 'Three drafted replies for every incoming message — pick, tweak, send.',
  },
  {
    title: 'Tone control',
    body: 'Switch between formal, casual, empathetic, or assertive in one click.',
  },
  {
    title: 'Summarise long threads',
    body: 'Distil 30-message threads into a 3-bullet brief so nothing slips.',
  },
  {
    title: 'Multilingual drafts',
    body: 'Compose in English, Vietnamese, or Chinese with native-grade phrasing.',
  },
  {
    title: 'Brand voice memory',
    body: 'Trained on your past sent emails so replies sound like you, not a robot.',
  },
  {
    title: 'Attachment-aware replies',
    body: 'Reads attached PDFs and quotes the right context in your reply.',
  },
];

const PERSONAS = [
  'Customer success teams who triage 80+ emails per day',
  'Sales reps balancing pipeline follow-ups with live calls',
  'Founders inboxing daily across customers, suppliers, and staff',
  'Executive assistants drafting on behalf of busy executives',
];

const INDUSTRIES = [
  {
    name: 'Healthcare',
    body: 'Patient enquiry replies with empathetic phrasing and clear next-step instructions.',
    href: '/solutions/healthcare',
    Icon: Stethoscope,
  },
  {
    name: 'Retail',
    body: 'Refund, exchange, and order-status replies that match your brand voice.',
    href: '/solutions/retail',
    Icon: ShoppingBag,
  },
  {
    name: 'Professional Services',
    body: 'Client communications with file-aware references and a paper-trail tone.',
    href: '/solutions/professional-services',
    Icon: Briefcase,
  },
];

const SIBLINGS = [
  {
    slug: 'document-generator',
    name: 'Document Generator',
    blurb: 'Briefs, reports, and SOPs from a single prompt.',
    Icon: FileText,
  },
  {
    slug: 'proposal-writer',
    name: 'Proposal Writer',
    blurb: 'Tailored sales proposals in under five minutes.',
    Icon: FileSpreadsheet,
  },
  {
    slug: 'meeting-assistant',
    name: 'Meeting Assistant',
    blurb: 'Notes, action items, and follow-up emails on autopilot.',
    Icon: Mic,
  },
];

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'LongCare AI Email Assistant',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: 'https://longcare.au/toolkit/email-assistant',
  description:
    'AI email assistant for Australian SMEs. Smart replies, tone control, thread summaries, multilingual drafts, brand voice memory, and attachment-aware replies.',
  offers: {
    '@type': 'Offer',
    price: '29.00',
    priceCurrency: 'AUD',
    availability: 'https://schema.org/PreOrder',
  },
  featureList: FEATURES.map((feature) => feature.title),
  provider: {
    '@type': 'Organization',
    name: 'LongCare AU',
    url: 'https://longcare.au',
  },
};

export default function EmailAssistantPage() {
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
            { name: 'Email Assistant', url: '/toolkit/email-assistant' },
          ]}
        />

        {/* Hero */}
        <section className="mx-auto mt-6 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-100">
            <Sparkles className="size-3.5" aria-hidden /> Early access · launching Q3 2026
          </span>
          <div className="mx-auto mt-6 flex size-14 items-center justify-center rounded-2xl bg-sky-50 text-sky-700 ring-1 ring-sky-100">
            <Mail className="size-7" aria-hidden />
          </div>
          <h1 className="font-heading mt-5 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            AI Email Assistant
          </h1>
          <p className="mt-5 text-lg text-slate-700">
            Reply 3x faster. Tone-matched, brand-aware, ready to send.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
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
              Book a demo
            </a>
          </div>
        </section>

        {/* What it does */}
        <section className="mt-20">
          <h2 className="font-heading text-2xl font-semibold text-slate-900 sm:text-3xl">
            What it does
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {FEATURES.map(({ title, body }) => (
              <div
                key={title}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 size-5 shrink-0 text-emerald-600"
                    aria-hidden
                  />
                  <div>
                    <h3 className="font-semibold text-slate-900">{title}</h3>
                    <p className="mt-1 text-sm text-slate-700">{body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Personas */}
        <section className="mt-20 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <h2 className="font-heading text-2xl font-semibold text-slate-900 sm:text-3xl">
            Who it&apos;s for
          </h2>
          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {PERSONAS.map((persona) => (
              <li
                key={persona}
                className="flex items-start gap-3 text-sm text-slate-700"
              >
                <CheckCircle2
                  className="mt-0.5 size-4 shrink-0 text-sky-700"
                  aria-hidden
                />
                {persona}
              </li>
            ))}
          </ul>
        </section>

        {/* Sample I/O */}
        <section className="mt-20">
          <h2 className="font-heading text-2xl font-semibold text-slate-900 sm:text-3xl">
            Sample input → output
          </h2>
          <div className="mt-8 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-10 overflow-x-auto">
            <div className="flex justify-center">
              <FlowThreeStep width={760} height={140} />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4 text-center text-sm text-slate-600 max-w-2xl mx-auto">
              <div><strong className="text-slate-900 block">Receive</strong>Customer email arrives</div>
              <div><strong className="text-slate-900 block">Generate</strong>AI drafts tone-matched reply</div>
              <div><strong className="text-slate-900 block">Send</strong>You approve and ship</div>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
                Incoming email
              </span>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                <strong className="block text-slate-900">From: Maria K.</strong>
                <strong className="block text-slate-900">Subject: VERY disappointed with my last visit</strong>
                <span className="mt-3 block">
                  &ldquo;I&apos;ve been a customer for 3 years and I&apos;m frustrated.
                  My appointment was double-booked, I waited 45 minutes, and no one
                  apologised. I&apos;m considering cancelling my membership.&rdquo;
                </span>
              </p>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-6 shadow-sm sm:p-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                AI suggested reply · Empathetic tone
              </span>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                <strong className="block text-slate-900">Hi Maria,</strong>
                <span className="mt-3 block">
                  Thank you for taking the time to write — and I&apos;m genuinely sorry
                  about Tuesday. A 45-minute wait after a double-booking isn&apos;t the
                  experience we want any of our long-standing members to have, and you
                  deserved an apology on the day.
                </span>
                <span className="mt-3 block">
                  I&apos;ve flagged the booking error with our front desk so it
                  doesn&apos;t happen again, and I&apos;d like to credit your next two
                  visits as a goodwill gesture. Would Wednesday or Friday next week
                  suit for a complimentary follow-up?
                </span>
                <span className="mt-3 block">
                  Warm regards,
                  <br />
                  Sam
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Industries */}
        <section className="mt-20">
          <h2 className="font-heading text-2xl font-semibold text-slate-900 sm:text-3xl">
            Use cases by industry
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {INDUSTRIES.map(({ name, body, href, Icon }) => (
              <Link
                key={name}
                href={href}
                className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-sky-300 hover:shadow-md"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-sky-50 text-sky-700 ring-1 ring-sky-100">
                  <Icon className="size-5" aria-hidden />
                </div>
                <h3 className="mt-4 font-semibold text-slate-900 group-hover:text-sky-700">
                  {name}
                </h3>
                <p className="mt-2 text-sm text-slate-700">{body}</p>
                <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-sky-700">
                  See {name.toLowerCase()} solutions
                  <ArrowRight className="size-4" aria-hidden />
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Under the hood */}
        <section className="mt-20 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <h2 className="font-heading text-2xl font-semibold text-slate-900 sm:text-3xl">
            What&apos;s under the hood
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex items-start gap-3">
              <ServerCog className="mt-0.5 size-5 shrink-0 text-sky-700" aria-hidden />
              <div>
                <h3 className="font-semibold text-slate-900">Gemini 2.0 Flash</h3>
                <p className="mt-1 text-sm text-slate-700">
                  Routed via Vertex AI for sub-second responses on long inboxes.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck
                className="mt-0.5 size-5 shrink-0 text-sky-700"
                aria-hidden
              />
              <div>
                <h3 className="font-semibold text-slate-900">AU data residency</h3>
                <p className="mt-1 text-sm text-slate-700">
                  Hosted in <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">australia-southeast1</code>{' '}
                  (Sydney).
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Lock className="mt-0.5 size-5 shrink-0 text-sky-700" aria-hidden />
              <div>
                <h3 className="font-semibold text-slate-900">No training on your data</h3>
                <p className="mt-1 text-sm text-slate-700">
                  Your emails never enter public model training sets. Privacy Act
                  aligned.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="mt-20 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <h2 className="font-heading text-2xl font-semibold text-slate-900 sm:text-3xl">
            Pricing
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-slate-900">Free tier</p>
              <p className="mt-2 text-sm text-slate-700">
                100 generations per month. Forever. No credit card required.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">SME plan · A$29/month</p>
              <p className="mt-2 text-sm text-slate-700">
                Unlimited generations across all 7 Toolkit apps, 5 team seats, brand
                voice memory, priority support.
              </p>
            </div>
          </div>
          <div className="mt-6">
            <Link
              href="/toolkit"
              className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700"
            >
              See full plans &amp; pricing <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </section>

        {/* Waitlist */}
        <section
          id="waitlist"
          className="mt-20 rounded-xl border border-sky-200 bg-gradient-to-br from-sky-50 to-emerald-50 p-6 shadow-sm sm:p-12"
        >
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-2xl font-semibold text-slate-900 sm:text-3xl">
              Get early access to Email Assistant
            </h2>
            <p className="mt-3 text-slate-700">
              Join the waitlist and be first to try it. Pilots get launch pricing
              locked in for the first year.
            </p>
            <div className="mt-8">
              <WaitlistForm source="toolkit-waitlist-email-assistant" />
            </div>
            <p className="mt-6 text-sm text-slate-600">
              Want a guided walkthrough?{' '}
              <a
                href="https://book.longcare.au?service=toolkit-discovery"
                className="font-semibold text-sky-700 underline"
              >
                Book a demo
              </a>
              .
            </p>
          </div>
        </section>

        {/* Related tools */}
        <section className="mt-20">
          <h2 className="font-heading text-2xl font-semibold text-slate-900 sm:text-3xl">
            Related tools
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {SIBLINGS.map(({ slug, name, blurb, Icon }) => (
              <Link
                key={slug}
                href={`/toolkit/${slug}`}
                className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-sky-300 hover:shadow-md"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-sky-50 text-sky-700 ring-1 ring-sky-100">
                  <Icon className="size-5" aria-hidden />
                </div>
                <h3 className="mt-4 font-semibold text-slate-900 group-hover:text-sky-700">
                  {name}
                </h3>
                <p className="mt-2 text-sm text-slate-700">{blurb}</p>
                <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-sky-700">
                  Explore <ArrowRight className="size-4" aria-hidden />
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/toolkit"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 no-underline transition hover:border-slate-400"
            >
              Back to Toolkit hub
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
