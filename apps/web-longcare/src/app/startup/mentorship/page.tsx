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
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { HeroMentor } from '@/components/illustrations/hero-mentor';
import { FlowFiveStep } from '@/components/illustrations/flow-five-step';

export const metadata: Metadata = getPageMetadata({
  title: 'Startup Mentorship for AI Founders | LongCare AU',
  description:
    'Validate, integrate AI, prep for fundraising. Weekly cadence with a senior founder. From A$1,499/mo inc GST.',
  path: '/startup/mentorship',
});

const OUTCOMES = [
  'Validated MVP scope you can actually ship in 90 days.',
  'AI integration plan with vendor selection and cost ceiling.',
  '90-day milestone tracker reviewed weekly.',
  'Warm intros to 3 relevant pre-seed/seed investors when ready.',
  'Fundraising-ready data room (deck, model, cap table, metrics).',
  'Founder mental model unlocked — clarity on what to do next.',
];

const SIBLINGS = [
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
  {
    title: 'Innovation Strategy',
    href: '/startup/innovation-strategy',
    Icon: Lightbulb,
    blurb: 'Digital transformation, AI readiness, GTM.',
  },
];

export default function StartupMentorshipPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Startup Mentorship for AI Founders',
    serviceType: 'Startup Mentorship',
    provider: {
      '@type': 'Organization',
      name: 'LongCare AU',
      url: 'https://longcare.au',
    },
    areaServed: { '@type': 'Country', name: 'Australia' },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Pre-seed and seed-stage AI startup founders',
    },
    description:
      'Weekly mentorship with a senior founder. Validate your idea, integrate AI, and prep for fundraising. Australian context.',
    url: 'https://longcare.au/startup/mentorship',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'AUD',
      price: '1499',
      url: 'https://book.longcare.au?service=startup-mentorship',
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
            { name: 'Mentorship', url: '/startup/mentorship' },
          ]}
        />

        {/* Hero */}
        <section className="mt-6 grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <Badge
              variant="outline"
              className="border-emerald-200 bg-emerald-50 text-emerald-700"
            >
              <Compass className="size-3" /> Now accepting Q3 cohort
            </Badge>
            <h1 className="mt-4 font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Startup Mentorship for AI Founders
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Validate, integrate AI, prep for fundraising. Weekly cadence with
              a senior founder.
            </p>
            <div className="mt-5 inline-flex flex-wrap items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm">
              <span className="font-semibold text-slate-900">
                A$1,499 / month
              </span>
              <span className="text-slate-500">
                inc GST · 3-month minimum · cancel with 30 days&rsquo; notice
              </span>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="https://book.longcare.au?service=startup-mentorship"
                className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-full transition"
              >
                Start mentorship <ArrowRight className="size-4" />
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
              Startup Mentorship is the most common engagement for early-stage
              AI founders. Weekly 1-hour video call, async Slack between
              sessions, and a structured 90-day plan you actually move through.
            </p>
            <p>
              We focus on the highest-leverage decisions a pre-seed founder
              faces: which problem to solve, which AI vendor to bet on, what to
              build vs buy, and when to start raising. The goal is fewer
              decisions made under pressure, more decisions made with a senior
              founder beside you.
            </p>
            <p>
              Dr. Long Do (your mentor) has scaled and exited an AI venture
              and reviews dozens of decks each year for AU and APAC seed funds.
              You get the same lens that investors will apply — earlier, when
              you can still change things.
            </p>
            <p>
              This is not a generic startup accelerator. It&rsquo;s 1:1 senior
              attention, with a strong AU regulatory and AI-native lens.
            </p>
          </div>
        </section>

        {/* Outcomes */}
        <section className="mt-16">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900 mb-6">
            Outcomes — what you walk away with
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

        {/* Format & cadence */}
        <section className="mt-16">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900 mb-6">
            Format &amp; cadence
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <Calendar className="size-6 text-sky-700" />
              <h3 className="mt-3 text-base font-semibold text-slate-900">
                Weekly 1-hour call
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Video call, agenda set 24h before, recording optional, action
                items in your shared doc.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <MessageSquare className="size-6 text-sky-700" />
              <h3 className="mt-3 text-base font-semibold text-slate-900">
                Async Slack
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Quick questions in Slack between sessions. Same-day answers on
                business days.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <Sparkles className="size-6 text-sky-700" />
              <h3 className="mt-3 text-base font-semibold text-slate-900">
                Monthly metric review
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                One session per month dedicated to traction metrics, runway,
                and milestone re-planning.
              </p>
            </div>
          </div>
        </section>

        {/* Sample plan */}
        <section className="mt-16">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900 mb-6">
            A typical 90-day plan
          </h2>
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
            <FlowFiveStep
              className="text-sky-700"
              steps={['Discover', 'Validate', 'Build', 'Traction', 'Pitch']}
              width={1000}
              height={160}
            />
            <p className="mt-4 text-sm text-slate-600">
              Discover the sharpest customer problem · validate it with 10
              interviews · build the leanest possible MVP · drive first
              traction signals · pitch-ready data room and warm intros.
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
              <h3 className="text-lg font-semibold text-slate-900">Monthly</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-slate-900">A$1,499</span>
                <span className="text-sm text-slate-500">/ month inc GST</span>
              </div>
              <p className="mt-3 text-sm text-slate-700">
                3-month minimum. 4 weekly sessions, async Slack, monthly metric
                review. Cancel anytime after minimum with 30 days&rsquo;
                notice.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Quarterly</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-slate-900">A$3,999</span>
                <span className="text-sm text-slate-500">/ quarter inc GST</span>
              </div>
              <p className="mt-3 text-sm text-slate-700">
                12-week programme paid up front. Saves A$498 vs monthly. Ends
                with a pitch-ready review and warm intro plan.
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
                <li>
                  Pre-seed and seed-stage AI startup founders in AU/NZ.
                </li>
                <li>
                  You can commit to weekly sessions for 12+ weeks.
                </li>
                <li>
                  You intend to ship something real in 90 days.
                </li>
                <li>
                  You&rsquo;re open to honest feedback and to changing your
                  mind.
                </li>
              </ul>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-base font-semibold text-rose-700 flex items-center gap-2">
                <XCircle className="size-5" /> Not a fit
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                <li>
                  Idea-only, with no commitment to ship in the next 90 days.
                </li>
                <li>
                  Looking for someone to write code or a deck for you.
                </li>
                <li>
                  Building something that needs heavy regulatory approval (we
                  can refer you).
                </li>
                <li>
                  Series B+ scale-up — book Custom Advisory instead.
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
                &ldquo;Three months in we cut two of our four product
                directions and went deep on one. Closed a A$650K pre-seed eight
                weeks later.&rdquo;
              </p>
              <p className="mt-4 text-sm font-semibold text-slate-900">
                Anonymised &mdash; AI productivity tooling, Sydney
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
              <Quote className="size-6 text-sky-700" />
              <p className="mt-3 text-slate-700 italic">
                &ldquo;The async Slack alone was worth it. Real answers within
                hours, not vague platitudes.&rdquo;
              </p>
              <p className="mt-4 text-sm font-semibold text-slate-900">
                Anonymised &mdash; AI vertical SaaS, Melbourne
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
                  <li>
                    We do <strong>not</strong> take equity by default. Cash
                    engagement only.
                  </li>
                  <li>NDA available before our first session if needed.</li>
                  <li>
                    You retain 100% of your IP. Anything you build, you own.
                  </li>
                  <li>
                    Australian Privacy Act-aligned data handling (APP 1&ndash;13).
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
              Ready to start?
            </h2>
            <p className="mt-3 text-slate-700 max-w-xl mx-auto">
              Book a free 30-minute discovery call. We&rsquo;ll see if
              we&rsquo;re a fit before you commit to anything.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href="https://book.longcare.au?service=startup-mentorship"
                className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-full transition"
              >
                Start mentorship <ArrowRight className="size-4" />
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
