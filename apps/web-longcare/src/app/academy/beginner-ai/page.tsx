import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  GraduationCap,
  Sparkles,
  Building2,
  Zap,
  MessageSquareCode,
  Workflow,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { HeroMentor } from '@/components/illustrations/hero-mentor';

export const metadata: Metadata = getPageMetadata({
  title: 'Beginner AI — Start from Zero | LongCare Academy',
  description:
    'Beginner AI course for Australians starting from zero. Learn ChatGPT, Gemini, Claude, prompts, and privacy basics in 8 lessons over 4 hours.',
  path: '/academy/beginner-ai',
});

const lessons = [
  { id: 1, title: 'What is AI? A practical overview for non-techies', duration: '15 min' },
  { id: 2, title: 'Setting up ChatGPT, Gemini, and Claude accounts', duration: '20 min' },
  { id: 3, title: 'Your first 10 prompts that actually work', duration: '15 min' },
  { id: 4, title: 'AI for everyday tasks: email, summaries, brainstorming', duration: '25 min' },
  { id: 5, title: 'Image AI: when and how to use it', duration: '15 min' },
  { id: 6, title: 'Voice AI: dictation, transcription, and meeting notes', duration: '15 min' },
  { id: 7, title: 'Privacy basics: what NOT to share with AI', duration: '15 min' },
  { id: 8, title: 'Building your AI habit + capstone task', duration: '15 min' },
];

const learnings = [
  'Understand what AI tools actually do (and what they don’t)',
  'Use ChatGPT, Gemini, and Claude confidently for daily tasks',
  'Save 5+ hours per week on routine writing and admin',
  'Avoid common AI privacy mistakes Australians make',
  'Build a sustainable, simple AI habit you’ll keep using',
  'Know when to use image, voice, or text AI for the job',
];

const related = [
  { title: 'AI for Business', href: '/academy/ai-for-business', Icon: Building2 },
  { title: 'AI Productivity', href: '/academy/ai-productivity', Icon: Zap },
  { title: 'Prompt Engineering', href: '/academy/prompt-engineering', Icon: MessageSquareCode },
  { title: 'AI Automation', href: '/academy/ai-automation', Icon: Workflow },
];

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Beginner AI — Start from Zero',
  description:
    'Beginner-friendly AI course covering ChatGPT, Gemini, Claude, prompts, image and voice AI, and privacy basics.',
  provider: {
    '@type': 'Organization',
    name: 'LongCare AU',
    sameAs: 'https://longcare.au',
  },
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'online',
    courseWorkload: 'PT4H',
  },
  educationalLevel: 'Beginner',
  offers: {
    '@type': 'Offer',
    price: '49.00',
    priceCurrency: 'AUD',
    availability: 'https://schema.org/InStock',
    url: 'https://longcare.au/academy/beginner-ai',
  },
};

export default function BeginnerAIPage() {
  return (
    <main className="bg-[#F8FAFC] text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />

      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-6">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Academy', url: '/academy' },
            { name: 'Beginner AI', url: '/academy/beginner-ai' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-8 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Sparkles className="size-3" /> Beginner
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 4 hours
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <GraduationCap className="size-3" /> 8 lessons
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Beginner AI — Start from Zero
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Never used AI before? Start here. In 4 hours you’ll go from zero to confidently
              using ChatGPT, Gemini, and Claude for everyday work and personal tasks.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/academy/beginner-ai/lessons/what-is-ai"
                className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
              >
                Start Lesson 1 — Free <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/academy"
                className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
              >
                All paths
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroMentor className="text-sky-700" width={420} height={320} />
          </div>
        </div>
      </section>

      {/* What you'll learn */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            What you’ll learn
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {learnings.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="size-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Lessons */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">Lessons</h2>
        <ol className="bg-white border border-slate-200 rounded-xl shadow-sm divide-y divide-slate-100">
          {lessons.map((l) => {
            const isFree = l.id === 1;
            const content = (
              <>
                <div className="flex items-start gap-4">
                  <span className="size-8 rounded-full bg-sky-50 text-sky-700 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    {l.id}
                  </span>
                  <span className="text-sm sm:text-base text-slate-800">{l.title}</span>
                  {isFree && (
                    <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                      Free
                    </Badge>
                  )}
                </div>
                <span className="flex items-center gap-1 text-xs text-slate-500 flex-shrink-0">
                  <Clock className="size-3.5" /> {l.duration}
                </span>
              </>
            );
            if (isFree) {
              return (
                <li key={l.id}>
                  <Link
                    href="/academy/beginner-ai/lessons/what-is-ai"
                    className="flex items-center justify-between gap-4 p-4 sm:p-5 hover:bg-sky-50/40 transition group"
                  >
                    {content}
                  </Link>
                </li>
              );
            }
            return (
              <li key={l.id} className="flex items-center justify-between gap-4 p-4 sm:p-5">
                {content}
              </li>
            );
          })}
        </ol>
      </section>

      {/* Pricing / Free tier */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Pricing</h3>
            <p className="mt-1 text-sm text-slate-600">
              First lesson is free. Full course <strong>A$49</strong> — or included with the
              5-pack Mentor bundle.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://book.longcare.au?service=academy-beginner-ai"
              className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
            >
              Start Free Lesson <ArrowRight className="size-4" />
            </a>
            <Link
              href="/services/packages"
              className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
            >
              View packages
            </Link>
          </div>
        </div>
      </section>

      {/* Related paths */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-20">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">Other learning paths</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {related.map(({ title, href, Icon }) => (
            <Link
              key={href}
              href={href}
              className="group bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-sky-300 transition flex items-center gap-3"
            >
              <div className="size-9 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
                <Icon className="size-4" />
              </div>
              <span className="text-sm font-medium text-slate-800 group-hover:text-sky-700">
                {title}
              </span>
              <ArrowRight className="size-4 text-slate-400 ml-auto group-hover:text-sky-700" />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
