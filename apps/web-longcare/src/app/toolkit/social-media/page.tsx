import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Megaphone,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  ServerCog,
  Lock,
  UtensilsCrossed,
  ShoppingBag,
  Home,
  Mail,
  FileText,
  MessageCircle,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { FlowThreeStep } from '@/components/illustrations/flow-three-step';
import { WaitlistForm } from '../waitlist-form';

export const metadata: Metadata = getPageMetadata({
  title: 'AI Social Media — Posts & Calendar | LongCare AU',
  description:
    '30 posts in 30 minutes. Tailored to LinkedIn, Instagram, Facebook, and X. Hashtag research, calendar generator, brand voice consistency. Free tier 100/month.',
  path: '/toolkit/social-media',
});

const FEATURES = [
  {
    title: 'Multi-platform posts',
    body: 'Tailored copy for LinkedIn, Instagram, Facebook, and X — same idea, four voices.',
  },
  {
    title: 'Weekly calendar generator',
    body: 'A 7-day or 30-day plan with topics, formats, and posting cadence.',
  },
  {
    title: 'Hashtag research',
    body: 'Audience-relevant hashtags ranked by reach, competition, and AU usage.',
  },
  {
    title: 'Caption variations',
    body: 'Three caption options per post — short, story, and CTA-driven.',
  },
  {
    title: 'Brand voice consistency',
    body: 'Trained once on your style guide. Every post sounds unmistakably you.',
  },
  {
    title: 'Engagement-time suggestions',
    body: 'Recommends posting times based on your audience and channel benchmarks.',
  },
];

const PERSONAS = [
  'Marketing managers running lean teams',
  'Agency owners juggling multiple SME clients',
  'Solo founders who hate writing captions',
  'Retailers running weekly campaigns and promotions',
];

const INDUSTRIES = [
  {
    name: 'Hospitality',
    body: 'Daily specials, event promos, and venue ambience posts in your brand voice.',
    href: '/solutions/hospitality',
    Icon: UtensilsCrossed,
  },
  {
    name: 'Retail',
    body: 'Product launches, sale calendars, and user-generated-content prompts.',
    href: '/solutions/retail',
    Icon: ShoppingBag,
  },
  {
    name: 'Real Estate',
    body: 'New listings, open-home reminders, and suburb spotlight content.',
    href: '/solutions/real-estate',
    Icon: Home,
  },
];

const SIBLINGS = [
  {
    slug: 'email-assistant',
    name: 'Email Assistant',
    blurb: 'Reply, summarise, draft. Tone-aware and brand-aware.',
    Icon: Mail,
  },
  {
    slug: 'document-generator',
    name: 'Document Generator',
    blurb: 'Briefs, reports, and SOPs from a single prompt.',
    Icon: FileText,
  },
  {
    slug: 'customer-support',
    name: 'Customer Support',
    blurb: 'AI replies for tickets and chat with human handoff.',
    Icon: MessageCircle,
  },
];

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'LongCare AI Social Media',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: 'https://longcare.au/toolkit/social-media',
  description:
    'AI social media assistant for Australian SMEs. Multi-platform posts, calendar generator, hashtag research, brand-voice consistency, engagement-time suggestions.',
  offers: {
    '@type': 'Offer',
    price: '29.00',
    priceCurrency: 'AUD',
    availability: 'https://schema.org/PreOrder',
  },
  featureList: FEATURES.map((feature) => feature.title),
  provider: {
    '@type': 'Organization',
    name: 'LongCare AU',
    url: 'https://longcare.au',
  },
};

export default function SocialMediaPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />

      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Toolkit', url: '/toolkit' },
            { name: 'Social Media', url: '/toolkit/social-media' },
          ]}
        />

        <section className="mx-auto mt-6 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-100">
            <Sparkles className="size-3.5" aria-hidden /> Early access · launching Q3 2026
          </span>
          <div className="mx-auto mt-6 flex size-14 items-center justify-center rounded-2xl bg-sky-50 text-sky-700 ring-1 ring-sky-100">
            <Megaphone className="size-7" aria-hidden />
          </div>
          <h1 className="font-heading mt-5 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            AI Social Media
          </h1>
          <p className="mt-5 text-lg text-slate-700">
            30 posts in 30 minutes. Tailored to LinkedIn, Instagram, Facebook, and X.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#waitlist"
              className="inline-flex items-center gap-2 rounded-full bg-sky-700 px-6 py-3 font-semibold text-white no-underline transition hover:bg-sky-600"
            >
              Join the waitlist <ArrowRight className="size-4" aria-hidden />
            </a>
            <a
              href="https://book.longcare.au?service=toolkit-discovery"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 no-underline transition hover:border-slate-400"
            >
              Book a demo
            </a>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="font-heading text-2xl font-semibold text-slate-900 sm:text-3xl">
            What it does
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {FEATURES.map(({ title, body }) => (
              <div
                key={title}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 size-5 shrink-0 text-emerald-600"
                    aria-hidden
                  />
                  <div>
                    <h3 className="font-semibold text-slate-900">{title}</h3>
                    <p className="mt-1 text-sm text-slate-700">{body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <h2 className="font-heading text-2xl font-semibold text-slate-900 sm:text-3xl">
            Who it&apos;s for
          </h2>
          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {PERSONAS.map((persona) => (
              <li
                key={persona}
                className="flex items-start gap-3 text-sm text-slate-700"
              >
                <CheckCircle2
                  className="mt-0.5 size-4 shrink-0 text-sky-700"
                  aria-hidden
                />
                {persona}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20">
          <h2 className="font-heading text-2xl font-semibold text-slate-900 sm:text-3xl">
            Sample input → output
          </h2>
          <div className="mt-8 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-10 overflow-x-auto">
            <div className="flex justify-center">
              <FlowThreeStep width={760} height={140} />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4 text-center text-sm text-slate-600 max-w-2xl mx-auto">
              <div><strong className="text-slate-900 block">Prompt</strong>Set theme &amp; channels</div>
              <div><strong className="text-slate-900 block">Create</strong>AI fills the calendar</div>
              <div><strong className="text-slate-900 block">Schedule</strong>Approve &amp; publish</div>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
                Prompt
              </span>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                &ldquo;Promote our new dental hygiene service launching 1 June.
                Friendly, family-focused tone. Mention our Sunday hours.&rdquo;
              </p>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-6 shadow-sm sm:p-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                AI output · 4 platform-tailored posts
              </span>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                <li>
                  <strong className="text-slate-900">LinkedIn (professional):</strong>
                  {' '}Why we added Sunday hygiene appointments — a 200-word post for
                  the local business community.
                </li>
                <li>
                  <strong className="text-slate-900">Instagram (visual):</strong>
                  {' '}Caption + 5 hashtags + suggested image prompt for a smiling
                  family in clinic.
                </li>
                <li>
                  <strong className="text-slate-900">Facebook (community):</strong>
                  {' '}Short announcement + 2 reply-prompts to drive comments and
                  bookings.
                </li>
                <li>
                  <strong className="text-slate-900">X (concise):</strong> 220-char
                  post + 3 hashtags. Best posting time: Tue 7pm AEST.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="font-heading text-2xl font-semibold text-slate-900 sm:text-3xl">
            Use cases by industry
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {INDUSTRIES.map(({ name, body, href, Icon }) => (
              <Link
                key={name}
                href={href}
                className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-sky-300 hover:shadow-md"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-sky-50 text-sky-700 ring-1 ring-sky-100">
                  <Icon className="size-5" aria-hidden />
                </div>
                <h3 className="mt-4 font-semibold text-slate-900 group-hover:text-sky-700">
                  {name}
                </h3>
                <p className="mt-2 text-sm text-slate-700">{body}</p>
                <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-sky-700">
                  See {name.toLowerCase()} solutions
                  <ArrowRight className="size-4" aria-hidden />
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <h2 className="font-heading text-2xl font-semibold text-slate-900 sm:text-3xl">
            What&apos;s under the hood
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex items-start gap-3">
              <ServerCog className="mt-0.5 size-5 shrink-0 text-sky-700" aria-hidden />
              <div>
                <h3 className="font-semibold text-slate-900">Gemini 2.0 Flash</h3>
                <p className="mt-1 text-sm text-slate-700">
                  Routed via Vertex AI for batch generation across 4 platforms.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck
                className="mt-0.5 size-5 shrink-0 text-sky-700"
                aria-hidden
              />
              <div>
                <h3 className="font-semibold text-slate-900">AU data residency</h3>
                <p className="mt-1 text-sm text-slate-700">
                  Hosted in <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">australia-southeast1</code>.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Lock className="mt-0.5 size-5 shrink-0 text-sky-700" aria-hidden />
              <div>
                <h3 className="font-semibold text-slate-900">No training on your data</h3>
                <p className="mt-1 text-sm text-slate-700">
                  Your brand voice and content stay yours. Privacy Act aligned.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <h2 className="font-heading text-2xl font-semibold text-slate-900 sm:text-3xl">
            Pricing
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-slate-900">Free tier</p>
              <p className="mt-2 text-sm text-slate-700">
                100 posts per month. Forever. No credit card required.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">SME plan · A$29/month</p>
              <p className="mt-2 text-sm text-slate-700">
                Unlimited posts across all 7 Toolkit apps, calendar export, brand
                voice memory.
              </p>
            </div>
          </div>
          <div className="mt-6">
            <Link
              href="/toolkit"
              className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700"
            >
              See full plans &amp; pricing <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </section>

        <section
          id="waitlist"
          className="mt-20 rounded-xl border border-sky-200 bg-gradient-to-br from-sky-50 to-emerald-50 p-6 shadow-sm sm:p-12"
        >
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-2xl font-semibold text-slate-900 sm:text-3xl">
              Get early access to Social Media
            </h2>
            <p className="mt-3 text-slate-700">
              Win back your weekends. Join the waitlist below.
            </p>
            <div className="mt-8">
              <WaitlistForm source="toolkit-waitlist-social-media" />
            </div>
            <p className="mt-6 text-sm text-slate-600">
              Want a guided walkthrough?{' '}
              <a
                href="https://book.longcare.au?service=toolkit-discovery"
                className="font-semibold text-sky-700 underline"
              >
                Book a demo
              </a>
              .
            </p>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="font-heading text-2xl font-semibold text-slate-900 sm:text-3xl">
            Related tools
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {SIBLINGS.map(({ slug, name, blurb, Icon }) => (
              <Link
                key={slug}
                href={`/toolkit/${slug}`}
                className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-sky-300 hover:shadow-md"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-sky-50 text-sky-700 ring-1 ring-sky-100">
                  <Icon className="size-5" aria-hidden />
                </div>
                <h3 className="mt-4 font-semibold text-slate-900 group-hover:text-sky-700">
                  {name}
                </h3>
                <p className="mt-2 text-sm text-slate-700">{blurb}</p>
                <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-sky-700">
                  Explore <ArrowRight className="size-4" aria-hidden />
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/toolkit"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 no-underline transition hover:border-slate-400"
            >
              Back to Toolkit hub
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
