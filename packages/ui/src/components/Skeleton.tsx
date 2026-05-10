'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils.js';

const skeletonVariants = cva('animate-pulse bg-white/[0.06]', {
  variants: {
    variant: {
      text: 'h-4 rounded-md',
      circle: 'rounded-full',
      rectangle: 'rounded-xl',
      table: 'rounded-xl',
    },
  },
  defaultVariants: { variant: 'text' },
});

export interface SkeletonProps extends VariantProps<typeof skeletonVariants> {
  width?: string | number;
  height?: string | number;
  lines?: number;
  className?: string;
}

export function Skeleton({ variant, width, height, lines = 1, className }: SkeletonProps) {
  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  if (variant === 'circle') {
    const size = width || height || 40;
    const circleStyle = {
      width: typeof size === 'number' ? `${size}px` : size,
      height: typeof size === 'number' ? `${size}px` : size,
    };
    return <div className={cn(skeletonVariants({ variant }), className)} style={circleStyle} />;
  }

  if (variant === 'table') {
    const rows = lines || 5;
    return (
      <div className={cn('w-full space-y-2', className)} style={{ width: style.width }}>
        {/* Header row */}
        <div className="flex gap-4 pb-2 border-b border-white/[0.06]">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={`h-${i}`} className="h-4 flex-1 rounded-md bg-white/[0.08] animate-pulse" />
          ))}
        </div>
        {/* Body rows */}
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="flex gap-4 py-1">
            {Array.from({ length: 4 }).map((_, c) => (
              <div key={c} className="h-4 flex-1 rounded-md bg-white/[0.06] animate-pulse" />
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'text' && lines > 1) {
    return (
      <div className={cn('space-y-2', className)} style={{ width: style.width }}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(skeletonVariants({ variant }))}
            style={{
              width: i === lines - 1 ? '75%' : '100%',
              height: style.height,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(skeletonVariants({ variant }), className)}
      style={style}
    />
  );
}
