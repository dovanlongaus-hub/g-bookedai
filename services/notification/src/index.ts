import { logger } from './lib/logger.js';
import type { NotificationType, NotificationChannel } from '@bookedai/shared';
import { sendEmail } from './channels/email.js';
import { sendSms } from './channels/sms.js';
import { sendTypedPush } from './channels/push.js';
import { createInAppNotification } from './channels/in-app.js';

export interface SendNotificationOptions {
  type: NotificationType;
  channels: NotificationChannel[];
  recipientEmail: string;
  recipientPhone?: string;
  recipientUserId?: string;
  recipientPushToken?: string;
  title?: string;
  body?: string;
  data: Record<string, unknown>;
}

export async function sendNotification(options: SendNotificationOptions) {
  const results: Record<string, boolean> = {};

  for (const channel of options.channels) {
    try {
      switch (channel) {
        case 'email':
          await sendEmail(options.type, options.recipientEmail, options.data);
          results.email = true;
          break;
        case 'sms':
          if (options.recipientPhone) {
            results.sms = await sendSms(options.type, options.recipientPhone, options.data);
          } else {
            logger.warn({ type: options.type }, 'SMS skipped: no phone number');
            results.sms = false;
          }
          break;
        case 'push':
          if (options.recipientPushToken) {
            const pushBody = options.body || `Notification: ${options.type}`;
            const pushData: Record<string, string> = {};
            for (const [k, v] of Object.entries(options.data)) {
              pushData[k] = String(v);
            }
            results.push = await sendTypedPush(
              options.recipientPushToken,
              options.type as any,
              pushBody,
              pushData,
            );
          } else {
            logger.warn({ type: options.type }, 'Push skipped: no FCM token');
            results.push = false;
          }
          break;
        case 'in_app':
          if (options.recipientUserId) {
            const notifTitle = options.title || options.type.replace(/_/g, ' ');
            const notifBody = options.body || '';
            await createInAppNotification(
              options.recipientUserId,
              options.type,
              notifTitle,
              notifBody,
              options.data,
            );
            results.in_app = true;
          } else {
            logger.warn({ type: options.type }, 'In-app skipped: no userId');
            results.in_app = false;
          }
          break;
      }
    } catch (err) {
      logger.error({ err, channel, type: options.type }, 'Notification failed');
      results[channel] = false;
    }
  }

  return results;
}
