-- 007: Performance optimization indexes
-- Adds missing indexes for common query patterns

-- Bookings: composite index for tenant + status queries (dashboard filtering)
CREATE INDEX IF NOT EXISTS idx_bookings_tenant_status ON bookings(tenant_id, status);

-- Bookings: created_at for date-range queries and sorting
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at DESC);

-- Payments: status for filtering pending/completed payments
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);

-- Payments: stripe lookup
CREATE INDEX IF NOT EXISTS idx_payments_stripe_intent ON payments(stripe_payment_intent_id) WHERE stripe_payment_intent_id IS NOT NULL;

-- Services: tenant + active for listing active services per tenant
CREATE INDEX IF NOT EXISTS idx_services_tenant_active ON services(tenant_id, active) WHERE active = true;

-- Learning sessions: booking lookup
CREATE INDEX IF NOT EXISTS idx_learning_sessions_booking ON learning_sessions(booking_id);

-- Availability slots: composite for finding available slots per service
CREATE INDEX IF NOT EXISTS idx_slots_service_status ON availability_slots(service_id, status);

-- Audit logs: created_at for time-range queries
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);

-- Marketing campaigns: tenant_id for dashboard queries
CREATE INDEX IF NOT EXISTS idx_campaigns_tenant ON marketing_campaigns(tenant_id);

-- Calendar events: starts_at for scheduling queries
CREATE INDEX IF NOT EXISTS idx_calendar_events_starts_at ON calendar_events(starts_at);

-- Refresh planner statistics
ANALYZE bookings;
ANALYZE payments;
ANALYZE services;
ANALYZE learning_sessions;
ANALYZE availability_slots;
ANALYZE audit_logs;
ANALYZE marketing_campaigns;
ANALYZE calendar_events;
ANALYZE notifications;
ANALYZE users;
