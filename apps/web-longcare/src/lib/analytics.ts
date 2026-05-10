// Type-safe wrapper around gtag for GA4 events.
// Usage:
//   import { trackEvent } from '@/lib/analytics';
//   trackEvent('lead_submit', { source: 'newsletter', email_hash: '...' });

declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js' | 'set' | 'consent',
      target: string,
      params?: Record<string, unknown>,
    ) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

export type AnalyticsEvent =
  | { name: 'page_view'; params?: { page_path: string; page_title?: string } }
  // Conversion funnel
  | { name: 'lead_submit'; params: { source: string; tool?: string; tier?: string } }
  | { name: 'cta_click'; params: { cta_label: string; destination: string; section?: string } }
  | { name: 'booking_start'; params: { service: string; price_aud?: number } }
  | { name: 'newsletter_signup'; params: { source: string } }
  // Assessment
  | { name: 'assessment_start'; params: { source?: string } }
  | { name: 'assessment_step'; params: { step: number; total: number } }
  | { name: 'assessment_complete'; params: { score: number; tier: string } }
  | { name: 'assessment_share'; params: { method: 'email' | 'copy' } }
  // Engagement
  | { name: 'chat_open'; params?: { trigger: 'auto' | 'manual' } }
  | { name: 'chat_message'; params: { role: 'user' | 'assistant'; length: number } }
  | { name: 'chat_close'; params?: { duration_s?: number } }
  | { name: 'popup_show'; params: { popup: string } }
  | { name: 'popup_dismiss'; params: { popup: string; ttl_s?: number } }
  | { name: 'popup_convert'; params: { popup: string } }
  // Errors
  | { name: 'app_error'; params: { error: string; route?: string } };

export function trackEvent<E extends AnalyticsEvent>(
  name: E['name'],
  params?: E['params'],
): void {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') return;
  try {
    window.gtag('event', name, params || {});
  } catch {
    // never fail the user flow because of analytics
  }
}

// Hash an email client-side for privacy-safe attribution (SHA-256, first 16 hex chars).
export async function hashEmail(email: string): Promise<string> {
  if (typeof window === 'undefined' || !window.crypto?.subtle) return '';
  const encoded = new TextEncoder().encode(email.trim().toLowerCase());
  const buf = await window.crypto.subtle.digest('SHA-256', encoded);
  return Array.from(new Uint8Array(buf))
    .slice(0, 8)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}
