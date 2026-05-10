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
import { FlowThreeStep } from '@/components/illustrations/flow-three-step';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'Image & Voice AI — Photos, Logos, Voice Memos | Beginner AI Lesson 5 | LongCare Academy',
  description:
    'A practical 20-minute tour of image and voice AI tools (DALL-E, Imagen, Midjourney, Firefly, ChatGPT Voice, Otter) — with AUD pricing, five SME use cases, and AU privacy notes.',
  path: '/academy/beginner-ai/lessons/image-and-voice-ai',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Image & Voice AI — Photos, Logos, Voice Memos',
  educationalLevel: 'Beginner',
  learningResourceType: 'Lesson',
  timeRequired: 'PT20M',
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

export default function ImageAndVoiceAiLessonPage() {
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
            { name: 'Image & Voice AI', url: '/academy/beginner-ai/lessons/image-and-voice-ai' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Sparkles className="size-3" /> Lesson 5 of 8
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 20 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Image &amp; voice AI — photos, logos, voice memos
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              A grounded tour of generative image tools and voice AI for Australian SMEs — what
              actually saves time, what it costs in AUD, and what you must not record without
              consent.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
              >
                Mark complete &amp; next <ArrowRight className="size-4" />
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
            <HeroToolkit className="text-sky-700" width={420} height={320} />
          </div>
        </div>
      </section>

      {/* Inline flow */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            Idea &rarr; voice or photo &rarr; AI &rarr; output
          </h3>
          <div className="flex justify-center">
            <FlowThreeStep width={720} height={140} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Modern multimodal AI accepts whatever input you have to hand and returns whatever output
            the job needs — that is the unlock.
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

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Why bother with image and voice AI?</h3>
          <p className="mt-2 text-slate-700">
            Until 2024, image generation was a niche hobby and voice AI meant Siri losing your
            shopping list. Both flipped fast. In 2026 most Australian SMEs need a logo refreshed,
            a hero photo cleaned up, three Instagram tiles and a fortnightly voice memo of the
            Monday standup transcribed into a status report. AI now does each of these in minutes
            for the price of a coffee. The trick is knowing which tool to open, when, and what to
            never feed in.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The image AI lineup (AUD pricing)</h3>
          <p className="mt-2 text-slate-700">
            <strong>ChatGPT (DALL-E 4 inside GPT-5)</strong> — bundled into ChatGPT Plus at about
            <strong> AUD&nbsp;$32/month inc GST</strong>. Best general-purpose tool for small
            businesses; understands Australian English prompts, generates product mock-ups, ad
            visuals, and presentation imagery. Limit: ~50 images/day on Plus.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Gemini (Imagen 3)</strong> — included with Google AI Pro at about
            <strong> AUD&nbsp;$30/month</strong> or with Workspace Business at about
            <strong> AUD&nbsp;$33/seat/month</strong>. Better at typography on images (signs,
            posters, billboards) and at photoreal product shots. Lives inside Google Slides for
            instant deck imagery.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Midjourney v7</strong> — about <strong>AUD&nbsp;$15/month</strong> for the
            basic plan. The art-director&rsquo;s favourite — strongest aesthetic out of the box,
            but you pay for that with a steeper learning curve. Worth it if your brand needs a
            distinctive look.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Adobe Firefly</strong> — about <strong>AUD&nbsp;$15/month</strong> standalone,
            or included in Creative Cloud. The only one that comes with a commercial-use indemnity
            (Adobe will defend you if a client sues over training data). Native plug-ins for
            Photoshop and Express.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Canva Magic Studio</strong> — built into Canva Pro at about
            <strong> AUD&nbsp;$22/month</strong>. Generates images, removes backgrounds, expands
            photos, edits products in place. The fastest path from idea to social tile for a
            non-designer.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Five SME use cases that actually save time</h3>
          <ol className="mt-2 list-decimal pl-6 text-slate-700">
            <li><strong>Product photo cleanup.</strong> Drop a phone snap of stock onto Canva or Firefly, remove the background, drop in a clean studio backdrop. Three minutes per SKU instead of a $300 photographer.</li>
            <li><strong>Social graphics.</strong> Generate a week of branded tiles from one prompt — Canva Magic and Gemini Imagen both nail this. Keep brand colours and font as a reusable preset.</li>
            <li><strong>Logo iterations.</strong> Not a final logo, but a starting point. Generate 20 directions in 10 minutes, pick three, send to a designer for finishing — cuts agency cost by half.</li>
            <li><strong>Ad creative.</strong> Local Facebook and Instagram ads with seasonal variants — Australia Day, EOFY, Melbourne Cup, Christmas — produced in batches.</li>
            <li><strong>Presentation visuals.</strong> Stop using stock-photo handshakes. A 30-second prompt in Slides gets you a custom hero image that fits your slide, brand, and topic.</li>
          </ol>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The voice AI lineup</h3>
          <p className="mt-2 text-slate-700">
            <strong>ChatGPT Voice (Advanced)</strong> — included with Plus. A natural-sounding,
            interruptible conversation; great for hands-free brainstorming during a drive
            (legally, with the phone mounted). Recordings stay private when training is off.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Gemini Live</strong> — voice-first conversation with screen sharing, included
            with Google AI Pro. Pair it with your camera and you have a walking tutor.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Otter.ai</strong> — about <strong>AUD&nbsp;$25/month Pro</strong> or
            <strong> AUD&nbsp;$30/seat/month Business</strong>. Transcribes meetings live, summarises,
            extracts action items. Connects to Zoom, Google Meet, Teams.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Apple/Google built-in dictation</strong> — free on the device. Apple&rsquo;s on-device
            dictation in 2026 is fast and private. Google&rsquo;s voice typing in Docs is excellent for
            long-form drafts.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Australian privacy: voice and consent</h3>
          <p className="mt-2 text-slate-700">
            Australia has a federal Privacy Act and varied state listening-device laws. The simple
            rule: <strong>do not record a meeting (in person, phone, or video) without the
            explicit consent of every person speaking.</strong> Otter and Fireflies make this easy
            with an in-meeting bot that announces itself; manual phone-recording apps make it
            risky. Always ask &mdash; &ldquo;Mind if I record this for my notes? It&rsquo;s
            transcribed by Otter and the recording is deleted after 30 days&rdquo; &mdash; and log
            consent.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Quick win — five social tiles in ten minutes</h3>
          <p className="mt-2 text-slate-700">
            Open Canva. Pick the &ldquo;Instagram post (1080&times;1080)&rdquo; size. Click
            <em> Magic Design</em>. Type: <em>&ldquo;Five social tiles announcing our EOFY 30%
            discount on aged-care planning sessions, brand colours sky blue and white, friendly
            Australian English headlines, no people, gentle gradients.&rdquo;</em> Hit generate.
            Pick five, tweak headlines, schedule via Buffer or Later. Total time: 10 minutes.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">AU compliance notes</h3>
          <p className="mt-2 text-slate-700">
            Generative imagery is a copyright grey zone — most outputs in 2026 are considered the
            user&rsquo;s work, not the AI vendor&rsquo;s, but no global precedent yet. Adobe Firefly
            offers an indemnity if you stay inside their tool; ChatGPT does not. Avoid generating
            celebrity likenesses, real brand logos, or anything that could mislead consumers under
            ACL (Australian Consumer Law). When using AI imagery in advertising, label it
            <em> &ldquo;AI-generated&rdquo;</em> if a reasonable consumer would otherwise believe
            the image is real (this is fast becoming a CMA expectation).
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Five tools cover 95% of SME image needs: ChatGPT, Gemini, Midjourney, Firefly, Canva — with AUD pricing under $35/month each.',
              'Adobe Firefly is the safest choice for client work because Adobe carries the IP indemnity.',
              'Otter and Gemini Live make meeting transcription frictionless — but you must obtain explicit consent every time.',
              'Image AI is best for iteration speed, not final logos — generate 20 directions, then hire a designer for polish.',
              'Label AI-generated visuals in advertising; ACL fines for misleading conduct apply equally to AI imagery.',
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
            <p className="font-semibold text-slate-900">Exercise: Generate five social tiles for your business this week</p>
            <p className="mt-2">
              Open Canva (free or Pro). Use Magic Design with this prompt template:
            </p>
            <p className="mt-3 italic">
              &ldquo;Five Instagram tiles announcing [your offer], brand colours [colour 1] and
              [colour 2], friendly Australian English headlines, [no people / friendly people],
              [gradient / flat / photographic] style.&rdquo;
            </p>
            <p className="mt-3">
              Generate, pick five, swap the wording to match your voice, and schedule for next week.
              Note how long it took — most students hit ten minutes from blank screen to scheduled
              post.
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
                1. Which image AI ships with a commercial-use indemnity from the vendor?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> ChatGPT (DALL-E)</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Midjourney</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Adobe Firefly</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Adobe Firefly. Adobe will defend customers in IP disputes when content is generated inside their tools.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. What must you do before recording a meeting in Australia?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Get explicit consent from every speaker</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Mention it in the meeting description</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Disclose only after the meeting ends</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Get explicit consent from every speaker — federal Privacy Act and state listening-device laws require it.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. When is image AI best used in a brand workflow?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> As a final logo replacement</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> For iteration speed and direction-finding</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Only for stock photo replacement</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">For iteration speed and direction-finding — generate 20 ideas in minutes, then hire a designer to polish the best one.</p>
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
              AI privacy basics — what never to paste
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              The five categories you must never paste into AI, plus a 3-step privacy hygiene
              routine grounded in the Australian Privacy Act.
            </p>
          </div>
          <Link
            href="/academy/beginner-ai/lessons/ai-privacy-basics"
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
