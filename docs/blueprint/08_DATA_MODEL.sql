-- 08 — Data Model SQL Draft

CREATE TABLE tenants (
  id UUID PRIMARY KEY,
  domain TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE users (
  id UUID PRIMARY KEY,
  tenant_id UUID REFERENCES tenants(id),
  email TEXT NOT NULL,
  google_sub TEXT,
  role TEXT NOT NULL DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE services (
  id UUID PRIMARY KEY,
  tenant_id UUID REFERENCES tenants(id),
  name TEXT NOT NULL,
  description TEXT,
  price_cents INTEGER NOT NULL,
  currency TEXT DEFAULT 'AUD',
  active BOOLEAN DEFAULT true
);

CREATE TABLE availability_slots (
  id UUID PRIMARY KEY,
  service_id UUID REFERENCES services(id),
  starts_at TIMESTAMP NOT NULL,
  ends_at TIMESTAMP NOT NULL,
  status TEXT NOT NULL DEFAULT 'AVAILABLE',
  version INT DEFAULT 1 -- For Optimistic Concurrency Control (OCC)
);

CREATE TABLE bookings (
  id UUID PRIMARY KEY,
  tenant_id UUID REFERENCES tenants(id),
  user_id UUID REFERENCES users(id),
  service_id UUID REFERENCES services(id),
  slot_id UUID REFERENCES availability_slots(id),
  status TEXT NOT NULL,
  total_cents INTEGER NOT NULL,
  payment_id UUID,
  google_calendar_event_id TEXT,
  google_meet_url TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE payments (
  id UUID PRIMARY KEY,
  booking_id UUID REFERENCES bookings(id),
  method TEXT NOT NULL, -- stripe_card, bank_transfer
  status TEXT NOT NULL,
  amount_cents INTEGER NOT NULL,
  stripe_payment_intent_id TEXT,
  bank_reference TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE learning_sessions (
  id UUID PRIMARY KEY,
  booking_id UUID REFERENCES bookings(id),
  transcript_url TEXT,
  summary TEXT,
  qa_json JSONB,
  improvement_plan JSONB,
  next_cta TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE marketing_campaigns (
  id UUID PRIMARY KEY,
  tenant_id UUID REFERENCES tenants(id),
  name TEXT NOT NULL,
  channel TEXT,
  status TEXT NOT NULL DEFAULT 'DRAFT',
  utm_campaign TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY,
  actor_user_id UUID,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  action TEXT NOT NULL,
  before_json JSONB,
  after_json JSONB,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE webhook_events (
  id UUID PRIMARY KEY,
  event_type TEXT,
  provider_event_id TEXT UNIQUE, -- For Idempotency (e.g., Stripe event ID)
  processed_at TIMESTAMP DEFAULT now()
);
