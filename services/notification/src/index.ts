import { logger } from './lib/logger.js';
import type { NotificationType, NotificationChannel } from '@bookedai/shared';
import { sendEmail } from './channels/email.js';

export interface SendNotificationOptions {
  type: NotificationType;
  channels: NotificationChannel[];
  recipientEmail: string;
  recipientPhone?: string;
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
          // TODO: Integrate Twilio for Australian SMS
          logger.info({ type: options.type, phone: options.recipientPhone }, 'SMS not yet configured');
          results.sms = false;
          break;
        case 'push':
          // TODO: Integrate Firebase Cloud Messaging
          logger.info({ type: options.type }, 'Push not yet configured');
          results.push = false;
          break;
        case 'in_app':
          // TODO: Store in Firestore for real-time delivery
          logger.info({ type: options.type }, 'In-app not yet configured');
          results.in_app = false;
          break;
      }
    } catch (err) {
      logger.error({ err, channel, type: options.type }, 'Notification failed');
      results[channel] = false;
    }
  }

  return results;
}
