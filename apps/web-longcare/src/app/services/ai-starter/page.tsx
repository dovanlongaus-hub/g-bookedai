import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Video,
  FileText,
  Map,
} from 'lucide-react';
import { Breadcrumbs } from '../../../components/breadcrumbs';
import { CONTACT_EMAIL } from '@/lib/site-config';
import { getPageMetadata } from '@/lib/metadata';
import { HeroMentor } from '@/components/illustrations/hero-mentor';
import { FlowThreeStep } from '@/components/illustrations/flow-three-step';

export const metadata: Metadata = {
  ...getPageMetadata({
    title: '30-Min AI Starter Session $29 | LongCare AU',
    description:
      'Book a 30-minute AI starter session for just $29 AUD. Perfect introduction to ChatGPT, Gemini, and AI tools via Google Meet.',
    path: '/services/ai-starter',
  }),
  keywords: [
    'AI starter session',
    'AI for beginners Australia',
    'learn AI online',
    'AI introduction session',
    'ChatGPT tutorial Melbourne',
    'Gemini AI training',
    'AI coaching 30 minutes',
    'cheap AI mentoring',
    'AI tools for beginners',
    'book AI session online',
  ],
};

const BENEFITS = [
  {
    title: 'Live 1-on-1 Session',
    desc: '30 minutes of personalised guidance via Google Meet. Ask anything about AI tools, prompting, or automation.',
    Icon: Video,
  },
  {
    title: 'AI-Generated Notes',
    desc: 'After the session, receive a comprehensive summary with key takeaways, tips, and resources curated by AI.',
    Icon: FileText,
  },
  {
    title: 'Next Steps Plan',
    desc: 'Get a personalised recommendation for your AI learning journey, whether you are an individual or running a business.',
    Icon: Map,
  },
];

const AUDIENCE = [
  'Professionals curious about AI but unsure where to start',
  'Small business owners wanting to understand AI opportunities',
  'Students looking to build AI skills for their career',
  'Anyone who has tried ChatGPT or Gemini but wants to use them better',
];

const FAQ_ITEMS = [
  {
    q: 'What will I learn in 30 minutes?',
    a: 'You will learn the fundamentals of using AI tools like ChatGPT and Gemini effectively. We cover prompt basics, practical use cases for your role, and how to get better outputs from AI. You will leave with actionable tips you can use immediately.',
  },
  {
    q: 'Do I need any AI experience?',
    a: 'No. The AI Starter session is designed for complete beginners. Whether you have never used an AI tool or just want to improve your skills, we start from wherever you are.',
  },
  {
    q: 'How is the session delivered?',
    a: 'The session is a live 1-on-1 video call via Google Meet. You will receive a meeting link after booking. All you need is a browser and internet connection.',
  },
  {
    q: 'What happens after the session?',
    a: 'You receive AI-generated session notes with key takeaways, plus a personalised recommendation for your next steps. Many clients upgrade to the 1-hour AI Mentor session.',
  },
  {
    q: 'Can I get a refund?',
    a: `You can cancel or reschedule free of charge up to 24 hours before your session. Contact us at ${CONTACT_EMAIL} for any issues.`,
  },
];

export default function AIStarterPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: '30-Min AI Starter Session',
    description:
      'A 30-minute live AI mentoring session for beginners. Learn the fundamentals of ChatGPT, Gemini, and AI tools with personalised guidance via Google Meet.',
    provider: {
      '@type': 'Organization',
      name: 'Longcare AU',
      url: 'https://longcare.au',
    },
    areaServed: { '@type': 'Country', name: 'Australia' },
    serviceType: 'AI Mentoring',
    offers: {
      '@type': 'Offer',
      price: '29.00',
      priceCurrency: 'AUD',
      availability: 'https://schema.org/InStock',
      validFrom: '2026-01-01',
      url: 'https://book.longcare.au?service=starter-30min',
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
            { name: 'AI Starter', url: '/services/ai-starter' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-8 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 mb-5">
              <Sparkles className="size-3" aria-hidden /> Best for beginners
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              30-Min AI Starter Session
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Discover how AI can accelerate your daily workflows in just 30 minutes. Live 1-on-1
              Google Meet with an experienced AI mentor.
            </p>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-bold text-slate-900">$29</span>
              <span className="text-base text-slate-500">AUD / session</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://book.longcare.au?service=starter-30min"
                className="bg-sky-700 hover:bg-sky-600 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline transition"
              >
                Book Now for $29 <ArrowRight className="size-4" aria-hidden />
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
          <h3 className="font-heading text-2xl text-slate-900 text-center mb-8">How it works</h3>
          <div className="flex justify-center">
            <FlowThreeStep width={720} height={140} />
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4 text-center text-sm text-slate-600 max-w-2xl mx-auto">
            <div><strong className="text-slate-900 block">Book</strong>Pick a slot online</div>
            <div><strong className="text-slate-900 block">Session</strong>30 min Google Meet</div>
            <div><strong className="text-slate-900 block">Notes</strong>AI summary + next steps</div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 py-12">
        <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 text-center mb-12">
          What You Get
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* Who Is This For */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 py-12">
        <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 text-center mb-12">
          Who Is This For?
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {AUDIENCE.map((item) => (
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
            Start your AI journey for just $29
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            No commitment. No risk. Book a 30-minute session and see how AI mentoring can help you
            or your business.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <a
              href="https://book.longcare.au?service=starter-30min"
              className="bg-sky-700 hover:bg-sky-600 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline transition"
            >
              Book $29 Starter <ArrowRight className="size-4" aria-hidden />
            </a>
            <Link
              href="/services/ai-mentor"
              className="border border-slate-300 hover:border-slate-400 text-slate-700 px-6 py-3 rounded-full font-medium inline-flex items-center gap-2 no-underline transition"
            >
              Or Try 1-Hour Mentor ($99)
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
