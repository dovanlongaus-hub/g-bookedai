import { Router } from 'express';
import { query } from '@bookedai/db';
import { logger } from '../lib/logger.js';
import { triggerEmail } from '../lib/send-email.js';

export const healthRouter = Router();

healthRouter.get('/', async (_req, res) => {
  const checks: Record<string, 'ok' | 'error'> = {};

  // Check database
  try {
    await query('SELECT 1');
    checks.database = 'ok';
  } catch {
    checks.database = 'error';
  }

  const allHealthy = Object.values(checks).every((v) => v === 'ok');

  if (!allHealthy) {
    logger.warn({ checks }, 'Health check failed');
  }

  res.status(allHealthy ? 200 : 503).json({
    status: allHealthy ? 'healthy' : 'degraded',
    service: 'api.g.bookedai.au',
    checks,
    timestamp: new Date().toISOString(),
  });
});

// Test email endpoint (no auth, for setup verification — remove in production)
healthRouter.post('/test-email', async (req, res) => {
  const { to, type } = req.body;
  const email = to || 'ceo@longcare.au';
  const emailType = type || 'welcome';
  try {
    await triggerEmail(emailType, email, {
      userName: 'Test User',
      serviceName: 'AI Mentor Session',
      dateTime: new Date().toLocaleString('en-AU'),
      duration: '60 minutes',
      bookingRef: 'TEST-001',
      bookingId: 'test-001',
      amount: '99.00',
      paymentMethod: 'Credit Card',
      reference: 'TEST-PAY-001',
      meetLink: 'https://meet.google.com/test',
    });
    res.json({ success: true, message: `Test email (${emailType}) sent to ${email}` });
  } catch (err: any) {
    logger.error({ err }, 'Test email failed');
    res.json({ success: false, error: err.message });
  }
});
