import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Sparkles,
  Building2,
  Zap,
  MessageSquareCode,
  Workflow,
  GraduationCap,
  BookOpen,
  Award,
  ArrowRight,
  Clock,
  Stethoscope,
  Home,
  Headset,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { HeroMentor } from '@/components/illustrations/hero-mentor';
import { InfographicRoiQuadrant } from '@/components/illustrations/infographic-roi-quadrant';

export const metadata: Metadata = getPageMetadata({
  title: 'AI Academy — 5 Learning Paths for SMEs | LongCare AU',
  description:
    'Practical AI training for Australian SMEs and professionals. 5 learning paths, 40+ lessons, certificates included. Start with Beginner AI or jump to Automation.',
  path: '/academy',
});

type Path = {
  slug: string;
  title: string;
  href: string;
  Icon: typeof Sparkles;
  level: string;
  lessons: number;
  hours: number;
  description: string;
  price: string;
};

const PATHS: Path[] = [
  {
    slug: 'beginner-ai',
    title: 'Beginner AI',
    href: '/academy/beginner-ai',
    Icon: Sparkles,
    level: 'Beginner',
    lessons: 8,
    hours: 4,
    description:
      'Start from zero. Learn ChatGPT, Gemini, and the AI tools that matter.',
    price: 'A$49',
  },
  {
    slug: 'ai-for-business',
    title: 'AI for Business',
    href: '/academy/ai-for-business',
    Icon: Building2,
    level: 'SME owners',
    lessons: 10,
    hours: 6,
    description:
      'Apply AI to sales, ops, and customer service in your business.',
    price: 'A$99',
  },
  {
    slug: 'ai-productivity',
    title: 'AI Productivity',
    href: '/academy/ai-productivity',
    Icon: Zap,
    level: 'Professionals',
    lessons: 8,
    hours: 4,
    description:
      'Save 10+ hrs/week with AI tools for email, docs, meetings.',
    price: 'A$59',
  },
  {
    slug: 'prompt-engineering',
    title: 'Prompt Engineering',
    href: '/academy/prompt-engineering',
    Icon: MessageSquareCode,
    level: 'Intermediate',
    lessons: 8,
    hours: 5,
    description:
      'Write prompts that produce reliable, consistent output.',
    price: 'A$79',
  },
  {
    slug: 'ai-automation',
    title: 'AI Automation',
    href: '/academy/ai-automation',
    Icon: Workflow,
    level: 'Advanced',
    lessons: 10,
    hours: 8,
    description:
      'Build AI workflows that run without you.',
    price: 'A$149',
  },
];

const COMING_SOON = [
  {
    title: 'AI for Healthcare',
    description: 'Clinical workflows, patient comms, and compliant AI for Australian practices.',
    Icon: Stethoscope,
  },
  {
    title: 'AI for Real Estate',
    description: 'Listings, lead nurturing, and contract drafting tailored for AU agents.',
    Icon: Home,
  },
  {
    title: 'AI for Customer Service',
    description: 'Triage, deflection, and tone-aware responses with full oversight.',
    Icon: Headset,
  },
];

export default function AcademyHubPage() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'LongCare AI Academy — Learning Paths',
    itemListElement: PATHS.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Course',
        name: p.title,
        description: p.description,
        url: `https://longcare.au${p.href}`,
        provider: {
          '@type': 'Organization',
          name: 'LongCare AU',
          sameAs: 'https://longcare.au',
        },
        educationalLevel: p.level,
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'online',
          courseWorkload: `PT${p.hours}H`,
        },
      },
    })),
  };

  return (
    <main className="bg-[#F8FAFC] text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-6">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Academy', url: '/academy' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-8 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
              <GraduationCap className="size-3" /> LongCare AI Academy
            </Badge>
            <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              LongCare AI Academy
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Practical AI training for Australian SMEs and professionals. Hands-on
              lessons, real workflows, and certificates you can show.
            </p>

            {/* Stats row */}
            <div className="mt-8 flex flex-wrap gap-6 sm:gap-10 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <GraduationCap className="size-5 text-sky-700" />
                <span><strong className="text-slate-900">5</strong> learning paths</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="size-5 text-sky-700" />
                <span><strong className="text-slate-900">40+</strong> lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="size-5 text-sky-700" />
                <span>Certificates included</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroMentor className="text-sky-700" width={420} height={320} />
          </div>
        </div>
      </section>

      {/* Why Academy — ROI quadrant infographic */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900">
              Why this Academy works
            </h2>
            <p className="mt-2 text-slate-600 max-w-2xl mx-auto">
              Every lesson is mapped to where AI actually pays off for Australian small businesses —
              high volume, low risk first.
            </p>
          </div>
          <div className="flex justify-center">
            <InfographicRoiQuadrant width={720} height={360} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            The ROI quadrant we use to scope every lesson — start in the high-volume / low-risk corner.
          </p>
        </div>
      </section>

      {/* Paths grid */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <h2 className="text-2xl font-semibold text-slate-900 mb-6">Learning paths</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PATHS.map(({ slug, title, href, Icon, level, lessons, hours, description, price }) => (
            <Link
              key={slug}
              href={href}
              className="group bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-sky-300 transition flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="size-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
                  <Icon className="size-5" />
                </div>
                <Badge variant="outline" className="border-slate-200 text-slate-600">
                  {level}
                </Badge>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 group-hover:text-sky-700 transition">
                {title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 flex-1">{description}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <BookOpen className="size-3.5" /> {lessons} lessons
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3.5" /> {hours} hrs
                </span>
                <span className="font-medium text-slate-700">{price}</span>
              </div>
              <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-sky-700 group-hover:gap-2 transition-all">
                Explore path <ArrowRight className="size-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Coming soon */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">Coming soon</h2>
        <p className="text-sm text-slate-600 mb-6">
          Industry-specific paths are in production. Tell us which one you need first.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COMING_SOON.map(({ title, description, Icon }) => (
            <div
              key={title}
              className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="size-10 rounded-lg bg-slate-50 text-slate-500 flex items-center justify-center">
                  <Icon className="size-5" />
                </div>
                <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">
                  Coming Soon
                </Badge>
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-20">
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm text-center">
          <h2 className="text-2xl font-semibold text-slate-900">
            Not sure where to start?
          </h2>
          <p className="mt-2 text-slate-600">
            Take a 5-minute assessment and get a personalised learning path recommendation.
          </p>
          <Link
            href="/resources/ai-readiness"
            className="mt-6 inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
          >
            Take the AI Readiness Assessment <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
