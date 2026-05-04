'use client';

import { useState, useRef, useEffect } from 'react';

type Language = 'en' | 'vi' | 'zh';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const WELCOME: Record<Language, string> = {
  en: "Hello! I'm the BookedAI assistant. I can help you find AI mentoring services, book sessions, or answer questions about our programs. What can I help you with?",
  vi: "Xin chào! Tôi là trợ lý BookedAI. Tôi có thể giúp bạn tìm dịch vụ mentoring AI, đặt lịch, hoặc trả lời câu hỏi về chương trình. Tôi có thể giúp gì cho bạn?",
  zh: "你好！我是BookedAI助手。我可以帮您找到AI辅导服务、预约课程或回答有关我们项目的问题。有什么可以帮您的？",
};

const SUGGESTIONS: Record<Language, string[]> = {
  en: ['View services', 'Book a session', 'Tell me about AI mentoring', 'Pricing'],
  vi: ['Xem dịch vụ', 'Đặt lịch', 'Về mentoring AI', 'Bảng giá'],
  zh: ['查看服务', '预约课程', '关于AI辅导', '价格'],
};

const PLACEHOLDERS: Record<Language, string> = {
  en: 'How can I help you today?',
  vi: 'Tôi có thể giúp gì cho bạn?',
  zh: '我今天能帮您什么？',
};

const FEATURES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
    title: 'AI Chat',
    description: 'Natural conversations that understand intent, recommend services, and guide customers to booking.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Smart Booking',
    description: 'Real-time availability, automated holds, Stripe payments, and Google Calendar + Meet integration.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'Learning Engine',
    description: 'AI-generated session summaries, progress tracking, and personalised next-step recommendations.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
    title: 'Marketing AI',
    description: '8-channel content generation with UTM tracking, approval workflows, and revenue attribution.',
  },
];

const STEPS = [
  { number: '01', title: 'Customer Chats', description: 'AI understands intent and recommends the perfect service match.' },
  { number: '02', title: 'Instant Booking', description: 'Seamless payment, calendar sync, and meeting link — all automated.' },
  { number: '03', title: 'Revenue Grows', description: 'Learning engine re-engages, marketing AI attracts, revenue compounds.' },
];

const STATS = [
  { value: '95%', label: 'Booking Conversion' },
  { value: '<3s', label: 'AI Response Time' },
  { value: '24/7', label: 'Always Available' },
  { value: '3x', label: 'Revenue Growth' },
];

export default function Home() {
  const [lang, setLang] = useState<Language>('en');
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: WELCOME.en },
  ]);
  const [loading, setLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  function switchLang(newLang: Language) {
    setLang(newLang);
    setMessages([{ role: 'assistant', content: WELCOME[newLang] }]);
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
      const errorMsg = lang === 'vi' ? 'Xin lỗi, đã xảy ra lỗi.' : lang === 'zh' ? '抱歉，出了点问题。' : 'Sorry, something went wrong.';
      setMessages((prev) => [...prev, { role: 'assistant', content: errorMsg }]);
    } finally {
      setLoading(false);
    }
  }

  function handleSuggestion(text: string) {
    setQuery(text);
    setChatOpen(true);
  }

  return (
    <div className="min-h-screen bg-[#050510] text-[#f8f9fa] font-body overflow-x-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(99,102,241,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(34,211,238,0.08)_0%,transparent_50%)]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#6366f1]/5 rounded-full blur-[120px] animate-pulse" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 lg:px-12 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="BookedAI" className="h-8 w-8" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          <span className="text-xl font-bold bg-gradient-to-r from-white to-[#818cf8] bg-clip-text text-transparent">
            BookedAI
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-[#8b92a5]">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <div className="flex gap-1 ml-4">
            <button onClick={() => switchLang('en')} className={`px-2 py-1 rounded text-xs ${lang === 'en' ? 'text-[#6366f1] bg-[#6366f1]/10' : 'hover:text-white'}`}>EN</button>
            <button onClick={() => switchLang('vi')} className={`px-2 py-1 rounded text-xs ${lang === 'vi' ? 'text-[#6366f1] bg-[#6366f1]/10' : 'hover:text-white'}`}>VI</button>
            <button onClick={() => switchLang('zh')} className={`px-2 py-1 rounded text-xs ${lang === 'zh' ? 'text-[#6366f1] bg-[#6366f1]/10' : 'hover:text-white'}`}>ZH</button>
          </div>
        </div>
        <a
          href="https://book.longcare.au"
          className="hidden md:inline-flex px-5 py-2.5 bg-[#6366f1] hover:bg-[#818cf8] rounded-xl text-sm font-semibold transition-all hover:shadow-glow-primary"
        >
          Book Now
        </a>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-sm text-[#8b92a5]">
              <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
              AI Revenue Engine — Live
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Turn customer intent into{' '}
              <span className="bg-gradient-to-r from-[#6366f1] to-[#22d3ee] bg-clip-text text-transparent">
                revenue
              </span>
            </h1>
            <p className="text-lg text-[#cbd5e1] max-w-lg leading-relaxed">
              BookedAI is the intelligent platform that converts conversations into confirmed bookings,
              payments, and sustained growth — powered by AI, automated end-to-end.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setChatOpen(true)}
                className="px-8 py-4 bg-[#6366f1] hover:bg-[#818cf8] rounded-2xl font-semibold text-base transition-all hover:shadow-glow-primary hover:-translate-y-0.5"
              >
                Chat with AI
              </button>
              <a
                href="#how-it-works"
                className="px-8 py-4 border border-white/10 hover:border-white/20 rounded-2xl font-medium text-base text-center transition-all hover:bg-white/[0.03]"
              >
                See How It Works
              </a>
            </div>
            {/* Quick suggestions */}
            <div className="flex flex-wrap gap-2 pt-2">
              {SUGGESTIONS[lang].map((s) => (
                <button
                  key={s}
                  onClick={() => handleSuggestion(s)}
                  className="px-3 py-1.5 text-xs rounded-full border border-white/10 text-[#8b92a5] hover:border-[#22d3ee]/50 hover:text-[#22d3ee] transition-all bg-white/[0.02]"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Hero Chat Preview */}
          <div className="relative animate-slide-up">
            <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/20 to-[#22d3ee]/10 rounded-3xl blur-xl" />
            <div className="relative bg-[#0a0a1a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/[0.06]">
                <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
                <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
                <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
                <span className="ml-auto text-xs text-[#8b92a5]">AI Assistant</span>
              </div>
              <div className="space-y-3 max-h-[280px] overflow-y-auto">
                {messages.slice(-4).map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-[#6366f1] text-white rounded-br-md'
                          : 'bg-white/[0.06] border border-white/[0.08] rounded-bl-md'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-white/[0.06] border border-white/[0.08] rounded-2xl rounded-bl-md px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-[#8b92a5] rounded-full animate-bounce" />
                        <span className="w-2 h-2 bg-[#8b92a5] rounded-full animate-bounce [animation-delay:0.2s]" />
                        <span className="w-2 h-2 bg-[#8b92a5] rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setChatOpen(true)}
                  placeholder={PLACEHOLDERS[lang]}
                  className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6366f1]/50 transition-colors placeholder:text-[#8b92a5]"
                />
                <button
                  type="submit"
                  disabled={loading || !query.trim()}
                  className="px-5 py-3 bg-[#6366f1] hover:bg-[#818cf8] rounded-xl text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm"
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#6366f1] to-[#22d3ee] bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-[#8b92a5]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to{' '}
            <span className="bg-gradient-to-r from-[#6366f1] to-[#22d3ee] bg-clip-text text-transparent">
              automate revenue
            </span>
          </h2>
          <p className="text-[#8b92a5] text-lg max-w-2xl mx-auto">
            From first conversation to recurring revenue, BookedAI handles the entire customer journey with AI precision.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-[#6366f1]/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#6366f1]/10 flex items-center justify-center text-[#6366f1] group-hover:bg-[#6366f1]/20 transition-colors mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-[#8b92a5] leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Three steps to{' '}
            <span className="bg-gradient-to-r from-[#6366f1] to-[#22d3ee] bg-clip-text text-transparent">
              automated growth
            </span>
          </h2>
          <p className="text-[#8b92a5] text-lg max-w-2xl mx-auto">
            AI recommends, Truth Engine confirms, Payment proves, Analytics optimises.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map((step, i) => (
            <div key={step.number} className="relative">
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-[#6366f1]/30 to-transparent -translate-x-4" />
              )}
              <div className="p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] h-full">
                <span className="text-5xl font-bold text-[#6366f1]/20">{step.number}</span>
                <h3 className="text-xl font-semibold mt-4 mb-3">{step.title}</h3>
                <p className="text-[#8b92a5] leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Preview */}
      <section id="pricing" className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-[#8b92a5] text-lg max-w-2xl mx-auto">
            Start free. Scale as you grow. All prices include GST.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { name: 'Starter', price: 'Free', desc: 'For individuals getting started', features: ['AI Chat Assistant', 'Up to 5 bookings/month', 'Email notifications'] },
            { name: 'Pro', price: '$49/mo', desc: 'For growing professionals', features: ['Everything in Starter', 'Unlimited bookings', 'Learning Engine', 'Google Calendar sync', 'Priority support'], highlighted: true },
            { name: 'Business', price: '$149/mo', desc: 'For teams and enterprises', features: ['Everything in Pro', 'Marketing AI (8 channels)', 'Custom branding', 'API access', 'Dedicated support'] },
          ].map((plan) => (
            <div
              key={plan.name}
              className={`p-8 rounded-2xl border h-full flex flex-col ${
                plan.highlighted
                  ? 'border-[#6366f1]/40 bg-[#6366f1]/5 shadow-glow-primary'
                  : 'border-white/[0.06] bg-white/[0.02]'
              }`}
            >
              {plan.highlighted && (
                <span className="inline-block w-fit px-3 py-1 text-xs font-medium bg-[#6366f1]/20 text-[#818cf8] rounded-full mb-4">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <div className="mt-2 mb-1">
                <span className="text-3xl font-bold">{plan.price}</span>
              </div>
              <p className="text-sm text-[#8b92a5] mb-6">{plan.desc}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-[#cbd5e1]">
                    <svg className="w-4 h-4 text-[#22d3ee] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="https://book.longcare.au"
                className={`block text-center px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                  plan.highlighted
                    ? 'bg-[#6366f1] hover:bg-[#818cf8] text-white hover:shadow-glow-primary'
                    : 'border border-white/10 hover:border-white/20 text-white hover:bg-white/[0.04]'
                }`}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.06] mt-24">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#6366f1]/40 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#22d3ee] flex items-center justify-center">
                  <span className="text-white font-bold text-sm">B</span>
                </div>
                <span className="text-lg font-bold">BookedAI</span>
              </div>
              <p className="text-sm text-[#8b92a5] max-w-sm leading-relaxed">
                Turn customer intent into revenue — automatically. The AI-powered platform for service businesses in Australia.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 uppercase tracking-wide">Platform</h4>
              <ul className="space-y-3 text-sm text-[#8b92a5]">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="https://longcare.au" className="hover:text-white transition-colors">Longcare</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 uppercase tracking-wide">Legal</h4>
              <ul className="space-y-3 text-sm text-[#8b92a5]">
                <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#8b92a5]">
              &copy; {new Date().getFullYear()} BookedAI. All rights reserved. ABN registered in Australia.
            </p>
            <div className="flex gap-4 text-xs text-[#8b92a5]">
              <span>Melbourne, Australia</span>
              <span>|</span>
              <span>support@bookedai.au</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Chat Button (mobile) */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="md:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#6366f1] rounded-full flex items-center justify-center shadow-glow-primary hover:bg-[#818cf8] transition-all"
          aria-label="Open chat"
        >
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}
    </div>
  );
}
