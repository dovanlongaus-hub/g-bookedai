import { logger } from './logger.js';

export type EmailType =
  | 'booking_confirmed'
  | 'payment_received'
  | 'reminder_24h'
  | 'welcome';

/**
 * Trigger an email notification via the notification service.
 * Never throws — errors are logged but don't block the main flow.
 */
export async function triggerEmail(
  type: EmailType,
  to: string,
  data: Record<string, unknown>,
): Promise<boolean> {
  try {
    // Try direct import of notification service (same monorepo)
    try {
      // Dynamic import avoids compile-time path resolution issues
      const notifModule = await import(/* webpackIgnore: true */ '../../../../notification/src/index.js' as string);
      if (notifModule?.sendNotification) {
        await notifModule.sendNotification({
          type,
          channels: ['email'],
          recipientEmail: to,
          data,
        });
        logger.info({ type, to }, 'Email sent via direct import');
        return true;
      }
    } catch {
      // Direct import failed, fall back to HTTP
    }

    // Fallback: call notification service via internal Docker network
    const notifyUrl = process.env.NOTIFICATION_URL || 'http://notification:8082';
    const response = await fetch(`${notifyUrl}/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type,
        channels: ['email'],
        recipientEmail: to,
        data,
      }),
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      logger.warn({ type, to, status: response.status }, 'Email HTTP request failed');
      return false;
    }

    logger.info({ type, to }, 'Email sent via HTTP');
    return true;
  } catch (err) {
    logger.error({ err, type, to }, 'Failed to trigger email (non-blocking)');
    return false;
  }
}
