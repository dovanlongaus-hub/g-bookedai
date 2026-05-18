import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
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
import { FlowFiveStep } from '@/components/illustrations/flow-five-step';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'AI Capstone Mini-Project — Beginner AI Lesson 14 | LongCare Academy',
  description:
    'Pick a small AI project, write a one-page spec, ship it in a two-day sprint and share it publicly. Capstone for the Beginner AI path with four AU-flavoured templates.',
  path: '/academy/beginner-ai/lessons/ai-capstone-mini-project',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'AI Capstone — Build & Ship Your First Real AI Project',
  educationalLevel: 'Beginner',
  learningResourceType: 'Lesson',
  timeRequired: 'PT30M',
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

export default function AiCapstoneMiniProjectLessonPage() {
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
            { name: 'AI Capstone Mini-Project', url: '/academy/beginner-ai/lessons/ai-capstone-mini-project' },
          ]}
        />
      </div>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Sparkles className="size-3" /> Lesson 14 of 14 · Capstone
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 30 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              AI capstone — build &amp; ship your first real AI project
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Knowledge without shipping is hobby. This capstone walks you through choosing,
              spec-ing and shipping a small but real AI project in a two-day sprint. Then we
              show you how to share it publicly so the next round is easier.
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
            The capstone in five steps
          </h3>
          <div className="flex justify-center">
            <FlowFiveStep width={720} height={180} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Pick → Spec → Build → Test → Ship. Each step has a clean exit. If you stall, the
            template for the next step is one paragraph below.
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
            <span className="text-sm">Video coming Q3 2026 · 30 min</span>
            <span className="mt-2 text-xs text-white/60 max-w-md text-center">
              Walk-through screencast in production. The transcript below is the full lesson.
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Why a capstone — and why now</h3>
          <p className="mt-2 text-slate-700">
            For 13 lessons you have learned about AI. The capstone closes the loop — you build
            something small and real, and you ship it where someone other than you can see it.
            That public step matters. It changes the question from &ldquo;how does AI work?&rdquo;
            to &ldquo;how do I work with AI?&rdquo; — and that second question is the one that
            unlocks the next path. AU SMEs we coach who do a capstone are 4x more likely to
            keep AI in their daily workflow six months later. Shipping creates evidence,
            evidence creates confidence, confidence creates a habit.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Step 1 — Pick (30 minutes)</h3>
          <p className="mt-2 text-slate-700">
            Choose one of four templates. The goal is something useful enough to keep using, but
            small enough to finish in two days. The four templates we use with AU founders are:
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li>
              <strong>Personal CRM.</strong> A Google Sheet of every person you care about
              keeping in touch with, with an AI-powered &ldquo;who should I message this week?&rdquo;
              prompt. Two days of work, three years of payoff.
            </li>
            <li>
              <strong>Email triage assistant.</strong> An AI workflow (Zapier or Make free tier)
              that reads inbound emails and tags them Urgent / Reply Today / Reply This Week /
              FYI. AUD cost: usually under $20/month.
            </li>
            <li>
              <strong>Social content calendar.</strong> A 4-week content calendar generated by
              AI from your 5 best LinkedIn posts and 3 customer testimonials, scheduled to
              Buffer or Hootsuite.
            </li>
            <li>
              <strong>Study buddy.</strong> A custom GPT or Gem trained on whatever you are
              learning (a TAFE textbook, a CPA module, a language) that quizzes you daily.
            </li>
          </ul>
          <p className="mt-2 text-slate-700">
            Pick the template whose payoff is highest in <em>your</em> world. The best capstone
            is the one you will still be using on day 90.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Step 2 — Spec (45 minutes)</h3>
          <p className="mt-2 text-slate-700">
            Open a fresh page and write a one-page spec. Use these headings: <em>What problem
            am I solving?</em>, <em>Who is the user (me, my team, my customers)?</em>,
            <em> What does success look like in one sentence?</em>, <em>What does the AI do at
            each step?</em>, <em>What does the human do?</em>, <em>What is the AUD budget per
            month?</em>, <em>What data goes in — and is any of it sensitive?</em> The privacy
            question is non-negotiable for AU operators. If your spec touches customer data,
            run the Privacy Act 1988 APP 1, 6 and 11 checks from lesson 6 before you build.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Step 3 — Build (one or two short sittings)</h3>
          <p className="mt-2 text-slate-700">
            Block two 90-minute sittings on consecutive days. Sitting one: get the AI part
            working in isolation — write the prompt, paste in sample data, get one good output
            by hand. Sitting two: connect the wires — Zapier trigger, Google Sheet, Buffer
            schedule, whatever the project needs. The biggest gotcha is trying to make it
            perfect in sitting one. Done is the only definition that matters. We have a
            Melbourne client whose first capstone CRM was an ugly Google Sheet with a
            ChatGPT-generated message column. Three years later she still uses it; the polish
            never came and never mattered.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Step 4 — Test (45 minutes)</h3>
          <p className="mt-2 text-slate-700">
            Run your capstone on five real inputs. For the CRM, pick five real names. For email
            triage, run it on yesterday&rsquo;s inbox. For social calendar, generate a real
            week. Score each output: is it usable as-is, usable with a 30-second edit, or
            unusable? If more than one in five is unusable, the prompt needs work — usually
            more context or one good example. The output validation patterns lesson in the
            Prompt Engineering path is a great follow-up if this becomes your bottleneck.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Step 5 — Ship (30 minutes)</h3>
          <p className="mt-2 text-slate-700">
            Shipping has two parts. Internal: make the capstone part of your real workflow this
            week — put it on the dock, in the calendar, in the morning routine. External: write
            a 4-paragraph LinkedIn post (we have a template below) explaining what you built,
            what you learned, what was harder than expected. Tag #AI #AustralianSME and
            @LongCareAU if you want to be re-shared. About 60% of capstone alumni get at least
            one new client conversation from this post alone. Shipping in public is marketing
            you do not have to fake.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The LinkedIn share template</h3>
          <p className="mt-2 text-slate-700">
            <em>I built a small AI [project type] in two days. Here is what happened. (1) The
            problem I had was [X]. (2) The build was simpler than I expected — [tool],
            [trigger], [AI step], [output]. (3) The hard part was [Y]. (4) The next thing I am
            going to try is [Z]. If you want the template, comment below.</em> That post format
            consistently lands 5-50x normal reach for AU SME accounts because it is specific,
            honest, and useful.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Celebrate, then choose the next path</h3>
          <p className="mt-2 text-slate-700">
            Congratulations — you have completed the Beginner AI path and built your first real
            AI project. The natural next step depends on your role. Run a small business? AI
            for Business is the next path. Knowledge worker? AI Productivity. Want to write
            great prompts at depth? Prompt Engineering. Builder mindset? AI Automation. Each
            path follows the same 14-lesson rhythm and ends with its own capstone. Pick one,
            start lesson 1, and book the next 30-day sprint in your calendar.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Share your capstone with the AU community</h3>
          <p className="mt-2 text-slate-700">
            We curate a monthly &ldquo;AU Capstone Showcase&rdquo; on the LongCare site and in
            our newsletter. Submit yours by tagging @LongCareAU on LinkedIn or emailing
            community@longcare.au. We share the best three each month with permission and a
            full credit. Several alumni have been hired or won speaking spots off the back of
            a single capstone share — it is a small but unusually high-leverage door.
          </p>
        </article>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Pick small, real, and personally useful — finish in two days, keep using for years.',
              'Write a one-page spec including the AU Privacy Act APP 1/6/11 check before you build.',
              'Two 90-minute sittings is enough — done beats perfect on a capstone.',
              'Test on five real inputs; if more than one in five is unusable, fix the prompt, not the tool.',
              'Ship internally (use it this week) and externally (LinkedIn post) on the same day.',
              'Choose the next path the day you ship — momentum is the most valuable side effect of shipping.',
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
          <p className="text-sm text-slate-600 mb-4">One short hands-on exercise. Total time: 25 minutes.</p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Exercise: Pick and spec your capstone today</p>
            <p className="mt-2">
              Do not skip ahead. The point of this exercise is to leave with a one-page spec.
            </p>
            <ol className="mt-3 list-decimal pl-6 space-y-1">
              <li>Pick one of the four templates (CRM, email triage, content calendar, study buddy).</li>
              <li>Write the seven spec headings on a page and answer each in one sentence.</li>
              <li>Run the Privacy Act APP 1 / 6 / 11 sanity check on any data the project touches.</li>
              <li>Block two 90-minute sittings on the next two weekdays.</li>
              <li>Tell one person (your buddy from lesson 13) what you are building and when you will ship.</li>
            </ol>
            <p className="mt-3">
              The spec is the deliverable today. Build day is the day after tomorrow.
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
                1. What is the right size of a capstone project?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Big enough to impress a future investor</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Small enough to ship in two days and useful enough to keep using</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Bigger than any individual lesson covered</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Small enough to ship in two days, useful enough to keep using. Big capstones rarely ship.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. Why include the AU Privacy Act APP 1/6/11 check in the spec?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> It is a nice-to-have</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Any project that handles personal information is regulated under AU law and the spec is the right time to check</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Because Zapier requires it</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">It is a legal obligation under the Privacy Act 1988. Spec time is the cheapest time to discover a problem.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. What does &ldquo;shipping&rdquo; mean for a capstone?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Pushing code to GitHub</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Using it in your real workflow AND telling at least one external audience about it</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Showing it to family at dinner</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Internal use plus external share. Both happen on the same day or the post never gets written.</p>
              </details>
            </fieldset>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Path complete</p>
            <h3 className="text-lg font-semibold text-slate-900 mt-1">
              You have finished the Beginner AI path — capstone done.
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Fourteen lessons, one shipped project. Pick your next path: AI for Business, AI
              Productivity, Prompt Engineering or AI Automation. Each is fourteen lessons with
              its own capstone.
            </p>
          </div>
          <a
            href="#"
            aria-disabled="true"
            tabIndex={-1}
            className="inline-flex items-center gap-2 bg-slate-300 text-slate-500 font-medium px-5 py-2.5 rounded-lg pointer-events-none cursor-not-allowed select-none"
          >
            Advanced bootcamps — Q4 2026
          </a>
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
