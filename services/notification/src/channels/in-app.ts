import { query } from '@bookedai/db';
import { logger } from '../lib/logger.js';

export interface InAppNotification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  body: string | null;
  data: Record<string, unknown> | null;
  read: boolean;
  created_at: string;
}

export async function createInAppNotification(
  userId: string,
  type: string,
  title: string,
  body?: string,
  data?: Record<string, unknown>,
): Promise<InAppNotification> {
  const result = await query(
    `INSERT INTO notifications (user_id, type, title, body, data)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [userId, type, title, body || null, data ? JSON.stringify(data) : null],
  );

  logger.info({ userId, type }, 'In-app notification created');
  return result.rows[0] as InAppNotification;
}

export async function getUserNotifications(
  userId: string,
  limit = 50,
  offset = 0,
): Promise<InAppNotification[]> {
  const result = await query(
    `SELECT * FROM notifications
     WHERE user_id = $1
     ORDER BY created_at DESC
     LIMIT $2 OFFSET $3`,
    [userId, limit, offset],
  );
  return result.rows as InAppNotification[];
}

export async function markAsRead(notificationId: string, userId: string): Promise<boolean> {
  const result = await query(
    `UPDATE notifications SET read = true
     WHERE id = $1 AND user_id = $2`,
    [notificationId, userId],
  );
  return (result.rowCount ?? 0) > 0;
}

export async function getUnreadCount(userId: string): Promise<number> {
  const result = await query(
    `SELECT count(*)::int as count FROM notifications
     WHERE user_id = $1 AND read = false`,
    [userId],
  );
  return result.rows[0]?.count || 0;
}

export async function markAllAsRead(userId: string): Promise<number> {
  const result = await query(
    `UPDATE notifications SET read = true
     WHERE user_id = $1 AND read = false`,
    [userId],
  );
  return result.rowCount ?? 0;
}
