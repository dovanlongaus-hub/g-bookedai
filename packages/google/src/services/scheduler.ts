import { CloudSchedulerClient } from '@google-cloud/scheduler';

let _client: CloudSchedulerClient | null = null;

function getScheduler(): CloudSchedulerClient {
  if (!_client) {
    _client = new CloudSchedulerClient();
  }
  return _client;
}

const LOCATION = process.env.CLOUD_SCHEDULER_LOCATION || 'australia-southeast1';
const PROJECT = process.env.GOOGLE_CLOUD_PROJECT || '';

export const cloudScheduler = {
  async createHoldExpiryJob(bookingId: string, expiresAt: Date): Promise<string> {
    const scheduler = getScheduler();
    const parent = `projects/${PROJECT}/locations/${LOCATION}`;
    const name = `${parent}/jobs/hold-expiry-${bookingId}`;

    // Schedule a one-time HTTP job to expire the hold
    const [job] = await scheduler.createJob({
      parent,
      job: {
        name,
        httpTarget: {
          uri: `${process.env.API_BASE_URL}/booking/expire-hold`,
          httpMethod: 'POST',
          body: Buffer.from(JSON.stringify({ bookingId })).toString('base64'),
          headers: { 'Content-Type': 'application/json' },
        },
        schedule: formatCronFromDate(expiresAt),
        timeZone: 'Australia/Sydney',
      },
    });

    return job.name || '';
  },

  async createReminderJob(params: {
    bookingId: string;
    reminderTime: Date;
    type: '24h' | '1h';
  }): Promise<string> {
    const scheduler = getScheduler();
    const parent = `projects/${PROJECT}/locations/${LOCATION}`;
    const name = `${parent}/jobs/reminder-${params.type}-${params.bookingId}`;

    const [job] = await scheduler.createJob({
      parent,
      job: {
        name,
        httpTarget: {
          uri: `${process.env.API_BASE_URL}/notifications/send-reminder`,
          httpMethod: 'POST',
          body: Buffer.from(JSON.stringify({
            bookingId: params.bookingId,
            type: params.type,
          })).toString('base64'),
          headers: { 'Content-Type': 'application/json' },
        },
        schedule: formatCronFromDate(params.reminderTime),
        timeZone: 'Australia/Sydney',
      },
    });

    return job.name || '';
  },

  async deleteJob(jobName: string): Promise<void> {
    const scheduler = getScheduler();
    try {
      await scheduler.deleteJob({ name: jobName });
    } catch (err: any) {
      if (err.code !== 5) throw err; // 5 = NOT_FOUND
    }
  },
};

function formatCronFromDate(date: Date): string {
  return `${date.getMinutes()} ${date.getHours()} ${date.getDate()} ${date.getMonth() + 1} *`;
}
