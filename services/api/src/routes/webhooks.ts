import { Router, raw } from 'express';
import Stripe from 'stripe';
import { getEnv } from '../lib/env.js';
import { query } from '@bookedai/db';
import { logger } from '../lib/logger.js';
import { triggerEmail } from '../lib/send-email.js';

export const webhookRouter = Router();

webhookRouter.post('/stripe', raw({ type: 'application/json' }), async (req, res) => {
  const env = getEnv();

  if (!env.STRIPE_SECRET_KEY || !env.STRIPE_WEBHOOK_SECRET) {
    logger.error('Stripe webhook keys not configured');
    res.status(503).json({ error: 'Webhook not configured' });
    return;
  }

  const stripe = new Stripe(env.STRIPE_SECRET_KEY);
  const sig = req.headers['stripe-signature'];

  if (!sig) {
    logger.warn('Missing stripe-signature header');
    res.status(400).json({ error: 'Missing signature' });
    return;
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    logger.warn({ err }, 'Invalid Stripe webhook signature');
    res.status(400).json({ error: 'Invalid signature' });
    return;
  }

  logger.info({ type: event.type, id: event.id }, 'Stripe webhook received');

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const bookingId = session.metadata?.bookingId;
      const paymentId = session.metadata?.paymentId;

      if (bookingId && paymentId) {
        await query(
          'UPDATE payments SET status = $1, paid_at = now() WHERE id = $2',
          ['SUCCEEDED', paymentId],
        );
        await query('UPDATE bookings SET status = $1, updated_at = now() WHERE id = $2', ['CONFIRMED', bookingId]);
        logger.info({ bookingId, paymentId }, 'Payment succeeded, booking confirmed');

        // Side-effects (Calendar/Meet/email) must not roll back the payment confirmation
        // above — any failure here is recorded to audit_logs so an admin can retry.
        await runPostPaymentSideEffects({ bookingId, paymentId, amountTotal: session.amount_total || 0 });
      }
      break;
    }
    case 'checkout.session.expired': {
      const session = event.data.object as Stripe.Checkout.Session;
      const bookingId = session.metadata?.bookingId;
      const paymentId = session.metadata?.paymentId;

      if (bookingId && paymentId) {
        await query('UPDATE payments SET status = $1 WHERE id = $2', ['FAILED', paymentId]);
        // Release the slot back to HOLD state so the user can retry, or mark for cleanup.
        await query(
          `UPDATE bookings SET status = $1, updated_at = now()
           WHERE id = $2 AND status = 'PENDING_PAYMENT'`,
          ['CANCELLED', bookingId],
        );
        logger.info({ bookingId, paymentId }, 'Payment session expired, booking cancelled');
      }
      break;
    }
  }

  res.json({ received: true });
});

type PostPaymentInput = { bookingId: string; paymentId: string; amountTotal: number };

async function runPostPaymentSideEffects(input: PostPaymentInput): Promise<void> {
  const { bookingId, paymentId, amountTotal } = input;
  const failures: { step: string; error: string }[] = [];

  let booking: any;
  let slot: any;
  let service: any;
  let user: any;
  try {
    booking = (await query('SELECT * FROM bookings WHERE id = $1', [bookingId])).rows[0];
    slot = (await query('SELECT * FROM availability_slots WHERE id = $1', [booking.slot_id])).rows[0];
    service = (await query('SELECT * FROM services WHERE id = $1', [booking.service_id])).rows[0];
    user = (await query('SELECT * FROM users WHERE id = $1', [booking.user_id])).rows[0];
  } catch (err) {
    logger.error({ err, bookingId }, 'Failed to load booking context for post-payment processing');
    await recordPostPaymentFailure(bookingId, paymentId, [{ step: 'load_context', error: String(err) }]);
    return;
  }

  const { calendarService, gmailService, pubsubService } = await import('@bookedai/google');

  let meetUrl: string | undefined;
  try {
    const calendarResult = await calendarService.createBookingEvent({
      summary: `${service.name} — Longcare AU`,
      description: `Booking ID: ${bookingId}`,
      startTime: new Date(slot.starts_at),
      endTime: new Date(slot.ends_at),
      attendeeEmail: user.email,
      mentorEmail: process.env.MENTOR_EMAIL || 'ceo@longcare.au',
      createMeetLink: true,
    });
    await query(
      'UPDATE bookings SET google_calendar_event_id = $1, google_meet_url = $2 WHERE id = $3',
      [calendarResult.eventId, calendarResult.meetUrl, bookingId],
    );
    meetUrl = calendarResult.meetUrl || undefined;
  } catch (err) {
    failures.push({ step: 'calendar', error: String(err) });
    logger.error({ err, bookingId }, 'Calendar/Meet creation failed');
  }

  try {
    await gmailService.sendBookingConfirmation({
      to: user.email,
      userName: user.display_name || user.email,
      serviceName: service.name,
      dateTime: new Date(slot.starts_at).toLocaleString('en-AU', { timeZone: 'Australia/Sydney' }),
      duration: `${Math.round((new Date(slot.ends_at).getTime() - new Date(slot.starts_at).getTime()) / 60000)} minutes`,
      meetUrl,
      bookingId,
    });
  } catch (err) {
    failures.push({ step: 'gmail_confirmation', error: String(err) });
    logger.error({ err, bookingId }, 'Booking confirmation email failed');
  }

  try {
    await pubsubService.publishBookingPaid(bookingId, paymentId, amountTotal);
  } catch (err) {
    failures.push({ step: 'pubsub_publish', error: String(err) });
    logger.error({ err, bookingId }, 'Pub/Sub publish failed');
  }

  try {
    await triggerEmail('payment_received', user.email, {
      userName: user.display_name || user.email,
      serviceName: service.name,
      amount: `$${(amountTotal / 100).toFixed(2)} AUD`,
      paymentMethod: 'stripe',
      reference: paymentId,
    });
  } catch (err) {
    failures.push({ step: 'notification_payment_received', error: String(err) });
    logger.error({ err, bookingId }, 'payment_received notification failed');
  }

  if (failures.length > 0) {
    await recordPostPaymentFailure(bookingId, paymentId, failures);
  }
}

async function recordPostPaymentFailure(
  bookingId: string,
  paymentId: string,
  failures: { step: string; error: string }[],
): Promise<void> {
  try {
    await query(
      `INSERT INTO audit_logs (actor_user_id, entity_type, entity_id, action, before_json, after_json)
       VALUES (NULL, 'booking', $1, 'POST_PAYMENT_PROCESSING_FAILED', $2, $3)`,
      [bookingId, JSON.stringify({ paymentId }), JSON.stringify({ failures })],
    );
  } catch (err) {
    // Audit log itself failed — last-resort log so we at least see it in Cloud Logging
    logger.error({ err, bookingId, failures }, 'Failed to record post-payment failure in audit_logs');
  }
}
