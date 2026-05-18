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
import { HeroAgents } from '@/components/illustrations/hero-agents';
import { FlowThreeStep } from '@/components/illustrations/flow-three-step';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'Multimodal Prompting — Image, Audio, Video Inputs | Prompt Engineering Lesson 8 | LongCare Academy',
  description:
    'Best multimodal AI models in 2026 (Gemini 2.0, GPT-4o, Claude), AUD pricing per input type, five AU SME use cases (photo to invoice, whiteboard to notes, voice memo to email) and a hands-on extraction.',
  path: '/academy/prompt-engineering/lessons/multimodal-prompting',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Multimodal Prompting — Image, Audio, Video Inputs',
  educationalLevel: 'Intermediate',
  learningResourceType: 'Lesson',
  timeRequired: 'PT25M',
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

export default function MultimodalPromptingLessonPage() {
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
            { name: 'Multimodal Prompting', url: '/academy/prompt-engineering/lessons/multimodal-prompting' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <MessageSquareCode className="size-3" /> Lesson 8 of 8
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 25 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Multimodal prompting — image, audio, video inputs
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              The most under-used feature in 2026 AI is the file attachment. Photo to invoice,
              whiteboard to notes, voice memo to email — five SME use cases that pay back in days.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#"
                aria-disabled="true"
                tabIndex={-1}
                className="inline-flex items-center gap-2 bg-slate-300 text-slate-500 font-medium px-5 py-2.5 rounded-lg pointer-events-none cursor-not-allowed select-none"
              >
                Mark complete &amp; finish path <ArrowRight className="size-4" />
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
            <HeroAgents className="text-sky-700" width={420} height={320} />
          </div>
        </div>
      </section>

      {/* Inline flow */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            The multimodal pipeline
          </h3>
          <div className="flex justify-center">
            <FlowThreeStep width={720} height={140} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Image, audio or video in &rarr; AI processes &rarr; Structured output. Same validation
            patterns as text — schemas, sentinels, sampling.
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

          <h3 className="mt-6 text-lg font-semibold text-slate-900">What “multimodal” means in 2026</h3>
          <p className="mt-2 text-slate-700">
            A multimodal model accepts more than one type of input — typically text plus image, and
            increasingly audio and video — and returns text output. Three years ago this was a
            research demo. In 2026 it is a default feature on every flagship model. The biggest
            adoption gap is awareness; most SMEs still treat AI as a text box and never paste a
            photo of an invoice into it.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Best multimodal models in 2026</h3>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Gemini 2.0 Pro / Flash</strong> — image and video native. Process up to 1 hour of video in a single prompt. Strongest at video summarisation. AUD: roughly <strong>A$0.0019 per image</strong> at API tier; included in Gemini for Workspace at A$33/user/month.</li>
            <li><strong>GPT-4o / GPT-5</strong> — image and audio native. Voice mode is the real-time killer feature. AUD: <strong>A$0.0026 per image</strong> at API; image generation included in ChatGPT Plus.</li>
            <li><strong>Claude 3.7 Sonnet / Claude 4</strong> — image only at the time of writing; the strongest at long-document image-and-text reasoning (charts, graphs, screenshots). AUD: <strong>A$0.0049 per image</strong> at API.</li>
          </ul>
          <p className="mt-2 text-slate-700">
            For a single SME owner, the consumer apps cover most use cases — paste a photo into
            ChatGPT or Gemini and it works. The API is for when you want to automate the
            workflow.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">AUD pricing per input type</h3>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Image</strong> — A$0.002–A$0.005 per image at API. Free in consumer apps up to a daily cap.</li>
            <li><strong>Audio (input)</strong> — A$0.009–A$0.015 per minute. Whisper API around A$0.009/minute.</li>
            <li><strong>Audio (output)</strong> — voice mode in ChatGPT: included in Plus. API: A$0.022/minute output.</li>
            <li><strong>Video</strong> — Gemini priced per frame internally; cap of 1 hour per prompt at Pro tier. Free up to daily cap.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Five SME use cases that pay back in days</h3>
          <ol className="mt-2 list-decimal pl-6 text-slate-700">
            <li><strong>Photo to invoice line items.</strong> Snap a supplier invoice with your phone, ask ChatGPT or Gemini: <em>“Extract supplier, ABN, invoice number, line items, GST, total. Return JSON.”</em> Paste into Xero. 30 seconds vs 5 minutes.</li>
            <li><strong>Whiteboard photo to structured notes.</strong> After a workshop, photograph the whiteboard. <em>“Convert this whiteboard into a structured list of decisions, actions and questions, with owner where mentioned.”</em></li>
            <li><strong>Voice memo to email.</strong> Walk-and-talk a 90-second voice memo. ChatGPT voice mode dictates back: <em>“Now write that as a polite email to a client in Australian English. Sign off as me.”</em></li>
            <li><strong>Product video to listing copy.</strong> A 30-second video of a product. <em>“Write a Shopify listing: title, three-bullet feature list, 100-word description, in Australian English, GST-inclusive price A$45.”</em></li>
            <li><strong>Screenshot to bug report.</strong> Screenshot of a bug or workflow issue. <em>“Describe what is happening here, what the user was likely trying to do, and three reproduction steps a developer can use.”</em></li>
          </ol>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Privacy — multimodal makes the stakes higher</h3>
          <p className="mt-2 text-slate-700">
            An image of a customer or employee carries sensitive information that text often does
            not. Faces are biometric data; documents may contain personal information. AU
            considerations:
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>APP 11</strong> (security) — encrypt at rest, choose providers with do-not-train commitments.</li>
            <li><strong>APP 6 / APP 8</strong> (use, cross-border) — disclose if you process customer photos with offshore AI providers.</li>
            <li><strong>Consent</strong> — for customer-facing photos (e.g. before/after shots, ID photos), get explicit consent referencing the AI processing step.</li>
            <li><strong>Faces and minors</strong> — extra caution under privacy law and child safety frameworks. Avoid feeding photos of children into consumer AI.</li>
            <li><strong>Confidential documents</strong> — same rule as text: do not paste into free consumer tiers.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Prompt patterns that work for images</h3>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Describe before you analyse.</strong> Ask: <em>“Describe what you see in this image in detail before answering my question.”</em> Forces the model to ground in the actual pixels.</li>
            <li><strong>Region focus.</strong> If the image is busy: <em>“Focus on the top-right quadrant of the image and ignore the rest.”</em></li>
            <li><strong>Schema-locked output.</strong> Same as text — force JSON. Image extraction is a high-leverage use case for structured output.</li>
            <li><strong>Verify-on-uncertainty.</strong> Add: <em>“If any field is illegible or you are not sure, return <code>VERIFY</code> for that field instead of guessing.”</em></li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Prompt patterns that work for audio</h3>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Transcribe first, then act.</strong> Ask for a verbatim transcript first, then run a second turn for analysis. Reduces hallucination.</li>
            <li><strong>Speaker labels.</strong> Ask: <em>“Label speakers as Speaker A and Speaker B based on voice changes; don’t assume names.”</em></li>
            <li><strong>Time stamps.</strong> Add: <em>“Include time stamps every 30 seconds for navigation.”</em></li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Hands-on: photo of invoice to data</h3>
          <p className="mt-2 text-slate-700">
            Take a photo of any invoice on your desk. Open ChatGPT or Gemini and paste this prompt
            with the photo attached:
          </p>
          <pre className="mt-2 bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs overflow-x-auto"><code>{`Describe what you see in this image in detail.

Then extract and return ONLY this JSON shape:
{
  "supplier": string,
  "abn": string | null,
  "invoice_number": string,
  "issue_date": string (YYYY-MM-DD),
  "line_items": [{ description: string, quantity: number, unit_price_aud: number }],
  "subtotal_aud": number,
  "gst_aud": number,
  "total_aud": number,
  "verify_fields": string[]
}

If a field is illegible or uncertain, add it to verify_fields and set the field to null.
Use Australian English.`}</code></pre>
          <p className="mt-2 text-slate-700">
            Save this prompt as a reusable template. The first time saves five minutes; the
            twentieth time saves about a hundred minutes a week.
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Multimodal AI is the most under-used feature in 2026. Most SMEs still treat AI as a text box.',
              'Gemini 2.0 leads on image and video; GPT-4o leads on audio with real-time voice mode; Claude is strongest at chart and document image reasoning.',
              'API pricing for images is roughly A$0.002–A$0.005 per image; consumer apps include daily caps.',
              'Five high-leverage use cases: photo-to-invoice, whiteboard-to-notes, voice-memo-to-email, product-video-to-listing, screenshot-to-bug-report.',
              'Faces and customer documents carry biometric and personal data — get consent and use Team or Workspace tiers, not free consumer.',
              'Same validation patterns apply: describe-before-analyse, schema-locked output, verify-on-uncertainty.',
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
            <p className="font-semibold text-slate-900">Exercise: Photo of an invoice to JSON</p>
            <p className="mt-2">
              Pick any invoice or receipt on your desk. Photograph it with your phone.
            </p>
            <ol className="mt-3 list-decimal pl-6 space-y-1">
              <li>Open ChatGPT or Gemini in the mobile app.</li>
              <li>Attach the photo and paste the JSON-extraction prompt from the transcript above.</li>
              <li>Verify the extracted total matches the invoice exactly.</li>
              <li>Note any fields that came back in <code>verify_fields</code> — these are the ones the model could not read confidently.</li>
              <li>Save the prompt to your prompt library under <code>Multimodal — Invoice extraction</code>.</li>
            </ol>
            <p className="mt-3">Bonus: do the same with a screenshot of a chart from a report. Ask: <em>“What are the three insights in this chart that a non-technical reader would miss?”</em></p>
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
                1. Which model is strongest for video summarisation in 2026?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Claude 3.7 Sonnet</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Gemini 2.0 Pro</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> GPT-4o</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Gemini 2.0 Pro. Native video processing up to one hour per prompt; the strongest tooling for AU SMEs that need to summarise meetings and product demos.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. What should you ask the model to do before extracting data from an image?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Nothing — just ask for the data</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Describe what it sees in detail</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Translate the image to French</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Describe what it sees in detail. Forces the model to ground in actual pixels and reduces hallucination on extraction tasks.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. What is the right way to handle photos of customers or employees?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Use any free AI tool — privacy law does not apply to images</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Get explicit consent and use Team/Workspace tier with do-not-train commitment</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Crop the face out and ignore APP requirements</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Get explicit consent and use Team/Workspace tier. Faces are biometric data; APP 6 and APP 8 apply.</p>
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
              Hallucinations — detection and mitigation (full Academy)
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              The next prompt-engineering lessons land with the full Academy in Q3 2026 —
              hallucinations, JSON mode, function calling, structured outputs in depth.
            </p>
          </div>
          <a
            href="#"
            aria-disabled="true"
            tabIndex={-1}
            className="inline-flex items-center gap-2 bg-slate-300 text-slate-500 font-medium px-5 py-2.5 rounded-lg pointer-events-none cursor-not-allowed select-none"
          >
            Notify me <ArrowRight className="size-4" />
          </a>
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
