export const BOOKING_STATUSES = [
  'DRAFT',
  'HOLD',
  'PENDING_PAYMENT',
  'CONFIRMED',
  'RESCHEDULED',
  'CANCELLED',
  'REFUNDED',
  'NO_SHOW',
] as const;

export type BookingStatus = (typeof BOOKING_STATUSES)[number];

export interface Booking {
  id: string;
  tenantId: string;
  userId: string;
  serviceId: string;
  slotId: string;
  status: BookingStatus;
  totalCents: number;
  paymentId?: string;
  googleCalendarEventId?: string;
  googleMeetUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AvailabilitySlot {
  id: string;
  serviceId: string;
  startsAt: Date;
  endsAt: Date;
  status: 'AVAILABLE' | 'HELD' | 'BOOKED';
}
