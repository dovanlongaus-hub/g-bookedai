import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  GraduationCap,
  MessageSquareCode,
  Play,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { HeroAgents } from '@/components/illustrations/hero-agents';
import { InfographicComparison } from '@/components/illustrations/infographic-comparison';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'Evaluating Prompt Quality — Prompt Engineering Lesson 12 | LongCare Academy',
  description:
    'Move from guesswork to data on your prompts. Four eval dimensions, five eval tools (Anthropic Workbench, OpenAI Evals, Langfuse, Helicone, PromptLayer), golden-set testing, A/B in production, AU bias eval and a sample rubric.',
  path: '/academy/prompt-engineering/lessons/evaluating-prompt-quality',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Evaluating Prompt Quality — Move From Guesswork to Data',
  educationalLevel: 'Intermediate',
  learningResourceType: 'Lesson',
  timeRequired: 'PT25M',
  inLanguage: 'en-AU',
  isPartOf: {
    '@type': 'Course',
    name: 'Prompt Engineering',
    url: 'https://longcare.au/academy/prompt-engineering',
  },
  provider: {
    '@type': 'Organization',
    name: 'LongCare AU',
    sameAs: 'https://longcare.au',
  },
};

export default function EvaluatingPromptQualityLessonPage() {
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
            { name: 'Prompt Engineering', url: '/academy/prompt-engineering' },
            { name: 'Evaluating Prompt Quality', url: '/academy/prompt-engineering/lessons/evaluating-prompt-quality' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <MessageSquareCode className="size-3" /> Lesson 12 of 12
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 25 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Evaluating prompt quality — move from guesswork to data
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              You cannot ship a prompt to production on the strength of three good runs. You
              need a small evaluation harness, a golden set of inputs, and a habit of A/B
              testing changes. The good news: this is a one-evening setup.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#"
                aria-disabled="true"
                tabIndex={-1}
                className="inline-flex items-center gap-2 bg-slate-300 text-slate-500 font-medium px-5 py-2.5 rounded-lg pointer-events-none cursor-not-allowed select-none"
              >
                Continue path — coming soon
              </a>
              <Link
                href="/academy/prompt-engineering"
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

      {/* Inline infographic */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            Vibes-based vs evidence-based prompting
          </h3>
          <div className="flex justify-center">
            <InfographicComparison width={720} height={260} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            On the left, prompts shipped on intuition. On the right, prompts shipped on a
            golden-set pass rate. The shift takes a weekend; the payoff is permanent.
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
              Walk-through screencast in production. The transcript below is the full lesson.
            </span>
          </div>
        </div>
      </section>

      {/* Transcript */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The four evaluation dimensions</h3>
          <p className="mt-2 text-slate-700">
            Every production prompt should be evaluated on four dimensions, weighted to your
            use case.
          </p>
          <ol className="mt-2 list-decimal pl-6 text-slate-700">
            <li><strong>Accuracy</strong> &mdash; is the output factually correct? For classifiers this is straightforward to grade. For summaries, use a rubric (covers all key facts? omits made-up facts?).</li>
            <li><strong>Relevance</strong> &mdash; does the output address the user&rsquo;s actual question? A confident answer to the wrong question is the most common failure mode.</li>
            <li><strong>Format</strong> &mdash; does the output match the schema, length, structure and tone you require? Often missed; matters as much as accuracy for downstream automation.</li>
            <li><strong>Cost</strong> &mdash; per-call AUD cost and average latency. A 92% accurate prompt at A$0.02 per call may beat a 95% accurate prompt at A$0.20.</li>
          </ol>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Five evaluation tools in 2026</h3>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Anthropic Workbench</strong> &mdash; free with a Claude API account. Run prompts against test cases side-by-side, including the Claude-as-judge pattern.</li>
            <li><strong>OpenAI Evals</strong> &mdash; open-source framework on GitHub. Strong on programmatic evaluation; needs technical setup.</li>
            <li><strong>Langfuse</strong> &mdash; open-source observability. Free self-hosted, US$59/mo (~A$90) hosted starter. Best for production evaluation in TypeScript/Python apps.</li>
            <li><strong>Helicone</strong> &mdash; lightweight LLM gateway with eval tracing. Free up to 10K requests/month. Good for AU SMEs starting out.</li>
            <li><strong>PromptLayer</strong> &mdash; visual prompt versioning with eval support. US$50/mo (~A$77) for pro plan. Strong if your team includes non-engineers.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Golden set testing</h3>
          <p className="mt-2 text-slate-700">
            A golden set is 15-30 representative inputs with known good outputs. Build it
            once: pull real examples from your data, write the ideal output for each, and
            store them in a spreadsheet or YAML file. Whenever you change a prompt or change
            models, run the golden set, score each output against the ideal, and compare to
            the previous version&rsquo;s scores. A pass rate (defined as &ldquo;score above
            X&rdquo;) gives you a single number to talk about. We recommend 80% pass at
            score 4/5 as a minimum bar for production for most AU SME use cases.
          </p>
          <p className="mt-2 text-slate-700">
            Golden sets degrade over time. Refresh quarterly: drop examples that no longer
            represent real traffic, add new edge cases, and re-baseline. The set is a living
            document, not a one-off artefact.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">A/B testing prompts in production</h3>
          <p className="mt-2 text-slate-700">
            For high-volume workflows, A/B testing in production is the gold standard.
            Most LLM gateways (Langfuse, Helicone, PromptLayer, LiteLLM) support this with a
            few lines of config. Route 90% of traffic to your current production prompt and
            10% to the candidate; compare on accuracy, customer satisfaction, downstream
            actions taken. Run for at least 500 calls per variant; under 200 and noise will
            mislead you. The most common surprise: candidate prompts that scored higher on the
            golden set sometimes score lower in production because real traffic has long-tail
            inputs the golden set missed. Trust production.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">AU-specific bias evaluation</h3>
          <p className="mt-2 text-slate-700">
            Models trained largely on US/UK text exhibit predictable AU bias: defaults to USD,
            US spelling, US holidays, US tax terminology, occasional misidentification of AU
            place names. For any prompt that touches money, geography, regulation or culture,
            add three AU-specific test cases to your golden set: one with AUD/GST context,
            one with an AU-specific reference (e.g. ATO, Centrelink, Fair Work), and one
            with an Australian Indigenous reference (e.g. Acknowledgement of Country
            language). Tracking pass rate on these three over time catches model drift toward
            US-default outputs.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">A sample eval rubric</h3>
          <p className="mt-2 text-slate-700">
            For a customer support draft-reply prompt, our rubric uses five 1-5 scores:
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Factual accuracy</strong> &mdash; no invented facts or product names.</li>
            <li><strong>Question coverage</strong> &mdash; addresses every part of the customer&rsquo;s message.</li>
            <li><strong>Tone match</strong> &mdash; AU English, warm-but-direct, no marketing speak.</li>
            <li><strong>Action clarity</strong> &mdash; clear next step for the customer.</li>
            <li><strong>Compliance posture</strong> &mdash; no advice beyond scope, no promises we can&rsquo;t keep.</li>
          </ul>
          <p className="mt-2 text-slate-700">
            Sum to 25; production bar is 20. Score with a Claude-as-judge prompt for speed,
            with 10% of cases hand-graded as a calibration check.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The one-evening evaluation setup</h3>
          <p className="mt-2 text-slate-700">
            Build the golden set (2 hours), pick a tool (15 minutes), wire it in (1 hour),
            run the baseline (15 minutes), publish the dashboard to the team (15 minutes).
            Total: under four hours. Maintained quarterly, this single piece of process is
            the difference between an AI workflow that drifts into uselessness and one that
            improves over years.
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Four eval dimensions: accuracy, relevance, format, cost. Weight to your use case; cost matters more than most teams admit.',
              'Five tools cover the spectrum: Anthropic Workbench (free), OpenAI Evals (free, technical), Langfuse, Helicone, PromptLayer.',
              'Golden set is 15-30 representative inputs with ideal outputs. 80% pass at 4/5 is a reasonable production bar.',
              'Refresh the golden set quarterly. It is a living document, not a one-off artefact.',
              'A/B in production with 90/10 split, minimum 500 calls per variant. Real traffic surfaces long-tail failures the golden set misses.',
              'Add three AU-specific test cases (AUD/GST, AU regulator reference, Indigenous reference) to catch US-default drift.',
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
          <p className="text-sm text-slate-600 mb-4">One short hands-on exercise. Total time: 90 minutes.</p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Exercise: Build a 20-case golden set in Anthropic Workbench</p>
            <p className="mt-2">
              Pick your most-used prompt. Open Anthropic Workbench (free with API key).
            </p>
            <ol className="mt-3 list-decimal pl-6 space-y-1">
              <li>Pull 20 real examples from your last 30 days of traffic.</li>
              <li>For each, write the ideal 1-sentence output description.</li>
              <li>Set up Workbench &ldquo;test cases&rdquo; with input and reference output.</li>
              <li>Run your current prompt across all 20. Score each 1-5 by hand on the rubric.</li>
              <li>Note the baseline pass rate. Try one tweak. Compare. Keep what wins.</li>
            </ol>
            <p className="mt-3">You now have data, not vibes. Every future prompt change goes through this gate.</p>
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
                1. What is the recommended minimum size for a golden set?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> 5 examples</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> 15-30 representative examples with ideal outputs</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> 500 examples</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">15-30. Smaller and you cannot tell signal from noise; larger and maintenance overhead kills the habit.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. Why is production A/B testing worth doing on top of golden-set evaluation?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Because it&rsquo;s cheaper than the golden set</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Real traffic surfaces long-tail failures the golden set misses</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Because the golden set is unreliable</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Real traffic has a long tail. Prompts can win on golden set and lose in production; the inverse is rarer but happens too.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. Which three AU-specific test cases catch US-default drift?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> AUD/GST, AU regulator reference, Indigenous reference</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Sydney, Melbourne, Brisbane</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Bunnings, Coles, Woolies</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">AUD/GST, AU regulator, Indigenous reference. Each surfaces a different US-default failure mode (currency, regulation, cultural).</p>
              </details>
            </fieldset>
          </div>
        </div>
      </section>

      {/* End-of-path note */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Path complete</p>
            <h3 className="text-lg font-semibold text-slate-900 mt-1">
              You have finished the Prompt Engineering path
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Twelve lessons, five hours of focused learning. Advanced bootcamps, certificates
              and live AU cohorts land in Q4 2026.
            </p>
          </div>
          <a
            href="#"
            aria-disabled="true"
            tabIndex={-1}
            className="inline-flex items-center gap-2 bg-slate-300 text-slate-500 font-medium px-5 py-2.5 rounded-lg pointer-events-none cursor-not-allowed select-none"
          >
            Continue path — coming soon
          </a>
        </div>
      </section>

      {/* Footer nav */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-20">
        <div className="flex flex-wrap gap-3">
          <Link
            href="/academy/prompt-engineering"
            className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
          >
            <ArrowLeft className="size-4" /> Back to Prompt Engineering
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
