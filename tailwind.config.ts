import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './apps/*/src/**/*.{ts,tsx,js,jsx}',
    './packages/ui/src/**/*.{ts,tsx,js,jsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#6366f1',
          secondary: '#0891b2',
          accent: '#22d3ee',
        },
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
          DEFAULT: '#6366f1',
        },
        accent: {
          DEFAULT: '#22d3ee',
          light: '#67e8f9',
          dark: '#0891b2',
        },
        surface: {
          DEFAULT: 'rgba(255, 255, 255, 0.04)',
          hover: 'rgba(255, 255, 255, 0.08)',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-hover': 'rgba(255, 255, 255, 0.16)',
        },
        dark: {
          bg: '#050510',
          elevated: '#0a0a1a',
        },
        text: {
          main: '#f8f9fa',
          secondary: '#cbd5e1',
          muted: '#8b92a5',
          disabled: '#4b5563',
        },
      },
      fontFamily: {
        heading: ['Outfit', 'system-ui', 'sans-serif'],
        body: ['Outfit', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      borderRadius: {
        sm: '0.375rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(99, 102, 241, 0.3)',
        'glow-accent': '0 0 20px rgba(34, 211, 238, 0.3)',
        'glow-primary-lg': '0 0 40px rgba(99, 102, 241, 0.4)',
        'glow-accent-lg': '0 0 40px rgba(34, 211, 238, 0.4)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #6366f1, #4338ca)',
        'gradient-accent': 'linear-gradient(135deg, #22d3ee, #818cf8)',
        'gradient-hero':
          'radial-gradient(ellipse at 30% 0%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(34, 211, 238, 0.1) 0%, transparent 50%)',
        'gradient-glass':
          'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        shimmer: 'shimmer 1.5s infinite',
        glow: 'pulse-glow 2s infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 5px #6366f1' },
          '50%': { boxShadow: '0 0 20px #6366f1, 0 0 40px #818cf8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
