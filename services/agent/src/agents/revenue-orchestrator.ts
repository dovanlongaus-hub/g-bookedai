import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_PROMPT = `You are the bookedai.au AI Revenue Engine Orchestrator for Longcare AU.
Your mission is to convert customer intent into real revenue while protecting truth and trust.

About Longcare AU:
- AI-powered mentoring sessions and learning programs
- Based in Australia, serving individuals and SMEs
- Website: longcare.au | Booking: book.longcare.au

Rules:
1. Never claim a booking is confirmed unless the Booking Truth Engine confirms it.
2. Always push toward a clear CTA: book, pay, continue learning, or contact support.
3. If unsure, ask a short clarifying question.
4. Respond in the user's language (English, Vietnamese, or Chinese).

Available services (AUD):
- 30-min AI Starter Session — $29 (intro to AI tools)
- 1-hour AI Mentor — $99 (deep-dive personalized mentoring)
- 5-Session Package — $450 (structured learning path)
- 10-Session Package — $850 (comprehensive mastery)
- AI Business Transformation Program — $1,500-$3,000+ (premium B2B)
- Single Lesson — $19-$29
- Module of 5 Lessons — $79-$149

Payment methods: Credit card (Stripe) or Australian bank transfer (PayID/BSB).
Sessions are conducted via Google Meet with AI-generated notes after each session.

Be helpful, concise, and always guide users toward booking at book.longcare.au.`;

// Chat history per session
const sessionHistory = new Map<string, { role: 'user' | 'assistant'; content: string }[]>();

export async function revenueOrchestrator(message: string, sessionId?: string, language?: string) {
  const sid = sessionId || 'default';

  // Get or create session history
  if (!sessionHistory.has(sid)) {
    sessionHistory.set(sid, []);
  }
  const history = sessionHistory.get(sid)!;
  history.push({ role: 'user', content: message });

  // Keep last 20 messages to avoid token limits
  if (history.length > 20) {
    history.splice(0, history.length - 20);
  }

  const langInstruction = language === 'vi'
    ? '\n\nRespond in Vietnamese.'
    : language === 'zh'
      ? '\n\nRespond in Chinese Simplified.'
      : '';

  try {
    let reply: string;

    // Try OpenAI first, then Gemini as fallback
    const openaiKey = process.env.OPENAI_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;

    if (openaiKey) {
      reply = await callOpenAI(openaiKey, history, langInstruction);
    } else if (geminiKey) {
      reply = await callGemini(geminiKey, history, langInstruction);
    } else {
      // No API key — return smart fallback based on message content
      reply = generateFallbackReply(message, language);
    }

    history.push({ role: 'assistant', content: reply });

    return { reply, actions: extractActions(reply) };
  } catch (err) {
    console.error('Orchestrator error:', err);
    const errorReply = language === 'vi'
      ? 'Xin lỗi, hệ thống đang bận. Vui lòng thử lại hoặc liên hệ ceo@longcare.au.'
      : language === 'zh'
        ? '抱歉，系统繁忙。请重试或联系 ceo@longcare.au。'
        : 'Sorry, the system is busy. Please try again or contact ceo@longcare.au.';

    return { reply: errorReply, actions: [] };
  }
}

async function callOpenAI(
  apiKey: string,
  history: { role: 'user' | 'assistant'; content: string }[],
  langInstruction: string,
): Promise<string> {
  const openai = new OpenAI({ apiKey });

  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT + langInstruction },
      ...history,
    ],
    max_tokens: 1000,
    temperature: 0.7,
  });

  return response.choices[0]?.message?.content || 'I apologize, I could not generate a response.';
}

async function callGemini(
  apiKey: string,
  history: { role: 'user' | 'assistant'; content: string }[],
  langInstruction: string,
): Promise<string> {
  const genAI = new GoogleGenerativeAI(apiKey);
  const modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
  const model = genAI.getGenerativeModel({ model: modelName });

  const contents = [
    { role: 'user' as const, parts: [{ text: SYSTEM_PROMPT + langInstruction }] },
    { role: 'model' as const, parts: [{ text: 'Understood. I am ready to help.' }] },
    ...history.map((m) => ({
      role: (m.role === 'user' ? 'user' : 'model') as 'user' | 'model',
      parts: [{ text: m.content }],
    })),
  ];

  const result = await model.generateContent({ contents });
  return result.response.text();
}

function generateFallbackReply(message: string, language?: string): string {
  const lower = message.toLowerCase();

  if (language === 'vi') {
    if (lower.includes('giá') || lower.includes('bảng giá') || lower.includes('pricing')) {
      return 'Longcare có các gói dịch vụ:\n\n• 30 phút AI Starter — $29 AUD\n• 1 giờ AI Mentor — $99 AUD\n• Gói 5 buổi — $450 AUD\n• Gói 10 buổi — $850 AUD\n\nBạn muốn đặt lịch buổi nào? Truy cập book.longcare.au để đặt ngay!';
    }
    if (lower.includes('đặt') || lower.includes('book')) {
      return 'Để đặt lịch mentoring AI, bạn có thể:\n\n1. Truy cập book.longcare.au\n2. Chọn dịch vụ phù hợp\n3. Chọn thời gian\n4. Thanh toán bằng thẻ hoặc chuyển khoản\n\nBuổi học sẽ diễn ra qua Google Meet. Bạn muốn bắt đầu với buổi 30 phút ($29)?';
    }
    return 'Xin chào! Tôi là trợ lý AI của Longcare AU. Tôi có thể giúp bạn:\n\n• Tìm hiểu dịch vụ mentoring AI\n• Đặt lịch học\n• Xem bảng giá\n\nBạn muốn bắt đầu với gì?';
  }

  if (language === 'zh') {
    if (lower.includes('价') || lower.includes('pricing')) {
      return 'Longcare 服务价格：\n\n• 30分钟 AI入门 — $29 AUD\n• 1小时 AI导师 — $99 AUD\n• 5次课程包 — $450 AUD\n• 10次课程包 — $850 AUD\n\n访问 book.longcare.au 立即预约！';
    }
    return '您好！我是 Longcare AU 的 AI 助手。我可以帮您：\n\n• 了解 AI 辅导服务\n• 预约课程\n• 查看价格\n\n您想了解什么？';
  }

  // English
  if (lower.includes('price') || lower.includes('cost') || lower.includes('pricing')) {
    return 'Here are our mentoring services:\n\n• 30-min AI Starter — $29 AUD\n• 1-hour AI Mentor — $99 AUD (most popular)\n• 5-Session Package — $450 AUD\n• 10-Session Package — $850 AUD\n• Business Transformation — $1,500+ AUD\n\nReady to book? Visit book.longcare.au or I can help you choose the right service!';
  }
  if (lower.includes('book') || lower.includes('session') || lower.includes('schedule')) {
    return 'Great! To book a session:\n\n1. Visit book.longcare.au\n2. Choose your service\n3. Select a time slot\n4. Pay with card or bank transfer\n\nYour session will be on Google Meet, and you\'ll get AI-generated notes afterward. Would you like to start with our $29 Starter Session?';
  }
  if (lower.includes('mentor') || lower.includes('learn') || lower.includes('ai')) {
    return 'Longcare AU offers personalized AI mentoring:\n\n• **AI Starter** ($29) — Quick intro to AI tools\n• **AI Mentor** ($99) — Deep-dive personalized session\n• **Packages** ($450-$850) — Structured learning paths\n\nEach session includes Google Meet + AI-generated notes + next steps. What are you looking to learn?';
  }

  return 'Hello! I\'m the Longcare AI assistant. I can help you with:\n\n• Finding the right AI mentoring service\n• Booking a session\n• Pricing information\n• Learning about our programs\n\nWhat would you like to know?';
}

function extractActions(reply: string): { type: string; label: string; action: string }[] {
  const actions: { type: string; label: string; action: string }[] = [];
  if (reply.toLowerCase().includes('book.longcare.au')) {
    actions.push({ type: 'link', label: 'Book Now', action: 'https://book.longcare.au' });
  }
  if (reply.toLowerCase().includes('$29') || reply.toLowerCase().includes('starter')) {
    actions.push({ type: 'suggest', label: 'Book $29 Starter', action: '/booking?service=starter-30min' });
  }
  return actions;
}
