import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  GraduationCap,
  Play,
  Sparkles,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { HeroMentor } from '@/components/illustrations/hero-mentor';
import { InfographicStack } from '@/components/illustrations/infographic-stack';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'AI for Everyday Tasks — Beginner AI Lesson 4 | LongCare Academy',
  description:
    'Seven everyday tasks AI handles brilliantly: email triage, meeting summaries, brainstorming, learning, planning, decisions, and memory. AUD pricing for each tier.',
  path: '/academy/beginner-ai/lessons/ai-for-everyday-tasks',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'AI for Everyday Tasks — Email, Notes, Brainstorming',
  educationalLevel: 'Beginner',
  learningResourceType: 'Lesson',
  timeRequired: 'PT25M',
  inLanguage: 'en-AU',
  isPartOf: {
    '@type': 'Course',
    name: 'Beginner AI',
    url: 'https://longcare.au/academy/beginner-ai',
  },
  provider: {
    '@type': 'Organization',
    name: 'LongCare AU',
    sameAs: 'https://longcare.au',
  },
};

export default function AIForEverydayTasksLessonPage() {
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
            { name: 'Beginner AI', url: '/academy/beginner-ai' },
            { name: 'AI for Everyday Tasks', url: '/academy/beginner-ai/lessons/ai-for-everyday-tasks' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Sparkles className="size-3" /> Lesson 4 of 8
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 25 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              AI for everyday tasks — email, notes, brainstorming
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              The seven daily jobs where AI consistently saves Australian SME owners more than an
              hour a week. Pick the three that match your job and start tomorrow morning.
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
                href="/academy/beginner-ai"
                className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
              >
                <ArrowLeft className="size-4" /> Back to path
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroMentor className="text-sky-700" width={420} height={320} />
          </div>
        </div>
      </section>

      {/* Inline stack */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            The everyday-task stack
          </h3>
          <div className="flex justify-center">
            <InfographicStack width={720} height={260} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Each layer compounds. Win at email, then add meetings, then brainstorming. Start at the
            bottom — daily wins build the habit.
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
              The transcript below is the full lesson; the video adds screen recordings of each
              workflow inside ChatGPT, Gemini, and Claude.
            </span>
          </div>
        </div>
      </section>

      {/* Transcript */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The Pareto rule for AI</h3>
          <p className="mt-2 text-slate-700">
            Most people learn five tools, use none of them, and conclude AI &ldquo;isn&rsquo;t for
            them&rdquo;. The fix is to pick your top three personal use cases and run them every
            single day until they are reflexes. After three weeks, the seventh task becomes free
            because the habit is set.
          </p>
          <p className="mt-2 text-slate-700">
            Below are the seven everyday tasks where AI is consistently world-class for Australian
            small business. Each entry lists the best tool, the AUD pricing tier you actually need,
            and a sample workflow you can copy on Monday morning.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">1. Email triage and replies</h3>
          <p className="mt-2 text-slate-700">
            Best tool: Gemini if you live in Gmail; Copilot if you live in Outlook; ChatGPT free if
            you copy-paste. Pricing: Google Workspace AI is bundled at A$36/user/month on Business
            Standard, Microsoft 365 Copilot adds about A$45/user/month, ChatGPT Plus is A$30/month.
            Workflow: drag the email into a draft, add &ldquo;reply concisely in AU English&rdquo;,
            edit before sending. Saves 10&ndash;15 minutes per long thread.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">2. Meeting summaries and action items</h3>
          <p className="mt-2 text-slate-700">
            Best tool: Granola or Otter.ai for live transcription, Gemini in Google Meet for
            built-in notes. Pricing: Granola free for 25 meetings/month, A$25/month after; Otter
            Pro about A$30/month; Google Meet AI bundled with Workspace. Workflow: record (with
            consent), let AI summarise, paste action items into your task tool. Australia: get
            verbal consent at the top of every recording — required in NSW, VIC, WA, NT, QLD.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">3. Brainstorming and idea generation</h3>
          <p className="mt-2 text-slate-700">
            Best tool: Claude is famously calm and verbose for ideation; ChatGPT is punchier;
            Gemini is fastest. Pricing: free tiers are plenty for solo brainstorms.
            Workflow: state the problem in three sentences, ask for &ldquo;ten directions, ranked
            by likely effort&rdquo;, then ask AI to argue against the top three. Counter-arguments
            kill bad ideas before you spend money on them.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">4. Learning a new topic fast</h3>
          <p className="mt-2 text-slate-700">
            Best tool: ChatGPT or Claude with the &ldquo;Feynman&rdquo; prompt: &ldquo;explain X to
            a curious 12-year-old, then quiz me with 5 questions&rdquo;. Pricing: free works fine;
            paid lets you chat longer in a single thread. Workflow: 20 minutes, three rounds of
            quiz-and-correct, you have a working mental model. Used widely now by AU tradies
            preparing for white-card refreshers and small-business owners learning Xero.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">5. Travel and event planning</h3>
          <p className="mt-2 text-slate-700">
            Best tool: ChatGPT with browsing on (Plus tier) or Gemini Advanced. Pricing: A$30/month
            buys you live-data planning with current AUD prices and opening hours. Workflow: feed
            it dates, budget, dietary needs, dealbreakers; ask for a day-by-day plan with
            transport. Saves an evening of tab-juggling per trip.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">6. Decision support</h3>
          <p className="mt-2 text-slate-700">
            Best tool: Claude is the strongest for nuanced reasoning, ChatGPT for fast comparisons.
            Pricing: free tiers fine for occasional use. Workflow: state the decision, list your
            criteria with weights, paste the options, ask for a scored table plus the assumptions
            most likely to flip the answer. The assumptions list is more valuable than the score.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">7. Memory aid &mdash; write your context</h3>
          <p className="mt-2 text-slate-700">
            Best tool: any chat with persistent memory turned on (ChatGPT, Gemini Gems, Claude
            Projects). Pricing: free or A$30/month for Projects. Workflow: spend 30 minutes once,
            describe your business, voice, customers, and constraints in 500 words. Save it as a
            custom GPT or Project. Every future prompt starts with that context loaded — quality
            doubles.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Privacy guardrail</h3>
          <p className="mt-2 text-slate-700">
            Do not paste customer PII (names, emails, phone numbers, Medicare numbers) into free
            tiers. Workspace and Microsoft 365 enterprise plans contractually exclude your data
            from training; consumer tiers may not. Mask names with &ldquo;[Customer A]&rdquo;
            before pasting if you are unsure. Lesson 7 covers this in depth.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Time savings calculator</h3>
          <p className="mt-2 text-slate-700">
            Conservative numbers from our SME beta cohort: 7 daily tasks × 15 minutes saved each =
            roughly 9 hours a week. Even at A$50/hour for your time, that is A$450/week — about
            A$23,000 a year of capacity unlocked for one person. The A$30 you pay ChatGPT is the
            cheapest spend on your P&amp;L.
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Pick three tasks and use them daily for three weeks before adding more.',
              'Email triage and meeting summaries are the highest-leverage entry points for AU SMEs.',
              'Always get verbal consent before recording meetings in Australia.',
              'Free tiers are enough to start; A$30/month per seat is the typical first paid step.',
              'Mask customer PII before pasting into consumer tiers; enterprise plans contractually exclude training.',
              'Saving 15 minutes on 7 tasks/day adds up to roughly 9 hours/week of recovered capacity.',
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
          <p className="text-sm text-slate-600 mb-4">
            One short hands-on exercise. Total time: 10 minutes.
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Exercise: write your context once</p>
            <p className="mt-2">
              Open ChatGPT, click the menu, switch on memory (or create a new GPT). Paste a 300-word
              description of your business: who you are, who you serve, your tone, your top three
              constraints, and three things AI should never assume.
            </p>
            <p className="mt-3 italic">
              Save it. Then ask one of yesterday&rsquo;s prompts again. Watch the answer get markedly
              better. That difference is the value of stored context — write it once, pay forever.
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
                1. Why focus on three daily tasks before learning more?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> AI tools punish overuse</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Habit forms after repeated reuse, not after watching tutorials</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> The free tier expires faster otherwise</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Habit forms after repeated reuse. Once your top three are reflexive, the others slot in for free.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. Before recording a meeting in NSW or VIC, you should...
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Notify your accountant</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Get explicit verbal consent from all participants</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Do nothing, recording is unrestricted</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Get explicit verbal consent. Several Australian states require all-party consent for recordings.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. The biggest argument for storing your business context once is...
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> It is required by ATO</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Every future prompt starts richer, so quality compounds</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> It unlocks a free tier</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Every future prompt starts richer. Stored context is the highest-ROI 30 minutes you will spend on AI this year.</p>
              </details>
            </fieldset>
          </div>
        </div>
      </section>

      {/* Next lesson preview */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Up next · Lesson 5</p>
            <h3 className="text-lg font-semibold text-slate-900 mt-1">
              Image AI: when and how to use it
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              The right way to brief an image generator, and the wrong ways that waste credits.
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

      {/* Footer nav */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-20">
        <div className="flex flex-wrap gap-3">
          <Link
            href="/academy/beginner-ai"
            className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
          >
            <ArrowLeft className="size-4" /> Back to Beginner AI
          </Link>
          <Link
            href="/academy/lessons"
            className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
          >
            All free lessons
          </Link>
        </div>
      </section>
    </main>
  );
}
