import { Router } from 'express';
import Stripe from 'stripe';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { checkoutSchema } from '../schemas/payment.schema.js';
import { query } from '@bookedai/db';
import { getEnv } from '../lib/env.js';
import { AppError } from '../middleware/error-handler.js';
import { logger } from '../lib/logger.js';
import { randomUUID } from 'crypto';

export const paymentRouter = Router();

paymentRouter.post('/checkout', authenticate, validate(checkoutSchema), async (req, res, next) => {
  try {
    const { bookingId, method } = req.body;
    const userId = req.auth!.userId;
    const env = getEnv();

    // Verify booking
    const bookingResult = await query(
      'SELECT b.*, s.name as service_name FROM bookings b JOIN services s ON b.service_id = s.id WHERE b.id = $1 AND b.user_id = $2 AND b.status IN ($3, $4)',
      [bookingId, userId, 'HOLD', 'PENDING_PAYMENT'],
    );

    if (bookingResult.rows.length === 0) {
      throw new AppError(404, 'BOOKING_NOT_FOUND', 'Booking not found or not in valid state');
    }

    const booking = bookingResult.rows[0];
    const paymentId = randomUUID();

    if (method === 'stripe_card') {
      if (!env.STRIPE_SECRET_KEY) {
        throw new AppError(503, 'PAYMENT_UNAVAILABLE', 'Card payment is not configured');
      }

      const stripe = new Stripe(env.STRIPE_SECRET_KEY);
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [{
          price_data: {
            currency: 'aud',
            product_data: { name: booking.service_name },
            unit_amount: booking.total_cents,
          },
          quantity: 1,
        }],
        success_url: `${env.APP_BASE_URL}/booking/success?id=${bookingId}`,
        cancel_url: `${env.APP_BASE_URL}/booking/cancel?id=${bookingId}`,
        metadata: { bookingId, paymentId },
      });

      // Record payment intent
      await query(
        `INSERT INTO payments (id, booking_id, method, status, amount_cents, stripe_payment_intent_id)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [paymentId, bookingId, 'stripe_card', 'PENDING', booking.total_cents, session.payment_intent],
      );
      await query('UPDATE bookings SET status = $1, payment_id = $2, updated_at = now() WHERE id = $3',
        ['PENDING_PAYMENT', paymentId, bookingId]);

      logger.info({ bookingId, paymentId }, 'Stripe checkout session created');
      res.json({ success: true, data: { method: 'stripe_card', checkoutUrl: session.url } });
    } else {
      // Bank transfer instructions
      await query(
        `INSERT INTO payments (id, booking_id, method, status, amount_cents, bank_reference)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [paymentId, bookingId, 'bank_transfer', 'PENDING', booking.total_cents, `BOOK-${bookingId.slice(0, 8).toUpperCase()}`],
      );
      await query('UPDATE bookings SET status = $1, payment_id = $2, updated_at = now() WHERE id = $3',
        ['PENDING_PAYMENT', paymentId, bookingId]);

      logger.info({ bookingId, paymentId }, 'Bank transfer instructions generated');
      res.json({
        success: true,
        data: {
          method: 'bank_transfer',
          instructions: {
            payId: env.BANK_TRANSFER_PAYID,
            bsb: env.BANK_TRANSFER_BSB,
            accountNumber: env.BANK_TRANSFER_ACCOUNT_NUMBER,
            accountName: env.BANK_TRANSFER_ACCOUNT_NAME,
            amount: (booking.total_cents / 100).toFixed(2),
            currency: 'AUD',
            reference: `BOOK-${bookingId.slice(0, 8).toUpperCase()}`,
          },
        },
      });
    }
  } catch (err) {
    next(err);
  }
});
