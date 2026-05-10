/**
 * API client for booking-web.
 *
 * In the browser, calls go through Next.js API route proxies (/api/*)
 * which forward to the real backend API.
 * NEXT_PUBLIC_API_URL is used for direct calls if needed (e.g., from Docker).
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

/** Use proxy routes in the browser, direct API on the server */
function getBaseUrl(): string {
  if (typeof window !== 'undefined') {
    // Browser: use Next.js API proxy routes (same-origin)
    return '';
  }
  // Server-side: call the backend directly
  return process.env.API_URL || 'http://localhost:8180';
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price_cents: number;
  currency: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: { code: string; message: string };
}

export interface GuestBookingData {
  bookingId: string;
  bookingRef: string;
  meetLink: string;
  status: string;
  service: { name: string; priceCents: number };
  message: string;
}

/**
 * Fetch all active services.
 */
export async function fetchServices(): Promise<Service[]> {
  const res = await fetch(`${getBaseUrl()}/api/services`);
  const json: ApiResponse<Service[]> = await res.json();
  if (json.success) return json.data;
  throw new Error(json.error?.message || 'Failed to fetch services');
}

/**
 * Create a guest booking (no auth required).
 */
export async function createGuestBooking(params: {
  serviceId: string;
  slotTime: string;
  sessionCount?: number;
  name: string;
  email: string;
  phone?: string;
  paymentMethod: 'stripe' | 'bank_transfer' | 'pay_later';
}): Promise<GuestBookingData> {
  const res = await fetch(`${getBaseUrl()}/api/guest-booking`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  let json: ApiResponse<GuestBookingData> | null = null;
  try {
    json = await res.json();
  } catch {
    throw new Error(`Booking service returned an invalid response (HTTP ${res.status}).`);
  }
  if (json?.success) return json.data;
  throw new Error(json?.error?.message || `Failed to create booking (HTTP ${res.status})`);
}

/**
 * Hold a booking slot (requires auth token).
 */
export async function holdSlot(
  serviceId: string,
  slotId: string,
  token?: string,
): Promise<any> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${getBaseUrl()}/api/booking`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ _action: 'hold', serviceId, slotId }),
  });
  const json = await res.json();
  if (json.success) return json.data;
  throw new Error(json.error?.message || 'Failed to hold slot');
}

/**
 * Create a Stripe checkout session for guest (no auth).
 */
export async function createGuestCheckout(serviceId: string): Promise<{ checkoutUrl: string }> {
  const res = await fetch(`${getBaseUrl()}/api/payment/guest-checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ serviceId }),
  });
  const json: ApiResponse<{ checkoutUrl: string }> = await res.json();
  if (json.success) return json.data;
  throw new Error(json.error?.message || 'Payment service unavailable');
}

/**
 * Create a Stripe checkout session (auth required).
 */
export async function createCheckout(
  bookingId: string,
  method: 'stripe_card' | 'bank_transfer',
  token?: string,
): Promise<any> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${getBaseUrl()}/api/booking`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ _action: 'checkout', bookingId, method }),
  });
  const json = await res.json();
  if (json.success) return json.data;
  throw new Error(json.error?.message || 'Failed to create checkout');
}
