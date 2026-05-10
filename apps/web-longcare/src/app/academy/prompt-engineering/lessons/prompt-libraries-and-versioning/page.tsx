import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  GraduationCap,
  MessageSquareCode,
  Play,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { HeroToolkit } from '@/components/illustrations/hero-toolkit';
import { FlowFiveStep } from '@/components/illustrations/flow-five-step';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'Prompt Libraries & Versioning — Treat Prompts Like Code | Prompt Engineering Lesson 5 | LongCare Academy',
  description:
    'Build a living prompt library with proper versioning. Folder patterns, change logs, retired patterns, sharing rules, and a five-prompt starter library for AU SMEs.',
  path: '/academy/prompt-engineering/lessons/prompt-libraries-and-versioning',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Prompt Libraries & Versioning — Treat Prompts Like Code',
  educationalLevel: 'Intermediate',
  learningResourceType: 'Lesson',
  timeRequired: 'PT20M',
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

export default function PromptLibrariesAndVersioningLessonPage() {
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
            { name: 'Prompt Libraries & Versioning', url: '/academy/prompt-engineering/lessons/prompt-libraries-and-versioning' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <MessageSquareCode className="size-3" /> Lesson 5 of 8
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 20 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Prompt libraries &amp; versioning &mdash; treat prompts like code
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              The prompts you wrote three months ago are an asset. Stop rewriting them. Build a
              library, version every change, and your team gets compounding leverage.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
              >
                Mark complete &amp; next <ArrowRight className="size-4" />
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
            <HeroToolkit className="text-sky-700" width={420} height={320} />
          </div>
        </div>
      </section>

      {/* Inline flow */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            Library lifecycle: draft &rarr; test &rarr; document &rarr; share &rarr; version
          </h3>
          <div className="flex justify-center">
            <FlowFiveStep width={720} height={180} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Every prompt in your library should pass through these five steps. Skip any of them
            and the library decays into noise.
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
              Walk-through screencast in production. The transcript below covers the full lifecycle.
            </span>
          </div>
        </div>
      </section>

      {/* Transcript */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Why a prompt library?</h3>
          <p className="mt-2 text-slate-700">
            By month three of using AI seriously, your team has written 200 prompts. About 30 of
            them work brilliantly. The other 170 were dead ends, half-finished thoughts, or
            duplicates of each other. Without a library, the 30 good ones live in someone&rsquo;s
            chat history, and when that person leaves, the knowledge leaves with them. A prompt
            library does three things: <strong>consistency</strong> (everyone uses the prompt that
            actually works), <strong>discoverability</strong> (new staff find what already
            exists), and <strong>compounding</strong> (improvements flow back to one canonical
            version).
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Tool options compared</h3>
          <p className="mt-2 text-slate-700">
            <strong>PromptLayer.</strong> A purpose-built prompt registry with version control,
            A/B testing, observability. About <strong>AUD&nbsp;$80/month</strong> for the team
            tier. Best if you have engineers running production prompts.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Notion + tags.</strong> Free or about <strong>AUD&nbsp;$15/seat/month</strong>
            for Plus. The lowest-friction option for non-technical teams. Each prompt is a Notion
            page; tags handle categorisation; database views give you discoverability.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>GitHub repo (markdown).</strong> Free for private repos. Best for teams already
            in Git. Pull requests handle versioning, code review, and audit trail naturally.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Anthropic Workbench.</strong> Built into Claude Pro and Team. Saves prompts
            with versioning, lets you run them against different models, exposes A/B testing
            paths.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Google Docs / Drive folder.</strong> Free with Workspace. Surprisingly
            effective for small teams &mdash; full search, comment threads, version history out of
            the box. Don&rsquo;t over-engineer.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Folder structure pattern</h3>
          <p className="mt-2 text-slate-700">
            Organise <strong>by use case &gt; role &gt; scenario</strong>. Example:
          </p>
          <pre className="mt-2 bg-slate-50 border border-slate-200 rounded-md p-4 text-xs text-slate-800 whitespace-pre-wrap">{`/prompts
  /customer-support
    /support-agent
      reply-billing-question.md
      reply-refund-request.md
      escalate-to-manager.md
    /sales
      qualify-inbound-lead.md
      follow-up-no-response.md
  /marketing
    /content
      week-of-social.md
      blog-from-voice-memo.md
  /operations
    /finance
      bas-prep-pre-flight.md
      supplier-invoice-extract.md`}</pre>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Versioning &mdash; v1, v2, v3</h3>
          <p className="mt-2 text-slate-700">
            Every prompt file should have a header block with version, last updated, owner, and
            change log:
          </p>
          <pre className="mt-2 bg-slate-50 border border-slate-200 rounded-md p-4 text-xs text-slate-800 whitespace-pre-wrap">{`---
title: Reply to billing question
version: v3
owner: priya@longcare.au
last-updated: 2026-04-12
status: live
models-tested: GPT-5, Claude 4 Sonnet, Gemini 2.5 Pro
---

## Change log
- v3 (2026-04-12) — Added GST mention; sharper closing line
- v2 (2026-02-18) — Switched to Australian English custom instruction
- v1 (2026-01-05) — Initial draft

## System prompt
...

## User prompt template
...

## Expected output
...

## Notes / known failure modes
...`}</pre>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Retired patterns</h3>
          <p className="mt-2 text-slate-700">
            Don&rsquo;t delete old prompts &mdash; move them to <code>/retired</code>. Mark with
            status <em>retired</em> and a one-line reason: <em>&ldquo;Replaced by v3 because the
            base model now handles GST mention without explicit instruction.&rdquo;</em> When a
            new joiner asks &ldquo;why don&rsquo;t we do X anymore?&rdquo;, the retired folder is
            your answer.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Sharing across teams &mdash; safely</h3>
          <p className="mt-2 text-slate-700">
            The privacy-safe template is built without real customer data. Use placeholders:
            <code> [CUSTOMER NAME]</code>, <code>[ORDER ID]</code>, <code>[PRODUCT]</code>. This
            is also great for pasteability &mdash; team members can grab a template and fill it in
            for their own situation. Resist the urge to include real example outputs that contain
            real customer data; redact or synthesise instead.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Living-library cadence</h3>
          <p className="mt-2 text-slate-700">
            Once a month, schedule a 30-minute review: which prompts ran most? Which produced
            below-average results? Which models have shifted (e.g. ChatGPT released a new
            version)? Update, version, retire. The library that doesn&rsquo;t get reviewed
            silently rots.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Five-prompt starter library</h3>
          <p className="mt-2 text-slate-700">
            Start with these five &mdash; the highest-frequency tasks for most AU SMEs:
          </p>
          <ol className="mt-2 list-decimal pl-6 text-slate-700">
            <li><strong>Customer reply &mdash; standard.</strong> Answer common queries in brand voice.</li>
            <li><strong>Customer reply &mdash; complaint.</strong> Acknowledge, empathise, propose action, AU consumer-law-aware.</li>
            <li><strong>Quote/proposal email.</strong> Pull line items, totals with GST, signature.</li>
            <li><strong>Meeting summary.</strong> From transcript &rarr; decisions, actions, owners.</li>
            <li><strong>LinkedIn post.</strong> From topic &rarr; 200&ndash;400 words, AU English, friendly + professional.</li>
          </ol>
          <p className="mt-2 text-slate-700">
            These five cover roughly 60% of daily AI use for most office-based SMEs. Document each
            once. Iterate quarterly.
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'A library converts scattered chat-history wisdom into shared, compounding team capability.',
              'Notion or a Google Drive folder is enough for most SMEs — don\'t over-engineer.',
              'Version every prompt: v1 / v2 / v3 with header block and change log.',
              'Move retired prompts to /retired with a one-line reason — never delete.',
              'Use placeholders, not real customer data, in shared templates.',
              'Schedule a 30-minute monthly review or the library rots silently.',
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
            <p className="font-semibold text-slate-900">Exercise: Set up a five-prompt library in Notion or Drive</p>
            <p className="mt-2">
              Create a parent folder called <code>/prompts</code>. Inside, make subfolders for
              the five starter use cases above. Migrate one of your best existing prompts into
              each &mdash; at v1 &mdash; with a header block, change log, and known failure
              modes.
            </p>
            <p className="mt-3">
              Add one teammate as a viewer/editor. Set a calendar reminder to review and version
              in 30 days. Note the library&rsquo;s URL on your team wiki so people can find it.
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
                1. What should you do with a prompt that is no longer used?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Delete it permanently</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Move to /retired with a reason</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Leave it where it is</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Move to /retired with a one-line reason. Future joiners can see why we don&rsquo;t do it that way anymore.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. Which folder pattern keeps a library navigable?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Flat list of all prompts</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Use case &gt; role &gt; scenario</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Alphabetical only</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Use case &gt; role &gt; scenario &mdash; matches how teams think about their work.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. How often should you formally review the library?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Once a year</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Once a month</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Only when something breaks</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Once a month, 30 minutes. Models, tasks, and team needs all shift faster than that.</p>
              </details>
            </fieldset>
          </div>
        </div>
      </section>

      {/* Next lesson preview */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Up next · Lesson 6</p>
            <h3 className="text-lg font-semibold text-slate-900 mt-1">
              System prompts &amp; personas &mdash; set the stage
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              The 5-element system prompt template, custom GPT vs Gem vs Project, plus three
              SME-ready personas.
            </p>
          </div>
          <Link
            href="/academy/prompt-engineering/lessons/system-prompts-and-personas"
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
