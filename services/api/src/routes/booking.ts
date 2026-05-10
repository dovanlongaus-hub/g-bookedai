import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import {
  holdBookingSchema,
  confirmBookingSchema,
  cancelBookingSchema,
  rescheduleBookingSchema,
} from '../schemas/booking.schema.js';
import { query } from '@bookedai/db';
import { HOLD_EXPIRY_MINUTES } from '@bookedai/shared';
import { AppError } from '../middleware/error-handler.js';
import { logger } from '../lib/logger.js';
import { triggerEmail } from '../lib/send-email.js';
import { randomUUID } from 'crypto';

export const bookingRouter = Router();

// Get user's bookings
bookingRouter.get('/my', authenticate, async (req, res, next) => {
  try {
    const userId = req.auth!.userId;
    const tenantId = req.auth!.tenantId;

    const result = await query(
      `SELECT b.*, s.name as service_name, s.duration_minutes,
              a.starts_at, a.ends_at, b.google_meet_url
       FROM bookings b
       JOIN services s ON b.service_id = s.id
       LEFT JOIN availability_slots a ON b.slot_id = a.id
       WHERE b.user_id = $1 AND b.tenant_id = $2
       ORDER BY a.starts_at DESC NULLS LAST`,
      [userId, tenantId],
    );

    res.json({ success: true, data: result.rows });
  } catch (err) {
    next(err);
  }
});

// Hold a slot
bookingRouter.post('/hold', authenticate, validate(holdBookingSchema), async (req, res, next) => {
  try {
    const { serviceId, slotId } = req.body;
    const userId = req.auth!.userId;
    const tenantId = req.auth!.tenantId;

    // Check slot availability
    const slotResult = await query(
      `SELECT * FROM availability_slots WHERE id = $1 AND service_id = $2 AND status = $3
       AND service_id IN (SELECT id FROM services WHERE tenant_id = $4)`,
      [slotId, serviceId, 'AVAILABLE', tenantId],
    );

    if (slotResult.rows.length === 0) {
      throw new AppError(409, 'SLOT_UNAVAILABLE', 'This time slot is no longer available');
    }

    // Get service price
    const serviceResult = await query('SELECT * FROM services WHERE id = $1 AND tenant_id = $2', [serviceId, tenantId]);
    if (serviceResult.rows.length === 0) {
      throw new AppError(404, 'SERVICE_NOT_FOUND', 'Service not found');
    }

    const service = serviceResult.rows[0];
    const bookingId = randomUUID();

    // Create booking hold + update slot status in transaction
    await query('BEGIN');
    try {
      await query(
        'UPDATE availability_slots SET status = $1 WHERE id = $2',
        ['HELD', slotId],
      );
      await query(
        `INSERT INTO bookings (id, tenant_id, user_id, service_id, slot_id, status, total_cents)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [bookingId, tenantId, userId, serviceId, slotId, 'HOLD', service.price_cents],
      );
      await query(
        `INSERT INTO audit_logs (id, actor_user_id, entity_type, entity_id, action, after_json)
         VALUES ($1, $2, 'booking', $3, 'HOLD', $4)`,
        [randomUUID(), userId, bookingId, JSON.stringify({ slotId, serviceId, status: 'HOLD' })],
      );
      await query('COMMIT');
    } catch (err) {
      await query('ROLLBACK');
      throw err;
    }

    logger.info({ bookingId, slotId, serviceId }, 'Booking hold created');

    res.json({
      success: true,
      data: {
        bookingId,
        status: 'HOLD',
        expiresInMinutes: HOLD_EXPIRY_MINUTES,
        service: { name: service.name, priceCents: service.price_cents, currency: service.currency },
      },
    });
  } catch (err) {
    next(err);
  }
});

// Confirm booking
bookingRouter.post('/confirm', authenticate, validate(confirmBookingSchema), async (req, res, next) => {
  try {
    const { bookingId, paymentIntentId, bankReference } = req.body;
    const userId = req.auth!.userId;

    const tenantId = req.auth!.tenantId;

    // Verify booking belongs to user and tenant, and is in PENDING_PAYMENT status
    const bookingResult = await query(
      'SELECT * FROM bookings WHERE id = $1 AND user_id = $2 AND tenant_id = $3 AND status IN ($4, $5)',
      [bookingId, userId, tenantId, 'PENDING_PAYMENT', 'HOLD'],
    );

    if (bookingResult.rows.length === 0) {
      throw new AppError(404, 'BOOKING_NOT_FOUND', 'Booking not found or not in valid state');
    }

    const booking = bookingResult.rows[0];

    await query('BEGIN');
    try {
      // Update booking status
      await query(
        'UPDATE bookings SET status = $1, updated_at = now() WHERE id = $2',
        ['CONFIRMED', bookingId],
      );
      // Update slot status
      await query(
        'UPDATE availability_slots SET status = $1 WHERE id = $2',
        ['BOOKED', booking.slot_id],
      );
      // Audit log
      await query(
        `INSERT INTO audit_logs (id, actor_user_id, entity_type, entity_id, action, before_json, after_json)
         VALUES ($1, $2, 'booking', $3, 'CONFIRMED', $4, $5)`,
        [
          randomUUID(), userId, bookingId,
          JSON.stringify({ status: booking.status }),
          JSON.stringify({ status: 'CONFIRMED', paymentIntentId, bankReference }),
        ],
      );
      await query('COMMIT');
    } catch (err) {
      await query('ROLLBACK');
      throw err;
    }

    logger.info({ bookingId }, 'Booking confirmed');

    // Create Google Calendar event + Meet link
    try {
      const slot = (await query('SELECT * FROM availability_slots WHERE id = $1', [booking.slot_id])).rows[0];
      const service = (await query('SELECT * FROM services WHERE id = $1', [booking.service_id])).rows[0];
      const user = (await query('SELECT * FROM users WHERE id = $1', [userId])).rows[0];

      const { calendarService } = await import('@bookedai/google');
      const calendarResult = await calendarService.createBookingEvent({
        summary: `${service.name} — Longcare AU`,
        description: `Booking ID: ${bookingId}\nService: ${service.name}`,
        startTime: new Date(slot.starts_at),
        endTime: new Date(slot.ends_at),
        attendeeEmail: user.email,
        mentorEmail: process.env.MENTOR_EMAIL || 'ceo@longcare.au',
        createMeetLink: true,
      });

      await query(
        'UPDATE bookings SET google_calendar_event_id = $1, google_meet_url = $2, updated_at = now() WHERE id = $3',
        [calendarResult.eventId, calendarResult.meetUrl, bookingId],
      );

      // Send Gmail confirmation
      const { gmailService } = await import('@bookedai/google');
      await gmailService.sendBookingConfirmation({
        to: user.email,
        userName: user.display_name || user.email,
        serviceName: service.name,
        dateTime: new Date(slot.starts_at).toLocaleString('en-AU', { timeZone: 'Australia/Sydney' }),
        duration: `${Math.round((new Date(slot.ends_at).getTime() - new Date(slot.starts_at).getTime()) / 60000)} minutes`,
        meetUrl: calendarResult.meetUrl || undefined,
        bookingId,
      });

      // Publish booking.paid event to Pub/Sub
      const { pubsubService } = await import('@bookedai/google');
      await pubsubService.publishBookingPaid(bookingId, booking.payment_id || '', booking.total_cents);

      logger.info({ bookingId, eventId: calendarResult.eventId, meetUrl: calendarResult.meetUrl }, 'Calendar + Meet + email created');

      // Trigger booking_confirmed email via notification service
      try {
        await triggerEmail('booking_confirmed', user.email, {
          userName: user.display_name || user.email,
          serviceName: service.name,
          dateTime: new Date(slot.starts_at).toLocaleString('en-AU', { timeZone: 'Australia/Sydney' }),
          duration: `${Math.round((new Date(slot.ends_at).getTime() - new Date(slot.starts_at).getTime()) / 60000)} minutes`,
          bookingRef: bookingId,
          meetLink: calendarResult.meetUrl || '',
        });
      } catch {}
    } catch (err) {
      logger.error({ err, bookingId }, 'Failed to create calendar/email/pubsub events');
      // Non-blocking: booking is confirmed, but calendar/email failed
    }

    res.json({ success: true, data: { bookingId, status: 'CONFIRMED' } });
  } catch (err) {
    next(err);
  }
});

// Cancel booking
bookingRouter.post('/cancel', authenticate, validate(cancelBookingSchema), async (req, res, next) => {
  try {
    const { bookingId, reason } = req.body;
    const userId = req.auth!.userId;

    const tenantId = req.auth!.tenantId;

    const bookingResult = await query(
      'SELECT * FROM bookings WHERE id = $1 AND user_id = $2 AND tenant_id = $3 AND status NOT IN ($4, $5)',
      [bookingId, userId, tenantId, 'CANCELLED', 'REFUNDED'],
    );

    if (bookingResult.rows.length === 0) {
      throw new AppError(404, 'BOOKING_NOT_FOUND', 'Booking not found or already cancelled');
    }

    const booking = bookingResult.rows[0];

    await query('BEGIN');
    try {
      await query('UPDATE bookings SET status = $1, updated_at = now() WHERE id = $2', ['CANCELLED', bookingId]);
      await query('UPDATE availability_slots SET status = $1 WHERE id = $2', ['AVAILABLE', booking.slot_id]);
      await query(
        `INSERT INTO audit_logs (id, actor_user_id, entity_type, entity_id, action, before_json, after_json)
         VALUES ($1, $2, 'booking', $3, 'CANCELLED', $4, $5)`,
        [
          randomUUID(), userId, bookingId,
          JSON.stringify({ status: booking.status }),
          JSON.stringify({ status: 'CANCELLED', reason }),
        ],
      );
      await query('COMMIT');
    } catch (err) {
      await query('ROLLBACK');
      throw err;
    }

    logger.info({ bookingId, reason }, 'Booking cancelled');
    res.json({ success: true, data: { bookingId, status: 'CANCELLED' } });
  } catch (err) {
    next(err);
  }
});

// Reschedule booking
bookingRouter.post('/reschedule', authenticate, validate(rescheduleBookingSchema), async (req, res, next) => {
  try {
    const { bookingId, newSlotId } = req.body;
    const userId = req.auth!.userId;

    const tenantId = req.auth!.tenantId;

    const bookingResult = await query(
      'SELECT * FROM bookings WHERE id = $1 AND user_id = $2 AND tenant_id = $3 AND status = $4',
      [bookingId, userId, tenantId, 'CONFIRMED'],
    );

    if (bookingResult.rows.length === 0) {
      throw new AppError(404, 'BOOKING_NOT_FOUND', 'Booking not found or not confirmed');
    }

    const booking = bookingResult.rows[0];

    // Check new slot is available and belongs to tenant
    const slotResult = await query(
      `SELECT * FROM availability_slots WHERE id = $1 AND status = $2
       AND service_id IN (SELECT id FROM services WHERE tenant_id = $3)`,
      [newSlotId, 'AVAILABLE', tenantId],
    );

    if (slotResult.rows.length === 0) {
      throw new AppError(409, 'SLOT_UNAVAILABLE', 'New time slot is not available');
    }

    await query('BEGIN');
    try {
      // Release old slot
      await query('UPDATE availability_slots SET status = $1 WHERE id = $2', ['AVAILABLE', booking.slot_id]);
      // Book new slot
      await query('UPDATE availability_slots SET status = $1 WHERE id = $2', ['BOOKED', newSlotId]);
      // Update booking
      await query(
        'UPDATE bookings SET slot_id = $1, status = $2, updated_at = now() WHERE id = $3',
        [newSlotId, 'RESCHEDULED', bookingId],
      );
      await query(
        `INSERT INTO audit_logs (id, actor_user_id, entity_type, entity_id, action, before_json, after_json)
         VALUES ($1, $2, 'booking', $3, 'RESCHEDULED', $4, $5)`,
        [
          randomUUID(), userId, bookingId,
          JSON.stringify({ slotId: booking.slot_id, status: booking.status }),
          JSON.stringify({ slotId: newSlotId, status: 'RESCHEDULED' }),
        ],
      );
      await query('COMMIT');
    } catch (err) {
      await query('ROLLBACK');
      throw err;
    }

    logger.info({ bookingId, newSlotId }, 'Booking rescheduled');
    res.json({ success: true, data: { bookingId, status: 'RESCHEDULED', newSlotId } });
  } catch (err) {
    next(err);
  }
});
