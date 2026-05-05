import admin from 'firebase-admin';
import { logger } from '../lib/logger.js';

// Reuse Firebase Admin app if already initialized (e.g. by @bookedai/google)
function getApp(): admin.app.App {
  if (!admin.apps.length) {
    admin.initializeApp({
      projectId: process.env.GOOGLE_CLOUD_PROJECT || 'longcare-dev',
    });
  }
  return admin.app();
}

export type PushNotificationType =
  | 'booking_confirmed'
  | 'reminder_24h'
  | 'booking_cancelled'
  | 'payment_received'
  | 'session_summary_ready';

const PUSH_TITLES: Record<PushNotificationType, string> = {
  booking_confirmed: 'Booking Confirmed',
  reminder_24h: 'Upcoming Session Reminder',
  booking_cancelled: 'Booking Cancelled',
  payment_received: 'Payment Received',
  session_summary_ready: 'Session Summary Ready',
};

export async function sendPushNotification(
  token: string,
  title: string,
  body: string,
  data?: Record<string, string>,
): Promise<boolean> {
  try {
    const messaging = getApp().messaging();

    const messageId = await messaging.send({
      token,
      notification: { title, body },
      data: data || {},
      android: {
        priority: 'high',
        notification: { channelId: 'bookedai_default' },
      },
      apns: {
        payload: { aps: { badge: 1, sound: 'default' } },
      },
      webpush: {
        headers: { Urgency: 'high' },
        notification: { icon: '/icons/icon-192x192.png' },
      },
    });

    logger.info({ messageId, title }, 'Push notification sent');
    return true;
  } catch (err: any) {
    // If token is invalid/expired, log specifically so caller can clean up
    if (
      err?.code === 'messaging/registration-token-not-registered' ||
      err?.code === 'messaging/invalid-registration-token'
    ) {
      logger.warn({ token: token.slice(0, 10) + '...', err: err.code }, 'FCM token invalid');
    } else {
      logger.error({ err, title }, 'Push notification failed');
    }
    return false;
  }
}

/**
 * Send a typed push notification using predefined titles.
 */
export async function sendTypedPush(
  token: string,
  type: PushNotificationType,
  body: string,
  data?: Record<string, string>,
): Promise<boolean> {
  const title = PUSH_TITLES[type] || type;
  return sendPushNotification(token, title, body, { ...data, type });
}
