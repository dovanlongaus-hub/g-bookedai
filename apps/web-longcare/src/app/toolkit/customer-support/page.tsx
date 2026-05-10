import type { Metadata } from 'next';
import Link from 'next/link';
import {
  MessageCircle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  ServerCog,
  Lock,
  ShoppingBag,
  UtensilsCrossed,
  GraduationCap,
  Mail,
  FileText,
  Megaphone,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { FlowThreeStep } from '@/components/illustrations/flow-three-step';
import { WaitlistForm } from '../waitlist-form';

export const metadata: Metadata = getPageMetadata({
  title: 'AI Customer Support — Replies & Triage | LongCare AU',
  description:
    'First-response in seconds. Human handoff when it matters. AI auto-reply, FAQ-grounded answers, sentiment detection, multilingual. Free tier 100 runs/month.',
  path: '/toolkit/customer-support',
});

const FEATURES = [
  {
    title: 'AI auto-reply',
    body: 'Drafts a first response to every ticket and chat in under three seconds.',
  },
  {
    title: 'FAQ-grounded answers (RAG)',
    body: 'Pulls answers from your help centre, policies, and product docs — no hallucinations.',
  },
  {
    title: 'Sentiment detection',
    body: 'Flags angry or churn-risk customers and escalates to a human reviewer.',
  },
  {
    title: 'Escalation rules',
    body: 'Configurable handoff for refunds, complaints, VIPs, or anything you choose.',
  },
  {
    title: 'Multilingual (en/vi/zh)',
    body: 'Detects the customer language and replies in kind — Vietnamese, Chinese, English.',
  },
  {
    title: 'Helpdesk integrations',
    body: 'Plays nicely with Intercom, Zendesk, Freshdesk, and Gmail-based queues.',
  },
];

const PERSONAS = [
  'Support team leads cutting first-response time',
  'E-commerce ops handling weekend ticket surges',
  'SaaS founders without a 24/7 support team',
  'Multilingual brands serving en/vi/zh customers',
];

const INDUSTRIES = [
  {
    name: 'Retail',
    body: 'Order status, refunds, exchanges, and store-policy questions answered instantly.',
    href: '/solutions/retail',
    Icon: ShoppingBag,
  },
  {
    name: 'Hospitality',
    body: 'Booking changes, dietary requests, and after-hours guest enquiries.',
    href: '/solutions/hospitality',
    Icon: UtensilsCrossed,
  },
  {
    name: 'Education',
    body: 'Parent enquiries about enrolment, fees, and term schedules — multilingual.',
    href: '/solutions/education',
    Icon: GraduationCap,
  },
];

const SIBLINGS = [
  {
    slug: 'email-assistant',
    name: 'Email Assistant',
    blurb: 'Reply, summarise, draft. Tone-aware and brand-aware.',
    Icon: Mail,
  },
  {
    slug: 'document-generator',
    name: 'Document Generator',
    blurb: 'FAQs, policies, and SOPs the support AI can ground on.',
    Icon: FileText,
  },
  {
    slug: 'social-media',
    name: 'Social Media',
    blurb: 'Posts, captions, and a calendar across four platforms.',
    Icon: Megaphone,
  },
];

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'LongCare AI Customer Support',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: 'https://longcare.au/toolkit/customer-support',
  description:
    'AI customer support assistant for Australian SMEs. AI auto-reply, FAQ-grounded answers, sentiment-driven escalation, multilingual replies, helpdesk integrations.',
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

export default function CustomerSupportPage() {
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
            { name: 'Customer Support', url: '/toolkit/customer-support' },
          ]}
        />

        <section className="mx-auto mt-6 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-100">
            <Sparkles className="size-3.5" aria-hidden /> Early access · launching Q3 2026
          </span>
          <div className="mx-auto mt-6 flex size-14 items-center justify-center rounded-2xl bg-sky-50 text-sky-700 ring-1 ring-sky-100">
            <MessageCircle className="size-7" aria-hidden />
          </div>
          <h1 className="font-heading mt-5 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            AI Customer Support
          </h1>
          <p className="mt-5 text-lg text-slate-700">
            First-response in seconds. Human handoff when it matters.
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

        <section className="mt-20">
          <h2 className="font-heading text-2xl font-semibold text-slate-900 sm:text-3xl">
            Sample input → output
          </h2>
          <div className="mt-8 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-10 overflow-x-auto">
            <div className="flex justify-center">
              <FlowThreeStep width={760} height={140} />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4 text-center text-sm text-slate-600 max-w-2xl mx-auto">
              <div><strong className="text-slate-900 block">Receive</strong>Customer message lands</div>
              <div><strong className="text-slate-900 block">Reply</strong>AI suggests response</div>
              <div><strong className="text-slate-900 block">Resolve</strong>Agent approves &amp; sends</div>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
                Customer chat
              </span>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                <strong className="block text-slate-900">From: jenny@example.com</strong>
                <span className="mt-3 block">
                  &ldquo;Hi, where&apos;s my order #12345? It&apos;s been five days and
                  I haven&apos;t received any tracking. Getting worried.&rdquo;
                </span>
              </p>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-6 shadow-sm sm:p-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                AI response · grounded in your order data
              </span>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                <strong className="block text-slate-900">Hi Jenny,</strong>
                <span className="mt-3 block">
                  Thanks for reaching out — I can see order #12345 was dispatched on
                  Tuesday with Australia Post. Tracking number AP9876543. The latest
                  scan shows it&apos;s in your local depot in Brunswick and is out for
                  delivery today.
                </span>
                <span className="mt-3 block">
                  Track here: <span className="text-sky-700">[tracking link]</span>.
                  If it doesn&apos;t arrive by 6pm, reply here and I&apos;ll loop in
                  our delivery team.
                </span>
                <span className="mt-3 block">Cheers, Support</span>
              </p>
            </div>
          </div>
        </section>

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
                  Routed via Vertex AI for sub-second response generation.
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
                  Hosted in <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">australia-southeast1</code>.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Lock className="mt-0.5 size-5 shrink-0 text-sky-700" aria-hidden />
              <div>
                <h3 className="font-semibold text-slate-900">No training on your data</h3>
                <p className="mt-1 text-sm text-slate-700">
                  Customer messages stay in your tenant. Privacy Act 1988 (APP)
                  aligned.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <h2 className="font-heading text-2xl font-semibold text-slate-900 sm:text-3xl">
            Pricing
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-slate-900">Free tier</p>
              <p className="mt-2 text-sm text-slate-700">
                100 AI replies per month. Forever. No credit card required.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">SME plan · A$29/month</p>
              <p className="mt-2 text-sm text-slate-700">
                Unlimited replies across all 7 Toolkit apps, helpdesk integrations,
                response analytics.
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

        <section
          id="waitlist"
          className="mt-20 rounded-xl border border-sky-200 bg-gradient-to-br from-sky-50 to-emerald-50 p-6 shadow-sm sm:p-12"
        >
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-2xl font-semibold text-slate-900 sm:text-3xl">
              Get early access to Customer Support
            </h2>
            <p className="mt-3 text-slate-700">
              Cut first-response times to seconds. Join the waitlist below.
            </p>
            <div className="mt-8">
              <WaitlistForm source="toolkit-waitlist-customer-support" />
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
