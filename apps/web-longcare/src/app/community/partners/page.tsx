import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Handshake,
  Plug,
  Megaphone,
  CheckCircle2,
  Building2,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { HeroCommunity } from '@/components/illustrations/hero-community';
import { PartnerForm } from './partner-form';

export const metadata: Metadata = getPageMetadata({
  title: 'Partner With LongCare AU | Referral & Integration Partners',
  description:
    'Join the LongCare partner program. Refer customers (15% on first 12 months), build integrations, or co-sell as a channel partner across Australia.',
  path: '/community/partners',
});

type Tier = {
  slug: 'referrer' | 'integration' | 'channel';
  title: string;
  Icon: typeof Handshake;
  badge: string;
  pitch: string;
  bestFor: string;
  perks: string[];
};

const TIERS: Tier[] = [
  {
    slug: 'referrer',
    title: 'Referrer',
    Icon: Handshake,
    badge: '15% rev share',
    pitch: 'Earn 15% on the first 12 months of every customer you refer.',
    bestFor: 'Best for: accountants, consultants, IT MSPs.',
    perks: [
      'Tracked referral links + dashboard',
      'Monthly payouts in AUD',
      'Co-marketing assets (case studies, decks)',
    ],
  },
  {
    slug: 'integration',
    title: 'Integration Partner',
    Icon: Plug,
    badge: 'Co-marketing',
    pitch: 'Build connectors to your platform and we will co-market the joint solution.',
    bestFor: 'Best for: SaaS vendors, Xero/MYOB ecosystems, vertical platforms.',
    perks: [
      'Listed in the LongCare integrations directory',
      'Joint launch blog + webinar',
      'Shared roadmap reviews',
    ],
  },
  {
    slug: 'channel',
    title: 'Channel Partner',
    Icon: Megaphone,
    badge: 'White-label / co-sell',
    pitch: 'White-label the platform or co-sell with our team. Quarterly business reviews.',
    bestFor: 'Best for: agencies, systems integrators, regional resellers.',
    perks: [
      'Discounted seat pricing',
      'Dedicated partner manager',
      'QBRs + pipeline planning',
    ],
  },
];

export default function CommunityPartnersPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'LongCare AU Partner Program',
    serviceType: 'Partner program',
    provider: { '@type': 'Organization', name: 'LongCare AU', url: 'https://longcare.au' },
    areaServed: { '@type': 'Country', name: 'Australia' },
    description:
      'Three partner tiers — Referrer, Integration Partner, and Channel Partner — for AU consultants, SaaS vendors, and resellers.',
    offers: TIERS.map((t) => ({
      '@type': 'Offer',
      name: t.title,
      description: t.pitch,
      url: `https://longcare.au/community/partners#${t.slug}`,
      priceCurrency: 'AUD',
    })),
  };

  return (
    <main className="bg-[#F8FAFC] text-slate-800 pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Community', url: '/community' },
            { name: 'Partners', url: '/community/partners' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-6 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
              <Handshake className="size-3" /> Partner program
            </Badge>
            <h1 className="mt-4 font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Partner With LongCare
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Refer customers, integrate our platform, or co-build solutions for Australian SMEs.
            </p>
          </div>
          <div className="hidden lg:block">
            <HeroCommunity className="text-emerald-700" width={360} height={280} />
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <div className="grid gap-6 lg:grid-cols-3">
          {TIERS.map(({ slug, title, Icon, badge, pitch, bestFor, perks }) => (
            <article
              key={slug}
              id={slug}
              className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="size-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
                  <Icon className="size-5" />
                </div>
                <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">
                  {badge}
                </Badge>
              </div>
              <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
              <p className="mt-2 text-sm text-slate-700">{pitch}</p>
              <p className="mt-3 text-xs text-slate-500">{bestFor}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700 flex-1">
                {perks.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Apply form */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-slate-900">Apply to partner</h2>
          <p className="mt-2 text-sm text-slate-700">
            Tell us a bit about your business. We&apos;ll reply within 2 Australian business days.
          </p>
          <div className="mt-6">
            <PartnerForm />
          </div>
        </div>
      </section>

      {/* Existing partners */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm text-center">
          <h2 className="text-xl font-semibold text-slate-900">Existing partners</h2>
          <p className="mt-2 text-sm text-slate-500">Logos coming soon</p>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/2] bg-slate-50 border border-dashed border-slate-200 rounded-lg flex items-center justify-center text-slate-400"
              >
                <Building2 className="size-6" />
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-600">
            Already work with us?{' '}
            <Link href="/contact?topic=partner-listing" className="text-sky-700 hover:text-sky-800 font-medium">
              Request a logo listing
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
