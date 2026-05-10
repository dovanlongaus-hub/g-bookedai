import { describe, it, expect } from 'vitest';
import { checkoutSchema, PAYMENT_METHODS } from './payment.schema.js';

const VALID_UUID = '550e8400-e29b-41d4-a716-446655440000';

describe('Payment Schema', () => {
  it.each(PAYMENT_METHODS)('accepts %s', (method) => {
    expect(checkoutSchema.parse({ bookingId: VALID_UUID, method })).toEqual({
      bookingId: VALID_UUID,
      method,
    });
  });

  it('rejects invalid payment method', () => {
    expect(() => checkoutSchema.parse({ bookingId: VALID_UUID, method: 'paypal' })).toThrow();
  });

  it('rejects legacy "bank_transfer" alias (callers must pick a specific QR type)', () => {
    expect(() => checkoutSchema.parse({ bookingId: VALID_UUID, method: 'bank_transfer' })).toThrow();
  });

  it('rejects missing bookingId', () => {
    expect(() => checkoutSchema.parse({ method: 'stripe_card' })).toThrow();
  });
});
