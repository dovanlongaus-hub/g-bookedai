import { Router } from 'express';
import { authenticate, requireRole } from '../middleware/auth.js';
import { logger } from '../lib/logger.js';
import { z } from 'zod';
import { validate } from '../middleware/validate.js';
import { query } from '@bookedai/db';
import { randomUUID } from 'crypto';

const campaignSchema = z.object({
  name: z.string().min(1).max(200),
  channel: z.string().optional(),
  brief: z.string().min(1).max(5000),
});

const approveSchema = z.object({
  campaignId: z.string().uuid(),
});

export const marketingRouter = Router();

// Generate campaign draft (admin/superadmin only)
marketingRouter.post('/campaigns', authenticate, requireRole('admin', 'superadmin'), validate(campaignSchema), async (req, res, next) => {
  try {
    const { name, channel, brief } = req.body;
    const tenantId = req.auth!.tenantId;
    const campaignId = randomUUID();

    await query(
      `INSERT INTO marketing_campaigns (id, tenant_id, name, channel, status, utm_campaign)
       VALUES ($1, $2, $3, $4, 'DRAFT', $5)`,
      [campaignId, tenantId, name, channel, name.toLowerCase().replace(/\s+/g, '-')],
    );

    // TODO: Forward to marketing-agent for AI content generation
    logger.info({ campaignId, name }, 'Campaign draft created');

    res.json({ success: true, data: { campaignId, status: 'DRAFT' } });
  } catch (err) {
    next(err);
  }
});

// Approve campaign (admin/superadmin only)
marketingRouter.post('/approve', authenticate, requireRole('admin', 'superadmin'), validate(approveSchema), async (req, res, next) => {
  try {
    const { campaignId } = req.body;

    const result = await query(
      'UPDATE marketing_campaigns SET status = $1 WHERE id = $2 AND status = $3 RETURNING *',
      ['APPROVED', campaignId, 'DRAFT'],
    );

    if (result.rows.length === 0) {
      res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Campaign not found or not in DRAFT status' } });
      return;
    }

    logger.info({ campaignId }, 'Campaign approved');
    res.json({ success: true, data: { campaignId, status: 'APPROVED' } });
  } catch (err) {
    next(err);
  }
});
