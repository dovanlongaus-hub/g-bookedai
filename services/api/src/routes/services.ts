import { Router } from 'express';
import { validate } from '../middleware/validate.js';
import { searchServicesSchema } from '../schemas/service.schema.js';
import { query } from '@bookedai/db';
import { logger } from '../lib/logger.js';

export const servicesRouter = Router();

servicesRouter.post('/search', validate(searchServicesSchema), async (req, res, next) => {
  try {
    const { query: searchQuery, tenantId } = req.body;

    const result = await query(
      `SELECT id, name, description, price_cents, currency
       FROM services
       WHERE active = true
       AND ($1::uuid IS NULL OR tenant_id = $1)
       AND (name ILIKE $2 OR description ILIKE $2)
       ORDER BY price_cents ASC`,
      [tenantId || null, `%${searchQuery}%`],
    );

    res.json({ success: true, data: { query: searchQuery, results: result.rows } });
  } catch (err) {
    next(err);
  }
});

// Public endpoint - list all active services
servicesRouter.get('/', async (_req, res, next) => {
  try {
    const result = await query(
      'SELECT id, name, description, price_cents, currency FROM services WHERE active = true ORDER BY price_cents ASC',
    );
    res.json({ success: true, data: result.rows });
  } catch (err) {
    next(err);
  }
});
