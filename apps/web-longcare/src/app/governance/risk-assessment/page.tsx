import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldAlert,
  Building2,
  Database,
  AlertTriangle,
  Gavel,
  ArrowRight,
  ScrollText,
  Scale,
  CheckCircle2,
  Activity,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { HeroGovernance } from '@/components/illustrations/hero-governance';
import { InfographicRoiQuadrant } from '@/components/illustrations/infographic-roi-quadrant';
import { WaitlistForm } from './waitlist-form';

export const metadata: Metadata = getPageMetadata({
  title: 'AI Risk Assessment Tool | LongCare AU',
  description:
    'Score your AI risk in 12 questions across vendor, data, output, and compliance dimensions. Built for Australian SMEs and aligned to APP and OAIC guidance.',
  path: '/governance/risk-assessment',
});

const DIMENSIONS = [
  {
    title: 'Vendor Risk',
    Icon: Building2,
    body:
      'Provider security maturity, terms of service, geographic data residency, and breach-notification posture.',
  },
  {
    title: 'Data Risk',
    Icon: Database,
    body:
      'What data classes enter AI tools, sensitivity, consent, and APP 6 / APP 11 alignment.',
  },
  {
    title: 'Output Risk',
    Icon: AlertTriangle,
    body:
      'Accuracy, bias, hallucination consequence, and the cost of acting on a wrong answer.',
  },
  {
    title: 'Compliance Risk',
    Icon: Gavel,
    body:
      'Australian Privacy Principles, sector-specific obligations (AHPRA, TPB, LIV), and audit trail.',
  },
];

const TIERS = [
  {
    band: '0–12',
    label: 'Low',
    tone: 'emerald',
    body:
      'Lightweight controls. Document acceptable use and review annually.',
  },
  {
    band: '13–24',
    label: 'Moderate',
    tone: 'amber',
    body:
      'Implement data handling, vendor assessment, and human-in-the-loop review for material outputs.',
  },
  {
    band: '25–36',
    label: 'High',
    tone: 'rose',
    body:
      'Run a full governance review, restrict tool list, and pause material AI use until controls are in place.',
  },
];

const SIBLINGS = [
  { title: 'AI Policy Templates', href: '/governance/policies', Icon: ScrollText },
  { title: 'Responsible AI Framework', href: '/governance/responsible-ai', Icon: Scale },
];

const SAMPLE_REPORT = [
  { dim: 'Vendor', score: 5, of: 9, note: 'Two unapproved tools in active use' },
  { dim: 'Data', score: 7, of: 9, note: 'PII redaction inconsistent across teams' },
  { dim: 'Output', score: 4, of: 9, note: 'Human review present for clinical content' },
  { dim: 'Compliance', score: 3, of: 9, note: 'APP register and audit log up to date' },
];

const toneClasses: Record<string, string> = {
  emerald: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  amber: 'border-amber-200 bg-amber-50 text-amber-700',
  rose: 'border-rose-200 bg-rose-50 text-rose-700',
};

export default function RiskAssessmentPage() {
  const totalSample = SAMPLE_REPORT.reduce((acc, r) => acc + r.score, 0);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI Risk Assessment',
    serviceType: 'AI Risk Assessment',
    provider: {
      '@type': 'Organization',
      name: 'LongCare AU',
      url: 'https://longcare.au',
    },
    areaServed: { '@type': 'Country', name: 'Australia' },
    description:
      '12-question evaluation across vendor, data, output, and compliance dimensions, scored 0–36 and aligned to the Australian Privacy Act.',
    url: 'https://longcare.au/governance/risk-assessment',
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Australian small and medium enterprises',
    },
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
            { name: 'Governance', url: '/governance' },
            { name: 'Risk Assessment', url: '/governance/risk-assessment' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-8 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <Badge
              variant="outline"
              className="border-amber-200 bg-amber-50 text-amber-700"
            >
              <ShieldAlert className="size-3" /> Coming soon — beta waitlist open
            </Badge>
            <h1 className="mt-4 font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              AI Risk Assessment
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Score your AI risk in 12 questions across 4 dimensions — Vendor,
              Data, Output, and Compliance.
            </p>
          </div>
          <div className="hidden lg:block">
            <HeroGovernance className="text-amber-700" width={360} height={280} />
          </div>
        </div>
        <div className="mt-10 bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12 overflow-x-auto">
          <h2 className="font-heading text-xl text-slate-900 text-center mb-6">Risk-impact quadrants</h2>
          <div className="flex justify-center">
            <InfographicRoiQuadrant width={420} height={420} />
          </div>
        </div>
      </section>

      {/* What we evaluate */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <h2 className="font-heading text-2xl font-semibold text-slate-900 mb-6">
          What we evaluate
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {DIMENSIONS.map(({ title, Icon, body }) => (
            <div
              key={title}
              className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="size-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
              </div>
              <p className="text-sm text-slate-700">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How scoring works */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="font-heading text-2xl font-semibold text-slate-900">
            How scoring works
          </h2>
          <p className="mt-2 text-sm text-slate-700 max-w-2xl">
            Each of the 12 questions is rated 0 (low) to 3 (high) for a total
            score between 0 and 36. The total places you in one of three tiers,
            each with recommended next actions.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {TIERS.map((tier) => (
              <div
                key={tier.label}
                className={`rounded-xl border p-5 ${toneClasses[tier.tone]}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wide">
                    {tier.label}
                  </span>
                  <span className="text-sm font-mono">{tier.band}</span>
                </div>
                <p className="mt-2 text-sm leading-snug text-slate-800">
                  {tier.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample report mockup */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <h2 className="font-heading text-2xl font-semibold text-slate-900 mb-6">
          Sample report
        </h2>
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                <Activity className="size-5" />
              </div>
              <div>
                <div className="text-sm text-slate-500">Sample SME — clinic, 18 staff</div>
                <div className="text-base font-semibold text-slate-900">
                  AI Risk Score: {totalSample} / 36
                </div>
              </div>
            </div>
            <Badge
              variant="outline"
              className="border-amber-200 bg-amber-50 text-amber-700"
            >
              Moderate
            </Badge>
          </div>
          <div className="mt-5 space-y-3">
            {SAMPLE_REPORT.map((r) => {
              const pct = Math.round((r.score / r.of) * 100);
              return (
                <div key={r.dim}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-900">{r.dim}</span>
                    <span className="font-mono text-slate-700">
                      {r.score} / {r.of}
                    </span>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-sky-600"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="mt-1 text-xs text-slate-500">{r.note}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Waitlist + manual review CTA */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
            <h2 className="font-heading text-xl font-semibold text-slate-900">
              Join the waitlist
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              The full interactive tool launches soon. Get notified when it’s
              live and receive the methodology paper.
            </p>
            <div className="mt-5">
              <WaitlistForm />
            </div>
            <ul className="mt-5 space-y-2 text-xs text-slate-500">
              <li className="flex gap-2">
                <CheckCircle2 className="size-3.5 text-emerald-600 mt-0.5" />
                <span>No spam — one launch email and the methodology PDF.</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="size-3.5 text-emerald-600 mt-0.5" />
                <span>Stored in line with the Privacy Act and our policy.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col">
            <h2 className="font-heading text-xl font-semibold text-slate-900">
              Need a manual review now?
            </h2>
            <p className="mt-2 text-sm text-slate-700 flex-1">
              Skip the queue. Our team will run the assessment with you and
              hand back a written report with prioritised remediation.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/contact?topic=risk-assessment"
                className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition"
              >
                Request manual review <ArrowRight className="size-4" />
              </Link>
              <a
                href="https://book.longcare.au?service=governance-review"
                className="inline-flex items-center gap-2 bg-white border border-slate-300 hover:border-sky-400 hover:text-sky-700 text-slate-800 text-sm font-medium px-5 py-2.5 rounded-full transition"
              >
                Book a discovery call
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sibling nav */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-20">
        <h2 className="font-heading text-2xl font-semibold text-slate-900 mb-6">
          Continue exploring governance
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
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
            href="/governance"
            className="inline-flex items-center gap-1 text-sm font-medium text-sky-700 hover:text-sky-800"
          >
            <ArrowRight className="size-4 rotate-180" /> Back to Governance hub
          </Link>
        </div>
      </section>
    </main>
  );
}
