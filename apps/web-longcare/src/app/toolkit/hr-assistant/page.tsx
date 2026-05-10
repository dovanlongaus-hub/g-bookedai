import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  ServerCog,
  Lock,
  Stethoscope,
  UtensilsCrossed,
  Briefcase,
  Wrench,
  Mail,
  FileText,
  Megaphone,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { FlowThreeStep } from '@/components/illustrations/flow-three-step';
import { WaitlistForm } from '../waitlist-form';

export const metadata: Metadata = getPageMetadata({
  title: 'AI HR Assistant — Job Specs to Onboarding | LongCare AU',
  description:
    'From job spec to first-day checklist in minutes. Fair Work-aligned interview banks, screening summaries, and onboarding plans. Free tier 100 runs/month.',
  path: '/toolkit/hr-assistant',
});

const FEATURES = [
  {
    title: 'Job description writer',
    body: 'A polished JD in under 60 seconds with role outcomes, must-haves, and benefits.',
  },
  {
    title: 'Interview question bank',
    body: 'Role-specific behavioural and technical questions, scored against a rubric.',
  },
  {
    title: 'Candidate screening summaries',
    body: 'Paste in CVs, get a 5-bullet shortlist summary plus next-step suggestions.',
  },
  {
    title: 'Onboarding checklist generator',
    body: 'Day 1 / Week 1 / Day 30 / Day 90 checklists tailored to the role.',
  },
  {
    title: 'Performance review templates',
    body: 'Mid-year and end-of-year review prompts that are conversational, not stiff.',
  },
  {
    title: 'Fair Work-aware language',
    body: 'Australian award and minimum-condition phrasing baked in. Discrimination-flag review.',
  },
];

const PERSONAS = [
  'HR managers running solo across 30+ employees',
  'Founders without a dedicated HR team',
  'Operations leads who own people processes by default',
  'Recruitment agencies producing shortlists at speed',
];

const INDUSTRIES = [
  {
    name: 'Healthcare',
    body: 'Clinical and admin roles with AHPRA and NDIS-aware language.',
    href: '/solutions/healthcare',
    Icon: Stethoscope,
  },
  {
    name: 'Hospitality',
    body: 'Casual rosters, junior wage compliance, and high-turnover onboarding.',
    href: '/solutions/hospitality',
    Icon: UtensilsCrossed,
  },
  {
    name: 'Professional Services',
    body: 'Senior hires with compensation framing and partnership-track language.',
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
    slug: 'email-assistant',
    name: 'Email Assistant',
    blurb: 'Reply, summarise, draft. Tone-aware and brand-aware.',
    Icon: Mail,
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
  name: 'LongCare AI HR Assistant',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: 'https://longcare.au/toolkit/hr-assistant',
  description:
    'AI HR assistant for Australian SMEs. Job specs, interview question banks, candidate screening summaries, onboarding checklists, and Fair Work-aware language.',
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

export default function HrAssistantPage() {
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
            { name: 'HR Assistant', url: '/toolkit/hr-assistant' },
          ]}
        />

        <section className="mx-auto mt-6 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-100">
            <Sparkles className="size-3.5" aria-hidden /> Early access · launching Q3 2026
          </span>
          <div className="mx-auto mt-6 flex size-14 items-center justify-center rounded-2xl bg-sky-50 text-sky-700 ring-1 ring-sky-100">
            <Users className="size-7" aria-hidden />
          </div>
          <h1 className="font-heading mt-5 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            AI HR Assistant
          </h1>
          <p className="mt-5 text-lg text-slate-700">
            From job spec to first-day checklist in minutes. Fair Work-aligned.
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
              <div><strong className="text-slate-900 block">Brief</strong>Role or HR task input</div>
              <div><strong className="text-slate-900 block">Generate</strong>AI drafts compliant doc</div>
              <div><strong className="text-slate-900 block">Approve</strong>Review &amp; publish</div>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
                Prompt
              </span>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                &ldquo;Hire a part-time medical receptionist for a 5-person GP clinic
                in Sydney. Three days a week. Must speak basic Mandarin. Award:
                Health Professionals and Support Services.&rdquo;
              </p>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-6 shadow-sm sm:p-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                AI output · spec + interview + onboarding
              </span>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li>
                  <strong className="text-slate-900">Job spec (1 page):</strong>{' '}
                  outcomes, must-haves, award classification, hours, indicative
                  pay range.
                </li>
                <li>
                  <strong className="text-slate-900">Interview questions (8):</strong>{' '}
                  4 behavioural, 2 scenario-based, 2 cultural-fit — with rubric.
                </li>
                <li>
                  <strong className="text-slate-900">Onboarding plan (14 days):</strong>{' '}
                  IT setup, software training, shadow shifts, sign-offs.
                </li>
                <li>
                  <strong className="text-slate-900">Compliance flags:</strong>{' '}
                  ensures wording is non-discriminatory and award-aligned.
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
          <p className="mt-6 text-sm text-slate-500">
            Also great for{' '}
            <Link href="/solutions/trades" className="text-sky-700 underline">
              trades teams
            </Link>{' '}
            hiring apprentices and 2IC site leads.
            <Wrench className="ml-1 inline size-4 text-slate-400" aria-hidden />
          </p>
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
                  Routed via Vertex AI for structured, role-aware generation.
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
                  CVs and HR documents stay confidential. Privacy Act 1988 (APP)
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
                100 generations per month. Forever. No credit card required.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">SME plan · A$29/month</p>
              <p className="mt-2 text-sm text-slate-700">
                Unlimited generations across all 7 Toolkit apps, candidate library,
                shared interview rubrics.
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
              Get early access to HR Assistant
            </h2>
            <p className="mt-3 text-slate-700">
              Hire faster, onboard better. Join the waitlist below.
            </p>
            <div className="mt-8">
              <WaitlistForm source="toolkit-waitlist-hr-assistant" />
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
