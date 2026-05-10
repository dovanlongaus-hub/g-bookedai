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
import { HeroToolkit } from '@/components/illustrations/hero-toolkit';
import { FlowAutomation } from '@/components/illustrations/flow-automation';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'Email & Meeting AI — AI Productivity Lesson 2 | LongCare Academy',
  description:
    'Cut 10 hours a week with email and meeting AI. Tool comparison (Gemini, Superhuman, Granola, Otter, Fireflies), AUD pricing, AU consent rules, and three workflows.',
  path: '/academy/ai-productivity/lessons/email-and-meeting-ai',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Email & Meeting AI — Save 10 Hours a Week',
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

export default function EmailAndMeetingAILessonPage() {
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
            { name: 'Email and Meeting AI', url: '/academy/ai-productivity/lessons/email-and-meeting-ai' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Sparkles className="size-3" /> Lesson 2 of 8
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 25 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Email &amp; meeting AI — save 10 hours a week
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              The two activities that drain a knowledge worker&apos;s week — both have mature AI
              answers in 2026. Here is the stack that actually compounds.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
              >
                Mark complete &amp; next <ArrowRight className="size-4" />
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
            The triaged inbox flow
          </h3>
          <div className="flex justify-center">
            <FlowAutomation width={720} height={140} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Inbox &rarr; AI triage &rarr; Drafts &rarr; Send/archive &rarr; Follow-up scheduled.
            Once it&apos;s in place, you stop doing email — email does itself.
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
              Live workflows in Gemini, Superhuman, and Granola.
            </span>
          </div>
        </div>
      </section>

      {/* Transcript */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The 10-hour claim — where does it come from?</h3>
          <p className="mt-2 text-slate-700">
            A typical Australian SME owner or manager spends roughly 12–15 hours a week between
            email, calendar wrangling, and meetings — far more than they think when they audit
            it. Email AI shaves 4–6 hours by drafting, triaging, and summarising. Meeting AI
            shaves another 4–5 hours by killing manual notes, action-item extraction, and
            follow-up emails. Together, the realistic saving is 8–11 hours weekly. We round to
            10 because round numbers stick.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Email AI — the 2026 contenders</h3>
          <p className="mt-2 text-slate-700">
            <strong>Gemini in Google Workspace</strong> (around AUD&nbsp;$33/user/month inc GST):
            best if your business already runs on Gmail. Sidebar offers summarisation, reply
            drafts, and tone shifts inside the message you are reading. No third-party data
            handover.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Superhuman</strong> (around AUD&nbsp;$45/user/month): premium experience,
            keyboard-first, AI Auto-drafts written in your voice. Best for people who live in
            the inbox and value speed over depth.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Apple Intelligence + Mail</strong> (free with Apple ID, hardware required):
            on-device summaries, smart replies, and priority inbox. Privacy advantage: most
            processing stays on the device. Limited to Apple users.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Hey</strong> (around AUD&nbsp;$155/year): not strictly an AI tool, but its
            screening, paper-trail, and feed concepts pair beautifully with ChatGPT for triage.
            Worth knowing about.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>ChatGPT for triage</strong>: free or AUD&nbsp;$32/month Plus. Forward 10
            emails to a chat, ask <em>“cluster these by intent — buy, support, supplier,
            personal — and draft a 3-line reply for each”</em>. The lowest-friction way to start.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Meeting AI — the 2026 contenders</h3>
          <p className="mt-2 text-slate-700">
            <strong>Granola</strong> (around AUD&nbsp;$28/user/month): the favourite of Australian
            knowledge workers in 2026. Listens to your meeting via your laptop microphone, lets
            you take rough notes, and merges them into a polished output. Crucially, it does
            not need to join the meeting as a bot — important for client-side consent rules.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Otter.ai</strong> (around AUD&nbsp;$16/user/month): mature transcription and
            summary. Joins as a bot, which is highly visible to your guests — pros and cons.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Fireflies.ai</strong> (around AUD&nbsp;$30/user/month): bot-based, deeper
            CRM integrations (HubSpot, Salesforce, Pipedrive). Sales teams love it.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Notion AI Q&amp;A</strong>: not a recorder, but if you take meeting notes
            in Notion it will answer “what did the client ask for last meeting?” across your
            entire workspace.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Tactiq</strong> (around AUD&nbsp;$13/user/month): Chrome-extension that
            captures live captions during Google Meet, Zoom, and Teams. Lightweight and cheap.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Privacy — which tools record by default vs. opt-in</h3>
          <p className="mt-2 text-slate-700">
            This matters in Australia. Under the Australian Privacy Principles and most state
            surveillance laws (e.g., NSW Surveillance Devices Act 2007), recording a private
            conversation requires the consent of all participants. Bot-based tools (Otter,
            Fireflies, Read.ai) join the call visibly, which puts the consent moment in the
            host&apos;s hands — they need to ask. On-device tools like Granola and Tactiq are
            invisible to other participants, which makes the consent burden entirely yours.
          </p>
          <p className="mt-2 text-slate-700">
            Practical rule: at the start of any external call, say one sentence — <em>“I&apos;m
            using an AI tool to take notes; the audio is processed for the summary and not
            shared. Happy to turn it off if you&apos;d prefer.”</em> No-one ever says no, and
            you have a clear consent record.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Three workflows you can implement this week</h3>
          <p className="mt-2 text-slate-700"><strong>1. Daily inbox triage (15 min/morning).</strong></p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li>Open Gmail with Gemini sidebar enabled.</li>
            <li>Use the keyboard shortcut to summarise any thread over 5 messages.</li>
            <li>For low-stakes replies (confirmations, scheduling), let AI draft, you skim and send.</li>
            <li>For high-stakes replies, you write the spine, AI polishes for tone.</li>
          </ul>
          <p className="mt-2 text-slate-700"><strong>2. Pre-meeting brief (5 min/meeting).</strong></p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li>The night before, ask your meeting tool: <em>“Summarise the last three meetings with this person, the open action items, and three smart questions to ask.”</em></li>
            <li>Skim it on your morning coffee. You arrive looking like you remembered everything.</li>
          </ul>
          <p className="mt-2 text-slate-700"><strong>3. Post-meeting actions (auto, 0 min).</strong></p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li>Set Granola or Fireflies to auto-email the summary to attendees.</li>
            <li>Connect to Asana, Notion, or Linear so action items become tasks with owners and due dates.</li>
            <li>The single biggest mood-lift in your week: meetings ending with everyone knowing what they agreed to.</li>
          </ul>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Email + meeting AI realistically saves 8–11 hours a week — round to 10.',
              'Pick Gemini if you live in Workspace; Superhuman if you are a keyboard-first inbox-zero person.',
              'Granola is the Australian knowledge-worker favourite — on-device, no bot in the call.',
              'Always announce AI note-taking on external calls; the consent moment is your responsibility.',
              'Three workflows: daily triage, pre-meeting brief, auto post-meeting actions — start with one.',
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
          <p className="text-sm text-slate-600 mb-4">One short hands-on exercise. Total time: 10 minutes.</p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Exercise: Run a real inbox triage with AI</p>
            <p className="mt-2">
              Forward five recent unread emails (no client-confidential content) to ChatGPT, Gemini,
              or Claude. Try this prompt:
            </p>
            <p className="mt-3 italic">
              “Below are five emails I&apos;ve received this week. For each: classify the intent
              (sales, support, supplier, internal, personal), suggest whether to reply or archive,
              and if reply, draft a three-sentence response in friendly Australian English. Do not
              invent commitments I have not made. Flag any email where I should call rather than
              reply.”
            </p>
            <p className="mt-3">
              Compare the AI&apos;s classification to what you would have done manually. Where did
              it match? Where did it miss context? That gap tells you which emails still need your
              full attention — and which you can safely auto-handle going forward.
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
                1. Why does Granola sit differently from Otter on the privacy axis?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> It encrypts the audio</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> It does not join the call as a visible bot — consent is fully on you</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> It is open source</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Granola does not appear as a bot, so the consent burden is entirely the host&apos;s. Otter joins visibly, prompting the conversation about consent.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. The pre-meeting brief workflow uses AI to&hellip;
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Auto-respond to meeting invites</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Summarise prior meetings and surface smart questions</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Reschedule conflicts</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Summarise prior meetings and surface smart questions. Five minutes the night before saves 30 minutes of mid-meeting catch-up.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. What is the realistic weekly saving from email + meeting AI for a typical AU manager?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> 1–2 hours</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> 8–11 hours</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> 25+ hours</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">8–11 hours, with the realistic mid-point at about 10 hours.</p>
              </details>
            </fieldset>
          </div>
        </div>
      </section>

      {/* Next lesson preview */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Up next · Lesson 3</p>
            <h3 className="text-lg font-semibold text-slate-900 mt-1">
              Document AI: drafts, summaries, and rewrites
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              The Word/Docs/PDF workflow that turns a 50-page contract into a 5-minute review.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
          >
            Continue <ArrowRight className="size-4" />
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
