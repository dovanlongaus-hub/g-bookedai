import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate.js';
import { query } from '@bookedai/db';
import { logger } from '../lib/logger.js';
import { randomUUID } from 'crypto';

const partnerSchema = z.object({
  businessName: z.string().min(1).max(200),
  industry: z.string().max(100).optional(),
  email: z.string().email(),
  phone: z.string().max(20).optional(),
  website: z.string().url().optional().or(z.literal('')),
  monthlyBookings: z.string().max(50).optional(),
  plan: z.enum(['starter', 'growth', 'enterprise']).default('starter'),
});

export const partnersRouter = Router();

partnersRouter.post('/apply', validate(partnerSchema), async (req, res, next) => {
  try {
    const { businessName, industry, email, phone, website, monthlyBookings, plan } = req.body;

    // Create tenant
    const tenantId = randomUUID();
    const domain = businessName.toLowerCase().replace(/[^a-z0-9]/g, '') + '.bookedai.au';

    await query(
      `INSERT INTO tenants (id, domain, name, created_at)
       VALUES ($1, $2, $3, now())
       ON CONFLICT (domain) DO NOTHING`,
      [tenantId, domain, businessName],
    );

    // Create admin user for the tenant
    await query(
      `INSERT INTO users (tenant_id, email, role, display_name, language)
       VALUES ($1, $2, 'admin', $3, 'en')
       ON CONFLICT DO NOTHING`,
      [tenantId, email, businessName],
    );

    // Log the application
    await query(
      `INSERT INTO audit_logs (id, entity_type, entity_id, action, after_json)
       VALUES ($1, 'tenant', $2, 'PARTNER_APPLICATION', $3)`,
      [randomUUID(), tenantId, JSON.stringify({ businessName, industry, email, phone, website, monthlyBookings, plan })],
    );

    logger.info({ tenantId, businessName, email, plan }, 'New partner application');

    res.json({
      success: true,
      data: {
        tenantId,
        domain,
        plan,
        message: `Welcome ${businessName}! Your BookedAI tenant is being set up. We'll contact you at ${email} within 24 hours.`,
      },
    });
  } catch (err) {
    next(err);
  }
});

// List all tenants (admin only)
partnersRouter.get('/list', async (_req, res, next) => {
  try {
    const result = await query('SELECT id, domain, name, created_at FROM tenants ORDER BY created_at DESC');
    res.json({ success: true, data: result.rows });
  } catch (err) {
    next(err);
  }
});
