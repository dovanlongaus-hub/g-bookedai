import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Users,
  Eye,
  Lock,
  Target,
  Scale,
  Shield,
  ClipboardCheck,
  ArrowRight,
  ScrollText,
  ShieldAlert,
  BookMarked,
  ListChecks,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { HeroGovernance } from '@/components/illustrations/hero-governance';
import { InfographicTimeline } from '@/components/illustrations/infographic-timeline';

export const metadata: Metadata = getPageMetadata({
  title: 'Responsible AI Framework for AU SMEs | LongCare AU',
  description:
    'Our 7-principle Responsible AI framework adapted from the Australian Privacy Principles, OAIC guidance, and Australia’s AI Ethics Principles — practical for SMEs.',
  path: '/governance/responsible-ai',
  type: 'article',
});

type Principle = {
  num: number;
  title: string;
  Icon: typeof Users;
  paragraphs: string[];
};

const PRINCIPLES: Principle[] = [
  {
    num: 1,
    title: 'Human-Centred',
    Icon: Users,
    paragraphs: [
      'AI assists; it does not replace human judgement. For any material decision — clinical, legal, financial, or relating to someone’s livelihood — a qualified human remains the accountable decision-maker.',
      'In practice this means human-in-the-loop review for high-stakes outputs, and clearly documented thresholds where AI suggestions become the starting point of a workflow rather than the end of one.',
    ],
  },
  {
    num: 2,
    title: 'Transparent',
    Icon: Eye,
    paragraphs: [
      'Disclose AI use to customers in plain English. If a chatbot answers their question, an AI summarises their record, or AI generates content they read, they should be able to find that out without effort.',
      'Where AI materially shapes a decision, explain — at least at a category level — what data was used, what the model contributed, and how a person can request human review.',
    ],
  },
  {
    num: 3,
    title: 'Privacy-Respecting',
    Icon: Lock,
    paragraphs: [
      'Aligned to the Australian Privacy Principles. Customer PII never enters general-purpose AI tools without consent and contractual safeguards from the vendor (no training on inputs, geographic constraints, breach notification).',
      'Default to redaction or pseudonymisation before prompting. Maintain an inventory of which AI tools touch which data classes — this is the single most useful artefact when OAIC or your insurer asks.',
    ],
  },
  {
    num: 4,
    title: 'Accurate &amp; Tested',
    Icon: Target,
    paragraphs: [
      'Outputs are reviewed against ground truth. Hallucinations and material errors are tracked, not just noticed and ignored. Quality is a recurring metric, not a launch-day promise.',
      'Build a small evaluation set per workflow and rerun it whenever a model, prompt, or vendor changes. Continuous monitoring beats one-off testing every time.',
    ],
  },
  {
    num: 5,
    title: 'Fair &amp; Inclusive',
    Icon: Scale,
    paragraphs: [
      'Outputs are bias-tested across the demographics your business actually serves — including language, region, age, and accessibility needs.',
      'Accessibility is part of fairness. Captions, alt text, plain-language alternatives, and support for assistive technology should be considered when AI generates customer-facing content.',
    ],
  },
  {
    num: 6,
    title: 'Secure',
    Icon: Shield,
    paragraphs: [
      'Encrypted in transit and at rest. Access is logged. Vendors are vetted before adoption and reviewed at renewal — including their incident history and where they store data.',
      'Treat AI tools the same way you treat any other system that touches customer data: principle of least privilege, documented offboarding, and tested incident response.',
    ],
  },
  {
    num: 7,
    title: 'Accountable',
    Icon: ClipboardCheck,
    paragraphs: [
      'Every AI workflow has a named owner. Audit trails capture inputs, outputs, and reviewer sign-off where required. Incidents follow a defined process from triage to remediation to lessons learned.',
      'Accountability is the principle that ties the other six together. Without it, the rest are aspirations on a slide.',
    ],
  },
];

const REFERENCES = [
  {
    title: 'Australian Privacy Principles (APP 1–13)',
    body: 'The 13 APPs under the Privacy Act 1988 — collection, use, disclosure, security, access, and correction.',
  },
  {
    title: 'OAIC Privacy Guidance for AI',
    body: 'Office of the Australian Information Commissioner guidance on privacy obligations when developing or using AI.',
  },
  {
    title: 'Australia’s AI Ethics Principles',
    body: 'The eight voluntary principles published by the Department of Industry, Science and Resources.',
  },
  {
    title: 'ISO/IEC 42001 — AI management system',
    body: 'International standard for governing AI systems through their lifecycle, useful as a maturity benchmark.',
  },
];

const STEPS = [
  {
    num: 1,
    title: 'Audit current AI use',
    body:
      'List every AI tool in active use, including personal accounts. Capture purpose, owner, data class, and vendor terms.',
  },
  {
    num: 2,
    title: 'Classify risk',
    body:
      'Score each workflow against the 4 dimensions of our risk model — vendor, data, output, compliance.',
  },
  {
    num: 3,
    title: 'Write policies',
    body:
      'Adopt and tailor the 6 policy templates so the rules match your sector, stack, and team.',
  },
  {
    num: 4,
    title: 'Train staff',
    body:
      'Run a short induction and a refresher each year. Tie policy adherence into onboarding and reviews.',
  },
];

const SIBLINGS = [
  { title: 'AI Policy Templates', href: '/governance/policies', Icon: ScrollText },
  { title: 'AI Risk Assessment', href: '/governance/risk-assessment', Icon: ShieldAlert },
];

export default function ResponsibleAIPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Responsible AI Framework for Australian SMEs',
    description:
      'A 7-principle Responsible AI framework adapted from the Australian Privacy Principles, OAIC guidance, and Australia’s AI Ethics Principles — practical for SMEs.',
    inLanguage: 'en-AU',
    author: {
      '@type': 'Organization',
      name: 'LongCare AU',
      url: 'https://longcare.au',
    },
    publisher: {
      '@type': 'Organization',
      name: 'LongCare AU',
      url: 'https://longcare.au',
      logo: {
        '@type': 'ImageObject',
        url: 'https://longcare.au/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://longcare.au/governance/responsible-ai',
    },
    about: PRINCIPLES.map((p) => p.title),
  };

  return (
    <main className="bg-[#F8FAFC] text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-6">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Governance', url: '/governance' },
            { name: 'Responsible AI', url: '/governance/responsible-ai' },
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
              <Scale className="size-3" /> Framework
            </Badge>
            <h1 className="mt-4 font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Responsible AI Framework
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Our 7-principle framework adapted for Australian SMEs — Privacy
              Act-aligned, sector-aware, and small enough to actually use.
            </p>
          </div>
          <div className="hidden lg:block">
            <HeroGovernance className="text-sky-700" width={360} height={280} />
          </div>
        </div>
        <div className="mt-10 bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12 overflow-x-auto">
          <h2 className="font-heading text-xl text-slate-900 text-center mb-6">From principle to practice</h2>
          <div className="flex justify-center">
            <InfographicTimeline width={820} height={180} />
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <h2 className="font-heading text-2xl font-semibold text-slate-900 mb-6">
          The 7 principles
        </h2>
        <div className="space-y-6">
          {PRINCIPLES.map(({ num, title, Icon, paragraphs }) => (
            <article
              key={num}
              className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="size-12 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center flex-shrink-0">
                  <Icon className="size-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-500">
                      Principle {num}
                    </span>
                  </div>
                  <h3
                    className="text-xl font-semibold text-slate-900"
                    dangerouslySetInnerHTML={{ __html: title }}
                  />
                  <div className="mt-3 space-y-3">
                    {paragraphs.map((p, i) => (
                      <p
                        key={i}
                        className="text-sm sm:text-base text-slate-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: p }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Reference frameworks */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="size-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <BookMarked className="size-5" />
            </div>
            <h2 className="font-heading text-2xl font-semibold text-slate-900">
              Reference frameworks we align to
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {REFERENCES.map((r) => (
              <div
                key={r.title}
                className="rounded-lg border border-slate-200 bg-slate-50 p-4"
              >
                <h3 className="text-sm font-semibold text-slate-900">{r.title}</h3>
                <p className="mt-1 text-sm text-slate-700">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to apply */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="size-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
            <ListChecks className="size-5" />
          </div>
          <h2 className="font-heading text-2xl font-semibold text-slate-900">
            How to apply this framework
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div
              key={s.num}
              className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm"
            >
              <div className="text-xs font-mono text-slate-500">
                Step {s.num}
              </div>
              <h3 className="mt-1 text-base font-semibold text-slate-900">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-slate-700">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm text-center">
          <h2 className="font-heading text-2xl font-semibold text-slate-900">
            Get help applying this
          </h2>
          <p className="mt-2 text-slate-700 max-w-xl mx-auto">
            We run the audit, classify your risks, draft your policies, and
            train your team — typically inside one quarter.
          </p>
          <a
            href="https://book.longcare.au?service=governance-review"
            className="mt-6 inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-full transition"
          >
            Book a discovery call <ArrowRight className="size-4" />
          </a>
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
