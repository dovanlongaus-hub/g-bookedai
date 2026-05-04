import { Router } from 'express';
import { validate } from '../middleware/validate.js';
import { chatMessageSchema } from '../schemas/chat.schema.js';
import { logger } from '../lib/logger.js';
import { getEnv } from '../lib/env.js';

export const chatRouter = Router();

chatRouter.post('/', validate(chatMessageSchema), async (req, res, next) => {
  try {
    const { message, sessionId, language } = req.body;

    const agentUrl = process.env.AGENT_SERVICE_URL || 'http://localhost:8091';
    const chatUrl = `${agentUrl}/orchestrator/chat`;

    // Forward to agent service
    try {
      const agentRes = await fetch(chatUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, sessionId, language }),
      });
      const data = await agentRes.json();
      res.json({ success: true, data });
    } catch {
      // Fallback if agent service unavailable
      logger.warn('Agent service unavailable, returning fallback');
      res.json({
        success: true,
        data: {
          reply: language === 'vi'
            ? 'Xin chào! Tôi có thể giúp bạn đặt lịch mentoring AI. Bạn muốn tìm hiểu dịch vụ nào?'
            : language === 'zh'
              ? '您好！我可以帮助您预约AI辅导。您想了解哪项服务？'
              : 'Hello! I can help you book an AI mentoring session. What service are you interested in?',
          actions: [
            { type: 'suggest', label: 'View services', action: '/services/search' },
            { type: 'suggest', label: 'Book a session', action: '/booking' },
          ],
        },
      });
    }
  } catch (err) {
    next(err);
  }
});
