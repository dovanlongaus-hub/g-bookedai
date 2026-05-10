import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calculator, Sparkles } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { ROICalculator } from '@/components/roi-calculator';
import { getPageMetadata } from '@/lib/metadata';
import { InfographicRoiQuadrant } from '@/components/illustrations/infographic-roi-quadrant';

export const metadata: Metadata = getPageMetadata({
  title: 'AI ROI Calculator — Estimate Your Savings | LongCare AU',
  description:
    'Estimate the time and dollar savings AI could deliver for your Australian SME. Free interactive calculator — no email required.',
  path: '/resources/roi-calculator',
});

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://longcare.au',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Resources',
      item: 'https://longcare.au/resources',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'ROI Calculator',
      item: 'https://longcare.au/resources/roi-calculator',
    },
  ],
};

export default function ROICalculatorPage() {
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Resources', url: '/resources' },
    { name: 'ROI Calculator', url: '/resources/roi-calculator' },
  ];

  return (
    <main className="bg-[#F8FAFC] min-h-screen pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-28 sm:pt-32 pb-10 sm:pb-14">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center justify-center size-14 rounded-2xl bg-sky-50 border border-sky-200 mb-5">
              <Calculator className="size-7 text-sky-700" strokeWidth={1.5} aria-hidden />
            </div>
            <span className="eyebrow">ROI Calculator</span>
            <h1 className="font-heading mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
              Estimate your AI savings in seconds.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Adjust the sliders to match your team. Get an instant estimate of
              hours saved, dollars freed, and payback time — no email required.
            </p>
          </div>
          <div className="hidden lg:block">
            <InfographicRoiQuadrant className="text-sky-700" width={360} height={360} />
          </div>
        </div>
      </div>

      {/* Calculator (existing component) */}
      <ROICalculator />

      {/* Closing CTA */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 mt-16">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 sm:p-12 text-center text-white">
          <div className="inline-flex items-center justify-center size-12 rounded-xl bg-white/10 mb-5">
            <Sparkles className="size-6 text-sky-400" aria-hidden />
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold">
            Like the numbers? Validate them.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300 max-w-xl mx-auto">
            Take the AI Readiness Assessment to pressure-test the estimate
            against your data, team and processes — and get a tailored roadmap.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/resources/ai-readiness"
              className="cursor-pointer btn-cta inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold no-underline"
            >
              Take the AI Readiness Assessment
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <a
              href="https://book.longcare.au?ref=roi-calculator"
              rel="noopener noreferrer"
              className="cursor-pointer inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold border border-white/20 text-white hover:bg-white/10 transition-colors no-underline"
            >
              Book AI Mentor Session
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
