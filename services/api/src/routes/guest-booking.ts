import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate.js';
import { query } from '@bookedai/db';
import { logger } from '../lib/logger.js';
import { triggerEmail } from '../lib/send-email.js';
import { randomUUID } from 'crypto';

const guestBookingSchema = z.object({
  serviceId: z.string().uuid(),
  slotTime: z.string().optional(), // e.g. "5 May at 10:00"
  name: z.string().min(1).max(200),
  email: z.string().email(),
  phone: z.string().max(30).optional(),
  paymentMethod: z.enum(['stripe', 'bank_transfer', 'pay_later']).default('pay_later'),
});

export const guestBookingRouter = Router();

guestBookingRouter.post('/', validate(guestBookingSchema), async (req, res, next) => {
  try {
    const { serviceId, slotTime, name, email, phone, paymentMethod } = req.body;

    // Get service
    const serviceResult = await query('SELECT * FROM services WHERE id = $1 AND active = true', [serviceId]);
    if (serviceResult.rows.length === 0) {
      res.status(404).json({ success: false, error: { code: 'SERVICE_NOT_FOUND', message: 'Service not found' } });
      return;
    }
    const service = serviceResult.rows[0];

    // Get or create user by email
    let userResult = await query('SELECT id, tenant_id FROM users WHERE email = $1', [email]);
    let userId: string;
    let tenantId: string;

    if (userResult.rows.length === 0) {
      // Get default tenant
      const tenant = await query("SELECT id FROM tenants WHERE domain = 'longcare.au' LIMIT 1");
      tenantId = tenant.rows[0]?.id;
      userId = randomUUID();

      await query(
        `INSERT INTO users (id, tenant_id, email, role, display_name, phone, language)
         VALUES ($1, $2, $3, 'customer', $4, $5, 'en')`,
        [userId, tenantId, email, name, phone || null],
      );
      logger.info({ userId, email }, 'Guest user created');
    } else {
      userId = userResult.rows[0].id;
      tenantId = userResult.rows[0].tenant_id;
      // Update name/phone if provided
      await query('UPDATE users SET display_name = COALESCE($1, display_name), phone = COALESCE($2, phone) WHERE id = $3',
        [name, phone || null, userId]);
    }

    // Create booking
    const bookingId = randomUUID();
    const bookingRef = `BOOK-${bookingId.slice(0, 8).toUpperCase()}`;
    const meetLink = `https://meet.longcare.au/${bookingRef}`;
    const status = paymentMethod === 'pay_later' ? 'CONFIRMED' : 'PENDING_PAYMENT';

    await query(
      `INSERT INTO bookings (id, tenant_id, user_id, service_id, status, total_cents, google_meet_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [bookingId, tenantId, userId, serviceId, status, service.price_cents, meetLink],
    );

    // Audit log
    await query(
      `INSERT INTO audit_logs (id, actor_user_id, entity_type, entity_id, action, after_json)
       VALUES ($1, $2, 'booking', $3, 'GUEST_BOOKING_CREATED', $4)`,
      [randomUUID(), userId, bookingId, JSON.stringify({
        service: service.name, email, name, phone, paymentMethod, slotTime, meetLink, bookingRef,
      })],
    );

    logger.info({ bookingId, bookingRef, email, service: service.name, paymentMethod }, 'Guest booking created');

    // Send booking_confirmed email to guest (non-blocking)
    try {
      await triggerEmail('booking_confirmed', email, {
        userName: name,
        serviceName: service.name,
        dateTime: slotTime || 'TBC',
        duration: `${service.duration_minutes || 60} minutes`,
        bookingRef,
        meetLink,
      });
    } catch {}

    res.json({
      success: true,
      data: {
        bookingId,
        bookingRef,
        meetLink,
        status,
        service: { name: service.name, priceCents: service.price_cents },
        message: `Booking ${bookingRef} created! Meet link: ${meetLink}`,
      },
    });
  } catch (err) {
    next(err);
  }
});

/**
 * Look up a single booking by its public reference (BOOK-XXXXXXXX).
 *
 * The reference is the first 8 hex chars of the booking UUID (see how
 * `bookingRef` is built above), so we match on that prefix. The ref is
 * treated as a bearer secret here — anyone with the link can view it
 * (that's already how the QR / "manage" link works). Read-only.
 */
guestBookingRouter.get('/by-ref/:ref', async (req, res, next) => {
  try {
    const raw = String(req.params.ref || '').trim();
    // Accept "BOOK-A9F0F695", "book-a9f0f695" or just "a9f0f695".
    const prefix = raw.replace(/^book-/i, '').toLowerCase();
    if (!/^[0-9a-f]{8}$/.test(prefix)) {
      res.status(400).json({ success: false, error: { code: 'BAD_REF', message: 'Invalid booking reference' } });
      return;
    }

    const result = await query(
      `SELECT b.id, b.status, b.total_cents, b.created_at, b.google_meet_url,
              s.name AS service_name
       FROM bookings b
       JOIN services s ON b.service_id = s.id
       WHERE substring(b.id::text from 1 for 8) = $1
       ORDER BY b.created_at DESC
       LIMIT 1`,
      [prefix],
    );

    if (result.rows.length === 0) {
      res.status(404).json({ success: false, data: null, error: { code: 'BOOKING_NOT_FOUND', message: 'Booking not found' } });
      return;
    }

    const r: any = result.rows[0];
    res.json({
      success: true,
      data: {
        ref: `BOOK-${String(r.id).slice(0, 8).toUpperCase()}`,
        service: r.service_name,
        status: r.status,
        amountCents: r.total_cents,
        amountAud: (Number(r.total_cents) / 100).toFixed(2),
        meetUrl: r.google_meet_url,
        createdAt: r.created_at,
      },
    });
  } catch (err) {
    next(err);
  }
});
