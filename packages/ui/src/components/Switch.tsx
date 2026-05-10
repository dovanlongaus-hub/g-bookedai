'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils.js';

const switchTrackVariants = cva(
  'relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a1a] disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-5 w-9',
        md: 'h-6 w-11',
      },
    },
    defaultVariants: { size: 'md' },
  }
);

const switchThumbVariants = cva(
  'pointer-events-none inline-block rounded-full bg-white shadow-lg ring-0 transition-transform duration-200',
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
      },
    },
    defaultVariants: { size: 'md' },
  }
);

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>, VariantProps<typeof switchTrackVariants> {
  label?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, size, label, checked = false, onCheckedChange, disabled, id, ...props }, ref) => {
    const switchId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const translateClass = size === 'sm'
      ? (checked ? 'translate-x-4' : 'translate-x-0')
      : (checked ? 'translate-x-5' : 'translate-x-0');

    return (
      <label
        htmlFor={switchId}
        className={cn('inline-flex items-center gap-2', disabled && 'opacity-50 cursor-not-allowed', className)}
      >
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          aria-label={label}
          disabled={disabled}
          onClick={() => !disabled && onCheckedChange?.(!checked)}
          className={cn(
            switchTrackVariants({ size }),
            checked ? 'bg-[var(--primary)]' : 'bg-white/20'
          )}
        >
          <span className={cn(switchThumbVariants({ size }), translateClass)} />
        </button>
        <input
          ref={ref}
          type="checkbox"
          id={switchId}
          checked={checked}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        {label && (
          <span className="text-sm text-[var(--text-main)] select-none">{label}</span>
        )}
      </label>
    );
  }
);

Switch.displayName = 'Switch';
