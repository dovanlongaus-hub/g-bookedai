'use client';

import { useState, useEffect } from 'react';

export function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      setDark(false);
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      style={{
        background: 'none', border: '1px solid rgba(255,255,255,0.15)',
        color: '#9ba1a6', padding: '3px 8px', borderRadius: 4,
        fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
      }}
    >
      {dark ? '\u2600' : '\uD83C\uDF19'}
    </button>
  );
}
