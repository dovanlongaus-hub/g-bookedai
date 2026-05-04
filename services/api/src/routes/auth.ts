import { Router } from 'express';
import crypto from 'crypto';
import { getEnv } from '../lib/env.js';
import { logger } from '../lib/logger.js';
import { query } from '@bookedai/db';
import jwt from 'jsonwebtoken';

export const authRouter = Router();

// OpenAI OAuth 2.0 endpoints
const OPENAI_AUTH_URL = 'https://auth.openai.com/authorize';
const OPENAI_TOKEN_URL = 'https://auth.openai.com/oauth/token';
const OPENAI_USERINFO_URL = 'https://api.openai.com/v1/me';

// Store state for CSRF protection (use Redis in production)
const pendingStates = new Map<string, { createdAt: number; returnUrl: string }>();

// Cleanup expired states every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [state, data] of pendingStates) {
    if (now - data.createdAt > 10 * 60 * 1000) {
      pendingStates.delete(state);
    }
  }
}, 5 * 60 * 1000);

/**
 * GET /auth/openai/login
 * Initiates OpenAI OAuth flow - redirects user to OpenAI login page
 */
authRouter.get('/openai/login', (req, res) => {
  const env = getEnv();

  if (!env.OPENAI_CLIENT_ID) {
    res.status(503).json({
      success: false,
      error: { code: 'OAUTH_NOT_CONFIGURED', message: 'OpenAI OAuth is not configured' },
    });
    return;
  }

  const state = crypto.randomBytes(32).toString('hex');
  const returnUrl = (req.query.returnUrl as string) || env.APP_BASE_URL;

  pendingStates.set(state, { createdAt: Date.now(), returnUrl });

  const params = new URLSearchParams({
    client_id: env.OPENAI_CLIENT_ID,
    redirect_uri: env.OPENAI_REDIRECT_URI,
    response_type: 'code',
    scope: 'openid email profile',
    state,
  });

  const authUrl = `${OPENAI_AUTH_URL}?${params.toString()}`;
  logger.info({ authUrl: OPENAI_AUTH_URL }, 'Redirecting to OpenAI OAuth');
  res.redirect(authUrl);
});

/**
 * GET /auth/openai/callback
 * Handles the OAuth callback from OpenAI
 */
authRouter.get('/openai/callback', async (req, res) => {
  const env = getEnv();
  const { code, state, error } = req.query;

  if (error) {
    logger.error({ error }, 'OpenAI OAuth error');
    res.redirect(`${env.APP_BASE_URL}/login?error=oauth_denied`);
    return;
  }

  if (!state || !pendingStates.has(state as string)) {
    res.redirect(`${env.APP_BASE_URL}/login?error=invalid_state`);
    return;
  }

  const stateData = pendingStates.get(state as string)!;
  pendingStates.delete(state as string);

  try {
    // Exchange code for access token
    const tokenResponse = await fetch(OPENAI_TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code as string,
        client_id: env.OPENAI_CLIENT_ID!,
        client_secret: env.OPENAI_CLIENT_SECRET!,
        redirect_uri: env.OPENAI_REDIRECT_URI,
      }),
    });

    if (!tokenResponse.ok) {
      const errBody = await tokenResponse.text();
      logger.error({ status: tokenResponse.status, body: errBody }, 'OpenAI token exchange failed');
      res.redirect(`${stateData.returnUrl}/login?error=token_exchange_failed`);
      return;
    }

    const tokenData = await tokenResponse.json() as {
      access_token: string;
      id_token?: string;
      token_type: string;
      expires_in: number;
    };

    // Get user info from OpenAI
    const userResponse = await fetch(OPENAI_USERINFO_URL, {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    let userInfo: { id: string; email: string; name?: string } | null = null;

    if (userResponse.ok) {
      userInfo = await userResponse.json() as { id: string; email: string; name?: string };
    } else {
      // Try decoding id_token if userinfo endpoint fails
      if (tokenData.id_token) {
        const payload = JSON.parse(
          Buffer.from(tokenData.id_token.split('.')[1], 'base64').toString()
        );
        userInfo = { id: payload.sub, email: payload.email, name: payload.name };
      }
    }

    if (!userInfo?.email) {
      res.redirect(`${stateData.returnUrl}/login?error=no_email`);
      return;
    }

    // Find or create user in database
    const existingUser = await query(
      'SELECT id, tenant_id, email, role FROM users WHERE email = $1',
      [userInfo.email],
    );

    let user;
    if (existingUser.rows.length > 0) {
      user = existingUser.rows[0];
      // Update openai_sub if not set
      await query(
        'UPDATE users SET openai_sub = $1 WHERE id = $2 AND openai_sub IS NULL',
        [userInfo.id, user.id],
      );
    } else {
      // Auto-create user
      const tenantResult = await query(
        "SELECT id FROM tenants WHERE domain = 'longcare.au' LIMIT 1"
      );
      const tenantId = tenantResult.rows[0]?.id;

      const newUser = await query(
        `INSERT INTO users (tenant_id, email, openai_sub, role, display_name, language, auth_provider)
         VALUES ($1, $2, $3, 'customer', $4, 'en', 'openai')
         RETURNING id, tenant_id, email, role`,
        [tenantId, userInfo.email, userInfo.id, userInfo.name || userInfo.email],
      );
      user = newUser.rows[0];
    }

    // Create JWT session token
    const sessionToken = jwt.sign(
      {
        userId: user.id,
        tenantId: user.tenant_id,
        email: user.email,
        role: user.role,
        provider: 'openai',
      },
      env.JWT_SECRET,
      { expiresIn: '7d' },
    );

    // Redirect back to app with token
    const redirectUrl = new URL('/auth/callback', stateData.returnUrl);
    redirectUrl.searchParams.set('token', sessionToken);
    redirectUrl.searchParams.set('provider', 'openai');

    logger.info({ email: userInfo.email, provider: 'openai' }, 'User authenticated via OpenAI OAuth');
    res.redirect(redirectUrl.toString());
  } catch (err) {
    logger.error({ err }, 'OpenAI OAuth callback error');
    res.redirect(`${stateData.returnUrl}/login?error=server_error`);
  }
});

/**
 * GET /auth/providers
 * Returns available auth providers (for frontend to show correct login buttons)
 */
authRouter.get('/providers', (_req, res) => {
  const env = getEnv();
  res.json({
    success: true,
    data: {
      firebase: true, // primary
      openai: !!env.OPENAI_CLIENT_ID, // fallback
    },
  });
});
