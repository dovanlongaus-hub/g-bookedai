import { Router } from 'express';
import { query } from '@bookedai/db';
import { logger } from '../lib/logger.js';

export const dashboardRouter = Router();

/**
 * Admin dashboard stats
 */
dashboardRouter.get('/admin/stats', async (_req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];

    const [bookingStats, revenueToday, revenueMtd, totalUsers, recentBookings] = await Promise.all([
      query(`SELECT status, count(*)::int as count FROM bookings GROUP BY status`),
      query(`SELECT coalesce(sum(amount_cents),0)::int as total FROM payments WHERE status='SUCCEEDED' AND created_at::date = $1`, [today]),
      query(`SELECT coalesce(sum(amount_cents),0)::int as total FROM payments WHERE status='SUCCEEDED' AND created_at >= date_trunc('month', now())`),
      query(`SELECT count(*)::int as total FROM users`),
      query(`
        SELECT b.id, b.status, b.total_cents, b.created_at, b.google_meet_url,
               s.name as service_name, u.email, u.display_name
        FROM bookings b
        JOIN services s ON b.service_id = s.id
        JOIN users u ON b.user_id = u.id
        ORDER BY b.created_at DESC LIMIT 10
      `),
    ]);

    const statusMap: Record<string, number> = {};
    bookingStats.rows.forEach((r: any) => { statusMap[r.status] = r.count; });

    res.json({
      success: true,
      data: {
        revenueToday: revenueToday.rows[0]?.total || 0,
        revenueMtd: revenueMtd.rows[0]?.total || 0,
        totalBookings: Object.values(statusMap).reduce((a: number, b: number) => a + b, 0),
        confirmedBookings: statusMap['CONFIRMED'] || 0,
        pendingBookings: (statusMap['HOLD'] || 0) + (statusMap['PENDING_PAYMENT'] || 0),
        cancelledBookings: statusMap['CANCELLED'] || 0,
        totalUsers: totalUsers.rows[0]?.total || 0,
        recentBookings: recentBookings.rows.map((r: any) => ({
          id: r.id.slice(0, 8).toUpperCase(),
          service: r.service_name,
          client: r.display_name || r.email,
          status: r.status.toLowerCase(),
          amount: `$${(r.total_cents / 100).toFixed(2)}`,
          date: new Date(r.created_at).toLocaleDateString('en-AU'),
          meetUrl: r.google_meet_url,
        })),
      },
    });
  } catch (err) {
    logger.error({ err }, 'Dashboard stats failed');
    res.status(500).json({ success: false });
  }
});

/**
 * User dashboard — bookings for a specific email
 */
dashboardRouter.get('/user/bookings', async (req, res) => {
  try {
    const email = req.query.email as string;
    if (!email) {
      res.status(400).json({ success: false, error: 'email query param required' });
      return;
    }

    const result = await query(`
      SELECT b.id, b.status, b.total_cents, b.created_at, b.google_meet_url,
             s.name as service_name, s.description as service_desc
      FROM bookings b
      JOIN services s ON b.service_id = s.id
      JOIN users u ON b.user_id = u.id
      WHERE u.email = $1
      ORDER BY b.created_at DESC
    `, [email]);

    res.json({
      success: true,
      data: result.rows.map((r: any) => ({
        id: r.id.slice(0, 8).toUpperCase(),
        service: r.service_name,
        status: r.status,
        amount: (r.total_cents / 100).toFixed(2),
        date: new Date(r.created_at).toLocaleDateString('en-AU'),
        meetUrl: r.google_meet_url,
      })),
    });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

/**
 * Revenue by service
 */
dashboardRouter.get('/admin/revenue-by-service', async (_req, res) => {
  try {
    const result = await query(`
      SELECT s.name, count(b.id)::int as bookings, coalesce(sum(b.total_cents),0)::int as revenue
      FROM services s
      LEFT JOIN bookings b ON b.service_id = s.id AND b.status IN ('CONFIRMED','PENDING_PAYMENT')
      WHERE s.active = true
      GROUP BY s.id, s.name
      ORDER BY revenue DESC
    `);

    res.json({
      success: true,
      data: result.rows.map((r: any) => ({
        service: r.name,
        bookings: r.bookings,
        revenue: `$${(r.revenue / 100).toFixed(2)}`,
        revenueRaw: r.revenue,
      })),
    });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

/**
 * Pending bank transfers (for admin approval)
 */
dashboardRouter.get('/admin/pending-payments', async (_req, res) => {
  try {
    const result = await query(`
      SELECT p.id as payment_id, p.amount_cents, p.bank_reference, p.created_at,
             b.id as booking_id, s.name as service_name,
             u.email, u.display_name
      FROM payments p
      JOIN bookings b ON p.booking_id = b.id
      JOIN services s ON b.service_id = s.id
      JOIN users u ON b.user_id = u.id
      WHERE p.method = 'bank_transfer' AND p.status = 'PENDING'
      ORDER BY p.created_at DESC
    `);

    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

/**
 * Approve bank transfer payment
 */
dashboardRouter.post('/admin/approve-payment', async (req, res) => {
  try {
    const { paymentId, bookingId } = req.body;
    if (!paymentId || !bookingId) {
      res.status(400).json({ success: false, error: 'paymentId and bookingId required' });
      return;
    }

    await query('UPDATE payments SET status = $1 WHERE id = $2', ['SUCCEEDED', paymentId]);
    await query('UPDATE bookings SET status = $1, updated_at = now() WHERE id = $2', ['CONFIRMED', bookingId]);

    logger.info({ paymentId, bookingId }, 'Bank transfer approved');
    res.json({ success: true, message: 'Payment approved, booking confirmed' });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

/**
 * List all users
 */
dashboardRouter.get('/admin/users', async (_req, res) => {
  try {
    const result = await query(`
      SELECT u.id, u.email, u.display_name, u.role, u.language, u.phone, u.created_at,
             t.name as tenant
      FROM users u
      LEFT JOIN tenants t ON u.tenant_id = t.id
      ORDER BY u.created_at DESC
    `);
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});
