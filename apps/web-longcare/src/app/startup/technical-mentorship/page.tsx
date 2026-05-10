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
  Code2,
  GitPullRequest,
  Server,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { HeroMentor } from '@/components/illustrations/hero-mentor';
import { FlowFiveStep } from '@/components/illustrations/flow-five-step';

export const metadata: Metadata = getPageMetadata({
  title: 'Technical Mentorship for AI Startups | LongCare AU',
  description:
    'Cloud architecture, AI stack, MVP build strategy. Hands-on, opinionated, AU-context. From A$249/hr inc GST.',
  path: '/startup/technical-mentorship',
});

const OUTCOMES = [
  'Production-ready GCP architecture diagram with cost projection.',
  'AI vendor selection rationale (OpenAI, Anthropic, Gemini, open-source).',
  'Deployment runbook your CTO or first hire can follow.',
  'Security baseline aligned with the Australian Privacy Act (APP 1–13).',
  'Scalability checkpoints — what breaks at 100, 1K, 10K users.',
  'Build vs buy matrix for the next six engineering decisions.',
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
    title: 'Innovation Strategy',
    href: '/startup/innovation-strategy',
    Icon: Lightbulb,
    blurb: 'Digital transformation, AI readiness, GTM.',
  },
];

export default function TechnicalMentorshipPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Technical Mentorship for AI Startups',
    serviceType: 'Technical Mentorship',
    provider: {
      '@type': 'Organization',
      name: 'LongCare AU',
      url: 'https://longcare.au',
    },
    areaServed: { '@type': 'Country', name: 'Australia' },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Technical founders and CTOs of AI startups',
    },
    description:
      'Hands-on technical mentorship for AI startup founders and CTOs. Cloud architecture, AI stack, MVP build strategy, AU-context.',
    url: 'https://longcare.au/startup/technical-mentorship',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'AUD',
      price: '249',
      url: 'https://book.longcare.au?service=technical-mentorship',
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
              name: 'Technical Mentorship',
              url: '/startup/technical-mentorship',
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
              <Cpu className="size-3" /> 3 retainer slots open
            </Badge>
            <h1 className="mt-4 font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Technical Mentorship for AI Startups
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Cloud architecture, AI stack, MVP build strategy. Hands-on,
              opinionated, AU-context.
            </p>
            <div className="mt-5 inline-flex flex-wrap items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm">
              <span className="font-semibold text-slate-900">A$249 / hour</span>
              <span className="text-slate-500">
                inc GST &middot; or A$1,899/mo retainer (8 hrs + async)
              </span>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="https://book.longcare.au?service=technical-mentorship"
                className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-full transition"
              >
                Book technical hour <ArrowRight className="size-4" />
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
              Technical Mentorship is for founders and CTOs who are building.
              We pair-program where useful, review architecture, and give
              opinionated answers on the AI stack.
            </p>
            <p>
              The biggest risk for an AI startup at MVP isn&rsquo;t whether the
              model works &mdash; it&rsquo;s whether the architecture survives
              the second order of magnitude. We help you make decisions today
              you won&rsquo;t need to redo when you 10x.
            </p>
            <p>
              We have a strong Google Cloud preference (Cloud Run, Cloud SQL,
              Pub/Sub, Vertex AI, Gemini) but will work in your stack if you
              have a strong reason. We&rsquo;ll always tell you what we&rsquo;d
              do differently.
            </p>
            <p>
              Australian context matters: data residency, Privacy Act, IRAP
              if you&rsquo;re selling to government or enterprise. We bake that
              in from day one rather than retrofitting.
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
              <Code2 className="size-6 text-sky-700" />
              <h3 className="mt-3 text-base font-semibold text-slate-900">
                Pair-programming sessions
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Live coding when it&rsquo;s the fastest path. We screenshare
                yours, not ours.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <Server className="size-6 text-sky-700" />
              <h3 className="mt-3 text-base font-semibold text-slate-900">
                Architecture reviews
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Sit-down reviews of your system diagram, data flows, and AI
                vendor surface area.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <GitPullRequest className="size-6 text-sky-700" />
              <h3 className="mt-3 text-base font-semibold text-slate-900">
                Async PR feedback
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Tag us on critical PRs and get review comments within one
                business day.
              </p>
            </div>
          </div>
        </section>

        {/* Sample plan */}
        <section className="mt-16">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900 mb-6">
            A typical engagement arc
          </h2>
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
            <FlowFiveStep
              className="text-sky-700"
              steps={['Audit stack', 'Design', 'Build', 'Deploy', 'Scale']}
              width={1000}
              height={160}
            />
            <p className="mt-4 text-sm text-slate-600">
              Audit your current stack and surface the pain &middot; design
              the next architecture iteration &middot; build with paired
              sessions &middot; deploy with a runbook &middot; scale with
              confidence.
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
                Hourly
              </h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-slate-900">A$249</span>
                <span className="text-sm text-slate-500">/ hour inc GST</span>
              </div>
              <p className="mt-3 text-sm text-slate-700">
                Booked in 1-hour blocks. Best for one-off architecture review
                or a stuck technical decision.
              </p>
            </div>
            <div className="bg-white border border-sky-300 ring-2 ring-sky-100 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">
                Monthly retainer
              </h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-slate-900">A$1,899</span>
                <span className="text-sm text-slate-500">/ month inc GST</span>
              </div>
              <p className="mt-3 text-sm text-slate-700">
                8 hours of paired/review sessions plus async PR feedback and
                Slack. Effective rate ~A$237/hr with async included.
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
                  Technical founders or CTOs of AI startups (3&ndash;15 people).
                </li>
                <li>You ship code regularly and want sharper decisions.</li>
                <li>You sell or plan to sell to AU/NZ enterprise customers.</li>
                <li>You&rsquo;re comfortable in GCP or willing to evaluate.</li>
              </ul>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-base font-semibold text-rose-700 flex items-center gap-2">
                <XCircle className="size-5" /> Not a fit
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                <li>Hobby projects with no revenue intent.</li>
                <li>Looking for a contractor to write code for you.</li>
                <li>
                  Need a fractional CTO &mdash; we offer that under Custom
                  Advisory only.
                </li>
                <li>
                  Building a regulated medical device &mdash; we can refer
                  you.
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
                &ldquo;We were about to go all-in on a vector DB we
                didn&rsquo;t need. Three hours saved us six months of
                engineering pain.&rdquo;
              </p>
              <p className="mt-4 text-sm font-semibold text-slate-900">
                Anonymised &mdash; AI legal-tech, Sydney
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
              <Quote className="size-6 text-sky-700" />
              <p className="mt-3 text-slate-700 italic">
                &ldquo;The PR review channel kept us honest. Fewer hot fixes,
                better tests, calmer deployments.&rdquo;
              </p>
              <p className="mt-4 text-sm font-semibold text-slate-900">
                Anonymised &mdash; AI customer-support startup, Wellington
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
                  <li>No equity. No code ownership. We work in your repo.</li>
                  <li>NDA standard before paired-programming begins.</li>
                  <li>You retain 100% IP in code, designs, runbooks.</li>
                  <li>
                    Privacy Act-aligned guidance for data architecture
                    decisions.
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
              Ready for senior engineering eyes?
            </h2>
            <p className="mt-3 text-slate-700 max-w-xl mx-auto">
              Book a single hour to scope, or jump straight to the monthly
              retainer if you know the shape.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href="https://book.longcare.au?service=technical-mentorship"
                className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-full transition"
              >
                Book technical hour <ArrowRight className="size-4" />
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
