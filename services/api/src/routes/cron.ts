import { Router } from 'express';
import { query } from '@bookedai/db';
import { logger } from '../lib/logger.js';
import { triggerEmail } from '../lib/send-email.js';
import { randomUUID } from 'crypto';

export const cronRouter = Router();

/**
 * Expire booking holds older than 10 minutes
 * Called by Cloud Scheduler every 2 minutes
 */
cronRouter.post('/expire-holds', async (_req, res) => {
  try {
    // Find holds older than 10 minutes
    const result = await query(`
      UPDATE bookings SET status = 'CANCELLED', updated_at = now()
      WHERE status = 'HOLD' AND created_at < now() - interval '10 minutes'
      RETURNING id, slot_id
    `);

    // Release the held slots
    for (const booking of result.rows) {
      await query('UPDATE availability_slots SET status = $1 WHERE id = $2', ['AVAILABLE', booking.slot_id]);
      await query(
        `INSERT INTO audit_logs (id, entity_type, entity_id, action, after_json)
         VALUES ($1, 'booking', $2, 'HOLD_EXPIRED', $3)`,
        [randomUUID(), booking.id, JSON.stringify({ reason: 'hold_expired_10min' })],
      );
    }

    const count = result.rows.length;
    if (count > 0) {
      logger.info({ count }, 'Expired booking holds');
    }

    res.json({ success: true, expired: count });
  } catch (err) {
    logger.error({ err }, 'Failed to expire holds');
    res.status(500).json({ success: false, error: 'Failed to expire holds' });
  }
});

/**
 * Send 24h reminder for tomorrow's bookings
 * Called by Cloud Scheduler daily at 8am AEST
 */
cronRouter.post('/send-reminders-24h', async (_req, res) => {
  try {
    const result = await query(`
      SELECT b.id, b.user_id, b.google_meet_url, s.name as service_name,
             u.email, u.display_name, a.starts_at
      FROM bookings b
      JOIN services s ON b.service_id = s.id
      JOIN users u ON b.user_id = u.id
      JOIN availability_slots a ON b.slot_id = a.id
      WHERE b.status = 'CONFIRMED'
        AND a.starts_at BETWEEN now() + interval '20 hours' AND now() + interval '28 hours'
        AND NOT EXISTS (SELECT 1 FROM audit_logs WHERE entity_id = b.id AND action = 'REMINDER_24H_SENT')
    `);

    let sent = 0;
    for (const booking of result.rows) {
      // Send reminder_24h email
      try {
        await triggerEmail('reminder_24h', booking.email, {
          userName: booking.display_name || booking.email,
          serviceName: booking.service_name,
          dateTime: new Date(booking.starts_at).toLocaleString('en-AU', { timeZone: 'Australia/Sydney' }),
          meetLink: booking.google_meet_url || '',
          bookingId: booking.id,
        });
      } catch {}

      // Log that reminder was sent (prevent duplicates)
      await query(
        `INSERT INTO audit_logs (id, entity_type, entity_id, action, after_json)
         VALUES ($1, 'booking', $2, 'REMINDER_24H_SENT', $3)`,
        [randomUUID(), booking.id, JSON.stringify({ email: booking.email, sent_at: new Date().toISOString() })],
      );
      sent++;
      logger.info({ bookingId: booking.id, email: booking.email }, '24h reminder sent');
    }

    res.json({ success: true, reminders_sent: sent });
  } catch (err) {
    logger.error({ err }, 'Failed to send reminders');
    res.status(500).json({ success: false });
  }
});

/**
 * Daily revenue summary
 * Called by Cloud Scheduler daily at 9am AEST
 */
cronRouter.post('/daily-summary', async (_req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];

    const [bookings, revenue, users] = await Promise.all([
      query(`SELECT count(*)::int as count FROM bookings WHERE created_at::date = $1`, [today]),
      query(`SELECT coalesce(sum(amount_cents), 0)::int as total FROM payments WHERE status = 'SUCCEEDED' AND created_at::date = $1`, [today]),
      query(`SELECT count(*)::int as count FROM users WHERE created_at::date = $1`, [today]),
    ]);

    const summary = {
      date: today,
      bookings: bookings.rows[0]?.count || 0,
      revenue_aud: ((revenue.rows[0]?.total || 0) / 100).toFixed(2),
      new_users: users.rows[0]?.count || 0,
    };

    logger.info(summary, 'Daily summary');
    res.json({ success: true, data: summary });
  } catch (err) {
    logger.error({ err }, 'Failed to generate daily summary');
    res.status(500).json({ success: false });
  }
});
