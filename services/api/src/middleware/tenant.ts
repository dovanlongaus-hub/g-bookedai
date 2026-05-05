import type { Request, Response, NextFunction } from 'express';

/**
 * Middleware that extracts tenantId from req.auth and attaches it to req for downstream use.
 * Must be used after authenticate() middleware.
 */
export function extractTenant(req: Request, _res: Response, next: NextFunction) {
  // tenantId is already on req.auth from authenticate middleware;
  // this middleware exists as a clear pipeline stage for tenant-aware routes.
  next();
}

/**
 * Middleware that requires a valid tenantId on the authenticated request.
 * Returns 403 if no tenantId is present.
 */
export function requireTenant(req: Request, res: Response, next: NextFunction) {
  if (!req.auth?.tenantId) {
    res.status(403).json({
      success: false,
      error: {
        code: 'TENANT_REQUIRED',
        message: 'A valid tenant context is required for this operation',
      },
    });
    return;
  }
  next();
}
