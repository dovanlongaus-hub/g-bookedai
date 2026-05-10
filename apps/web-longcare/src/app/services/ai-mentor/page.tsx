import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Clock,
  Users,
  FileText,
  Map,
  X,
} from 'lucide-react';
import { Breadcrumbs } from '../../../components/breadcrumbs';
import { getPageMetadata } from '@/lib/metadata';
import { HeroMentor } from '@/components/illustrations/hero-mentor';
import { FlowThreeStep } from '@/components/illustrations/flow-three-step';

export const metadata: Metadata = {
  ...getPageMetadata({
    title: '1-Hour AI Mentor Session $99 | LongCare AU',
    description:
      'Book a 1-hour AI mentoring session for $99 AUD. Personalised deep-dive into AI workflows and prompt engineering via Google Meet.',
    path: '/services/ai-mentor',
  }),
  keywords: [
    'AI mentor session Australia',
    'AI coaching 1 hour',
    'prompt engineering mentor',
    'AI workflow consulting',
    'AI deep dive session',
    'personalised AI training',
    'AI automation mentor Melbourne',
    'AI strategy session Sydney',
    'book AI expert online',
    'AI business coaching Australia',
  ],
};

const BENEFITS = [
  {
    title: '60 Minutes 1-on-1',
    desc: 'A full hour of dedicated mentoring via Google Meet. Enough time to tackle real problems, build workflows, and get hands-on practice.',
    Icon: Clock,
  },
  {
    title: 'Custom AI Workflows',
    desc: 'We build AI prompts and workflows tailored to your specific role, industry, or business. Not generic tutorials — real solutions you can use tomorrow.',
    Icon: Users,
  },
  {
    title: 'AI Session Summary',
    desc: 'After the session, you receive AI-generated notes including key decisions, action items, code snippets, and a Q&A summary.',
    Icon: FileText,
  },
  {
    title: 'Personalised Learning Path',
    desc: 'A structured plan for continuing your AI development, including recommended tools, resources, and follow-up session suggestions.',
    Icon: Map,
  },
];

const USE_CASES = [
  'Build custom ChatGPT/Gemini prompts for your workflow',
  'Automate repetitive tasks with AI (emails, reports, data entry)',
  'Develop an AI strategy roadmap for your SME',
  'Learn prompt engineering techniques for better AI outputs',
  'Evaluate and compare AI tools for your specific use case',
  'Integrate AI into your existing tech stack',
];

const FAQ_ITEMS = [
  {
    q: 'What topics can we cover in 1 hour?',
    a: 'Common topics include prompt engineering, AI-assisted writing, data analysis with AI, building automations, AI strategy for your business, evaluating AI tools, and integrating AI into existing workflows. We customise to your goals.',
  },
  {
    q: 'How is this different from the $29 Starter?',
    a: 'The Starter is a 30-minute introduction for beginners. The AI Mentor session is a full 60 minutes of deep-dive work where we build custom prompts, review your workflows, and create a personalised learning path. It is hands-on and outcome-focused.',
  },
  {
    q: 'Can I use this for my business?',
    a: 'Absolutely. Many clients use the AI Mentor session to explore AI opportunities for their business, build automation workflows, or develop an AI strategy. For larger team training, consider our packages or Business Transformation program.',
  },
  {
    q: 'What do I need to prepare?',
    a: 'Before the session you will receive a short intake form to share your goals and current skill level. Have a few specific challenges or questions ready to make the most of your time. Bring any relevant documents or workflows you want to improve.',
  },
  {
    q: 'Is there a satisfaction guarantee?',
    a: 'If you are not satisfied with your session, contact us within 24 hours and we will arrange a follow-up or credit. You can cancel or reschedule free up to 24 hours before.',
  },
];

const COMPARISON = [
  { feature: 'Duration', starter: '30 min', mentor: '60 min' },
  { feature: 'Google Meet 1-on-1', starter: 'Yes', mentor: 'Yes' },
  { feature: 'AI-Generated Notes', starter: 'Yes', mentor: 'Yes' },
  { feature: 'Custom AI Workflows', starter: '-', mentor: 'Yes' },
  { feature: 'Personalised Learning Path', starter: '-', mentor: 'Yes' },
  { feature: 'Session Q&A Summary', starter: '-', mentor: 'Yes' },
];

function Cell({ value, highlight = false }: { value: string; highlight?: boolean }) {
  if (value === 'Yes') {
    return (
      <span
        className={`inline-flex items-center gap-1 ${
          highlight ? 'text-sky-700' : 'text-emerald-600'
        }`}
      >
        <CheckCircle2 className="size-4" aria-hidden /> Yes
      </span>
    );
  }
  if (value === '-') {
    return (
      <span className="inline-flex items-center text-slate-300">
        <X className="size-4" aria-hidden />
      </span>
    );
  }
  return <span className="text-slate-700">{value}</span>;
}

export default function AIMentorPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: '1-Hour AI Mentor Session',
    description:
      'A 60-minute deep-dive AI mentoring session. Get custom AI workflows, prompt engineering guidance, and a personalised learning path via live Google Meet.',
    provider: {
      '@type': 'Organization',
      name: 'Longcare AU',
      url: 'https://longcare.au',
    },
    areaServed: { '@type': 'Country', name: 'Australia' },
    serviceType: 'AI Mentoring',
    offers: {
      '@type': 'Offer',
      price: '99.00',
      priceCurrency: 'AUD',
      availability: 'https://schema.org/InStock',
      validFrom: '2026-01-01',
      url: 'https://book.longcare.au?service=mentor-1h',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <main className="bg-[#F8FAFC] text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-6">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Services', url: '/services' },
            { name: 'AI Mentor', url: '/services/ai-mentor' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-8 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 mb-5">
              <Sparkles className="size-3" aria-hidden /> Most popular
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              1-Hour AI Mentor Session
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Deep-dive AI mentoring tailored to your specific needs. We build custom prompts,
              workflows, and a personalised learning path — all in 60 minutes.
            </p>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-bold text-slate-900">$99</span>
              <span className="text-base text-slate-500">AUD / session</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://book.longcare.au?service=mentor-1h"
                className="bg-sky-700 hover:bg-sky-600 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline transition"
              >
                Book Now for $99 <ArrowRight className="size-4" aria-hidden />
              </a>
              <Link
                href="/services"
                className="border border-slate-300 hover:border-slate-400 text-slate-700 px-6 py-3 rounded-full font-medium inline-flex items-center gap-2 no-underline transition"
              >
                View All Services
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroMentor className="text-sky-700" width={360} height={270} />
          </div>
        </div>
      </section>

      {/* Booking flow */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 py-8">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12 overflow-x-auto">
          <h3 className="font-heading text-2xl text-slate-900 text-center mb-8">From booking to outcomes</h3>
          <div className="flex justify-center">
            <FlowThreeStep width={720} height={140} />
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4 text-center text-sm text-slate-600 max-w-2xl mx-auto">
            <div><strong className="text-slate-900 block">Book</strong>Choose your slot</div>
            <div><strong className="text-slate-900 block">Session</strong>60 min deep-dive</div>
            <div><strong className="text-slate-900 block">Notes</strong>Workflows + learning path</div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 py-12">
        <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 text-center mb-12">
          What You Get
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {BENEFITS.map(({ title, desc, Icon }) => (
            <div
              key={title}
              className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm"
            >
              <div className="size-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center mb-4">
                <Icon className="size-5" aria-hidden />
              </div>
              <h3 className="font-heading text-xl font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-slate-600 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 py-12">
        <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 text-center mb-12">
          Popular Use Cases
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl p-4 shadow-sm"
            >
              <CheckCircle2 className="size-5 text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden />
              <span className="text-sm text-slate-700">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 py-12">
        <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 text-center mb-12">
          Starter vs Mentor
        </h2>
        <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Feature</th>
                  <th className="text-center px-4 py-3 font-semibold text-slate-700">
                    Starter $29
                  </th>
                  <th className="text-center px-4 py-3 font-semibold text-sky-700">Mentor $99</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {COMPARISON.map((row) => (
                  <tr key={row.feature}>
                    <td className="px-4 py-3 text-slate-700">{row.feature}</td>
                    <td className="px-4 py-3 text-center">
                      <Cell value={row.starter} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Cell value={row.mentor} highlight />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 py-12">
        <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {FAQ_ITEMS.map((faq, i) => (
            <details
              key={i}
              className="group bg-white border border-slate-200 rounded-xl shadow-sm open:shadow-md transition"
            >
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4 p-5 font-medium text-slate-900">
                <span>{faq.q}</span>
                <span className="size-6 rounded-full bg-sky-50 text-sky-700 flex items-center justify-center text-lg leading-none transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="px-5 pb-5 text-slate-700 text-sm leading-relaxed">{faq.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-20">
        <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl p-10 sm:p-14 text-center shadow-sm">
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
            Ready for a deep-dive AI session?
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Book your 1-hour AI Mentor session and walk away with custom workflows, actionable
            insights, and a clear path forward.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <a
              href="https://book.longcare.au?service=mentor-1h"
              className="bg-sky-700 hover:bg-sky-600 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline transition"
            >
              Book $99 Mentor Session <ArrowRight className="size-4" aria-hidden />
            </a>
            <Link
              href="/services/packages"
              className="border border-slate-300 hover:border-slate-400 text-slate-700 px-6 py-3 rounded-full font-medium inline-flex items-center gap-2 no-underline transition"
            >
              Save with Packages
            </Link>
          </div>
          <p className="mt-6 text-xs text-slate-500">
            Powered by{' '}
            <a href="https://g.bookedai.au" className="text-sky-700 hover:underline">
              bookedai.au
            </a>{' '}
            | Pay by card or bank transfer | Cancel free 24h before
          </p>
        </div>
      </section>
    </main>
  );
}
