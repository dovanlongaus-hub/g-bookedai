import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  GraduationCap,
  Play,
  Workflow,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { HeroAgents } from '@/components/illustrations/hero-agents';
import { FlowAutomation } from '@/components/illustrations/flow-automation';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'AU SME AI Automation Case Studies — AI Automation Lesson 10 | LongCare Academy',
  description:
    'Five real anonymised AU SME automation case studies — Melbourne logistics, Sydney hospitality, Brisbane SaaS, Bendigo medical, Adelaide trades — architecture, results, common patterns, anti-patterns and where to start.',
  path: '/academy/ai-automation/lessons/ai-automation-case-studies-au',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'AU SME AI Automation Case Studies — 5 Real Examples',
  educationalLevel: 'Advanced',
  learningResourceType: 'Lesson',
  timeRequired: 'PT30M',
  inLanguage: 'en-AU',
  isPartOf: {
    '@type': 'Course',
    name: 'AI Automation',
    url: 'https://longcare.au/academy/ai-automation',
  },
  provider: {
    '@type': 'Organization',
    name: 'LongCare AU',
    sameAs: 'https://longcare.au',
  },
};

export default function CaseStudiesLessonPage() {
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
            { name: 'AI Automation', url: '/academy/ai-automation' },
            { name: 'AU Case Studies', url: '/academy/ai-automation/lessons/ai-automation-case-studies-au' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Workflow className="size-3" /> Lesson 10 of 10
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 30 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              AU SME AI automation case studies — five real examples
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Logistics, hospitality, SaaS, medical, trades — five anonymised AU SME
              automation builds with architecture, results, common patterns and the three
              anti-patterns we learned from.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#"
                aria-disabled="true"
                tabIndex={-1}
                className="inline-flex items-center gap-2 bg-slate-300 text-slate-500 font-medium px-5 py-2.5 rounded-lg pointer-events-none cursor-not-allowed select-none"
              >
                Mark complete &mdash; coming soon
              </a>
              <Link
                href="/academy/ai-automation"
                className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
              >
                <ArrowLeft className="size-4" /> Back to path
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroAgents className="text-sky-700" width={420} height={320} />
          </div>
        </div>
      </section>

      {/* Inline flow */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            Five workflows, one shape
          </h3>
          <div className="flex justify-center">
            <FlowAutomation
              width={760}
              height={180}
              steps={['Trigger', 'AI extract', 'AI decide', 'System update', 'Human review']}
            />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Different industries, same architecture. Read the patterns, not the
            tech stacks.
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
            <span className="text-sm">Video coming Q3 2026 · 30 min</span>
            <span className="mt-2 text-xs text-white/60 max-w-md text-center">
              Walks through all five case studies with architecture diagrams. Transcript
              covers everything below.
            </span>
          </div>
        </div>
      </section>

      {/* Transcript */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Case 1 — Melbourne logistics, invoice extraction (Cygnus)</h3>
          <p className="mt-2 text-slate-700">
            <strong>Profile:</strong> 32-person freight forwarder in West Melbourne, processing
            ~600 supplier invoices/month, previously manual data entry into MYOB.
            <strong> Workflow:</strong> Outlook inbox &rarr; Make scenario triggers on attachment
            &rarr; Claude reads PDF, extracts invoice number, amount, GST, line items into JSON
            &rarr; pushes to MYOB API &rarr; flags any extraction with confidence &lt; 95% for human
            review.
            <strong> Tools:</strong> Make, Claude Sonnet, MYOB AccountRight API, Helicone for
            monitoring.
            <strong> Results:</strong> Invoice processing time per invoice dropped from 4 minutes
            to 25 seconds. Error rate (after human review queue) is below the previous manual
            baseline. ROI in 7 weeks.
            <strong> Lessons:</strong> The 95% confidence threshold matters — too high and humans
            review everything, too low and errors leak through. Start at 90%, tune monthly.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Case 2 — Sydney café group, multi-lingual menu (Surry Hills)</h3>
          <p className="mt-2 text-slate-700">
            <strong>Profile:</strong> Five-café chain in Surry Hills serving tourist customers in
            Mandarin, Cantonese, Japanese, Korean, and English. Menus updated weekly with
            specials.
            <strong> Workflow:</strong> Google Sheets specials sheet (single source of truth) &rarr;
            Zapier on edit &rarr; Gemini translates into 5 languages with allergen flags preserved
            &rarr; pushes to Canva for poster generation &rarr; pushes translated text into the
            website CMS &rarr; emails the manager for sign-off.
            <strong> Tools:</strong> Zapier, Gemini Pro, Canva API, WordPress REST API, Slack
            notification.
            <strong> Results:</strong> Menu update time across 5 languages dropped from 4 hours to
            12 minutes. Allergen errors caught at the AI step (which was strict about preserving
            wording) — zero customer-reported allergen incidents in the 9 months since launch.
            <strong> Lessons:</strong> Domain-specific safety prompts (&quot;NEVER alter allergen
            wording&quot;) are non-negotiable. The human sign-off gate is what makes it safe.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Case 3 — Brisbane SaaS, customer support (TechFlow)</h3>
          <p className="mt-2 text-slate-700">
            <strong>Profile:</strong> 18-person B2B SaaS in Fortitude Valley, 1,200 support
            tickets/month, 2-hour SLA on responses.
            <strong> Workflow:</strong> Intercom inbox &rarr; n8n trigger on new ticket &rarr;
            embed customer question &rarr; pgvector lookup against 600 help articles in
            Cloud SQL Sydney &rarr; Claude drafts response using top 5 articles, with citations
            &rarr; pushes draft to agent for review/send.
            <strong> Tools:</strong> n8n self-hosted on GCP Sydney, pgvector, OpenAI embeddings,
            Claude Sonnet, Langfuse for chain observability.
            <strong> Results:</strong> Average response time dropped from 92 minutes to 24
            minutes. Agent throughput up 3.4x. SLA compliance up from 82% to 99%. AUD cost per
            ticket ~$0.04.
            <strong> Lessons:</strong> Citations let agents trust-but-verify in seconds. The
            single biggest quality improvement came from chunking the docs at 500 tokens with
            100-token overlap, not from a more expensive model.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Case 4 — Bendigo medical practice, Medicare claims</h3>
          <p className="mt-2 text-slate-700">
            <strong>Profile:</strong> 6-doctor regional medical practice in Bendigo, processing
            ~1,400 Medicare claims/month, plus chronic disease management plan paperwork.
            <strong> Workflow:</strong> Practice management system (Best Practice) export &rarr;
            scheduled hourly Make scenario &rarr; AI assists with item number lookup and bulk
            bill eligibility check &rarr; flags non-standard combinations for human review &rarr;
            submits via PRODA gateway. Privacy posture: all processing runs in AU region, no PII
            sent to overseas APIs.
            <strong> Tools:</strong> Make on AU region, AU-hosted self-deployed embedding model,
            Vertex AI Sydney for classification, PRODA SOAP API.
            <strong> Results:</strong> Claim rejection rate halved (was 6%, now 2.8%). Admin
            staff time freed: 15 hours/week. The freed time was reinvested in patient outreach,
            not staff reductions.
            <strong> Lessons:</strong> AU data residency was non-negotiable from the start —
            choosing the AU-hosted toolchain added 20% to cost but unlocked the build entirely.
            Privacy posture documented to OAIC standard before go-live.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Case 5 — Adelaide tradesperson, quote from photo</h3>
          <p className="mt-2 text-slate-700">
            <strong>Profile:</strong> Solo electrician in Adelaide doing residential service calls,
            quoting 30-40 jobs/week, average quote prep was 45 minutes.
            <strong> Workflow:</strong> Customer SMS with photo via Twilio &rarr; webhook to a tiny
            Cloud Run service &rarr; GPT-4o vision analyses photo, identifies scope (powerpoints,
            switchboard upgrade, lighting), estimates materials and labour from a YAML price book
            &rarr; drafts quote PDF &rarr; SMS back to customer with quote and a calendar link to
            book.
            <strong> Tools:</strong> Twilio AU, Cloud Run Sydney, OpenAI GPT-4o vision, PDFKit,
            Cal.com.
            <strong> Results:</strong> Quote turnaround from 6 hours to 8 minutes. Quote-to-book
            conversion up from 22% to 41% — speed converts. AUD ~$0.12 per quote vs ~$30 of
            previously self-attributed labour cost.
            <strong> Lessons:</strong> The price book YAML is the source of truth; AI never invents
            prices. Vision models are remarkably good at residential electrical scope; require a
            human safety check before any quote exceeds $5,000.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Common patterns across all five</h3>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>AI extracts, humans approve.</strong> Every case keeps a human approval gate before money or compliance leaves the building.</li>
            <li><strong>Single source of truth (Sheets, YAML, DB).</strong> Prices, allergens, item numbers — AI never invents these; it looks them up.</li>
            <li><strong>Confidence thresholds.</strong> Each workflow flags low-confidence outputs to humans. The threshold is tuned monthly, not set-and-forget.</li>
            <li><strong>AU data residency where compliance matters.</strong> Medical and any high-PII workflow stays in AU-hosted services. Marketing and translation are happy to be cross-border.</li>
            <li><strong>Observability from day one.</strong> Every case had Helicone, Langfuse, Datadog or Make logs in place before go-live, not retrofitted.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Three anti-patterns to avoid</h3>
          <ol className="mt-2 list-decimal pl-6 text-slate-700">
            <li><strong>No human in the loop on high-value decisions.</strong> Two early projects (not above) skipped human approval on quotes and refunds. Both produced public incidents within weeks. Never auto-execute over a threshold you would not delegate to a new intern.</li>
            <li><strong>Inventing the data instead of looking it up.</strong> Without a source of truth, AI will gladly hallucinate prices, item numbers, dosages. The price book or product DB must be the source AI consults, not its own training.</li>
            <li><strong>No monitoring at launch.</strong> Two early builds shipped with no observability and were caught by customers, not by us. Every case study above had monitoring live before go-live.</li>
          </ol>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Where to start your own automation</h3>
          <p className="mt-2 text-slate-700">
            Pick the most repetitive, structured, high-volume task in your business — invoice
            entry, support ticket triage, quote prep, scheduling. Apply the common pattern: AI
            extracts and proposes, source-of-truth provides the facts, human approves the
            high-value moves, monitoring catches failures. Start with one workflow, prove
            value in six weeks, then expand. The five businesses above all started with one
            workflow and did not add the second until the first was steady.
          </p>
          <p className="mt-2 text-slate-700">
            For deeper teardowns of each case, visit our <Link href="/case-studies" className="text-sky-700 hover:underline">case studies hub</Link>
            — each one has the architecture diagram, the prompts, the costs, and the contact
            details of the operator who built it.
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Five real AU SME builds: logistics, hospitality, SaaS, medical, trades — all use the same AI-extracts-humans-approve shape.',
              'Every case has a single source of truth (Sheets, YAML, DB) — AI never invents the facts, it looks them up.',
              'Confidence thresholds and human approval gates are non-negotiable on money, compliance, and safety decisions.',
              'AU data residency is required for medical and high-PII — adds ~20% cost, unlocks the build entirely.',
              'Three anti-patterns: no human in loop, no source of truth, no monitoring at launch.',
              'Start with one workflow, prove value in six weeks, then expand. Do not start with two.',
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
          <p className="text-sm text-slate-600 mb-4">One short hands-on exercise. Total time: 30 minutes.</p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Exercise: pick your case study, sketch your architecture</p>
            <ol className="mt-3 list-decimal pl-6 space-y-1">
              <li>Which of the five case studies is closest to your business? (Invoice extraction, multi-lingual content, support deflection, claim processing, photo-to-quote.)</li>
              <li>On paper, draw your version of the workflow — trigger, AI extract, AI decide, system update, human review.</li>
              <li>Name the single source of truth (where will AI look up facts?).</li>
              <li>Name the confidence threshold and the human approval gate.</li>
              <li>Name your AU residency requirement (full AU, AU for sensitive only, none).</li>
              <li>Name the observability tool you will use from day one.</li>
              <li>Estimate value: how many hours/week or AUD/month saved by month 3?</li>
            </ol>
            <p className="mt-3">
              That one-page sketch is your project brief. If the answers feel obvious, you are
              ready to build. If they feel hand-wavy, talk to one of the case-study operators
              first.
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
                1. What do all five case studies have in common?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> They all use the same AI model</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> AI extracts, source-of-truth provides facts, human approves high-value moves, monitoring is live from day one</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> They all started with two workflows in parallel</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">The four-part shape. Different industries, same architecture.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. Why is a single source of truth (Sheets, YAML, DB) required?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> So AI does not invent prices, item numbers, or dosages</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> It is a vendor requirement</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> It saves tokens</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">So AI does not invent facts. The source must be consulted, not the training data.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. Which anti-pattern caused public incidents in two early builds?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Over-monitoring</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> No human in the loop on high-value decisions</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Using AU-hosted services</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">No human in the loop. Never auto-execute over a threshold you would not delegate to a new intern.</p>
              </details>
            </fieldset>
          </div>
        </div>
      </section>

      {/* Next lesson preview (last lesson — coming soon) */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Continue path</p>
            <h3 className="text-lg font-semibold text-slate-900 mt-1">
              You finished AI Automation &mdash; advanced bootcamps coming Q4 2026
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Capstone projects, certificates and a live AU cohort land later this year. Visit the
              case studies hub for deeper architecture teardowns.
            </p>
          </div>
          <a
            href="#"
            aria-disabled="true"
            tabIndex={-1}
            className="inline-flex items-center gap-2 bg-slate-300 text-slate-500 font-medium px-5 py-2.5 rounded-lg pointer-events-none cursor-not-allowed select-none"
          >
            Continue path &mdash; coming soon
          </a>
        </div>
      </section>

      {/* Footer nav */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-20">
        <div className="flex flex-wrap gap-3">
          <Link
            href="/academy/ai-automation"
            className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
          >
            <ArrowLeft className="size-4" /> Back to AI Automation
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
