import type { Metadata } from 'next';
import { Breadcrumbs } from '../../components/breadcrumbs';
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPageMetadata } from '@/lib/metadata';
import { HeroMentorMotion } from '@/components/illustrations/animated';

export const metadata: Metadata = getPageMetadata({
  title: 'AI Mentoring & Agentic Services | LongCare AU',
  description: 'Accelerate your Australian SME with AI Mentor Services and Agentic Implementation. Book a session or request a custom build today.',
  path: '/services',
});

const SERVICES = [
  {
    slug: 'ai-mentor',
    name: 'AI Mentor Services',
    price: '$99',
    priceNum: '99.00',
    description: 'Expert 1-on-1 guidance to help you master AI tools, build custom workflows, and elevate your personal or team productivity.',
    duration: 'per hour',
    features: [
      'Personalised learning path',
      'Hands-on prompt engineering',
      'Workflow optimisation',
      'AI session notes & recordings',
    ],
    cta: 'Book Mentor Session',
    bookingUrl: 'https://book.longcare.au',
    highlight: false,
  },
  {
    slug: 'ai-agentic',
    name: 'AI Agentic Implementation',
    price: 'Custom',
    priceNum: '0.00',
    description: 'Full-service B2B consulting to design, build, and deploy autonomous AI agents that transform your SME operations.',
    duration: 'project based',
    features: [
      'Comprehensive workflow audit',
      'Custom agent development',
      'Seamless tool integration',
      'Team training & handover',
    ],
    cta: 'Request Consultation',
    bookingUrl: 'https://book.longcare.au',
    highlight: true,
  },
];

export default function ServicesPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'AI Services — Longcare AU',
    description: 'AI Mentoring and Agentic Implementation services for SMEs in Australia.',
    itemListElement: SERVICES.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: s.name,
        description: s.description,
        url: `https://longcare.au/services/${s.slug}`,
        provider: {
          '@type': 'Organization',
          name: 'Longcare AU',
          url: 'https://longcare.au',
        },
        areaServed: { '@type': 'Country', name: 'Australia' },
      },
    })),
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      
      <div className="mx-auto max-w-[1200px] px-6 pt-32 pb-16">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Services', url: '/services' },
          ]}
        />

        {/* Hero */}
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center mb-20 mt-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl mb-6 tracking-tight">
              AI Services for SMEs
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              From 1-on-1 mentoring to full-scale autonomous agent implementations,
              we provide the expertise your business needs to accelerate workflows and reduce costs.
            </p>
          </div>
          <div className="hidden lg:block">
            <HeroMentorMotion className="text-sky-700" width={420} height={320} />
          </div>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-24">
          {SERVICES.map((s, i) => (
            <div
              key={`${s.slug}-${i}`}
              className={`flex flex-col rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-md ${
                s.highlight ? 'ring-2 ring-blue-600' : 'ring-1 ring-slate-200'
              }`}
            >
              {s.highlight && (
                <div className="mb-4">
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">
                    MOST POPULAR
                  </span>
                </div>
              )}
              <h2 className="text-2xl font-bold text-slate-900 mb-2">{s.name}</h2>
              <div className="mb-6 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-slate-900">{s.price}</span>
                <span className="text-sm font-medium text-slate-500">{s.duration}</span>
              </div>
              <p className="text-slate-600 mb-8 leading-relaxed min-h-[80px]">
                {s.description}
              </p>
              <ul className="mb-8 space-y-4 flex-1">
                {s.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <CheckCircle2 className="size-5 text-blue-500 shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm">{f}</span>
                  </li>
                ))}
              </ul>
              <div className="flex gap-4 mt-auto pt-6 border-t border-slate-100">
                <Button
                  render={<a href={s.bookingUrl} />}
                  className={`w-full ${s.highlight ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200' : 'bg-slate-900 hover:bg-slate-800 text-white'}`}
                >
                  {s.cta}
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="rounded-3xl bg-blue-50 p-12 text-center max-w-4xl mx-auto border border-blue-100">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Not sure where to start?</h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            Book a consultation to discuss your business goals, and we'll help you decide between mentoring or a full implementation project.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              render={<a href="https://book.longcare.au" />}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            >
              Book a Consultation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
