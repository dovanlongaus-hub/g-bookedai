import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  MessageCircle,
  ListChecks,
  UserRound,
  Compass,
  PhoneOff,
} from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { getPageMetadata } from '@/lib/metadata';
import { HeroMentor } from '@/components/illustrations/hero-mentor';

export const metadata: Metadata = getPageMetadata({
  title: 'Free 20-Min AI Discovery Call | LongCare AU',
  description:
    'Tell us where you are. We tell you what we would do. Free 20-minute discovery call with a senior AI practitioner. Honest no when we are not the right fit.',
  path: '/discovery-call',
});

const DISCUSS = [
  { Icon: Compass, title: 'Where you are', body: 'Your current AI usage, blockers, and team readiness.' },
  { Icon: ListChecks, title: 'Top 3 opportunities', body: 'The highest-leverage AI bets for your business this quarter.' },
  { Icon: Clock, title: 'A realistic 90-day plan', body: 'What we would do in week 1, week 4, and week 12.' },
  { Icon: ShieldCheck, title: 'Whether we are a fit', body: 'We say no when we should — there is no commission incentive.' },
];

const BRING = [
  'A real problem you are trying to solve, not a vague topic',
  'Quick notes on what AI tools you have already tried',
  'A candid budget range, even if it is "I do not know yet"',
];

const LEAVE = [
  { Icon: MessageCircle, title: 'Recorded summary', body: 'Recording plus AI-generated notes emailed within 24 hrs.' },
  { Icon: ListChecks, title: 'Written next-steps', body: 'A short list you can action whether or not you hire us.' },
  { Icon: Compass, title: 'Recommended tier', body: 'Specific SKUs from our catalogue with budget guidance.' },
  { Icon: PhoneOff, title: 'No pressure', body: 'No follow-up sales sequences. We email once with the summary.' },
];

const FAQ_ITEMS = [
  {
    q: 'Why is the call free?',
    a: 'Because we want to talk to clients who are a fit, and a 20-minute conversation is the cheapest way for both of us to find out. Non-fit is an honest no — we are not running a discovery-call funnel.',
  },
  {
    q: 'Who joins the call?',
    a: 'Dr. Long Do or another senior practitioner who has actually shipped AI in production. No SDRs, no junior consultants, no slide deck.',
  },
  {
    q: 'What if I am very early?',
    a: 'That is fine. We have helped sole traders running their first ChatGPT prompt and we have helped teams running multi-agent systems. The call adapts to where you are.',
  },
  {
    q: 'What if I just want to read first?',
    a: 'Take the free AI Readiness Assessment, browse the comparison page, or send a message. The call is here when you want it.',
  },
];

export default function DiscoveryCallPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Free AI Discovery Call',
    description:
      'A free 20-minute video call with a senior AI practitioner. Honest assessment, three opportunities, a 90-day plan, and a fit check.',
    provider: {
      '@type': 'Organization',
      name: 'LongCare AU',
      url: 'https://longcare.au',
    },
    areaServed: { '@type': 'Country', name: 'Australia' },
    serviceType: 'AI advisory call',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'AUD',
      availability: 'https://schema.org/InStock',
      url: 'https://book.longcare.au?service=discovery',
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

      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Discovery Call', url: '/discovery-call' },
          ]}
        />

        {/* Hero */}
        <section className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center mt-6 mb-12">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-4">
              <ShieldCheck className="size-3.5" aria-hidden /> Free · 20 minutes · No commitment
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Free Discovery Call — 20 Minutes
            </h1>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Tell us where you are. We tell you what we would do. No slide deck, no sales pitch, no follow-up
              sequence. Just a senior practitioner and your real problem.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://book.longcare.au?service=discovery"
                className="bg-sky-700 hover:bg-sky-600 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline transition"
              >
                Book your discovery call <ArrowRight className="size-4" aria-hidden />
              </a>
              <Link
                href="/contact"
                className="border border-slate-300 hover:border-slate-400 text-slate-700 px-6 py-3 rounded-full font-medium inline-flex items-center gap-2 no-underline transition"
              >
                Or send a message first
              </Link>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              Calls are held on Google Meet. We confirm within one business day.
            </p>
          </div>
          <div className="hidden lg:block">
            <HeroMentor className="text-sky-700" width={340} height={260} />
          </div>
        </section>

        {/* What we discuss */}
        <section className="mb-12">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 text-center mb-8">
            What we discuss
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DISCUSS.map(({ Icon, title, body }) => (
              <div
                key={title}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm"
              >
                <div className="size-10 rounded-full bg-sky-50 text-sky-700 flex items-center justify-center mb-4">
                  <Icon className="size-5" aria-hidden />
                </div>
                <h3 className="font-heading text-base font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Who joins */}
        <section className="mb-12">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm grid lg:grid-cols-[auto_1fr] gap-6 items-center">
            <div className="size-20 rounded-full bg-sky-50 text-sky-700 flex items-center justify-center mx-auto lg:mx-0">
              <UserRound className="size-10" aria-hidden />
            </div>
            <div>
              <h2 className="font-heading text-2xl font-semibold text-slate-900">Who joins</h2>
              <p className="mt-2 text-slate-600 leading-relaxed">
                Dr. Long Do or another senior LongCare practitioner who has actually shipped AI in
                production for Australian businesses. No SDRs, no juniors, no slide deck. You get the person
                who would build the work if you hire us.
              </p>
            </div>
          </div>
        </section>

        {/* What you bring */}
        <section className="mb-12 grid gap-6 lg:grid-cols-2">
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
            <h2 className="font-heading text-xl font-semibold text-slate-900 mb-4">What you bring</h2>
            <ul className="space-y-3">
              {BRING.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle2
                    className="size-5 text-emerald-600 flex-shrink-0 mt-0.5"
                    aria-hidden
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
            <h2 className="font-heading text-xl font-semibold text-slate-900 mb-4">What you leave with</h2>
            <ul className="space-y-3">
              {LEAVE.map(({ Icon, title, body }) => (
                <li key={title} className="flex items-start gap-3 text-sm text-slate-700">
                  <Icon className="size-5 text-sky-700 flex-shrink-0 mt-0.5" aria-hidden />
                  <span>
                    <strong className="text-slate-900">{title}.</strong> {body}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* It's free because */}
        <section className="mb-12">
          <div className="bg-sky-50/50 border border-sky-200 rounded-2xl p-6 sm:p-10">
            <h2 className="font-heading text-xl font-semibold text-slate-900 mb-3">
              Why is this free?
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Because we want to talk to clients who are a fit. A 20-minute call is the cheapest way for both of
              us to find out. We do not run a discovery-call funnel — there is no commission, no SDR, and no
              follow-up drip sequence. If we are not the right fit, we say so and point you somewhere that is.
              Honest no is part of the offer.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 text-center mb-8">
            Frequently asked
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
        <section className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl p-10 sm:p-14 text-center shadow-sm mb-20">
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
            Ready when you are
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Twenty minutes of honest, useful advice. Whether you hire us or not, you leave with a clearer
            picture of what to do next.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <a
              href="https://book.longcare.au?service=discovery"
              className="bg-sky-700 hover:bg-sky-600 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline transition"
            >
              Book your discovery call <ArrowRight className="size-4" aria-hidden />
            </a>
            <Link
              href="/get-started-guide"
              className="border border-slate-300 hover:border-slate-400 text-slate-700 px-6 py-3 rounded-full font-medium inline-flex items-center gap-2 no-underline transition"
            >
              Or take the 60-sec guide
            </Link>
          </div>
          <p className="mt-6 text-xs text-slate-500">
            All prices AUD inc GST · Free, no commitment, no sales sequence
          </p>
        </section>
      </div>
    </main>
  );
}
