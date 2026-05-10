'use client';

import { useCallback } from 'react';
import { Check } from 'lucide-react';
import { motion } from 'motion/react';

interface ProgressBarProps {
  currentStep: number; // 0-indexed: 0=Service, 1=Schedule, 2=Details, 3=Payment
  onStepClick?: (step: number) => void;
}

const STEPS = ['Service', 'Schedule', 'Details', 'Payment'];

export function ProgressBar({ currentStep, onStepClick }: ProgressBarProps) {
  const handleClick = useCallback(
    (index: number) => {
      if (index < currentStep && onStepClick) {
        onStepClick(index);
      }
    },
    [currentStep, onStepClick]
  );

  return (
    <nav className="progress-bar" aria-label="Booking progress">
      <div className="progress-bar__track">
        {STEPS.map((label, i) => {
          const isCompleted = i < currentStep;
          const isActive = i === currentStep;

          return (
            <div key={label} className="progress-bar__step-wrapper">
              {/* Connecting line before this step (except first) */}
              {i > 0 && (
                <motion.div
                  className={`progress-bar__line ${isCompleted || isActive ? 'progress-bar__line--filled' : ''}`}
                  initial={false}
                  animate={{
                    background: isCompleted || isActive
                      ? 'var(--success)'
                      : 'rgba(255, 255, 255, 0.1)',
                  }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                />
              )}

              {/* Step circle */}
              <motion.button
                type="button"
                className={`progress-bar__circle ${
                  isCompleted
                    ? 'progress-bar__circle--completed'
                    : isActive
                    ? 'progress-bar__circle--active'
                    : 'progress-bar__circle--pending'
                }`}
                onClick={() => handleClick(i)}
                disabled={!isCompleted}
                aria-label={`Step ${i + 1}: ${label}${isCompleted ? ' (completed)' : isActive ? ' (current)' : ''}`}
                aria-current={isActive ? 'step' : undefined}
                initial={false}
                animate={{
                  scale: isActive ? 1.1 : 1,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                whileHover={isCompleted ? { scale: 1.15 } : {}}
                whileTap={isCompleted ? { scale: 0.95 } : {}}
              >
                {isCompleted ? (
                  <motion.span
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  >
                    <Check size={16} strokeWidth={2.5} />
                  </motion.span>
                ) : (
                  <span>{i + 1}</span>
                )}
              </motion.button>

              {/* Step label */}
              <span
                className={`progress-bar__label ${
                  isCompleted
                    ? 'progress-bar__label--completed'
                    : isActive
                    ? 'progress-bar__label--active'
                    : 'progress-bar__label--pending'
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
