'use client';

import { useState, useCallback, useEffect, useRef, createContext, useContext, type ReactNode } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils.js';

const toastVariants = cva(
  'relative flex items-start gap-3 w-80 rounded-lg border p-4 shadow-2xl backdrop-blur-xl transition-all duration-300 text-sm',
  {
    variants: {
      variant: {
        success: 'bg-[#22c55e]/10 border-[#22c55e]/30 text-[#22c55e]',
        error: 'bg-[#ef4444]/10 border-[#ef4444]/30 text-[#ef4444]',
        warning: 'bg-[#f59e0b]/10 border-[#f59e0b]/30 text-[#f59e0b]',
        info: 'bg-[#6366f1]/10 border-[#6366f1]/30 text-[#6366f1]',
      },
    },
    defaultVariants: { variant: 'info' },
  }
);

const icons: Record<string, ReactNode> = {
  success: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 4.5L6.75 12.75L3 9" />
    </svg>
  ),
  error: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="9" cy="9" r="7" /><path d="M6 6l6 6M12 6l-6 6" />
    </svg>
  ),
  warning: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M9 2l7.5 13H1.5L9 2z" /><path d="M9 7v3M9 12.5v.5" />
    </svg>
  ),
  info: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="9" cy="9" r="7" /><path d="M9 8v4M9 6v.5" />
    </svg>
  ),
};

export interface ToastData {
  id: string;
  variant: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
  duration?: number;
}

interface ToastContextValue {
  toast: (data: Omit<ToastData, 'id'>) => string;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let toastCounter = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) { clearTimeout(timer); timersRef.current.delete(id); }
  }, []);

  const toast = useCallback(
    (data: Omit<ToastData, 'id'>) => {
      const id = `toast-${++toastCounter}`;
      const duration = data.duration ?? 5000;
      setToasts((prev) => {
        const next = [...prev, { ...data, id }];
        return next.slice(-5); // max 5
      });
      if (duration > 0) {
        const timer = setTimeout(() => dismiss(id), duration);
        timersRef.current.set(id, timer);
      }
      return id;
    },
    [dismiss]
  );

  useEffect(() => {
    return () => {
      timersRef.current.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      {/* Toast container */}
      <div
        className="fixed top-4 right-4 z-[100] flex flex-col gap-2"
        aria-live="polite"
        aria-label="Notifications"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              toastVariants({ variant: t.variant }),
              'animate-[slideIn_0.3s_ease-out]'
            )}
            role="alert"
          >
            <span className="mt-0.5 shrink-0">{icons[t.variant]}</span>
            <div className="flex-1 min-w-0">
              <p className="font-medium">{t.title}</p>
              {t.description && <p className="mt-1 text-xs opacity-80">{t.description}</p>}
            </div>
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              className="shrink-0 rounded-md p-0.5 opacity-60 hover:opacity-100 transition-opacity"
              aria-label="Dismiss"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 3l8 8M11 3l-8 8" />
              </svg>
            </button>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>');
  return ctx;
}
