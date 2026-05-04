'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const WELCOME_MESSAGES: Record<string, string> = {
  en: "Hi! I'm Longcare's AI assistant. I can help you with booking, pricing, or any questions about our AI mentoring services. How can I help?",
  vi: "Xin chào! Tôi là trợ lý AI của Longcare. Tôi có thể giúp bạn đặt lịch, xem giá, hoặc trả lời câu hỏi về dịch vụ mentoring AI. Bạn cần gì?",
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState('en');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Detect language from browser
  useEffect(() => {
    const browserLang = navigator.language?.toLowerCase() || '';
    if (browserLang.startsWith('vi')) setLang('vi');
  }, []);

  // Initialize welcome message when opened
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: 'assistant', content: WELCOME_MESSAGES[lang] || WELCOME_MESSAGES.en }]);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      // Call the bookedai chat API via nginx proxy
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, language: lang }),
      });
      const data = await res.json();
      const reply = data?.data?.reply || data?.reply || 'Sorry, please try again.';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: lang === 'vi' ? 'Xin lỗi, vui lòng thử lại.' : 'Sorry, please try again.' }]);
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        aria-label="Chat with AI"
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
          width: 60, height: 60, borderRadius: '50%',
          background: 'linear-gradient(135deg, #66fcf1, #45a29e)',
          border: 'none', cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(102, 252, 241, 0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => { (e.target as HTMLElement).style.transform = 'scale(1.1)'; }}
        onMouseLeave={e => { (e.target as HTMLElement).style.transform = 'scale(1)'; }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#0b0c10">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-3 12H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1zm0-3H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1zm0-3H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1z"/>
        </svg>
      </button>
    );
  }

  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
      width: 380, maxWidth: 'calc(100vw - 32px)', height: 520, maxHeight: 'calc(100vh - 48px)',
      background: '#0b0c10', border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 16, display: 'flex', flexDirection: 'column',
      boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '12px 16px', background: 'linear-gradient(135deg, rgba(102,252,241,0.15), rgba(69,162,158,0.1))',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} />
          <span style={{ fontWeight: 600, color: '#fff', fontSize: '0.9rem' }}>Longcare AI</span>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem' }}>Online</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '2px 8px', borderRadius: 12, fontSize: '0.7rem', cursor: 'pointer' }}>
            {lang === 'vi' ? 'EN' : 'VI'}
          </button>
          <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '1.2rem', lineHeight: 1 }}>×</button>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: 10 }}>
            <div style={{
              maxWidth: '85%', padding: '10px 14px', borderRadius: 12,
              fontSize: '0.85rem', lineHeight: 1.5, whiteSpace: 'pre-wrap',
              ...(msg.role === 'user'
                ? { background: '#45a29e', color: '#fff', borderBottomRightRadius: 4 }
                : { background: 'rgba(255,255,255,0.06)', color: '#e0e0e0', borderBottomLeftRadius: 4 }),
            }}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 10 }}>
            <div style={{ background: 'rgba(255,255,255,0.06)', padding: '10px 14px', borderRadius: 12, display: 'flex', gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.4)', animation: 'pulse 1s infinite' }} />
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.4)', animation: 'pulse 1s infinite 0.2s' }} />
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.4)', animation: 'pulse 1s infinite 0.4s' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick actions */}
      {messages.length <= 1 && (
        <div style={{ padding: '0 16px 8px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {(lang === 'vi'
            ? ['Xem dịch vụ', 'Đặt lịch', 'Bảng giá']
            : ['View services', 'Book a session', 'Pricing']
          ).map(s => (
            <button key={s} onClick={() => setInput(s)} style={{
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
              color: '#aaa', padding: '4px 10px', borderRadius: 16, fontSize: '0.75rem', cursor: 'pointer',
            }}>{s}</button>
          ))}
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSend} style={{
        padding: '10px 12px', borderTop: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', gap: 8,
      }}>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={lang === 'vi' ? 'Nhập tin nhắn...' : 'Type a message...'}
          style={{
            flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8, padding: '8px 12px', color: '#fff', fontSize: '0.85rem', outline: 'none',
          }}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          style={{
            background: '#45a29e', border: 'none', borderRadius: 8,
            padding: '8px 16px', color: '#fff', fontWeight: 600, fontSize: '0.85rem',
            cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
            opacity: loading || !input.trim() ? 0.5 : 1,
          }}
        >
          {lang === 'vi' ? 'Gửi' : 'Send'}
        </button>
      </form>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
