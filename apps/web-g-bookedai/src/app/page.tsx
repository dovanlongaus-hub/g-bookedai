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

export default function Home() {
  const [lang, setLang] = useState<Language>('en');
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: WELCOME.en },
  ]);
  const [loading, setLoading] = useState(false);
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
      // Use local API proxy to avoid CORS/mixed-content issues
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
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <img src="/logo.svg" alt="BookedAI" style={{ height: 36, marginBottom: '0.5rem' }} />
        <h1>bookedai.au</h1>
        <p>{lang === 'vi' ? 'Chuyển đổi ý định thành doanh thu' : lang === 'zh' ? '将意向转化为收入' : 'Turn customer intent into revenue'}</p>
        <div className="lang-switcher">
          <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => switchLang('en')}>EN</button>
          <button className={`lang-btn ${lang === 'vi' ? 'active' : ''}`} onClick={() => switchLang('vi')}>VI</button>
          <button className={`lang-btn ${lang === 'zh' ? 'active' : ''}`} onClick={() => switchLang('zh')}>ZH</button>
        </div>
      </div>

      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.role}`}>
            <div>
              <div className="message-label">{msg.role === 'user' ? (lang === 'vi' ? 'Bạn' : lang === 'zh' ? '您' : 'You') : 'AI'}</div>
              <div className="message-bubble">{msg.content}</div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="message assistant">
            <div>
              <div className="message-label">AI</div>
              <div className="message-bubble">
                <div className="typing"><span /><span /><span /></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {messages.length <= 1 && (
        <div className="suggestions">
          {SUGGESTIONS[lang].map((s) => (
            <button key={s} className="suggestion" onClick={() => handleSuggestion(s)}>{s}</button>
          ))}
        </div>
      )}

      <div className="chat-input-container">
        <form onSubmit={handleSubmit} className="chat-input-form">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={PLACEHOLDERS[lang]}
            className="chat-input"
          />
          <button type="submit" disabled={loading || !query.trim()} className="chat-send">
            {lang === 'vi' ? 'Gửi' : lang === 'zh' ? '发送' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}
