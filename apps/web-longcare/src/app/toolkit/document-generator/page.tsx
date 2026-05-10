import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FileText,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  ServerCog,
  Lock,
  Stethoscope,
  GraduationCap,
  Wrench,
  Mail,
  FileSpreadsheet,
  Mic,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { FlowThreeStep } from '@/components/illustrations/flow-three-step';
import { WaitlistForm } from '../waitlist-form';

export const metadata: Metadata = getPageMetadata({
  title: 'AI Document Generator — Briefs to Reports | LongCare AU',
  description:
    'From a one-line prompt to a polished document. AU spelling and tone, every time. SOPs, briefs, reports, FAQs. Free tier 100 runs/month.',
  path: '/toolkit/document-generator',
});

const FEATURES = [
  {
    title: 'Briefs, reports, SOPs, FAQs',
    body: 'Pick a doc type or describe one in plain English. The AI structures the rest.',
  },
  {
    title: 'Multi-section docs',
    body: 'Generate 1,500–3,000 word documents with headings, sub-sections, and a TOC.',
  },
  {
    title: 'Editable inline',
    body: 'Refine any paragraph with a comment-style instruction — no full rewrites.',
  },
  {
    title: 'Export to .docx and .pdf',
    body: 'Hand off to staff, lawyers, or accountants without copy-paste gymnastics.',
  },
  {
    title: 'Brand template support',
    body: 'Upload a Word template once. Every export inherits your fonts and logo.',
  },
  {
    title: 'Auto-generated table of contents',
    body: 'Anchored headings make 30-page documents navigable from page one.',
  },
];

const PERSONAS = [
  'Operations managers writing SOPs across multiple teams',
  'Founders documenting policies they keep meaning to write down',
  'Consultants delivering branded briefs at client speed',
  'Project managers needing weekly status reports without the toil',
];

const INDUSTRIES = [
  {
    name: 'Healthcare',
    body: 'Compliance docs, infection-control SOPs, and patient information sheets.',
    href: '/solutions/healthcare',
    Icon: Stethoscope,
  },
  {
    name: 'Education',
    body: 'Curriculum outlines, lesson plans, and parent communication packs.',
    href: '/solutions/education',
    Icon: GraduationCap,
  },
  {
    name: 'Trades',
    body: 'Job specifications, safety method statements, and warranty documents.',
    href: '/solutions/trades',
    Icon: Wrench,
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
    slug: 'proposal-writer',
    name: 'Proposal Writer',
    blurb: 'Sales proposals tailored to each prospect in under five minutes.',
    Icon: FileSpreadsheet,
  },
  {
    slug: 'meeting-assistant',
    name: 'Meeting Assistant',
    blurb: 'Notes, action items, follow-ups generated automatically.',
    Icon: Mic,
  },
];

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'LongCare AI Document Generator',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: 'https://longcare.au/toolkit/document-generator',
  description:
    'AI document generator for Australian SMEs. Briefs, reports, SOPs, and FAQs from a single prompt with AU spelling, brand templates, and .docx/.pdf export.',
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

export default function DocumentGeneratorPage() {
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
            { name: 'Document Generator', url: '/toolkit/document-generator' },
          ]}
        />

        <section className="mx-auto mt-6 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-100">
            <Sparkles className="size-3.5" aria-hidden /> Early access · launching Q3 2026
          </span>
          <div className="mx-auto mt-6 flex size-14 items-center justify-center rounded-2xl bg-sky-50 text-sky-700 ring-1 ring-sky-100">
            <FileText className="size-7" aria-hidden />
          </div>
          <h1 className="font-heading mt-5 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            AI Document Generator
          </h1>
          <p className="mt-5 text-lg text-slate-700">
            From a one-line prompt to a polished document. Australian English and
            tone, every time.
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
              <div><strong className="text-slate-900 block">Prompt</strong>Describe what you need</div>
              <div><strong className="text-slate-900 block">Generate</strong>AI drafts the document</div>
              <div><strong className="text-slate-900 block">Refine</strong>Edit &amp; export</div>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
                Prompt
              </span>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                &ldquo;Create a Standard Operating Procedure for onboarding new staff
                at a 10-person GP clinic in Sydney. Cover Day 1, Week 1, and Day 30
                checkpoints. Include AHPRA registration verification and infection
                control orientation.&rdquo;
              </p>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-6 shadow-sm sm:p-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                AI output · ~1,500-word SOP
              </span>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li>
                  <strong className="text-slate-900">1. Purpose &amp; scope</strong> — defines what this SOP covers and who owns it.
                </li>
                <li>
                  <strong className="text-slate-900">2. Pre-arrival checklist</strong> — AHPRA verification, contracts, IT access.
                </li>
                <li>
                  <strong className="text-slate-900">3. Day 1: Welcome &amp; orientation</strong> — clinic tour, infection control, emergency procedures.
                </li>
                <li>
                  <strong className="text-slate-900">4. Week 1: Shadowing &amp; systems</strong> — Best Practice software, billing, patient flow.
                </li>
                <li>
                  <strong className="text-slate-900">5. Day 30: Review checkpoint</strong> — competency sign-off, feedback, goal setting.
                </li>
                <li>
                  <strong className="text-slate-900">6. Appendices</strong> — checklists, sign-off forms, escalation contacts.
                </li>
              </ul>
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
                  Routed via Vertex AI for low-latency long-form generation.
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
                  Your documents stay yours. Privacy Act 1988 (APP) aligned.
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
                100 documents per month. Forever. No credit card required.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">SME plan · A$29/month</p>
              <p className="mt-2 text-sm text-slate-700">
                Unlimited generations across all 7 Toolkit apps, brand templates,
                shared team library.
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
              Get early access to Document Generator
            </h2>
            <p className="mt-3 text-slate-700">
              Join the waitlist and we&apos;ll invite you when the Toolkit goes live.
            </p>
            <div className="mt-8">
              <WaitlistForm source="toolkit-waitlist-document-generator" />
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
