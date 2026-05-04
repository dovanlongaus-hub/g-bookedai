/**
 * Classifies user intent from message text.
 * Returns intent + confidence + extracted entities.
 */

export type Intent =
  | 'booking'      // wants to book a session
  | 'pricing'      // asking about prices
  | 'cancel'       // wants to cancel/reschedule
  | 'refund'       // asking about refunds
  | 'payment'      // payment-related questions
  | 'contact'      // wants to contact support
  | 'greeting'     // hello/hi
  | 'thanks'       // thank you
  | 'services'     // asking about available services
  | 'meeting'      // about Google Meet/sessions
  | 'learning'     // about courses/lessons
  | 'general';     // general question

export interface ClassifiedIntent {
  intent: Intent;
  confidence: number;
  entities: {
    service?: string;
    price?: number;
    language?: string;
    date?: string;
    name?: string;
    email?: string;
  };
}

const INTENT_PATTERNS: Record<Intent, RegExp[]> = {
  booking: [/book|schedule|appointment|đặt|lịch|预约/i],
  pricing: [/price|cost|how much|pricing|giá|bảng giá|bao nhiêu|价/i],
  cancel: [/cancel|reschedule|change|hủy|đổi|取消/i],
  refund: [/refund|money back|hoàn tiền|退款/i],
  payment: [/pay|transfer|qr|stripe|thanh toán|chuyển khoản|付款/i],
  contact: [/contact|email|phone|whatsapp|support|liên hệ|hỗ trợ|联系/i],
  greeting: [/^(hi|hello|hey|good|xin chào|chào|你好)/i],
  thanks: [/thank|thanks|cheers|cảm ơn|谢谢/i],
  services: [/service|what do you offer|mentor|starter|package|dịch vụ|服务/i],
  meeting: [/meet|zoom|online|where|google meet|buổi học|会议/i],
  learning: [/learn|course|lesson|ai|teach|học|课程/i],
  general: [/.*/],
};

export function classifyIntent(message: string): ClassifiedIntent {
  const lower = message.toLowerCase().trim();

  for (const [intent, patterns] of Object.entries(INTENT_PATTERNS)) {
    if (intent === 'general') continue;
    for (const pattern of patterns) {
      if (pattern.test(lower)) {
        return {
          intent: intent as Intent,
          confidence: 0.8,
          entities: extractEntities(lower),
        };
      }
    }
  }

  return { intent: 'general', confidence: 0.5, entities: {} };
}

function extractEntities(text: string): ClassifiedIntent['entities'] {
  const entities: ClassifiedIntent['entities'] = {};

  // Extract price mentions
  const priceMatch = text.match(/\$(\d+)/);
  if (priceMatch) entities.price = parseInt(priceMatch[1]);

  // Extract service mentions
  if (/starter|30.?min/i.test(text)) entities.service = 'starter';
  if (/mentor|1.?hour|60.?min/i.test(text)) entities.service = 'mentor';
  if (/5.?session|package/i.test(text)) entities.service = 'package-5';
  if (/10.?session/i.test(text)) entities.service = 'package-10';
  if (/transform|business/i.test(text)) entities.service = 'transformation';

  // Extract email
  const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
  if (emailMatch) entities.email = emailMatch[0];

  return entities;
}
