import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Sparkles, X } from 'lucide-react';
import { Breadcrumbs } from '../../../components/breadcrumbs';
import { CONTACT_EMAIL } from '@/lib/site-config';
import { getPageMetadata } from '@/lib/metadata';
import { HeroMentor } from '@/components/illustrations/hero-mentor';
import { FlowThreeStep } from '@/components/illustrations/flow-three-step';

export const metadata: Metadata = {
  ...getPageMetadata({
    title: 'AI Mentoring Packages — 5 & 10-Pack | LongCare AU',
    description:
      'Save up to $150 with AI mentoring packages. 5-session ($450) or 10-session ($850) with progress tracking and priority scheduling.',
    path: '/services/packages',
  }),
  keywords: [
    'AI mentoring package Australia',
    'bulk AI sessions',
    'AI training package',
    'AI learning program',
    'AI mentoring discount',
    'AI course package Melbourne',
    'structured AI training',
    '5 session AI pack',
    '10 session AI pack',
    'AI coaching program Australia',
  ],
};

const PACKAGES = [
  {
    name: '5-Session Package',
    price: '$450',
    priceNum: '450.00',
    savings: 'Save $45 vs single sessions',
    duration: '5 x 60 min',
    description:
      'A structured AI learning path across 5 sessions. Master generative AI, agentic workflows, and transform your business operations step by step.',
    features: [
      '5 x 60-minute 1-on-1 sessions',
      'Structured learning curriculum',
      'Progress tracking dashboard',
      'All AI-generated notes and recordings',
      'Priority scheduling',
      'Email support between sessions',
    ],
    bookingUrl: 'https://book.longcare.au?service=package-5',
    highlight: false,
  },
  {
    name: '10-Session Package',
    price: '$850',
    priceNum: '850.00',
    savings: 'Save $150 vs single sessions',
    duration: '10 x 60 min',
    description:
      'Comprehensive AI mastery program. From basics to advanced agentic systems, with personalised projects, assessments, and a dedicated mentor.',
    features: [
      '10 x 60-minute 1-on-1 sessions',
      'Dedicated mentor assigned to you',
      'Full progress tracking dashboard',
      'All AI-generated notes and recordings',
      'Priority scheduling',
      'Email and chat support between sessions',
      'Completion certificate',
      'Custom AI project guidance',
    ],
    bookingUrl: 'https://book.longcare.au?service=package-10',
    highlight: true,
  },
];

const FAQ_ITEMS = [
  {
    q: 'How are the sessions scheduled?',
    a: 'You book each session individually at a time that suits you. Package holders get priority scheduling, meaning you have access to more time slots and earlier booking windows.',
  },
  {
    q: 'Do I need to use all sessions within a time period?',
    a: 'Packages are valid for 6 months from purchase. We recommend weekly or fortnightly sessions for the best learning outcomes, but you can schedule at your own pace.',
  },
  {
    q: 'Can I share the package with a colleague?',
    a: 'Packages are designed for individual use to ensure a consistent learning path. For team training, contact us about our Business Transformation program.',
  },
  {
    q: 'What is the 5-session curriculum?',
    a: 'We customise each package to your goals, but a typical 5-session path covers: (1) AI fundamentals and prompting, (2) Advanced prompt engineering, (3) AI workflow automation, (4) AI tools for your specific domain, (5) Building your AI strategy and next steps.',
  },
  {
    q: 'What does the 10-session program include?',
    a: 'The 10-session program expands on the 5-session path to include agentic AI systems, multi-tool integrations, custom AI project work, team training strategies, and advanced topics like fine-tuning and API integrations.',
  },
  {
    q: 'Can I upgrade from 5-pack to 10-pack?',
    a: `Yes. If you purchase a 5-session pack and want to upgrade, we will credit the difference. Contact ${CONTACT_EMAIL} to arrange an upgrade.`,
  },
];

const COMPARISON = [
  { feature: 'Total Sessions', five: '5', ten: '10' },
  { feature: 'Per Session Cost', five: '$90', ten: '$85' },
  { feature: 'Total Savings', five: '$45', ten: '$150' },
  { feature: 'Session Duration', five: '60 min', ten: '60 min' },
  { feature: 'Progress Tracking', five: 'Yes', ten: 'Yes' },
  { feature: 'Priority Scheduling', five: 'Yes', ten: 'Yes' },
  { feature: 'Dedicated Mentor', five: '-', ten: 'Yes' },
  { feature: 'Completion Certificate', five: '-', ten: 'Yes' },
  { feature: 'Custom AI Project', five: '-', ten: 'Yes' },
];

const CURRICULUM = [
  { num: 1, title: 'AI Fundamentals', desc: 'Core concepts, tools overview, first prompts' },
  { num: 2, title: 'Prompt Engineering', desc: 'Advanced prompting, chain-of-thought, few-shot' },
  { num: 3, title: 'Workflow Automation', desc: 'Automate repetitive tasks with AI pipelines' },
  { num: 4, title: 'Domain Application', desc: 'AI tools tailored to your industry or role' },
  { num: 5, title: 'Strategy & Next Steps', desc: 'Build your AI roadmap and action plan' },
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
  return <span className={highlight ? 'text-sky-700 font-medium' : 'text-slate-700'}>{value}</span>;
}

export default function PackagesPage() {
  const serviceSchemas = PACKAGES.map((pkg) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: pkg.name,
    description: pkg.description,
    provider: {
      '@type': 'Organization',
      name: 'Longcare AU',
      url: 'https://longcare.au',
    },
    areaServed: { '@type': 'Country', name: 'Australia' },
    serviceType: 'AI Mentoring Package',
    offers: {
      '@type': 'Offer',
      price: pkg.priceNum,
      priceCurrency: 'AUD',
      availability: 'https://schema.org/InStock',
      validFrom: '2026-01-01',
      url: pkg.bookingUrl,
    },
  }));

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
      {serviceSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-6">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Services', url: '/services' },
            { name: 'Packages', url: '/services/packages' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-8 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              AI Mentoring Packages
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Commit to your AI learning journey and save. Structured programs with progress tracking,
              priority scheduling, and dedicated mentors.
            </p>
          </div>
          <div className="hidden lg:block">
            <HeroMentor className="text-sky-700" width={360} height={270} />
          </div>
        </div>
      </section>

      {/* Booking flow */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 py-8">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12 overflow-x-auto">
          <h3 className="font-heading text-2xl text-slate-900 text-center mb-8">Each session in your package</h3>
          <div className="flex justify-center">
            <FlowThreeStep width={720} height={140} />
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4 text-center text-sm text-slate-600 max-w-2xl mx-auto">
            <div><strong className="text-slate-900 block">Book</strong>Priority scheduling</div>
            <div><strong className="text-slate-900 block">Session</strong>60 min focused work</div>
            <div><strong className="text-slate-900 block">Notes</strong>Progress + curriculum</div>
          </div>
        </div>
      </section>

      {/* Package Cards */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 py-8">
        <div className="grid gap-6 md:grid-cols-2">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className={`relative flex flex-col bg-white rounded-2xl p-6 sm:p-8 shadow-sm ${
                pkg.highlight
                  ? 'border-2 border-sky-700 shadow-md ring-1 ring-sky-700/10'
                  : 'border border-slate-200'
              }`}
            >
              {pkg.highlight && (
                <div className="absolute -top-3 right-6">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-sky-700 text-white shadow-sm">
                    <Sparkles className="size-3" aria-hidden /> BEST VALUE
                  </span>
                </div>
              )}
              <h2 className="font-heading text-2xl font-semibold text-slate-900">{pkg.name}</h2>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-slate-900">{pkg.price}</span>
                <span className="text-sm text-slate-500">/ package</span>
              </div>
              <p className="mt-2 text-sm font-semibold text-emerald-700">{pkg.savings}</p>
              <p className="mt-1 text-xs text-slate-500">{pkg.duration}</p>
              <p className="mt-4 text-slate-600 text-sm leading-relaxed">{pkg.description}</p>
              <ul className="mt-5 space-y-2 flex-1">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2
                      className="size-5 text-emerald-600 flex-shrink-0 mt-0.5"
                      aria-hidden
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href={pkg.bookingUrl}
                className={`mt-6 px-6 py-3 rounded-full font-semibold inline-flex items-center justify-center gap-2 no-underline transition ${
                  pkg.highlight
                    ? 'bg-sky-700 hover:bg-sky-600 text-white'
                    : 'border border-slate-300 hover:border-slate-400 text-slate-700'
                }`}
              >
                Select {pkg.name} <ArrowRight className="size-4" aria-hidden />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 py-12">
        <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 text-center mb-12">
          Package Comparison
        </h2>
        <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Feature</th>
                  <th className="text-center px-4 py-3 font-semibold text-slate-700">
                    5-Pack $450
                  </th>
                  <th className="text-center px-4 py-3 font-semibold text-sky-700">10-Pack $850</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {COMPARISON.map((row) => (
                  <tr key={row.feature}>
                    <td className="px-4 py-3 text-slate-700">{row.feature}</td>
                    <td className="px-4 py-3 text-center">
                      <Cell value={row.five} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Cell value={row.ten} highlight />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Sample Curriculum */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 py-12">
        <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 text-center mb-12">
          Sample 5-Session Curriculum
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {CURRICULUM.map((step) => (
            <div
              key={step.num}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm"
            >
              <div className="size-9 rounded-full bg-sky-50 text-sky-700 flex items-center justify-center text-sm font-bold mb-3">
                {step.num}
              </div>
              <h3 className="font-heading text-base font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
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
            Invest in your AI skills
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Choose the package that fits your goals. Save money, get structured learning, and track
            your progress over time.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <a
              href="https://book.longcare.au?service=package-5"
              className="border border-slate-300 hover:border-slate-400 text-slate-700 px-6 py-3 rounded-full font-medium inline-flex items-center gap-2 no-underline transition"
            >
              5-Pack — $450
            </a>
            <a
              href="https://book.longcare.au?service=package-10"
              className="bg-sky-700 hover:bg-sky-600 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline transition"
            >
              10-Pack — $850 <ArrowRight className="size-4" aria-hidden />
            </a>
          </div>
          <p className="mt-6 text-sm text-slate-600">
            Not ready for a package?{' '}
            <Link href="/services/ai-starter" className="text-sky-700 hover:underline">
              Try a single $29 Starter session
            </Link>
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Powered by{' '}
            <a href="https://g.bookedai.au" className="text-sky-700 hover:underline">
              bookedai.au
            </a>{' '}
            | All prices AUD, GST-inclusive | Valid 6 months
          </p>
        </div>
      </section>
    </main>
  );
}
