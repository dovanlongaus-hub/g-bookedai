import { Router } from 'express';
import { query } from '@bookedai/db';
import { authenticate, requireRole } from '../middleware/auth.js';
import { logger } from '../lib/logger.js';
import type { NotificationType } from '@bookedai/shared';

export const notificationsRouter = Router();

// Lazy import notification service modules (same monorepo, avoids compile-time path issues)
async function getEmailTestModule() {
  return import(/* webpackIgnore: true */ '../../../../notification/src/channels/email-test.js' as string);
}
async function getTemplatesModule() {
  return import(/* webpackIgnore: true */ '../../../../notification/src/templates/index.js' as string);
}

// All routes require authentication
notificationsRouter.use(authenticate);

/**
 * GET /notifications - Get user's notifications
 */
notificationsRouter.get('/', async (req, res) => {
  try {
    const userId = req.auth!.userId;
    const limit = Math.min(Number(req.query.limit) || 50, 100);
    const offset = Number(req.query.offset) || 0;

    const result = await query(
      `SELECT * FROM notifications
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT $2 OFFSET $3`,
      [userId, limit, offset],
    );

    res.json({ success: true, data: result.rows });
  } catch (err) {
    logger.error({ err }, 'Failed to fetch notifications');
    res.status(500).json({ success: false, error: { code: 'INTERNAL', message: 'Failed to fetch notifications' } });
  }
});

/**
 * GET /notifications/unread-count - Get unread notification count
 */
notificationsRouter.get('/unread-count', async (req, res) => {
  try {
    const userId = req.auth!.userId;

    const result = await query(
      `SELECT count(*)::int as count FROM notifications
       WHERE user_id = $1 AND read = false`,
      [userId],
    );

    res.json({ success: true, data: { count: result.rows[0]?.count || 0 } });
  } catch (err) {
    logger.error({ err }, 'Failed to get unread count');
    res.status(500).json({ success: false, error: { code: 'INTERNAL', message: 'Failed to get unread count' } });
  }
});

/**
 * POST /notifications/:id/read - Mark a notification as read
 */
notificationsRouter.post('/:id/read', async (req, res) => {
  try {
    const userId = req.auth!.userId;
    const notificationId = req.params.id;

    const result = await query(
      `UPDATE notifications SET read = true
       WHERE id = $1 AND user_id = $2`,
      [notificationId, userId],
    );

    if ((result.rowCount ?? 0) === 0) {
      res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Notification not found' } });
      return;
    }

    res.json({ success: true });
  } catch (err) {
    logger.error({ err }, 'Failed to mark notification as read');
    res.status(500).json({ success: false, error: { code: 'INTERNAL', message: 'Failed to mark as read' } });
  }
});

/**
 * POST /notifications/read-all - Mark all notifications as read
 */
notificationsRouter.post('/read-all', async (req, res) => {
  try {
    const userId = req.auth!.userId;

    const result = await query(
      `UPDATE notifications SET read = true
       WHERE user_id = $1 AND read = false`,
      [userId],
    );

    res.json({ success: true, data: { updated: result.rowCount ?? 0 } });
  } catch (err) {
    logger.error({ err }, 'Failed to mark all as read');
    res.status(500).json({ success: false, error: { code: 'INTERNAL', message: 'Failed to mark all as read' } });
  }
});

// ─── Admin: Test Email ──────────────────────────────────────────────────────────

const VALID_EMAIL_TYPES: NotificationType[] = [
  'booking_confirmed',
  'reminder_24h',
  'booking_cancelled',
  'booking_rescheduled',
  'payment_received',
  'session_summary_ready',
  'welcome',
];

/**
 * POST /notifications/test-email — Send a test email (admin only)
 * Body: { type: "booking_confirmed", to: "test@email.com" }
 * If type is "all", sends all 7 template types
 */
notificationsRouter.post('/test-email', requireRole('admin', 'superadmin'), async (req, res) => {
  try {
    const { type, to } = req.body as { type: string; to: string };

    if (!to || !to.includes('@')) {
      res.status(400).json({ success: false, error: { code: 'BAD_REQUEST', message: 'Valid email address required' } });
      return;
    }

    const emailTestModule = await getEmailTestModule();

    if (type === 'all') {
      const results = await emailTestModule.sendAllTestEmails(to);
      res.json({ success: true, data: { results } });
      return;
    }

    if (!VALID_EMAIL_TYPES.includes(type as NotificationType)) {
      res.status(400).json({
        success: false,
        error: { code: 'BAD_REQUEST', message: `Invalid type. Must be one of: ${VALID_EMAIL_TYPES.join(', ')}, or "all"` },
      });
      return;
    }

    const result = await emailTestModule.sendTestEmail(type as NotificationType, to);
    res.json({ success: true, data: result });
  } catch (err) {
    logger.error({ err }, 'Failed to send test email');
    res.status(500).json({ success: false, error: { code: 'INTERNAL', message: 'Failed to send test email' } });
  }
});

/**
 * GET /notifications/email-preview/:type — Returns rendered HTML for an email template
 * Used by the admin email preview page to render templates in iframes
 */
notificationsRouter.get('/email-preview/:type', requireRole('admin', 'superadmin'), async (req, res) => {
  try {
    const type = req.params.type as NotificationType;

    if (!VALID_EMAIL_TYPES.includes(type)) {
      res.status(400).json({
        success: false,
        error: { code: 'BAD_REQUEST', message: `Invalid type. Must be one of: ${VALID_EMAIL_TYPES.join(', ')}` },
      });
      return;
    }

    const templatesModule = await getTemplatesModule();
    const data = templatesModule.sampleTemplateData[type] || { userName: 'Test User' };
    const template = templatesModule.getEmailTemplate(type, data);

    res.setHeader('Content-Type', 'text/html');
    res.send(template.html);
  } catch (err) {
    logger.error({ err }, 'Failed to render email preview');
    res.status(500).json({ success: false, error: { code: 'INTERNAL', message: 'Failed to render email preview' } });
  }
});
