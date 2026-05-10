'use client';

import { motion, useReducedMotion } from 'motion/react';
import { Check, Crown, Zap, Users, BookOpen, Headphones, ArrowRight, Star } from 'lucide-react';

const membershipFeatures = [
  { icon: BookOpen, text: 'Full course library access (20+ courses, updated monthly)' },
  { icon: Users, text: '1 group mentoring session per month (live Q&A)' },
  { icon: Headphones, text: 'Priority booking for 1-on-1 mentor sessions' },
  { icon: Zap, text: 'AI prompt template library (200+ templates)' },
  { icon: Crown, text: 'Members-only Slack community' },
  { icon: Star, text: 'Early access to new tools & features' },
];

const comparisonData = [
  { feature: 'Self-paced courses', payPerUse: '$29-$149 each', membership: 'All included' },
  { feature: 'Monthly group session', payPerUse: 'Not available', membership: '1/month included' },
  { feature: 'Prompt templates', payPerUse: 'Limited (5 free)', membership: '200+ templates' },
  { feature: 'Community access', payPerUse: 'Forum only', membership: 'Slack + Forum' },
  { feature: 'Mentor booking', payPerUse: 'Standard queue', membership: 'Priority queue' },
  { feature: 'New content', payPerUse: 'Buy separately', membership: 'Auto-included' },
];

export function MembershipSection() {
  const reduced = useReducedMotion();
  const fadeUp = reduced
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      };
  const stagger = reduced ? { visible: {} } : { visible: { transition: { staggerChildren: 0.06 } } };

  return (
    <section id="membership" className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1120px] px-8 sm:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-amber-700 mb-4">
              <Crown className="size-3.5" /> New: Membership
            </span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="mt-2 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            Learn continuously for $49/month.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-lg leading-relaxed text-slate-600">
            Everything you need to keep your AI skills sharp — courses, community, and monthly live sessions.
            Cancel anytime.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8">
          {/* Membership card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="trust-card ring-2 ring-amber-500 p-8 sm:p-10 relative overflow-hidden"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-amber-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
              <Crown className="size-3" /> Best value
            </div>

            <div className="mt-4">
              <div className="font-heading text-4xl font-bold text-slate-900">
                $49
                <span className="text-lg font-normal text-slate-500">/month</span>
              </div>
              <p className="text-sm text-slate-500 mt-1">GST-inclusive. Cancel anytime. No lock-in.</p>
            </div>

            <div className="mt-8 space-y-4">
              {membershipFeatures.map((f) => (
                <div key={f.text} className="flex items-start gap-3">
                  <div className="size-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <f.icon className="size-4 text-amber-700" strokeWidth={1.5} />
                  </div>
                  <span className="text-[14px] leading-relaxed text-slate-700 pt-1">{f.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200">
              <a
                href="https://book.longcare.au?service=membership"
                rel="noopener noreferrer"
                className="cursor-pointer btn-cta w-full py-4 rounded-xl text-[15px] font-semibold inline-flex items-center justify-center gap-2 no-underline"
              >
                Start membership <ArrowRight className="size-4" />
              </a>
              <p className="text-[12px] text-slate-400 text-center mt-3">
                7-day free trial. First month $29 with code <strong>WELCOME</strong>.
              </p>
            </div>
          </motion.div>

          {/* Comparison table */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="trust-card p-8 sm:p-10"
          >
            <h3 className="font-heading text-lg font-semibold text-slate-900 mb-6">
              Membership vs. pay-per-use
            </h3>

            <div className="overflow-hidden rounded-lg border border-slate-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="text-left px-4 py-3 text-[12px] font-semibold text-slate-500 uppercase tracking-wider">Feature</th>
                    <th className="text-center px-4 py-3 text-[12px] font-semibold text-slate-500 uppercase tracking-wider">Pay-per-use</th>
                    <th className="text-center px-4 py-3 text-[12px] font-semibold text-amber-700 uppercase tracking-wider bg-amber-50">Membership</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, i) => (
                    <tr key={row.feature} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className="px-4 py-3 text-[13px] font-medium text-slate-700">{row.feature}</td>
                      <td className="px-4 py-3 text-[13px] text-slate-500 text-center">{row.payPerUse}</td>
                      <td className="px-4 py-3 text-[13px] text-amber-800 font-medium text-center bg-amber-50/30">
                        <span className="inline-flex items-center gap-1">
                          <Check className="size-3.5 text-emerald-600" /> {row.membership}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-sky-50 rounded-lg border border-sky-200">
              <p className="text-[13px] text-sky-800">
                <strong>Break-even:</strong> If you take just 2 courses per year ($58-$298 value),
                the membership pays for itself — and you get everything else included.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
