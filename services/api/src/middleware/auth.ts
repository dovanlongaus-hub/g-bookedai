import type { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';
import jwt from 'jsonwebtoken';
import { getEnv } from '../lib/env.js';
import type { UserRole } from '@bookedai/shared';
import { query } from '@bookedai/db';
import { triggerEmail } from '../lib/send-email.js';

export interface AuthPayload {
  userId: string;
  tenantId: string;
  email: string;
  role: UserRole;
  firebaseUid: string;
  provider?: 'firebase' | 'openai';
}

declare global {
  namespace Express {
    interface Request {
      auth?: AuthPayload;
    }
  }
}

// Verify JWT token (for OpenAI OAuth fallback sessions)
function verifyJwtToken(token: string): Omit<AuthPayload, 'provider'> | null {
  try {
    const env = getEnv();
    const payload = jwt.verify(token, env.JWT_SECRET) as {
      userId: string;
      tenantId: string;
      email: string;
      role: UserRole;
      provider: string;
    };
    if (payload.provider === 'openai') {
      return {
        userId: payload.userId,
        tenantId: payload.tenantId,
        email: payload.email,
        role: payload.role,
        firebaseUid: '', // not applicable for OpenAI auth
      };
    }
    return null;
  } catch {
    return null;
  }
}

// Initialize Firebase Admin lazily (only when first auth request comes in)
function ensureFirebaseInit() {
  if (!admin.apps.length) {
    admin.initializeApp({
      projectId: process.env.GOOGLE_CLOUD_PROJECT || 'longcare-dev',
    });
  }
}

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Missing or invalid token' } });
    return;
  }

  const token = header.slice(7);

  // Try JWT (OpenAI OAuth fallback) first - it's faster to verify locally
  const jwtResult = verifyJwtToken(token);
  if (jwtResult) {
    req.auth = { ...jwtResult, provider: 'openai' };
    next();
    return;
  }

  // Fallback to Firebase Auth (primary)
  try {
    ensureFirebaseInit();
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Look up user in our database by Firebase UID (google_sub field)
    const result = await query(
      'SELECT id, tenant_id, email, role FROM users WHERE google_sub = $1',
      [decodedToken.uid],
    );

    if (result.rows.length === 0) {
      // Auto-create user on first login
      const defaultTenantResult = await query(
        "SELECT id FROM tenants WHERE domain = 'longcare.au' LIMIT 1"
      );
      const tenantId = defaultTenantResult.rows[0]?.id;

      const newUserResult = await query(
        `INSERT INTO users (tenant_id, email, google_sub, role, display_name, language)
         VALUES ($1, $2, $3, 'customer', $4, 'en')
         RETURNING id, tenant_id, email, role`,
        [tenantId, decodedToken.email, decodedToken.uid, decodedToken.name || decodedToken.email],
      );

      const user = newUserResult.rows[0];
      req.auth = {
        userId: user.id,
        tenantId: user.tenant_id,
        email: user.email,
        role: user.role as UserRole,
        firebaseUid: decodedToken.uid,
        provider: 'firebase',
      };

      // Send welcome email to newly created user (non-blocking)
      try {
        triggerEmail('welcome', user.email, {
          userName: decodedToken.name || user.email,
        });
      } catch {}
    } else {
      const user = result.rows[0];
      req.auth = {
        userId: user.id,
        tenantId: user.tenant_id,
        email: user.email,
        role: user.role as UserRole,
        firebaseUid: decodedToken.uid,
        provider: 'firebase',
      };
    }

    next();
  } catch (err) {
    res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Invalid or expired token' } });
  }
}

export function requireRole(...roles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.auth) {
      res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } });
      return;
    }
    if (!roles.includes(req.auth.role)) {
      res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'Insufficient permissions' } });
      return;
    }
    next();
  };
}
