import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
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
  title: 'Automation Basics — Triggers, Actions, AI Steps | LongCare Academy',
  description:
    'How to think about workflow automation when AI is one of the steps. Lesson 1 of the AI Automation path. Free.',
  path: '/academy/ai-automation/lessons/automation-basics',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Automation Basics — Triggers, Actions, AI Steps',
  educationalLevel: 'Advanced',
  learningResourceType: 'Lesson',
  timeRequired: 'PT25M',
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

export default function AutomationBasicsLessonPage() {
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
            { name: 'Automation Basics', url: '/academy/ai-automation/lessons/automation-basics' },
          ]}
        />
      </div>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Workflow className="size-3" /> Lesson 1 of 10
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 25 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Start course free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Automation Basics — Triggers, Actions, AI Steps
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              The mental model, the tool comparison, and the AU-specific compliance corners. By
              the end you’ll have a one-page workflow design ready to build.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#"
                aria-disabled="true"
                tabIndex={-1}
                className="inline-flex items-center gap-2 bg-slate-300 text-slate-500 font-medium px-5 py-2.5 rounded-lg pointer-events-none cursor-not-allowed select-none"
              >
                Coming soon
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

      {/* Automation flow */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            The shape of every AI workflow
          </h3>
          <div className="flex justify-center">
            <FlowAutomation width={720} height={180} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Trigger → AI step → Actions → optional human checkpoint → final action.
          </p>
        </div>
      </section>

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
              The transcript below mirrors the upcoming video, including the cost calculator.
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The mental model</h3>
          <p className="mt-2 text-slate-700">
            Every AI-powered workflow follows the same shape:
          </p>
          <pre className="bg-slate-100 rounded-md p-3 text-xs whitespace-pre-wrap"><code>{`Trigger
  → (optional) AI step — categorise, summarise, extract, draft
    → Action(s) — write to CRM, send Slack, create task
      → (optional) Human review checkpoint
        → Final action — send email, post update, charge card`}</code></pre>
          <p className="mt-2 text-slate-700">
            The <strong>trigger</strong> kicks the workflow off (a form submission, a new
            email, a calendar event, a row added to a sheet). The <strong>AI step</strong> is
            the new ingredient — it interprets unstructured input and turns it into structured
            data or a draft. <strong>Actions</strong> do the actual writing/sending. The
            optional <strong>human checkpoint</strong> is where the final “send” happens for
            anything customer-facing.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">A real example</h3>
          <p className="mt-2 text-slate-700">
            Customer fills in “Contact us” form → AI step categorises (sales, support, partnership,
            spam) → routes to right Slack channel + draft reply suggested in Gmail → human
            reviews and clicks send.
          </p>
          <p className="mt-2 text-slate-700">
            The win isn’t that AI replaces the human. The win is that the human sees only
            already-categorised, pre-drafted messages, and spends seconds where they used to
            spend minutes.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">When the AI step adds value</h3>
          <p className="mt-2 text-slate-700">
            AI is the right step when at least one of these is true:
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li>The input is unstructured (free text, voice, image).</li>
            <li>The input is in multiple languages.</li>
            <li>The decision is fuzzy — “is this lead serious or curious?”</li>
            <li>You want a first-draft reply in the recipient’s language and tone.</li>
          </ul>
          <p className="mt-2 text-slate-700">
            AI is the <em>wrong</em> step when:
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li>The mapping is deterministic — “if status = paid then create invoice” doesn’t need AI.</li>
            <li>The cost of a wrong answer is high and detectability is low.</li>
            <li>The input is already structured (a webhook with clean JSON).</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Tools comparison</h3>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Zapier</strong> — easiest to start, biggest app catalogue, AI nodes built in. Great for non-technical SMEs. Pricing scales fast with task volume.</li>
            <li><strong>Make (formerly Integromat)</strong> — more powerful visual builder, cheaper at volume, branching logic feels natural. Slightly steeper learning curve than Zapier.</li>
            <li><strong>n8n</strong> — open-source. Self-host on a small Australian VM for full data control and very low marginal cost per run. Best for compliance-sensitive workloads.</li>
            <li><strong>Pipedream</strong> — developer-focused. Mix of UI workflow builder + custom Node.js/Python steps when you outgrow drag-and-drop.</li>
          </ul>
          <p className="mt-2 text-slate-700">
            Our SME default: start on Zapier for the first two workflows, move to Make once you
            hit 1,000+ tasks/month, switch to self-hosted n8n if data residency or budget
            becomes critical.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">AU compliance corners</h3>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Data residency.</strong> Most SaaS automation runs in the US. If you handle health, financial, or government-related personal information, prefer Make’s EU regions or self-hosted n8n on an AU VM.</li>
            <li><strong>Vendor list disclosure.</strong> Under APP 1, your privacy policy must list overseas recipients. Each new tool you wire in is potentially one of those — keep your list updated.</li>
            <li><strong>Logs &amp; audit.</strong> Always keep at least 90 days of run logs. The OAIC may ask for them; your incident response plan certainly will.</li>
            <li><strong>Human accountability.</strong> Even with full automation, name the human responsible for each workflow’s outcomes. Automation that nobody owns is automation that nobody fixes.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Cost calculator: 1,000 runs/month with one AI step</h3>
          <p className="mt-2 text-slate-700">
            Sample build: 1,000 customer enquiries/month, each triggers one Gemini Flash call
            (~A$0.001 average) plus a few Zapier tasks.
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li>Zapier — about A$30–50/month plan plus 4 tasks per run × 1,000 = 4,000 tasks. Cost: ~A$50/month.</li>
            <li>AI step (Gemini Flash) — 1,000 × A$0.001 = ~A$1/month.</li>
            <li>Total: ~A$51/month for an automation that saves a human ~10 hours of triage and drafting.</li>
          </ul>
          <p className="mt-2 text-slate-700">
            That’s the ratio that makes AI automation a no-brainer. Just remember: this is the
            happy path. Surprise costs come from runaway triggers and infinite loops, which is
            why we cover monitoring properly later in the path.
          </p>
        </article>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Workflow shape: trigger → AI step → action → optional human check → final action.',
              'Use AI steps for unstructured / multilingual / fuzzy inputs. Skip them for deterministic mappings.',
              'Tools: Zapier (easy) → Make (powerful) → n8n (self-host, AU residency) → Pipedream (developer).',
              'AU compliance: list overseas vendors in your privacy policy and keep 90 days of run logs.',
              'A 1,000-run/month workflow with one AI step typically lands around A$50/month total.',
            ].map((t) => (
              <li key={t} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="size-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">Try it yourself</h2>
          <p className="text-sm text-slate-600 mb-4">Total time: 15 minutes.</p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Exercise: Design one simple workflow on paper</p>
            <ol className="mt-2 list-decimal pl-6 space-y-2">
              <li>Pick the most repetitive job in your week.</li>
              <li>Sketch the workflow in our shape: <code className="text-xs">trigger → AI step? → action(s) → human check? → final action</code>.</li>
              <li>Mark which step is the human checkpoint and why.</li>
              <li>Estimate runs/month and pick a candidate tool from the comparison.</li>
            </ol>
            <p className="mt-3">
              Bring this design to lesson 2 — we’ll build the first version of it together.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Quick check</h2>

          <div className="space-y-6">
            <fieldset>
              <legend className="font-medium text-slate-900">
                1. Where in the workflow does the AI step usually sit?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> After the final action</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Between the trigger and the action(s)</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Replacing the trigger</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Between the trigger and the action(s) — the AI step interprets the trigger so the actions can act on structured output.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. Which scenario is the WRONG fit for an AI step?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Categorising free-text contact form messages</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Mapping “status = paid” to “create invoice”</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Drafting multilingual support replies</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Mapping “status = paid → create invoice” is deterministic. Adding AI just adds risk and cost.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. Which tool is best when AU data residency is critical?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Zapier on the starter plan</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Self-hosted n8n on an Australian VM</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Pipedream in their default region</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Self-hosted n8n on an AU VM gives full data control and keeps everything onshore.</p>
              </details>
            </fieldset>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Up next · Lesson 2</p>
            <h3 className="text-lg font-semibold text-slate-900 mt-1">
              n8n and Zapier with AI: when to use each
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Side-by-side build of the same workflow in both tools.
            </p>
          </div>
          <a
            href="#"
            aria-disabled="true"
            tabIndex={-1}
            className="inline-flex items-center gap-2 bg-slate-300 text-slate-500 font-medium px-5 py-2.5 rounded-lg pointer-events-none cursor-not-allowed select-none"
          >
            Coming soon
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-20">
        <div className="flex flex-wrap gap-3">
          <Link
            href="/academy/ai-automation"
            className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
          >
            <ArrowLeft className="size-4" /> Back to AI Automation
          </Link>
          <Link
            href="/academy"
            className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
          >
            All paths
          </Link>
        </div>
      </section>
    </main>
  );
}
