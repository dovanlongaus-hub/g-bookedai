'use client';

import { type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils.js';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-white/10 text-[var(--text-muted)] border border-white/10',
        primary: 'bg-[var(--primary)]/15 text-[var(--primary)] border border-[var(--primary)]/30',
        success: 'bg-[var(--success)]/15 text-[var(--success)] border border-[var(--success)]/30',
        warning: 'bg-[var(--warning)]/15 text-[var(--warning)] border border-[var(--warning)]/30',
        danger: 'bg-[var(--danger)]/15 text-[var(--danger)] border border-[var(--danger)]/30',
        accent: 'bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30',
      },
      size: {
        sm: 'text-[10px] px-2 py-0',
        md: 'text-xs px-2.5 py-0.5',
        lg: 'text-sm px-3 py-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

export function Badge({ className, variant, size, dot, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {dot && (
        <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
      )}
      {children}
    </span>
  );
}
