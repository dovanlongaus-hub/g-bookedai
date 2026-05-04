import { CloudTasksClient } from '@google-cloud/tasks';

let _client: CloudTasksClient | null = null;

function getTasksClient(): CloudTasksClient {
  if (!_client) {
    _client = new CloudTasksClient();
  }
  return _client;
}

const LOCATION = process.env.CLOUD_TASKS_LOCATION || 'australia-southeast1';
const PROJECT = process.env.GOOGLE_CLOUD_PROJECT || '';
const QUEUE = process.env.CLOUD_TASKS_QUEUE || 'bookedai-default';

export const cloudTasks = {
  async createTask(params: {
    url: string;
    payload: Record<string, unknown>;
    scheduleTime?: Date;
    taskId?: string;
  }): Promise<string> {
    const client = getTasksClient();
    const parent = client.queuePath(PROJECT, LOCATION, QUEUE);

    const task: any = {
      httpRequest: {
        httpMethod: 'POST',
        url: params.url,
        body: Buffer.from(JSON.stringify(params.payload)).toString('base64'),
        headers: { 'Content-Type': 'application/json' },
      },
    };

    if (params.scheduleTime) {
      task.scheduleTime = { seconds: Math.floor(params.scheduleTime.getTime() / 1000) };
    }

    if (params.taskId) {
      task.name = `${parent}/tasks/${params.taskId}`;
    }

    const [response] = await client.createTask({ parent, task });
    return response.name || '';
  },

  async scheduleBookingReminder(bookingId: string, reminderTime: Date, type: '24h' | '1h') {
    return this.createTask({
      url: `${process.env.API_BASE_URL}/notifications/send-reminder`,
      payload: { bookingId, type },
      scheduleTime: reminderTime,
      taskId: `reminder-${type}-${bookingId}`,
    });
  },

  async scheduleHoldExpiry(bookingId: string, expiresAt: Date) {
    return this.createTask({
      url: `${process.env.API_BASE_URL}/booking/expire-hold`,
      payload: { bookingId },
      scheduleTime: expiresAt,
      taskId: `hold-expiry-${bookingId}`,
    });
  },

  async scheduleLearningNoteGeneration(bookingId: string, sessionId: string) {
    return this.createTask({
      url: `${process.env.API_BASE_URL}/learning/generate-notes`,
      payload: { bookingId, sessionId },
      taskId: `notes-${sessionId}`,
    });
  },
};
