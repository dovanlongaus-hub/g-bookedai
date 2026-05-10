import type { Metadata } from 'next';
import Link from 'next/link';
import {
  GraduationCap,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Stethoscope,
  Briefcase,
  ShoppingBag,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { IndustryEducation } from '@/components/illustrations/industry-education';
import { HeroEducation } from '@/components/illustrations/hero-education';
import { FlowThreeStep } from '@/components/illustrations/flow-three-step';

export const metadata: Metadata = getPageMetadata({
  title: 'AI for Education — Tutoring Centres, RTOs, Educators | LongCare AU',
  description:
    'AI workflows for Australian tutoring centres, RTOs, and educators: lesson planning aligned to AU curriculum, marking assistance, parent comms, and compliance reports.',
  path: '/solutions/education',
});

const PAIN_POINTS = [
  {
    title: 'Lesson planning time',
    body: 'Curriculum-aligned plans, differentiation, and resources eat evenings and weekends.',
  },
  {
    title: 'Student feedback workload',
    body: 'Quality marking and feedback at scale is hard to sustain across full classes.',
  },
  {
    title: 'Parent communication',
    body: 'Updates, progress notes, and school-home messages add up — but matter for outcomes.',
  },
  {
    title: 'Compliance reporting',
    body: 'RTOs and registered providers face heavy reporting cycles that pull staff off teaching.',
  },
];

const HOW_AI_HELPS = [
  {
    title: 'Lesson plan drafter aligned to AU curriculum',
    body: 'Drafts plans against ACARA outcomes with differentiation tiers and student activities.',
  },
  {
    title: 'Marking and feedback assistance',
    body: 'Suggests rubric-aligned feedback for written work, with the educator approving each one.',
  },
  {
    title: 'Parent comms drafts',
    body: 'Drafts progress updates, behaviour notes, and routine messages in a warm, professional tone.',
  },
  {
    title: 'Compliance report generation',
    body: 'Pulls structured RTO and accreditation reports from your existing data with one approval.',
  },
  {
    title: 'Assessment item generator',
    body: 'Creates quizzes, short-answer items, and rubric drafts mapped to learning outcomes.',
  },
  {
    title: 'Student-facing study helpers',
    body: 'Safe, age-appropriate study tools that reinforce — not replace — your teaching.',
  },
];

const WORKFLOWS = [
  {
    name: 'Curriculum-Aligned Lesson Drafter',
    body: 'Drafts lessons mapped to ACARA outcomes with differentiation and resources.',
  },
  {
    name: 'Marking Assistant',
    body: 'Suggests rubric-aligned feedback per submission; the educator reviews and finalises.',
  },
  {
    name: 'Parent Comms Helper',
    body: 'Drafts respectful, on-brand updates — saved time, consistent tone across staff.',
  },
  {
    name: 'Compliance Report Generator',
    body: 'Generates RTO and accreditation report drafts from your existing data.',
  },
];

const RELATED = [
  { slug: 'healthcare', name: 'Healthcare', Icon: Stethoscope },
  { slug: 'professional-services', name: 'Professional Services', Icon: Briefcase },
  { slug: 'retail', name: 'Retail', Icon: ShoppingBag },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'AI for Education — Australian education businesses',
  serviceType: 'AI consulting and implementation',
  description:
    'AI workflows for Australian tutoring centres, RTOs, and educators — lesson planning, marking, parent comms, and compliance reporting.',
  provider: { '@type': 'Organization', name: 'LongCare AU', url: 'https://longcare.au' },
  areaServed: { '@type': 'Country', name: 'Australia' },
  audience: { '@type': 'BusinessAudience', audienceType: 'Education' },
  url: 'https://longcare.au/solutions/education',
};

export default function EducationPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Solutions', url: '/solutions' },
            { name: 'Education', url: '/solutions/education' },
          ]}
        />

        <section className="mt-6">
          <div className="grid items-start gap-8 mb-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
            <div className="flex items-start gap-6">
              <IndustryEducation className="text-sky-700 shrink-0 hidden sm:block lg:hidden" width={96} height={96} />
              <div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-12 items-center justify-center rounded-xl bg-sky-50 text-sky-700 ring-1 ring-sky-100 sm:hidden">
                    <GraduationCap className="size-6" />
                  </span>
                  <Badge variant="outline" className="border-sky-100 bg-sky-50 text-sky-700">
                    Education
                  </Badge>
                </div>
                <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                  AI for Education
                </h1>
                <p className="mt-5 text-lg leading-relaxed text-slate-600 max-w-3xl">
                  Tutoring centres, RTOs, and individual educators gain back hours each week.
                  AI assists with planning, feedback, parent comms, and compliance — never
                  replacing the teacher in the loop.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button
                    render={<a href="https://book.longcare.au" />}
                    className="bg-sky-700 px-6 py-2 text-white hover:bg-sky-800"
                  >
                    Book a Discovery Call
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                  <Button
                    render={<Link href="/testimonials" />}
                    variant="outline"
                    className="border-slate-300 bg-white px-6 py-2 text-slate-700 hover:bg-slate-50"
                  >
                    Read Case Studies
                  </Button>
                </div>
              </div>
            </div>
            <HeroEducation
              className="hidden lg:block text-sky-700 shrink-0"
              width={420}
              height={320}
            />
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Common challenges</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {PAIN_POINTS.map((p) => (
              <div key={p.title} className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
                <div className="flex items-start gap-3">
                  <AlertCircle className="mt-0.5 size-5 shrink-0 text-amber-500" />
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">{p.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{p.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">How AI helps</h2>
          <div className="mt-8 bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12 overflow-x-auto">
            <h3 className="font-heading text-xl text-slate-900 text-center mb-6">From plan to feedback loop</h3>
            <div className="flex justify-center">
              <FlowThreeStep width={760} height={140} />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4 text-center text-sm text-slate-600 max-w-2xl mx-auto">
              <div><strong className="text-slate-900 block">Plan</strong>AI drafts lessons</div>
              <div><strong className="text-slate-900 block">Teach</strong>Educator delivers</div>
              <div><strong className="text-slate-900 block">Feedback</strong>AI summarises &amp; reports</div>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {HOW_AI_HELPS.map((h) => (
              <div key={h.title} className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
                <CheckCircle2 className="size-5 text-emerald-500" />
                <h3 className="mt-3 text-base font-semibold text-slate-900">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{h.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">Pre-built workflows</h2>
              <p className="mt-3 max-w-2xl text-slate-600">
                Built around AU curriculum frameworks and RTO accreditation cycles.
              </p>
            </div>
            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
              Ready to deploy
            </Badge>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            {WORKFLOWS.map((w) => (
              <Card key={w.name} className="bg-white ring-slate-200">
                <CardHeader>
                  <CardTitle className="text-base font-semibold text-slate-900">{w.name}</CardTitle>
                  <CardDescription className="text-slate-600">{w.body}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline" className="border-sky-100 bg-sky-50 text-sky-700">
                    Industry template
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-2xl bg-emerald-50 p-7 ring-1 ring-emerald-100">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 size-6 shrink-0 text-emerald-700" />
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Educator-in-the-loop
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
                All AI assists educators — final decisions remain with teachers. Student
                data is handled per the Australian Privacy Principles, and student-facing
                tools are configured for age-appropriate, safe use.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20 rounded-3xl bg-gradient-to-br from-sky-50 to-emerald-50 p-10 text-center ring-1 ring-sky-100 sm:p-14">
          <h2 className="text-3xl font-bold text-slate-900">Get started</h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-600">
            Book a free 30-minute discovery call. We&apos;ll map the planning and reporting
            workflows that buy your educators back real evenings.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              render={<a href="https://book.longcare.au" />}
              className="bg-sky-700 px-6 py-2 text-white hover:bg-sky-800"
            >
              Book Discovery
              <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button
              render={<Link href="/testimonials" />}
              variant="outline"
              className="border-slate-300 bg-white px-6 py-2 text-slate-700 hover:bg-slate-50"
            >
              Read Case Studies
            </Button>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Related industries</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {RELATED.map(({ slug, name, Icon }) => (
              <Link
                key={slug}
                href={`/solutions/${slug}`}
                className="group flex items-center justify-between rounded-2xl bg-white p-5 ring-1 ring-slate-200 transition-all hover:ring-sky-200 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-9 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
                    <Icon className="size-4" />
                  </span>
                  <span className="text-sm font-medium text-slate-900">{name}</span>
                </div>
                <ArrowRight className="size-4 text-sky-700 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
