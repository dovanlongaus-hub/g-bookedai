import type { NotificationType } from '@bookedai/shared';
import { sendEmail } from './email.js';
import { sampleTemplateData } from '../templates/index.js';
import { logger } from '../lib/logger.js';

const ALL_TYPES: NotificationType[] = [
  'booking_confirmed',
  'reminder_24h',
  'booking_cancelled',
  'booking_rescheduled',
  'payment_received',
  'session_summary_ready',
  'welcome',
];

/**
 * Send a test email for a specific template type
 */
export async function sendTestEmail(
  type: NotificationType,
  to: string,
): Promise<{ success: boolean; type: NotificationType; error?: string }> {
  try {
    const data = sampleTemplateData[type] || { userName: 'Test User' };
    await sendEmail(type, to, data);
    logger.info({ type, to }, 'Test email sent successfully');
    return { success: true, type };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    logger.error({ err, type, to }, 'Test email failed');
    return { success: false, type, error: message };
  }
}

/**
 * Send test emails for ALL template types to a specified address
 */
export async function sendAllTestEmails(
  to: string,
): Promise<Array<{ success: boolean; type: NotificationType; error?: string }>> {
  const results = [];

  for (const type of ALL_TYPES) {
    const result = await sendTestEmail(type, to);
    results.push(result);
    // Small delay between sends to avoid rate limiting
    await new Promise((r) => setTimeout(r, 500));
  }

  return results;
}
