import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { getPageMetadata } from '@/lib/metadata';
import { HeroToolkit } from '@/components/illustrations/hero-toolkit';
import {
  ArrowRight,
  BookOpen,
  Calculator,
  ClipboardCheck,
  HelpCircle,
  Newspaper,
  Quote,
  Sparkles,
} from 'lucide-react';

export const metadata: Metadata = getPageMetadata({
  title: 'AI Resources & Tools for SMEs | LongCare AU',
  description:
    'Free AI tools and resources for Australian SMEs — readiness assessment, ROI calculator, practical guide, blog, case studies and FAQs.',
  path: '/resources',
});

type Resource = {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number; 'aria-hidden'?: boolean }>;
  meta: string;
  external?: boolean;
};

const RESOURCES: Resource[] = [
  {
    title: 'AI Readiness Assessment',
    description:
      '12 questions, 6 minutes, get your maturity score + ROI estimate.',
    href: '/resources/ai-readiness',
    icon: ClipboardCheck,
    meta: 'Free · 6 min',
  },
  {
    title: 'ROI Calculator',
    description: 'Estimate AI ROI for your business in seconds.',
    href: '/resources/roi-calculator',
    icon: Calculator,
    meta: 'Free · No email',
  },
  {
    title: 'Free SME AI Guide',
    description: 'Download our 24-page practical guide (PDF).',
    href: '/guide',
    icon: BookOpen,
    meta: '24 pages · PDF',
  },
  {
    title: 'Blog',
    description: 'Tutorials, case studies, industry insights.',
    href: '/blog',
    icon: Newspaper,
    meta: 'Updated weekly',
  },
  {
    title: 'Case Studies',
    description: 'Real outcomes from Australian SMEs.',
    href: '/testimonials',
    icon: Quote,
    meta: '150+ engagements',
  },
  {
    title: 'FAQ',
    description: 'Common questions about AI mentoring.',
    href: '/faq',
    icon: HelpCircle,
    meta: 'Quick answers',
  },
];

export default function ResourcesHubPage() {
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Resources', url: '/resources' },
  ];

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'AI Resources for Australian SMEs',
    description:
      'Free AI tools and resources for Australian small and medium businesses.',
    itemListElement: RESOURCES.map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: r.title,
      url: `https://longcare.au${r.href}`,
    })),
  };

  return (
    <main className="bg-[#F8FAFC] min-h-screen pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-28 sm:pt-32 pb-16">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Hero */}
        <section className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center mb-14 sm:mb-20">
          <div className="max-w-2xl">
            <span className="eyebrow">Resources</span>
            <h1 className="font-heading mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
              AI Resources for Australian SMEs
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Free, practical tools to help you understand AI, estimate the
              return, and pick a confident next step.
            </p>
          </div>
          <div className="hidden lg:block">
            <HeroToolkit className="text-sky-700" width={420} height={320} />
          </div>
        </section>

        {/* Grid */}
        <section
          aria-label="Resources"
          className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {RESOURCES.map((r) => {
            const Icon = r.icon;
            return (
              <Link
                key={r.title}
                href={r.href}
                className="group bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-sky-300 transition-all duration-200 flex flex-col no-underline"
              >
                <div className="size-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center mb-5">
                  <Icon
                    className="size-6 text-sky-700"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </div>
                <h2 className="font-heading text-xl font-semibold text-slate-900 mb-2">
                  {r.title}
                </h2>
                <p className="text-[15px] leading-relaxed text-slate-600 flex-grow">
                  {r.description}
                </p>
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[12px] font-medium text-slate-500 tracking-wide">
                    {r.meta}
                  </span>
                  <span
                    className="inline-flex items-center gap-1 text-[13px] font-semibold text-sky-700 group-hover:gap-2 transition-all"
                    aria-hidden
                  >
                    Open <ArrowRight className="size-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </section>

        {/* Closing CTA */}
        <section className="mt-16 sm:mt-20">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 sm:p-12 text-center">
            <div className="inline-flex items-center justify-center size-12 rounded-xl bg-white/10 mb-5">
              <Sparkles className="size-6 text-sky-400" aria-hidden />
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
              Not sure where to start?
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-300 max-w-xl mx-auto">
              Take the AI Readiness Assessment — get your maturity score and a
              personalised roadmap in six minutes.
            </p>
            <Link
              href="/resources/ai-readiness"
              className="cursor-pointer btn-cta mt-7 inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold no-underline"
            >
              Take the AI Readiness Assessment
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
