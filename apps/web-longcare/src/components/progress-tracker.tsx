'use client';

import { motion, useReducedMotion } from 'motion/react';
import {
  Trophy, Star, Flame, Target, BookOpen, Zap,
  CheckCircle, Lock, ArrowRight, Award, TrendingUp
} from 'lucide-react';

const learningPath = [
  {
    level: 1,
    title: 'Explorer',
    xp: '0-100 XP',
    badge: '🌱',
    color: 'sky',
    milestones: [
      { text: 'Complete AI Readiness Quiz', xp: 10, done: true },
      { text: 'Download the free guide', xp: 15, done: true },
      { text: 'Book a discovery call', xp: 25, done: true },
      { text: 'Complete first course lesson', xp: 50, done: false },
    ],
  },
  {
    level: 2,
    title: 'Activator',
    xp: '100-300 XP',
    badge: '⚡',
    color: 'emerald',
    milestones: [
      { text: 'Complete AI Foundations course', xp: 100, done: false },
      { text: 'Attend first mentor session', xp: 75, done: false },
      { text: 'Build first prompt template', xp: 50, done: false },
      { text: 'Share a win in community', xp: 25, done: false },
    ],
  },
  {
    level: 3,
    title: 'Strategist',
    xp: '300-600 XP',
    badge: '🎯',
    color: 'amber',
    milestones: [
      { text: 'Complete Strategy Sprint', xp: 150, done: false },
      { text: 'Ship first automation', xp: 100, done: false },
      { text: 'Earn Prompt Engineering certificate', xp: 75, done: false },
      { text: 'Refer a colleague', xp: 50, done: false },
    ],
  },
  {
    level: 4,
    title: 'Builder',
    xp: '600+ XP',
    badge: '🏗️',
    color: 'violet',
    milestones: [
      { text: 'Deploy a production AI agent', xp: 200, done: false },
      { text: 'Complete Implementation program', xp: 150, done: false },
      { text: 'Mentor another learner', xp: 100, done: false },
      { text: 'Publish an AI case study', xp: 75, done: false },
    ],
  },
];

const badges = [
  { name: 'Quick Starter', icon: Zap, desc: 'Complete onboarding in 24h', earned: true },
  { name: 'Course Champion', icon: BookOpen, desc: 'Finish 3 courses', earned: false },
  { name: 'Session Streak', icon: Flame, desc: '3 mentor sessions in a row', earned: false },
  { name: 'Community Star', icon: Star, desc: 'Help 5 peers in community', earned: false },
  { name: 'ROI Proven', icon: TrendingUp, desc: 'Document measurable ROI', earned: false },
  { name: 'AI Certified', icon: Award, desc: 'Earn all certificates', earned: false },
];

export function ProgressTrackerPreview() {
  const reduced = useReducedMotion();
  const fadeUp = reduced
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      };
  const stagger = reduced ? { visible: {} } : { visible: { transition: { staggerChildren: 0.06 } } };

  const currentXP = 50;
  const currentLevel = learningPath[0];
  const progressPercent = (currentXP / 100) * 100;

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1120px] px-8 sm:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <motion.span variants={fadeUp} className="eyebrow">Your learning journey</motion.span>
          <motion.h2 variants={fadeUp} className="mt-4 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            Track your progress. Earn rewards.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-lg leading-relaxed text-slate-600">
            Every course, session, and milestone earns XP. Level up from Explorer to Builder.
          </motion.p>
        </motion.div>

        {/* Learning path timeline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14"
        >
          {learningPath.map((level, i) => {
            const isActive = i === 0;
            const isLocked = i > 0;

            return (
              <motion.div
                key={level.level}
                variants={fadeUp}
                className={`trust-card p-6 relative ${isActive ? 'ring-2 ring-sky-600' : ''} ${isLocked ? 'opacity-60' : ''}`}
              >
                {isActive && (
                  <div className="absolute -top-2.5 left-4 inline-flex items-center gap-1 rounded-full bg-sky-600 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                    Current level
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4 mt-1">
                  <span className="text-2xl">{level.badge}</span>
                  <div>
                    <div className="font-heading text-lg font-bold text-slate-900">Level {level.level}: {level.title}</div>
                    <div className="text-[12px] text-slate-500">{level.xp}</div>
                  </div>
                </div>

                {isActive && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-[12px] text-slate-500 mb-1">
                      <span>{currentXP} XP</span>
                      <span>100 XP</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-sky-600 h-2 rounded-full transition-all duration-700" style={{ width: `${progressPercent}%` }} />
                    </div>
                  </div>
                )}

                <div className="space-y-2.5">
                  {level.milestones.map((m) => (
                    <div key={m.text} className="flex items-start gap-2">
                      {m.done ? (
                        <CheckCircle className="size-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      ) : isLocked ? (
                        <Lock className="size-4 text-slate-300 flex-shrink-0 mt-0.5" />
                      ) : (
                        <div className="size-4 rounded-full border-2 border-slate-300 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="min-w-0">
                        <span className={`text-[12px] ${m.done ? 'text-slate-500 line-through' : isLocked ? 'text-slate-400' : 'text-slate-700'}`}>
                          {m.text}
                        </span>
                        <span className="text-[10px] text-sky-600 font-medium ml-1">+{m.xp} XP</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Badge collection */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="trust-card p-8 sm:p-10"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading text-lg font-semibold text-slate-900 flex items-center gap-2">
              <Trophy className="size-5 text-amber-500" /> Badge Collection
            </h3>
            <span className="text-[13px] text-slate-500">1 of 6 earned</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.name}
                className={`text-center p-4 rounded-xl border transition-all ${
                  badge.earned
                    ? 'border-amber-200 bg-amber-50'
                    : 'border-slate-200 bg-slate-50 opacity-50'
                }`}
              >
                <div className={`size-12 rounded-xl mx-auto mb-2 flex items-center justify-center ${
                  badge.earned ? 'bg-amber-100' : 'bg-slate-100'
                }`}>
                  <badge.icon className={`size-6 ${badge.earned ? 'text-amber-600' : 'text-slate-400'}`} strokeWidth={1.5} />
                </div>
                <div className={`text-[12px] font-semibold ${badge.earned ? 'text-slate-900' : 'text-slate-500'}`}>
                  {badge.name}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">{badge.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <a
            href="/quiz"
            className="cursor-pointer btn-cta inline-flex items-center gap-2 px-7 py-4 text-[15px] font-semibold rounded-full no-underline"
          >
            Start your journey — take the quiz <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
