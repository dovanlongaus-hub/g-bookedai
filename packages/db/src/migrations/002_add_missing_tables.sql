-- 002 — Add missing tables from blueprint specification

-- Invoices table (separate from payments for accounting/Xero sync)
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id),
  booking_id UUID REFERENCES bookings(id),
  payment_id UUID REFERENCES payments(id),
  user_id UUID REFERENCES users(id),
  invoice_number TEXT NOT NULL UNIQUE,
  amount_cents INTEGER NOT NULL,
  gst_cents INTEGER NOT NULL DEFAULT 0,
  total_cents INTEGER NOT NULL,
  currency TEXT DEFAULT 'AUD',
  status TEXT NOT NULL DEFAULT 'DRAFT',
  xero_invoice_id TEXT,
  xero_sync_status TEXT DEFAULT 'PENDING',
  issued_at TIMESTAMP,
  due_at TIMESTAMP,
  paid_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT now()
);

-- Social content items (multi-channel campaign content)
CREATE TABLE social_content_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES marketing_campaigns(id),
  channel TEXT NOT NULL,
  headline TEXT,
  body TEXT,
  cta_text TEXT,
  cta_url TEXT,
  media_url TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  status TEXT NOT NULL DEFAULT 'DRAFT',
  scheduled_at TIMESTAMP,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT now()
);

-- Notification preferences
CREATE TABLE notification_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) UNIQUE,
  email_enabled BOOLEAN DEFAULT true,
  sms_enabled BOOLEAN DEFAULT false,
  push_enabled BOOLEAN DEFAULT true,
  in_app_enabled BOOLEAN DEFAULT true,
  quiet_hours_start TEXT DEFAULT '21:00',
  quiet_hours_end TEXT DEFAULT '08:00',
  quiet_hours_timezone TEXT DEFAULT 'Australia/Sydney',
  updated_at TIMESTAMP DEFAULT now()
);

-- Calendar events tracking (synced Google Calendar events)
CREATE TABLE calendar_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id),
  google_calendar_event_id TEXT NOT NULL,
  google_meet_url TEXT,
  calendar_html_link TEXT,
  starts_at TIMESTAMP NOT NULL,
  ends_at TIMESTAMP NOT NULL,
  reminder_24h_sent BOOLEAN DEFAULT false,
  reminder_1h_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now()
);

-- Learning notes (structured notes from Google Docs)
CREATE TABLE learning_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  learning_session_id UUID REFERENCES learning_sessions(id),
  google_doc_id TEXT,
  google_doc_url TEXT,
  language TEXT DEFAULT 'en',
  created_at TIMESTAMP DEFAULT now()
);

-- Add user language preference column
ALTER TABLE users ADD COLUMN IF NOT EXISTS language TEXT DEFAULT 'en';
ALTER TABLE users ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS display_name TEXT;

-- Add Google Meet/Calendar fields to bookings if not exist
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS reminder_24h_job_id TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS reminder_1h_job_id TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS hold_expiry_job_id TEXT;

-- Update marketing_campaigns to match blueprint workflow
ALTER TABLE marketing_campaigns ADD COLUMN IF NOT EXISTS approved_by UUID REFERENCES users(id);
ALTER TABLE marketing_campaigns ADD COLUMN IF NOT EXISTS approved_at TIMESTAMP;
ALTER TABLE marketing_campaigns ADD COLUMN IF NOT EXISTS scheduled_at TIMESTAMP;
ALTER TABLE marketing_campaigns ADD COLUMN IF NOT EXISTS published_at TIMESTAMP;
ALTER TABLE marketing_campaigns ADD COLUMN IF NOT EXISTS brief TEXT;

-- Indexes for new tables
CREATE INDEX idx_invoices_tenant ON invoices(tenant_id);
CREATE INDEX idx_invoices_booking ON invoices(booking_id);
CREATE INDEX idx_invoices_xero_status ON invoices(xero_sync_status);
CREATE INDEX idx_social_content_campaign ON social_content_items(campaign_id);
CREATE INDEX idx_social_content_status ON social_content_items(status);
CREATE INDEX idx_calendar_booking ON calendar_events(booking_id);
CREATE INDEX idx_learning_notes_session ON learning_notes(learning_session_id);
CREATE INDEX idx_notification_prefs_user ON notification_preferences(user_id);
