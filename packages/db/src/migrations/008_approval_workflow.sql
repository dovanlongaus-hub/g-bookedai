-- Migration 008: Approval Workflow & Spending Controls
-- Purpose: Manual approval for all spending/money-out actions
-- Standard: Australian Financial Services compliance, dual-control principle

-- Approval requests table
CREATE TABLE IF NOT EXISTS approval_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id),

  -- What needs approval
  category VARCHAR(50) NOT NULL, -- 'refund', 'payout', 'ad_spend', 'sms_cost', 'subscription_charge', 'marketing_budget', 'vendor_payment'
  action VARCHAR(100) NOT NULL,  -- Human-readable action description

  -- Financial details
  amount_cents INTEGER NOT NULL DEFAULT 0,
  currency VARCHAR(3) NOT NULL DEFAULT 'AUD',

  -- Reason & justification
  reason TEXT NOT NULL,           -- Why this spending is needed
  reference_type VARCHAR(50),     -- 'booking', 'payment', 'campaign', 'invoice', etc.
  reference_id UUID,              -- ID of related entity
  metadata JSONB DEFAULT '{}',    -- Additional context (invoice number, vendor name, etc.)

  -- Approval workflow
  status VARCHAR(20) NOT NULL DEFAULT 'PENDING_APPROVAL',
  -- PENDING_APPROVAL → APPROVED / REJECTED / CANCELLED / EXPIRED

  -- Who
  requested_by UUID NOT NULL REFERENCES users(id),
  requested_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  reviewed_by UUID REFERENCES users(id),
  reviewed_at TIMESTAMPTZ,
  review_note TEXT,                -- Approver's note/reason for decision

  -- Execution
  executed_at TIMESTAMPTZ,        -- When the action was actually performed
  execution_result JSONB,         -- Result of execution (Stripe charge ID, etc.)

  -- Expiry
  expires_at TIMESTAMPTZ,         -- Auto-expire if not reviewed

  -- Audit
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Spending limits table (per role, per category)
CREATE TABLE IF NOT EXISTS spending_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id),
  role VARCHAR(20) NOT NULL,        -- 'admin', 'superadmin'
  category VARCHAR(50) NOT NULL,    -- Same as approval_requests.category

  -- Limits
  max_single_amount_cents INTEGER NOT NULL DEFAULT 0,     -- Max per single transaction
  max_daily_amount_cents INTEGER NOT NULL DEFAULT 0,      -- Max per day
  max_monthly_amount_cents INTEGER NOT NULL DEFAULT 0,    -- Max per month
  requires_dual_approval BOOLEAN NOT NULL DEFAULT false,  -- Needs 2 approvers?
  auto_approve_below_cents INTEGER DEFAULT 0,             -- Auto-approve under this amount

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE(tenant_id, role, category)
);

-- Spending audit log (immutable record of all spending)
CREATE TABLE IF NOT EXISTS spending_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id),
  approval_id UUID REFERENCES approval_requests(id),

  -- Transaction details
  category VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  amount_cents INTEGER NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'AUD',
  gst_cents INTEGER NOT NULL DEFAULT 0,       -- GST component (10%)
  net_cents INTEGER NOT NULL DEFAULT 0,       -- Amount excl GST

  -- External references
  stripe_charge_id VARCHAR(255),
  stripe_refund_id VARCHAR(255),
  xero_invoice_id VARCHAR(255),
  bank_reference VARCHAR(100),

  -- Reconciliation
  reconciled BOOLEAN NOT NULL DEFAULT false,
  reconciled_at TIMESTAMPTZ,
  reconciled_by UUID REFERENCES users(id),

  -- Actors
  executed_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_approval_requests_status ON approval_requests(status);
CREATE INDEX IF NOT EXISTS idx_approval_requests_category ON approval_requests(category);
CREATE INDEX IF NOT EXISTS idx_approval_requests_tenant ON approval_requests(tenant_id);
CREATE INDEX IF NOT EXISTS idx_approval_requests_requested_by ON approval_requests(requested_by);
CREATE INDEX IF NOT EXISTS idx_approval_requests_pending ON approval_requests(status, expires_at) WHERE status = 'PENDING_APPROVAL';
CREATE INDEX IF NOT EXISTS idx_spending_ledger_tenant ON spending_ledger(tenant_id);
CREATE INDEX IF NOT EXISTS idx_spending_ledger_category ON spending_ledger(category);
CREATE INDEX IF NOT EXISTS idx_spending_ledger_created ON spending_ledger(created_at);
CREATE INDEX IF NOT EXISTS idx_spending_ledger_reconciled ON spending_ledger(reconciled) WHERE reconciled = false;

-- Default spending limits for longcare.au tenant
INSERT INTO spending_limits (tenant_id, role, category, max_single_amount_cents, max_daily_amount_cents, max_monthly_amount_cents, requires_dual_approval, auto_approve_below_cents)
SELECT t.id, role, category, max_single, max_daily, max_monthly, dual_approval, auto_approve
FROM tenants t
CROSS JOIN (VALUES
  ('admin',      'refund',              50000,   200000,   1000000,  false, 0),
  ('admin',      'payout',              100000,  500000,   2000000,  true,  0),
  ('admin',      'ad_spend',            50000,   200000,   500000,   false, 0),
  ('admin',      'sms_cost',            10000,   50000,    200000,   false, 5000),
  ('admin',      'marketing_budget',    100000,  300000,   1000000,  false, 0),
  ('admin',      'vendor_payment',      200000,  500000,   2000000,  true,  0),
  ('admin',      'subscription_charge', 50000,   100000,   500000,   false, 0),
  ('superadmin', 'refund',              200000,  1000000,  5000000,  false, 10000),
  ('superadmin', 'payout',              500000,  2000000,  10000000, false, 0),
  ('superadmin', 'ad_spend',            200000,  1000000,  3000000,  false, 10000),
  ('superadmin', 'sms_cost',            50000,   200000,   500000,   false, 10000),
  ('superadmin', 'marketing_budget',    500000,  1000000,  5000000,  false, 50000),
  ('superadmin', 'vendor_payment',      1000000, 2000000,  10000000, false, 0),
  ('superadmin', 'subscription_charge', 200000,  500000,   2000000,  false, 20000)
) AS v(role, category, max_single, max_daily, max_monthly, dual_approval, auto_approve)
WHERE t.domain = 'longcare.au'
ON CONFLICT DO NOTHING;
