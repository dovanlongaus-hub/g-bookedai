import { Router } from 'express';
import { query } from '@bookedai/db';
import { logger } from '../lib/logger.js';

export const healthRouter = Router();

healthRouter.get('/', async (_req, res) => {
  const checks: Record<string, 'ok' | 'error'> = {};

  // Check database
  try {
    await query('SELECT 1');
    checks.database = 'ok';
  } catch {
    checks.database = 'error';
  }

  const allHealthy = Object.values(checks).every((v) => v === 'ok');

  if (!allHealthy) {
    logger.warn({ checks }, 'Health check failed');
  }

  res.status(allHealthy ? 200 : 503).json({
    status: allHealthy ? 'healthy' : 'degraded',
    service: 'api.g.bookedai.au',
    checks,
    timestamp: new Date().toISOString(),
  });
});
