'use client';

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { motion } from "motion/react"

export function CTASection() {
  return (
    <section className="relative overflow-hidden py-24 bg-blue-600">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-700 via-blue-600 to-teal-500" />
      <motion.div
        className="absolute inset-0 -z-10 opacity-30"
        animate={{
          background: [
            'radial-gradient(ellipse 80% 50% at 20% 50%, rgba(255,255,255,0.15), transparent)',
            'radial-gradient(ellipse 80% 50% at 80% 50%, rgba(255,255,255,0.15), transparent)',
            'radial-gradient(ellipse 80% 50% at 20% 50%, rgba(255,255,255,0.15), transparent)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto max-w-[700px] px-6 text-center">
        <motion.div
          className="mb-4 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Sparkles className="size-8 text-white" />
        </motion.div>
        <motion.h2
          className="text-3xl font-bold sm:text-4xl text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Ready to accelerate your SME with AI?
        </motion.h2>
        <motion.p
          className="mx-auto mt-4 max-w-md text-blue-100"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Join 100+ businesses who have transformed their workflows with
          personalised AI mentoring and agentic implementation.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button
            render={<a href="https://book.longcare.au" />}
            className="btn-shimmer mt-10 inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 text-base font-semibold text-blue-600 shadow-lg shadow-blue-900/25 transition hover:bg-blue-50 hover:shadow-blue-900/40 hover:scale-105 h-auto border-none"
          >
            Book Your Consultation
            <ArrowRight className="size-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
