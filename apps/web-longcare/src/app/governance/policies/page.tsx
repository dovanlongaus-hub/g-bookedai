import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FileText,
  ArrowRight,
  ScrollText,
  ShieldAlert,
  Scale,
  Sparkles,
  Download,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { HeroGovernance } from '@/components/illustrations/hero-governance';
import { InfographicComparison } from '@/components/illustrations/infographic-comparison';

export const metadata: Metadata = getPageMetadata({
  title: 'AI Policy Templates for SMEs | LongCare AU',
  description:
    'Editable AI policy templates aligned to the Australian Privacy Act. Acceptable use, data handling, vendor assessment, output review, incident response, and AI disclosure.',
  path: '/governance/policies',
});

type Template = {
  slug: string;
  title: string;
  Icon: typeof FileText;
  bullets: string[];
  industry: string;
  industryTone: 'all' | 'sector';
};

const TEMPLATES: Template[] = [
  {
    slug: 'acceptable-use',
    title: 'Acceptable Use Policy',
    Icon: FileText,
    bullets: [
      'Approved tools list (ChatGPT, Gemini, Copilot, Claude) with use cases',
      'Prohibited activities and personal-account boundaries',
      'Reporting line for suspected misuse or breach',
    ],
    industry: 'All industries',
    industryTone: 'all',
  },
  {
    slug: 'data-handling',
    title: 'AI Data Handling Policy',
    Icon: FileText,
    bullets: [
      'Data classes that may or may not enter AI tools (PII, customer data, IP)',
      'Redaction and pseudonymisation rules before prompting',
      'APP 6 (use & disclosure) and APP 11 (security) alignment',
    ],
    industry: 'All industries',
    industryTone: 'all',
  },
  {
    slug: 'vendor-assessment',
    title: 'AI Vendor Assessment Policy',
    Icon: FileText,
    bullets: [
      'Vetting checklist: security, privacy posture, geographic data residency',
      'Terms-of-service review (training on inputs, IP rights, breach notice)',
      'Approval workflow with renewals and offboarding',
    ],
    industry: 'All industries',
    industryTone: 'all',
  },
  {
    slug: 'output-review',
    title: 'AI Output Review Policy',
    Icon: FileText,
    bullets: [
      'When AI output requires human review before publishing or acting',
      'High-stakes decisions: clinical, legal, financial, hiring',
      'Sign-off, retention, and audit trail requirements',
    ],
    industry: 'Healthcare / Legal',
    industryTone: 'sector',
  },
  {
    slug: 'incident-response',
    title: 'AI Incident Response Policy',
    Icon: FileText,
    bullets: [
      'Triage steps when AI tool fails, leaks, or hallucinates materially',
      'Notifiable Data Breaches scheme alignment (OAIC notification)',
      'Post-incident review and policy update cycle',
    ],
    industry: 'All industries',
    industryTone: 'all',
  },
  {
    slug: 'customer-disclosure',
    title: 'Customer-Facing AI Disclosure Policy',
    Icon: FileText,
    bullets: [
      'When to disclose AI use to customers (chatbots, AI-generated content)',
      'Plain-English wording aligned with consumer law and APP 1',
      'Opt-out and human-handover mechanisms',
    ],
    industry: 'Healthcare / Legal',
    industryTone: 'sector',
  },
];

const SIBLINGS = [
  { title: 'AI Risk Assessment', href: '/governance/risk-assessment', Icon: ShieldAlert },
  { title: 'Responsible AI Framework', href: '/governance/responsible-ai', Icon: Scale },
];

export default function GovernancePoliciesPage() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'AI Policy Templates for Australian SMEs',
    numberOfItems: TEMPLATES.length,
    itemListElement: TEMPLATES.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'CreativeWork',
        name: t.title,
        about: t.bullets.join(' '),
        url: `https://longcare.au/governance/policies#${t.slug}`,
        inLanguage: 'en-AU',
        publisher: {
          '@type': 'Organization',
          name: 'LongCare AU',
          url: 'https://longcare.au',
        },
      },
    })),
  };

  return (
    <main className="bg-[#F8FAFC] text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-6">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Governance', url: '/governance' },
            { name: 'Policy Templates', url: '/governance/policies' },
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
              <ScrollText className="size-3" /> Policy library
            </Badge>
            <h1 className="mt-4 font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              AI Policy Templates
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Editable templates aligned to the Australian Privacy Act. Free for
              paying customers — fork, edit, and ship.
            </p>
          </div>
          <div className="hidden lg:block">
            <HeroGovernance className="text-sky-700" width={360} height={280} />
          </div>
        </div>
        <div className="mt-10 bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12 overflow-x-auto">
          <h2 className="font-heading text-xl text-slate-900 text-center mb-6">Without policy vs with policy</h2>
          <div className="flex justify-center">
            <InfographicComparison width={760} height={260} />
          </div>
        </div>
      </section>

      {/* Templates grid */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <div className="grid gap-6 md:grid-cols-2">
          {TEMPLATES.map((t) => (
            <article
              id={t.slug}
              key={t.slug}
              className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="size-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
                  <t.Icon className="size-5" />
                </div>
                <Badge
                  variant="outline"
                  className={
                    t.industryTone === 'sector'
                      ? 'border-amber-200 bg-amber-50 text-amber-700'
                      : 'border-emerald-200 bg-emerald-50 text-emerald-700'
                  }
                >
                  Industry: {t.industry}
                </Badge>
              </div>
              <h2 className="text-lg font-semibold text-slate-900">{t.title}</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-700 flex-1">
                {t.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-1.5 size-1.5 rounded-full bg-sky-600 flex-shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/contact?topic=policy-template&template=${t.slug}`}
                className="mt-5 inline-flex items-center gap-2 self-start bg-sky-700 hover:bg-sky-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition"
              >
                <Download className="size-4" /> Download template
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Custom CTA */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm text-center">
          <Sparkles className="size-8 text-sky-700 mx-auto" />
          <h2 className="mt-3 font-heading text-2xl font-semibold text-slate-900">
            Need custom policies?
          </h2>
          <p className="mt-2 text-slate-700 max-w-xl mx-auto">
            We tailor each template to your sector, technology stack, and
            existing ISMS — typically delivered within 10 business days.
          </p>
          <a
            href="https://book.longcare.au?service=governance-review"
            className="mt-6 inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-full transition"
          >
            Book a governance review <ArrowRight className="size-4" />
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
