'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useGoogleTranslate, GoogleTranslateElement } from '../components/GoogleTranslate';

type Language = 'en' | 'vi' | 'zh' | 'ja' | 'ko' | 'th' | 'fr' | 'de' | 'es';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Primary languages (shown as buttons)
const PRIMARY_LANGS = ['en', 'vi'] as const;

// All languages with labels
const ALL_LANGS: { code: string; flag: string; label: string }[] = [
  { code: 'en', flag: '🇦🇺', label: 'English' },
  { code: 'vi', flag: '🇻🇳', label: 'Tiếng Việt' },
  { code: 'zh', flag: '🇨🇳', label: '中文' },
  { code: 'ja', flag: '🇯🇵', label: '日本語' },
  { code: 'ko', flag: '🇰🇷', label: '한국어' },
  { code: 'th', flag: '🇹🇭', label: 'ไทย' },
  { code: 'fr', flag: '🇫🇷', label: 'Français' },
  { code: 'de', flag: '🇩🇪', label: 'Deutsch' },
  { code: 'es', flag: '🇪🇸', label: 'Español' },
];

const LANG_FLAGS: Record<string, string> = Object.fromEntries(ALL_LANGS.map(l => [l.code, l.flag]));

const WELCOME_MSG = "Hello! I'm the bookedai.au assistant. I can help you find AI mentoring services, book sessions, or answer questions about our programs. What can I help you with?";

const SUGGESTIONS_LIST = ['View services', 'Book a session', 'Tell me about AI mentoring', 'Pricing'];

const PLACEHOLDER_TEXT = 'Ask me anything about our services...';

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
}

function AnimatedCounter({ target, suffix = '' }: { target: string; suffix?: string }) {
  const { ref, isVisible } = useInView();
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!isVisible) return;
    const numericMatch = target.match(/[\d.]+/);
    if (!numericMatch) { setDisplay(target); return; }
    const end = parseFloat(numericMatch[0]);
    const prefix = target.slice(0, target.indexOf(numericMatch[0]));
    const postfix = target.slice(target.indexOf(numericMatch[0]) + numericMatch[0].length);
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();
    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = eased * end;
      const formatted = end % 1 === 0 ? Math.round(start).toString() : start.toFixed(1);
      setDisplay(`${prefix}${formatted}${postfix}`);
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }, [isVisible, target]);

  return <span ref={ref}>{display}{suffix}</span>;
}

export default function Home() {
  const [lang, setLang] = useState<Language>('en');
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: WELCOME_MSG },
  ]);
  const [loading, setLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [billingToggle, setBillingToggle] = useState<'monthly' | 'package'>('monthly');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { switchLanguage } = useGoogleTranslate();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Detect language from Google Translate cookie on load
  useEffect(() => {
    const match = document.cookie.match(/googtrans=\/en\/([a-z-]+)/i);
    if (match) {
      const detected = match[1].replace('-CN', '').replace('-TW', '') as Language;
      if (detected in LANG_LABELS) setLang(detected);
    }
  }, []);

  function switchLang(newLang: Language) {
    setLang(newLang);
    setMessages([{ role: 'assistant', content: WELCOME_MSG }]);
    // Trigger Google Translate for entire page
    switchLanguage(newLang);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim() || loading) return;
    const userMessage = query.trim();
    setQuery('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, language: lang }),
      });
      const data = await res.json();
      const reply = data?.data?.reply || data?.data?.error || 'Sorry, something went wrong.';
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, something went wrong.' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white text-[#0f2942]" style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>

      {/* ===== NAVBAR ===== */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-12 py-3.5">
          <a href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="bookedai.au" className="h-9" />
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#627d98]">
            <a href="#features" className="hover:text-[#0f2942] transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-[#0f2942] transition-colors">How It Works</a>
            <a href="#pricing" className="hover:text-[#0f2942] transition-colors">Pricing</a>
            <a href="#testimonials" className="hover:text-[#0f2942] transition-colors">Testimonials</a>
            <div className="relative ml-2">
              <button onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:border-[#0d9488] transition-all">
                <span>{LANG_FLAGS[lang]}</span>
                <span className="text-xs font-semibold uppercase text-[#627d98]">{LANG_LABELS[lang]}</span>
                <svg className={`w-3 h-3 text-[#9fb3c8] transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {langMenuOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl py-2 min-w-[160px] z-[200] animate-[slideUp_0.2s_ease-out]">
                  {Object.entries(LANG_LABELS).map(([code, label]) => (
                    <button key={code} onClick={() => { switchLang(code as Language); setLangMenuOpen(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-[#f0fdfa] transition-colors ${lang === code ? 'text-[#0d9488] font-semibold bg-[#f0fdfa]' : 'text-[#334e68]'}`}>
                      <span className="text-base">{LANG_FLAGS[code]}</span>
                      <span>{label}</span>
                      {lang === code && <svg className="w-4 h-4 ml-auto text-[#0d9488]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <a href="https://admin.g.bookedai.au" className="px-4 py-2.5 text-sm font-medium text-[#627d98] hover:text-[#0f2942] transition-colors">
              Log in
            </a>
            <a href="https://booking.g.bookedai.au"
              className="px-5 py-2.5 bg-gradient-to-r from-[#0d9488] to-[#14b8a6] hover:from-[#0f766e] hover:to-[#0d9488] text-white rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg">
              Start Free Trial
            </a>
          </div>
          {/* Mobile hamburger */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2" aria-label="Menu">
            <svg className="w-6 h-6 text-[#0f2942]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3">
            <a href="#features" className="block text-sm font-medium text-[#627d98]">Features</a>
            <a href="#how-it-works" className="block text-sm font-medium text-[#627d98]">How It Works</a>
            <a href="#pricing" className="block text-sm font-medium text-[#627d98]">Pricing</a>
            <a href="#testimonials" className="block text-sm font-medium text-[#627d98]">Testimonials</a>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {Object.entries(LANG_LABELS).map(([code, label]) => (
                <button key={code} onClick={() => { switchLang(code as Language); setMobileMenuOpen(false); }}
                  className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg ${lang === code ? 'bg-[#0d9488] text-white' : 'text-[#627d98] bg-gray-100 hover:bg-gray-200'}`}>
                  <span className="text-sm">{LANG_FLAGS[code]}</span> {label}
                </button>
              ))}
            </div>
            <a href="https://booking.g.bookedai.au"
              className="block mt-3 px-5 py-3 bg-gradient-to-r from-[#0d9488] to-[#14b8a6] text-white rounded-xl text-sm font-semibold text-center">
              Start Free Trial
            </a>
          </div>
        )}
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden">
        {/* Subtle background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f0fdfa] via-white to-[#f0f4f8]" />
        <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-[#0d9488]/5 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-20 left-10 w-[300px] h-[300px] bg-[#2dd4bf]/8 rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '6s' }} />
        {/* Floating abstract shapes */}
        <div className="absolute top-32 right-[15%] w-16 h-16 border-2 border-[#0d9488]/10 rounded-2xl rotate-12 animate-[float_6s_ease-in-out_infinite]" />
        <div className="absolute top-56 right-[8%] w-8 h-8 bg-[#2dd4bf]/10 rounded-full animate-[float_4s_ease-in-out_infinite_1s]" />
        <div className="absolute bottom-40 left-[12%] w-12 h-12 border-2 border-[#4ade80]/15 rounded-xl -rotate-6 animate-[float_5s_ease-in-out_infinite_0.5s]" />
        <div className="absolute top-72 left-[5%] w-6 h-6 bg-[#0d9488]/8 rounded-full animate-[float_7s_ease-in-out_infinite_2s]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-24 lg:pt-28 lg:pb-36">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f0fdfa] border border-[#99f6e4] text-sm font-medium text-[#0d9488] mb-8">
              <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
              The AI Revenue Engine
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4rem] font-extrabold leading-[1.08] tracking-tight mb-6">
              Turn customer intent into{' '}
              <span className="bg-gradient-to-r from-[#0d9488] via-[#2dd4bf] to-[#4ade80] bg-clip-text text-transparent">
                revenue
              </span>
              {' '} — automatically
            </h1>
            <p className="text-lg lg:text-xl text-[#627d98] max-w-2xl mx-auto leading-relaxed mb-10">
              bookedai.au is the intelligent platform that converts conversations into confirmed bookings,
              payments, and sustained growth — powered by AI, automated end-to-end.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a href="https://booking.g.bookedai.au"
                className="px-8 py-4 bg-gradient-to-r from-[#0d9488] to-[#14b8a6] hover:from-[#0f766e] hover:to-[#0d9488] text-white rounded-2xl font-semibold text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 inline-flex items-center justify-center gap-2">
                Start Free Trial
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </a>
              <button
                className="px-8 py-4 border-2 border-[#d9e2ec] hover:border-[#0d9488] text-[#334e68] rounded-2xl font-semibold text-base text-center transition-all hover:text-[#0d9488] inline-flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Watch Demo
              </button>
            </div>
            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-8 border-t border-gray-100">
              <span className="text-xs font-medium text-[#9fb3c8] uppercase tracking-wider">Trusted by</span>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg">
                <svg className="w-4 h-4 text-[#627d98]" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                <span className="text-xs font-medium text-[#627d98]">Google Cloud</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg">
                <svg className="w-4 h-4 text-[#627d98]" viewBox="0 0 24 24" fill="currentColor"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/></svg>
                <span className="text-xs font-medium text-[#627d98]">Stripe Verified</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg">
                <svg className="w-4 h-4 text-[#627d98]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                <span className="text-xs font-medium text-[#627d98]">SOC 2 Ready</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg">
                <span className="text-sm">🇦🇺</span>
                <span className="text-xs font-medium text-[#627d98]">Australian Made</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SOCIAL PROOF / STATS BAR ===== */}
      <section className="bg-[#0f2942] py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f2942] via-[#163a5c] to-[#0f2942]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-center text-sm font-medium text-[#627d98] uppercase tracking-wider mb-10">
            Trusted by Australian businesses
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: '95%', label: 'Booking Conversion' },
              { value: '<3s', label: 'AI Response Time' },
              { value: '24/7', label: 'Always Available' },
              { value: '3x', label: 'Revenue Growth' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-[#2dd4bf] to-[#4ade80] bg-clip-text text-transparent">
                  <AnimatedCounter target={stat.value} />
                </div>
                <div className="mt-2 text-sm text-[#9fb3c8]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES - BENTO GRID ===== */}
      <section id="features" className="py-24 bg-[#f8fafb]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-[#0f2942]">
              Everything you need to{' '}
              <span className="bg-gradient-to-r from-[#0d9488] to-[#2dd4bf] bg-clip-text text-transparent">grow revenue</span>
            </h2>
            <p className="text-[#627d98] text-lg max-w-2xl mx-auto">
              From first conversation to recurring revenue, bookedai.au handles the entire customer journey with AI precision.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid md:grid-cols-3 gap-5">
            {/* Large featured card */}
            <div className="md:col-span-2 md:row-span-2 group p-8 lg:p-10 bg-white rounded-3xl border border-gray-100 hover:border-[#0d9488]/30 hover:shadow-2xl hover:shadow-[#0d9488]/5 transition-all duration-500 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#0d9488]/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/4" />
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0d9488] to-[#2dd4bf] flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#0d9488]/20">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-[#0f2942]">AI Chat Assistant</h3>
                <p className="text-[#627d98] text-lg leading-relaxed max-w-lg">
                  Natural conversations that understand intent, recommend services, and guide customers to booking — in English, Vietnamese, and Chinese. Your 24/7 revenue-generating team member.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-3 text-sm font-medium text-[#0d9488] group-hover:gap-4 transition-all">
                Learn more
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </div>
            </div>

            {/* Smaller cards */}
            <div className="group p-7 bg-white rounded-3xl border border-gray-100 hover:border-[#0d9488]/30 hover:shadow-xl hover:shadow-[#0d9488]/5 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f0fdfa] to-[#ccfbf1] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-[#0d9488]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-[#0f2942]">Smart Booking Engine</h3>
              <p className="text-sm text-[#627d98] leading-relaxed">
                Real-time availability, automated 10-minute holds, Stripe payments, and Google Calendar + Meet integration.
              </p>
            </div>

            <div className="group p-7 bg-white rounded-3xl border border-gray-100 hover:border-[#0d9488]/30 hover:shadow-xl hover:shadow-[#0d9488]/5 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f0fdfa] to-[#ccfbf1] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-[#0d9488]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-[#0f2942]">Learning Engine</h3>
              <p className="text-sm text-[#627d98] leading-relaxed">
                AI-generated session summaries, progress tracking, Google Docs notes, and personalised next-step recommendations.
              </p>
            </div>

            <div className="md:col-span-1 group p-7 bg-white rounded-3xl border border-gray-100 hover:border-[#0d9488]/30 hover:shadow-xl hover:shadow-[#0d9488]/5 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f0fdfa] to-[#ccfbf1] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-[#0d9488]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-[#0f2942]">Marketing AI</h3>
              <p className="text-sm text-[#627d98] leading-relaxed">
                8-channel content generation with UTM tracking, approval workflows, and revenue attribution powered by Gemini.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
              Three steps to{' '}
              <span className="bg-gradient-to-r from-[#0d9488] to-[#2dd4bf] bg-clip-text text-transparent">automated growth</span>
            </h2>
            <p className="text-[#627d98] text-lg max-w-2xl mx-auto">
              AI recommends, Truth Engine confirms, Payment proves, Analytics optimises.
            </p>
          </div>

          {/* Horizontal timeline */}
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-[4.5rem] left-[16%] right-[16%] h-0.5">
              <div className="h-full bg-gradient-to-r from-[#0d9488] via-[#2dd4bf] to-[#4ade80] rounded-full" />
            </div>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {[
                { n: '01', title: 'Customer Chats', desc: 'AI understands intent and recommends the perfect service match for your customer — in their preferred language.', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />, color: 'from-[#0d9488] to-[#14b8a6]' },
                { n: '02', title: 'Instant Booking', desc: 'Seamless payment, calendar sync, and Google Meet link — all created automatically in seconds.', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />, color: 'from-[#14b8a6] to-[#2dd4bf]' },
                { n: '03', title: 'Revenue Grows', desc: 'Learning engine re-engages, marketing AI attracts new clients, revenue compounds over time.', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />, color: 'from-[#2dd4bf] to-[#4ade80]' },
              ].map((step) => (
                <div key={step.n} className="relative text-center group">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <svg className="w-9 h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">{step.icon}</svg>
                  </div>
                  <div className="text-xs font-bold text-[#0d9488] uppercase tracking-wider mb-2">Step {step.n}</div>
                  <h3 className="text-xl font-bold mb-3 text-[#0f2942]">{step.title}</h3>
                  <p className="text-[#627d98] leading-relaxed max-w-xs mx-auto">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section id="pricing" className="py-24 bg-[#f8fafb]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">Simple, transparent pricing</h2>
            <p className="text-[#627d98] text-lg max-w-2xl mx-auto mb-8">Start with a free session. Scale as you grow. All prices include GST.</p>

            {/* Toggle */}
            <div className="inline-flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
              <button onClick={() => setBillingToggle('monthly')}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${billingToggle === 'monthly' ? 'bg-[#0d9488] text-white shadow-md' : 'text-[#627d98] hover:text-[#0f2942]'}`}>
                Per Session
              </button>
              <button onClick={() => setBillingToggle('package')}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${billingToggle === 'package' ? 'bg-[#0d9488] text-white shadow-md' : 'text-[#627d98] hover:text-[#0f2942]'}`}>
                Package
                <span className="ml-1.5 text-xs opacity-80">Save 10%</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: 'AI Starter',
                price: billingToggle === 'monthly' ? '$29' : '$26',
                period: billingToggle === 'monthly' ? 'per session' : 'per session (5-pack)',
                desc: '30-minute intro session',
                features: ['AI Chat Assistant', '1-on-1 with AI Mentor', 'Session summary + notes', 'Google Meet link', 'Email support'],
                highlighted: false,
              },
              {
                name: 'AI Mentor',
                price: billingToggle === 'monthly' ? '$99' : '$89',
                period: billingToggle === 'monthly' ? 'per session' : 'per session (5-pack)',
                desc: '1-hour deep dive session',
                features: ['Everything in Starter', '60-min session', 'Learning path recommendations', 'Google Docs lesson notes', 'Priority scheduling', 'Progress dashboard'],
                highlighted: true,
              },
              {
                name: 'Growth Package',
                price: billingToggle === 'monthly' ? '$450' : '$405',
                period: billingToggle === 'monthly' ? '5-session package' : '10-session package',
                desc: 'Serious growth commitment',
                features: ['Everything in AI Mentor', '5 x 1-hour sessions', 'Progress dashboard', 'Marketing AI access', 'Dedicated support', 'Custom learning path', 'Priority booking'],
                highlighted: false,
              },
            ].map((plan) => (
              <div key={plan.name} className={`relative p-8 rounded-3xl border h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                plan.highlighted
                  ? 'bg-white border-[#0d9488] shadow-xl shadow-[#0d9488]/10 ring-2 ring-[#0d9488]/20 scale-[1.02]'
                  : 'bg-white border-gray-200 hover:border-[#0d9488]/30'
              }`}>
                {plan.highlighted && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1.5 text-xs font-bold bg-gradient-to-r from-[#0d9488] to-[#2dd4bf] text-white rounded-full shadow-lg">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-[#0f2942]">{plan.name}</h3>
                <div className="mt-4 mb-2">
                  <span className="text-4xl lg:text-5xl font-extrabold text-[#0f2942]">{plan.price}</span>
                  <span className="text-sm text-[#627d98] ml-2">{plan.period}</span>
                </div>
                <p className="text-sm text-[#627d98] mb-6">{plan.desc}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-[#334e68]">
                      <svg className="w-5 h-5 text-[#0d9488] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="https://booking.g.bookedai.au"
                  className={`block text-center px-6 py-4 rounded-xl font-semibold text-sm transition-all ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-[#0d9488] to-[#14b8a6] text-white hover:shadow-lg hover:shadow-[#0d9488]/20 hover:-translate-y-0.5'
                      : 'border-2 border-gray-200 text-[#334e68] hover:border-[#0d9488] hover:text-[#0d9488]'
                  }`}>
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
              Loved by{' '}
              <span className="bg-gradient-to-r from-[#0d9488] to-[#2dd4bf] bg-clip-text text-transparent">businesses</span>
            </h2>
            <p className="text-[#627d98] text-lg max-w-2xl mx-auto">
              See what Australian businesses are saying about bookedai.au.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { stars: 5, quote: "bookedai.au transformed our booking process. We went from manual emails to fully automated bookings in a week. Revenue is up 3x.", name: "Sarah Chen", role: "Founder, Melbourne Wellness Co" },
              { stars: 5, quote: "The AI assistant handles bookings while I sleep. It speaks Vietnamese to my clients and English to me. Absolutely game-changing.", name: "Minh Tran", role: "Director, VietCare Services" },
              { stars: 5, quote: "The learning engine keeps my students engaged between sessions. Retention went from 40% to 85% in two months.", name: "David Park", role: "CEO, EduTech Academy" },
            ].map((t, i) => (
              <div key={i} className="group p-8 bg-[#f8fafb] rounded-3xl border border-gray-100 hover:bg-white hover:shadow-xl hover:border-[#0d9488]/20 transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <svg key={j} className="w-5 h-5 text-[#f59e0b]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[#334e68] leading-relaxed mb-6 text-[15px]">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0d9488] to-[#2dd4bf] flex items-center justify-center text-white text-sm font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#0f2942]">{t.name}</div>
                    <div className="text-xs text-[#627d98]">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-24 bg-gradient-to-br from-[#0f2942] via-[#163a5c] to-[#0f2942] relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0d9488]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#2dd4bf]/10 rounded-full blur-[80px]" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <img src="/logo-light.png" alt="bookedai.au" className="h-10 mx-auto mb-8 opacity-90" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6">
            Ready to turn intent into revenue?
          </h2>
          <p className="text-lg text-[#9fb3c8] mb-10 max-w-2xl mx-auto leading-relaxed">
            Join Australian businesses using bookedai.au to automate their booking, payment, and growth — powered by AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://booking.g.bookedai.au"
              className="px-10 py-4 bg-gradient-to-r from-[#0d9488] to-[#2dd4bf] text-white rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-[#0d9488]/30 transition-all hover:-translate-y-1 inline-flex items-center justify-center gap-2">
              Start Free Trial
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </a>
            <button onClick={() => setChatOpen(true)}
              className="px-10 py-4 border-2 border-white/20 text-white rounded-2xl font-semibold text-lg hover:border-[#2dd4bf] hover:text-[#2dd4bf] transition-all inline-flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
              Chat with AI
            </button>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#091e33] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <img src="/logo-light.png" alt="bookedai.au" className="h-8 mb-4" />
              <p className="text-sm text-[#829ab1] max-w-sm leading-relaxed">
                The AI Revenue Engine — turn customer intent into revenue, automatically. Built for Australian service businesses.
              </p>
              <div className="flex gap-3 mt-6">
                <a href="#" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#0d9488] hover:border-[#0d9488] transition-all">
                  <svg className="w-4 h-4 text-[#829ab1]" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="#" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#0d9488] hover:border-[#0d9488] transition-all">
                  <svg className="w-4 h-4 text-[#829ab1]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider text-[#627d98]">Platform</h4>
              <ul className="space-y-3 text-sm text-[#829ab1]">
                <li><a href="#features" className="hover:text-[#2dd4bf] transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-[#2dd4bf] transition-colors">Pricing</a></li>
                <li><a href="#how-it-works" className="hover:text-[#2dd4bf] transition-colors">How It Works</a></li>
                <li><a href="https://longcare.au" className="hover:text-[#2dd4bf] transition-colors">longcare.au</a></li>
                <li><a href="https://admin.g.bookedai.au" className="hover:text-[#2dd4bf] transition-colors">Admin Portal</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider text-[#627d98]">Legal</h4>
              <ul className="space-y-3 text-sm text-[#829ab1]">
                <li><a href="/privacy" className="hover:text-[#2dd4bf] transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-[#2dd4bf] transition-colors">Terms of Service</a></li>
                <li><a href="mailto:support@bookedai.au" className="hover:text-[#2dd4bf] transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#627d98]">&copy; {new Date().getFullYear()} bookedai.au — All rights reserved. ABN registered in Australia.</p>
            <div className="flex gap-4 text-xs text-[#627d98]">
              <span>Melbourne, Australia</span>
              <span>|</span>
              <span>support@bookedai.au</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ===== FLOATING CHAT WIDGET ===== */}
      {chatOpen && (
        <div className="fixed bottom-6 right-6 z-[100] w-[380px] max-w-[calc(100vw-2rem)] animate-[slideUp_0.3s_ease-out]">
          <div className="bg-white rounded-3xl shadow-2xl shadow-black/20 border border-gray-200 overflow-hidden flex flex-col max-h-[550px]">
            {/* Chat header */}
            <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-[#0d9488] to-[#14b8a6] text-white">
              <div className="flex items-center gap-3">
                <img src="/logo-light.png" alt="" className="h-5" />
                <span className="text-sm font-semibold">AI Assistant</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {(['en', 'vi', 'zh'] as Language[]).map((l) => (
                    <button key={l} onClick={() => { setLang(l); setMessages([{ role: 'assistant', content: WELCOME_MSG }]); }}
                      className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${lang === l ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white/90'}`}>
                      {LANG_FLAGS[l]} {l}
                    </button>
                  ))}
                </div>
                <button onClick={() => setChatOpen(false)} className="ml-2 p-1 hover:bg-white/10 rounded-lg transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f8fafb] min-h-[280px] max-h-[360px]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#0d9488] text-white rounded-br-md'
                      : 'bg-white text-[#0f2942] border border-gray-100 rounded-bl-md shadow-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-[#0d9488] rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-[#0d9488] rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-2 h-2 bg-[#0d9488] rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            {/* Suggestions */}
            <div className="px-4 py-2 bg-[#f8fafb] border-t border-gray-100 flex flex-wrap gap-1.5">
              {SUGGESTIONS_LIST.map((s) => (
                <button key={s} onClick={() => { setQuery(s); }}
                  className="px-2.5 py-1 text-[11px] rounded-full border border-gray-200 text-[#627d98] hover:border-[#0d9488] hover:text-[#0d9488] transition-all bg-white">
                  {s}
                </button>
              ))}
            </div>
            {/* Input */}
            <form onSubmit={handleSubmit} className="px-4 py-3 bg-white border-t border-gray-100 flex gap-2">
              <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
                placeholder={PLACEHOLDER_TEXT}
                className="flex-1 bg-[#f8fafb] border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#0d9488] focus:ring-2 focus:ring-[#0d9488]/10 transition-all placeholder:text-[#9fb3c8]" />
              <button type="submit" disabled={loading || !query.trim()}
                className="px-4 py-2.5 bg-[#0d9488] hover:bg-[#0f766e] text-white rounded-xl text-sm font-semibold transition-all disabled:opacity-40">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Chat FAB button */}
      {!chatOpen && (
        <button onClick={() => setChatOpen(true)} aria-label="Open chat"
          className="fixed bottom-6 right-6 z-[100] w-14 h-14 bg-gradient-to-r from-[#0d9488] to-[#14b8a6] rounded-full flex items-center justify-center shadow-xl shadow-[#0d9488]/30 hover:shadow-2xl hover:scale-110 transition-all group">
          <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full bg-[#0d9488] animate-ping opacity-20" />
        </button>
      )}

      {/* Google Translate (hidden) */}
      <GoogleTranslateElement />

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}
