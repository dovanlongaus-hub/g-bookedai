-- Migration 009: Extend payments table for QR / pay-on-arrival flows.
--
-- payments.method allowed values (no CHECK constraint to keep extension cheap):
--   stripe_card | bank_transfer_payid | bank_transfer_bpay | bank_transfer_vietqr | pay_on_arrival
--
-- payments.status allowed values:
--   PENDING | DEFERRED | SUCCEEDED | FAILED | REFUNDED
--   DEFERRED is used only by pay_on_arrival — booking is CONFIRMED but money is not yet collected.

ALTER TABLE payments ADD COLUMN IF NOT EXISTS paid_at TIMESTAMP;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS qr_payload TEXT;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS due_at TIMESTAMP;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS marked_paid_by UUID REFERENCES users(id);

CREATE INDEX IF NOT EXISTS payments_method_status_idx ON payments (method, status);
CREATE INDEX IF NOT EXISTS payments_due_at_idx ON payments (due_at) WHERE status = 'DEFERRED';
