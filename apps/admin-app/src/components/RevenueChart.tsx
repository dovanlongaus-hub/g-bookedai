'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ChartPoint {
  date: string;
  value: number;
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-[#1e1e3a]/95 backdrop-blur-xl border border-white/10 rounded-lg px-3 py-2 shadow-xl">
      <p className="text-xs text-[#6b7280] mb-1">{label}</p>
      <p className="text-sm font-semibold text-white">${payload[0].value.toLocaleString()}</p>
    </div>
  );
}

export function RevenueChart() {
  const [data, setData] = useState<ChartPoint[]>([]);
  const [period, setPeriod] = useState('30d');

  const fetchData = useCallback(() => {
    fetch('/api/dashboard/revenue-chart')
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.data) setData(d.data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredData = (() => {
    if (period === '7d') return data.slice(-7);
    if (period === '90d') return data;
    return data.slice(-30);
  })();

  return (
    <Card className="bg-white/[0.04] backdrop-blur-xl border-white/[0.08] rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between px-6 pt-6 pb-0">
        <div>
          <h3 className="text-base font-semibold text-white">Revenue Trend</h3>
          <p className="text-sm text-[#6b7280] mt-0.5">Daily revenue ({period === '7d' ? 'last 7 days' : period === '90d' ? 'last 90 days' : 'last 30 days'})</p>
        </div>
        <Tabs defaultValue="30d" onValueChange={(v: any) => setPeriod(v as string)}>
          <TabsList className="bg-white/[0.04] border border-white/[0.08] h-8">
            <TabsTrigger value="7d" className="text-xs px-3 data-active:bg-indigo-600 data-active:text-white">7d</TabsTrigger>
            <TabsTrigger value="30d" className="text-xs px-3 data-active:bg-indigo-600 data-active:text-white">30d</TabsTrigger>
            <TabsTrigger value="90d" className="text-xs px-3 data-active:bg-indigo-600 data-active:text-white">90d</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-4">
        {filteredData.length === 0 ? (
          <div className="flex items-center justify-center h-[280px] text-[#6b7280]">
            No revenue data yet
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={filteredData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueBarGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#818cf8" stopOpacity={0.5} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="4 4"
                stroke="rgba(255,255,255,0.05)"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 11 }}
                interval={filteredData.length > 15 ? Math.floor(filteredData.length / 7) : 0}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 11 }}
                tickFormatter={(v) => `$${v.toLocaleString()}`}
                width={56}
              />
              <RechartsTooltip
                content={<CustomTooltip />}
                cursor={{ fill: 'rgba(255,255,255,0.02)', radius: 4 }}
              />
              <Bar
                dataKey="value"
                fill="url(#revenueBarGrad)"
                radius={[4, 4, 0, 0]}
                maxBarSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
