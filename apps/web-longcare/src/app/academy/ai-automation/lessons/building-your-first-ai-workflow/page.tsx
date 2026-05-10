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
import { HeroAgents } from '@/components/illustrations/hero-agents';
import { FlowAutomation } from '@/components/illustrations/flow-automation';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'Building Your First AI Workflow — AI Automation Lesson 3 | LongCare Academy',
  description:
    'Build a real lead-form-to-Slack workflow in 30 minutes using Zapier or n8n, with AI extraction. AUD costs, troubleshooting, and monitoring included.',
  path: '/academy/ai-automation/lessons/building-your-first-ai-workflow',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Building Your First AI Workflow — Lead Form to Slack in 30 Minutes',
  educationalLevel: 'Advanced',
  learningResourceType: 'Lesson',
  timeRequired: 'PT30M',
  inLanguage: 'en-AU',
  isPartOf: {
    '@type': 'Course',
    name: 'AI Automation',
    url: 'https://longcare.au/academy/ai-automation',
  },
  provider: {
    '@type': 'Organization',
    name: 'LongCare AU',
    sameAs: 'https://longcare.au',
  },
};

export default function BuildingYourFirstAIWorkflowLessonPage() {
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
            { name: 'AI Automation', url: '/academy/ai-automation' },
            { name: 'Building Your First AI Workflow', url: '/academy/ai-automation/lessons/building-your-first-ai-workflow' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Sparkles className="size-3" /> Lesson 3 of 10
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 30 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Building your first AI workflow &mdash; lead form to Slack in 30 minutes
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Stop reading and start shipping. By the end of this lesson you will have a real,
              working AI automation routing leads from your website to your team chat.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
              >
                Mark complete &amp; next <ArrowRight className="size-4" />
              </a>
              <Link
                href="/academy/ai-automation"
                className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
              >
                <ArrowLeft className="size-4" /> Back to path
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroAgents className="text-sky-700" width={420} height={320} />
          </div>
        </div>
      </section>

      {/* Inline flow */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            The workflow we&rsquo;re building today
          </h3>
          <div className="flex justify-center">
            <FlowAutomation width={760} height={180} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Form submission &rarr; AI extracts intent and sentiment &rarr; conditional routing
            &rarr; Slack notification &rarr; error monitoring. All in 30 minutes.
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
              The transcript below is the full step-by-step. Video adds screen recordings of every
              click in Zapier.
            </span>
          </div>
        </div>
      </section>

      {/* Transcript */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The goal</h3>
          <p className="mt-2 text-slate-700">
            Build a workflow that takes new website-form submissions, runs them past an AI to
            classify intent and sentiment, splits into &ldquo;hot lead&rdquo; vs &ldquo;general
            enquiry&rdquo; routes, posts to the right Slack channel, and emails you if the
            workflow ever fails. Sounds heavy. It&rsquo;s a 30-minute build.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Tool of choice</h3>
          <p className="mt-2 text-slate-700">
            For a first workflow, use <strong>Zapier</strong>. It is the most beginner-friendly,
            has the broadest integration library, and the free tier covers 100 tasks/month &mdash;
            plenty to test. For more control, scale, or self-hosted privacy, switch to
            <strong> n8n</strong> later. The mental model is identical.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Step 1 &mdash; create your Zapier account (3 min)</h3>
          <p className="mt-2 text-slate-700">
            Sign up at zapier.com with your work email. Free tier is fine for now. Switch on 2FA
            from the security settings &mdash; the workflow will end up touching customer data, so
            account security matters.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Step 2 &mdash; the trigger (5 min)</h3>
          <p className="mt-2 text-slate-700">
            Click &ldquo;Create Zap&rdquo;. For the trigger, pick your form tool: Tally, Typeform,
            Google Forms, or Webflow Forms all work. Tally is the favourite for AU SMEs &mdash;
            free for unlimited submissions and AU-friendly privacy posture. Connect, pick the
            specific form, send a test submission, confirm Zapier sees the data.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Step 3 &mdash; the AI extraction step (8 min)</h3>
          <p className="mt-2 text-slate-700">
            Add a step. Search for &ldquo;ChatGPT&rdquo; or &ldquo;OpenAI&rdquo; (Zapier has both;
            ChatGPT is friendlier). Pick &ldquo;Conversation&rdquo;. Paste this prompt:
          </p>
          <p className="mt-2 text-slate-700">
            <em>&ldquo;You are a lead-classification assistant for an Australian [your industry]
            SME. From the form data below, return a JSON object with: intent (one of: pricing,
            demo, support, partnership, other), sentiment (positive, neutral, negative), urgency
            (low, medium, high), and a one-line summary in Australian English. Form data: {`{{form_data}}`}&rdquo;</em>
          </p>
          <p className="mt-2 text-slate-700">
            Map the form fields into the prompt. Test the step. Tweak the prompt until the JSON
            comes back clean.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Step 4 &mdash; the conditional path (5 min)</h3>
          <p className="mt-2 text-slate-700">
            Add a &ldquo;Filter&rdquo; or &ldquo;Paths&rdquo; step. Path A: urgency = high OR
            intent = demo. Path B: everything else. Paths means hot leads go straight to your
            sales channel; everything else lands in a triage channel for the team to review next
            morning.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Step 5 &mdash; Slack action (5 min)</h3>
          <p className="mt-2 text-slate-700">
            For each path, add a Slack &ldquo;Send Channel Message&rdquo; action. Use blocks for a
            tidy notification: customer name, intent, urgency, sentiment, summary, plus a
            &ldquo;Reply&rdquo; button that opens the form&rsquo;s reply email. Hot-lead messages
            should @-mention the duty rep so notifications fire on phone too.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Step 6 &mdash; test and troubleshoot (3 min)</h3>
          <p className="mt-2 text-slate-700">
            Send a real test submission. Watch the run in Zapier. If anything errors, check three
            usual suspects: API rate limit (wait 60 seconds and retry), JSON parse failure (the
            AI didn&rsquo;t return clean JSON &mdash; tighten the prompt), or missing field (a
            hidden form field changed names).
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Step 7 &mdash; add error monitoring (1 min)</h3>
          <p className="mt-2 text-slate-700">
            Zapier &rarr; Settings &rarr; Notifications &rarr; turn on &ldquo;Email me when a Zap
            errors&rdquo;. This is the simplest possible monitor and it catches 95% of the
            problems you&rsquo;ll have in the first month. Lesson 4 covers proper monitoring.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Cost reality check</h3>
          <p className="mt-2 text-slate-700">
            Zapier free tier covers 100 tasks/month (each step in a Zap counts as one task). At ~3
            tasks per submission, that is roughly 30 submissions/month free. Beyond that:
            Professional plan is about A$30/month for 750 tasks; Team plan A$100/month for 2,000
            tasks. ChatGPT API costs add about A$0.01&ndash;A$0.05 per submission. A typical
            growing AU SME runs the lot for under A$50/month all-in.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">What you just built</h3>
          <p className="mt-2 text-slate-700">
            Congratulations &mdash; you have a real, AI-powered automation in production. The
            scaffolding (form, AI step, condition, action, monitoring) is the universal pattern.
            Lessons 4&ndash;10 layer on error handling, more sophisticated AI steps, and bigger
            workflows, but they all rest on this skeleton. Build it once and the rest is variations.
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'The universal automation pattern: trigger → AI step → condition → action → monitor.',
              'Zapier is the fastest path to a first working AI workflow; n8n adds control and self-hosting later.',
              'Always specify JSON output in the AI prompt and validate the parse — it is the most common failure point.',
              'Use Zapier&rsquo;s built-in error email to start; better monitoring comes in lesson 4.',
              'Hot-lead path should @-mention the duty rep so notifications fire on phone immediately.',
              'Total cost for a typical SME: under A$50/month including Zapier, ChatGPT API, and a form tool.',
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
            One short hands-on exercise. Total time: 30 minutes.
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Exercise: ship a working Zap today</p>
            <p className="mt-2">
              Don&rsquo;t skip ahead. Open Zapier in another tab and follow steps 1&ndash;7 with
              your real form and a real Slack workspace. Send a test submission. Verify it lands.
              Read the AI&rsquo;s extracted JSON and judge whether the intent classification matched
              your gut.
            </p>
            <p className="mt-3 italic">
              The 30 minutes you spend now save 5 hours of manual lead triage every month, and
              they unlock every other lesson in this path. Build it.
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
                1. Why instruct the AI to return JSON?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> JSON looks tidy</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> The downstream steps need structured fields, not prose</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> JSON is faster for the model</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Downstream steps need structured fields. The conditional and Slack steps key on specific values.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. Most common failure of a first AI Zap is...
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Slack throttling</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> AI returning malformed JSON</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> The form being offline</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">AI returning malformed JSON. Tighten the prompt and add an example of clean output to fix.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. The simplest day-one monitoring is...
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Datadog dashboards</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Zapier&rsquo;s built-in error email</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Manually checking every hour</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Zapier&rsquo;s built-in error email. It catches 95% of issues with one click.</p>
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
              Lead qualification and nurture automations
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Multi-step nurture flows that keep warm leads engaged without spamming.
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
            href="/academy/ai-automation"
            className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
          >
            <ArrowLeft className="size-4" /> Back to AI Automation
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
