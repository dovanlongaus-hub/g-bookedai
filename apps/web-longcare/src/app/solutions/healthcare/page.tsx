import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Stethoscope,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShoppingBag,
  GraduationCap,
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
import { IndustryHealthcare } from '@/components/illustrations/industry-healthcare';
import { HeroHealthcare } from '@/components/illustrations/hero-healthcare';
import { FlowThreeStep } from '@/components/illustrations/flow-three-step';

export const metadata: Metadata = getPageMetadata({
  title: 'AI for Healthcare — Australian Clinics & GP Practices | LongCare AU',
  description:
    'AI workflows for Australian clinics, GP practices, and allied health: Medicare claims drafts, patient comms, AHPRA-aligned content review, and after-hours FAQs.',
  path: '/solutions/healthcare',
});

const PAIN_POINTS = [
  {
    title: 'Medicare claiming admin overhead',
    body: 'Clinical staff lose hours preparing and reconciling Medicare claims instead of caring for patients.',
  },
  {
    title: 'Patient communication time',
    body: 'Reminders, results follow-ups, and pre-visit instructions absorb front-desk capacity every day.',
  },
  {
    title: 'Compliance documentation',
    body: 'AHPRA, RACGP, and accreditation paperwork demand ongoing review and consistent language.',
  },
  {
    title: 'After-hours triage queries',
    body: 'Common questions arrive outside opening hours and risk being missed or escalated unnecessarily.',
  },
];

const HOW_AI_HELPS = [
  {
    title: 'Automated Medicare claim drafts',
    body: 'AI prepares item-number suggestions and claim narratives from notes, ready for clinician sign-off.',
  },
  {
    title: 'AI-generated patient education materials',
    body: 'Plain-English handouts and translated instructions for common conditions in minutes, not hours.',
  },
  {
    title: 'Smart appointment reminders',
    body: 'Personalised SMS and email reminders that reduce no-shows and prep patients for their visit.',
  },
  {
    title: 'AHPRA-aligned content review',
    body: 'Marketing and patient comms checked against AHPRA advertising guidelines before publish.',
  },
  {
    title: 'After-hours FAQ chatbot',
    body: 'A safe-by-design chatbot answers practical FAQs and routes clinical questions to your duty triage.',
  },
  {
    title: 'Recall and follow-up nudges',
    body: 'AI drafts personalised recalls for chronic disease management plans and overdue screenings.',
  },
];

const WORKFLOWS = [
  {
    name: 'Medicare Claims Assistant',
    body: 'Drafts claim narratives and item-number suggestions from clinical notes. Clinician approves before submission.',
  },
  {
    name: 'Patient FAQ Chatbot',
    body: 'Handles fees, opening hours, scripts, and pre-visit prep. Clinical questions are escalated to staff.',
  },
  {
    name: 'Compliance Doc Generator',
    body: 'Creates first-draft policies, consent forms, and procedural docs aligned to your accreditation framework.',
  },
  {
    name: 'Appointment Reminder Smart Sender',
    body: 'Sends personalised SMS and email reminders, including translation for multicultural patients.',
  },
];

const RELATED = [
  { slug: 'professional-services', name: 'Professional Services', Icon: Sparkles },
  { slug: 'education', name: 'Education', Icon: GraduationCap },
  { slug: 'retail', name: 'Retail', Icon: ShoppingBag },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'AI for Healthcare — Australian healthcare businesses',
  serviceType: 'AI consulting and implementation',
  description:
    'AI workflows for Australian clinics, GP practices, and allied health providers, aligned to APP and AHPRA expectations.',
  provider: { '@type': 'Organization', name: 'LongCare AU', url: 'https://longcare.au' },
  areaServed: { '@type': 'Country', name: 'Australia' },
  audience: { '@type': 'BusinessAudience', audienceType: 'Healthcare' },
  url: 'https://longcare.au/solutions/healthcare',
};

export default function HealthcarePage() {
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
            { name: 'Healthcare', url: '/solutions/healthcare' },
          ]}
        />

        {/* Hero */}
        <section className="mt-6">
          <div className="grid items-start gap-8 mb-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
            <div className="flex items-start gap-6">
              <IndustryHealthcare className="text-sky-700 shrink-0 hidden sm:block lg:hidden" width={96} height={96} />
              <div>
              <div className="flex items-center gap-3">
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-sky-50 text-sky-700 ring-1 ring-sky-100 sm:hidden">
                  <Stethoscope className="size-6" />
                </span>
                <Badge variant="outline" className="border-sky-100 bg-sky-50 text-sky-700">
                  Healthcare
                </Badge>
              </div>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                AI for Healthcare
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-slate-600 max-w-3xl">
                Reclaim clinical hours from admin. Practical AI for Australian clinics, GP
                practices, and allied health — designed around Medicare workflows, AHPRA
                advertising guidelines, and the Australian Privacy Principles.
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
            <HeroHealthcare
              className="hidden lg:block text-sky-700 shrink-0"
              width={420}
              height={320}
            />
          </div>
        </section>

        {/* Common challenges */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Common challenges
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            The bottlenecks we hear most from Australian healthcare teams.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {PAIN_POINTS.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl bg-white p-6 ring-1 ring-slate-200"
              >
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

        {/* How AI helps */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            How AI helps
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Specific workflows we build, configure, and train your team on.
          </p>
          <div className="mt-8 bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12 overflow-x-auto">
            <h3 className="font-heading text-xl text-slate-900 text-center mb-6">From clinical note to claim</h3>
            <div className="flex justify-center">
              <FlowThreeStep width={760} height={140} />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4 text-center text-sm text-slate-600 max-w-2xl mx-auto">
              <div><strong className="text-slate-900 block">Capture</strong>Clinical notes &amp; consult</div>
              <div><strong className="text-slate-900 block">Draft</strong>AI prepares Medicare claim</div>
              <div><strong className="text-slate-900 block">Review</strong>Clinician approves &amp; sends</div>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {HOW_AI_HELPS.map((h) => (
              <div
                key={h.title}
                className="rounded-2xl bg-white p-6 ring-1 ring-slate-200"
              >
                <CheckCircle2 className="size-5 text-emerald-500" />
                <h3 className="mt-3 text-base font-semibold text-slate-900">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{h.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pre-built workflows */}
        <section className="mt-20">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Pre-built workflows
              </h2>
              <p className="mt-3 max-w-2xl text-slate-600">
                Start from a tested template, then tailor to your practice.
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
                  <CardTitle className="text-base font-semibold text-slate-900">
                    {w.name}
                  </CardTitle>
                  <CardDescription className="text-slate-600">{w.body}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge
                    variant="outline"
                    className="border-sky-100 bg-sky-50 text-sky-700"
                  >
                    Industry template
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Compliance note */}
        <section className="mt-20 rounded-2xl bg-emerald-50 p-7 ring-1 ring-emerald-100">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 size-6 shrink-0 text-emerald-700" />
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Privacy &amp; compliance
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
                All workflows follow the Australian Privacy Principles (APP). PHI never
                leaves your authorised systems, and AI outputs are reviewed by a
                clinician before being acted upon. We design with AHPRA advertising
                guidelines and RACGP standards in mind.
              </p>
            </div>
          </div>
        </section>

        {/* Get started CTA */}
        <section className="mt-20 rounded-3xl bg-gradient-to-br from-sky-50 to-emerald-50 p-10 text-center ring-1 ring-sky-100 sm:p-14">
          <h2 className="text-3xl font-bold text-slate-900">Get started</h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-600">
            Book a free 30-minute discovery call. We&apos;ll map two or three high-value
            workflows for your practice and outline a 4-week pilot plan.
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

        {/* Related industries */}
        <section className="mt-20">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Related industries
          </h2>
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
