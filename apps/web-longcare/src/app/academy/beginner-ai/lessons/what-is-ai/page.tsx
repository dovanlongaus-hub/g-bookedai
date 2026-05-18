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
  title: 'What is AI? — Beginner AI Lesson 1 | LongCare Academy',
  description:
    'A practical, jargon-free explanation of what modern AI tools actually do — and don’t do — for Australian SMEs. Free first lesson.',
  path: '/academy/beginner-ai/lessons/what-is-ai',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'What is AI? — A Practical Overview',
  educationalLevel: 'Beginner',
  learningResourceType: 'Lesson',
  timeRequired: 'PT15M',
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

export default function WhatIsAILessonPage() {
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
            { name: 'What is AI?', url: '/academy/beginner-ai/lessons/what-is-ai' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Sparkles className="size-3" /> Lesson 1 of 8
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 15 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Start course free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              What is AI? A practical overview for non-techies
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Forget the sci-fi. In the next 15 minutes you’ll understand exactly what today’s AI
              tools do, where they shine for Australian small businesses, and where they fall flat.
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

      {/* Inline mental model — Input -> AI -> Output */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            The mental model in one diagram
          </h3>
          <div className="flex justify-center">
            <FlowThreeStep width={720} height={140} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            You feed an AI tool an input (a question, a document, a photo). It produces an output (a draft,
            a summary, a tag). Everything else in this course is variations on that single shape.
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
            <span className="text-sm">Video coming Q3 2026 · 15 min</span>
            <span className="mt-2 text-xs text-white/60 max-w-md text-center">
              While we finish production, the full transcript and exercises below cover everything the video will teach.
            </span>
          </div>
        </div>
      </section>

      {/* Transcript */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">A plain-English definition</h3>
          <p className="mt-2 text-slate-700">
            “AI” in 2026 is, for the most part, a marketing term wrapped around one specific
            technology: <strong>Large Language Models</strong> (LLMs). ChatGPT, Google’s Gemini, and
            Anthropic’s Claude are all LLMs. So is the writing assistant inside Google Docs and
            the chat helper that just appeared in your accounting software.
          </p>
          <p className="mt-2 text-slate-700">
            Strip away the hype and an LLM does one thing astonishingly well: it predicts the next
            word in a sequence, billions of times per second, having been trained on a huge slice
            of the public internet and licensed books. That’s it. Everything else — writing
            emails, summarising contracts, generating code — is downstream of that single
            capability: <em>pattern-matching at scale</em>.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">What modern AI is good at</h3>
          <p className="mt-2 text-slate-700">
            Because LLMs have absorbed so much written language, they’re excellent at jobs that
            look like “take some text and turn it into other text”. In practical Australian SME
            terms, that means:
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Drafting</strong> — emails, proposals, social posts, FAQs.</li>
            <li><strong>Summarising</strong> — long reports, meeting transcripts, customer threads.</li>
            <li><strong>Classifying</strong> — tagging support tickets, sorting leads, routing forms.</li>
            <li><strong>Conversing</strong> — answering FAQs, qualifying leads, holding small talk.</li>
            <li><strong>Transforming</strong> — turning a voice memo into minutes, a CSV into a chart description, a contract into a plain-English summary.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">What modern AI is NOT good at (be honest)</h3>
          <p className="mt-2 text-slate-700">
            This part is where most people get burned. AI today is genuinely weak at:
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Real-time facts.</strong> Unless a tool explicitly browses the web, the model only knows what was in its training data — sometimes a year or more old.</li>
            <li><strong>Perfect reasoning.</strong> Multi-step maths, complex legal logic, or anything requiring a single correct answer is risky without a human checking.</li>
            <li><strong>Secrecy.</strong> Anything you paste may be logged. Treat free chat tools like sending a postcard, not a sealed letter.</li>
            <li><strong>Creativity from nothing.</strong> AI is fantastic at remixing what exists; it’s mediocre at genuinely novel ideas. The first draft is yours; the polish is AI’s.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Three real Australian examples</h3>
          <p className="mt-2 text-slate-700">
            Hype is cheap. Here’s what AI is actually doing for AU small businesses today:
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li>A Surry Hills café owner uses ChatGPT every morning to translate the daily specials board into Mandarin and Korean for nearby international students. Two minutes, no agency, no PDF.</li>
            <li>A Melbourne real-estate agent feeds the property notes from inspections into Gemini and gets a polished listing description in the agency’s house style — saving roughly 25 minutes per property.</li>
            <li>A regional GP in Bendigo uses Claude to draft replies to repeat-prescription requests for her receptionist to review and send. No clinical decisions are automated; only the wording.</li>
          </ul>
          <p className="mt-2 text-slate-700">
            Notice the pattern: humans stay in charge of judgement and final approval. AI just removes the typing.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Common myths, debunked</h3>
          <p className="mt-2 text-slate-700">
            <strong>“AI is always right.”</strong> No. It’s confidently wrong about ~5–10% of factual
            questions, depending on the model and the topic. Always verify anything that matters.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>“AI will replace my job.”</strong> The jobs at risk are the
            ones that are <em>only</em> typing. If your role involves judgement, relationships, or
            physical work, AI is a tool that makes you faster, not a replacement.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>“I need to learn to code first.”</strong> No. Modern AI tools take plain English.
            If you can write a clear email to a new staff member, you can prompt an AI.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Why now?</h3>
          <p className="mt-2 text-slate-700">
            For Australian SMEs, three things changed in the last 24 months: prices collapsed
            (you can do real work for cents per task), tools became multilingual (huge for our
            migrant business community), and integrations matured (Gemini lives inside Google
            Workspace, Copilot lives inside Microsoft 365). The barrier to entry is now “can you
            type a sentence?” — not a six-figure consulting engagement. That’s why the next
            seven lessons are worth your time.
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Modern AI is mostly Large Language Models — sophisticated pattern matchers, not thinking machines.',
              'AI excels at drafting, summarising, classifying, conversing, and transforming text.',
              'AI is weak at real-time facts, complex reasoning, secrecy, and genuine novelty — verify what matters.',
              'For AU SMEs, AI removes typing while humans keep final judgement.',
              'You don’t need to code or have a maths degree — plain English is the new programming language.',
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
            One short hands-on exercise. Total time: 5 minutes.
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Exercise: Your first useful prompt</p>
            <p className="mt-2">
              Open ChatGPT, Gemini, or Claude. Type one prompt about your actual business, in this
              shape:
            </p>
            <p className="mt-3 italic">
              “I run a [your business] in [your suburb]. Write three short Instagram captions
              announcing [your next event/offer/news] in a friendly, Australian voice. Each caption
              under 30 words.”
            </p>
            <p className="mt-3">
              Read the output critically. Which caption would you actually post? What would you
              change? That gut feel is the muscle this whole course is going to build.
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
                1. Which task is modern AI <em>most</em> reliable at?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Predicting tomorrow’s ASX share prices</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Summarising a 20-page meeting transcript</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Filing your BAS without review</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Summarising a transcript. Predicting prices and unsupervised tax filings are exactly the high-stakes, real-time-fact jobs AI gets wrong.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. Why shouldn’t you paste a confidential client list into a free AI chat tool?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> The AI will refuse to read it</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Inputs may be logged and used for training</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> It will slow your computer down</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Inputs may be logged and used for training. Privacy is covered properly in lesson 7.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. The Bendigo GP example shows AI being used to&hellip;
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Diagnose patients automatically</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Draft routine replies for a human to review</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Replace the receptionist</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Draft routine replies for a human to review. Humans always stay on the clinical and approval loop.</p>
              </details>
            </fieldset>
          </div>
        </div>
      </section>

      {/* Next lesson preview */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Up next · Lesson 2</p>
            <h3 className="text-lg font-semibold text-slate-900 mt-1">
              Setting up ChatGPT, Gemini, and Claude accounts
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              The cleanest 20-minute setup for the three tools every Australian should have.
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
