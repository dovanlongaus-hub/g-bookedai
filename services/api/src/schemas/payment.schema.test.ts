import { describe, it, expect } from 'vitest';
import { checkoutSchema } from './payment.schema.js';

describe('Payment Schema', () => {
  it('accepts stripe_card checkout', () => {
    const input = {
      bookingId: '550e8400-e29b-41d4-a716-446655440000',
      method: 'stripe_card' as const,
    };
    expect(checkoutSchema.parse(input)).toEqual(input);
  });

  it('accepts bank_transfer checkout', () => {
    const input = {
      bookingId: '550e8400-e29b-41d4-a716-446655440000',
      method: 'bank_transfer' as const,
    };
    expect(checkoutSchema.parse(input)).toEqual(input);
  });

  it('rejects invalid payment method', () => {
    expect(() =>
      checkoutSchema.parse({
        bookingId: '550e8400-e29b-41d4-a716-446655440000',
        method: 'paypal',
      }),
    ).toThrow();
  });

  it('rejects missing bookingId', () => {
    expect(() => checkoutSchema.parse({ method: 'stripe_card' })).toThrow();
  });
});
