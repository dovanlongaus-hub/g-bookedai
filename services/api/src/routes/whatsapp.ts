import { Router } from 'express';
import { logger } from '../lib/logger.js';

export const whatsappRouter = Router();

/**
 * WhatsApp Cloud API Webhook Verification (GET)
 * Facebook sends a verification challenge when setting up webhooks
 */
whatsappRouter.get('/', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN || 'bookedai-whatsapp-verify-2026';

  if (mode === 'subscribe' && token === verifyToken) {
    logger.info('WhatsApp webhook verified');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

/**
 * WhatsApp incoming message handler (POST)
 * Receives messages from WhatsApp Cloud API and auto-replies using the AI agent
 */
whatsappRouter.post('/', async (req, res) => {
  try {
    const body = req.body;

    if (body.object !== 'whatsapp_business_account') {
      res.sendStatus(404);
      return;
    }

    const entries = body.entry || [];
    for (const entry of entries) {
      const changes = entry.changes || [];
      for (const change of changes) {
        if (change.field !== 'messages') continue;

        const messages = change.value?.messages || [];
        for (const msg of messages) {
          if (msg.type !== 'text') continue;

          const from = msg.from; // sender phone number
          const text = msg.text?.body || '';
          const phoneId = change.value?.metadata?.phone_number_id;

          logger.info({ from, text }, 'WhatsApp message received');

          // Get AI reply from agent
          let reply: string;
          try {
            const agentUrl = process.env.AGENT_SERVICE_URL || 'http://localhost:8091';
            const agentRes = await fetch(`${agentUrl}/orchestrator/chat`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ message: text, sessionId: `wa-${from}`, language: detectLanguage(text) }),
            });
            const data = await agentRes.json();
            reply = data.reply || 'Thank you for your message. Visit book.longcare.au to book a session.';
          } catch {
            reply = 'Thank you for contacting Longcare AU! Visit book.longcare.au to book an AI mentoring session, or email ceo@longcare.au for support.';
          }

          // Send reply via WhatsApp Cloud API
          if (process.env.WHATSAPP_ACCESS_TOKEN && phoneId) {
            try {
              await fetch(`https://graph.facebook.com/v18.0/${phoneId}/messages`, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  messaging_product: 'whatsapp',
                  to: from,
                  type: 'text',
                  text: { body: reply },
                }),
              });
              logger.info({ to: from }, 'WhatsApp reply sent');
            } catch (err) {
              logger.error({ err, to: from }, 'Failed to send WhatsApp reply');
            }
          } else {
            logger.warn('WhatsApp reply not sent: WHATSAPP_ACCESS_TOKEN not configured');
          }
        }
      }
    }

    res.sendStatus(200);
  } catch (err) {
    logger.error({ err }, 'WhatsApp webhook error');
    res.sendStatus(500);
  }
});

function detectLanguage(text: string): string {
  if (/[àáạảãâầấậẩẫăằắặẳẵ]/i.test(text)) return 'vi';
  if (/[\u4e00-\u9fff]/.test(text)) return 'zh';
  return 'en';
}
