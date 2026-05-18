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
import { FlowAutomation } from '@/components/illustrations/flow-automation';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'Your First AI Workflow — Beginner AI Lesson 9 | LongCare Academy',
  description:
    'Pick one daily task, map it as trigger to AI step to action, and ship a working automation in 30 minutes using the free tier of Zapier — with AU SME examples and the common first-time gotchas.',
  path: '/academy/beginner-ai/lessons/your-first-ai-workflow',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Your First AI Workflow — From Idea to Live in 30 Minutes',
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

export default function YourFirstAIWorkflowLessonPage() {
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
            { name: 'Your First AI Workflow', url: '/academy/beginner-ai/lessons/your-first-ai-workflow' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Sparkles className="size-3" /> Lesson 9 of 10
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 25 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Your first AI workflow — from idea to live in 30 minutes
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Pick one task you already do every day, map it as <em>trigger &rarr; AI step &rarr; action</em>,
              and ship a working automation today — using nothing more than the Zapier free tier.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#"
                aria-disabled="true"
                tabIndex={-1}
                className="inline-flex items-center gap-2 bg-slate-300 text-slate-500 font-medium px-5 py-2.5 rounded-lg pointer-events-none cursor-not-allowed select-none"
              >
                Mark complete &mdash; coming soon
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
            Trigger &rarr; AI step &rarr; Branch &rarr; Action
          </h3>
          <div className="flex justify-center">
            <FlowAutomation
              width={760}
              height={180}
              steps={['Trigger', 'AI step', 'Branch', 'Action', 'Notify me']}
            />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Every useful workflow is some version of these four boxes. Once you can see them, you
            can build one.
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
              Live screen-record of the full 30-minute build. Transcript below walks through every
              click.
            </span>
          </div>
        </div>
      </section>

      {/* Transcript */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">What is a workflow, really?</h3>
          <p className="mt-2 text-slate-700">
            For our purposes, a <strong>workflow</strong> is three boxes: <em>something happens
            </em> (the trigger), <em>AI looks at it</em> (the AI step), and <em>something is done
            about it</em> (the action). When a customer submits a form, AI categorises it as hot
            or warm, then an email lands in your inbox if it is hot. That is a workflow. You do not
            need a developer, you do not need a paid plan, you do not need to write code. You need
            thirty minutes and one task you do every day that you wish you did not.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Step 1 — Pick the task (5 minutes)</h3>
          <p className="mt-2 text-slate-700">
            Open a notes app and write down the last three things you did this week that you also
            did the week before. Sorting enquiries, replying to the same five FAQs, copying invoice
            details from email into Xero, summarising calls, posting to socials. Now circle the one
            that takes the most time and feels the most mechanical. That is your candidate. If you
            cannot pick, start with <em>“new enquiry comes in via the website contact form”</em> —
            almost every Australian SME has this and almost none has it automated.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Step 2 — Map the workflow (5 minutes)</h3>
          <p className="mt-2 text-slate-700">
            On paper or a whiteboard, draw four boxes from left to right and label them
            <em> Trigger</em>, <em>AI step</em>, <em>Branch</em>, <em>Action</em>. For our worked
            example: Trigger is “new submission in the contact form”. AI step is “read the message
            and decide: hot lead, warm lead, support question, or spam”. Branch is “if hot, do X;
            if warm, do Y; if spam, ignore”. Action is “send me an email with the contact details
            and AI’s summary, plus a draft reply I can copy-paste”. Two minutes of pen-and-paper
            saves twenty minutes of clicking inside the builder.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Step 3 — Build it in Zapier free (15 minutes)</h3>
          <p className="mt-2 text-slate-700">
            Sign up at <code>zapier.com</code> using your business email. The free tier in 2026
            gives you 100 tasks/month and two-step Zaps — plenty for a first build. Click
            <em> Create Zap</em>. For the trigger, choose your form tool (Typeform, Google Forms,
            Webflow, Squarespace, Tally — all natively supported). Connect the account, pick the
            form, then click <em>Test trigger</em> to pull through a real previous submission.
          </p>
          <p className="mt-2 text-slate-700">
            Add an <em>AI by Zapier</em> step (built in, no API key needed). Set the model to GPT-4o
            mini, choose <em>Extract Data</em> or <em>Classify Text</em>, and write a short prompt:
            <em> “Classify this enquiry as HOT, WARM, SUPPORT or SPAM. Then write a one-sentence
            summary and a two-sentence draft reply in Australian English.”</em> Map the form’s
            <em>message</em> field as the input. Test the step — read the JSON output carefully so
            you understand the shape.
          </p>
          <p className="mt-2 text-slate-700">
            Add an <em>Email by Zapier</em> step. Send to your own email. Subject: <code>[{'{{classification}}'}] New enquiry — {'{{name}}'}</code>. Body: the customer details, the AI summary, and the draft
            reply. Test. The email should land in your inbox within a few seconds. Click
            <em> Publish</em>. You now have a live workflow.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Step 4 — Test like a customer (3 minutes)</h3>
          <p className="mt-2 text-slate-700">
            Submit a real test entry through your actual form, on your actual phone. Wait. The email
            arrives or it does not. If it does not, open the <em>Zap history</em> tab and read the
            run — Zapier shows you exactly where it failed. The two most common reasons for a
            silent failure on day one are (a) you forgot to turn the Zap on after publishing, and
            (b) you mapped a field name that does not match what your form actually sends.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Step 5 — Polish (2 minutes)</h3>
          <p className="mt-2 text-slate-700">
            Once it works, refine. Add a second branch path that fires only on HOT enquiries and
            also sends an SMS to your mobile. Tighten the AI prompt — add an example of a HOT
            enquiry and an example of a SPAM enquiry inside the instruction. Rename the Zap to
            something specific (<em>Contact form &rarr; classify &rarr; email me</em>) so future-you
            knows what it is.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Common gotchas first time around</h3>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Rate limits.</strong> The free tier processes one task at a time. Bulk imports stall — that is normal, not broken.</li>
            <li><strong>Response shape changes.</strong> If you edit the AI prompt and field names change, the email step breaks silently. Re-test after every prompt edit.</li>
            <li><strong>No testing.</strong> The biggest first-build mistake is publishing without running through with a real entry. Always submit one fake enquiry the moment a Zap goes live.</li>
            <li><strong>Forgotten time zone.</strong> Set your Zapier account to <em>Australia/Sydney</em> (or your state) under settings, otherwise reports and triggers run in UTC.</li>
            <li><strong>PII in test data.</strong> When testing, use a fake name and email. Real customer data should never sit inside test runs you may share later.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The promotion ladder</h3>
          <p className="mt-2 text-slate-700">
            A workflow is not a one-and-done build. Treat it like a young employee: <em>daily test</em>
            for the first week (submit one fake entry each morning), <em>weekly polish</em> for the
            first month (read the runs, tweak the prompt), and <em>monthly review</em> after that
            (does it still match what your business actually does?). Workflows that are not
            reviewed quietly rot. Workflows that are reviewed monthly are the highest-ROI software
            an SME can buy.
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'A workflow is just four boxes: trigger, AI step, branch, action — anything else is a complication you can add later.',
              'Pick a task you already do every day, not a clever idea you might do — automation lives or dies on real-world recurrence.',
              'Zapier free tier (100 tasks/month, AI by Zapier built in) ships your first workflow without spending a dollar.',
              'Always test with a real submission the moment a Zap goes live; silent failures are almost always missing fields or a Zap left in draft.',
              'Treat workflows like staff: daily test for week 1, weekly polish for month 1, monthly review forever.',
              'Set your Zapier time zone to Australia and avoid putting real customer data into test runs.',
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
            <p className="font-semibold text-slate-900">Exercise: ship your first form-to-email AI workflow</p>
            <p className="mt-2">
              Pick the website form you receive the most enquiries from. Then:
            </p>
            <ol className="mt-3 list-decimal pl-6 space-y-1">
              <li>Sign up for Zapier free and connect your form tool.</li>
              <li>Add an AI by Zapier step with the classification prompt from the transcript.</li>
              <li>Add an Email by Zapier step that sends the classification, summary, and draft reply to your inbox.</li>
              <li>Publish, then submit one real test entry from your phone.</li>
              <li>Inspect the resulting email. Tweak the AI prompt once. Re-test.</li>
            </ol>
            <p className="mt-3">
              Now leave it running. Tomorrow morning, open the Zap history tab and read the runs
              from the last 24 hours. That review is the actual habit you are building.
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
                1. What is the minimum shape of any useful AI workflow?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> A custom Python script</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Trigger &rarr; AI step &rarr; action (with an optional branch)</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> A paid Zapier plan</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Trigger &rarr; AI step &rarr; action. Every workflow you build will be some variation of this. Branches are added when you need different actions for different cases.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. What is the most common reason a first Zap fails silently after publishing?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Zapier was down</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> The Zap is still in draft or the field mapping does not match what the form sends</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> AI hallucinated the email address</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Draft state or field mismatch. Always check the toggle is on and re-pull a real test submission after every prompt edit.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. What is the &quot;promotion ladder&quot; for a live workflow?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Set and forget</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Daily test for week 1, weekly polish for month 1, monthly review forever</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Rebuild it every quarter</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Daily &rarr; weekly &rarr; monthly. Workflows that get reviewed are workflows that stay useful.</p>
              </details>
            </fieldset>
          </div>
        </div>
      </section>

      {/* Next lesson preview */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Up next · Lesson 10</p>
            <h3 className="text-lg font-semibold text-slate-900 mt-1">
              AI for Australians — local context, local wins
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Australian English, AU-specific use cases (BAS, Fair Work, Medicare), AU privacy law
              and the local AI tools and community landscape for 2026.
            </p>
          </div>
          <Link
            href="/academy/beginner-ai/lessons/ai-for-australians"
            className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
          >
            Continue path <ArrowRight className="size-4" />
          </Link>
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
            Lesson library
          </Link>
        </div>
      </section>
    </main>
  );
}
