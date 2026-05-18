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
import { InfographicTimeline } from '@/components/illustrations/infographic-timeline';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'Your 30-Day AI Routine — Beginner AI Lesson 13 | LongCare Academy',
  description:
    'A practical 30-day routine for turning AI curiosity into a real daily habit — day-by-day plan, prompt journal, weekly retrospective, anti-burnout pacing and an AU community plug-in.',
  path: '/academy/beginner-ai/lessons/your-30-day-ai-routine',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Your 30-Day AI Routine — From Curiosity to Habit',
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

export default function Your30DayAiRoutineLessonPage() {
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
            { name: 'Your 30-Day AI Routine', url: '/academy/beginner-ai/lessons/your-30-day-ai-routine' },
          ]}
        />
      </div>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Sparkles className="size-3" /> Lesson 13 of 14
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 25 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Your 30-day AI routine — from curiosity to habit
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Most Australians try AI for a week, fall off, and never quite come back. A
              30-day routine fixes that. Here is the day-by-day plan we run with AU SMEs
              and solo operators to turn experimentation into a real working habit.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/academy/beginner-ai/lessons/ai-capstone-mini-project"
                className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
              >
                Next lesson — Capstone project <ArrowRight className="size-4" />
              </Link>
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

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            The 30-day timeline — setup, practice, polish
          </h3>
          <div className="flex justify-center">
            <InfographicTimeline width={720} height={180} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Days 1-7 install the tools and rituals. Days 8-21 build daily reps. Days 22-30 polish,
            share and choose what becomes permanent.
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
              Walk-through screencast in production. The transcript below is the full lesson.
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Why most AI experiments die in week two</h3>
          <p className="mt-2 text-slate-700">
            We see the same pattern across hundreds of AU SMEs and solo operators. Week one is
            magic: ChatGPT writes an email in 30 seconds, Gemini summarises a contract, Claude
            untangles a spreadsheet. Week two, life crashes in — a deadline, the kids&rsquo;
            school holidays, a quote that has to go out — and AI quietly disappears from the
            workflow. By the time you remember, the habit is cold. The fix is not motivation.
            The fix is a 30-day scaffold that survives a normal week. That is what this lesson
            gives you.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Days 1-7 — setup and one daily rep</h3>
          <p className="mt-2 text-slate-700">
            The single biggest mistake is trying to use AI everywhere on day one. Instead, pick
            <em> one</em> repeating task you do for at least 15 minutes most days — typically
            email triage, meeting notes, or first-drafting client replies. For seven days, that
            is your only AI rep. Day 1: open ChatGPT, Gemini and Claude side by side; do your
            daily task in all three; pick the one that fits your voice. Days 2-7: do that task
            with that tool every single day, even when you do not feel like it. Keep a
            three-line journal — what you asked, what you got, what you changed. That journal
            is your prompt library starting to form. By Friday of week one you have seven good
            prompts and a working tool.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Days 8-21 — daily practice and weekly retrospective</h3>
          <p className="mt-2 text-slate-700">
            Add one new use case per week, not per day. Week two: voice-to-AI dictation in the
            car (we cover this in the voice-and-dictation lesson). Week three: image AI for
            one piece of social or internal collateral per week. The rule we give Brisbane and
            Perth SME owners is the &ldquo;one-pencil rule&rdquo; — only one new pencil case
            on the desk at a time, no matter how shiny the next tool looks. At the end of each
            week, run a 15-minute retrospective on Friday: what saved time, what cost time,
            what surprised you. Most people overestimate one-week gains and underestimate
            four-week gains. The retrospective makes the four-week story visible to your future self.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The prompt journal — your personal flight log</h3>
          <p className="mt-2 text-slate-700">
            A prompt journal is the single highest-ROI habit we teach. Open a Google Doc or
            Notion page called &ldquo;Prompt Journal — [your name]&rdquo;. Each day, paste any
            prompt that worked surprisingly well, with one line of context (&ldquo;Used for
            client follow-up emails, saves 10 minutes&rdquo;). After 30 days you have 30-50
            entries. After 90 you have a personal library that no consultant can sell you.
            One Adelaide accountant in our cohort grew her journal to 220 prompts in six
            months and now charges for it as a packaged offering. The journal also serves as
            evidence on a day you doubt the routine is working.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Anti-burnout pacing — when to slow down on purpose</h3>
          <p className="mt-2 text-slate-700">
            AI burnout is real. The symptom is opening ChatGPT, typing nothing, and closing it
            again. The cure is structural, not motivational. Three rules: never start a new use
            case on a Friday afternoon; cap experimentation at 30 minutes per day until day 14;
            and pre-schedule a &ldquo;rest day&rdquo; — usually Sunday — where you deliberately
            do your work the old way. The contrast is what makes the habit stick. We have seen
            AU founders push 60-hour AI weeks for a fortnight and then quit cold turkey. The
            steady 30-minute-a-day pace beats both.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The accountability buddy</h3>
          <p className="mt-2 text-slate-700">
            Habits stick 2-3x more often when you have a buddy. Find one person — a colleague,
            a friend in a different industry, a local SME owner — and agree to send each other
            one prompt-of-the-week on Friday. Keep it informal: a WhatsApp message is fine.
            Brisbane&rsquo;s SoMa community and Melbourne&rsquo;s AI Tinkerers meetup both run
            buddy pairings free of charge. AU regional towns increasingly run AI coffee
            mornings at the local library — check Eventbrite for your postcode. The point is
            external visibility, not accountability theatre.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Days 22-30 — polish, share, decide what to keep</h3>
          <p className="mt-2 text-slate-700">
            The last 9 days are the consolidation phase. Day 22: re-read your journal end to
            end. Day 23-25: rewrite your three best prompts as templates — add variables in
            curly braces ({'{client_name}'}, {'{tone}'}, {'{deadline}'}) so they become
            reusable. Day 26: pick one prompt good enough to share with your team or a public
            audience; post it on LinkedIn with a sentence on what problem it solves. Day 27-29:
            audit the routine — what survived, what did not, what felt like cosplay. Day 30:
            write a one-page self-assessment and book the capstone project (next lesson).
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">AU AI community — plug in for the next 30 days</h3>
          <p className="mt-2 text-slate-700">
            A routine that stops with you is fragile. The best place to plug in long term is the
            AU AI community. Three free, reliable options as of mid-2026: Sydney AI Festival
            (annual, August), Melbourne AI Tinkerers (monthly, free), and AI Australia Slack
            (online, free, 8,000+ members). State chapters of the Tech Council of Australia
            also run AI roundtables for SME members. Pick one, attend in your last week of the
            30-day plan. You will leave with three more prompts and one new contact — guaranteed.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The day-30 self-assessment</h3>
          <p className="mt-2 text-slate-700">
            Five questions, 10 minutes. Write the answers down. (1) Which task am I confidently
            faster at with AI than without? (2) Which tool felt natural? (3) Which prompts are
            now muscle memory? (4) Where did AI not help? (5) What is my single biggest next
            experiment? People who can answer all five are ready for the capstone — building
            and shipping their first real AI project. That is lesson 14.
          </p>
        </article>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Pick one repeating task on day 1 and only that task for week one — the one-pencil rule.',
              'A daily three-line prompt journal builds a personal library worth more than any course.',
              'Add one new use case per week, not per day — and run a 15-minute Friday retrospective.',
              'Cap experimentation at 30 minutes per day for two weeks; pre-schedule a Sunday rest day.',
              'Find an accountability buddy — Slack DM, WhatsApp, or a local AU meetup like AI Tinkerers.',
              'Day-30 self-assessment of five questions decides what becomes permanent vs what gets dropped.',
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
          <p className="text-sm text-slate-600 mb-4">One short hands-on exercise. Total time: 20 minutes.</p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Exercise: Plan your 30 days on a single page</p>
            <p className="mt-2">
              Open a fresh page or doc and write the following — do not overthink it.
            </p>
            <ol className="mt-3 list-decimal pl-6 space-y-1">
              <li>Name the one repeating task you will use AI for in week one.</li>
              <li>Pick the one tool (ChatGPT, Gemini or Claude) and your AUD plan if any.</li>
              <li>Block 30 minutes a day for 30 days in your calendar — same time slot, 5 days a week.</li>
              <li>Create the prompt journal doc with the title &ldquo;Prompt Journal — [your name]&rdquo;.</li>
              <li>Pick one accountability buddy and send them the plan in one sentence.</li>
            </ol>
            <p className="mt-3">
              Twenty minutes today is the highest-leverage twenty minutes of your AI journey.
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
                1. In week one of the routine, how many AI use cases should you start with?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Three to five — to find the best fit</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Only one repeating task — the one-pencil rule</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> As many as time allows</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">One. The week-one job is depth on one task, not breadth across many. Breadth comes in weeks 2-4.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. What is the highest-ROI daily habit in the 30-day plan?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Reading AI newsletters every morning</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> A three-line prompt journal of what worked</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Trying a new model every day</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">The prompt journal. It compounds into a personal library and serves as evidence that the routine is working.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. Why is a pre-scheduled rest day part of the plan?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Because the AI providers throttle on weekends</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> So the contrast between AI-on and AI-off makes the habit stick</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> To save AUD on token usage</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Contrast. Doing one day a week the old way is what makes the rest of the week feel different — and visible.</p>
              </details>
            </fieldset>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Up next — Lesson 14</p>
            <h3 className="text-lg font-semibold text-slate-900 mt-1">
              AI Capstone — Build &amp; Ship Your First Real AI Project
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Pick a project, write a spec, build it in a two-day sprint and ship it publicly.
            </p>
          </div>
          <Link
            href="/academy/beginner-ai/lessons/ai-capstone-mini-project"
            className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
          >
            Continue <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

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
            Lesson library
          </Link>
        </div>
      </section>
    </main>
  );
}
