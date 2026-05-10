import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock,
  GraduationCap,
  Play,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { HeroRetail } from '@/components/illustrations/hero-retail';
import { FlowAutomation } from '@/components/illustrations/flow-automation';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'Marketing Content Engine — 30 Posts in 30 Minutes | AI for Business Lesson 5 | LongCare Academy',
  description:
    'A repeatable AI marketing engine for AU SMEs — one brief generates a week of LinkedIn, Instagram, Facebook, X, and email content with brand voice, hashtags, imagery, and Spam Act compliance.',
  path: '/academy/ai-for-business/lessons/marketing-content-engine',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Marketing Content Engine — 30 Posts in 30 Minutes',
  educationalLevel: 'SME owners',
  learningResourceType: 'Lesson',
  timeRequired: 'PT30M',
  inLanguage: 'en-AU',
  isPartOf: {
    '@type': 'Course',
    name: 'AI for Business',
    url: 'https://longcare.au/academy/ai-for-business',
  },
  provider: {
    '@type': 'Organization',
    name: 'LongCare AU',
    sameAs: 'https://longcare.au',
  },
};

export default function MarketingContentEngineLessonPage() {
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
            { name: 'AI for Business', url: '/academy/ai-for-business' },
            { name: 'Marketing Content Engine', url: '/academy/ai-for-business/lessons/marketing-content-engine' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Building2 className="size-3" /> Lesson 5 of 10
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 30 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Marketing content engine — 30 posts in 30 minutes
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              The repeatable AI marketing system: one brief, five channels, a week of content,
              fully compliant with the Spam Act 2003 and Privacy Act &mdash; without sounding like
              a robot wrote it.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
              >
                Mark complete &amp; next <ArrowRight className="size-4" />
              </a>
              <Link
                href="/academy/ai-for-business"
                className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
              >
                <ArrowLeft className="size-4" /> Back to path
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroRetail className="text-sky-700" width={420} height={320} />
          </div>
        </div>
      </section>

      {/* Inline flow */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            The content engine: brief &rarr; AI generates &rarr; variants &rarr; schedule &rarr; post
          </h3>
          <div className="flex justify-center">
            <FlowAutomation width={720} height={180} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            One brief, five channels, fortnightly cadence. The engine runs in 30 minutes once a
            week.
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
              Walk-through screencast in production. The transcript below covers every step.
            </span>
          </div>
        </div>
      </section>

      {/* Transcript */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The content brief — one fill-in-the-blank</h3>
          <p className="mt-2 text-slate-700">
            Most SMEs sit down on a Sunday night with a cold coffee, stare at LinkedIn, and write
            one post that&rsquo;s 60% as good as it could be. The fix is a templated brief that takes
            three minutes to fill in and produces 30 pieces of content. Here it is:
          </p>
          <pre className="mt-2 bg-slate-50 border border-slate-200 rounded-md p-4 text-xs text-slate-800 whitespace-pre-wrap">{`THIS WEEK'S CONTENT BRIEF
- Business: [your business]
- Audience: [who you want to reach]
- This week's hero topic: [one customer problem you solved or one insight]
- Offer or CTA: [book a chat / download guide / no offer]
- Brand voice: [friendly / professional / empathetic / cheeky] — pick 2
- Channels: LinkedIn, Instagram, Facebook, X, Email newsletter
- Australian English. No buzzwords. No emoji storms.`}</pre>
          <p className="mt-2 text-slate-700">
            Paste this brief into ChatGPT, Gemini, or Claude with a request: <em>&ldquo;Generate one
            week of content. For each channel, produce three posts (one Mon, one Wed, one
            Fri).&rdquo;</em> You will receive 15 LinkedIn-style posts, 15 Instagram captions, 15
            tweets, and three weekly emails. That&rsquo;s your raw content.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Multi-platform repurposing — one source, five outputs</h3>
          <p className="mt-2 text-slate-700">
            The trick is that <strong>each channel needs a different shape, not different
            substance.</strong> One topic, five wrappers:
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>LinkedIn</strong> &mdash; 200&ndash;400 words, story-driven, no hashtags overload, focus on insight.</li>
            <li><strong>Instagram</strong> &mdash; 80&ndash;150 word caption, image- or carousel-led, 6&ndash;10 niche hashtags, AU location tag.</li>
            <li><strong>Facebook</strong> &mdash; 100&ndash;200 words, conversational, link to long-form when relevant.</li>
            <li><strong>X (formerly Twitter)</strong> &mdash; 280-character thread of 3&ndash;5 tweets, sharper, opinion-led.</li>
            <li><strong>Email newsletter</strong> &mdash; subject line, preview, 250-word body with one clear CTA, single column.</li>
          </ul>
          <p className="mt-2 text-slate-700">
            Add to your prompt: <em>&ldquo;Repurpose the same topic across LinkedIn, Instagram,
            Facebook, X (3-tweet thread), and email. Match tone to platform and AU
            audience.&rdquo;</em> AI handles this in one shot now.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Brand voice matrix</h3>
          <p className="mt-2 text-slate-700">
            Brand voice consistency is what separates AI sludge from professional content. Pick
            two adjectives from this matrix and lock them in:
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Formal</strong> &mdash; full sentences, precise vocabulary, no contractions. Sample: &ldquo;We have updated our pricing structure to better reflect the value delivered.&rdquo;</li>
            <li><strong>Friendly</strong> &mdash; contractions, &ldquo;you&rdquo; and &ldquo;we,&rdquo; warm tone. Sample: &ldquo;We&rsquo;ve refreshed our pricing &mdash; here&rsquo;s why and what it means for you.&rdquo;</li>
            <li><strong>Empathetic</strong> &mdash; acknowledges the reader&rsquo;s feelings before content. Sample: &ldquo;We know aged-care decisions are heavy. Here&rsquo;s a simpler way through.&rdquo;</li>
            <li><strong>Technical</strong> &mdash; specific numbers, methodology references. Sample: &ldquo;Our 2025 cohort showed a 38% reduction in admin time across 142 SMEs.&rdquo;</li>
          </ul>
          <p className="mt-2 text-slate-700">
            Save your two-adjective combo (e.g. &ldquo;friendly + empathetic&rdquo;) in the
            custom-instruction field of your AI tool so it carries automatically across every
            prompt.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Hashtag research with AI</h3>
          <p className="mt-2 text-slate-700">
            Stop guessing hashtags. Ask AI: <em>&ldquo;For an Australian [your industry] business
            posting on Instagram about [topic], suggest 10 hashtags grouped by reach: 3 broad, 4
            mid-sized, 3 niche AU-specific. Return as a comma-separated list.&rdquo;</em> You get a
            balanced mix that algorithms reward.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Image prompts for each post</h3>
          <p className="mt-2 text-slate-700">
            Add to your weekly content brief: <em>&ldquo;For each post, suggest a Canva or
            Midjourney prompt for a matching square image. Keep brand colours [colour 1] and
            [colour 2]. No people unless the topic requires.&rdquo;</em> You now have 15 ready-made
            image prompts. Paste them into Canva Magic in batch.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Posting cadence and AU best times</h3>
          <p className="mt-2 text-slate-700">
            Australian audiences peak Tuesday&ndash;Thursday, 7&ndash;9am AEST and 12&ndash;1pm
            AEST on LinkedIn; Instagram peaks 6&ndash;9pm AEST. Email opens crest 6&ndash;7am AEST
            on weekdays. Schedule via Buffer (about <strong>AUD&nbsp;$15/month</strong>),
            Hootsuite (about <strong>AUD&nbsp;$155/month</strong>), or Later (about
            <strong> AUD&nbsp;$35/month</strong>). Buffer&rsquo;s 2026 AI overlay drafts and
            schedules in a single move; Later&rsquo;s AI excels for visual-first brands.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">AU compliance — Spam Act 2003 and Privacy Act</h3>
          <p className="mt-2 text-slate-700">
            Marketing emails and SMS in Australia must comply with the <strong>Spam Act
            2003</strong>: explicit or inferred consent before sending, accurate sender
            identification, and a functional unsubscribe in every message. AI can draft your
            emails &mdash; it cannot bypass consent. Build your list ethically, store consent
            evidence, and honour unsubscribes within five business days. Privacy Act APP 7 (direct
            marketing) requires you to allow opt-out and explain how you got their information on
            request. Most ESPs (Mailchimp, Campaign Monitor AU, ActiveCampaign) handle the
            technical compliance &mdash; you supply consent.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The 30-minute weekly ritual</h3>
          <p className="mt-2 text-slate-700">
            Sunday afternoon. Open the brief template (5 min). Paste into ChatGPT, generate week
            (5 min). Copy into Buffer (10 min). Generate matching images in Canva (10 min). Done.
            That is 30 minutes for what used to be a Sunday. Your competitors are still staring at
            cold coffee.
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'A reusable content brief turns one Sunday hour into a week of content across five channels.',
              'Match shape to platform, but keep substance the same — repurposing is amplification, not duplication.',
              'Lock two brand-voice adjectives into your AI custom instructions so every prompt inherits them.',
              'Schedule via Buffer (AUD $15/month) or Later (AUD $35/month) — the AI overlay saves another 10 min per week.',
              'Spam Act 2003 and Privacy Act APP 7 still apply to AI-drafted emails. Consent and unsubscribes are non-negotiable.',
              'Your 30-minute ritual: brief, generate, repurpose, image, schedule.',
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
            <p className="font-semibold text-slate-900">Exercise: Run the engine for next week</p>
            <p className="mt-2">
              Open ChatGPT, Gemini, or Claude. Fill in the content brief above for your business
              (3 min). Send it with this instruction: <em>&ldquo;Generate one week of content
              across LinkedIn (3 posts), Instagram (3 posts with image prompts and hashtags),
              Facebook (3 posts), X (3 threads), and one email newsletter. Match tone to each
              platform.&rdquo;</em>
            </p>
            <p className="mt-3">
              Review for accuracy and voice. Generate matching images in Canva. Schedule for
              next week in Buffer or Later. Track engagement against your last manual week and
              compare in 14 days.
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
                1. What does the Spam Act 2003 require for marketing emails?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Consent, sender ID, working unsubscribe</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Just a working unsubscribe</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Nothing if the message is short</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">All three: consent (express or inferred), accurate sender identification, and a functional unsubscribe.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. How many brand voice adjectives should you lock in?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> One</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Two</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Five or more</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Two. One adjective is too narrow; five becomes mush. Two creates a recognisable voice.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. When does an Australian LinkedIn audience peak?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Sunday evening</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Tuesday&ndash;Thursday 7&ndash;9am AEST</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Friday 5pm AEST</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Tuesday&ndash;Thursday 7&ndash;9am AEST &mdash; commute and morning-coffee scrolling.</p>
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
              Operations &amp; supply chain AI for SMEs
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Five high-ROI ops automations covering inventory forecasting, supplier comms,
              logistics, and BAS prep.
            </p>
          </div>
          <Link
            href="/academy/ai-for-business/lessons/operations-and-supply"
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
            href="/academy/ai-for-business"
            className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
          >
            <ArrowLeft className="size-4" /> Back to AI for Business
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
