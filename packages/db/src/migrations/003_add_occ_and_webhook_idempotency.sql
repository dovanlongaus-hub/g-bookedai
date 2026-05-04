-- 003: Add Optimistic Concurrency Control and Webhook Idempotency

-- 1. Add version column to availability_slots for OCC
ALTER TABLE availability_slots
ADD COLUMN version INT DEFAULT 1;

-- 2. Create webhook_events table for Idempotency
CREATE TABLE webhook_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  provider_event_id TEXT UNIQUE NOT NULL, -- e.g., Stripe event ID
  processed_at TIMESTAMP DEFAULT now()
);

-- Index for fast lookup by provider event ID
CREATE INDEX idx_webhook_events_provider_id ON webhook_events(provider_event_id);
