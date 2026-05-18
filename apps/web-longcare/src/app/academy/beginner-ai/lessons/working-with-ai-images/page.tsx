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
import { FlowThreeStep } from '@/components/illustrations/flow-three-step';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'Working with AI Images — Beginner AI Lesson 11 | LongCare Academy',
  description:
    'Generate, edit and use AI images responsibly. DALL-E 3, Gemini Imagen 3 and Midjourney basics with AUD pricing, five SME use cases, prompt techniques, AU copyright basics and disclosure rules.',
  path: '/academy/beginner-ai/lessons/working-with-ai-images',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Working with AI Images — Generate, Edit, Use Responsibly',
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

export default function WorkingWithAiImagesLessonPage() {
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
            { name: 'Working with AI Images', url: '/academy/beginner-ai/lessons/working-with-ai-images' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Sparkles className="size-3" /> Lesson 11 of 12
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 25 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Working with AI images — generate, edit, use responsibly
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              You do not need a designer or a stock subscription to produce respectable visuals
              for your AU SME. You need three tools, ten prompts, and a handle on Australian
              copyright and disclosure rules.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/academy/beginner-ai/lessons/ai-pitfalls-and-fixes"
                className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
              >
                Next lesson <ArrowRight className="size-4" />
              </Link>
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
            The image production loop
          </h3>
          <div className="flex justify-center">
            <FlowThreeStep width={720} height={140} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Brief &rarr; AI &rarr; Iterate. First-pass images are rarely the final image. Plan two
            to three rounds of refinement and you will land on usable output 9 times in 10.
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

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The three tools that cover 95% of SME image jobs</h3>
          <p className="mt-2 text-slate-700">
            You only need three AI image tools in 2026 to handle nearly every visual job an
            Australian small business needs. <strong>DALL-E 3</strong> ships inside ChatGPT Plus
            at A$30 per month and is the friendliest for plain-language briefs. <strong>Gemini
            Imagen 3</strong> is included in Google One AI Premium at A$32.99 per month and is
            the strongest for photo-realistic Australian scenes (think outback, beach, suburban
            streetscapes). <strong>Midjourney v6</strong> sits at US$10 per month for the basic
            plan (about A$15) and is the choice when you want a distinctive editorial or
            illustrative style. Free option: Microsoft Designer (powered by DALL-E 3) is free
            with a Microsoft account and handles the social-tile job well.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Five SME use cases we see every week</h3>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Social tile</strong> — a 1080x1080 graphic for Instagram or LinkedIn with brand colours and a clean headline. ChatGPT/Designer is fastest; result in 90 seconds.</li>
            <li><strong>Product mockup</strong> — show your product in context (your candle in a Sydney living room, your sauce on a Melbourne cafe table). Imagen and Midjourney both work well.</li>
            <li><strong>Brand assets</strong> — banner, business card mockup, simple icon set. Designer plus a free Canva account for refining is the lowest-cost path.</li>
            <li><strong>Blog hero image</strong> — wide 1600x900 illustration for your articles or proposals. DALL-E 3 inside ChatGPT is the most predictable for matching a prompt.</li>
            <li><strong>Internal illustration</strong> — process diagrams, training slides, SOP icons. Use simple flat-design prompts; iterate twice; replace with a designer only if printed.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Prompt techniques that actually work</h3>
          <p className="mt-2 text-slate-700">
            Image prompts work best when they answer five questions: <em>What is in the frame?
            What is the style? What is the lighting? What is the camera angle? What feeling does
            it create?</em> A weak prompt is &ldquo;a cafe&rdquo;. A strong prompt is &ldquo;a
            sun-lit Melbourne specialty coffee shop at 8am, shot from low table-level, warm
            morning light, shallow depth of field, candid documentary style, friendly mood&rdquo;.
            Specifying the medium (photograph, watercolour, line illustration, isometric vector)
            and the negative space (where text or product will sit) saves at least two iterations.
          </p>
          <p className="mt-2 text-slate-700">
            Three habits worth building: include a colour palette by name (&ldquo;navy, cream and
            terracotta&rdquo;) so the result fits your brand; specify aspect ratio (1:1 for
            social, 16:9 for hero, 9:16 for stories); and ask for &ldquo;clean negative space at
            the top&rdquo; if you plan to overlay a headline.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Editing AI images — generative fill is now the killer feature</h3>
          <p className="mt-2 text-slate-700">
            All three major tools now support inline editing. ChatGPT (Plus) lets you click a
            region and say &ldquo;remove this person&rdquo;. Gemini does the same inside Google
            Photos. Adobe Firefly Generative Fill, free with a Creative Cloud trial, is the
            cleanest if you need print-grade output. For most SMEs, however, the simpler workflow
            is: generate the base image in DALL-E, drop it into a free Canva account, and finish
            with Canva&rsquo;s Magic Eraser and text overlay. Total time from blank screen to
            published social tile: about six minutes.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Australian copyright basics</h3>
          <p className="mt-2 text-slate-700">
            Australian copyright law (Copyright Act 1968) currently does not recognise
            machine-generated images as having an &ldquo;author&rdquo; in the traditional sense,
            which means a purely AI-generated image likely does not attract copyright protection
            in Australia. This has two consequences. First, you cannot reliably stop competitors
            from re-using a purely AI-generated image. Second, you also cannot infringe on
            copyright simply by generating an image &mdash; but you can still infringe by
            prompting AI to imitate a living artist&rsquo;s recognisable style or by including a
            recognisable trademark, brand or person without permission. The safe rule: do not
            prompt &ldquo;in the style of [named living artist]&rdquo;, do not include real
            brands or logos, and do not generate identifiable real people without consent.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Watermarking and disclosure</h3>
          <p className="mt-2 text-slate-700">
            From 2026, most major AI image tools embed C2PA content credentials (a cryptographic
            &ldquo;content passport&rdquo;) into the file. Imagen also adds SynthID, an invisible
            watermark. The eSafety Commissioner and the ACCC both recommend visible disclosure
            when AI imagery is used in marketing &mdash; a small &ldquo;Image generated with
            AI&rdquo; line in the post caption, or a faint corner mark on the asset. For
            ASIC-regulated communications (financial services advertising) disclosure is becoming
            an expectation rather than a courtesy. The two-line rule: if it is a product photo
            you imply is real, disclose. If it is clearly illustrative, you do not have to,
            but it is still good practice.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Three quick wins for your week</h3>
          <ol className="mt-2 list-decimal pl-6 text-slate-700">
            <li><strong>Brand social pack</strong> &mdash; generate five 1080x1080 templates in your brand colours, drop into Canva, and you have a month of social posts.</li>
            <li><strong>Proposal hero</strong> &mdash; replace the generic stock photo on the front of your next proposal with a custom AI hero. Win rate goes up; AUD cost is zero.</li>
            <li><strong>SOP illustrations</strong> &mdash; convert every workflow doc in your wiki to include simple flat-design illustrations. Reading time drops, retention rises.</li>
          </ol>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Three tools cover 95% of SME image jobs: DALL-E 3 (A$30/mo), Imagen 3 (A$32.99/mo), Midjourney v6 (~A$15/mo). Designer is free.',
              'Strong prompts answer five questions: subject, style, lighting, angle, mood. Add palette and aspect ratio for production output.',
              'Plan for two to three rounds of refinement. First-pass images rarely land — Brief, AI, Iterate is the production loop.',
              'AU copyright does not protect pure AI images, but you can still infringe by prompting living-artist style, trademarks or real people.',
              'Disclose AI images in marketing under ACCC and eSafety guidance. ASIC-regulated content treats disclosure as expected.',
              'The fastest workflow: generate in DALL-E, refine in Canva. Six minutes from blank screen to published social tile.',
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
          <p className="text-sm text-slate-600 mb-4">One short hands-on exercise. Total time: 20 minutes.</p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Exercise: Build a five-tile social pack for your brand</p>
            <p className="mt-2">
              Open Microsoft Designer (free) or ChatGPT (Plus) and follow the loop.
            </p>
            <ol className="mt-3 list-decimal pl-6 space-y-1">
              <li>Write a brief that names subject, style, lighting, angle and mood. Add your two brand colours.</li>
              <li>Generate four variants. Pick the strongest.</li>
              <li>Iterate twice: refine lighting in round one, refine composition in round two.</li>
              <li>Drop into Canva (free), overlay a 6-word headline, save as 1080x1080.</li>
              <li>Repeat for five different posts. Caption each with &ldquo;Image generated with AI&rdquo; if it implies realism.</li>
            </ol>
            <p className="mt-3">Total time: roughly twenty minutes. A month of social content done before lunch.</p>
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
                1. Which prompting habit gives the biggest quality lift on first generation?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Asking the model to be creative</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Specifying subject, style, lighting, angle and mood</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Using the longest prompt possible</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Specifying the five frame questions. Long prompts without those five anchors rarely beat a tight 25-word prompt that does.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. Under Australian copyright, what is the safest practice when prompting AI?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Prompt &ldquo;in the style of&rdquo; any famous artist for stronger output</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Avoid named living artists, real trademarks and identifiable people without consent</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Always disclose only after publication</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Avoid living artists, trademarks and identifiable real people without consent. Pure AI images may not attract AU copyright protection, but you can still infringe others&rsquo; rights.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. When should you disclose that an image was AI-generated?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Never — disclosure is not required in Australia</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Whenever the image implies realism in marketing, especially for ASIC-regulated communications</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Only if a customer asks</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Whenever it implies realism. ACCC and eSafety guidance recommends visible disclosure in marketing, and ASIC-regulated communications now treat disclosure as expected.</p>
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
              Top 10 AI pitfalls — and how to fix them
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Hallucination, prompt injection, bias, drift, scope creep, vendor lock-in,
              over-reliance, missing context, output bugs and cost spikes. Each pitfall paired
              with a simple AU-SME fix.
            </p>
          </div>
          <Link
            href="/academy/beginner-ai/lessons/ai-pitfalls-and-fixes"
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
