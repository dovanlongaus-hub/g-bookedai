import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
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
import { FlowThreeStep } from '@/components/illustrations/flow-three-step';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'Multimodal Prompting Mastery — Prompt Engineering Lesson 14 | LongCare Academy',
  description:
    'Image, audio and video prompting for AU SMEs — workflows, AU dialect handling in voice, photo-to-invoice, screenshot-to-bug-report and provider AUD pricing for multimodal in 2026.',
  path: '/academy/prompt-engineering/lessons/multimodal-prompting-mastery',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Multimodal Mastery — Image, Audio, Video Prompting',
  educationalLevel: 'Intermediate',
  learningResourceType: 'Lesson',
  timeRequired: 'PT30M',
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

export default function MultimodalPromptingMasteryLessonPage() {
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
            { name: 'Multimodal Prompting Mastery', url: '/academy/prompt-engineering/lessons/multimodal-prompting-mastery' },
          ]}
        />
      </div>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <MessageSquareCode className="size-3" /> Lesson 14 of 14 · Capstone
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 30 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Multimodal mastery — image, audio, video prompting
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              In 2026 the most underused AI capability is mixed-mode prompting. Photo to invoice,
              screenshot to bug report, audio meeting to action items — five SME workflows, AU
              dialect handling, AUD pricing and the latency tradeoff for live use cases.
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

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            The multimodal prompt shape
          </h3>
          <div className="flex justify-center">
            <FlowThreeStep width={720} height={180} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Input mode → AI → Output mode. The art is matching the input mode to the question
            and the output mode to the consumer.
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

          <h3 className="mt-6 text-lg font-semibold text-slate-900">What multimodal means in 2026</h3>
          <p className="mt-2 text-slate-700">
            Three years ago AI prompting was text-only. In 2026 the major models — GPT-5,
            Gemini 2.5 Pro, Claude 3.7 — natively accept and produce text, images, audio and
            (increasingly) video. &ldquo;Multimodal&rdquo; means the prompt and/or the output
            mix more than one of those modes. Most AU SME teams still type all prompts. That
            leaves the highest-leverage AI workflows of the year on the table.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Image-to-text — the workhorse</h3>
          <p className="mt-2 text-slate-700">
            Send a photo or screenshot to a vision model and ask a question. Use cases that
            consistently work: read a paper invoice into structured data; describe a website
            screenshot to lodge a bug report; extract figures from a chart; transcribe a
            handwritten whiteboard. Gemini 2.5 Pro and GPT-5 are roughly equivalent for AU
            English receipts and invoices in 2026; both struggle with extremely faded thermal
            paper. AUD cost: usually under A$0.02 per image at API rates.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Text-to-image — useful, not magical</h3>
          <p className="mt-2 text-slate-700">
            DALL-E 3, Gemini Imagen 3 and Midjourney all generate good images from text in 2026.
            Most AU SME use cases (LinkedIn header, internal slide, blog illustration) work fine
            with the free tier of one of them. Two prompt habits matter: name a style (line
            drawing, photo, watercolor) and add what you do <em>not</em> want (&ldquo;no
            text in the image&rdquo; — text rendering remains weak). AUD costs: A$0-30/mo at
            most for normal SME volumes.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Voice prompting — talk, do not type</h3>
          <p className="mt-2 text-slate-700">
            All three majors support voice input. ChatGPT Voice and Gemini Live now handle
            interruption, multi-speaker and a meaningful chunk of AU dialect. The biggest
            unlock is the car — drafting client emails or briefs while driving (hands-free,
            obviously). One Adelaide consultant in our cohort cleared 95% of email replies
            during commutes for 6 months. AU dialect is now generally well-handled with the
            occasional whoops on regional vocabulary (&ldquo;wagga&rdquo;, &ldquo;youse&rdquo;,
            &ldquo;sweet as&rdquo;) — adding a system instruction like &ldquo;I am
            Australian; transcribe AU English spelling&rdquo; helps materially.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Video understanding</h3>
          <p className="mt-2 text-slate-700">
            Gemini 2.5 Pro accepts up to two-hour video inputs natively. ChatGPT now supports
            video input via the file upload path. Use cases: meeting recording to action
            items; product demo to QA checklist; on-site walkthrough to inspection report. AU
            construction and trades firms in our cohort have moved from 90-minute manual
            inspection reports to 8-minute AI-drafted versions. The transcript is good; the
            visual element (was the fire extinguisher present?) is the differentiator.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Mixed-mode workflows — five AU SME plays</h3>
          <p className="mt-2 text-slate-700">
            <strong>Photo to invoice.</strong> Snap a receipt, get structured data, push to
            Xero. ~A$0.02 per receipt. <strong>Screenshot to bug report.</strong> Paste a
            broken screen, get a Jira/Linear-shaped ticket including the URL, the issue and
            steps to reproduce. <strong>Audio meeting to action items.</strong> Otter or
            Granola plus a structured-output prompt; A$30-50/month inc GST per user.
            <strong> Site walkthrough to compliance report.</strong> Trades, hospitality and
            aged-care use case; record a phone walk-through, AI drafts the report.
            <strong> Voice memo to LinkedIn post.</strong> 90-second drive-to-office ramble
            becomes a 300-word LinkedIn draft; you edit, you ship.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Pricing across providers — AUD inc GST</h3>
          <p className="mt-2 text-slate-700">
            For an AU SME of 5-15 people, a realistic 2026 multimodal stack costs A$100-300/month
            inc GST in total. ChatGPT Team (US$30/seat, ~A$50 inc GST) covers voice + vision +
            DALL-E. Google One AI Premium (US$20, ~A$33) bundles Gemini including video.
            Anthropic Claude Pro (US$20, ~A$33) covers vision. Otter.ai Business (US$30,
            ~A$50) covers audio meeting capture with multi-speaker. Pick two of these for
            most teams; pick all four only if you do high-stakes regulated work.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Latency tradeoffs — when speed matters</h3>
          <p className="mt-2 text-slate-700">
            Multimodal is slower than text-only. A photo-to-invoice round trip is 3-8 seconds.
            A video summary of a 1-hour meeting is 30-120 seconds. For live use cases
            (front-of-house, kiosk, in-meeting captioning), latency dominates: pick the fastest
            small-mode model (Gemini Flash, GPT-4o-mini, Claude Haiku) over the biggest. For
            asynchronous use cases (overnight report generation, batch processing), pick the
            best model and ignore latency entirely. The mistake to avoid is using GPT-5 for a
            kiosk; users tap away after 4 seconds.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">AU regulatory notes for multimodal</h3>
          <p className="mt-2 text-slate-700">
            Two AU-specific calls. <strong>Voice recording consent</strong> — under the Privacy
            Act and various state surveillance device acts, recording a conversation generally
            requires consent of at least one party (NSW, ACT) or all parties (Vic, WA, SA,
            Tas). Make sure your meeting AI is on-side; tools like Otter and Granola surface
            the consent moment in product. <strong>Image of an identifiable individual</strong>
            — running a customer&rsquo;s photo through AI for any non-disclosed purpose is a
            Privacy Act event. Always document the purpose and the retention rule before
            shipping a multimodal customer workflow.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Getting started — pick the one mode that will unlock you</h3>
          <p className="mt-2 text-slate-700">
            Do not try to adopt all four modes in week one. Pick the one that maps to your
            biggest unsolved workflow. Receipts piling up: photo to invoice. Meetings taking
            longer to write up than to hold: audio. Bug reports unclear and slow: screenshots.
            Long commute: voice. The first mode that gives a real win unlocks the others
            because you will already trust the loop. Most clients are bimodal within 60 days
            of picking the first one.
          </p>
        </article>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'GPT-5, Gemini 2.5 Pro and Claude 3.7 all natively handle text, images, audio and (increasingly) video in 2026.',
              'Photo-to-invoice, screenshot-to-bug-report, audio-to-actions, video-to-report, voice-to-LinkedIn — five reliable SME plays.',
              'AU dialect is mostly handled; add &ldquo;I am Australian; use AU English spelling&rdquo; to system prompts.',
              'Latency matters for live use; use a small fast model (Flash, mini, Haiku). For async work use the biggest model.',
              'Voice recording consent rules differ by AU state — Otter and Granola surface the consent moment in product.',
              'Pick one mode that maps to your biggest unsolved workflow; bimodal within 60 days is the typical pattern.',
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
            <p className="font-semibold text-slate-900">Exercise: Run one multimodal workflow end-to-end today</p>
            <p className="mt-2">
              Choose one of the five SME plays from the transcript.
            </p>
            <ol className="mt-3 list-decimal pl-6 space-y-1">
              <li>Pick the input — a real photo, a real screenshot, a real audio file from your inbox.</li>
              <li>Choose the model — Gemini 2.5 Pro for photo/video, ChatGPT for voice, either for screenshots.</li>
              <li>Write a structured-output prompt asking for the exact shape you need (JSON with named keys).</li>
              <li>Run it. Time how long. Score the output 1-10 against doing the job manually.</li>
              <li>If the score is 8+, put it in your weekly workflow this week. If under 8, debug per lesson 13.</li>
            </ol>
            <p className="mt-3">
              The first multimodal workflow you ship is the one that converts curiosity into competence.
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
                1. For a live kiosk customer flow, which model class should you choose?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> The largest available — GPT-5, Gemini 2.5 Pro</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> A small fast model — Gemini Flash, GPT-4o-mini or Claude Haiku</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Run on-device only</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Small fast. Live use is dominated by latency; users tap away after 4 seconds of waiting.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. What is the AU consent rule for recording a meeting in NSW?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Consent of one party is generally sufficient</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Consent of all parties is always required</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> No consent required if it is a business meeting</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">NSW is one-party-consent generally; Victoria and most other states require all-party. Check your state.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. When learning multimodal, how many modes should you adopt at once?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> All four — text, image, voice, video</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> One — the one mapped to your biggest unsolved workflow</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Two — text and one other</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">One. The first mode that wins a real workflow unlocks the others; clients are bimodal within 60 days.</p>
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
              You have finished the Prompt Engineering path — capstone done.
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Fourteen lessons, one multimodal workflow. Advanced bootcamps, certifications and
              live AU cohorts land in Q4 2026.
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
