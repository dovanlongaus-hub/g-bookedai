import { z } from 'zod';

export const PAYMENT_METHODS = [
  'stripe_card',
  'bank_transfer_payid',
  'bank_transfer_bpay',
  'bank_transfer_vietqr',
  'pay_on_arrival',
] as const;

export type PaymentMethod = typeof PAYMENT_METHODS[number];

export const checkoutSchema = z.object({
  bookingId: z.string().uuid(),
  method: z.enum(PAYMENT_METHODS),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
