export type NotificationChannel = 'email' | 'sms' | 'push' | 'in_app';

export type NotificationType =
  | 'booking_confirmed'
  | 'booking_cancelled'
  | 'booking_rescheduled'
  | 'payment_received'
  | 'payment_failed'
  | 'reminder_24h'
  | 'reminder_1h'
  | 'session_starting'
  | 'session_summary_ready'
  | 'no_show_followup'
  | 'marketing_campaign'
  | 'welcome';

export interface NotificationPayload {
  type: NotificationType;
  channels: NotificationChannel[];
  recipientUserId: string;
  data: Record<string, unknown>;
  scheduledAt?: Date;
}

export interface UserNotificationPreferences {
  userId: string;
  email: boolean;
  sms: boolean;
  push: boolean;
  quietHoursStart?: string; // "21:00" AEST
  quietHoursEnd?: string;   // "08:00" AEST
}
