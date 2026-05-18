import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Clock,
  GraduationCap,
  Play,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { HeroSolutions } from '@/components/illustrations/hero-solutions';
import { InfographicComparison } from '@/components/illustrations/infographic-comparison';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'AI Vendor Selection — AI for Business Lesson 10 | LongCare Academy',
  description:
    'Seven-criteria framework for picking AI vendors as an AU SME — data residency, contract terms, exit clauses, audit access, pricing transparency, support, integration. Red/green flags, comparison example and procurement checklist.',
  path: '/academy/ai-for-business/lessons/ai-vendor-selection',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'AI Vendor Selection — Cut Through the Hype',
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

export default function AIVendorSelectionLessonPage() {
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
            { name: 'AI Vendor Selection', url: '/academy/ai-for-business/lessons/ai-vendor-selection' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Building2 className="size-3" /> Lesson 10 of 10
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 25 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              AI vendor selection — cut through the hype
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Seven criteria, red flags, green flags, a real comparison and the
              build-vs-buy decision tree — the SME procurement playbook for AI in 2026.
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
                href="/academy/ai-for-business"
                className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
              >
                <ArrowLeft className="size-4" /> Back to path
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroSolutions className="text-sky-700" width={420} height={320} />
          </div>
        </div>
      </section>

      {/* Inline comparison */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            Vendor scorecard at a glance
          </h3>
          <div className="flex justify-center">
            <InfographicComparison width={720} height={260} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Same seven criteria, three vendors, one decision. Score is the conversation, not the
            answer.
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
              Walks through the seven criteria using a real AU SME scenario. Transcript covers
              everything below.
            </span>
          </div>
        </div>
      </section>

      {/* Transcript */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The seven-criteria framework</h3>
          <p className="mt-2 text-slate-700">
            Every AI vendor will tell you they are best-in-class, secure, AU-friendly, and
            affordable. Cut through it with the same seven questions every time.
          </p>
          <ol className="mt-2 list-decimal pl-6 text-slate-700">
            <li><strong>AU data residency.</strong> Where physically does the data sit at rest, in transit, and during inference? If a vendor cannot point to a region (Sydney, Melbourne, or a contractual EU/US disclosure), assume the worst case for cross-border under APP 8.</li>
            <li><strong>Contract terms.</strong> Read the master agreement. Look for &quot;we do not train on your data&quot; in writing, term and notice periods, liability cap, and which jurisdiction governs disputes (NSW/VIC is better than Delaware for an AU buyer).</li>
            <li><strong>Exit clause.</strong> Can you get your data out in a standard format on 30-day notice with no extra fees? &quot;Yes, contact support&quot; is not an exit clause. &quot;Yes, via the documented Export API endpoint&quot; is.</li>
            <li><strong>Audit access.</strong> Can you (or your auditor) review their SOC 2 Type II, ISO 27001, or IRAP report on request? Can you get an attestation letter for your OAIC documentation?</li>
            <li><strong>Pricing transparency.</strong> Is the price published on the website with AUD/GST? Are token, seat, and usage tiers clear? Hidden enterprise pricing usually means you will be quoted whatever they think you can pay.</li>
            <li><strong>Support quality.</strong> AU business hours coverage? Named CSM at your tier? Average first-response time published? A real human you can phone before the contract is signed?</li>
            <li><strong>Integration depth.</strong> Native Xero, MYOB, HubSpot, Outlook, Workspace integrations? A documented REST API or OpenAPI spec? Zapier/Make/n8n connectors that already exist? Buying a vendor that needs custom integration adds 30% to total cost.</li>
          </ol>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Red flags</h3>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>&quot;AI-powered&quot; marketing without specifics.</strong> Which model? Which use case? What is the SLA on quality? If they cannot answer, it is a wrapper around someone else&apos;s API at 5x markup.</li>
            <li><strong>Opaque pricing</strong> — &quot;contact sales for a quote&quot; on every tier means SME-hostile.</li>
            <li><strong>Lock-in language</strong> — auto-renewal with 90-day notice windows, data ownership clauses that grant the vendor a perpetual licence, exit fees, or proprietary data formats.</li>
            <li><strong>No SLA</strong> — uptime, latency, or support response time. If they will not commit to numbers, they will not deliver them either.</li>
            <li><strong>Pressure tactics</strong> — &quot;pricing goes up next week&quot;, &quot;limited beta access&quot;, urgency without substance. Walk away.</li>
            <li><strong>Vague compliance answers</strong> — &quot;we are working towards SOC 2&quot; means they don&apos;t have it. Find a vendor that does.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Green flags</h3>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Clear, plain-English privacy policy</strong> linked from the homepage footer.</li>
            <li><strong>AU support hours</strong> 9am–5pm AEST published on the contact page, plus a real phone number.</li>
            <li><strong>Named contacts</strong> — named CSM, named technical contact, named billing contact.</li>
            <li><strong>OpenAPI spec</strong> on the developer docs page (signals engineering maturity).</li>
            <li><strong>Public status page</strong> with at least 90 days of historical uptime data.</li>
            <li><strong>Status of trust certifications visible</strong> on a /trust or /security page.</li>
            <li><strong>References to AU customers</strong> in case studies or logos — not just US ones.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Sample vendor comparison: chat AI for SMEs</h3>
          <p className="mt-2 text-slate-700">
            Imagine you are choosing one paid chat AI for a 24-person Sydney SaaS company. Same
            seven criteria.
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>ChatGPT Team (OpenAI).</strong> Residency: US-hosted (no AU region). Contract: standard Team agreement with do-not-train clause. Exit: data export available. Audit: SOC 2 Type II, ISO 27001, no IRAP. Pricing: ~AUD $45/seat/month, published. Support: 24/5 email, no AU phone. Integration: ~3,000 Zapier/Make connectors, OpenAPI spec.</li>
            <li><strong>Gemini for Workspace (Google).</strong> Residency: choose data region including Sydney (asia-southeast2). Contract: Workspace MSA, do-not-train default. Exit: Takeout export. Audit: SOC 2, ISO 27001, IRAP-protected for some workloads. Pricing: ~AUD $33/seat/month, published. Support: phone + email AU hours via Workspace channel. Integration: native Gmail, Docs, Drive, Sheets, Calendar.</li>
            <li><strong>Claude Team (Anthropic).</strong> Residency: US/EU options, no AU region as of 2026. Contract: Team agreement, do-not-train default. Exit: documented export. Audit: SOC 2 Type II, ISO 42001. Pricing: ~AUD $45/seat/month, published. Support: email, no AU phone. Integration: API, ~500 connectors via Zapier.</li>
          </ul>
          <p className="mt-2 text-slate-700">
            For an AU SME with no special data sensitivity, Gemini for Workspace wins on
            residency, integration depth, and AU support. For an SME that lives in Slack/Notion,
            Claude wins on writing quality. For an SME with developers building custom workflows,
            ChatGPT wins on connector breadth. The right answer is &quot;the criteria that matter
            most for your use case&quot;, not &quot;the best vendor&quot;.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Procurement checklist</h3>
          <ol className="mt-2 list-decimal pl-6 text-slate-700">
            <li><strong>Privacy Act review</strong> — does the vendor process personal information? If yes, document APP 1, 6, 8, 11 posture.</li>
            <li><strong>Security review</strong> — request SOC 2 or ISO 27001 attestation. If high-sensitivity, request IRAP.</li>
            <li><strong>Integration POC</strong> — connect a non-production version to two of your existing tools. Confirm field-level support.</li>
            <li><strong>Pilot scope</strong> — pick 1 team, 1 use case, 1 metric. Run for 6 weeks before rollout.</li>
            <li><strong>Legal review</strong> — MSA + DPA + your standard amendments (governing law, liability cap, term).</li>
            <li><strong>Reference call</strong> — speak to two existing customers, one in your industry and one in your size range.</li>
            <li><strong>Internal sign-off</strong> — CEO, CFO, COO (or owner if smaller). Document the decision rationale.</li>
          </ol>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Build vs buy decision tree</h3>
          <p className="mt-2 text-slate-700">
            <strong>Buy</strong> if: the use case is generic (chat, transcription, design), the
            volume is &lt;10,000 events/month, the team has no in-house ML talent, or the data is
            not your competitive moat. <strong>Buy with light customisation</strong> if: you need a
            workflow but the underlying capability is generic — use Zapier/Make on top of a generic
            vendor. <strong>Build</strong> only if: the workflow is core to your product
            differentiation, the volume justifies amortising engineering cost, and you have at
            least one ML/data engineer on staff. For 95% of AU SMEs in 2026, the answer is buy or
            buy-with-light-customisation.
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Seven criteria: residency, contract, exit, audit, pricing transparency, support, integration. Use them every time.',
              'Red flags: vague AI claims, opaque pricing, lock-in clauses, no SLA, pressure tactics, vague compliance answers.',
              'Green flags: published privacy policy, AU support hours, named contacts, OpenAPI spec, public status page.',
              'No single best chat AI vendor for AU SMEs — the right pick depends on which criteria weigh most for your stack.',
              'Always pilot with one team, one use case, one metric for six weeks before scaling.',
              'For 95% of AU SMEs the answer is buy or buy-with-light-customisation — only build when AI is core to your product moat.',
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
            <p className="font-semibold text-slate-900">Exercise: score three vendors</p>
            <ol className="mt-3 list-decimal pl-6 space-y-1">
              <li>Pick the AI use case you most need to solve in the next quarter.</li>
              <li>List three candidate vendors (or use the chat-AI three from the transcript).</li>
              <li>Build a 7-criteria scorecard in a spreadsheet — score each vendor 1–5 per row.</li>
              <li>Weight the criteria — which two matter most for your situation? Double their weight.</li>
              <li>Total the weighted score. The highest score is your top candidate.</li>
              <li>Now do a reference call with one customer of that vendor before committing.</li>
            </ol>
            <p className="mt-3">
              The scorecard is the artefact your CFO will want to see. Keep it. Re-run annually.
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
                1. Which is a red flag in AI vendor selection?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Published pricing with AUD/GST</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> &quot;Contact sales for a quote&quot; on every tier</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Public status page</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Opaque pricing on every tier. SME-hostile by design.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. What does a real exit clause look like?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> &quot;Yes, contact support&quot;</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> &quot;Yes, via the documented Export API, standard format, 30-day notice, no extra fees&quot;</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> No exit clause is needed</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Documented export with standard format, notice, and no fees. The second option.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. For what fraction of AU SMEs in 2026 is &quot;build&quot; the right answer?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Most of them</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> About 5% — only when AI is core to product differentiation</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> None</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">About 5%. The rest should buy or buy-with-light-customisation.</p>
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
              You finished AI for Business &mdash; advanced bootcamps coming Q4 2026
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Capstone projects, certificates and a live AU cohort land later this year. Jump into
              AI Productivity or AI Automation next.
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
