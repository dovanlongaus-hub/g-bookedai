import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Wrench,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Home as HomeIcon,
  ShoppingBag,
  Briefcase,
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
import { IndustryTrades } from '@/components/illustrations/industry-trades';
import { HeroTrades } from '@/components/illustrations/hero-trades';
import { FlowThreeStep } from '@/components/illustrations/flow-three-step';

export const metadata: Metadata = getPageMetadata({
  title: 'AI for Trades — Plumbers, Sparkies, Builders | LongCare AU',
  description:
    'AI for Australian tradies: quote drafts from photos, voice-to-text job notes, customer enquiry triage, and smart invoice reminders that get paid faster.',
  path: '/solutions/trades',
});

const PAIN_POINTS = [
  {
    title: 'Quote drafting',
    body: 'Hours each week pricing jobs from rough notes, photos, and supplier emails.',
  },
  {
    title: 'Customer enquiries while on-site',
    body: 'Calls and texts pile up while you are mid-job — and missed enquiries cost work.',
  },
  {
    title: 'Invoicing follow-up',
    body: 'Chasing overdue invoices is uncomfortable and inconsistent across jobs.',
  },
  {
    title: 'Photo documentation',
    body: 'Site photos are everywhere — phone, drive, email — and never quite turn into a report.',
  },
];

const HOW_AI_HELPS = [
  {
    title: 'AI quote drafter from photos and notes',
    body: 'Snap photos, dictate notes, and AI drafts a clean, line-itemed quote ready to send.',
  },
  {
    title: 'Voice-to-text job notes',
    body: 'Talk through the job; AI captures structured notes and tasks for the office.',
  },
  {
    title: 'Smart customer enquiry triage',
    body: 'AI handles after-hours enquiries, flags emergencies, and books call-backs automatically.',
  },
  {
    title: 'Automated payment reminders',
    body: 'Polite, on-brand SMS and email reminders that get invoices paid faster.',
  },
  {
    title: 'Photo-to-report',
    body: 'Turns site photos and a few prompts into a tidy job report or scope document.',
  },
  {
    title: 'Compliance and SWMS helpers',
    body: 'Drafts safe-work-method-statements and basic compliance docs from your job details.',
  },
];

const WORKFLOWS = [
  {
    name: 'Quote Generator from Photos',
    body: 'Snap photos and dictate notes; AI returns a line-itemed quote ready to review.',
  },
  {
    name: 'On-the-go Voice Notes',
    body: 'Hands-free voice notes turned into structured job records and follow-up tasks.',
  },
  {
    name: 'Customer Enquiry Triage',
    body: 'AI screens enquiries, flags urgent jobs, and books call-backs into your diary.',
  },
  {
    name: 'Smart Invoice Reminder',
    body: 'Friendly, escalating reminders for overdue invoices — drafted and sent automatically.',
  },
];

const RELATED = [
  { slug: 'real-estate', name: 'Real Estate', Icon: HomeIcon },
  { slug: 'retail', name: 'Retail', Icon: ShoppingBag },
  { slug: 'professional-services', name: 'Professional Services', Icon: Briefcase },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'AI for Trades — Australian trade businesses',
  serviceType: 'AI consulting and implementation',
  description:
    'AI workflows for Australian plumbers, electricians, builders, landscapers and other tradies — quotes, job notes, enquiries, and invoice follow-up.',
  provider: { '@type': 'Organization', name: 'LongCare AU', url: 'https://longcare.au' },
  areaServed: { '@type': 'Country', name: 'Australia' },
  audience: { '@type': 'BusinessAudience', audienceType: 'Trades' },
  url: 'https://longcare.au/solutions/trades',
};

export default function TradesPage() {
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
            { name: 'Trades', url: '/solutions/trades' },
          ]}
        />

        <section className="mt-6">
          <div className="grid items-start gap-8 mb-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
            <div className="flex items-start gap-6">
              <IndustryTrades className="text-sky-700 shrink-0 hidden sm:block lg:hidden" width={96} height={96} />
              <div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-12 items-center justify-center rounded-xl bg-sky-50 text-sky-700 ring-1 ring-sky-100 sm:hidden">
                    <Wrench className="size-6" />
                  </span>
                  <Badge variant="outline" className="border-sky-100 bg-sky-50 text-sky-700">
                    Trades
                  </Badge>
                </div>
                <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                  AI for Trades
                </h1>
                <p className="mt-5 text-lg leading-relaxed text-slate-600 max-w-3xl">
                  Plumbers, sparkies, builders, and landscapers — keep your tools in your hands.
                  AI takes care of quotes, enquiries, job notes, and invoice chasing.
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
            <HeroTrades
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
            <h3 className="font-heading text-xl text-slate-900 text-center mb-6">From enquiry to paid invoice</h3>
            <div className="flex justify-center">
              <FlowThreeStep width={760} height={140} />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4 text-center text-sm text-slate-600 max-w-2xl mx-auto">
              <div><strong className="text-slate-900 block">Enquire</strong>AI triages calls &amp; SMS</div>
              <div><strong className="text-slate-900 block">Quote</strong>Job priced &amp; sent</div>
              <div><strong className="text-slate-900 block">Invoice</strong>Auto reminders to pay</div>
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
                Designed for one-person operators and small crews alike.
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
                Licensing &amp; safety
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
                AI outputs are first drafts. Quotes, SWMS, and compliance documents are
                always reviewed by a licensed tradesperson before they are issued. Customer
                data is handled per the Australian Privacy Principles.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20 rounded-3xl bg-gradient-to-br from-sky-50 to-emerald-50 p-10 text-center ring-1 ring-sky-100 sm:p-14">
          <h2 className="text-3xl font-bold text-slate-900">Get started</h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-600">
            Book a free 30-minute discovery call. We&apos;ll set up the quote and enquiry
            workflows that win you back the most time on the tools.
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
