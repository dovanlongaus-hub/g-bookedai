'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import { motion } from "motion/react"

const tiers = [
  {
    name: 'AI Mentor Services',
    subtitle: 'Deep-dive personalised mentoring for you and your team.',
    price: '$99',
    period: '/ hour',
    duration: 'Custom Schedule',
    features: [
      'Live 1-on-1 video call',
      'Custom prompt engineering',
      'AI strategy roadmap',
      'Workflow automation review',
      'Priority follow-up support',
    ],
    cta: 'Book Mentoring',
    href: 'https://book.longcare.au?service=mentor-1h',
    featured: false,
  },
  {
    name: 'AI Agentic Implementing',
    subtitle: 'Full-scale AI agent implementation for your SME.',
    price: 'Custom',
    period: '/ project',
    duration: 'Tailored Timeline',
    features: [
      'End-to-end AI Agent setup',
      'Integration with existing tools',
      'Automated customer support',
      'Internal workflow optimization',
      'Dedicated technical support',
    ],
    cta: 'Get a Quote',
    href: 'https://book.longcare.au?service=agentic-implementation',
    featured: true,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-slate-50">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.h2
          className="mb-4 text-center text-3xl font-bold sm:text-4xl text-slate-900"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Investment Plans
        </motion.h2>
        <motion.p
          className="mx-auto mb-16 max-w-md text-center text-slate-600"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Transparent pricing for businesses ready to scale with AI.
        </motion.p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-center max-w-4xl mx-auto">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className={tier.featured ? 'md:scale-105 z-10' : ''}
            >
              <Card
                className={`card-border-gradient relative flex flex-col overflow-hidden ring-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full bg-white ${
                  tier.featured
                    ? 'border-blue-500 shadow-xl shadow-blue-500/10'
                    : 'border-slate-200'
                }`}
              >
                {/* Featured badge */}
                {tier.featured && (
                  <div className="flex justify-center pt-4 px-4">
                    <Badge className="bg-blue-600 text-white border-none px-3 py-1 text-xs font-bold tracking-widest uppercase h-auto">
                      Enterprise Choice
                    </Badge>
                  </div>
                )}

                <CardHeader className="border-none pb-0">
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    {tier.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-slate-500">
                    {tier.subtitle}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col">
                  {/* Price */}
                  <div className="mb-2">
                    <span className="text-4xl font-extrabold text-slate-900">
                      {tier.price}
                    </span>
                    <span className="ml-1 text-base text-slate-500">
                      {tier.period}
                    </span>
                  </div>
                  <div className="mb-8 text-sm font-medium text-blue-600">
                    {tier.duration}
                  </div>

                  {/* Features */}
                  <ul className="mb-8 flex-1 space-y-3">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-slate-600">
                        <Check className="mt-0.5 size-4 shrink-0 text-teal-500" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    render={<a href={tier.href} />}
                    className={`w-full rounded-full py-3 text-center text-sm font-semibold transition-all hover:scale-105 h-auto border-none ${
                      tier.featured
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 hover:bg-blue-500'
                        : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {tier.cta}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          className="mt-10 text-center text-xs text-slate-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          All prices include GST &middot; Custom projects tailored to your requirements
        </motion.p>
      </div>
    </section>
  );
}
