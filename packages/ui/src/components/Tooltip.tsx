'use client';

import { useState, useRef, useCallback, type ReactNode, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils.js';

const tooltipPositionVariants = cva(
  'absolute z-50 rounded-lg bg-[#1e1e3a] border border-white/[0.12] px-3 py-1.5 text-xs text-[#e2e8f0] shadow-xl max-w-[250px] pointer-events-none transition-opacity duration-150',
  {
    variants: {
      position: {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
      },
    },
    defaultVariants: { position: 'top' },
  }
);

const arrowVariants = cva('absolute w-2 h-2 bg-[#1e1e3a] border border-white/[0.12] rotate-45', {
  variants: {
    position: {
      top: 'top-full left-1/2 -translate-x-1/2 -mt-1 border-t-0 border-l-0',
      bottom: 'bottom-full left-1/2 -translate-x-1/2 -mb-1 border-b-0 border-r-0',
      left: 'left-full top-1/2 -translate-y-1/2 -ml-1 border-t-0 border-l-0',
      right: 'right-full top-1/2 -translate-y-1/2 -mr-1 border-b-0 border-r-0',
    },
  },
  defaultVariants: { position: 'top' },
});

export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  content: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export function Tooltip({ content, position = 'top', delay = 200, children, className, ...props }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const show = useCallback(() => {
    timerRef.current = setTimeout(() => setVisible(true), delay);
  }, [delay]);

  const hide = useCallback(() => {
    clearTimeout(timerRef.current);
    setVisible(false);
  }, []);

  return (
    <div
      className={cn('relative inline-flex', className)}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      {...props}
    >
      {children}
      {visible && (
        <div role="tooltip" className={tooltipPositionVariants({ position })}>
          <span className={arrowVariants({ position })} />
          {content}
        </div>
      )}
    </div>
  );
}
