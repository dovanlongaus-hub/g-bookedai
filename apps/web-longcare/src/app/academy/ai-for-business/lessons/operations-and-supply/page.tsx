import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock,
  GraduationCap,
  Play,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { HeroTrades } from '@/components/illustrations/hero-trades';
import { FlowFiveStep } from '@/components/illustrations/flow-five-step';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'Operations & Supply Chain AI for SMEs | AI for Business Lesson 6 | LongCare Academy',
  description:
    'Five operations AI use cases for AU SMEs — inventory forecasting, supplier comms, logistics emails, capacity planning, and document processing. Includes ROI math and BAS-aware risk notes.',
  path: '/academy/ai-for-business/lessons/operations-and-supply',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Operations & Supply Chain AI for SMEs',
  educationalLevel: 'SME owners',
  learningResourceType: 'Lesson',
  timeRequired: 'PT25M',
  inLanguage: 'en-AU',
  isPartOf: {
    '@type': 'Course',
    name: 'AI for Business',
    url: 'https://longcare.au/academy/ai-for-business',
  },
  provider: {
    '@type': 'Organization',
    name: 'LongCare AU',
    sameAs: 'https://longcare.au',
  },
};

export default function OperationsAndSupplyLessonPage() {
  return (
    <main className="bg-[#F8FAFC] text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lessonSchema) }}
      />

      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-6">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Academy', url: '/academy' },
            { name: 'AI for Business', url: '/academy/ai-for-business' },
            { name: 'Operations & Supply', url: '/academy/ai-for-business/lessons/operations-and-supply' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Building2 className="size-3" /> Lesson 6 of 10
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 25 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Operations &amp; supply chain AI for SMEs
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Five high-leverage operations use cases &mdash; the ones that pay for the AI
              subscription in week one and free a day a week by month three. AU-specific risk
              notes throughout.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
              >
                Mark complete &amp; next <ArrowRight className="size-4" />
              </a>
              <Link
                href="/academy/ai-for-business"
                className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
              >
                <ArrowLeft className="size-4" /> Back to path
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroTrades className="text-sky-700" width={420} height={320} />
          </div>
        </div>
      </section>

      {/* Inline flow */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            The ops document loop: receive &rarr; classify &rarr; AI extract &rarr; verify &rarr; action
          </h3>
          <div className="flex justify-center">
            <FlowFiveStep width={720} height={180} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Every operations workflow is a variation of this loop. Once you build it once, you can
            apply it across supplier emails, invoices, delivery notes, and contracts.
          </p>
        </div>
      </section>

      {/* Video placeholder */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div
          role="img"
          aria-label="Video lesson placeholder"
          className="relative aspect-video bg-gradient-to-br from-slate-900 to-slate-700 rounded-2xl overflow-hidden flex items-center justify-center"
        >
          <div className="absolute inset-0 opacity-20">
            <DotsPattern />
          </div>
          <div className="relative flex flex-col items-center text-white">
            <div className="size-20 rounded-full bg-white/10 backdrop-blur flex items-center justify-center mb-3">
              <Play className="size-8 ml-1" aria-hidden />
            </div>
            <span className="text-sm">Video coming Q3 2026 · 25 min</span>
            <span className="mt-2 text-xs text-white/60 max-w-md text-center">
              Walk-through screencast in production. The transcript below covers every workflow.
            </span>
          </div>
        </div>
      </section>

      {/* Transcript */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Why operations is where AI quietly wins</h3>
          <p className="mt-2 text-slate-700">
            Marketing AI gets the headlines. Operations AI pays the bills. Most Australian SMEs
            burn 8&ndash;12 hours a week on repetitive admin: entering supplier invoices, replying
            to delivery enquiries, reconciling Xero, drafting quotes. AI doesn&rsquo;t replace any
            of these &mdash; but it can carve 70% off each task. Multiply by 50 weeks and you
            recover roughly the equivalent of one full-time admin hire, without payroll.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Use case 1 — Inventory forecasting</h3>
          <p className="mt-2 text-slate-700">
            Export 24 months of sales data from Shopify, MYOB, Xero, or your POS. Paste into
            ChatGPT or Gemini with this prompt: <em>&ldquo;Here is 24 months of sales data for SKU
            list X. Forecast monthly demand for the next 6 months, accounting for seasonality
            and any trends you can identify. Highlight the three SKUs with the highest forecast
            uncertainty.&rdquo;</em> You will get a baseline forecast in two minutes that beats
            most spreadsheet linear regressions. Validate against actuals at month-end and
            iterate.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Use case 2 — Supplier communications</h3>
          <p className="mt-2 text-slate-700">
            Build a custom GPT (ChatGPT Team), Gem (Gemini), or Project (Claude) trained on your
            standard supplier templates: PO confirmations, delay enquiries, dispute letters, and
            thank-you notes. Drop in the situation, get a draft in your house style. AU-specific
            note: include freight terms (CIF, FOB) and Incoterms 2020 references when dealing with
            international suppliers, and Australian Consumer Law warranty language for domestic.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Use case 3 — Logistics emails</h3>
          <p className="mt-2 text-slate-700">
            Customer emails &ldquo;where is my order?&rdquo; pile up daily. AI can triage these in
            two phases: (1) identify the order from the email, (2) draft a status reply pulling
            from your shipping provider&rsquo;s tracking. Australia Post, StarTrack, Sendle, and
            CouriersPlease all expose tracking APIs that integrate with Zapier or Make. The
            AI&rsquo;s job is to translate &ldquo;In transit, expected Wed&rdquo; into your brand
            voice. A 15-minute build saves 20 emails of manual reply per week.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Use case 4 — Capacity planning</h3>
          <p className="mt-2 text-slate-700">
            Service businesses (clinics, trades, consulting) live and die on capacity. Paste your
            booking data and team availability into Claude with: <em>&ldquo;We are at 85% capacity
            for August. Identify the three days with the highest unfilled potential and suggest
            promotional plays for each.&rdquo;</em> Pair with your bookings system to get a
            two-week look-ahead each Monday morning.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Use case 5 — Document processing</h3>
          <p className="mt-2 text-slate-700">
            Supplier invoices arrive as PDFs. AI extracts line items, GST, totals, and supplier
            ABN. Tools like Hubdoc (free with Xero), Dext (about <strong>AUD&nbsp;$30/month</strong>),
            and ChatGPT&rsquo;s file-upload feature all do this. The trick: always have a human
            review GST treatment before posting to Xero. Misclassifying GST is one of the
            top-three audit findings the ATO raises with SMEs.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Australian specifics — BAS, GST, freight</h3>
          <p className="mt-2 text-slate-700">
            <strong>BAS prep.</strong> Quarterly Business Activity Statements are a 4-hour task
            for most SMEs. AI can pre-flight by reading your Xero P&amp;L and flagging unusual
            account movements, missing GST codes, and Wages and Super reconciliation gaps. The
            BAS itself must still be reviewed and lodged by you or your registered BAS agent
            &mdash; AI cannot lodge.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>GST.</strong> AI is good at recognising GST-inclusive vs GST-exclusive
            language but will occasionally miscategorise. Always verify totals against the supplier
            invoice. The 10% GST rate is fixed; AI sometimes hallucinates 9.5% or 10.1% &mdash;
            sanity check.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Freight and logistics.</strong> Australian carriers have unique service
            classifications (StarTrack Premium, Sendle Pro, Couriers Please Express). When
            drafting customer-facing comms, give the AI a glossary so it doesn&rsquo;t
            mistranslate &ldquo;Premium&rdquo; into &ldquo;express&rdquo; (which is a different
            tier).
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Privacy of supplier contracts</h3>
          <p className="mt-2 text-slate-700">
            Supplier pricing, exclusivity terms, and rebate agreements are commercially sensitive
            and often confidential. Use only Team or Enterprise tiers (ChatGPT Team, Claude Team,
            Gemini Workspace) when pasting contract content. Free tiers train on your data &mdash;
            do not paste competitor pricing into a free account.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Implementation order &mdash; start small</h3>
          <p className="mt-2 text-slate-700">
            Pick <em>one</em> supplier email automation. Get it bulletproof in two weeks &mdash;
            that means measuring quality, fixing edge cases, training a backup human reviewer.
            Only then move to the second use case. SMEs that try to deploy five at once usually
            abandon all of them by week six.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">ROI math &mdash; the conservative view</h3>
          <p className="mt-2 text-slate-700">
            Average AU office wage in 2026: about <strong>AUD&nbsp;$38/hour</strong> loaded with
            super and on-costs (~26%). Save 10 admin hours a week = <strong>AUD&nbsp;$1,520
            saved per week</strong>, or <strong>~AUD&nbsp;$6,500/month</strong>. Subtract three
            AI seats at AUD $45 = AUD $135/month. Net saving per month: about
            <strong> AUD&nbsp;$6,365</strong>. Even at half this efficiency, it&rsquo;s the
            highest-ROI software you will buy this year.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Risks &mdash; always human-in-the-loop on financial docs</h3>
          <p className="mt-2 text-slate-700">
            Models will occasionally invent invoice line items, transpose decimal points, or
            mislabel GST. Build in a 100% human review for any document touching finance.
            Operations AI is a force multiplier, not a substitute for the bookkeeper.
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Operations AI saves more time than marketing AI for most SMEs — 8–12 hours/week is realistic.',
              'Five core use cases: inventory forecasting, supplier comms, logistics emails, capacity planning, document processing.',
              'BAS prep can be pre-flighted by AI; lodgement still requires you or a registered BAS agent.',
              'Verify GST totals manually — models occasionally invent rates or transpose decimals.',
              'Use Team/Enterprise tier when contract content is involved; never paste sensitive supplier terms into free tiers.',
              'Start with ONE workflow. Bulletproof it in two weeks before adding the second.',
            ].map((t) => (
              <li key={t} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="size-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Try it yourself */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">Try it yourself</h2>
          <p className="text-sm text-slate-600 mb-4">One short hands-on exercise. Total time: 25 minutes.</p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Exercise: Build a supplier reply assistant</p>
            <p className="mt-2">
              Open ChatGPT (Team or Pro). Create a new Project or Custom GPT. Paste in 5&ndash;10
              of your real supplier emails (with sensitive data redacted). Add a system prompt:
              <em> &ldquo;You are an Australian SME owner&rsquo;s supplier-comms assistant. Draft
              replies in [friendly + professional] AU English. Always confirm Incoterms, freight
              terms, and GST treatment. Never invent prices.&rdquo;</em>
            </p>
            <p className="mt-3">
              Test with three new supplier scenarios (delay, price increase, payment terms).
              Tweak the system prompt until output matches your voice. Save and use for next
              week&rsquo;s real emails &mdash; track time saved.
            </p>
          </div>
        </div>
      </section>

      {/* Quick check quiz */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Quick check</h2>

          <div className="space-y-6">
            <fieldset>
              <legend className="font-medium text-slate-900">
                1. Can AI lodge your BAS?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Yes, fully autonomous</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> No, only you or a registered BAS agent can lodge</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Only on weekends</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Only you or a registered BAS agent. AI can pre-flight and check, but lodgement is regulated.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. What is the right pace for rolling out new ops AI workflows?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Five workflows in one weekend</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> One workflow at a time, bulletproofed in two weeks</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Wait until the AI is &ldquo;perfect&rdquo;</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">One at a time. SMEs that try five at once usually abandon all of them by week six.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. Where should you NEVER paste sensitive supplier pricing?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> ChatGPT Team or Enterprise</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Free-tier ChatGPT or Gemini</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Claude Team</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Free tiers. Their default training-on-data terms are not appropriate for confidential commercial information.</p>
              </details>
            </fieldset>
          </div>
        </div>
      </section>

      {/* Next lesson preview */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Up next · Lesson 7</p>
            <h3 className="text-lg font-semibold text-slate-900 mt-1">
              HR with AI &mdash; job descriptions, screening, onboarding
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Australian Fair Work and anti-discrimination considerations &mdash; coming Q3 2026.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
          >
            Continue <ArrowRight className="size-4" />
          </a>
        </div>
      </section>

      {/* Footer nav */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-20">
        <div className="flex flex-wrap gap-3">
          <Link
            href="/academy/ai-for-business"
            className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
          >
            <ArrowLeft className="size-4" /> Back to AI for Business
          </Link>
          <Link
            href="/academy/lessons"
            className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
          >
            Lesson library
          </Link>
        </div>
      </section>
    </main>
  );
}
