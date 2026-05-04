'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils.js';

const cardVariants = cva(
  'rounded-xl border transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'bg-[var(--surface)] border-[var(--surface-border)] backdrop-blur-sm',
        elevated: 'bg-[var(--surface)] border-[var(--surface-border)] shadow-xl shadow-black/20 backdrop-blur-md',
        interactive: 'bg-[var(--surface)] border-[var(--surface-border)] hover:border-[var(--primary)]/50 hover:shadow-lg hover:shadow-[var(--primary)]/5 cursor-pointer backdrop-blur-sm',
        glass: 'bg-white/5 border-white/10 backdrop-blur-xl shadow-2xl',
        gradient: 'bg-gradient-to-br from-[var(--primary)]/10 to-[var(--accent)]/5 border-[var(--primary)]/20',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  }
);

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding }), className)}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';
