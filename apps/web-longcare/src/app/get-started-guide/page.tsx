import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, Compass, ShieldCheck } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { getPageMetadata } from '@/lib/metadata';
import { HeroMentor } from '@/components/illustrations/hero-mentor';
import { GuideClient } from './guide-client';

export const metadata: Metadata = getPageMetadata({
  title: 'Find Your AI Plan in 60 Seconds | LongCare AU',
  description:
    'Answer four questions, get a tailored AI plan with three SKU recommendations from the LongCare catalogue. AUD inc GST. No sign-up required.',
  path: '/get-started-guide',
});

export default function GetStartedGuidePage() {
  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'LongCare AU — Get Started Guide',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description:
      'A 4-question wizard that recommends the right LongCare AI service based on audience, goal, budget, and timeline.',
    url: 'https://longcare.au/get-started-guide',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'AUD',
    },
  };

  return (
    <main className="bg-[#F8FAFC] text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />

      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Get Started Guide', url: '/get-started-guide' },
          ]}
        />

        {/* Hero */}
        <section className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center mt-6 mb-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200 mb-4">
              <Clock className="size-3.5" aria-hidden /> Takes about 60 seconds
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Find Your Path — 60 Seconds
            </h1>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Answer four questions. Get a tailored AI plan with three specific SKUs from our catalogue.
              No sign-up, no email gate, no commitment.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-600">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-emerald-600" aria-hidden /> All prices AUD inc GST
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Compass className="size-4 text-slate-500" aria-hidden /> Skip anytime to{' '}
                <Link href="/compare" className="text-sky-700 hover:underline">
                  see all options
                </Link>
              </span>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroMentor className="text-sky-700" width={320} height={240} />
          </div>
        </section>

        {/* Wizard */}
        <section className="mb-12">
          <GuideClient />
        </section>

        {/* Below-fold CTAs */}
        <section className="mb-20 grid gap-4 sm:grid-cols-2">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h2 className="font-heading text-lg font-semibold text-slate-900">
              Prefer to talk first?
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Twenty minutes with a senior practitioner — free, honest, no follow-up sequence.
            </p>
            <Link
              href="/discovery-call"
              className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-sky-700 hover:underline"
            >
              Book the discovery call →
            </Link>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h2 className="font-heading text-lg font-semibold text-slate-900">
              Want a maturity score first?
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              The free AI Readiness Assessment — 12 questions, 6 minutes, PDF emailed.
            </p>
            <Link
              href="/resources/ai-readiness"
              className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-sky-700 hover:underline"
            >
              Take the assessment →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
