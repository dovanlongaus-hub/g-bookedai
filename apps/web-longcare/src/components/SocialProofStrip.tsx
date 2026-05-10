'use client';

import { motion, useInView } from "motion/react"
import { Users, Award, Globe, Zap } from "lucide-react"
import { useRef, useEffect, useState } from "react"

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.max(1, Math.floor(target / (duration / 16)));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { value: 500, suffix: '+', label: 'Sessions & Projects delivered', icon: Zap },
  { value: 98, suffix: '%', label: 'Satisfaction rate', icon: Award },
  { value: 3, suffix: '', label: 'Languages supported', icon: Globe },
];

export function SocialProofStrip() {
  return (
    <section className="border-y border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <motion.p
          className="mb-10 text-center text-sm font-medium tracking-widest uppercase text-slate-400"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Trusted by SMEs and professionals across Australia
        </motion.p>

        {/* Placeholder logos */}
        <motion.div
          className="mb-12 flex flex-wrap items-center justify-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex h-10 w-28 items-center justify-center rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-400 shadow-sm backdrop-blur"
            >
              Partner {i + 1}
            </div>
          ))}
        </motion.div>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-12 sm:gap-20">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            >
              <div className="mb-2 flex justify-center">
                <s.icon className="size-6 text-blue-500" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                <AnimatedCounter target={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-sm text-slate-500">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
