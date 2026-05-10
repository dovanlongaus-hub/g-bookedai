import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Compass, Sparkles, ShieldCheck } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { getPageMetadata } from '@/lib/metadata';
import { HeroMentor } from '@/components/illustrations/hero-mentor';
import { PricingComparison } from '@/components/pricing-comparison';
import { skuCatalog } from '@/data/sku-catalog';

export const metadata: Metadata = getPageMetadata({
  title: 'Compare AI Services & Pricing | LongCare AU',
  description:
    'One place to compare every LongCare AI service. Filter by audience or category. From free assessments to enterprise programmes. AUD inc GST.',
  path: '/compare',
});

export default function ComparePage() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'LongCare AU — All AI Services',
    description:
      'Comprehensive list of every AI service, package, subscription, and engagement offered by LongCare AU.',
    itemListElement: skuCatalog.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: s.name,
        description: s.description,
        url: `https://longcare.au${s.url}`,
        provider: {
          '@type': 'Organization',
          name: 'LongCare AU',
          url: 'https://longcare.au',
        },
        areaServed: { '@type': 'Country', name: 'Australia' },
        offers: {
          '@type': 'Offer',
          price: s.priceAud.toFixed(2),
          priceCurrency: 'AUD',
          availability: 'https://schema.org/InStock',
        },
      },
    })),
  };

  return (
    <main className="bg-[#F8FAFC] text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Compare', url: '/compare' },
          ]}
        />

        {/* Hero */}
        <section className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center mt-6 mb-12">
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Compare All LongCare Services
            </h1>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Find the right tier for you. Filter by audience or browse everything in one place.
              Every price below is AUD, GST-inclusive, and fixed — no surprise invoices.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-600">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-emerald-600" aria-hidden /> All prices inc GST
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="size-4 text-sky-700" aria-hidden /> {skuCatalog.length} services
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Compass className="size-4 text-slate-500" aria-hidden /> AU-based mentors
              </span>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroMentor className="text-sky-700" width={360} height={270} />
          </div>
        </section>

        {/* Quick decision aids */}
        <section className="mb-10 grid gap-4 sm:grid-cols-3">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold">
              Not sure?
            </div>
            <h2 className="mt-1 font-heading text-base font-semibold text-slate-900">
              Take the 60-second guide
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Answer four questions, get a tailored AI plan with three SKU recommendations.
            </p>
            <Link
              href="/get-started-guide"
              className="mt-3 text-sm font-semibold text-sky-700 inline-flex items-center gap-1 hover:underline"
            >
              Find my plan <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold">
              Free
            </div>
            <h2 className="mt-1 font-heading text-base font-semibold text-slate-900">
              AI Readiness Assessment
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Twelve questions, ~6 minutes. Maturity score plus tier recommendation by email.
            </p>
            <Link
              href="/resources/ai-readiness"
              className="mt-3 text-sm font-semibold text-sky-700 inline-flex items-center gap-1 hover:underline"
            >
              Start free <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold">
              Free
            </div>
            <h2 className="mt-1 font-heading text-base font-semibold text-slate-900">
              20-min Discovery Call
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Talk to a senior practitioner. Get an honest no when we are not the right fit.
            </p>
            <Link
              href="/discovery-call"
              className="mt-3 text-sm font-semibold text-sky-700 inline-flex items-center gap-1 hover:underline"
            >
              Book the call <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </div>
        </section>

        {/* Pricing comparison */}
        <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm mb-16">
          <PricingComparison filterTier="all" showFilter showCategoryFilter />
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl p-10 sm:p-14 text-center shadow-sm mb-20">
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
            Still narrowing it down?
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            We would rather you book the right tier than the biggest one. Talk to us first — it is free, and
            we will tell you the truth about whether LongCare is the right fit.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Link
              href="/discovery-call"
              className="bg-sky-700 hover:bg-sky-600 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline transition"
            >
              Book a free 20-min call <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="/get-started-guide"
              className="border border-slate-300 hover:border-slate-400 text-slate-700 px-6 py-3 rounded-full font-medium inline-flex items-center gap-2 no-underline transition"
            >
              Take the 60-sec guide
            </Link>
          </div>
          <p className="mt-6 text-xs text-slate-500">
            All prices AUD, GST-inclusive · Fixed-price engagements · Cancel subscriptions anytime
          </p>
        </section>
      </div>
    </main>
  );
}
