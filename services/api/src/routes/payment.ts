import { Router, type Response } from 'express';
import Stripe from 'stripe';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { checkoutSchema, type PaymentMethod } from '../schemas/payment.schema.js';
import { query } from '@bookedai/db';
import { getEnv } from '../lib/env.js';
import { AppError } from '../middleware/error-handler.js';
import { logger } from '../lib/logger.js';
import { randomUUID } from 'crypto';
import {
  buildPayIdPayload,
  buildBpayPayload,
  buildVietQrPayload,
} from '../lib/qr-bank.js';

export const paymentRouter = Router();

const buildBookingReference = (bookingId: string): string =>
  `BOOK-${bookingId.slice(0, 8).toUpperCase()}`;

const stripePaymentMethods = (env: ReturnType<typeof getEnv>): Stripe.Checkout.SessionCreateParams.PaymentMethodType[] =>
  env.STRIPE_PAYMENT_METHODS
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean) as Stripe.Checkout.SessionCreateParams.PaymentMethodType[];

// Guest checkout — no auth required (for public booking page)
paymentRouter.post('/guest-checkout', async (req, res, next) => {
  try {
    const { serviceId } = req.body;
    const env = getEnv();

    if (!serviceId) {
      res.status(400).json({ success: false, error: { code: 'MISSING_SERVICE', message: 'serviceId required' } });
      return;
    }

    const serviceResult = await query('SELECT * FROM services WHERE id = $1 AND active = true', [serviceId]);
    if (serviceResult.rows.length === 0) {
      res.status(404).json({ success: false, error: { code: 'SERVICE_NOT_FOUND', message: 'Service not found' } });
      return;
    }

    const service = serviceResult.rows[0];

    if (!env.STRIPE_SECRET_KEY) {
      res.status(503).json({ success: false, error: { code: 'PAYMENT_UNAVAILABLE', message: 'Stripe not configured' } });
      return;
    }

    const stripe = new Stripe(env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: stripePaymentMethods(env),
      line_items: [{
        price_data: {
          currency: 'aud',
          product_data: {
            name: service.name,
            description: service.description || 'AI Mentoring Session — Longcare AU',
          },
          unit_amount: service.price_cents,
        },
        quantity: 1,
      }],
      success_url: 'https://book.longcare.au?success=true',
      cancel_url: 'https://book.longcare.au?cancelled=true',
      metadata: { serviceId: service.id, serviceName: service.name },
    });

    logger.info({ serviceId, sessionId: session.id }, 'Guest Stripe checkout created');
    res.json({ success: true, data: { checkoutUrl: session.url } });
  } catch (err) {
    next(err);
  }
});

// Authenticated checkout — branches on payment method
paymentRouter.post('/checkout', authenticate, validate(checkoutSchema), async (req, res, next) => {
  try {
    const { bookingId, method } = req.body as { bookingId: string; method: PaymentMethod };
    const userId = req.auth!.userId;
    const env = getEnv();

    const bookingResult = await query(
      'SELECT b.*, s.name as service_name FROM bookings b JOIN services s ON b.service_id = s.id WHERE b.id = $1 AND b.user_id = $2 AND b.status IN ($3, $4)',
      [bookingId, userId, 'HOLD', 'PENDING_PAYMENT'],
    );

    if (bookingResult.rows.length === 0) {
      throw new AppError(404, 'BOOKING_NOT_FOUND', 'Booking not found or not in valid state');
    }

    const booking = bookingResult.rows[0];
    const paymentId = randomUUID();
    const reference = buildBookingReference(bookingId);

    switch (method) {
      case 'stripe_card':
        return await handleStripeCheckout({ res, env, booking, bookingId, paymentId });

      case 'bank_transfer_payid':
        return await handlePayId({ res, env, booking, bookingId, paymentId, reference });

      case 'bank_transfer_bpay':
        return await handleBpay({ res, env, booking, bookingId, paymentId, reference });

      case 'bank_transfer_vietqr':
        return await handleVietQr({ res, env, booking, bookingId, paymentId, reference });

      case 'pay_on_arrival':
        return await handlePayOnArrival({ res, env, booking, bookingId, paymentId });
    }
  } catch (err) {
    next(err);
  }
});

// === Handlers ===

type HandlerCtx = {
  res: Response;
  env: ReturnType<typeof getEnv>;
  booking: any;
  bookingId: string;
  paymentId: string;
  reference?: string;
};

async function handleStripeCheckout(ctx: HandlerCtx) {
  const { res, env, booking, bookingId, paymentId } = ctx;
  if (!env.STRIPE_SECRET_KEY) {
    throw new AppError(503, 'PAYMENT_UNAVAILABLE', 'Card payment is not configured');
  }
  const stripe = new Stripe(env.STRIPE_SECRET_KEY);
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: stripePaymentMethods(env),
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

  await query(
    `INSERT INTO payments (id, booking_id, method, status, amount_cents, stripe_payment_intent_id)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [paymentId, bookingId, 'stripe_card', 'PENDING', booking.total_cents, session.payment_intent],
  );
  await query('UPDATE bookings SET status = $1, payment_id = $2, updated_at = now() WHERE id = $3',
    ['PENDING_PAYMENT', paymentId, bookingId]);

  logger.info({ bookingId, paymentId }, 'Stripe checkout session created');
  res.json({ success: true, data: { method: 'stripe_card', checkoutUrl: session.url } });
}

async function handlePayId(ctx: HandlerCtx) {
  const { res, env, booking, bookingId, paymentId, reference } = ctx;
  const payload = buildPayIdPayload(
    env.BANK_TRANSFER_PAYID,
    { amountCents: booking.total_cents, reference: reference!, payeeName: env.BANK_TRANSFER_ACCOUNT_NAME },
    env.BANK_TRANSFER_BSB,
    env.BANK_TRANSFER_ACCOUNT_NUMBER,
    env.BANK_TRANSFER_BANK_NAME,
  );

  await query(
    `INSERT INTO payments (id, booking_id, method, status, amount_cents, bank_reference, qr_payload)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [paymentId, bookingId, 'bank_transfer_payid', 'PENDING', booking.total_cents, reference, payload.uri],
  );
  await query('UPDATE bookings SET status = $1, payment_id = $2, updated_at = now() WHERE id = $3',
    ['PENDING_PAYMENT', paymentId, bookingId]);

  logger.info({ bookingId, paymentId }, 'PayID payment created');
  res.json({ success: true, data: { method: 'bank_transfer_payid', payment: payload } });
}

async function handleBpay(ctx: HandlerCtx) {
  const { res, env, booking, bookingId, paymentId, reference } = ctx;
  if (!env.BPAY_BILLER_CODE) {
    throw new AppError(503, 'BPAY_UNAVAILABLE', 'BPAY biller code is not configured');
  }
  const payload = buildBpayPayload(env.BPAY_BILLER_CODE, {
    amountCents: booking.total_cents,
    reference: reference!,
    payeeName: env.BANK_TRANSFER_ACCOUNT_NAME,
  });

  await query(
    `INSERT INTO payments (id, booking_id, method, status, amount_cents, bank_reference, qr_payload)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [paymentId, bookingId, 'bank_transfer_bpay', 'PENDING', booking.total_cents, reference, payload.uri],
  );
  await query('UPDATE bookings SET status = $1, payment_id = $2, updated_at = now() WHERE id = $3',
    ['PENDING_PAYMENT', paymentId, bookingId]);

  logger.info({ bookingId, paymentId }, 'BPAY payment created');
  res.json({ success: true, data: { method: 'bank_transfer_bpay', payment: payload } });
}

async function handleVietQr(ctx: HandlerCtx) {
  const { res, env, booking, bookingId, paymentId, reference } = ctx;
  if (!env.VIETQR_BANK_BIN || !env.VIETQR_ACCOUNT_NUMBER || !env.VIETQR_ACCOUNT_NAME) {
    throw new AppError(503, 'VIETQR_UNAVAILABLE', 'VietQR receiver account is not configured');
  }
  // VietQR is VND only — convert AUD cents to VND using a configurable rate.
  // For now we don't auto-convert: callers must price the service in VND or
  // the customer pays the AUD-equivalent and the difference is reconciled
  // manually. We pass the AUD numeric value; future work should call FX.
  const payload = buildVietQrPayload(
    env.VIETQR_BANK_BIN,
    env.VIETQR_ACCOUNT_NUMBER,
    env.VIETQR_ACCOUNT_NAME,
    reference!,
    Math.round(booking.total_cents / 100), // dong-equivalent placeholder
  );

  await query(
    `INSERT INTO payments (id, booking_id, method, status, amount_cents, bank_reference, qr_payload)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [paymentId, bookingId, 'bank_transfer_vietqr', 'PENDING', booking.total_cents, reference, payload.emvString],
  );
  await query('UPDATE bookings SET status = $1, payment_id = $2, updated_at = now() WHERE id = $3',
    ['PENDING_PAYMENT', paymentId, bookingId]);

  logger.info({ bookingId, paymentId }, 'VietQR payment created');
  res.json({ success: true, data: { method: 'bank_transfer_vietqr', payment: payload } });
}

async function handlePayOnArrival(ctx: HandlerCtx) {
  const { res, env, booking, bookingId, paymentId } = ctx;
  if (!env.PAY_ON_ARRIVAL_ENABLED) {
    throw new AppError(403, 'PAY_ON_ARRIVAL_DISABLED', 'Pay-on-arrival is not enabled');
  }
  // Slot is in availability_slots; due_at = slot.starts_at (collect at appointment)
  const slot = (await query('SELECT * FROM availability_slots WHERE id = $1', [booking.slot_id])).rows[0];

  await query(
    `INSERT INTO payments (id, booking_id, method, status, amount_cents, due_at)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [paymentId, bookingId, 'pay_on_arrival', 'DEFERRED', booking.total_cents, slot?.starts_at ?? null],
  );
  // Booking goes to CONFIRMED so Calendar/Meet/email all fire — but no money has changed hands.
  await query('UPDATE bookings SET status = $1, payment_id = $2, updated_at = now() WHERE id = $3',
    ['CONFIRMED', paymentId, bookingId]);

  logger.info({ bookingId, paymentId, dueAt: slot?.starts_at }, 'Pay-on-arrival booking confirmed (deferred payment)');
  res.json({
    success: true,
    data: {
      method: 'pay_on_arrival',
      status: 'DEFERRED',
      dueAt: slot?.starts_at,
      amountAud: (booking.total_cents / 100).toFixed(2),
      message: 'Booking confirmed. Payment will be collected at your appointment.',
    },
  });
}
