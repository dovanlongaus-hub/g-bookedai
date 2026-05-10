'use client';

import { type ReactNode } from 'react';
import { cn } from '../lib/utils.js';

export interface StepItem {
  label: string;
  description?: string;
  icon?: ReactNode;
}

export interface StepperProps {
  steps: StepItem[];
  activeStep: number;
  onStepClick?: (index: number) => void;
  className?: string;
}

export function Stepper({ steps, activeStep, onStepClick, className }: StepperProps) {
  return (
    <div className={cn('flex items-center w-full', className)} role="list" aria-label="Progress">
      {steps.map((step, i) => {
        const isCompleted = i < activeStep;
        const isActive = i === activeStep;
        const isPending = i > activeStep;
        const isClickable = isCompleted && onStepClick;

        return (
          <div key={i} className={cn('flex items-center', i < steps.length - 1 && 'flex-1')} role="listitem">
            {/* Step circle + label */}
            <div className="flex flex-col items-center gap-2">
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick(i)}
                className={cn(
                  'flex items-center justify-center w-9 h-9 rounded-full text-sm font-semibold transition-all duration-200 shrink-0 border-2',
                  isCompleted && 'bg-[var(--primary)] border-[var(--primary)] text-white cursor-pointer hover:brightness-110',
                  isActive && 'border-[var(--primary)] text-[var(--primary)] bg-[var(--primary)]/10',
                  isPending && 'border-white/20 text-[var(--text-muted)] bg-white/[0.04]',
                  !isClickable && 'cursor-default'
                )}
                aria-current={isActive ? 'step' : undefined}
                aria-label={`Step ${i + 1}: ${step.label}${isCompleted ? ' (completed)' : isActive ? ' (current)' : ''}`}
              >
                {isCompleted ? (
                  step.icon || (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 4L6 11L3 8" />
                    </svg>
                  )
                ) : (
                  step.icon || <span>{i + 1}</span>
                )}
              </button>
              <div className="text-center hidden sm:block">
                <p className={cn(
                  'text-xs font-medium whitespace-nowrap',
                  isActive && 'text-[var(--primary)]',
                  isCompleted && 'text-[var(--text-main)]',
                  isPending && 'text-[var(--text-muted)]'
                )}>
                  {step.label}
                </p>
                {step.description && (
                  <p className="text-[10px] text-[var(--text-muted)] mt-0.5 whitespace-nowrap">
                    {step.description}
                  </p>
                )}
              </div>
            </div>

            {/* Connecting line */}
            {i < steps.length - 1 && (
              <div className={cn(
                'flex-1 h-0.5 mx-3 rounded-full transition-colors duration-200 mt-[-1.5rem] sm:mt-0 sm:-translate-y-3',
                i < activeStep ? 'bg-[var(--primary)]' : 'bg-white/[0.1]'
              )} />
            )}
          </div>
        );
      })}
    </div>
  );
}
