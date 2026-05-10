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
import { HeroAgents } from '@/components/illustrations/hero-agents';
import { FlowThreeStep } from '@/components/illustrations/flow-three-step';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'Voice & Dictation AI — Talk, Don’t Type | AI Productivity Lesson 5 | LongCare Academy',
  description:
    'Voice typing is 3× faster than typing. Apple, Google, Otter, Whisper, Just Press Record compared with AUD pricing — plus voice-to-blog and voice-to-email workflows for AU professionals.',
  path: '/academy/ai-productivity/lessons/voice-and-dictation',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Voice & Dictation AI — Talk, Don’t Type',
  educationalLevel: 'Professionals',
  learningResourceType: 'Lesson',
  timeRequired: 'PT20M',
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

export default function VoiceAndDictationLessonPage() {
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
            { name: 'Voice & Dictation', url: '/academy/ai-productivity/lessons/voice-and-dictation' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Zap className="size-3" /> Lesson 5 of 8
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 20 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Voice &amp; dictation AI &mdash; talk, don&rsquo;t type
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Speaking is three times faster than typing for long-form thought. Twenty minutes to
              set up the right tool stack, learn three workflows, and stop staring at blank
              cursors.
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
            <HeroAgents className="text-sky-700" width={420} height={320} />
          </div>
        </div>
      </section>

      {/* Inline flow */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            Voice &rarr; transcript &rarr; AI structure
          </h3>
          <div className="flex justify-center">
            <FlowThreeStep width={720} height={140} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            The unlock isn&rsquo;t voice alone &mdash; it&rsquo;s voice plus an LLM that turns
            your ramble into a structured, sendable artefact.
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
              Walk-through screencast in production. The transcript below covers every workflow.
            </span>
          </div>
        </div>
      </section>

      {/* Transcript */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Why voice, why now?</h3>
          <p className="mt-2 text-slate-700">
            The average professional types between 35 and 50 words a minute. The average
            professional speaks at 130&ndash;150 words a minute. That is the entire pitch for
            voice productivity. For long-form thought &mdash; blog posts, drafts, status reports,
            client briefings &mdash; speaking is three times faster than typing, and the words
            arrive in a more natural order. The 2024 Whisper model and the 2025&ndash;26 wave of
            on-device speech engines made transcription accuracy almost perfect. The bottleneck
            was always &ldquo;turn this transcript into something readable.&rdquo; That is now a
            single AI prompt away.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The voice tool lineup (AUD pricing)</h3>
          <p className="mt-2 text-slate-700">
            <strong>Apple Dictation (iOS, macOS).</strong> Free. On-device since 2023, meaning
            audio never leaves your phone. Best for short bursts: emails, messages, quick notes.
            Automatically punctuates. Australian English voice profile in Settings &rarr; General
            &rarr; Keyboard.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Google voice typing (Docs, Android).</strong> Free with a Google account.
            Excellent for long-form drafts directly into Docs. Sends audio to Google &mdash; not
            on-device. Australian English supported.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Otter.ai.</strong> Free tier (30 mins/month), Pro about
            <strong> AUD&nbsp;$25/month</strong>, Business about
            <strong> AUD&nbsp;$30/seat/month</strong>. The standout feature is real-time
            transcription with speaker identification &mdash; perfect for meeting notes. Connects
            to Zoom, Google Meet, and Teams.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Whisper (OpenAI).</strong> Free open-source model; about
            <strong> AUD&nbsp;$0.01 per minute</strong> via the API. Best accuracy for technical
            jargon and accents, including Australian. Apps like MacWhisper (about
            <strong> AUD&nbsp;$80 once</strong>) and Whisper Transcription give you a clean GUI.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Just Press Record (iOS).</strong> About <strong>AUD&nbsp;$8 once</strong>,
            transcription via Apple Watch and iCloud sync. Brilliant for shower thoughts and walks
            &mdash; tap, talk, walk back to your laptop, transcript already in iCloud.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Workflow 1 &mdash; Voice to blog post</h3>
          <p className="mt-2 text-slate-700">
            Open Just Press Record or Otter. Walk for 20 minutes and talk through one topic
            you&rsquo;d like to write about. Don&rsquo;t worry about structure &mdash; ramble.
            When you&rsquo;re done, paste the transcript into ChatGPT or Claude with: <em>&ldquo;Turn
            this rambling voice memo into a 700-word blog post in [your voice description]. Keep
            my key points and ideas. Tighten transitions, add a strong opening line, end with a
            CTA to [book a chat / read more].&rdquo;</em> You will go from blank to draft in 25
            minutes total &mdash; including the walk.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Workflow 2 &mdash; Voice to email</h3>
          <p className="mt-2 text-slate-700">
            On iPhone, hold the dictation key (or say &ldquo;Hey Siri, take a note&rdquo;) while
            walking between meetings. Speak the gist of the reply &mdash; recipient, key points,
            tone. Open Apple Mail or Superhuman, paste, hit Apple Intelligence or
            Superhuman&rsquo;s &ldquo;Make professional&rdquo; &mdash; reply ready in 90 seconds.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Workflow 3 &mdash; Voice notes to structured doc</h3>
          <p className="mt-2 text-slate-700">
            For consulting and design work, voice memos beat typed notes for capturing nuance.
            Record meeting prep in Otter. Run the transcript through Claude with: <em>&ldquo;From
            this transcript, extract: 3 client questions, 5 supporting facts, 2 risks. Format as
            a structured pre-meeting brief.&rdquo;</em> The transcript is your input; the brief
            is your artefact.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Setup quick-start by platform</h3>
          <p className="mt-2 text-slate-700">
            <strong>macOS.</strong> System Settings &rarr; Keyboard &rarr; Dictation &rarr; turn
            on. Set shortcut to double-tap fn. Add Australian English voice. For long form, install
            MacWhisper.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Windows.</strong> Win+H opens Voice Typing. For Whisper-quality, install
            Whisper Transcription or use the OpenAI API via a desktop client.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>iOS.</strong> Settings &rarr; General &rarr; Keyboard &rarr; Enable Dictation,
            Auto-Punctuation. Add Just Press Record from the App Store.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Android.</strong> Gboard has voice typing built in &mdash; tap the mic. For
            longer-form, use Google Recorder app, which transcribes on-device.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Privacy &mdash; on-device vs cloud</h3>
          <p className="mt-2 text-slate-700">
            <strong>On-device (audio never leaves):</strong> Apple Dictation, Google Recorder
            (Pixel), MacWhisper running locally. Best for sensitive client conversations.
            <strong> Cloud-processed:</strong> Otter, Fireflies, Google voice typing in Docs,
            ChatGPT Voice. Convenient and accurate, but the audio is sent to a vendor. Match the
            tool to the sensitivity of what you&rsquo;re saying.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">AU spelling and custom vocabulary</h3>
          <p className="mt-2 text-slate-700">
            Whisper, Otter, and Apple Dictation all support Australian English, but you must
            select it in settings. American English variants will spell &ldquo;customise&rdquo; as
            &ldquo;customize.&rdquo; For industry jargon &mdash; medication names, supplier codes,
            client surnames &mdash; teach the tool: Otter has a custom vocabulary list (Pro+);
            Apple Dictation learns over time from your contacts and replacements.
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Speaking is three times faster than typing for long-form thought — voice is the productivity unlock.',
              'Match tool to sensitivity: Apple Dictation on-device for confidential, Otter or Whisper API for everything else.',
              'Three workflows pay for themselves: voice-to-blog, voice-to-email, voice-to-structured-doc.',
              'Set Australian English explicitly — defaults are American English on most platforms.',
              'Add custom vocabulary for industry terms; Otter Pro and Apple Dictation both support this.',
              'A 20-minute walk plus 5 minutes of AI cleanup = a finished blog post.',
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
            <p className="font-semibold text-slate-900">Exercise: Walk and write a 700-word blog post</p>
            <p className="mt-2">
              Pick one topic you&rsquo;ve been meaning to write about. Open Just Press Record (or
              Apple Dictation, or Otter). Walk for 15&ndash;20 minutes and talk through it &mdash;
              what you know, what bothers you, the example that comes to mind. Don&rsquo;t edit
              while talking.
            </p>
            <p className="mt-3">
              Back at your desk, paste the transcript into Claude or ChatGPT with this prompt:
              <em> &ldquo;Turn this rambling voice memo into a 700-word blog post in friendly,
              practical Australian English. Keep my key points. Tighten transitions, add a strong
              opening line, end with a CTA.&rdquo;</em>
            </p>
            <p className="mt-3">
              Review, edit lightly, post. Note your start-to-publish time. Most students hit 35
              minutes &mdash; for a post that would have taken two hours typed.
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
                1. Roughly how much faster is speaking compared with typing?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> About the same</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> 3&times; faster</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> 10&times; faster</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">3&times; faster &mdash; 130&ndash;150 wpm spoken vs 35&ndash;50 wpm typed.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. Which tool keeps audio entirely on the device?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Otter.ai</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Apple Dictation</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Google voice typing in Docs</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Apple Dictation &mdash; on-device since 2023, ideal for sensitive content.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. Why does setting Australian English matter?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> The accent will not be recognised otherwise</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Default spelling is American English</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> It enables custom vocabulary</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Default spelling is American English. The accent is recognised either way; the spelling rules differ.</p>
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
              AI for non-coders &mdash; spreadsheets, scripts, web
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Six things AI helps non-coders do &mdash; from formulas to bookmarklets to mini
              CRMs.
            </p>
          </div>
          <Link
            href="/academy/ai-productivity/lessons/ai-for-coding-and-tech"
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
