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
import { FlowThreeStep } from '@/components/illustrations/flow-three-step';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'Your First 10 Prompts — Beginner AI Lesson 3 | LongCare Academy',
  description:
    'Ten copy-paste prompt templates for ChatGPT, Gemini, and Claude — adapted to Australian English and SME context. Try three before lunch.',
  path: '/academy/beginner-ai/lessons/your-first-10-prompts',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Your First 10 Prompts — Copy, Paste, Adapt',
  educationalLevel: 'Beginner',
  learningResourceType: 'Lesson',
  timeRequired: 'PT20M',
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

export default function YourFirst10PromptsLessonPage() {
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
            { name: 'Your First 10 Prompts', url: '/academy/beginner-ai/lessons/your-first-10-prompts' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Sparkles className="size-3" /> Lesson 3 of 8
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 20 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Your first 10 prompts — copy, paste, adapt
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Ten battle-tested prompts you can paste into ChatGPT, Gemini, or Claude in the next
              twenty minutes. Each one is adapted to Australian English and tuned for SME use.
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

      {/* Inline flow */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            The three-step rhythm: pick, adapt, test
          </h3>
          <div className="flex justify-center">
            <FlowThreeStep width={720} height={140} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Pick a template that matches your task, swap the placeholders for your real context,
            then run it twice and pick the better answer. That is the entire workflow.
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
            <span className="text-sm">Video coming Q3 2026 · 20 min</span>
            <span className="mt-2 text-xs text-white/60 max-w-md text-center">
              The transcript below is the full lesson. The video will walk through all ten prompts
              live, with the AI&rsquo;s replies on screen.
            </span>
          </div>
        </div>
      </section>

      {/* Transcript */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Why these ten?</h3>
          <p className="mt-2 text-slate-700">
            We tested roughly a hundred starter prompts with Australian SME owners over the last
            year. The ten below were the ones that produced something useful on the first try
            for the largest number of people, across the most varied businesses. They are the
            stabilisers on your AI bicycle: ride them for a week, then design your own.
          </p>
          <p className="mt-2 text-slate-700">
            Square brackets are placeholders. Replace them with your real situation before
            sending. The single biggest mistake beginners make is leaving the brackets in.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">1. Email reply — formal</h3>
          <p className="mt-2 text-slate-700">
            <em>&ldquo;You are my professional email assistant. Below is an email I received from
            [client name, role, company]. Draft a reply in polite Australian English, no longer
            than 120 words, that achieves [your goal]. Keep my tone warm but professional. Do not
            invent any commitments.&rdquo;</em>
          </p>
          <p className="mt-2 text-slate-700">
            Pitfall: AI loves to over-promise. Add &ldquo;do not invent any commitments&rdquo; and
            it stops volunteering things you didn&rsquo;t agree to.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">2. Email reply — friendly customer</h3>
          <p className="mt-2 text-slate-700">
            <em>&ldquo;Reply to this customer email in a friendly, helpful Australian voice. Avoid
            American spelling. Acknowledge what they said in one sentence, answer their question
            in two sentences, and finish with a warm sign-off. Sign as [your name].&rdquo;</em>
          </p>
          <p className="mt-2 text-slate-700">
            AU note: explicitly forbid American spelling, otherwise you will get
            &ldquo;analyze&rdquo; and &ldquo;color&rdquo;. Models default to US English unless told.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">3. Summarise meeting notes</h3>
          <p className="mt-2 text-slate-700">
            <em>&ldquo;Below is a transcript of a meeting. Produce: (1) a 5-bullet summary, (2) a
            list of decisions made, (3) action items in the format &lsquo;owner — task — due&rsquo;.
            Output in plain text, no markdown.&rdquo;</em>
          </p>
          <p className="mt-2 text-slate-700">
            Pitfall: skipping the &ldquo;no markdown&rdquo; line gives you a wall of stars and
            hashes that breaks when pasted into Outlook.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">4. Brainstorm five product names</h3>
          <p className="mt-2 text-slate-700">
            <em>&ldquo;I am launching [product/service] for [audience] in Australia. Suggest five
            short product names. Each name must be: under 12 letters, easy to pronounce,
            available as a .com.au or close variant, and not currently a registered trademark
            (best guess only — I will verify with IP Australia).&rdquo;</em>
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">5. Polish bullet points into a paragraph</h3>
          <p className="mt-2 text-slate-700">
            <em>&ldquo;Turn these rough notes into a single polished paragraph for [purpose, e.g.
            a board update]. Australian English. Keep all factual claims; do not add or remove
            details. Aim for 80&ndash;120 words.&rdquo;</em>
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">6. Translate text into AU English</h3>
          <p className="mt-2 text-slate-700">
            <em>&ldquo;Translate this text into Australian English. Convert American measurements
            to metric, American currency to AUD where context allows, and fix US spellings.
            Preserve meaning, tone, and length.&rdquo;</em>
          </p>
          <p className="mt-2 text-slate-700">
            Common pitfall: AI does not always know the current AUD/USD rate, so leave currency
            converted only when context allows.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">7. Plan a one-week trip to Sydney</h3>
          <p className="mt-2 text-slate-700">
            <em>&ldquo;Plan a 7-day Sydney itinerary for [travellers, budget, dietary needs]. Day
            by day, with morning, lunch, afternoon, dinner. Include public transport directions,
            walking times, and one rainy-day backup per day. AUD budget per day at the bottom.&rdquo;</em>
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">8. Explain like I&rsquo;m 10</h3>
          <p className="mt-2 text-slate-700">
            <em>&ldquo;Explain [concept] to a curious 10-year-old. Use one analogy from everyday
            Australian life. Avoid technical jargon. End with one question I can ask to test if
            I really understood.&rdquo;</em>
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">9. Review my SOP</h3>
          <p className="mt-2 text-slate-700">
            <em>&ldquo;Review this standard operating procedure for [task]. Identify: (1) ambiguous
            steps, (2) missing steps, (3) any compliance risk under Australian law. Suggest
            specific edits, not generic advice.&rdquo;</em>
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">10. Compare two options side-by-side</h3>
          <p className="mt-2 text-slate-700">
            <em>&ldquo;Compare [Option A] and [Option B] for an Australian SME with [your context].
            Output a markdown table with rows: cost (AUD), setup time, ongoing effort, AU privacy
            posture, scalability, and a one-line recommendation.&rdquo;</em>
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Homework: try three today</h3>
          <p className="mt-2 text-slate-700">
            Pick three prompts that match real tasks on your list this week. Run each twice.
            Save the better answer in a Google Doc called &ldquo;My AI swipe file&rdquo;. By Friday
            you will have built a personal library you actually use, not a list of prompts you
            forgot you had.
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Square brackets are placeholders — always replace them before sending.',
              'Explicitly request Australian English, otherwise models default to US spelling.',
              'Add &ldquo;do not invent commitments&rdquo; to email prompts to stop AI over-promising.',
              'Run important prompts twice and pick the better answer — variance is normal.',
              'Save winners to a personal swipe file; build muscle memory through reuse.',
              'Pick three prompts and try them today — reading without doing builds nothing.',
            ].map((t) => (
              <li key={t} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="size-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span dangerouslySetInnerHTML={{ __html: t }} />
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
            One short hands-on exercise. Total time: 5 minutes.
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Exercise: pick prompt #2 and adapt it</p>
            <p className="mt-2">
              Open your inbox, find a customer email you have not replied to yet, and paste the
              friendly-customer template into ChatGPT, Gemini, or Claude. Replace the placeholders.
              Read the draft critically.
            </p>
            <p className="mt-3 italic">
              Ask yourself: would you actually send this as-is? What two words would you change?
              That tiny edit is the moment you start prompting properly.
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
                1. Why does the formal-email template say &ldquo;do not invent any commitments&rdquo;?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> AI is legally required to confess</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> AI tends to over-promise on your behalf</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> It makes the response shorter</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">AI tends to over-promise. The clause keeps it conservative and stops it offering things you never agreed to.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. What happens if you forget to specify Australian English?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> The AI refuses to reply</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> You typically get US spellings like &ldquo;analyze&rdquo; and &ldquo;color&rdquo;</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Output is automatically translated to Mandarin</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">You will get US spellings. Most models default to American English unless explicitly told otherwise.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. The homework asks you to do what?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Memorise all ten prompts</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Pick three and use them on real tasks today</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Buy a paid plan</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Pick three and use them on real tasks today. The point is doing, not collecting.</p>
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
