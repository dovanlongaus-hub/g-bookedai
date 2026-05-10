import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Cloud,
  Layers,
  GitBranch,
  Rocket,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Database,
  Server,
  BarChart3,
  Lock,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { HeroAgents } from '@/components/illustrations/hero-agents';
import { FlowFiveStep } from '@/components/illustrations/flow-five-step';
import { InfographicStack } from '@/components/illustrations/infographic-stack';

export const metadata: Metadata = getPageMetadata({
  title: 'Google Cloud for SMEs & AI Startups | LongCare AU',
  description:
    'Vertex AI, Gemini, BigQuery, Cloud Run, and Firebase — production-ready Google Cloud setups for Australian SMEs and AI startups. From single-service starter to full stack.',
  path: '/cloud-advisory/google-cloud',
});

const DELIVERABLES = [
  {
    Icon: Sparkles,
    title: 'Vertex AI deployment',
    body: 'Models deployed with quotas, monitoring, and budget alerts. Online and batch endpoints as needed.',
  },
  {
    Icon: Cloud,
    title: 'Gemini API integration',
    body: 'Caching strategy, prompt versioning, retry logic, and cost-aware routing across Flash and Pro tiers.',
  },
  {
    Icon: BarChart3,
    title: 'BigQuery analytics + Looker',
    body: 'Warehouse design, scheduled queries, and Looker Studio dashboards your team can self-serve.',
  },
  {
    Icon: Server,
    title: 'Cloud Run services',
    body: 'Min/max instances tuned per workload, concurrency configured, and CPU allocation right-sized.',
  },
  {
    Icon: Lock,
    title: 'Firebase Auth + rules',
    body: 'Sign-in providers, custom claims, and Firestore security rules tested against your RBAC matrix.',
  },
  {
    Icon: ShieldCheck,
    title: 'Org-level guardrails',
    body: 'Org policies, billing alerts, IAM conditions, and Service Account hygiene.',
  },
];

const TOOLS = [
  'gcloud',
  'Terraform',
  'Cloud Build',
  'Artifact Registry',
  'Vertex AI',
  'Gemini API',
  'BigQuery',
  'Firebase CLI',
];

const TIERS = [
  {
    name: 'GCP starter setup',
    price: 'A$3,500',
    sub: 'fixed, inc GST',
    duration: '2 to 3 weeks',
    bullets: [
      'One service end-to-end on GCP',
      'Cloud Run + Firestore or Cloud SQL',
      'CI/CD via Cloud Build or GitHub Actions',
      'Monitoring and budget alerts',
    ],
  },
  {
    name: 'Full stack engagement',
    price: 'A$8K to A$18K',
    sub: 'inc GST, scoped',
    duration: '5 to 8 weeks',
    bullets: [
      'Multiple services with shared platform',
      'Vertex AI or Gemini integration',
      'BigQuery + Looker Studio dashboards',
      'Firebase Auth + security rules',
      'Org-level guardrails configured',
    ],
  },
];

const STACK_LAYERS = [
  { label: 'Auth', sub: 'Firebase Auth' },
  { label: 'Frontend', sub: 'Hosting / Next.js' },
  { label: 'API', sub: 'Cloud Run' },
  { label: 'AI', sub: 'Vertex AI / Gemini' },
  { label: 'Data', sub: 'Firestore / Cloud SQL' },
  { label: 'Analytics', sub: 'BigQuery / Looker' },
];

const SIBLINGS = [
  { title: 'Architecture Design', href: '/cloud-advisory/architecture-design', Icon: Layers },
  { title: 'Migration', href: '/cloud-advisory/migration', Icon: GitBranch },
  { title: 'Scalability', href: '/cloud-advisory/scalability', Icon: Rocket },
];

export default function GoogleCloudPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Google Cloud Setup and Integration',
    serviceType: 'Google Cloud Platform Implementation',
    provider: {
      '@type': 'Organization',
      name: 'LongCare AU',
      url: 'https://longcare.au',
    },
    areaServed: { '@type': 'Country', name: 'Australia' },
    description:
      'Production Google Cloud setups for Australian SMEs and AI startups, covering Vertex AI, Gemini, BigQuery, Cloud Run, and Firebase Auth.',
    url: 'https://longcare.au/cloud-advisory/google-cloud',
    offers: [
      {
        '@type': 'Offer',
        name: 'GCP starter setup',
        price: '3500',
        priceCurrency: 'AUD',
      },
      {
        '@type': 'Offer',
        name: 'Full stack engagement',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: '8000',
          maxPrice: '18000',
          priceCurrency: 'AUD',
        },
      },
    ],
  };

  return (
    <main className="bg-[#F8FAFC] text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-6">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Cloud Advisory', url: '/cloud-advisory' },
            { name: 'Google Cloud', url: '/cloud-advisory/google-cloud' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-8 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <Badge
              variant="outline"
              className="border-sky-200 bg-sky-50 text-sky-700"
            >
              <Cloud className="size-3" /> Google Cloud
            </Badge>
            <h1 className="mt-4 font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Google Cloud for SMEs &amp; AI startups
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Vertex AI, Gemini, BigQuery, Cloud Run, and Firebase — assembled
              by people who use them daily, not just describe them on slides.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://book.longcare.au?service=google-cloud"
                className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-full transition"
              >
                Book a discovery call <ArrowRight className="size-4" />
              </a>
              <Link
                href="/cloud-advisory"
                className="inline-flex items-center gap-2 bg-white border border-slate-300 hover:border-sky-400 hover:text-sky-700 text-slate-800 font-medium px-5 py-3 rounded-full transition"
              >
                Back to Cloud Advisory
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroAgents className="text-sky-700" width={360} height={270} />
          </div>
        </div>
      </section>

      {/* What we deliver */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <h2 className="font-heading text-2xl font-semibold text-slate-900 mb-6">
          What we deliver
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {DELIVERABLES.map(({ Icon, title, body }) => (
            <div
              key={title}
              className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm"
            >
              <div className="size-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
                <Icon className="size-5" />
              </div>
              <h3 className="mt-3 text-base font-semibold text-slate-900">
                {title}
              </h3>
              <p className="mt-1 text-sm text-slate-700">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reference architecture */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <h2 className="font-heading text-2xl font-semibold text-slate-900 mb-6">
          Reference architecture
        </h2>
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-[auto_1fr] items-center">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mx-auto">
              <InfographicStack width={340} height={380} layers={STACK_LAYERS} />
            </div>
            <div>
              <p className="text-slate-700">
                Our default GCP stack starts with Firebase Auth on the edge,
                Cloud Run for stateless services, Vertex AI or Gemini for model
                calls, Firestore and Cloud SQL behind it, and BigQuery for
                analytics. It is opinionated, but every choice has a fall-back.
              </p>
              <ul className="mt-5 space-y-3">
                {[
                  {
                    Icon: Database,
                    text: 'Firestore for realtime collaboration; Cloud SQL for transactional integrity.',
                  },
                  {
                    Icon: Server,
                    text: 'Cloud Run with min/max instances tuned per workload to control cold-start vs cost.',
                  },
                  {
                    Icon: BarChart3,
                    text: 'BigQuery via scheduled queries and Looker Studio for self-serve dashboards.',
                  },
                  {
                    Icon: ShieldCheck,
                    text: 'Org policies, IAM conditions, and budget alerts wired in before the first prod deploy.',
                  },
                ].map(({ Icon, text }, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Icon className="size-5 text-sky-700 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <h2 className="font-heading text-2xl font-semibold text-slate-900 mb-6">
          Process
        </h2>
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm overflow-x-auto">
          <div className="flex justify-center">
            <FlowFiveStep
              width={820}
              height={150}
              steps={['Discover', 'Spec', 'Build', 'Pilot', 'Production']}
            />
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <h2 className="font-heading text-2xl font-semibold text-slate-900 mb-6">
          Tools we use
        </h2>
        <div className="flex flex-wrap gap-3">
          {TOOLS.map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Pricing & timeline */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <h2 className="font-heading text-2xl font-semibold text-slate-900 mb-2">
          Pricing &amp; timeline
        </h2>
        <p className="text-sm text-slate-600 mb-6">
          All prices in Australian Dollars and inclusive of GST.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {TIERS.map((t) => (
            <div
              key={t.name}
              className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col"
            >
              <Badge
                variant="outline"
                className="border-sky-200 bg-sky-50 text-sky-700 self-start"
              >
                {t.duration}
              </Badge>
              <h3 className="mt-3 text-xl font-semibold text-slate-900">
                {t.name}
              </h3>
              <div className="mt-2">
                <span className="text-2xl font-semibold text-slate-900">
                  {t.price}
                </span>
                <span className="ml-2 text-xs text-slate-500">{t.sub}</span>
              </div>
              <ul className="mt-4 space-y-2 flex-1">
                {t.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="size-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Compliance & ownership */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="size-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="size-5" />
            </div>
            <h2 className="font-heading text-2xl font-semibold text-slate-900">
              Compliance &amp; ownership
            </h2>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'australia-southeast1 (Sydney) by default for data and compute.',
              'Your GCP organisation, your billing, your IAM admins — not ours.',
              'No managed-service mark-ups. We do not resell your GCP spend.',
              'Off-boarding playbook included so you can run independently.',
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <CheckCircle2 className="size-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-700">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Sample case study */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <Badge
            variant="outline"
            className="border-amber-200 bg-amber-50 text-amber-700"
          >
            Anonymised
          </Badge>
          <h2 className="mt-3 font-heading text-2xl font-semibold text-slate-900">
            Sample engagement
          </h2>
          <p className="mt-3 text-slate-700">
            A Sydney legal-tech team had a working prototype on a single VM with
            OpenAI calls and a SQLite database. We moved them to Cloud Run with
            Gemini Flash for the bulk of calls (with Pro reserved for complex
            drafting), Firestore for collaboration state, and Cloud SQL for the
            matter ledger. BigQuery dashboards now track per-matter spend, and
            their auditor signs off on cloud controls in two pages instead of
            twenty.
          </p>
          <p className="mt-3 text-slate-700">
            Total spend across model calls dropped by roughly forty per cent
            against the OpenAI baseline at projected volume, while p95 latency
            improved.
          </p>
        </div>
      </section>

      {/* Related services */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <h2 className="font-heading text-2xl font-semibold text-slate-900 mb-6">
          Related services
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {SIBLINGS.map(({ title, href, Icon }) => (
            <Link
              key={href}
              href={href}
              className="group bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-sky-300 transition flex items-center gap-4"
            >
              <div className="size-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
                <Icon className="size-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-slate-900 group-hover:text-sky-700 transition">
                  {title}
                </h3>
              </div>
              <ArrowRight className="size-4 text-sky-700 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          ))}
        </div>
        <div className="mt-6">
          <Link
            href="/governance/responsible-ai"
            className="inline-flex items-center gap-2 text-sm font-medium text-sky-700 hover:text-sky-800"
          >
            Pair with our Responsible AI framework <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-20">
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm text-center">
          <h2 className="font-heading text-2xl font-semibold text-slate-900">
            Get one service into production on GCP in three weeks
          </h2>
          <p className="mt-2 text-slate-700 max-w-xl mx-auto">
            Starter packages are A$3,500 inc GST and end with a deploy you can
            run yourselves. Bigger stacks are scoped from there.
          </p>
          <a
            href="https://book.longcare.au?service=google-cloud"
            className="mt-6 inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-full transition"
          >
            Book a discovery call <ArrowRight className="size-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
