import { Router } from 'express';
import { query } from '@bookedai/db';
import { authenticate } from '../middleware/auth.js';
import { logger } from '../lib/logger.js';

export const notificationsRouter = Router();

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
