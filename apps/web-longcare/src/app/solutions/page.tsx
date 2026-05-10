import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Stethoscope,
  ShoppingBag,
  UtensilsCrossed,
  Home,
  Wrench,
  GraduationCap,
  Briefcase,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HeroSolutions } from '@/components/illustrations/hero-solutions';

export const metadata: Metadata = getPageMetadata({
  title: 'AI Solutions by Industry — Australian SMEs | LongCare AU',
  description:
    'Practical AI workflows tailored to Australian SMEs across healthcare, retail, hospitality, real estate, trades, education, and professional services.',
  path: '/solutions',
});

type Industry = {
  slug: string;
  name: string;
  description: string;
  Icon: typeof Stethoscope;
};

const INDUSTRIES: Industry[] = [
  {
    slug: 'healthcare',
    name: 'Healthcare',
    description: 'Clinics, GP practices, allied health',
    Icon: Stethoscope,
  },
  {
    slug: 'retail',
    name: 'Retail',
    description: 'E-commerce, brick-and-mortar, hybrid',
    Icon: ShoppingBag,
  },
  {
    slug: 'hospitality',
    name: 'Hospitality',
    description: 'Cafés, restaurants, accommodation',
    Icon: UtensilsCrossed,
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    description: 'Agents, property managers, builders',
    Icon: Home,
  },
  {
    slug: 'trades',
    name: 'Trades',
    description: 'Plumbers, electricians, builders, landscapers',
    Icon: Wrench,
  },
  {
    slug: 'education',
    name: 'Education',
    description: 'Tutoring centres, RTOs, educators',
    Icon: GraduationCap,
  },
  {
    slug: 'professional-services',
    name: 'Professional Services',
    description: 'Accountants, lawyers, consultants',
    Icon: Briefcase,
  },
];

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'AI Solutions by Industry — LongCare AU',
  description:
    'AI workflows and templates for Australian small-to-medium businesses across seven industries.',
  itemListElement: INDUSTRIES.map((industry, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Service',
      name: `AI for ${industry.name}`,
      description: industry.description,
      url: `https://longcare.au/solutions/${industry.slug}`,
      provider: {
        '@type': 'Organization',
        name: 'LongCare AU',
        url: 'https://longcare.au',
      },
      areaServed: { '@type': 'Country', name: 'Australia' },
    },
  })),
};

export default function SolutionsHubPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Solutions', url: '/solutions' },
          ]}
        />

        {/* Hero */}
        <section className="mt-6 grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
              <Sparkles className="size-3.5" />
              Industry-tailored AI
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              AI Solutions by Industry
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Practical AI workflows tailored to Australian SMEs in your sector. Each
              solution is shaped by real customer outcomes, AU compliance, and the tools
              your team already uses.
            </p>
          </div>
          <div className="hidden lg:block">
            <HeroSolutions className="text-sky-700" width={420} height={320} />
          </div>
        </section>

        {/* Industry Grid */}
        <section className="mt-16">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map(({ slug, name, description, Icon }) => (
              <Link
                key={slug}
                href={`/solutions/${slug}`}
                className="group flex flex-col rounded-2xl bg-white p-7 ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:ring-sky-200 hover:shadow-lg hover:shadow-sky-100/50"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-sky-50 text-sky-700 ring-1 ring-sky-100">
                  <Icon className="size-6" />
                </div>
                <h2 className="mt-5 text-xl font-semibold text-slate-900">{name}</h2>
                <p className="mt-2 text-sm text-slate-600">{description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="border-sky-100 bg-sky-50 text-sky-700"
                  >
                    Pre-built workflows
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-emerald-100 bg-emerald-50 text-emerald-700"
                  >
                    Industry templates
                  </Badge>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-sm font-medium text-sky-700 transition-transform group-hover:translate-x-0.5">
                  Explore
                  <ArrowRight className="size-4" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mt-20 rounded-3xl bg-gradient-to-br from-sky-50 to-emerald-50 p-10 text-center ring-1 ring-sky-100 sm:p-14">
          <h2 className="text-3xl font-bold text-slate-900">
            Don&apos;t see your industry?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-600">
            Every business is different. Book a free discovery call and we&apos;ll map a
            tailored AI plan for your specific workflows.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              render={<a href="https://book.longcare.au" />}
              className="bg-sky-700 px-6 py-2 text-white hover:bg-sky-800"
            >
              Book a Discovery Call
              <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button
              render={<Link href="/contact" />}
              variant="outline"
              className="border-slate-300 bg-white px-6 py-2 text-slate-700 hover:bg-slate-50"
            >
              Contact us
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
