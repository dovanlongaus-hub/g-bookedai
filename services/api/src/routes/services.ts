import { Router } from 'express';
import { validate } from '../middleware/validate.js';
import { searchServicesSchema } from '../schemas/service.schema.js';
import { query } from '@bookedai/db';
import { logger } from '../lib/logger.js';

export const servicesRouter = Router();

servicesRouter.post('/search', validate(searchServicesSchema), async (req, res, next) => {
  try {
    const { query: searchQuery, tenantId: bodyTenantId } = req.body;
    // Prefer tenant from auth context; fall back to body param for unauthenticated searches
    const tenantId = req.auth?.tenantId || bodyTenantId || null;

    const result = await query(
      `SELECT id, name, description, price_cents, currency
       FROM services
       WHERE active = true
       AND ($1::uuid IS NULL OR tenant_id = $1)
       AND (name ILIKE $2 OR description ILIKE $2)
       ORDER BY price_cents ASC`,
      [tenantId, `%${searchQuery}%`],
    );

    res.json({ success: true, data: { query: searchQuery, results: result.rows } });
  } catch (err) {
    next(err);
  }
});

// Public endpoint - list all active services (optionally filtered by tenant)
servicesRouter.get('/', async (req, res, next) => {
  try {
    const tenantId = req.auth?.tenantId || (req.query.tenant_id as string) || null;

    const result = await query(
      `SELECT id, name, description, price_cents, currency
       FROM services
       WHERE active = true
       AND ($1::uuid IS NULL OR tenant_id = $1)
       ORDER BY price_cents ASC`,
      [tenantId],
    );
    res.json({ success: true, data: result.rows });
  } catch (err) {
    next(err);
  }
});
