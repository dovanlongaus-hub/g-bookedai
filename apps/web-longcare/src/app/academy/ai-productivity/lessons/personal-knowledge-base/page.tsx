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
import { FlowFiveStep } from '@/components/illustrations/flow-five-step';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'Building Your AI-Powered Personal Knowledge Base | AI Productivity Lesson 8 | LongCare Academy',
  description:
    'Notion AI, Obsidian, Mem.ai, Roam, Heptabase and NotebookLM compared with AUD pricing. The capture–process–connect–retrieve loop, three starter templates, and AU privacy notes.',
  path: '/academy/ai-productivity/lessons/personal-knowledge-base',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Building Your AI-Powered Personal Knowledge Base',
  educationalLevel: 'Professionals',
  learningResourceType: 'Lesson',
  timeRequired: 'PT30M',
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

export default function PersonalKnowledgeBaseLessonPage() {
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
            { name: 'Personal Knowledge Base', url: '/academy/ai-productivity/lessons/personal-knowledge-base' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Zap className="size-3" /> Lesson 8 of 8
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 30 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Building your AI-powered personal knowledge base
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              A “second brain” that captures, processes, connects and retrieves what you read,
              think and learn — with AI quietly accelerating each step.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
              >
                Mark complete &amp; finish path <ArrowRight className="size-4" />
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

      {/* Inline flow */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            The PKB loop, AI-accelerated
          </h3>
          <div className="flex justify-center">
            <FlowFiveStep width={720} height={140} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Capture &rarr; Process &rarr; Connect &rarr; Retrieve &rarr; Compose. AI helps in every
            step but does not replace the thinking.
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
            <span className="text-sm">Video coming Q3 2026 · 30 min</span>
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

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Why a personal knowledge base, why now</h3>
          <p className="mt-2 text-slate-700">
            Most professionals consume a stunning amount of information — articles, podcasts,
            meetings, books, conversations — and retain very little of it. A personal knowledge
            base (PKB), or “second brain”, is a deliberate system that captures the bits worth
            keeping and makes them retrievable when you need them six months later. The reason now
            is that AI changed the economics. Capture is faster (voice), processing is faster
            (summarise), connecting is faster (semantic search), and retrieval is conversational
            (“what did I write about X last quarter?”). A PKB without AI is admin; a PKB with AI
            is a leverage tool.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The six tools that matter in 2026</h3>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Notion AI</strong> (workspace around <strong>A$24/user/month inc GST</strong>) — best for teams. Wiki-meets-database, AI Q&amp;A across your workspace. The default for most AU SMEs.</li>
            <li><strong>Obsidian + AI plugins</strong> (Sync around <strong>A$15/month inc GST</strong>) — local-first markdown notes, plugins for Claude/OpenAI/Ollama integration. Best for privacy-conscious solo users; data stays on your device.</li>
            <li><strong>Mem.ai</strong> (Pro around <strong>A$15/month inc GST</strong>) — AI-native PKB that auto-tags and surfaces relevant notes during typing. Best for capture-first workflows.</li>
            <li><strong>Roam Research</strong> (around <strong>A$25/month inc GST</strong>) — graph-based note tool with deep block referencing. Best for researchers and writers; steeper learning curve.</li>
            <li><strong>Heptabase</strong> (around <strong>A$15/month inc GST</strong>) — visual whiteboard meets card-based notes. Best for visual thinkers and project-based knowledge.</li>
            <li><strong>NotebookLM</strong> (free; or inside Workspace at around <strong>A$33/user/month inc GST</strong>) — Google’s research-focused notebook. Excellent for upload-and-question workflows; not a replacement for a daily-notes PKB.</li>
          </ul>
          <p className="mt-2 text-slate-700">
            Most professionals end up with one daily-notes home (Notion or Obsidian) plus
            NotebookLM as a research sidecar.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The capture &rarr; process &rarr; connect &rarr; retrieve loop</h3>
          <p className="mt-2 text-slate-700">
            Tiago Forte popularised this loop in <em>Building a Second Brain</em>. AI changes the
            economics of every step.
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Capture</strong> — voice memos, web clipper, mobile widget, email forwarding. AI transcribes and tags on arrival.</li>
            <li><strong>Process</strong> — daily 10-minute review. AI summarises long captures into a paragraph, extracts action items.</li>
            <li><strong>Connect</strong> — link notes to projects, areas, resources. AI surfaces semantically related notes you forgot existed.</li>
            <li><strong>Retrieve</strong> — conversational search: <em>“What did I write about supplier negotiation last year?”</em></li>
            <li><strong>Compose</strong> — the output of a PKB is new writing. AI drafts from your own notes — it sounds like you because the source material is yours.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Sample PARA structure</h3>
          <p className="mt-2 text-slate-700">
            The PARA method (Tiago Forte) gives you a single, four-folder structure that scales.
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>P — Projects</strong> (active, deadline-bound work). One folder per project.</li>
            <li><strong>A — Areas</strong> (ongoing responsibilities). One folder per area: Finance, Health, Sales, Family.</li>
            <li><strong>R — Resources</strong> (reference material). Topics you care about: AI, marketing, philosophy.</li>
            <li><strong>A — Archive</strong> (completed projects, retired areas). Searchable, not in your face.</li>
          </ul>
          <p className="mt-2 text-slate-700">
            Plus a <strong>Daily notes</strong> folder where everything starts. Capture today, file
            tomorrow.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Three starter templates</h3>
          <p className="mt-2 text-slate-700">
            Build these three templates first; they cover 80% of the value.
          </p>
          <ol className="mt-2 list-decimal pl-6 text-slate-700">
            <li><strong>Meeting notes template.</strong> Title, date, attendees, decisions, actions, next steps, AI-generated summary at the bottom.</li>
            <li><strong>Reading log.</strong> Source, date, three takeaways, one quote, one question, link to related notes.</li>
            <li><strong>Decision journal.</strong> Date, decision, context, options considered, why chose this, what would change my mind, review date. AI helps surface the rationale months later.</li>
          </ol>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">AU privacy and data residency</h3>
          <p className="mt-2 text-slate-700">
            Your PKB will hold your most candid thinking. Where the data lives matters.
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Notion</strong> — US-hosted by default; Enterprise tier offers data-residency options. APP 8 (cross-border disclosure) applies — disclose in your privacy policy if you store client data here.</li>
            <li><strong>Obsidian</strong> — local-first; data on your device unless you opt into Sync (which is encrypted, end-to-end, US-hosted).</li>
            <li><strong>Mem.ai, Roam, Heptabase</strong> — US-hosted; verify enterprise options if needed.</li>
            <li><strong>NotebookLM in Workspace</strong> — runs inside your Google tenant; admin can configure region and retention.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The thirty-minute MVP</h3>
          <p className="mt-2 text-slate-700">
            Set a thirty-minute timer. By the end of it you will have a working PKB.
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li>0–5 min: Sign up for Notion or Obsidian. Pick one. Do not deliberate.</li>
            <li>5–10 min: Create four folders — Projects, Areas, Resources, Archive — plus a Daily notes folder.</li>
            <li>10–18 min: Build the three templates above. Use AI to draft them: <em>“Generate a meeting notes template with sections: title, date, attendees, decisions, actions, next steps, AI summary.”</em></li>
            <li>18–25 min: Capture three things from today — a meeting, a thought, a link.</li>
            <li>25–30 min: Configure capture friction reduction — pin the app, install the mobile widget, add a global hotkey.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Habit-stacking the PKB</h3>
          <p className="mt-2 text-slate-700">
            A PKB lives or dies on daily review. Three habits that lock it in:
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Morning capture review</strong> — first ten minutes of the day, file yesterday’s captures.</li>
            <li><strong>Friday weekly review</strong> — fifteen minutes; AI generates a summary of the week from your daily notes.</li>
            <li><strong>Quarterly retrospective</strong> — re-read your decision journal entries from the previous quarter. Update tags. Notice patterns.</li>
          </ul>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'AI changed PKB economics: capture faster, process faster, connect faster, retrieve conversationally, compose from your own notes.',
              'Pick one daily-notes home (Notion for teams, Obsidian for privacy-conscious solos) plus NotebookLM as a research sidecar.',
              'Use the PARA structure: Projects, Areas, Resources, Archive — plus a Daily notes folder.',
              'Build three starter templates first: meeting notes, reading log, decision journal. They cover 80% of the value.',
              'Notion is US-hosted; Obsidian is local-first. Choose based on what you store and your AU APP 8 obligations.',
              'A PKB lives on daily and weekly reviews. Without the review habit, the system rots within a month.',
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
            <p className="font-semibold text-slate-900">Exercise: Build your thirty-minute PKB MVP</p>
            <p className="mt-2">
              Set a timer. The aim is a working system, not a perfect one. You can refactor next
              quarter.
            </p>
            <ol className="mt-3 list-decimal pl-6 space-y-1">
              <li>Sign up for Notion or Obsidian. Pick the one your gut says first.</li>
              <li>Create five folders: Projects, Areas, Resources, Archive, Daily notes.</li>
              <li>Build the three templates: meeting notes, reading log, decision journal. Use AI to draft them.</li>
              <li>Capture three things from today — a meeting outcome, an idea, a link you want to revisit.</li>
              <li>Pin the app, install the mobile widget, add a hotkey or shortcut.</li>
              <li>Diary tomorrow morning: ten-minute capture review. Diary Friday: fifteen-minute weekly review.</li>
            </ol>
            <p className="mt-3">In thirty days, return to this lesson and assess what stuck.</p>
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
                1. Which tool is best for a privacy-conscious solo user who wants notes on their device?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Notion</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Obsidian</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Mem.ai</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Obsidian. Local-first, data on your device, AI plugins for Claude/OpenAI/Ollama.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. What does PARA stand for?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Projects, Areas, Resources, Archive</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Plan, Act, Review, Adjust</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> People, Activities, Relationships, Assets</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Projects, Areas, Resources, Archive. Tiago Forte’s four-folder structure that scales for almost any role.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. What is the most important habit to make a PKB last past month one?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Building dozens of templates</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Daily and weekly review</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Paying for the most expensive plan</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Daily and weekly review. Without it, captures pile up unprocessed and the system rots within a month.</p>
              </details>
            </fieldset>
          </div>
        </div>
      </section>

      {/* Next lesson preview */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Up next · Lesson 9</p>
            <h3 className="text-lg font-semibold text-slate-900 mt-1">
              AI for travel, planning and life admin — capstone
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              The capstone lands with the full Academy in Q3 2026 — pull every productivity skill
              into one weekend project.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
          >
            Notify me <ArrowRight className="size-4" />
          </a>
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
