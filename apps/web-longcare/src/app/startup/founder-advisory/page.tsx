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
  Calendar,
  FileText,
  Target,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { HeroMentor } from '@/components/illustrations/hero-mentor';
import { FlowThreeStep } from '@/components/illustrations/flow-three-step';

export const metadata: Metadata = getPageMetadata({
  title: 'Founder Advisory — Business Model & Positioning | LongCare AU',
  description:
    'Senior feedback on your business model, AI positioning, and pitch deck. From A$299 inc GST per session.',
  path: '/startup/founder-advisory',
});

const OUTCOMES = [
  'Sharp positioning statement that resonates with ICP and investors.',
  'Repeatable sales motion documented in a one-pager.',
  'Pitch deck reviewed slide-by-slide with rewrite suggestions.',
  'Business model canvas validated against unit economics.',
  'Founder mental model unlocked — what to delegate, what to own.',
  'Investor-ready narrative consistent across deck, site, and call.',
];

const SIBLINGS = [
  {
    title: 'Startup Mentorship',
    href: '/startup/mentorship',
    Icon: Compass,
    blurb: 'Validate, integrate AI, prep fundraising. Weekly cadence.',
  },
  {
    title: 'Technical Mentorship',
    href: '/startup/technical-mentorship',
    Icon: Cpu,
    blurb: 'Cloud architecture, AI stack, MVP build.',
  },
  {
    title: 'Innovation Strategy',
    href: '/startup/innovation-strategy',
    Icon: Lightbulb,
    blurb: 'Digital transformation, AI readiness, GTM.',
  },
];

export default function FounderAdvisoryPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Founder Advisory — Business Model & Positioning',
    serviceType: 'Founder Advisory',
    provider: {
      '@type': 'Organization',
      name: 'LongCare AU',
      url: 'https://longcare.au',
    },
    areaServed: { '@type': 'Country', name: 'Australia' },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Post-MVP AI startup founders',
    },
    description:
      'Senior founder advisory on business model, AI positioning, and pitch deck for Australian and APAC AI startups.',
    url: 'https://longcare.au/startup/founder-advisory',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'AUD',
      price: '299',
      url: 'https://book.longcare.au?service=founder-advisory',
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
            { name: 'Founder Advisory', url: '/startup/founder-advisory' },
          ]}
        />

        {/* Hero */}
        <section className="mt-6 grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <Badge
              variant="outline"
              className="border-emerald-200 bg-emerald-50 text-emerald-700"
            >
              <Briefcase className="size-3" /> Booking 2 founders / month
            </Badge>
            <h1 className="mt-4 font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Founder Advisory &mdash; Business Model &amp; Positioning
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Senior feedback on your business model, AI positioning, and pitch
              deck. Sessions run as 2-hour intensives, monthly cadence.
            </p>
            <div className="mt-5 inline-flex flex-wrap items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm">
              <span className="font-semibold text-slate-900">
                A$299 / 2-hr session
              </span>
              <span className="text-slate-500">
                inc GST &middot; or A$899/mo for 3 sessions + reviews
              </span>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="https://book.longcare.au?service=founder-advisory"
                className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-full transition"
              >
                Book a session <ArrowRight className="size-4" />
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
              Founder Advisory is for founders who already have a working
              product (or near-MVP) and need a sharper narrative. Two-hour
              intensive sessions where we work the deck, the canvas, and the
              positioning statement together &mdash; not a passive review.
            </p>
            <p>
              Most founders we see have great product instincts and weak
              storytelling. We fix the story so the product can be sold,
              raised on, and shared with confidence.
            </p>
            <p>
              Between sessions we mark up your deck, leave Loom commentary,
              and respond to async questions on Slack. You get a senior peer,
              not a coach with a template.
            </p>
            <p>
              This is the right offering when you&rsquo;ve been told &ldquo;I
              don&rsquo;t get it&rdquo; one too many times by investors or
              prospects.
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
              <Calendar className="size-6 text-sky-700" />
              <h3 className="mt-3 text-base font-semibold text-slate-900">
                2-hour intensives
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Working sessions, not lectures. Deck open, canvas open, real
                edits in real time.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <Target className="size-6 text-sky-700" />
              <h3 className="mt-3 text-base font-semibold text-slate-900">
                Monthly cadence
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Just enough room to test changes in market between sessions.
                You ship, we sharpen.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <FileText className="size-6 text-sky-700" />
              <h3 className="mt-3 text-base font-semibold text-slate-900">
                Async deck reviews
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Loom commentary on deck iterations. Specific edits, not vague
                vibes.
              </p>
            </div>
          </div>
        </section>

        {/* Sample plan */}
        <section className="mt-16">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900 mb-6">
            How a typical engagement runs
          </h2>
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
            <FlowThreeStep
              className="text-sky-700"
              step1Label="Audit current"
              step2Label="Refine positioning"
              step3Label="Test in market"
              width={900}
              height={180}
            />
            <p className="mt-4 text-sm text-slate-600">
              Audit your current deck, site, and customer call narrative
              &middot; refine the positioning, ICP, and unit economics
              &middot; test the new story with 5 investor calls or 10 customer
              calls and bring data back.
            </p>
          </div>
        </section>

        {/* Pricing */}
        <section className="mt-16">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900 mb-6">
            Pricing
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">
                Single session
              </h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-slate-900">A$299</span>
                <span className="text-sm text-slate-500">
                  / 2-hour session inc GST
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-700">
                One intensive. Bring your deck, your canvas, your three biggest
                questions. Walk out with rewritten positioning and clear next
                steps.
              </p>
            </div>
            <div className="bg-white border border-sky-300 ring-2 ring-sky-100 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">
                Monthly retainer
              </h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-slate-900">A$899</span>
                <span className="text-sm text-slate-500">/ month inc GST</span>
              </div>
              <p className="mt-3 text-sm text-slate-700">
                3 sessions per month + async deck reviews + Slack. Best for the
                run-up to a fundraising round or a major repositioning.
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
                <li>Founders post-MVP looking for a sharper narrative.</li>
                <li>
                  Preparing for a fundraising round in the next 3&ndash;6
                  months.
                </li>
                <li>
                  Repositioning an existing product into an AI-native story.
                </li>
                <li>
                  Comfortable receiving direct, unvarnished feedback.
                </li>
              </ul>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-base font-semibold text-rose-700 flex items-center gap-2">
                <XCircle className="size-5" /> Not a fit
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                <li>Pre-product founders &mdash; book Mentorship instead.</li>
                <li>Looking for a deck designer or copywriter.</li>
                <li>Late-stage Series B+ &mdash; book Custom Advisory.</li>
                <li>Wanting validation, not honest feedback.</li>
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
                &ldquo;After two sessions our deck went from &lsquo;AI for
                everything&rsquo; to a single ICP. Conversion on investor calls
                doubled.&rdquo;
              </p>
              <p className="mt-4 text-sm font-semibold text-slate-900">
                Anonymised &mdash; AI compliance tooling, Brisbane
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
              <Quote className="size-6 text-sky-700" />
              <p className="mt-3 text-slate-700 italic">
                &ldquo;Long called out the dumb assumption in our pricing in
                ten minutes. Saved us a quarter of pricing rework.&rdquo;
              </p>
              <p className="mt-4 text-sm font-semibold text-slate-900">
                Anonymised &mdash; AI ops platform, Auckland
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
                  <li>NDA signed before sharing decks if required.</li>
                  <li>You retain 100% IP in deck, model, positioning.</li>
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
              Sharpen the story
            </h2>
            <p className="mt-3 text-slate-700 max-w-xl mx-auto">
              Book a single 2-hour session, or start a monthly retainer in the
              run-up to your raise.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href="https://book.longcare.au?service=founder-advisory"
                className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-full transition"
              >
                Book a session <ArrowRight className="size-4" />
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
