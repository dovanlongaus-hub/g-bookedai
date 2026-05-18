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
import { HeroEducation } from '@/components/illustrations/hero-education';
import { FlowFiveStep } from '@/components/illustrations/flow-five-step';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'Learning New Skills 3x Faster with AI — AI Productivity Lesson 11 | LongCare Academy',
  description:
    'The tutor pattern, Feynman technique applied to AI, spaced repetition prompts and a five-step skill acquisition loop. Three real case studies (React, Spanish, public speaking) and AU course platforms at zero monthly cost.',
  path: '/academy/ai-productivity/lessons/ai-for-learning-new-skills',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Learning New Skills 3x Faster with AI',
  educationalLevel: 'Professionals',
  learningResourceType: 'Lesson',
  timeRequired: 'PT25M',
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

export default function AiForLearningNewSkillsLessonPage() {
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
            { name: 'AI for Learning New Skills', url: '/academy/ai-productivity/lessons/ai-for-learning-new-skills' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Zap className="size-3" /> Lesson 11 of 12
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 25 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Learning new skills 3x faster with AI
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Treat AI as a patient, infinite, on-demand tutor and you can compress months of
              learning into weeks. The technique is older than AI &mdash; Socratic tutoring
              &mdash; but ChatGPT and Gemini have made it free at scale for the first time.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/academy/ai-productivity/lessons/personal-ai-assistant-build"
                className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
              >
                Next lesson <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/academy/ai-productivity"
                className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
              >
                <ArrowLeft className="size-4" /> Back to path
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroEducation className="text-sky-700" width={420} height={320} />
          </div>
        </div>
      </section>

      {/* Inline flow */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            The five-step skill acquisition loop
          </h3>
          <div className="flex justify-center">
            <FlowFiveStep width={720} height={140} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Read &rarr; Quiz &rarr; Apply &rarr; Review &rarr; Teach. Each pass through the loop
            roughly doubles your retention versus passive reading alone.
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

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The tutor pattern</h3>
          <p className="mt-2 text-slate-700">
            The most useful single prompt for learning is also the simplest: &ldquo;You are my
            patient, expert tutor in [subject]. Ask me three diagnostic questions to find my
            level, then teach me one concept at a time. After each concept ask me to explain
            it back to you in my own words, correct any errors, and move on. Never lecture
            for more than four sentences without checking in.&rdquo; Drop that into ChatGPT
            Plus, Gemini Pro or Claude and you have a 24/7 tutor for the price of a Netflix
            subscription. The single most important phrase is &ldquo;ask me to explain it back
            to you in my own words&rdquo; &mdash; this forces active recall and is the
            difference between watching and learning.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Feynman technique with AI</h3>
          <p className="mt-2 text-slate-700">
            Richard Feynman&rsquo;s recipe: explain a concept in plain language, identify the
            gaps in your explanation, go back to the source, and try again. AI accelerates
            steps two and three. Try this prompt after you have read or watched something:
            &ldquo;I&rsquo;m going to explain [topic] in my own words. Find every place I am
            wrong, sloppy or hand-waving. Be specific. Then suggest a simpler analogy for the
            two weakest points.&rdquo; The accuracy of AI as a critic of your own explanations
            is genuinely high &mdash; far higher than its accuracy at generating fresh content
            on the same topic, because criticism is easier than synthesis.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Spaced repetition with AI prompts</h3>
          <p className="mt-2 text-slate-700">
            Spaced repetition &mdash; reviewing material at expanding intervals &mdash; doubles
            or triples long-term retention. Traditional tools (Anki, RemNote, Quizlet) require
            you to build the cards. AI removes that friction. Paste your reading and ask:
            &ldquo;Generate 15 spaced-repetition flashcards from this material in
            front/back format, with cloze deletions where appropriate, and tag each by
            difficulty.&rdquo; Import the output to Anki or your favourite tool. A single
            two-hour session can produce three weeks of review material.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The five-step loop in practice</h3>
          <ol className="mt-2 list-decimal pl-6 text-slate-700">
            <li><strong>Read</strong> &mdash; a single source for 25 minutes. Resist the urge to skim multiple sources at once.</li>
            <li><strong>Quiz</strong> &mdash; ask AI for ten questions on what you just read. Answer them without looking back.</li>
            <li><strong>Apply</strong> &mdash; do one small thing with the knowledge. Even five minutes of practice locks it in better than another hour of reading.</li>
            <li><strong>Review</strong> &mdash; explain the concept back to AI in your own words. Let it correct you.</li>
            <li><strong>Teach</strong> &mdash; write a five-sentence note to a hypothetical colleague who is one step behind you. This is the strongest retention move of all.</li>
          </ol>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Three case studies</h3>
          <p className="mt-2 text-slate-700">
            <strong>Case 1: learning React for a side project (Adelaide developer).</strong>
            Goal: build a small AI tool in six weeks. Used Claude as primary tutor, asked for
            one concept per session and a 15-minute coding exercise after each. Built and
            shipped the tool by week five. Total spend: A$30/month on Claude.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Case 2: learning Spanish (Sydney consultant).</strong> Used ChatGPT
            Voice during a Sydney to Melbourne flight at A1 level, returned at A2 ten flights
            later. Pattern: 20 minutes of structured grammar with the tutor pattern, 20
            minutes of free conversation roleplay. Did not need a paid app.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Case 3: public speaking (Brisbane founder).</strong> Recorded the same
            five-minute pitch every Sunday, asked Gemini (with voice input) to score the
            delivery on five dimensions, recommend a single change for next week, and prompt
            with three difficult investor questions. Went from a nervous founder to closing
            seed in nine weeks.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">AU course platforms that pair well with AI</h3>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Open Universities Australia</strong> &mdash; degree-level units from AU institutions, with the AI tutor pattern overlaid.</li>
            <li><strong>RMIT Online</strong> &mdash; short courses in tech, design and business. Pair each module with an AI quiz session.</li>
            <li><strong>edX (Australian universities)</strong> &mdash; UQ, ANU and UWA on the platform. Free audit, paid certificate.</li>
            <li><strong>Coursera (AU campus)</strong> &mdash; Macquarie, Melbourne and others. AI quiz coverage is unmatched for breadth.</li>
            <li><strong>YouTube</strong> &mdash; underrated. Paste a transcript into AI and ask for the five core lessons. Saves hours.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Cost: zero to A$30 a month</h3>
          <p className="mt-2 text-slate-700">
            You can run the entire system on free tiers (ChatGPT free, Gemini free, free
            YouTube) at acceptable quality. The single best A$30/month spend in your learning
            life is a paid Claude, ChatGPT Plus or Gemini Advanced account. The faster model,
            longer context window and voice features genuinely move the dial.
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'The tutor pattern is the single highest-ROI prompt for learning anything new.',
              'AI is a stronger critic of your explanations than a generator of fresh content. Use it for Feynman.',
              'Spaced repetition with AI-generated flashcards doubles retention without doubling work.',
              'Read, quiz, apply, review, teach. Each pass roughly doubles retention versus passive reading.',
              'AU course platforms (RMIT Online, edX, Coursera, Open Uni) pair excellently with AI tutoring.',
              'A$30/month for one paid AI account is the highest-leverage learning spend in 2026.',
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
            <p className="font-semibold text-slate-900">Exercise: Run one full loop on a real skill</p>
            <p className="mt-2">
              Choose one topic you have wanted to learn for six months. Block 30 minutes today.
            </p>
            <ol className="mt-3 list-decimal pl-6 space-y-1">
              <li>Open ChatGPT or Claude. Paste the tutor pattern prompt. Replace [subject] with your topic.</li>
              <li>Answer the three diagnostic questions honestly.</li>
              <li>Learn one concept. Explain it back without looking.</li>
              <li>Apply: do five minutes of related practice (writing, code, conversation, drawing).</li>
              <li>Teach: write a five-sentence note to a friend explaining the concept.</li>
            </ol>
            <p className="mt-3">Repeat tomorrow with the next concept. Within ten sessions you will have moved further than a month of passive consumption.</p>
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
                1. What is the most important phrase in the tutor pattern prompt?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> &ldquo;Be patient&rdquo;</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> &ldquo;Ask me to explain it back to you in my own words&rdquo;</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> &ldquo;Use simple language&rdquo;</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">&ldquo;Ask me to explain it back to you in my own words.&rdquo; That is what creates active recall, which is the entire game.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. Why is AI a better critic of your explanations than a teacher from scratch?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Because criticism is easier than synthesis</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Because models cannot generate anything new</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Because human teachers are biased</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Criticism is easier than synthesis. The model can reliably spot errors in your explanations even on topics where it would not produce ideal fresh content.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. Which of the five loop steps has the strongest retention effect?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Read</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Teach</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Quiz</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Teach. Writing a five-sentence note to a colleague one step behind you is the single highest-retention move in the loop.</p>
              </details>
            </fieldset>
          </div>
        </div>
      </section>

      {/* Next lesson preview */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Up next · Lesson 12</p>
            <h3 className="text-lg font-semibold text-slate-900 mt-1">
              Build your personal AI assistant in 60 minutes
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              ChatGPT Custom GPT vs Gemini Gem vs Claude Project compared, six context fields,
              calendar/email injection, four persona templates and a maintenance cadence.
            </p>
          </div>
          <Link
            href="/academy/ai-productivity/lessons/personal-ai-assistant-build"
            className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
          >
            Continue <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* Footer nav */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-20">
        <div className="flex flex-wrap gap-3">
          <Link
            href="/academy/ai-productivity"
            className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
          >
            <ArrowLeft className="size-4" /> Back to AI Productivity
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
