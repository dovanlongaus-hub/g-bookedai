import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShoppingBag,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  UtensilsCrossed,
  Home as HomeIcon,
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
import { IndustryRetail } from '@/components/illustrations/industry-retail';
import { HeroRetail } from '@/components/illustrations/hero-retail';
import { FlowThreeStep } from '@/components/illustrations/flow-three-step';

export const metadata: Metadata = getPageMetadata({
  title: 'AI for Retail — Aussie Stores & Online Sellers | LongCare AU',
  description:
    'AI workflows for Australian retail: product descriptions at scale, customer support automation, review insights, and email marketing for Shopify and beyond.',
  path: '/solutions/retail',
});

const PAIN_POINTS = [
  {
    title: 'Product description workload',
    body: 'Hundreds of SKUs need on-brand, SEO-friendly copy — and updates every season.',
  },
  {
    title: 'Customer service load',
    body: 'Repetitive enquiries about shipping, returns, and stock pull staff away from sales.',
  },
  {
    title: 'Inventory descriptions',
    body: 'Inconsistent attributes across channels (web, marketplace, in-store) cost conversions.',
  },
  {
    title: 'Marketing content velocity',
    body: 'Newsletters, social, and ads compete for attention — and your time.',
  },
];

const HOW_AI_HELPS = [
  {
    title: 'AI product descriptions at scale',
    body: 'Generate consistent, SEO-rich descriptions across your full catalogue, with brand voice guardrails.',
  },
  {
    title: 'Smart customer support chatbot',
    body: 'Handles shipping, returns, sizing, and FAQs 24/7 — with seamless handoff to human staff.',
  },
  {
    title: 'AI-generated social and email content',
    body: 'Weekly content calendars and email drafts based on what is actually selling.',
  },
  {
    title: 'Review summarisation',
    body: 'Turn hundreds of reviews into actionable insights and on-page proof points.',
  },
  {
    title: 'Abandoned cart recovery',
    body: 'AI personalises win-back emails using browse history and stock signals.',
  },
  {
    title: 'Marketplace channel sync helpers',
    body: 'Reformat listings for Shopify, eBay, and Amazon AU without copy-paste fatigue.',
  },
];

const WORKFLOWS = [
  {
    name: 'Shopify Product Description Generator',
    body: 'Produces SEO-friendly descriptions, bullet specs, and meta tags from supplier sheets.',
  },
  {
    name: 'Customer Support Auto-responder',
    body: 'Drafts replies to common email and chat enquiries; staff approve and send.',
  },
  {
    name: 'Review Insight Reports',
    body: 'Weekly summaries of review themes, complaints, and product improvement ideas.',
  },
  {
    name: 'Email Marketing Drafter',
    body: 'Drafts segmented email campaigns and subject-line variants tied to inventory.',
  },
  {
    name: 'Abandoned Cart Win-back Drafter',
    body: 'Personalised reminder emails based on items left in cart and shopper history.',
  },
];

const RELATED = [
  { slug: 'hospitality', name: 'Hospitality', Icon: UtensilsCrossed },
  { slug: 'real-estate', name: 'Real Estate', Icon: HomeIcon },
  { slug: 'professional-services', name: 'Professional Services', Icon: Briefcase },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'AI for Retail — Australian retail businesses',
  serviceType: 'AI consulting and implementation',
  description:
    'AI workflows for Australian retailers, e-commerce stores, and hybrid sellers — product copy, customer support, marketing, and review insights.',
  provider: { '@type': 'Organization', name: 'LongCare AU', url: 'https://longcare.au' },
  areaServed: { '@type': 'Country', name: 'Australia' },
  audience: { '@type': 'BusinessAudience', audienceType: 'Retail' },
  url: 'https://longcare.au/solutions/retail',
};

export default function RetailPage() {
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
            { name: 'Retail', url: '/solutions/retail' },
          ]}
        />

        <section className="mt-6">
          <div className="grid items-start gap-8 mb-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
            <div className="flex items-start gap-6">
              <IndustryRetail className="text-sky-700 shrink-0 hidden sm:block lg:hidden" width={96} height={96} />
              <div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-12 items-center justify-center rounded-xl bg-sky-50 text-sky-700 ring-1 ring-sky-100 sm:hidden">
                    <ShoppingBag className="size-6" />
                  </span>
                  <Badge variant="outline" className="border-sky-100 bg-sky-50 text-sky-700">
                    Retail
                  </Badge>
                </div>
                <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                  AI for Retail
                </h1>
                <p className="mt-5 text-lg leading-relaxed text-slate-600 max-w-3xl">
                  From a single Shopify store to a full omnichannel retailer, AI removes the
                  tedious work — product copy, customer enquiries, marketing — so your team
                  focuses on selling and serving.
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
            <HeroRetail
              className="hidden lg:block text-sky-700 shrink-0"
              width={420}
              height={320}
            />
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Common challenges</h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            What we see across Australian retail teams — large and small.
          </p>
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
          <p className="mt-3 max-w-2xl text-slate-600">
            Specific workflows we build, configure, and train your team on.
          </p>
          <div className="mt-8 bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12 overflow-x-auto">
            <h3 className="font-heading text-xl text-slate-900 text-center mb-6">From SKU to sale</h3>
            <div className="flex justify-center">
              <FlowThreeStep width={760} height={140} />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4 text-center text-sm text-slate-600 max-w-2xl mx-auto">
              <div><strong className="text-slate-900 block">Catalogue</strong>Sync products &amp; brand voice</div>
              <div><strong className="text-slate-900 block">Generate</strong>AI copy, ads, support replies</div>
              <div><strong className="text-slate-900 block">Sell</strong>Publish &amp; convert</div>
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
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Pre-built workflows
              </h2>
              <p className="mt-3 max-w-2xl text-slate-600">
                Tested templates that drop into your stack with minimal setup.
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
                Australian Consumer Law &amp; privacy
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
                Customer data is handled per the Australian Privacy Principles. Generated
                product claims are reviewed for ACCC and Australian Consumer Law alignment
                before going live.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20 rounded-3xl bg-gradient-to-br from-sky-50 to-emerald-50 p-10 text-center ring-1 ring-sky-100 sm:p-14">
          <h2 className="text-3xl font-bold text-slate-900">Get started</h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-600">
            Book a free 30-minute discovery call. We&apos;ll map a 4-week pilot focused on
            the one workflow with the biggest revenue lift.
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
