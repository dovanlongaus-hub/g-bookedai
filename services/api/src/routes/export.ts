import { Router } from 'express';
import { query } from '@bookedai/db';
import { logger } from '../lib/logger.js';

export const exportRouter = Router();

/**
 * Export bookings as CSV
 */
exportRouter.get('/bookings.csv', async (req, res) => {
  try {
    const result = await query(`
      SELECT b.id, s.name as service, u.email as client, u.display_name as client_name,
             b.status, b.total_cents, b.created_at, b.updated_at,
             b.google_meet_url, b.google_calendar_event_id
      FROM bookings b
      JOIN services s ON b.service_id = s.id
      JOIN users u ON b.user_id = u.id
      ORDER BY b.created_at DESC
    `);

    const header = 'Booking ID,Service,Client,Client Email,Status,Amount (AUD),Created,Updated,Meet URL\n';
    const rows = result.rows.map((r: any) =>
      `${r.id},${r.service},"${r.client_name || ''}",${r.client},${r.status},${(r.total_cents / 100).toFixed(2)},${r.created_at},${r.updated_at || ''},${r.google_meet_url || ''}`
    ).join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=bookings-${new Date().toISOString().split('T')[0]}.csv`);
    res.send(header + rows);
  } catch (err) {
    logger.error({ err }, 'Export bookings failed');
    res.status(500).json({ error: 'Export failed' });
  }
});

/**
 * Export revenue as CSV
 */
exportRouter.get('/revenue.csv', async (req, res) => {
  try {
    const result = await query(`
      SELECT p.id, p.method, p.status, p.amount_cents, p.created_at,
             b.id as booking_id, s.name as service, u.email as client
      FROM payments p
      JOIN bookings b ON p.booking_id = b.id
      JOIN services s ON b.service_id = s.id
      JOIN users u ON b.user_id = u.id
      ORDER BY p.created_at DESC
    `);

    const header = 'Payment ID,Booking ID,Service,Client,Method,Status,Amount (AUD),Date\n';
    const rows = result.rows.map((r: any) =>
      `${r.id},${r.booking_id},${r.service},${r.client},${r.method},${r.status},${(r.amount_cents / 100).toFixed(2)},${r.created_at}`
    ).join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=revenue-${new Date().toISOString().split('T')[0]}.csv`);
    res.send(header + rows);
  } catch (err) {
    logger.error({ err }, 'Export revenue failed');
    res.status(500).json({ error: 'Export failed' });
  }
});

/**
 * Export users as CSV
 */
exportRouter.get('/users.csv', async (req, res) => {
  try {
    const result = await query(`
      SELECT u.id, u.email, u.display_name, u.role, u.language, u.phone, u.created_at,
             t.name as tenant
      FROM users u
      LEFT JOIN tenants t ON u.tenant_id = t.id
      ORDER BY u.created_at DESC
    `);

    const header = 'User ID,Email,Name,Role,Language,Phone,Tenant,Created\n';
    const rows = result.rows.map((r: any) =>
      `${r.id},${r.email},"${r.display_name || ''}",${r.role},${r.language || 'en'},${r.phone || ''},${r.tenant || ''},${r.created_at}`
    ).join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=users-${new Date().toISOString().split('T')[0]}.csv`);
    res.send(header + rows);
  } catch (err) {
    res.status(500).json({ error: 'Export failed' });
  }
});

/**
 * Export webhook events as JSON
 */
exportRouter.get('/webhook-events', async (_req, res) => {
  try {
    const result = await query(`
      SELECT id, event_type, stripe_event_id, status, created_at
      FROM webhook_events
      ORDER BY created_at DESC
      LIMIT 100
    `);
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.json({ success: true, data: [] });
  }
});
