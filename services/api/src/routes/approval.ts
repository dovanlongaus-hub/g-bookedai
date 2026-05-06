import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { requireRole } from '../middleware/auth.js';
import { query } from '@bookedai/db';
import { logger } from '../lib/logger.js';

export const approvalRouter = Router();

// All approval routes require admin auth
approvalRouter.use(authenticate, requireRole('admin', 'superadmin'));

/**
 * GET /approval/pending — List pending approval requests
 */
approvalRouter.get('/pending', async (req, res) => {
  try {
    const category = req.query.category as string | undefined;
    const params: any[] = [];
    let whereClause = "WHERE ar.status = 'PENDING_APPROVAL'";

    if (category) {
      params.push(category);
      whereClause += ` AND ar.category = $${params.length}`;
    }

    const result = await query(`
      SELECT ar.*,
             requester.email as requester_email,
             requester.display_name as requester_name
      FROM approval_requests ar
      JOIN users requester ON ar.requested_by = requester.id
      ${whereClause}
      ORDER BY ar.created_at DESC
    `, params);

    res.json({
      success: true,
      data: result.rows.map((r: any) => ({
        id: r.id,
        category: r.category,
        action: r.action,
        amountCents: r.amount_cents,
        amountDisplay: `$${(r.amount_cents / 100).toFixed(2)}`,
        currency: r.currency,
        reason: r.reason,
        referenceType: r.reference_type,
        referenceId: r.reference_id,
        metadata: r.metadata,
        status: r.status,
        requesterEmail: r.requester_email,
        requesterName: r.requester_name,
        requestedAt: r.requested_at,
        expiresAt: r.expires_at,
      })),
    });
  } catch (err) {
    logger.error({ err }, 'Failed to list pending approvals');
    res.status(500).json({ success: false, error: 'Failed to load approvals' });
  }
});

/**
 * GET /approval/history — List all processed approval requests
 */
approvalRouter.get('/history', async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit as string) || 50, 200);
    const offset = parseInt(req.query.offset as string) || 0;
    const category = req.query.category as string | undefined;
    const status = req.query.status as string | undefined;

    const params: any[] = [limit, offset];
    const conditions: string[] = ["ar.status != 'PENDING_APPROVAL'"];

    if (category) {
      params.push(category);
      conditions.push(`ar.category = $${params.length}`);
    }
    if (status) {
      params.push(status);
      conditions.push(`ar.status = $${params.length}`);
    }

    const result = await query(`
      SELECT ar.*,
             requester.email as requester_email,
             requester.display_name as requester_name,
             reviewer.email as reviewer_email,
             reviewer.display_name as reviewer_name
      FROM approval_requests ar
      JOIN users requester ON ar.requested_by = requester.id
      LEFT JOIN users reviewer ON ar.reviewed_by = reviewer.id
      WHERE ${conditions.join(' AND ')}
      ORDER BY ar.reviewed_at DESC NULLS LAST
      LIMIT $1 OFFSET $2
    `, params);

    const countResult = await query(
      `SELECT count(*)::int FROM approval_requests ar WHERE ${conditions.join(' AND ')}`,
      params.slice(2),
    );

    res.json({
      success: true,
      data: result.rows,
      total: countResult.rows[0]?.count || 0,
      limit,
      offset,
    });
  } catch (err) {
    logger.error({ err }, 'Failed to list approval history');
    res.status(500).json({ success: false, error: 'Failed to load history' });
  }
});

/**
 * POST /approval/request — Create a new approval request
 */
approvalRouter.post('/request', async (req, res) => {
  try {
    const { category, action, amountCents, currency, reason, referenceType, referenceId, metadata, expiresInHours } = req.body;

    if (!category || !action || !reason) {
      res.status(400).json({
        success: false,
        error: 'category, action, and reason are required',
      });
      return;
    }

    // Check spending limits
    const role = req.auth!.role;
    const limitResult = await query(
      `SELECT * FROM spending_limits WHERE role = $1 AND category = $2 LIMIT 1`,
      [role, category],
    );

    const limit = limitResult.rows[0];
    const amount = amountCents || 0;

    if (limit) {
      // Check single transaction limit
      if (amount > limit.max_single_amount_cents) {
        res.status(403).json({
          success: false,
          error: `Amount $${(amount / 100).toFixed(2)} exceeds single transaction limit $${(limit.max_single_amount_cents / 100).toFixed(2)} for ${role}`,
        });
        return;
      }

      // Check daily limit
      const dailyResult = await query(
        `SELECT coalesce(sum(amount_cents), 0)::int as total
         FROM approval_requests
         WHERE category = $1 AND status IN ('APPROVED', 'PENDING_APPROVAL')
           AND created_at >= CURRENT_DATE`,
        [category],
      );
      if (dailyResult.rows[0].total + amount > limit.max_daily_amount_cents) {
        res.status(403).json({
          success: false,
          error: `Daily spending limit reached for ${category}: $${(limit.max_daily_amount_cents / 100).toFixed(2)}/day`,
        });
        return;
      }

      // Check monthly limit
      const monthlyResult = await query(
        `SELECT coalesce(sum(amount_cents), 0)::int as total
         FROM approval_requests
         WHERE category = $1 AND status IN ('APPROVED', 'PENDING_APPROVAL')
           AND created_at >= date_trunc('month', now())`,
        [category],
      );
      if (monthlyResult.rows[0].total + amount > limit.max_monthly_amount_cents) {
        res.status(403).json({
          success: false,
          error: `Monthly spending limit reached for ${category}: $${(limit.max_monthly_amount_cents / 100).toFixed(2)}/month`,
        });
        return;
      }

      // Auto-approve if under threshold
      if (limit.auto_approve_below_cents > 0 && amount <= limit.auto_approve_below_cents && !limit.requires_dual_approval) {
        const result = await query(
          `INSERT INTO approval_requests (tenant_id, category, action, amount_cents, currency, reason, reference_type, reference_id, metadata, requested_by, status, reviewed_by, reviewed_at, review_note)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'APPROVED', $10, now(), 'Auto-approved: under threshold')
           RETURNING id`,
          [req.auth!.tenantId, category, action, amount, currency || 'AUD', reason, referenceType, referenceId, metadata || {}, req.auth!.userId],
        );

        logger.info({ approvalId: result.rows[0].id, amount, category }, 'Approval auto-approved (under threshold)');
        res.json({
          success: true,
          data: { id: result.rows[0].id, status: 'APPROVED', autoApproved: true },
        });
        return;
      }
    }

    // Create pending approval
    const expiresAt = expiresInHours
      ? new Date(Date.now() + expiresInHours * 60 * 60 * 1000).toISOString()
      : new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(); // 72h default

    const result = await query(
      `INSERT INTO approval_requests (tenant_id, category, action, amount_cents, currency, reason, reference_type, reference_id, metadata, requested_by, expires_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING id`,
      [req.auth!.tenantId, category, action, amount, currency || 'AUD', reason, referenceType, referenceId, metadata || {}, req.auth!.userId, expiresAt],
    );

    logger.info({ approvalId: result.rows[0].id, category, amount, reason }, 'Approval request created');

    res.status(201).json({
      success: true,
      data: { id: result.rows[0].id, status: 'PENDING_APPROVAL', expiresAt },
    });
  } catch (err) {
    logger.error({ err }, 'Failed to create approval request');
    res.status(500).json({ success: false, error: 'Failed to create request' });
  }
});

/**
 * POST /approval/:id/approve — Approve a spending request
 */
approvalRouter.post('/:id/approve', async (req, res) => {
  try {
    const { id } = req.params;
    const { note } = req.body;
    const reviewerId = req.auth!.userId;

    // Get the request
    const requestResult = await query(
      `SELECT * FROM approval_requests WHERE id = $1 AND status = 'PENDING_APPROVAL'`,
      [id],
    );

    if (requestResult.rows.length === 0) {
      res.status(404).json({ success: false, error: 'Approval request not found or already processed' });
      return;
    }

    const request = requestResult.rows[0];

    // Check: cannot approve own request (dual-control principle)
    if (request.requested_by === reviewerId) {
      res.status(403).json({
        success: false,
        error: 'Cannot approve your own request (dual-control principle). Another admin must approve.',
      });
      return;
    }

    // Check expiry
    if (request.expires_at && new Date(request.expires_at) < new Date()) {
      await query(
        `UPDATE approval_requests SET status = 'EXPIRED', updated_at = now() WHERE id = $1`,
        [id],
      );
      res.status(410).json({ success: false, error: 'Request has expired' });
      return;
    }

    // Check dual approval requirement
    const limitResult = await query(
      `SELECT requires_dual_approval FROM spending_limits WHERE category = $1 AND role = $2 LIMIT 1`,
      [request.category, req.auth!.role],
    );

    if (limitResult.rows[0]?.requires_dual_approval) {
      // For dual approval, check if there's already one approval
      // For now, superadmin can override dual approval
      if (req.auth!.role !== 'superadmin') {
        res.status(403).json({
          success: false,
          error: 'This category requires superadmin approval (dual-control)',
        });
        return;
      }
    }

    // Approve
    await query(
      `UPDATE approval_requests
       SET status = 'APPROVED', reviewed_by = $1, reviewed_at = now(), review_note = $2, updated_at = now()
       WHERE id = $3`,
      [reviewerId, note || 'Approved', id],
    );

    // Log to spending ledger
    const gstCents = Math.round(request.amount_cents / 11); // GST = 1/11 of total
    await query(
      `INSERT INTO spending_ledger (tenant_id, approval_id, category, description, amount_cents, currency, gst_cents, net_cents, executed_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        request.tenant_id,
        id,
        request.category,
        `${request.action} — Approved by admin`,
        request.amount_cents,
        request.currency,
        gstCents,
        request.amount_cents - gstCents,
        reviewerId,
      ],
    );

    // Log to audit
    await query(
      `INSERT INTO audit_logs (actor_user_id, entity_type, entity_id, action, after_json)
       VALUES ($1, 'approval', $2, 'APPROVED', $3)`,
      [reviewerId, id, JSON.stringify({ category: request.category, amount: request.amount_cents, note })],
    );

    logger.info({ approvalId: id, reviewerId, amount: request.amount_cents }, 'Approval request approved');

    res.json({
      success: true,
      message: `Approved: ${request.action} — $${(request.amount_cents / 100).toFixed(2)} ${request.currency}`,
    });
  } catch (err) {
    logger.error({ err }, 'Failed to approve request');
    res.status(500).json({ success: false, error: 'Failed to approve' });
  }
});

/**
 * POST /approval/:id/reject — Reject a spending request
 */
approvalRouter.post('/:id/reject', async (req, res) => {
  try {
    const { id } = req.params;
    const { note } = req.body;
    const reviewerId = req.auth!.userId;

    if (!note) {
      res.status(400).json({ success: false, error: 'Rejection reason (note) is required' });
      return;
    }

    const requestResult = await query(
      `SELECT * FROM approval_requests WHERE id = $1 AND status = 'PENDING_APPROVAL'`,
      [id],
    );

    if (requestResult.rows.length === 0) {
      res.status(404).json({ success: false, error: 'Approval request not found or already processed' });
      return;
    }

    await query(
      `UPDATE approval_requests
       SET status = 'REJECTED', reviewed_by = $1, reviewed_at = now(), review_note = $2, updated_at = now()
       WHERE id = $3`,
      [reviewerId, note, id],
    );

    // Log to audit
    await query(
      `INSERT INTO audit_logs (actor_user_id, entity_type, entity_id, action, after_json)
       VALUES ($1, 'approval', $2, 'REJECTED', $3)`,
      [reviewerId, id, JSON.stringify({ note })],
    );

    logger.info({ approvalId: id, reviewerId, note }, 'Approval request rejected');

    res.json({ success: true, message: 'Request rejected' });
  } catch (err) {
    logger.error({ err }, 'Failed to reject request');
    res.status(500).json({ success: false, error: 'Failed to reject' });
  }
});

/**
 * GET /approval/stats — Spending summary & limits
 */
approvalRouter.get('/stats', async (req, res) => {
  try {
    const [pending, todaySpend, monthSpend, limits] = await Promise.all([
      query(`SELECT count(*)::int as count, coalesce(sum(amount_cents), 0)::int as total FROM approval_requests WHERE status = 'PENDING_APPROVAL'`),
      query(`SELECT category, coalesce(sum(amount_cents), 0)::int as total FROM spending_ledger WHERE created_at >= CURRENT_DATE GROUP BY category`),
      query(`SELECT category, coalesce(sum(amount_cents), 0)::int as total FROM spending_ledger WHERE created_at >= date_trunc('month', now()) GROUP BY category`),
      query(`SELECT * FROM spending_limits ORDER BY category, role`),
    ]);

    res.json({
      success: true,
      data: {
        pendingCount: pending.rows[0]?.count || 0,
        pendingTotal: pending.rows[0]?.total || 0,
        todayByCategory: todaySpend.rows,
        monthByCategory: monthSpend.rows,
        limits: limits.rows,
      },
    });
  } catch (err) {
    logger.error({ err }, 'Failed to get approval stats');
    res.status(500).json({ success: false });
  }
});

/**
 * GET /approval/ledger — Spending ledger for reconciliation
 */
approvalRouter.get('/ledger', async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit as string) || 50, 200);
    const offset = parseInt(req.query.offset as string) || 0;
    const unreconciledOnly = req.query.unreconciled === 'true';

    const conditions = unreconciledOnly ? 'WHERE sl.reconciled = false' : '';

    const result = await query(`
      SELECT sl.*, u.email as executor_email, u.display_name as executor_name
      FROM spending_ledger sl
      JOIN users u ON sl.executed_by = u.id
      ${conditions}
      ORDER BY sl.created_at DESC
      LIMIT $1 OFFSET $2
    `, [limit, offset]);

    res.json({ success: true, data: result.rows });
  } catch (err) {
    logger.error({ err }, 'Failed to get spending ledger');
    res.status(500).json({ success: false });
  }
});

/**
 * POST /approval/ledger/:id/reconcile — Mark ledger entry as reconciled
 */
approvalRouter.post('/ledger/:id/reconcile', async (req, res) => {
  try {
    const { id } = req.params;
    const { xeroInvoiceId, bankReference } = req.body;

    await query(
      `UPDATE spending_ledger
       SET reconciled = true, reconciled_at = now(), reconciled_by = $1,
           xero_invoice_id = COALESCE($2, xero_invoice_id),
           bank_reference = COALESCE($3, bank_reference)
       WHERE id = $4`,
      [req.auth!.userId, xeroInvoiceId, bankReference, id],
    );

    res.json({ success: true, message: 'Entry reconciled' });
  } catch (err) {
    logger.error({ err }, 'Failed to reconcile');
    res.status(500).json({ success: false });
  }
});
