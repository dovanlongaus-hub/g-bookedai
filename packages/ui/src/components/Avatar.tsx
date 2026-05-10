'use client';

import { useState, type ImgHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils.js';

const avatarVariants = cva(
  'relative inline-flex items-center justify-center rounded-full bg-[var(--primary)]/20 text-[var(--primary)] font-semibold overflow-hidden shrink-0',
  {
    variants: {
      size: {
        sm: 'w-8 h-8 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-12 h-12 text-base',
        xl: 'w-16 h-16 text-lg',
      },
    },
    defaultVariants: { size: 'md' },
  }
);

const statusDotVariants = cva(
  'absolute bottom-0 right-0 rounded-full border-2 border-[#0a0a1a]',
  {
    variants: {
      status: {
        online: 'bg-[#22c55e]',
        offline: 'bg-[#6b7280]',
        busy: 'bg-[#ef4444]',
      },
      size: {
        sm: 'w-2.5 h-2.5',
        md: 'w-3 h-3',
        lg: 'w-3.5 h-3.5',
        xl: 'w-4 h-4',
      },
    },
    defaultVariants: { status: 'online', size: 'md' },
  }
);

export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'size'>, VariantProps<typeof avatarVariants> {
  name?: string;
  status?: 'online' | 'offline' | 'busy';
}

export function Avatar({ src, alt, name, size, status, className, ...props }: AvatarProps) {
  const [imgError, setImgError] = useState(false);

  const initials = name
    ? name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '?';

  return (
    <span className={cn(avatarVariants({ size }), className)}>
      {src && !imgError ? (
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
          {...props}
        />
      ) : (
        <span aria-label={name || 'Avatar'}>{initials}</span>
      )}
      {status && <span className={statusDotVariants({ status, size })} aria-label={status} />}
    </span>
  );
}
