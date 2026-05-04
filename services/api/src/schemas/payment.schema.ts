import { z } from 'zod';

export const checkoutSchema = z.object({
  bookingId: z.string().uuid(),
  method: z.enum(['stripe_card', 'bank_transfer']),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
