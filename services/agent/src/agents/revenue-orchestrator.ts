import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { classifyIntent } from './intent-classifier.js';
import { tools } from './tools.js';

const SYSTEM_PROMPT = `You are the bookedai.au AI Revenue Engine Orchestrator for Longcare AU.
Your mission is to convert customer intent into real revenue while protecting truth and trust.

About Longcare AU:
- AI-powered mentoring sessions and learning programs
- Based in Australia, serving individuals and SMEs
- Website: longcare.au | Booking: booking.g.bookedai.au

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

Be helpful, concise, and always guide users toward booking at booking.g.bookedai.au.`;

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

  // Classify intent for smart routing
  const intent = classifyIntent(message);
  console.log(`Intent: ${intent.intent} (${intent.confidence}) entities:`, intent.entities);

  const langInstruction = language === 'vi'
    ? '\n\nRespond in Vietnamese.'
    : language === 'zh'
      ? '\n\nRespond in Chinese Simplified.'
      : '';

  try {
    let reply: string;

    // Try OpenAI first (env key or OAuth token), then Gemini as fallback
    const { getOpenAIToken } = await import('../auth/openai-device-auth.js');
    const openaiKey = await getOpenAIToken();
    const geminiKey = process.env.GEMINI_API_KEY;

    if (openaiKey) {
      try {
        reply = await callOpenAI(openaiKey, history, langInstruction);
      } catch {
        reply = await generateFallbackReply(message, language);
      }
    } else if (geminiKey) {
      try {
        reply = await callGemini(geminiKey, history, langInstruction);
      } catch {
        reply = await generateFallbackReply(message, language);
      }
    } else {
      reply = await generateFallbackReply(message, language);
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

async function generateFallbackReply(message: string, language?: string): Promise<string> {
  const lower = message.toLowerCase();

  // Use tools for dynamic responses
  if (lower.includes('service') || lower.includes('what do you offer')) {
    const result = await tools.searchServices();
    if (result.success && result.data.length > 0) {
      const formatted = tools.formatServicesForChat(result.data);
      const bookLink = tools.generateBookingLink();
      return language === 'vi'
        ? `Các dịch vụ mentoring AI của chúng tôi:\n\n${formatted}\n\nĐặt lịch: ${bookLink}`
        : `Here are our AI mentoring services:\n\n${formatted}\n\nBook now: ${bookLink}`;
    }
  }

  if (language === 'vi') {
    if (lower.includes('giá') || lower.includes('bảng giá') || lower.includes('pricing')) {
      return 'Longcare có các gói dịch vụ:\n\n• 30 phút AI Starter — $29 AUD\n• 1 giờ AI Mentor — $99 AUD\n• Gói 5 buổi — $450 AUD\n• Gói 10 buổi — $850 AUD\n\nBạn muốn đặt lịch buổi nào? Truy cập booking.g.bookedai.au để đặt ngay!';
    }
    if (lower.includes('đặt') || lower.includes('book') || lower.includes('lịch')) {
      return 'Để đặt lịch mentoring AI:\n\n1. Truy cập booking.g.bookedai.au\n2. Chọn dịch vụ phù hợp\n3. Chọn thời gian\n4. Điền thông tin: tên, email, số điện thoại\n5. Thanh toán bằng thẻ, QR code, hoặc chọn "Trả sau"\n\nBuổi học diễn ra qua Google Meet. Bạn muốn bắt đầu với buổi 30 phút ($29 AUD)?';
    }
    if (lower.includes('hủy') || lower.includes('đổi') || lower.includes('cancel')) {
      return 'Chính sách hủy/đổi lịch:\n\n• Hủy miễn phí trước 24h\n• Dưới 24h: phí $15 AUD\n• Không đến: không hoàn tiền\n\nLiên hệ để đổi lịch:\n• WhatsApp: +61 455 301 335\n• Email: ceo@longcare.au';
    }
    if (lower.includes('thanh toán') || lower.includes('chuyển khoản') || lower.includes('trả')) {
      return 'Các hình thức thanh toán:\n\n• Thẻ tín dụng/ghi nợ (Stripe)\n• Quét mã QR (AUD hoặc VND)\n• Chuyển khoản Vietcombank\n• Trả sau (đặt trước, thanh toán sau)\n\nTruy cập booking.g.bookedai.au để thanh toán!';
    }
    if (lower.includes('liên hệ') || lower.includes('hỗ trợ') || lower.includes('contact')) {
      return 'Liên hệ Longcare:\n\n• WhatsApp: +61 455 301 335 (nhanh nhất)\n• Email: ceo@longcare.au\n• Chat AI: g.bookedai.au (24/7)\n\nChúng tôi trả lời trong 2 giờ (giờ làm việc 9h-18h AEST).';
    }
    if (lower.includes('xin chào') || lower.includes('chào') || lower.includes('hello') || lower.includes('hi')) {
      return 'Xin chào! Chào mừng đến với Longcare AU!\n\nTôi có thể giúp bạn:\n• Tìm hiểu dịch vụ mentoring AI\n• Đặt lịch học\n• Xem bảng giá & thanh toán\n• Hỗ trợ hủy/đổi lịch\n\nBạn cần gì?';
    }
    return 'Xin chào! Tôi là trợ lý AI của Longcare AU.\n\nTôi có thể giúp bạn:\n• Tìm hiểu dịch vụ mentoring AI\n• Đặt lịch: booking.g.bookedai.au\n• Xem bảng giá & thanh toán\n• Hủy/đổi lịch\n• Hỗ trợ kỹ thuật\n\nHoặc chat WhatsApp: +61 455 301 335\n\nBạn muốn bắt đầu với gì?';
  }

  if (language === 'zh') {
    if (lower.includes('价') || lower.includes('pricing')) {
      return 'Longcare 服务价格：\n\n• 30分钟 AI入门 — $29 AUD\n• 1小时 AI导师 — $99 AUD\n• 5次课程包 — $450 AUD\n• 10次课程包 — $850 AUD\n\n访问 booking.g.bookedai.au 立即预约！';
    }
    return '您好！我是 Longcare AU 的 AI 助手。我可以帮您：\n\n• 了解 AI 辅导服务\n• 预约课程\n• 查看价格\n\n您想了解什么？';
  }

  // English - Customer Care + Sales
  if (lower.includes('price') || lower.includes('cost') || lower.includes('pricing') || lower.includes('how much')) {
    return 'Here are our mentoring services:\n\n• 30-min AI Starter — $29 AUD\n• 1-hour AI Mentor — $99 AUD (most popular)\n• 5-Session Package — $450 AUD\n• 10-Session Package — $850 AUD\n• Business Transformation — $1,500+ AUD\n\nAll prices include GST. You can pay by card, bank transfer, or QR scan.\n\nReady to book? Visit booking.g.bookedai.au!';
  }
  if (lower.includes('book') || lower.includes('session') || lower.includes('schedule') || lower.includes('appointment')) {
    return 'Great! To book a session:\n\n1. Visit booking.g.bookedai.au\n2. Choose your service\n3. Select a time slot\n4. Enter your name, email & phone\n5. Pay with card, QR scan, or choose "Pay Later"\n\nYour session will be on Google Meet, and you\'ll get AI-generated notes afterward.\n\nWould you like to start with our $29 Starter Session?';
  }
  if (lower.includes('cancel') || lower.includes('reschedule') || lower.includes('change')) {
    return 'No worries! Here\'s our policy:\n\n• Cancel or reschedule for free up to 24h before\n• Less than 24h: $15 reschedule fee\n• No-show: no refund\n\nTo reschedule, contact us:\n• WhatsApp: +61 455 301 335\n• Email: ceo@longcare.au\n\nWe\'re happy to find a better time for you!';
  }
  if (lower.includes('refund') || lower.includes('money back')) {
    return 'Refund policy:\n\n• Full refund if cancelled 24h+ before session\n• 50% refund for cancellation within 24h\n• No refund for no-shows\n\nRefunds are processed within 5 business days.\n\nContact ceo@longcare.au for refund requests.';
  }
  if (lower.includes('payment') || lower.includes('pay') || lower.includes('transfer') || lower.includes('qr')) {
    return 'We accept multiple payment methods:\n\n• Credit/Debit Card (Stripe)\n• QR Code scan (AUD or VND)\n• Bank Transfer / PayID\n• Pay Later (book now, pay before session)\n\nAll payments are secure. Visit booking.g.bookedai.au to pay!';
  }
  if (lower.includes('meet') || lower.includes('zoom') || lower.includes('online') || lower.includes('where')) {
    return 'All sessions are conducted online via Google Meet!\n\n• You\'ll receive a Meet link after booking\n• Calendar invite is sent to your email\n• No software to install — works in your browser\n• Sessions are recorded (with your consent) for AI notes\n\nAfter your session, you\'ll get:\n• AI-generated summary & notes\n• Q&A extraction\n• Personalized next steps';
  }
  if (lower.includes('contact') || lower.includes('email') || lower.includes('phone') || lower.includes('whatsapp') || lower.includes('support')) {
    return 'You can reach us at:\n\n• WhatsApp: +61 455 301 335 (fastest)\n• Email: ceo@longcare.au\n• AI Chat: g.bookedai.au (24/7)\n\nWe respond within 2 hours during business hours (9am-6pm AEST).';
  }
  if (lower.includes('mentor') || lower.includes('learn') || lower.includes('ai') || lower.includes('what')) {
    return 'Longcare AU offers personalized AI mentoring:\n\n• AI Starter ($29) — Quick intro to AI tools\n• AI Mentor ($99) — Deep-dive personalized session\n• Packages ($450-$850) — Structured learning paths\n• Business Transformation ($1,500+) — For SMEs\n\nEach session includes:\n• Live Google Meet with your mentor\n• AI-generated session notes\n• Q&A extraction\n• Personalized next steps\n\nWhat are you looking to learn?';
  }
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey') || lower.includes('good')) {
    return 'Hello! Welcome to Longcare AU!\n\nI\'m here to help you with:\n• Finding the right AI mentoring service\n• Booking a session\n• Pricing & payment info\n• Technical support\n\nWhat can I help you with today?';
  }
  if (lower.includes('thank') || lower.includes('thanks') || lower.includes('cheers')) {
    return 'You\'re welcome! Happy to help.\n\nIf you need anything else:\n• Book: booking.g.bookedai.au\n• WhatsApp: +61 455 301 335\n• Email: ceo@longcare.au\n\nHave a great day!';
  }

  return 'Hello! I\'m the Longcare AI assistant. I can help you with:\n\n• Finding the right AI mentoring service\n• Booking a session (booking.g.bookedai.au)\n• Pricing & payment information\n• Cancel/reschedule support\n• Technical questions\n\nOr chat with us on WhatsApp: +61 455 301 335\n\nWhat would you like to know?';
}

function extractActions(reply: string): { type: string; label: string; action: string }[] {
  const actions: { type: string; label: string; action: string }[] = [];
  if (reply.toLowerCase().includes('booking.g.bookedai.au')) {
    actions.push({ type: 'link', label: 'Book Now', action: 'https://booking.g.bookedai.au' });
  }
  if (reply.toLowerCase().includes('$29') || reply.toLowerCase().includes('starter')) {
    actions.push({ type: 'suggest', label: 'Book $29 Starter', action: '/booking?service=starter-30min' });
  }
  return actions;
}
