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
        await query('UPDATE payments SET status = $1 WHERE id = $2', ['SUCCEEDED', paymentId]);
        await query('UPDATE bookings SET status = $1, updated_at = now() WHERE id = $2', ['CONFIRMED', bookingId]);
        logger.info({ bookingId, paymentId }, 'Payment succeeded, booking confirmed');

        // Create Calendar + Meet and send confirmation
        try {
          const booking = (await query('SELECT * FROM bookings WHERE id = $1', [bookingId])).rows[0];
          const slot = (await query('SELECT * FROM availability_slots WHERE id = $1', [booking.slot_id])).rows[0];
          const service = (await query('SELECT * FROM services WHERE id = $1', [booking.service_id])).rows[0];
          const user = (await query('SELECT * FROM users WHERE id = $1', [booking.user_id])).rows[0];

          const { calendarService, gmailService, pubsubService } = await import('@bookedai/google');

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

          await gmailService.sendBookingConfirmation({
            to: user.email,
            userName: user.display_name || user.email,
            serviceName: service.name,
            dateTime: new Date(slot.starts_at).toLocaleString('en-AU', { timeZone: 'Australia/Sydney' }),
            duration: `${Math.round((new Date(slot.ends_at).getTime() - new Date(slot.starts_at).getTime()) / 60000)} minutes`,
            meetUrl: calendarResult.meetUrl || undefined,
            bookingId: bookingId!,
          });

          await pubsubService.publishBookingPaid(bookingId!, paymentId!, session.amount_total || 0);

          // Send payment_received email via notification service
          try {
            await triggerEmail('payment_received', user.email, {
              userName: user.display_name || user.email,
              serviceName: service.name,
              amount: `$${((session.amount_total || 0) / 100).toFixed(2)} AUD`,
              paymentMethod: 'stripe',
              reference: paymentId!,
            });
          } catch {}
        } catch (calErr) {
          logger.error({ calErr, bookingId }, 'Post-payment processing failed');
        }
      }
      break;
    }
    case 'checkout.session.expired': {
      const session = event.data.object as Stripe.Checkout.Session;
      const bookingId = session.metadata?.bookingId;
      const paymentId = session.metadata?.paymentId;

      if (bookingId && paymentId) {
        await query('UPDATE payments SET status = $1 WHERE id = $2', ['FAILED', paymentId]);
        logger.info({ bookingId, paymentId }, 'Payment session expired');
      }
      break;
    }
  }

  res.json({ received: true });
});
