'use client';

import { forwardRef, useEffect, useRef, useCallback, type HTMLAttributes, type ReactNode, type MouseEvent } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils.js';

const overlayVariants = cva(
  'fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-200',
  {
    variants: {
      state: {
        open: 'opacity-100',
        closed: 'opacity-0 pointer-events-none',
      },
    },
    defaultVariants: { state: 'open' },
  }
);

const modalVariants = cva(
  'relative flex flex-col bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-xl shadow-2xl text-[#e2e8f0] transition-all duration-200 max-h-[85vh]',
  {
    variants: {
      size: {
        sm: 'w-full max-w-[400px]',
        md: 'w-full max-w-[500px]',
        lg: 'w-full max-w-[700px]',
        xl: 'w-full max-w-[900px]',
      },
      state: {
        open: 'scale-100 opacity-100',
        closed: 'scale-95 opacity-0',
      },
    },
    defaultVariants: { size: 'md', state: 'open' },
  }
);

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ className, open, onClose, title, footer, size, children, ...props }, ref) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);

    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
          return;
        }
        if (e.key === 'Tab' && modalRef.current) {
          const focusable = modalRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
          );
          if (focusable.length === 0) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault();
              last.focus();
            }
          } else {
            if (document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }
      },
      [onClose]
    );

    useEffect(() => {
      if (open) {
        previousFocusRef.current = document.activeElement as HTMLElement;
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(() => {
          const focusable = modalRef.current?.querySelector<HTMLElement>(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
          );
          focusable?.focus();
        });
      }
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
        previousFocusRef.current?.focus();
      };
    }, [open, handleKeyDown]);

    const handleOverlayClick = (e: MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    };

    if (!open) return null;

    const titleId = 'modal-title';

    return (
      <div className={overlayVariants({ state: 'open' })} onClick={handleOverlayClick}>
        <div
          ref={(node) => {
            (modalRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
          className={cn(modalVariants({ size, state: 'open' }), className)}
          {...props}
        >
          {/* Header */}
          {title && (
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08]">
              <h2 id={titleId} className="text-lg font-semibold text-[#e2e8f0]">
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded-md p-1.5 text-[#94a3b8] hover:text-[#e2e8f0] hover:bg-white/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
                aria-label="Close"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
              </button>
            </div>
          )}

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/[0.08]">
              {footer}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Modal.displayName = 'Modal';
