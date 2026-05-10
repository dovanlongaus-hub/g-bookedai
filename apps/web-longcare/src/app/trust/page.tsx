import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  Server,
  Brain,
  ClipboardCheck,
  Lock,
  UserCheck,
  Database,
  AlertTriangle,
  Mail,
  ArrowRight,
  CheckCircle2,
  CircleDashed,
  CircleDot,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { HeroGovernance } from '@/components/illustrations/hero-governance';
import { ThemedPrivacyShield } from '@/components/illustrations/themed-privacy-shield';
import { CONTACT_EMAIL } from '@/lib/site-config';

export const metadata: Metadata = getPageMetadata({
  title: 'Trust & Security | LongCare AU',
  description:
    'How we keep your data safe: Australian-based hosting, no training on customer data, Privacy Act 1988 alignment, and a transparent sub-processor list.',
  path: '/trust',
});

type FrameworkStatus = 'current' | 'in-progress' | 'planned';

const FRAMEWORKS: {
  name: string;
  description: string;
  status: FrameworkStatus;
  note?: string;
}[] = [
  {
    name: 'Australian Privacy Act 1988 — APP 1–13',
    description:
      'Operating principles aligned with the 13 Australian Privacy Principles, reviewed quarterly by named owner.',
    status: 'current',
  },
  {
    name: 'OAIC Privacy Guidance for AI',
    description:
      'Mapped against the Office of the Australian Information Commissioner’s 2024 AI guidance — both as developer and deployer.',
    status: 'current',
  },
  {
    name: 'Australia’s AI Ethics Principles',
    description:
      'Eight voluntary principles (human-centred, fairness, privacy, reliability, transparency, contestability, accountability, well-being) embedded in our review checklist.',
    status: 'current',
  },
  {
    name: 'Notifiable Data Breach (NDB) scheme',
    description:
      'Documented detection, containment, and 72-hour notification workflow with practiced runbook.',
    status: 'current',
  },
  {
    name: 'ISO/IEC 42001 — AI management system',
    description:
      'Internal controls aligned with the standard. Certification audit not yet booked.',
    status: 'in-progress',
    note: 'In alignment, not certified',
  },
  {
    name: 'SOC 2 Type II',
    description:
      'Planned for FY2027 once customer demand and headcount justify the audit cycle.',
    status: 'planned',
    note: 'Planned 2027',
  },
];

const SECURITY_PRACTICES = [
  'Encryption in transit (TLS 1.3) and at rest (AES-256) across Cloud SQL, Cloud Storage, and Firestore.',
  'Role-based access control with named owners; least privilege enforced via Google Cloud IAM.',
  'Audit logs retained for 12 months in Cloud Logging with tamper-evident export to BigQuery.',
  '2-factor authentication mandatory for all staff and contractors, enforced via Google Workspace.',
  'Quarterly access review with documented sign-off; offboarding within 24 hours of role change.',
  'Continuous vulnerability scanning, automated dependency updates, and signed container images.',
];

const SUBPROCESSORS = [
  {
    name: 'Google Cloud (Cloud Run, Cloud SQL, Firestore, Cloud Storage)',
    purpose: 'Compute, database, file storage, real-time state, logging.',
    location: 'australia-southeast1 (Sydney)',
  },
  {
    name: 'Firebase Auth / Google Identity Platform',
    purpose: 'User authentication, SSO, 2-factor.',
    location: 'Global (auth metadata mirrored to AU project)',
  },
  {
    name: 'Vertex AI / Gemini',
    purpose: 'Large-language-model inference for Mentor, Toolkit, Agents.',
    location: 'australia-southeast1 endpoint',
  },
  {
    name: 'Stripe Payments Australia Pty Ltd',
    purpose: 'Card processing, GST-inclusive invoicing, refunds.',
    location: 'Australia (PCI-DSS Level 1)',
  },
  {
    name: 'Twilio',
    purpose: 'SMS and voice notifications (opt-in only).',
    location: 'Global with EU/AU routing options',
  },
  {
    name: 'Mailgun (Sinch)',
    purpose: 'Transactional and marketing email delivery.',
    location: 'EU region (no AU residency yet — assessed as low-sensitivity outbound only)',
  },
  {
    name: 'Sentry',
    purpose: 'Error monitoring with PII scrubbing on by default.',
    location: 'EU region',
  },
];

const INCIDENT_STEPS = [
  {
    label: 'Detect',
    body:
      'Cloud Monitoring alerts, anomaly detection, and human reports converge in a single on-call rotation. Time-stamped from first signal.',
  },
  {
    label: 'Contain',
    body:
      'Affected services isolated, credentials rotated, and a forensic clone snapshotted before any clean-up touches data.',
  },
  {
    label: 'Notify',
    body:
      'Within 72 hours of confirmed eligible breach: notify affected individuals and OAIC under the NDB scheme. Status page updated continuously.',
  },
  {
    label: 'Remediate',
    body:
      'Root-cause analysis, fix shipped, post-incident review published in this site’s changelog within 14 days.',
  },
];

function StatusPill({ status, note }: { status: FrameworkStatus; note?: string }) {
  if (status === 'current') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 text-xs font-medium">
        <CheckCircle2 className="size-3" /> Current
      </span>
    );
  }
  if (status === 'in-progress') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 text-xs font-medium">
        <CircleDashed className="size-3" /> {note ?? 'In progress'}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200 px-2.5 py-0.5 text-xs font-medium">
      <CircleDot className="size-3" /> {note ?? 'Planned'}
    </span>
  );
}

export default function TrustPage() {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'LongCare AU',
    url: 'https://longcare.au',
    sameAs: ['https://longcare.au'],
    address: { '@type': 'PostalAddress', addressCountry: 'AU' },
    email: CONTACT_EMAIL,
  };

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://longcare.au/trust',
    name: 'Trust & Security at LongCare AU',
    description:
      'Where customer data lives, what we train on, our compliance posture, and how to exercise your rights.',
    url: 'https://longcare.au/trust',
    mainEntityOfPage: 'https://longcare.au/trust',
    isPartOf: { '@type': 'WebSite', name: 'LongCare AU', url: 'https://longcare.au' },
    publisher: {
      '@type': 'Organization',
      name: 'LongCare AU',
      url: 'https://longcare.au',
    },
  };

  return (
    <main className="bg-[#F8FAFC] text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Trust', url: '/trust' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-6 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 text-xs font-medium">
              <ShieldCheck className="size-3.5" />
              APP-aligned · WCAG 2.2 AA · Australian-based
            </span>
            <h1 className="mt-4 font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Trust &amp; Security at LongCare AU
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              We host in Australia, we don’t train on your data, and we publish exactly
              what we run. Use this page to vet us before you sign — or any time after.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/governance"
                className="inline-flex items-center gap-2 rounded-full bg-sky-700 hover:bg-sky-600 text-white font-semibold px-5 py-2.5 transition"
              >
                Governance suite <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/governance/responsible-ai"
                className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-300 hover:border-sky-400 hover:text-sky-700 text-slate-800 font-medium px-5 py-2.5 transition"
              >
                Responsible AI principles
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroGovernance className="text-sky-700" width={420} height={320} />
          </div>
        </div>
      </section>

      {/* Where your data lives */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="size-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center flex-shrink-0">
              <Server className="size-5" />
            </div>
            <div className="flex-1">
              <h2 className="font-heading text-2xl font-semibold text-slate-900">
                Where your data lives
              </h2>
              <p className="mt-2 text-slate-700">
                By default, customer data stays in Australia. Specifically:
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>
                    Cloud Run application services and Cloud SQL PostgreSQL: hosted in
                    <strong> australia-southeast1</strong> (Sydney).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>
                    Firebase Authentication and Vertex AI inference endpoints: configured
                    on the <strong>australia-southeast1</strong> region.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>
                    No customer data leaves Australia by default. Cross-border transfer
                    requires explicit opt-in (e.g. for a partner integration) and is logged.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>
                    Backups encrypted with customer-managed keys (CMEK) and retained for 30
                    days unless statutory record-keeping requires longer.
                  </span>
                </li>
              </ul>
            </div>
            <div className="hidden md:block flex-shrink-0">
              <ThemedPrivacyShield className="text-sky-700" width={180} height={180} />
            </div>
          </div>
        </div>
      </section>

      {/* Training data stance */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="size-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
              <Brain className="size-5" />
            </div>
            <div>
              <h2 className="font-heading text-2xl font-semibold text-slate-900">
                What we do (and do not) train on
              </h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-4">
                  <div className="text-sm font-semibold text-emerald-800">
                    We do NOT
                  </div>
                  <ul className="mt-2 space-y-2 text-sm text-slate-700">
                    <li>• Use your data to train base models.</li>
                    <li>• Re-use your prompts or outputs to fine-tune any shared model.</li>
                    <li>• Sell, trade, or syndicate your content.</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-sky-200 bg-sky-50/50 p-4">
                  <div className="text-sm font-semibold text-sky-800">We do</div>
                  <ul className="mt-2 space-y-2 text-sm text-slate-700">
                    <li>
                      • Disable training in vendor settings (OpenAI, Google, Anthropic) so
                      providers do not retain or train on your data.
                    </li>
                    <li>
                      • Use aggregated, anonymised metrics (counts, latency) to operate
                      and improve the service.
                    </li>
                    <li>
                      • Build sector benchmarks only from data customers have explicitly
                      opted in to share.
                    </li>
                  </ul>
                </div>
              </div>
              <p className="mt-4 text-xs text-slate-500">
                Reviewed and re-attested every quarter. The current attestation lives in
                our Responsible AI framework.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance frameworks */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
              <ClipboardCheck className="size-5" />
            </div>
            <h2 className="font-heading text-2xl font-semibold text-slate-900">
              Compliance frameworks
            </h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {FRAMEWORKS.map((f) => (
              <div
                key={f.name}
                className="rounded-lg border border-slate-200 p-4 bg-slate-50/40 flex flex-col gap-2"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold text-slate-900">{f.name}</h3>
                  <StatusPill status={f.status} note={f.note} />
                </div>
                <p className="text-sm text-slate-700">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security practices */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
              <Lock className="size-5" />
            </div>
            <h2 className="font-heading text-2xl font-semibold text-slate-900">
              Security practices
            </h2>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {SECURITY_PRACTICES.map((p) => (
              <li
                key={p}
                className="flex items-start gap-2 text-sm text-slate-700 rounded-lg border border-slate-200 p-3 bg-slate-50/40"
              >
                <CheckCircle2 className="size-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Customer rights */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <UserCheck className="size-5" />
            </div>
            <h2 className="font-heading text-2xl font-semibold text-slate-900">
              Your rights under the Privacy Act
            </h2>
          </div>
          <p className="text-sm text-slate-700">
            You can access, correct, and complain about your personal information at any
            time. We aim to respond within five business days.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Link
              href="/contact?topic=data-access"
              className="rounded-lg border border-slate-200 p-4 hover:border-sky-400 hover:text-sky-700 transition flex flex-col gap-1"
            >
              <span className="text-sm font-semibold text-slate-900">
                Request access
              </span>
              <span className="text-xs text-slate-500">
                Get a copy of all data we hold about you.
              </span>
            </Link>
            <Link
              href="/contact?topic=data-correction"
              className="rounded-lg border border-slate-200 p-4 hover:border-sky-400 hover:text-sky-700 transition flex flex-col gap-1"
            >
              <span className="text-sm font-semibold text-slate-900">
                Request correction
              </span>
              <span className="text-xs text-slate-500">
                Update or remove inaccurate information.
              </span>
            </Link>
            <a
              href="https://www.oaic.gov.au/privacy/privacy-complaints"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-slate-200 p-4 hover:border-sky-400 hover:text-sky-700 transition flex flex-col gap-1"
            >
              <span className="text-sm font-semibold text-slate-900">
                Lodge an OAIC complaint
              </span>
              <span className="text-xs text-slate-500">
                External, independent: oaic.gov.au
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Sub-processors */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
              <Database className="size-5" />
            </div>
            <h2 className="font-heading text-2xl font-semibold text-slate-900">
              Sub-processors
            </h2>
          </div>
          <p className="text-sm text-slate-700 mb-4">
            We update this list when sub-processors change. Material changes are also
            announced in the <Link href="/changelog" className="text-sky-700 hover:underline">changelog</Link>.
          </p>
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th className="text-left font-semibold px-4 py-3">Provider</th>
                  <th className="text-left font-semibold px-4 py-3">Purpose</th>
                  <th className="text-left font-semibold px-4 py-3">Location</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {SUBPROCESSORS.map((s) => (
                  <tr key={s.name} className="bg-white">
                    <td className="px-4 py-3 align-top text-slate-900 font-medium">
                      {s.name}
                    </td>
                    <td className="px-4 py-3 align-top text-slate-700">{s.purpose}</td>
                    <td className="px-4 py-3 align-top text-slate-600">{s.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Incident response */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <AlertTriangle className="size-5" />
            </div>
            <h2 className="font-heading text-2xl font-semibold text-slate-900">
              Incident response
            </h2>
          </div>
          <ol className="grid gap-4 md:grid-cols-4">
            {INCIDENT_STEPS.map((s, i) => (
              <li
                key={s.label}
                className="rounded-lg border border-slate-200 p-4 bg-slate-50/40"
              >
                <div className="flex items-center gap-2">
                  <span className="size-7 rounded-full bg-sky-700 text-white text-xs font-semibold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="text-sm font-semibold text-slate-900">{s.label}</span>
                </div>
                <p className="mt-2 text-xs text-slate-700">{s.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs text-slate-500">
            Notification window: within 72 hours of confirming a breach affecting one or
            more individuals, in line with the Notifiable Data Breach scheme.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-20">
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="size-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
              <Mail className="size-5" />
            </div>
            <h2 className="font-heading text-2xl font-semibold text-slate-900">
              Report a vulnerability or contact governance
            </h2>
          </div>
          <p className="text-slate-700 max-w-2xl">
            We welcome responsible disclosure. Email <a className="text-sky-700 hover:underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>{' '}
            with reproduction steps. We acknowledge within two business days and never
            pursue legal action against good-faith researchers.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/governance"
              className="inline-flex items-center gap-2 rounded-full bg-sky-700 hover:bg-sky-600 text-white font-semibold px-5 py-2.5 transition"
            >
              Governance suite <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/governance/responsible-ai"
              className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-300 hover:border-sky-400 hover:text-sky-700 text-slate-800 font-medium px-5 py-2.5 transition"
            >
              Responsible AI framework
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-300 hover:border-sky-400 hover:text-sky-700 text-slate-800 font-medium px-5 py-2.5 transition"
            >
              Contact us
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <Link href="/status" className="inline-flex items-center gap-1 hover:text-sky-700">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                Status
              </Badge>
              See current service status
            </Link>
            <Link href="/roadmap" className="inline-flex items-center gap-1 hover:text-sky-700">
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                Roadmap
              </Badge>
              What we’re shipping next
            </Link>
            <Link href="/changelog" className="inline-flex items-center gap-1 hover:text-sky-700">
              <Badge variant="outline" className="border-slate-200 bg-slate-50 text-slate-700">
                Changelog
              </Badge>
              What we’ve shipped
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
