import { PubSub, Topic, Subscription } from '@google-cloud/pubsub';
import { PUBSUB_TOPICS } from '@bookedai/shared';

let _pubsub: PubSub | null = null;

function getPubSub(): PubSub {
  if (!_pubsub) {
    _pubsub = new PubSub({ projectId: process.env.GOOGLE_CLOUD_PROJECT });
  }
  return _pubsub;
}

export const pubsubService = {
  async publish(topicName: string, data: Record<string, unknown>): Promise<string> {
    const pubsub = getPubSub();
    const topic = pubsub.topic(topicName);
    const messageId = await topic.publishMessage({
      json: data,
      attributes: {
        timestamp: new Date().toISOString(),
        source: 'api.g.bookedai.au',
      },
    });
    return messageId;
  },

  async publishBookingCreated(bookingId: string, tenantId: string, userId: string, serviceId: string) {
    return this.publish(PUBSUB_TOPICS.BOOKING_CREATED, { bookingId, tenantId, userId, serviceId });
  },

  async publishBookingPaid(bookingId: string, paymentId: string, amountCents: number) {
    return this.publish(PUBSUB_TOPICS.BOOKING_PAID, { bookingId, paymentId, amountCents });
  },

  async publishBookingCancelled(bookingId: string, reason?: string) {
    return this.publish(PUBSUB_TOPICS.BOOKING_CANCELLED, { bookingId, reason });
  },

  async publishPaymentSucceeded(paymentId: string, bookingId: string, method: string) {
    return this.publish(PUBSUB_TOPICS.PAYMENT_SUCCEEDED, { paymentId, bookingId, method });
  },

  async publishPaymentFailed(paymentId: string, bookingId: string, reason: string) {
    return this.publish(PUBSUB_TOPICS.PAYMENT_FAILED, { paymentId, bookingId, reason });
  },

  async publishSessionCompleted(bookingId: string, sessionId: string) {
    return this.publish(PUBSUB_TOPICS.SESSION_COMPLETED, { bookingId, sessionId });
  },

  async publishLearningNotesCreated(sessionId: string, docUrl: string) {
    return this.publish(PUBSUB_TOPICS.LEARNING_NOTES_CREATED, { sessionId, docUrl });
  },

  async publishMarketingContentApproved(campaignId: string) {
    return this.publish(PUBSUB_TOPICS.MARKETING_CONTENT_APPROVED, { campaignId });
  },

  async publishAccountingSyncFailed(entityType: string, entityId: string, error: string) {
    return this.publish(PUBSUB_TOPICS.ACCOUNTING_SYNC_FAILED, { entityType, entityId, error });
  },

  async subscribe(topicName: string, subscriptionName: string, handler: (data: Record<string, unknown>) => Promise<void>) {
    const pubsub = getPubSub();
    const subscription = pubsub.subscription(subscriptionName);

    subscription.on('message', async (message) => {
      try {
        const data = JSON.parse(message.data.toString());
        await handler(data);
        message.ack();
      } catch (err) {
        console.error(`Error processing message from ${topicName}:`, err);
        message.nack();
      }
    });

    subscription.on('error', (err) => {
      console.error(`Subscription ${subscriptionName} error:`, err);
    });

    return subscription;
  },

  async ensureTopicsExist(): Promise<void> {
    const pubsub = getPubSub();
    for (const topicName of Object.values(PUBSUB_TOPICS)) {
      try {
        await pubsub.createTopic(topicName);
      } catch (err: any) {
        if (err.code !== 6) throw err; // 6 = ALREADY_EXISTS
      }
    }
  },
};
