'use client';

import { Card, CardContent } from "@/components/ui/card"
import { MousePointerClick, CalendarCheck, Sparkles } from "lucide-react"
import { motion, MotionConfig } from "motion/react"

const steps = [
  {
    num: 1,
    title: 'Choose Service',
    desc: 'Pick AI Mentoring or Agentic Implementing for your business.',
    icon: MousePointerClick,
  },
  {
    num: 2,
    title: 'Consultation & Strategy',
    desc: 'Meet with an expert to outline your goals and map out the execution plan.',
    icon: CalendarCheck,
  },
  {
    num: 3,
    title: 'Transform & Scale',
    desc: 'Deploy AI agents and apply new knowledge to automate your SME workflows.',
    icon: Sparkles,
  },
];

export function HowItWorks() {
  return (
    <MotionConfig reducedMotion="user">
    <section id="how-it-works" className="py-24 bg-white">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.h2
          className="mb-4 text-center text-3xl font-bold sm:text-4xl text-slate-900"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          How It Works
        </motion.h2>
        <motion.p
          className="mx-auto mb-16 max-w-md text-center text-slate-600"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Three simple steps to accelerate your AI journey.
        </motion.p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
            >
              {/* Connecting line between cards (desktop) */}
              {i < steps.length - 1 && (
                <div className="absolute top-12 -right-4 hidden md:block lg:-right-0 z-10">
                  <motion.div
                    className="h-[2px] w-8 bg-gradient-to-r from-blue-500/60 to-blue-500/10"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}
                    style={{ originX: 0 }}
                  />
                </div>
              )}

              <Card className="card-border-gradient flex flex-col items-center text-center bg-white border-slate-200 shadow-sm ring-0 hover:bg-slate-50 transition-all duration-300 hover:-translate-y-1 h-full">
                <CardContent className="flex flex-col items-center pt-8 pb-8">
                  {/* Number circle */}
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 ring-1 ring-blue-500/30">
                    <span className="text-xl font-bold">{step.num}</span>
                  </div>

                  {/* Icon */}
                  <div className="mb-4 text-blue-600">
                    <step.icon className="size-6" />
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 text-xl font-semibold text-slate-900">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="max-w-[260px] text-sm leading-relaxed text-slate-600">
                    {step.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    </MotionConfig>
  );
}
