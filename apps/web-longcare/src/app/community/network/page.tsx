import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Users,
  MessageSquare,
  Globe,
  Mail,
  ArrowRight,
  Stethoscope,
  ShoppingBag,
  Scale,
  Hammer,
  Briefcase,
  Sparkles,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { HeroCommunity } from '@/components/illustrations/hero-community';
import { CommunityNewsletter } from '../newsletter-client';

export const metadata: Metadata = getPageMetadata({
  title: 'AU AI Practitioner Network | LongCare AU',
  description:
    'Slack workspace and LinkedIn group for Australian SME AI practitioners. 200+ members across 12 industries. Free to join.',
  path: '/community/network',
});

type Channel = {
  slug: string;
  name: string;
  Icon: typeof MessageSquare;
  description: string;
  detail: string;
  cta: { label: string; href: string };
};

const CHANNELS: Channel[] = [
  {
    slug: 'slack',
    name: 'Slack',
    Icon: MessageSquare,
    description: '200+ members. Channels: #general, #healthcare, #retail, #legal, #showroom.',
    detail: 'Daily threads, weekly AMAs, and a #wins channel for shipped workflows.',
    cta: { label: 'Request invite', href: '/contact?topic=slack-invite' },
  },
  {
    slug: 'linkedin',
    name: 'LinkedIn Group',
    Icon: Globe,
    description: 'Long-form discussion, weekly digest, monthly polls.',
    detail: 'Best for ops leaders and SME owners who do not live in Slack.',
    cta: { label: 'Join LinkedIn group', href: 'https://www.linkedin.com/groups/longcare-ai-au' },
  },
  {
    slug: 'newsletter',
    name: 'Newsletter',
    Icon: Mail,
    description: 'Weekly: 5 things, 1 case study, 1 tool.',
    detail: 'Curated Friday morning, AEST. No fluff, no resends.',
    cta: { label: 'Subscribe below', href: '#newsletter' },
  },
];

type Member = { role: string; industry: string; city: string; Icon: typeof Stethoscope };

const MEMBERS: Member[] = [
  { role: 'AI Lead', industry: 'Health-tech', city: 'Sydney', Icon: Stethoscope },
  { role: 'Head of Ops', industry: 'Retail', city: 'Melbourne', Icon: ShoppingBag },
  { role: 'Practice Manager', industry: 'Legal', city: 'Brisbane', Icon: Scale },
  { role: 'Owner', industry: 'Trades', city: 'Perth', Icon: Hammer },
  { role: 'Founder', industry: 'Professional services', city: 'Adelaide', Icon: Briefcase },
  { role: 'AI Consultant', industry: 'Multi-industry', city: 'Canberra', Icon: Sparkles },
];

export default function CommunityNetworkPage() {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'LongCare AU Network',
    url: 'https://longcare.au/community/network',
    description:
      'Slack workspace and LinkedIn group for Australian SME AI practitioners — 200+ members across 12 industries.',
    member: { '@type': 'OrganizationRole', roleName: 'AU SME AI practitioner' },
    numberOfEmployees: { '@type': 'QuantitativeValue', value: 200, unitText: 'community members' },
    sameAs: [
      'https://www.linkedin.com/groups/longcare-ai-au',
      'https://longcare.au',
    ],
  };

  return (
    <main className="bg-[#F8FAFC] text-slate-800 pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />

      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Community', url: '/community' },
            { name: 'Network', url: '/community/network' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-6 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
              <Users className="size-3" /> Network
            </Badge>
            <h1 className="mt-4 font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              The LongCare Network
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Slack workspace + LinkedIn group for Australian SME AI practitioners.
            </p>
          </div>
          <div className="hidden lg:block">
            <HeroCommunity className="text-emerald-700" width={360} height={280} />
          </div>
        </div>
      </section>

      {/* Channels */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <div className="grid gap-6 lg:grid-cols-3">
          {CHANNELS.map(({ slug, name, Icon, description, detail, cta }) => (
            <article
              key={slug}
              className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col"
            >
              <div className="size-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center mb-4">
                <Icon className="size-5" />
              </div>
              <h2 className="text-lg font-semibold text-slate-900">{name}</h2>
              <p className="mt-2 text-sm text-slate-700">{description}</p>
              <p className="mt-2 text-sm text-slate-500 flex-1">{detail}</p>
              <Link
                href={cta.href}
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-sky-700 hover:text-sky-800"
              >
                {cta.label} <ArrowRight className="size-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Member directory */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <div className="flex items-baseline justify-between mb-6 gap-4 flex-wrap">
          <h2 className="text-2xl font-semibold text-slate-900">Member directory (preview)</h2>
          <span className="text-xs text-slate-500">Anonymised — full directory in Slack for verified members</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MEMBERS.map((m, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center gap-4"
            >
              <div className="size-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <m.Icon className="size-5" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-slate-900 truncate">{m.role}</div>
                <div className="text-xs text-slate-500 truncate">{m.industry} · {m.city}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter join CTA */}
      <section id="newsletter" className="mx-auto max-w-[1120px] px-6 sm:px-10">
        <div className="bg-slate-900 text-white rounded-xl p-8 sm:p-12 text-center">
          <Mail className="size-10 text-sky-400 mx-auto" />
          <h2 className="mt-4 text-2xl sm:text-3xl font-semibold">Join the weekly digest</h2>
          <p className="mt-3 text-slate-300 max-w-xl mx-auto">
            Five things, one case study, one tool. Curated for Australian SME AI practitioners.
          </p>
          <div className="mt-6">
            <CommunityNewsletter source="community-network" />
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Already subscribed? <Link href="/contact?topic=slack-invite" className="text-sky-400 hover:underline">Request your Slack invite</Link>.
          </p>
        </div>
      </section>

      {/* Cross-links */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-16">
        <div className="flex flex-wrap gap-3 justify-center text-sm">
          <Link href="/community/events" className="px-4 py-2 rounded-full border border-slate-200 bg-white hover:border-sky-300 hover:text-sky-700 transition">
            Upcoming events
          </Link>
          <Link href="/community/workshops" className="px-4 py-2 rounded-full border border-slate-200 bg-white hover:border-sky-300 hover:text-sky-700 transition">
            Hands-on workshops
          </Link>
          <Link href="/community/partners" className="px-4 py-2 rounded-full border border-slate-200 bg-white hover:border-sky-300 hover:text-sky-700 transition">
            Become a partner
          </Link>
        </div>
      </section>
    </main>
  );
}
