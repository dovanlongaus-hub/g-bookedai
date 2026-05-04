import { z } from 'zod';
import { BOOKING_STATUSES } from '@bookedai/shared';

export const holdBookingSchema = z.object({
  serviceId: z.string().uuid(),
  slotId: z.string().uuid(),
});

export const confirmBookingSchema = z.object({
  bookingId: z.string().uuid(),
  paymentIntentId: z.string().optional(),
  bankReference: z.string().optional(),
});

export const cancelBookingSchema = z.object({
  bookingId: z.string().uuid(),
  reason: z.string().max(500).optional(),
});

export const rescheduleBookingSchema = z.object({
  bookingId: z.string().uuid(),
  newSlotId: z.string().uuid(),
});

export type HoldBookingInput = z.infer<typeof holdBookingSchema>;
export type ConfirmBookingInput = z.infer<typeof confirmBookingSchema>;
export type CancelBookingInput = z.infer<typeof cancelBookingSchema>;
export type RescheduleBookingInput = z.infer<typeof rescheduleBookingSchema>;
