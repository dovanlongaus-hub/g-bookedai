'use client';

import { useState, useRef, useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const WELCOME_MESSAGES: Record<string, string> = {
  en: "Hi! I'm Longcare's AI assistant. I can help you with booking, pricing, or any questions about our AI mentoring services. How can I help?",
  vi: "Xin chào! Tôi là trợ lý AI của Longcare. Tôi có thể giúp bạn đặt lịch, xem giá, hoặc trả lời câu hỏi về dịch vụ mentoring AI. Bạn cần gì?",
};

const SR_ONLY: React.CSSProperties = {
  position: 'absolute', width: 1, height: 1, padding: 0, margin: -1,
  overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap', border: 0,
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState('en');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  // Track when the chat was opened so we can report duration on close.
  const openedAtRef = useRef<number | null>(null);

  // Detect language from browser
  useEffect(() => {
    const browserLang = navigator.language?.toLowerCase() || '';
    if (browserLang.startsWith('vi')) setLang('vi');
  }, []);

  // Initialize welcome message when opened + move focus into the panel
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: 'assistant', content: WELCOME_MESSAGES[lang] || WELCOME_MESSAGES.en }]);
    }
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  // Escape closes the panel; focus returns to the launcher.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

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
    trackEvent('chat_message', { role: 'user', length: userMsg.length });

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
      trackEvent('chat_message', { role: 'assistant', length: reply.length });
    } catch {
      const fallback = lang === 'vi' ? 'Xin lỗi, vui lòng thử lại.' : 'Sorry, please try again.';
      setMessages(prev => [...prev, { role: 'assistant', content: fallback }]);
      trackEvent('chat_message', { role: 'assistant', length: fallback.length });
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    const duration_s = openedAtRef.current
      ? Math.max(0, Math.round((Date.now() - openedAtRef.current) / 1000))
      : undefined;
    openedAtRef.current = null;
    trackEvent('chat_close', { duration_s });
    setOpen(false);
    // Return focus to the launcher for keyboard users.
    setTimeout(() => launcherRef.current?.focus(), 0);
  }

  if (!open) {
    return (
      <button
        ref={launcherRef}
        onClick={() => {
          setOpen(true);
          openedAtRef.current = Date.now();
          trackEvent('chat_open', { trigger: 'manual' });
        }}
        aria-label="Open the Longcare AI chat"
        aria-haspopup="dialog"
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
          width: 60, height: 60, borderRadius: '50%',
          background: '#1d4ed8',
          border: 'none', cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(29, 78, 216, 0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.1)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#ffffff" aria-hidden="true" focusable="false">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-3 12H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1zm0-3H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1zm0-3H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1z"/>
        </svg>
      </button>
    );
  }

  return (
    <div
      role="dialog"
      aria-label="Longcare AI chat"
      style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
        width: 380, maxWidth: 'calc(100vw - 32px)', height: 520, maxHeight: 'calc(100vh - 48px)',
        background: '#ffffff', border: '1px solid #e2e8f0',
        borderRadius: 16, display: 'flex', flexDirection: 'column',
        boxShadow: '0 8px 40px rgba(0,0,0,0.1)',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{
        padding: '12px 16px', background: '#f8fafc',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} aria-hidden="true" />
          <span style={{ fontWeight: 600, color: '#334155', fontSize: '0.9rem' }}>Longcare AI</span>
          <span style={{ color: '#64748b', fontSize: '0.75rem' }}>Online</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
            aria-label={lang === 'vi' ? 'Switch chat to English' : 'Chuyển chat sang tiếng Việt'}
            style={{ background: 'none', border: '1px solid #e2e8f0', color: '#475569', padding: '2px 8px', borderRadius: 12, fontSize: '0.7rem', cursor: 'pointer' }}
          >
            {lang === 'vi' ? 'EN' : 'VI'}
          </button>
          <button
            onClick={handleClose}
            aria-label="Close chat"
            style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '1.2rem', lineHeight: 1, padding: '0 4px' }}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        role="log"
        aria-live="polite"
        aria-label="Chat messages"
        style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }}
      >
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: 10 }}>
            <div style={{
              maxWidth: '85%', padding: '10px 14px', borderRadius: 12,
              fontSize: '0.85rem', lineHeight: 1.5, whiteSpace: 'pre-wrap',
              ...(msg.role === 'user'
                ? { background: '#1d4ed8', color: '#fff', borderBottomRightRadius: 4 }
                : { background: '#f1f5f9', color: '#334155', borderBottomLeftRadius: 4 }),
            }}>
              <span style={SR_ONLY}>{msg.role === 'user' ? 'You said: ' : 'Assistant said: '}</span>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 10 }}>
            <div style={{ background: '#f1f5f9', padding: '10px 14px', borderRadius: 12, display: 'flex', gap: 4 }}>
              <span style={SR_ONLY}>Assistant is typing…</span>
              <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: '50%', background: '#94a3b8', animation: 'lc-chat-pulse 1s infinite' }} />
              <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: '50%', background: '#94a3b8', animation: 'lc-chat-pulse 1s infinite 0.2s' }} />
              <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: '50%', background: '#94a3b8', animation: 'lc-chat-pulse 1s infinite 0.4s' }} />
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
            <button key={s} onClick={() => { setInput(s); inputRef.current?.focus(); }} style={{
              background: '#f8fafc', border: '1px solid #e2e8f0',
              color: '#475569', padding: '4px 10px', borderRadius: 16, fontSize: '0.75rem', cursor: 'pointer',
            }}>{s}</button>
          ))}
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSend} style={{
        padding: '10px 12px', borderTop: '1px solid #e2e8f0',
        display: 'flex', gap: 8,
      }}>
        <label htmlFor="lc-chat-input" style={SR_ONLY}>{lang === 'vi' ? 'Tin nhắn của bạn' : 'Your message'}</label>
        <input
          id="lc-chat-input"
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={lang === 'vi' ? 'Nhập tin nhắn...' : 'Type a message...'}
          style={{
            flex: 1, background: '#ffffff', border: '1px solid #e2e8f0',
            borderRadius: 8, padding: '8px 12px', color: '#334155', fontSize: '0.85rem', outline: 'none',
          }}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          style={{
            background: '#1d4ed8', border: 'none', borderRadius: 8,
            padding: '8px 16px', color: '#fff', fontWeight: 600, fontSize: '0.85rem',
            cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
            opacity: loading || !input.trim() ? 0.5 : 1,
          }}
        >
          {lang === 'vi' ? 'Gửi' : 'Send'}
        </button>
      </form>

      <style>{`
        @keyframes lc-chat-pulse {
          0%, 100% { opacity: 0.4; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes lc-chat-pulse { 0%, 100% { opacity: 0.7; transform: none; } }
        }
      `}</style>
    </div>
  );
}
