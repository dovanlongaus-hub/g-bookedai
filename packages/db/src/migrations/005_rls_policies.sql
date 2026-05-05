-- 005 — Row-Level Security policies for multi-tenant data isolation
-- Applies tenant isolation at the database level.
-- The application must SET app.current_tenant_id before running queries
-- for RLS to take effect on non-superuser roles.

-- Note: availability_slots does not have a direct tenant_id column;
-- isolation is enforced at the application layer via service_id joins.

-- ============================================================
-- 1. Enable RLS on tenant-scoped tables
-- ============================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability_slots ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 2. Policies for: users
-- ============================================================

CREATE POLICY tenant_isolation_users ON users
  USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);

-- ============================================================
-- 3. Policies for: services
-- ============================================================

CREATE POLICY tenant_isolation_services ON services
  USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);

-- ============================================================
-- 4. Policies for: bookings
-- ============================================================

CREATE POLICY tenant_isolation_bookings ON bookings
  USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);

-- ============================================================
-- 5. Policies for: payments
--    payments link to bookings; isolate via booking's tenant
-- ============================================================

CREATE POLICY tenant_isolation_payments ON payments
  USING (
    booking_id IN (
      SELECT id FROM bookings
      WHERE tenant_id = current_setting('app.current_tenant_id', true)::uuid
    )
  );

-- ============================================================
-- 6. Policies for: availability_slots
--    availability_slots link to services; isolate via service's tenant
-- ============================================================

CREATE POLICY tenant_isolation_availability_slots ON availability_slots
  USING (
    service_id IN (
      SELECT id FROM services
      WHERE tenant_id = current_setting('app.current_tenant_id', true)::uuid
    )
  );

-- ============================================================
-- 7. Allow the database owner / superuser to bypass RLS
--    (migrations, seeds, admin scripts)
-- ============================================================
-- By default, table owners bypass RLS. If using a separate app role,
-- ensure FORCE ROW LEVEL SECURITY is set:
-- ALTER TABLE users FORCE ROW LEVEL SECURITY;
-- ALTER TABLE services FORCE ROW LEVEL SECURITY;
-- ALTER TABLE bookings FORCE ROW LEVEL SECURITY;
-- ALTER TABLE payments FORCE ROW LEVEL SECURITY;
-- ALTER TABLE availability_slots FORCE ROW LEVEL SECURITY;
