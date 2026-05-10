import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Briefcase,
  PenSquare,
  HeartPulse,
  Compass,
  GraduationCap,
  Calculator,
  Megaphone,
  Wrench,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { Breadcrumbs } from '../../../components/breadcrumbs';
import { getPageMetadata } from '@/lib/metadata';
import { HeroMentor } from '@/components/illustrations/hero-mentor';
import { FlowFiveStep } from '@/components/illustrations/flow-five-step';

export const metadata: Metadata = getPageMetadata({
  title: 'AI for Individuals & Professionals in Australia | LongCare AU',
  description:
    'Master AI tools, save 10+ hours per week, and stay employable. Starter sessions from A$29, mentor hours, and Academy courses tailored to your role.',
  path: '/for/individuals',
});

const PERSONAS = [
  {
    title: 'Knowledge worker',
    desc: 'Office professionals, analysts, and managers who want AI co-pilot skills for daily work.',
    Icon: Briefcase,
  },
  {
    title: 'Freelancer / Consultant',
    desc: 'Independents who need AI to deliver more client work in less time without losing quality.',
    Icon: PenSquare,
  },
  {
    title: 'Regulated industry pro',
    desc: 'Healthcare, finance, and legal professionals applying AI within APP and AHPRA boundaries.',
    Icon: HeartPulse,
  },
  {
    title: 'Career changer',
    desc: 'Re-skilling into AI-adjacent roles — productivity, prompt engineering, automation.',
    Icon: Compass,
  },
];

const OUTCOMES = [
  'Save 10+ hours per week using AI tools across writing, research, and analysis',
  'Build a personal AI stack tailored to your role and industry',
  'Earn an AI Productivity Specialist certificate from LongCare Academy',
  'Apply prompt engineering reliably with reusable templates and patterns',
];

const PATH_STEPS = [
  {
    n: 1,
    title: 'Assess',
    desc: 'Take the free AI Readiness Quiz to baseline your skills and map your gaps.',
    href: '/resources/ai-readiness',
    cta: 'Start free quiz',
  },
  {
    n: 2,
    title: 'Start',
    desc: 'Book a 30-minute AI Starter session for A$29 — your guided first hands-on AI win.',
    href: '/services/ai-starter',
    cta: 'Book Starter A$29',
  },
  {
    n: 3,
    title: 'Learn',
    desc: 'Enrol in 1–3 Academy courses on prompt engineering, automation, and productivity.',
    href: '/academy',
    cta: 'Browse Academy',
  },
  {
    n: 4,
    title: 'Mentor',
    desc: 'Continue with 1-hour AI Mentor sessions at A$99 to deep-dive into your real workflows.',
    href: '/services/ai-mentor',
    cta: 'Book Mentor A$99',
  },
  {
    n: 5,
    title: 'Certify',
    desc: 'Earn certifications and a portfolio of AI-built artefacts to evidence your new skills.',
    href: '/academy',
    cta: 'View certifications',
  },
];

const PRICE_LADDER = [
  { tier: 'Assess', price: 'A$0', label: 'AI Readiness Quiz', href: '/resources/ai-readiness' },
  { tier: 'Start', price: 'A$29', label: 'AI Starter (30 min)', href: '/services/ai-starter' },
  { tier: 'Learn', price: 'A$49–A$149', label: 'Academy courses', href: '/academy' },
  { tier: 'Mentor', price: 'A$99', label: 'AI Mentor (60 min)', href: '/services/ai-mentor' },
];

const ROLE_USE_CASES = [
  { role: 'Office worker', use: 'Draft emails, summarise meetings, and build dashboards 3× faster.', Icon: Briefcase },
  { role: 'Consultant', use: 'Convert messy client notes into proposals and decks in minutes.', Icon: PenSquare },
  { role: 'Marketer', use: 'Plan campaigns, generate variants, and brief designers with AI.', Icon: Megaphone },
  { role: 'Healthcare pro', use: 'Use AI safely within AHPRA — patient comms, summaries, learning.', Icon: HeartPulse },
  { role: 'Tradie', use: 'Quote, schedule, and follow-up jobs using AI assistants on mobile.', Icon: Wrench },
  { role: 'Educator', use: 'Build lesson plans, rubrics, and personalised feedback at scale.', Icon: GraduationCap },
];

const STORIES = [
  {
    name: 'Senior accountant, Melbourne',
    quote:
      'After three Mentor sessions I built a month-end checklist that AI runs against my client files. I save a full day every week.',
  },
  {
    name: 'Freelance marketer, Brisbane',
    quote:
      'The Starter session paid for itself the same week — my proposal turnaround went from two days to two hours.',
  },
];

const SIBLINGS = [
  { name: 'For Startups', href: '/for/startups' },
  { name: 'For SMEs', href: '/for/smes' },
  { name: 'For Organisations', href: '/for/organisations' },
];

const RELATED = [
  { name: 'AI Academy', href: '/academy' },
  { name: 'AI Starter A$29', href: '/services/ai-starter' },
  { name: 'AI Readiness Quiz', href: '/resources/ai-readiness' },
  { name: 'ROI Calculator', href: '/resources/roi-calculator' },
];

export default function IndividualsPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'LongCare AU — AI for Individuals',
    description:
      'AI up-skilling pathway for individual professionals in Australia: starter sessions from A$29, AI Mentor hours at A$99, and Academy certificates.',
    provider: {
      '@type': 'Organization',
      name: 'LongCare AU',
      url: 'https://longcare.au',
    },
    areaServed: { '@type': 'Country', name: 'Australia' },
    serviceType: 'AI Up-skilling',
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Individual professionals in Australia',
    },
    url: 'https://longcare.au/for/individuals',
  };

  return (
    <main className="bg-[#F8FAFC] text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'For', url: '/for' },
            { name: 'Individuals', url: '/for/individuals' },
          ]}
        />

        {/* Hero */}
        <section className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center pt-4 pb-12">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-sky-50 text-sky-700 border border-sky-200 mb-5">
              <Sparkles className="size-3" aria-hidden /> For Individuals
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              AI for Individuals & Professionals
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Master AI tools, save 10+ hours per week, and stay employable as AI reshapes work.
              Designed for Australian knowledge workers, freelancers, and career changers.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/resources/ai-readiness"
                className="bg-sky-700 hover:bg-sky-600 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline transition"
              >
                Start free assessment <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                href="/services/ai-starter"
                className="border border-slate-300 hover:border-slate-400 text-slate-700 px-6 py-3 rounded-full font-medium inline-flex items-center gap-2 no-underline transition"
              >
                Book Starter A$29
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroMentor className="text-sky-700" width={360} height={270} />
          </div>
        </section>
      </div>

      {/* Personas */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 py-12">
        <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 text-center mb-12">
          You are…
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PERSONAS.map(({ title, desc, Icon }) => (
            <div key={title} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="size-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center mb-4">
                <Icon className="size-5" aria-hidden />
              </div>
              <h3 className="font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Outcomes */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 py-12">
        <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 text-center mb-4">
          Outcomes after 90 days
        </h2>
        <p className="text-slate-600 text-center max-w-2xl mx-auto mb-10">
          What you can realistically achieve in your first quarter on the LongCare individual path.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {OUTCOMES.map((o) => (
            <div
              key={o}
              className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl p-5 shadow-sm"
            >
              <CheckCircle2 className="size-5 text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden />
              <span className="text-sm text-slate-700">{o}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended path */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 py-12">
        <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 text-center mb-4">
          Recommended path
        </h2>
        <p className="text-slate-600 text-center max-w-2xl mx-auto mb-10">
          A five-step journey from your first free assessment to certified AI productivity.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-10 mb-10 overflow-x-auto">
          <div className="flex justify-center">
            <FlowFiveStep
              width={800}
              height={140}
              steps={['Assess', 'Start', 'Learn', 'Mentor', 'Certify']}
            />
          </div>
        </div>

        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PATH_STEPS.map((s) => (
            <li key={s.n} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <div className="size-8 rounded-full bg-sky-700 text-white flex items-center justify-center text-sm font-bold mb-3">
                {s.n}
              </div>
              <h3 className="font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">{s.desc}</p>
              <Link
                href={s.href}
                className="mt-3 inline-flex items-center gap-1 text-sky-700 hover:text-sky-600 text-xs font-medium no-underline"
              >
                {s.cta} <ArrowRight className="size-3" aria-hidden />
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* Pricing summary */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 py-12">
        <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 text-center mb-4">
          Pricing summary
        </h2>
        <p className="text-slate-600 text-center max-w-2xl mx-auto mb-10">
          A clear AUD ladder. All prices include GST. Cancel free 24h before any session.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRICE_LADDER.map((p) => (
            <Link
              key={p.tier}
              href={p.href}
              className="block bg-white border border-slate-200 hover:border-sky-400 rounded-xl p-6 shadow-sm hover:shadow-md transition no-underline"
            >
              <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">{p.tier}</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{p.price}</p>
              <p className="mt-1 text-sm text-slate-600">{p.label}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Use cases by role */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 py-12">
        <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 text-center mb-12">
          Use cases by role
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ROLE_USE_CASES.map(({ role, use, Icon }) => (
            <div key={role} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="size-9 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
                  <Icon className="size-4" aria-hidden />
                </div>
                <h3 className="font-semibold text-slate-900">{role}</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{use}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stories */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 py-12">
        <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 text-center mb-12">
          Stories
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {STORIES.map((s) => (
            <figure
              key={s.name}
              className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm"
            >
              <BookOpen className="size-5 text-sky-700 mb-3" aria-hidden />
              <blockquote className="text-slate-700 italic leading-relaxed">"{s.quote}"</blockquote>
              <figcaption className="mt-4 text-sm font-medium text-slate-900">— {s.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 py-12">
        <div className="bg-gradient-to-br from-sky-50 to-white border border-sky-200 rounded-2xl p-10 sm:p-14 text-center shadow-sm">
          <Calculator className="size-8 text-sky-700 mx-auto mb-4" aria-hidden />
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
            Start with the free assessment
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Five minutes, no credit card. We'll baseline your current AI literacy and recommend the
            right next step — Starter, Mentor, or Academy.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Link
              href="/resources/ai-readiness"
              className="bg-sky-700 hover:bg-sky-600 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline transition"
            >
              Take the AI Readiness Quiz <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="/services/ai-starter"
              className="border border-slate-300 hover:border-slate-400 text-slate-700 px-6 py-3 rounded-full font-medium inline-flex items-center gap-2 no-underline transition"
            >
              Book A$29 Starter
            </Link>
          </div>
        </div>
      </section>

      {/* Related + siblings */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-20">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="font-heading text-xl font-semibold text-slate-900 mb-4">Related</h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {RELATED.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="text-sm text-sky-700 hover:text-sky-600 hover:underline"
                >
                  {r.name} →
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-heading text-xl font-semibold text-slate-900 mb-4">Other audiences</h3>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/for"
                className="px-4 py-2 rounded-full text-sm border border-slate-300 hover:border-slate-400 text-slate-700"
              >
                Audience hub
              </Link>
              {SIBLINGS.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="px-4 py-2 rounded-full text-sm border border-slate-300 hover:border-slate-400 text-slate-700"
                >
                  {s.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
