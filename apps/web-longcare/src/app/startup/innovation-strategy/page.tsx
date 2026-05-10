import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Compass,
  Briefcase,
  Cpu,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Quote,
  Map,
  Users,
  Workflow,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { HeroMentor } from '@/components/illustrations/hero-mentor';
import { FlowFiveStep } from '@/components/illustrations/flow-five-step';

export const metadata: Metadata = getPageMetadata({
  title: 'Innovation Strategy — AI Roadmap & GTM | LongCare AU',
  description:
    'Digital transformation, AI readiness, automation roadmap, go-to-market for AI products. From A$1,299/mo or A$2,499 sprint inc GST.',
  path: '/startup/innovation-strategy',
});

const OUTCOMES = [
  '12-month AI product roadmap aligned to fundraising milestones.',
  'Go-to-market canvas with priorities and trade-offs.',
  'Ideal customer profile (ICP) defined with entry-criteria.',
  'Channel testing plan — paid, partner, content, outbound, community.',
  'Pricing structure tested against willingness to pay.',
  'Partner ecosystem mapped — integrators, distributors, complements.',
];

const SIBLINGS = [
  {
    title: 'Startup Mentorship',
    href: '/startup/mentorship',
    Icon: Compass,
    blurb: 'Validate, integrate AI, prep fundraising. Weekly cadence.',
  },
  {
    title: 'Founder Advisory',
    href: '/startup/founder-advisory',
    Icon: Briefcase,
    blurb: 'Business model, AI positioning, pitch deck.',
  },
  {
    title: 'Technical Mentorship',
    href: '/startup/technical-mentorship',
    Icon: Cpu,
    blurb: 'Cloud architecture, AI stack, MVP build.',
  },
];

export default function InnovationStrategyPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Innovation Strategy — AI Roadmap & GTM',
    serviceType: 'Innovation Strategy',
    provider: {
      '@type': 'Organization',
      name: 'LongCare AU',
      url: 'https://longcare.au',
    },
    areaServed: { '@type': 'Country', name: 'Australia' },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Founders launching AI products',
    },
    description:
      'AI product roadmap, ICP, channel testing, and go-to-market planning for Australian and APAC AI startups.',
    url: 'https://longcare.au/startup/innovation-strategy',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'AUD',
      price: '2499',
      url: 'https://book.longcare.au?service=innovation-strategy',
      availability: 'https://schema.org/InStock',
    },
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
            { name: 'Startup', url: '/startup' },
            {
              name: 'Innovation Strategy',
              url: '/startup/innovation-strategy',
            },
          ]}
        />

        {/* Hero */}
        <section className="mt-6 grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <Badge
              variant="outline"
              className="border-emerald-200 bg-emerald-50 text-emerald-700"
            >
              <Lightbulb className="size-3" /> 4-week sprint or monthly retainer
            </Badge>
            <h1 className="mt-4 font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Innovation Strategy &mdash; AI Roadmap &amp; GTM
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Digital transformation roadmap, AI readiness, automation, and
              go-to-market for AI products in Australian and APAC markets.
            </p>
            <div className="mt-5 inline-flex flex-wrap items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm">
              <span className="font-semibold text-slate-900">
                A$2,499 sprint
              </span>
              <span className="text-slate-500">
                inc GST &middot; or A$1,299/mo retainer
              </span>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="https://book.longcare.au?service=innovation-strategy"
                className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-full transition"
              >
                Start sprint <ArrowRight className="size-4" />
              </a>
              <a
                href="https://book.longcare.au?service=founder-discovery"
                className="inline-flex items-center gap-2 bg-white border border-slate-300 hover:border-sky-400 hover:text-sky-700 text-slate-800 font-medium px-6 py-3 rounded-full transition"
              >
                Free 30-min chat first
              </a>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroMentor className="text-sky-700" width={360} height={270} />
          </div>
        </section>

        {/* What this is */}
        <section className="mt-16">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900 mb-6">
            What this is
          </h2>
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm space-y-4 text-slate-700">
            <p>
              Innovation Strategy is for founders launching an AI product into
              the next 6 months. We compress the planning that usually takes
              two quarters of meandering into a 4-week sprint &mdash; or
              spread it across a monthly retainer if you prefer steady cadence.
            </p>
            <p>
              The output is a roadmap you can actually run on, an ICP your
              sales motion can target, and a channel testing plan that
              isn&rsquo;t just &ldquo;run some Google ads and hope&rdquo;.
            </p>
            <p>
              We bring particular depth in regulated AU and APAC markets:
              healthcare, legal, financial services, education, and government.
              If your AI product touches any of these, this is where to start.
            </p>
            <p>
              We also map the partner ecosystem &mdash; integrators,
              distributors, complementary tools &mdash; so your launch
              isn&rsquo;t a pure direct-sales push from day one.
            </p>
          </div>
        </section>

        {/* Outcomes */}
        <section className="mt-16">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900 mb-6">
            Outcomes
          </h2>
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
            <ul className="grid gap-4 sm:grid-cols-2">
              {OUTCOMES.map((o) => (
                <li key={o} className="flex gap-3">
                  <CheckCircle2 className="size-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Format */}
        <section className="mt-16">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900 mb-6">
            Format &amp; cadence
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <Map className="size-6 text-sky-700" />
              <h3 className="mt-3 text-base font-semibold text-slate-900">
                4-week sprint
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Two 90-minute calls per week, deliverables at end of weeks 1,
                2, 3, 4. One firm output: a 12-month roadmap and GTM canvas.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <Workflow className="size-6 text-sky-700" />
              <h3 className="mt-3 text-base font-semibold text-slate-900">
                Monthly retainer
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                For founders who prefer rolling cadence. 2 sessions per month
                + async strategy review.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <Users className="size-6 text-sky-700" />
              <h3 className="mt-3 text-base font-semibold text-slate-900">
                Co-founder workshops
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Both founders in the room. Strategy decisions stick when made
                together, not relayed.
              </p>
            </div>
          </div>
        </section>

        {/* Sample plan */}
        <section className="mt-16">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900 mb-6">
            The 4-week sprint
          </h2>
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
            <FlowFiveStep
              className="text-sky-700"
              steps={[
                'Discover ICP',
                'Validate',
                'Channel test',
                'Pricing',
                'Scale',
              ]}
              width={1000}
              height={160}
            />
            <p className="mt-4 text-sm text-slate-600">
              Discover ICP and entry-criteria &middot; validate with 5
              customer calls &middot; design a channel testing plan
              &middot; pressure-test pricing against willingness to pay
              &middot; map the path to scale.
            </p>
          </div>
        </section>

        {/* Pricing */}
        <section className="mt-16">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900 mb-6">
            Pricing
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white border border-sky-300 ring-2 ring-sky-100 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">
                4-week sprint
              </h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-slate-900">A$2,499</span>
                <span className="text-sm text-slate-500">inc GST</span>
              </div>
              <p className="mt-3 text-sm text-slate-700">
                Fixed scope, fixed price, fixed timeline. Two 90-minute calls
                per week, weekly deliverables, final roadmap and GTM canvas at
                week 4.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">
                Monthly retainer
              </h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-slate-900">A$1,299</span>
                <span className="text-sm text-slate-500">/ month inc GST</span>
              </div>
              <p className="mt-3 text-sm text-slate-700">
                Ongoing strategy partner. 2 sessions per month + async review
                of GTM experiments. 3-month minimum.
              </p>
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="mt-16">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900 mb-6">
            Who it&rsquo;s for &mdash; and who it isn&rsquo;t
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-base font-semibold text-emerald-700 flex items-center gap-2">
                <CheckCircle2 className="size-5" /> Right fit
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                <li>Founders launching an AI product in the next 6 months.</li>
                <li>Existing companies adding an AI product line.</li>
                <li>Selling into AU/APAC regulated industries.</li>
                <li>
                  Open to evidence-led decisions, not just pattern-matching.
                </li>
              </ul>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-base font-semibold text-rose-700 flex items-center gap-2">
                <XCircle className="size-5" /> Not a fit
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                <li>Pre-product founders &mdash; book Mentorship first.</li>
                <li>Looking for a paid-ads agency.</li>
                <li>Need outsourced sales execution &mdash; we strategise, not run BDRs.</li>
                <li>
                  Want a deck made &mdash; that&rsquo;s Founder Advisory.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Stories */}
        <section className="mt-16">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900 mb-6">
            Founder stories
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
              <Quote className="size-6 text-sky-700" />
              <p className="mt-3 text-slate-700 italic">
                &ldquo;The sprint forced us to pick one ICP. Within two months
                we had a paid pilot we could quote on the deck.&rdquo;
              </p>
              <p className="mt-4 text-sm font-semibold text-slate-900">
                Anonymised &mdash; AI for accountancy practices, Adelaide
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
              <Quote className="size-6 text-sky-700" />
              <p className="mt-3 text-slate-700 italic">
                &ldquo;We&rsquo;d been winging the partner story. The mapped
                ecosystem unlocked two distribution deals in the next
                quarter.&rdquo;
              </p>
              <p className="mt-4 text-sm font-semibold text-slate-900">
                Anonymised &mdash; AI ed-tech, Singapore
              </p>
            </div>
          </div>
        </section>

        {/* Compliance & IP */}
        <section className="mt-16">
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="size-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="size-5" />
              </div>
              <div>
                <h2 className="font-heading text-xl font-semibold text-slate-900">
                  Compliance &amp; IP
                </h2>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li>No equity. Cash engagement only.</li>
                  <li>NDA before any customer or partner data is shared.</li>
                  <li>You retain 100% IP in roadmap, ICP doc, GTM canvas.</li>
                  <li>
                    Australian Privacy Act-aligned data handling (APP
                    1&ndash;13).
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mt-16">
          <div className="bg-gradient-to-br from-sky-50 to-emerald-50 border border-sky-100 rounded-3xl p-10 sm:p-14 text-center">
            <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900">
              Ready to commit to a roadmap?
            </h2>
            <p className="mt-3 text-slate-700 max-w-xl mx-auto">
              Book a free 30-minute discovery call to confirm the sprint
              scope, or jump straight into the calendar.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href="https://book.longcare.au?service=innovation-strategy"
                className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-full transition"
              >
                Start sprint <ArrowRight className="size-4" />
              </a>
              <a
                href="https://book.longcare.au?service=founder-discovery"
                className="inline-flex items-center gap-2 bg-white border border-slate-300 hover:border-sky-400 hover:text-sky-700 text-slate-800 font-medium px-6 py-3 rounded-full transition"
              >
                Free discovery call
              </a>
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="mt-16 mb-24">
          <h2 className="font-heading text-2xl font-semibold text-slate-900 mb-6">
            Related advisory
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Link
              href="/startup"
              className="group bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-sky-300 transition"
            >
              <h3 className="text-base font-semibold text-slate-900 group-hover:text-sky-700 transition">
                Startup hub
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                See all four advisory tracks and pricing tiers.
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-sky-700 group-hover:gap-2 transition-all">
                Open <ArrowRight className="size-4" />
              </span>
            </Link>
            {SIBLINGS.map(({ title, href, Icon, blurb }) => (
              <Link
                key={href}
                href={href}
                className="group bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-sky-300 transition flex flex-col"
              >
                <Icon className="size-6 text-sky-700" />
                <h3 className="mt-3 text-base font-semibold text-slate-900 group-hover:text-sky-700 transition">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-slate-700 flex-1">{blurb}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-sky-700 group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="size-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
