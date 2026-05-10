'use client';

import { useState, useEffect } from 'react';

const TOGGLE_STYLE = {
  background: 'none',
  border: '1px solid rgba(255,255,255,0.15)',
  color: '#9ba1a6',
  padding: '3px 8px',
  borderRadius: 4,
  fontSize: '0.8rem',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  minWidth: 32,
  minHeight: 26,
} as const;

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // Read persisted theme on client only — avoids SSR/CSR hydration mismatch.
  useEffect(() => {
    setMounted(true);
    try {
      const saved = window.localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') {
        setTheme(saved);
      }
    } catch {
      // localStorage unavailable (private mode, etc.) — keep default.
    }
  }, []);

  // Apply theme attribute whenever it changes (after mount).
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute('data-theme', theme);
  }, [mounted, theme]);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try {
      window.localStorage.setItem('theme', next);
    } catch {
      // Ignore quota / disabled storage.
    }
  };

  // Render an inert placeholder (same dimensions) until mounted to keep
  // server-rendered markup stable and avoid hydration warnings.
  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        suppressHydrationWarning
        style={TOGGLE_STYLE}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      style={TOGGLE_STYLE}
    >
      {theme === 'dark' ? '☀' : '🌙'}
    </button>
  );
}
