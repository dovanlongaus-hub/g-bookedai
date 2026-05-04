'use client';

import { useState, useRef, useEffect } from 'react';

type Language = 'en' | 'vi' | 'zh';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const WELCOME: Record<Language, string> = {
  en: "Hello! I'm the bookedai.au assistant. I can help you find AI mentoring services, book sessions, or answer questions about our programs. What can I help you with?",
  vi: "Xin chào! Tôi là trợ lý bookedai.au. Tôi có thể giúp bạn tìm dịch vụ mentoring AI, đặt lịch, hoặc trả lời câu hỏi. Tôi có thể giúp gì cho bạn?",
  zh: "你好！我是bookedai.au助手。我可以帮您找到AI辅导服务、预约课程或回答问题。有什么可以帮您的？",
};

const SUGGESTIONS: Record<Language, string[]> = {
  en: ['View services', 'Book a session', 'Tell me about AI mentoring', 'Pricing'],
  vi: ['Xem dịch vụ', 'Đặt lịch', 'Về mentoring AI', 'Bảng giá'],
  zh: ['查看服务', '预约课程', '关于AI辅导', '价格'],
};

const PLACEHOLDERS: Record<Language, string> = {
  en: 'Ask me anything about our services...',
  vi: 'Hỏi tôi bất cứ điều gì...',
  zh: '问我关于我们服务的任何问题...',
};

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
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, something went wrong.' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white text-[#0f2942]" style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-12 py-4">
          <a href="/" className="flex items-center gap-3">
            <img src="/logo-icon.svg" alt="" className="h-9 w-9" />
            <span className="text-xl font-extrabold tracking-tight">
              <span className="text-[#0f2942]">bookedai</span>
              <span className="text-[#0d9488]">.au</span>
            </span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#627d98]">
            <a href="#features" className="hover:text-[#0f2942] transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-[#0f2942] transition-colors">How It Works</a>
            <a href="#pricing" className="hover:text-[#0f2942] transition-colors">Pricing</a>
            <div className="flex gap-1 ml-2 border border-gray-200 rounded-lg overflow-hidden">
              {(['en', 'vi', 'zh'] as Language[]).map((l) => (
                <button key={l} onClick={() => switchLang(l)}
                  className={`px-2.5 py-1 text-xs font-semibold uppercase ${lang === l ? 'bg-[#0d9488] text-white' : 'text-[#627d98] hover:bg-gray-50'}`}>
                  {l}
                </button>
              ))}
            </div>
          </div>
          <a href="https://booking.g.bookedai.au" className="hidden md:inline-flex px-5 py-2.5 bg-[#0d9488] hover:bg-[#0f766e] text-white rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg">
            Book a Session
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f0fdfa] via-white to-[#f0f4f8]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0d9488]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#2dd4bf]/5 rounded-full blur-[80px]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-24 lg:pt-24 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f0fdfa] border border-[#99f6e4] text-sm font-medium text-[#0d9488]">
                <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                The AI Revenue Engine
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] tracking-tight">
                Turn customer intent into{' '}
                <span className="bg-gradient-to-r from-[#0d9488] to-[#2dd4bf] bg-clip-text text-transparent">
                  revenue
                </span>
                {' '}— automatically
              </h1>
              <p className="text-lg text-[#627d98] max-w-lg leading-relaxed">
                bookedai.au is the intelligent platform that converts conversations into confirmed bookings,
                payments, and sustained growth — powered by AI, automated end-to-end.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => setChatOpen(true)}
                  className="px-8 py-4 bg-gradient-to-r from-[#0d9488] to-[#14b8a6] hover:from-[#0f766e] hover:to-[#0d9488] text-white rounded-2xl font-semibold text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                  Chat with AI Assistant
                </button>
                <a href="#how-it-works"
                  className="px-8 py-4 border-2 border-[#d9e2ec] hover:border-[#0d9488] text-[#334e68] rounded-2xl font-semibold text-base text-center transition-all hover:text-[#0d9488]">
                  See How It Works
                </a>
              </div>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS[lang].map((s) => (
                  <button key={s} onClick={() => { setQuery(s); setChatOpen(true); }}
                    className="px-3 py-1.5 text-xs rounded-full border border-[#d9e2ec] text-[#627d98] hover:border-[#0d9488] hover:text-[#0d9488] transition-all bg-white">
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Preview */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#0d9488]/10 to-[#2dd4bf]/10 rounded-3xl blur-2xl" />
              <div className="relative bg-white border border-gray-200 rounded-3xl p-6 shadow-2xl shadow-[#0d9488]/10">
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
                  <img src="/logo-icon.svg" alt="" className="w-6 h-6" />
                  <span className="text-sm font-semibold text-[#0f2942]">bookedai.au</span>
                  <span className="ml-auto text-xs text-[#627d98] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />Online
                  </span>
                </div>
                <div className="space-y-3 max-h-[280px] overflow-y-auto">
                  {messages.slice(-4).map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-[#0d9488] text-white rounded-br-md'
                          : 'bg-[#f0fdfa] text-[#0f2942] border border-[#ccfbf1] rounded-bl-md'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="bg-[#f0fdfa] border border-[#ccfbf1] rounded-2xl rounded-bl-md px-4 py-3">
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
                <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
                  <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} onFocus={() => setChatOpen(true)}
                    placeholder={PLACEHOLDERS[lang]}
                    className="flex-1 bg-[#f8fafb] border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0d9488] focus:ring-2 focus:ring-[#0d9488]/10 transition-all placeholder:text-[#9fb3c8]" />
                  <button type="submit" disabled={loading || !query.trim()}
                    className="px-5 py-3 bg-[#0d9488] hover:bg-[#0f766e] text-white rounded-xl text-sm font-semibold transition-all disabled:opacity-40">
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#0f2942] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '95%', label: 'Booking Conversion' },
              { value: '<3s', label: 'AI Response Time' },
              { value: '24/7', label: 'Always Available' },
              { value: '3x', label: 'Revenue Growth' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#2dd4bf] to-[#4ade80] bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-[#9fb3c8]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-[#f8fafb]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-[#0f2942]">
              Everything you need to{' '}
              <span className="bg-gradient-to-r from-[#0d9488] to-[#2dd4bf] bg-clip-text text-transparent">grow revenue</span>
            </h2>
            <p className="text-[#627d98] text-lg max-w-2xl mx-auto">
              From first conversation to recurring revenue, bookedai.au handles the entire customer journey with AI precision.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: '💬', title: 'AI Chat Assistant', desc: 'Natural conversations that understand intent, recommend services, and guide customers to booking — in English, Vietnamese, and Chinese.' },
              { icon: '📅', title: 'Smart Booking Engine', desc: 'Real-time availability, automated 10-minute holds, Stripe payments, and Google Calendar + Meet integration.' },
              { icon: '🧠', title: 'Learning Engine', desc: 'AI-generated session summaries, progress tracking, Google Docs notes, and personalised next-step recommendations.' },
              { icon: '📈', title: 'Marketing AI', desc: '8-channel content generation with UTM tracking, approval workflows, and revenue attribution powered by Gemini.' },
            ].map((f) => (
              <div key={f.title} className="group p-8 bg-white rounded-2xl border border-gray-100 hover:border-[#0d9488]/30 hover:shadow-xl hover:shadow-[#0d9488]/5 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#f0fdfa] to-[#ccfbf1] flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#0f2942]">{f.title}</h3>
                <p className="text-[#627d98] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Three steps to <span className="bg-gradient-to-r from-[#0d9488] to-[#2dd4bf] bg-clip-text text-transparent">automated growth</span>
            </h2>
            <p className="text-[#627d98] text-lg max-w-2xl mx-auto">
              AI recommends, Truth Engine confirms, Payment proves, Analytics optimises.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: '01', title: 'Customer Chats', desc: 'AI understands intent and recommends the perfect service match for your customer.', color: 'from-[#0d9488] to-[#14b8a6]' },
              { n: '02', title: 'Instant Booking', desc: 'Seamless payment, calendar sync, and Google Meet link — all created automatically.', color: 'from-[#14b8a6] to-[#2dd4bf]' },
              { n: '03', title: 'Revenue Grows', desc: 'Learning engine re-engages, marketing AI attracts new clients, revenue compounds.', color: 'from-[#2dd4bf] to-[#4ade80]' },
            ].map((step, i) => (
              <div key={step.n} className="relative">
                {i < 2 && <div className="hidden md:block absolute top-14 left-full w-full h-0.5 bg-gradient-to-r from-[#0d9488]/20 to-transparent -translate-x-6 z-0" />}
                <div className="relative bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-extrabold text-lg mb-5`}>
                    {step.n}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-[#627d98] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-[#f8fafb]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Simple, transparent pricing</h2>
            <p className="text-[#627d98] text-lg max-w-2xl mx-auto">Start with a free session. Scale as you grow. All prices include GST.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { name: 'AI Starter', price: '$29', period: 'per session', desc: '30-minute intro session', features: ['AI Chat Assistant', '1-on-1 with AI Mentor', 'Session summary + notes', 'Google Meet link'], highlighted: false },
              { name: 'AI Mentor', price: '$99', period: 'per session', desc: '1-hour deep dive session', features: ['Everything in Starter', '60-min session', 'Learning path recommendations', 'Google Docs lesson notes', 'Priority scheduling'], highlighted: true },
              { name: '5-Session Package', price: '$450', period: 'package', desc: 'Serious growth commitment', features: ['Everything in AI Mentor', '5 x 1-hour sessions', 'Progress dashboard', 'Marketing AI access', 'Dedicated support'], highlighted: false },
            ].map((plan) => (
              <div key={plan.name} className={`p-8 rounded-2xl border h-full flex flex-col bg-white ${
                plan.highlighted ? 'border-[#0d9488] shadow-xl shadow-[#0d9488]/10 ring-2 ring-[#0d9488]/20 relative' : 'border-gray-200'
              }`}>
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-bold bg-gradient-to-r from-[#0d9488] to-[#2dd4bf] text-white rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-[#0f2942]">{plan.name}</h3>
                <div className="mt-3 mb-1">
                  <span className="text-4xl font-extrabold text-[#0f2942]">{plan.price}</span>
                  <span className="text-sm text-[#627d98] ml-2">{plan.period}</span>
                </div>
                <p className="text-sm text-[#627d98] mb-6">{plan.desc}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[#334e68]">
                      <svg className="w-4 h-4 text-[#0d9488] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="https://booking.g.bookedai.au"
                  className={`block text-center px-6 py-3.5 rounded-xl font-semibold text-sm transition-all ${
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

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#0f2942] to-[#1a3a5c]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
            Ready to turn intent into revenue?
          </h2>
          <p className="text-lg text-[#9fb3c8] mb-10 max-w-2xl mx-auto">
            Join Australian businesses using bookedai.au to automate their booking, payment, and growth — powered by AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://booking.g.bookedai.au"
              className="px-10 py-4 bg-gradient-to-r from-[#0d9488] to-[#2dd4bf] text-white rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-[#0d9488]/30 transition-all hover:-translate-y-1">
              Book Your First Session
            </a>
            <button onClick={() => setChatOpen(true)}
              className="px-10 py-4 border-2 border-white/20 text-white rounded-2xl font-semibold text-lg hover:border-[#2dd4bf] hover:text-[#2dd4bf] transition-all">
              Chat with AI
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#091e33] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img src="/logo-icon.svg" alt="" className="w-8 h-8" />
                <span className="text-lg font-extrabold">bookedai<span className="text-[#2dd4bf]">.au</span></span>
              </div>
              <p className="text-sm text-[#829ab1] max-w-sm leading-relaxed">
                The AI Revenue Engine — turn customer intent into revenue, automatically. Built for Australian service businesses.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider text-[#627d98]">Platform</h4>
              <ul className="space-y-3 text-sm text-[#829ab1]">
                <li><a href="#features" className="hover:text-[#2dd4bf] transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-[#2dd4bf] transition-colors">Pricing</a></li>
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

      {/* Floating Chat (mobile) */}
      {!chatOpen && (
        <button onClick={() => setChatOpen(true)} aria-label="Open chat"
          className="md:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-[#0d9488] to-[#14b8a6] rounded-full flex items-center justify-center shadow-xl shadow-[#0d9488]/30 hover:shadow-2xl transition-all">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}
    </div>
  );
}
