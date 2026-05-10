'use client';

import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';

interface KpiCardProps {
  label: string;
  value: string;
  trend: number;
  trendLabel?: string;
  sparkline: number[];
  color: 'green' | 'indigo' | 'cyan' | 'teal';
  index?: number;
}

const colorMap = {
  green: { main: '#22c55e', gradient: ['rgba(34,197,94,0.3)', 'rgba(34,197,94,0)'] },
  indigo: { main: '#6366f1', gradient: ['rgba(99,102,241,0.3)', 'rgba(99,102,241,0)'] },
  cyan: { main: '#22d3ee', gradient: ['rgba(34,211,238,0.3)', 'rgba(34,211,238,0)'] },
  teal: { main: '#14b8a6', gradient: ['rgba(20,184,166,0.3)', 'rgba(20,184,166,0)'] },
};

export function KpiCard({ label, value, trend, trendLabel = 'vs last month', sparkline, color, index = 0 }: KpiCardProps) {
  const c = colorMap[color];
  const isPositive = trend >= 0;
  const gradientId = `sparkGrad-${color}`;

  const chartData = sparkline.map((v, i) => ({ value: v, index: i }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="bg-white/[0.04] backdrop-blur-xl border-white/[0.08] rounded-2xl overflow-hidden">
        <CardContent className="p-6 relative">
          {/* Label */}
          <p className="text-[0.8rem] font-medium text-[#6b7280] uppercase tracking-wider mb-2">
            {label}
          </p>

          {/* Value */}
          <p className="text-3xl font-bold tracking-tight leading-none" style={{ color: c.main }}>
            {value}
          </p>

          {/* Trend */}
          <div className="flex items-center gap-2 mt-2">
            <span className="flex items-center gap-1 text-[0.8rem] font-semibold" style={{ color: isPositive ? '#22c55e' : '#ef4444' }}>
              {isPositive ? <TrendingUp className="size-3.5" /> : <TrendingDown className="size-3.5" />}
              {Math.abs(trend)}%
            </span>
            <span className="text-xs text-[#4b5563]">{trendLabel}</span>
          </div>

          {/* Sparkline */}
          <div className="mt-4 h-10">
            <ResponsiveContainer width="100%" height={40}>
              <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={c.gradient[0]} />
                    <stop offset="100%" stopColor={c.gradient[1]} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={c.main}
                  strokeWidth={2}
                  fill={`url(#${gradientId})`}
                  dot={false}
                  isAnimationActive={true}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
