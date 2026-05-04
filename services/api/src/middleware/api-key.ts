import type { Request, Response, NextFunction } from 'express';
import { query } from '@bookedai/db';
import { logger } from '../lib/logger.js';

/**
 * API Key authentication for partner/tenant API access.
 * Looks for key in: X-API-Key header or ?api_key query param.
 * If valid, sets req.tenantId from the key's tenant association.
 */
export async function apiKeyAuth(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers['x-api-key'] as string || req.query.api_key as string;

  if (!apiKey) {
    // Fall through — not an API key request, let other auth handle it
    next();
    return;
  }

  try {
    // For now, check if the key matches a tenant domain pattern
    // In production, this would check an api_keys table
    const result = await query(
      'SELECT id, domain, name FROM tenants WHERE id = $1 OR domain = $1',
      [apiKey],
    );

    if (result.rows.length > 0) {
      const tenant = result.rows[0];
      (req as any).tenantId = tenant.id;
      (req as any).tenantName = tenant.name;
      logger.info({ tenantId: tenant.id, tenantName: tenant.name }, 'API key authenticated');
      next();
    } else {
      res.status(401).json({ success: false, error: { code: 'INVALID_API_KEY', message: 'Invalid API key' } });
    }
  } catch (err) {
    logger.error({ err }, 'API key auth error');
    next();
  }
}
