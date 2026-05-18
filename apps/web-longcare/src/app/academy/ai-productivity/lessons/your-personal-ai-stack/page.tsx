import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  GraduationCap,
  Play,
  Zap,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { HeroToolkit } from '@/components/illustrations/hero-toolkit';
import { InfographicStack } from '@/components/illustrations/infographic-stack';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'Build Your Personal AI Stack | LongCare Academy',
  description:
    'A 5-tool stack that saves Australian professionals 10+ hours per week. Lesson 1 of the AI Productivity path. Free.',
  path: '/academy/ai-productivity/lessons/your-personal-ai-stack',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Build Your Personal AI Stack',
  educationalLevel: 'Professionals',
  learningResourceType: 'Lesson',
  timeRequired: 'PT15M',
  inLanguage: 'en-AU',
  isPartOf: {
    '@type': 'Course',
    name: 'AI Productivity',
    url: 'https://longcare.au/academy/ai-productivity',
  },
  provider: {
    '@type': 'Organization',
    name: 'LongCare AU',
    sameAs: 'https://longcare.au',
  },
};

export default function PersonalAIStackLessonPage() {
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
            { name: 'AI Productivity', url: '/academy/ai-productivity' },
            { name: 'Your Personal AI Stack', url: '/academy/ai-productivity/lessons/your-personal-ai-stack' },
          ]}
        />
      </div>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Zap className="size-3" /> Lesson 1 of 8
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 15 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Start course free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Build Your Personal AI Stack
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Five tools, AUD pricing, and the workflow they slot into. Pick the three that fit
              your job and start saving real hours this week.
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
                href="/academy/ai-productivity"
                className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
              >
                <ArrowLeft className="size-4" /> Back to path
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroToolkit className="text-sky-700" width={420} height={320} />
          </div>
        </div>
      </section>

      {/* Stack infographic */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            The five-layer personal AI stack
          </h3>
          <div className="flex justify-center">
            <InfographicStack width={720} height={360} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Chat · Search · Writing · Meeting · Automation. Add layers in this order, not all at once.
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
            <span className="text-sm">Video coming Q3 2026 · 15 min</span>
            <span className="mt-2 text-xs text-white/60 max-w-md text-center">
              The transcript and pricing table below cover everything in the upcoming walk-through.
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The five essentials</h3>
          <p className="mt-2 text-slate-700">
            A modern professional in 2026 only needs five categories of AI tool. Most people
            try to collect 15 and end up using two. We’re going to ruthlessly trim the fat.
          </p>
          <ol className="mt-2 list-decimal pl-6 text-slate-700">
            <li><strong>Chat assistant</strong> — the daily driver. ChatGPT, Gemini, or Claude. This is where you brainstorm, draft, and reason through problems. Pick one and master it before adding a second.</li>
            <li><strong>Search AI</strong> — Perplexity. Where ChatGPT guesses, Perplexity fetches and cites. Use it whenever facts must be current and verifiable. (You can also use ChatGPT/Gemini in browse mode, but a dedicated search tool builds the right habit.)</li>
            <li><strong>Writing AI</strong> — built-in. Gemini inside Google Docs/Gmail or Copilot inside Microsoft 365. Lives where your text already lives, so the friction is zero.</li>
            <li><strong>Meeting AI</strong> — Otter, Fireflies, or Granola. Joins your calls, transcribes, and produces summary + action items. The single biggest time-saver for managers.</li>
            <li><strong>Automation AI</strong> — Zapier or n8n with AI nodes. Glues the other four together. Only add this once you have at least two repeating workflows worth automating.</li>
          </ol>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">AUD pricing summary (mid-2026)</h3>
          <p className="mt-2 text-slate-700">A realistic per-month spend for an Australian professional:</p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li>Chat assistant — ChatGPT Plus ~A$30, Gemini Advanced ~A$32, Claude Pro ~A$30.</li>
            <li>Search AI — Perplexity Pro ~A$30, free tier covers casual use.</li>
            <li>Writing AI — typically bundled with your existing Workspace/M365 subscription (~A$15–25 add-on).</li>
            <li>Meeting AI — Otter ~A$25, Fireflies ~A$28, Granola ~A$30.</li>
            <li>Automation AI — Zapier ~A$30 entry; n8n self-host ~A$0–10 in compute.</li>
          </ul>
          <p className="mt-2 text-slate-700">
            Most people land at about <strong>A$60–90/month</strong> for a serious stack — less than
            a daily coffee, payback inside the first week of use.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Stack of one vs. stack of three</h3>
          <p className="mt-2 text-slate-700">
            For your first month, run a <strong>stack of one</strong>: a single chat assistant.
            That’s it. You’ll learn what it’s good at and where it’s weak before piling on more
            tools. Most professionals discover ~80% of the value lives in this one tool used
            well.
          </p>
          <p className="mt-2 text-slate-700">
            From month two, expand to a <strong>stack of three</strong>: chat + meeting AI +
            search AI. That covers virtually every knowledge-work pattern. Add writing AI in
            month three only if your existing Office suite supports it natively. Add automation
            AI last, when you have specific repeated workflows in mind.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Setting up Workspace context</h3>
          <p className="mt-2 text-slate-700">
            The biggest under-used feature in 2026 is letting your AI assistant <em>see</em>
            your work. In Google Workspace, that means enabling Gemini’s Drive and calendar
            integration; in Microsoft 365, that’s Copilot’s SharePoint and Outlook context.
            Without it, you’re re-pasting the same context every day. With it, you can ask
            “summarise the proposal I sent Acme last week and draft a follow-up” and the
            assistant just does it.
          </p>
          <p className="mt-2 text-slate-700">
            Spend 20 minutes today turning these integrations on. It’s the single highest-ROI
            click in the whole course.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Privacy basics</h3>
          <p className="mt-2 text-slate-700">
            Three rules will protect 95% of cases:
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Never paste credentials, full bank account numbers, or Tax File Numbers</strong> into any AI tool. Treat them like printing on a billboard.</li>
            <li><strong>Use the business/Workspace plan</strong> when handling client data. Free consumer plans typically allow training on your inputs; business plans usually don’t.</li>
            <li><strong>Choose AU/EU data residency</strong> when offered. It satisfies most Privacy Act and contractual obligations.</li>
          </ul>
          <p className="mt-2 text-slate-700">
            We dive deeper into privacy in the AI for Business path. For now, those three rules
            are enough.
          </p>
        </article>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Five categories are enough: chat, search, writing, meeting, automation AI.',
              'Start with a stack of one — master a single chat assistant before adding more tools.',
              'Realistic AU monthly spend: A$60–90 for a serious three-tool stack.',
              'Turn on Workspace/M365 integrations — biggest one-click ROI in this whole course.',
              'Three privacy rules: no credentials, use business plans, prefer AU/EU residency.',
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
          <p className="text-sm text-slate-600 mb-4">Total time: 10 minutes.</p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Exercise: Pick your three-tool starter stack today</p>
            <ol className="mt-2 list-decimal pl-6 space-y-2">
              <li>Choose your <strong>chat assistant</strong>. Tip: pick the one that lives where you already work — Gemini if you’re Google Workspace, Copilot if you’re M365, ChatGPT/Claude if you’re neutral.</li>
              <li>Choose your <strong>meeting AI</strong>. Otter and Fireflies have free tiers — start free.</li>
              <li>Choose your <strong>search AI</strong>. Perplexity free is plenty for week one.</li>
            </ol>
            <p className="mt-3">
              Set them up before the next lesson. You’ll use this exact stack for every following
              exercise in the path.
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
                1. What should your first AI stack contain?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Five tools across all categories</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> One chat assistant you’ll learn deeply</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> The cheapest tool in each category</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">One chat assistant you’ll learn deeply. Master one before adding more.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. Why enable Drive/SharePoint integration with your assistant?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> It makes the model smarter overall</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> So the assistant can see your real work without you re-pasting context</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> It lowers the price</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">So the assistant can see your real work without re-pasting context — the biggest one-click ROI move.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. Which is NOT one of the three privacy rules?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Never paste TFNs or credentials</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Always use the free consumer plan to save money</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Prefer AU or EU data residency where offered</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Free consumer plans usually train on your inputs — exactly what you want to avoid for client data.</p>
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
              Email AI: Gemini, Superhuman, and triage workflows
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Process inbox at 2× speed without losing the personal touch.
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
            href="/academy/ai-productivity"
            className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
          >
            <ArrowLeft className="size-4" /> Back to AI Productivity
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
