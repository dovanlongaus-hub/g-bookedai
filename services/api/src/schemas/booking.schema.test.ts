import { describe, it, expect } from 'vitest';
import {
  holdBookingSchema,
  confirmBookingSchema,
  cancelBookingSchema,
  rescheduleBookingSchema,
} from './booking.schema.js';

describe('Booking Schemas', () => {
  describe('holdBookingSchema', () => {
    it('accepts valid hold input', () => {
      const input = {
        serviceId: '550e8400-e29b-41d4-a716-446655440000',
        slotId: '550e8400-e29b-41d4-a716-446655440001',
      };
      expect(holdBookingSchema.parse(input)).toEqual(input);
    });

    it('rejects non-UUID serviceId', () => {
      expect(() =>
        holdBookingSchema.parse({ serviceId: 'not-a-uuid', slotId: '550e8400-e29b-41d4-a716-446655440001' }),
      ).toThrow();
    });

    it('rejects missing fields', () => {
      expect(() => holdBookingSchema.parse({})).toThrow();
    });
  });

  describe('confirmBookingSchema', () => {
    it('accepts valid confirm input', () => {
      const input = { bookingId: '550e8400-e29b-41d4-a716-446655440000' };
      expect(confirmBookingSchema.parse(input)).toEqual(input);
    });

    it('accepts with optional paymentIntentId', () => {
      const input = {
        bookingId: '550e8400-e29b-41d4-a716-446655440000',
        paymentIntentId: 'pi_test_123',
      };
      expect(confirmBookingSchema.parse(input)).toEqual(input);
    });
  });

  describe('cancelBookingSchema', () => {
    it('accepts cancel with reason', () => {
      const input = {
        bookingId: '550e8400-e29b-41d4-a716-446655440000',
        reason: 'Schedule conflict',
      };
      expect(cancelBookingSchema.parse(input)).toEqual(input);
    });

    it('rejects reason exceeding 500 chars', () => {
      expect(() =>
        cancelBookingSchema.parse({
          bookingId: '550e8400-e29b-41d4-a716-446655440000',
          reason: 'a'.repeat(501),
        }),
      ).toThrow();
    });
  });

  describe('rescheduleBookingSchema', () => {
    it('accepts valid reschedule input', () => {
      const input = {
        bookingId: '550e8400-e29b-41d4-a716-446655440000',
        newSlotId: '550e8400-e29b-41d4-a716-446655440001',
      };
      expect(rescheduleBookingSchema.parse(input)).toEqual(input);
    });
  });
});
