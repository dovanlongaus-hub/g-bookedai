'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, TrendingUp, Clock, DollarSign, ArrowRight, Sparkles } from 'lucide-react';

const automationScenarios = [
  { label: 'Invoice reconciliation', hoursPerWeek: 8, automationRate: 0.85 },
  { label: 'Customer support (Tier 1)', hoursPerWeek: 15, automationRate: 0.80 },
  { label: 'Data entry & forms', hoursPerWeek: 10, automationRate: 0.90 },
  { label: 'Report generation', hoursPerWeek: 5, automationRate: 0.75 },
  { label: 'Email & comms drafting', hoursPerWeek: 6, automationRate: 0.70 },
  { label: 'Compliance & BAS prep', hoursPerWeek: 4, automationRate: 0.60 },
];

export function ROICalculator() {
  const [hoursOnAdmin, setHoursOnAdmin] = useState(10);
  const [teamSize, setTeamSize] = useState(5);
  const [avgHourlyRate, setAvgHourlyRate] = useState(45);
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>(['Invoice reconciliation', 'Data entry & forms']);

  // Calculate ROI
  const totalAdminHours = hoursOnAdmin * teamSize;
  const automationRate = 0.65; // conservative average
  const hoursSaved = Math.round(totalAdminHours * automationRate);
  const weeklySavings = hoursSaved * avgHourlyRate;
  const monthlySavings = weeklySavings * 4.33;
  const yearlySavings = monthlySavings * 12;

  // Payback period (assuming $450 Strategy Sprint as entry point)
  const investmentCost = 450;
  const paybackWeeks = Math.ceil(investmentCost / weeklySavings) || 1;

  function toggleScenario(label: string) {
    setSelectedScenarios((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    );
  }

  return (
    <section id="roi-calculator" className="py-20 sm:py-28 bg-white border-y border-slate-200">
      <div className="mx-auto max-w-[1120px] px-8 sm:px-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="eyebrow">ROI Calculator</span>
          <h2 className="mt-4 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            See what AI could save your business.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Adjust the sliders to match your team. Get an instant estimate — no email required.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12">
          {/* Left — inputs */}
          <div className="trust-card p-8 sm:p-10">
            <h3 className="font-heading text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <Calculator className="size-5 text-sky-700" /> Your numbers
            </h3>

            {/* Hours on admin */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <label className="text-[13px] font-medium text-slate-700">Hours on admin per person per week</label>
                <span className="text-[15px] font-bold text-sky-700">{hoursOnAdmin}h</span>
              </div>
              <input
                type="range"
                min={1}
                max={40}
                value={hoursOnAdmin}
                onChange={(e) => setHoursOnAdmin(Number(e.target.value))}
                className="w-full accent-sky-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>1h</span><span>40h</span>
              </div>
            </div>

            {/* Team size */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <label className="text-[13px] font-medium text-slate-700">Team members doing admin</label>
                <span className="text-[15px] font-bold text-sky-700">{teamSize}</span>
              </div>
              <input
                type="range"
                min={1}
                max={50}
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full accent-sky-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>1</span><span>50</span>
              </div>
            </div>

            {/* Hourly rate */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <label className="text-[13px] font-medium text-slate-700">Average hourly rate (AUD)</label>
                <span className="text-[15px] font-bold text-sky-700">${avgHourlyRate}</span>
              </div>
              <input
                type="range"
                min={25}
                max={150}
                step={5}
                value={avgHourlyRate}
                onChange={(e) => setAvgHourlyRate(Number(e.target.value))}
                className="w-full accent-sky-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>$25</span><span>$150</span>
              </div>
            </div>

            {/* Automation scenarios */}
            <div>
              <label className="text-[13px] font-medium text-slate-700 mb-3 block">Tasks to automate (select all that apply)</label>
              <div className="grid grid-cols-2 gap-2">
                {automationScenarios.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => toggleScenario(s.label)}
                    className={`cursor-pointer text-left p-3 rounded-lg border text-[12px] font-medium transition-all ${
                      selectedScenarios.includes(s.label)
                        ? 'border-sky-600 bg-sky-50 text-sky-800'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right — results */}
          <div className="space-y-6">
            <div className="trust-card bg-gradient-to-br from-sky-50 via-white to-emerald-50/50 p-8 sm:p-10 border-sky-100">
              <h3 className="text-[11px] font-semibold tracking-[0.16em] uppercase text-sky-700 mb-6">Your estimated savings</h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-xl bg-white border border-sky-200 shadow-sm flex items-center justify-center flex-shrink-0">
                    <Clock className="size-6 text-sky-700" />
                  </div>
                  <div>
                    <div className="font-heading text-3xl sm:text-4xl font-bold text-slate-900">
                      {hoursSaved}h
                      <span className="text-lg font-normal text-slate-500">/week</span>
                    </div>
                    <div className="text-sm text-slate-600">Time saved across team</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-xl bg-white border border-emerald-200 shadow-sm flex items-center justify-center flex-shrink-0">
                    <DollarSign className="size-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-heading text-3xl sm:text-4xl font-bold text-slate-900">
                      ${monthlySavings.toLocaleString()}
                      <span className="text-lg font-normal text-slate-500">/month</span>
                    </div>
                    <div className="text-sm text-slate-600">Cost savings (conservative)</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-xl bg-white border border-amber-200 shadow-sm flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="size-6 text-amber-600" />
                  </div>
                  <div>
                    <div className="font-heading text-3xl sm:text-4xl font-bold text-slate-900">
                      ${yearlySavings.toLocaleString()}
                      <span className="text-lg font-normal text-slate-500">/year</span>
                    </div>
                    <div className="text-sm text-slate-600">Annual impact</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 mb-2">
                  <Sparkles className="size-3.5 text-emerald-600" />
                  <span className="text-[12px] font-semibold text-emerald-700">
                    Payback in ~{paybackWeeks} {paybackWeeks === 1 ? 'week' : 'weeks'}
                  </span>
                </div>
                <p className="text-[12px] text-slate-500 mt-2">
                  Based on a $450 Strategy Sprint investment. Conservative 65% automation rate applied.
                </p>
              </div>
            </div>

            <a
              href="/discovery-call"
              className="cursor-pointer btn-cta w-full py-4 rounded-xl text-[15px] font-semibold inline-flex items-center justify-center gap-2 no-underline"
            >
              Get your free AI assessment <ArrowRight className="size-4" />
            </a>

            <p className="text-[12px] text-slate-500 text-center">
              These estimates are based on industry averages from 150+ Australian SME engagements.
              Actual results vary by business complexity and implementation scope.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
