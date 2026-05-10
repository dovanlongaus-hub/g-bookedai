'use client';

import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, Flame, Package } from 'lucide-react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'motion/react';

interface StatsGridProps {
  sessionsCompleted: number;
  hoursLearned: number;
  currentStreak: number;
  packageUsed: number;
  packageTotal: number;
}

function AnimatedNumber({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => v.toFixed(decimals));
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: 1.5, ease: 'easeOut' });
      const unsub = rounded.on('change', (v) => setDisplay(v));
      return () => {
        controls.stop();
        unsub();
      };
    }
  }, [isInView, value, count, rounded]);

  return <span ref={ref}>{display}</span>;
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

export function StatsGrid({ sessionsCompleted, hoursLearned, currentStreak, packageUsed, packageTotal }: StatsGridProps) {
  const progressPct = packageTotal > 0 ? Math.round((packageUsed / packageTotal) * 100) : 0;

  const statItems = [
    {
      icon: BookOpen,
      label: 'Sessions Completed',
      value: sessionsCompleted,
      color: '#6366f1',
      decimals: 0,
    },
    {
      icon: Clock,
      label: 'Hours Learned',
      value: hoursLearned,
      color: '#2dd4bf',
      decimals: 1,
    },
    {
      icon: Flame,
      label: 'Current Streak',
      value: currentStreak,
      color: '#f59e0b',
      decimals: 0,
      extra: currentStreak >= 3 ? (
        <span className="ml-1">
          {Array.from({ length: Math.min(currentStreak, 5) }).map((_, i) => (
            <Flame key={i} className="inline h-4 w-4 text-[#f59e0b]" />
          ))}
        </span>
      ) : null,
    },
  ];

  return (
    <motion.div
      className="stats-grid"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {statItems.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <motion.div key={i} variants={fadeUpItem}>
            <Card className="stat-card-upgraded">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="h-4 w-4" style={{ color: stat.color }} />
                  <span className="stat-label">{stat.label}</span>
                </div>
                <div className="stat-value" style={{ color: stat.color }}>
                  <AnimatedNumber value={stat.value} decimals={stat.decimals} />
                  {stat.extra}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}

      <motion.div variants={fadeUpItem}>
        <Card className="stat-card-upgraded">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <Package className="h-4 w-4 text-[#2dd4bf]" />
              <span className="stat-label">Package Balance</span>
            </div>
            <div className="stat-value" style={{ color: '#2dd4bf', fontSize: '1.5rem' }}>
              <AnimatedNumber value={packageUsed} /> / {packageTotal}
            </div>
            <Progress
              value={progressPct}
              className="mt-2 h-1.5 bg-[rgba(255,255,255,0.06)]"
            />
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
