import { BigQuery } from '@google-cloud/bigquery';

let _bq: BigQuery | null = null;

function getBigQuery(): BigQuery {
  if (!_bq) {
    _bq = new BigQuery({ projectId: process.env.GOOGLE_CLOUD_PROJECT });
  }
  return _bq;
}

const DATASET = process.env.BIGQUERY_DATASET || 'bookedai_analytics';

export const bigqueryService = {
  async trackFunnelEvent(event: {
    eventName: string;
    userId?: string;
    sessionId?: string;
    tenantId: string;
    properties: Record<string, unknown>;
  }) {
    const bq = getBigQuery();
    await bq.dataset(DATASET).table('funnel_events').insert([{
      event_name: event.eventName,
      user_id: event.userId,
      session_id: event.sessionId,
      tenant_id: event.tenantId,
      properties: JSON.stringify(event.properties),
      timestamp: new Date().toISOString(),
    }]);
  },

  async trackRevenueEvent(event: {
    bookingId: string;
    paymentId: string;
    amountCents: number;
    currency: string;
    method: string;
    tenantId: string;
    serviceId: string;
    userId: string;
  }) {
    const bq = getBigQuery();
    await bq.dataset(DATASET).table('revenue_events').insert([{
      booking_id: event.bookingId,
      payment_id: event.paymentId,
      amount_cents: event.amountCents,
      currency: event.currency,
      method: event.method,
      tenant_id: event.tenantId,
      service_id: event.serviceId,
      user_id: event.userId,
      timestamp: new Date().toISOString(),
    }]);
  },

  async trackCampaignPerformance(event: {
    campaignId: string;
    channel: string;
    impressions: number;
    clicks: number;
    conversions: number;
    revenue: number;
    utmCampaign: string;
  }) {
    const bq = getBigQuery();
    await bq.dataset(DATASET).table('campaign_performance').insert([{
      ...event,
      timestamp: new Date().toISOString(),
    }]);
  },

  async trackLearningAnalytics(event: {
    sessionId: string;
    userId: string;
    bookingId: string;
    completionRate: number;
    qaCount: number;
    improvementCount: number;
    nextCtaClicked: boolean;
  }) {
    const bq = getBigQuery();
    await bq.dataset(DATASET).table('learning_analytics').insert([{
      ...event,
      timestamp: new Date().toISOString(),
    }]);
  },

  async ensureDatasetAndTables(): Promise<void> {
    const bq = getBigQuery();
    const [datasets] = await bq.getDatasets();
    if (!datasets.find((d) => d.id === DATASET)) {
      await bq.createDataset(DATASET, { location: 'australia-southeast1' });
    }
    // Tables will be auto-created on first insert with autodetect schema
  },
};
