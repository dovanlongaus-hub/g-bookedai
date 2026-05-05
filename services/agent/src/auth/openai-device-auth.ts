/**
 * OpenAI Device Authorization Flow
 *
 * This implements the OAuth 2.0 Device Authorization Grant (RFC 8628).
 * User visits a URL, enters a code, and approves access.
 * The server polls until approved, then stores the access token.
 *
 * Flow:
 * 1. Server requests device code from OpenAI
 * 2. User opens verification URL and enters the code
 * 3. Server polls until user approves
 * 4. Access token is stored and used for API calls
 */

import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

const OPENAI_DEVICE_AUTH_URL = 'https://auth0.openai.com/oauth/device/code';
const OPENAI_TOKEN_URL = 'https://auth0.openai.com/oauth/token';
const OPENAI_CLIENT_ID = 'DRivsnm2Mu42T3KOpqdtwB3NYviHYzwD'; // OpenAI public CLI client ID (Codex)
const OPENAI_AUDIENCE = 'https://api.openai.com/v1';
const OPENAI_SCOPE = 'openid profile email offline_access';

const TOKEN_FILE = process.env.OPENAI_TOKEN_FILE || '/tmp/openai-token.json';

interface DeviceCodeResponse {
  device_code: string;
  user_code: string;
  verification_uri: string;
  verification_uri_complete: string;
  expires_in: number;
  interval: number;
}

interface TokenResponse {
  access_token: string;
  refresh_token?: string;
  token_type: string;
  expires_in: number;
  scope?: string;
  id_token?: string;
}

interface StoredToken {
  access_token: string;
  refresh_token?: string;
  expires_at: number;
}

let _cachedToken: StoredToken | null = null;
let _pendingDeviceAuth: DeviceCodeResponse | null = null;

/**
 * Load token from file cache
 */
function loadToken(): StoredToken | null {
  if (_cachedToken && _cachedToken.expires_at > Date.now()) return _cachedToken;

  try {
    if (existsSync(TOKEN_FILE)) {
      const data = JSON.parse(readFileSync(TOKEN_FILE, 'utf-8')) as StoredToken;
      if (data.expires_at > Date.now()) {
        _cachedToken = data;
        return data;
      }
      // Try refresh
      if (data.refresh_token) {
        return null; // Will trigger refresh in getToken()
      }
    }
  } catch {}
  return null;
}

/**
 * Save token to file
 */
function saveToken(token: StoredToken) {
  _cachedToken = token;
  try {
    writeFileSync(TOKEN_FILE, JSON.stringify(token, null, 2));
  } catch (err) {
    console.warn('Could not save token file:', err);
  }
}

/**
 * Step 1: Request device code — returns login URL for user
 */
export async function requestDeviceCode(): Promise<{
  userCode: string;
  verificationUrl: string;
  verificationUrlComplete: string;
  expiresIn: number;
}> {
  const res = await fetch(OPENAI_DEVICE_AUTH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: OPENAI_CLIENT_ID,
      audience: OPENAI_AUDIENCE,
      scope: OPENAI_SCOPE,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Device auth request failed: ${res.status} ${err}`);
  }

  const data = await res.json() as DeviceCodeResponse;
  _pendingDeviceAuth = data;

  return {
    userCode: data.user_code,
    verificationUrl: data.verification_uri,
    verificationUrlComplete: data.verification_uri_complete,
    expiresIn: data.expires_in,
  };
}

/**
 * Step 2: Poll for token — call this after user approves
 */
export async function pollForToken(maxAttempts = 60): Promise<{
  success: boolean;
  token?: string;
  error?: string;
}> {
  if (!_pendingDeviceAuth) {
    return { success: false, error: 'No pending device auth. Call requestDeviceCode() first.' };
  }

  const { device_code, interval } = _pendingDeviceAuth;
  const pollInterval = (interval || 5) * 1000;

  for (let i = 0; i < maxAttempts; i++) {
    await new Promise(resolve => setTimeout(resolve, pollInterval));

    try {
      const res = await fetch(OPENAI_TOKEN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
          client_id: OPENAI_CLIENT_ID,
          device_code,
        }),
      });

      const data = await res.json() as any;

      if (data.access_token) {
        const token: StoredToken = {
          access_token: data.access_token,
          refresh_token: data.refresh_token,
          expires_at: Date.now() + (data.expires_in || 3600) * 1000,
        };
        saveToken(token);
        _pendingDeviceAuth = null;
        console.log('[OpenAI Auth] Token obtained successfully');
        return { success: true, token: data.access_token };
      }

      if (data.error === 'authorization_pending') {
        continue; // User hasn't approved yet
      }

      if (data.error === 'slow_down') {
        await new Promise(resolve => setTimeout(resolve, 5000)); // Extra delay
        continue;
      }

      if (data.error === 'expired_token') {
        _pendingDeviceAuth = null;
        return { success: false, error: 'Device code expired. Please request a new one.' };
      }

      if (data.error === 'access_denied') {
        _pendingDeviceAuth = null;
        return { success: false, error: 'User denied access.' };
      }

      return { success: false, error: `Unknown error: ${data.error}` };
    } catch (err: any) {
      console.error('[OpenAI Auth] Poll error:', err.message);
    }
  }

  _pendingDeviceAuth = null;
  return { success: false, error: 'Polling timeout — user did not approve in time.' };
}

/**
 * Refresh an expired token
 */
async function refreshToken(refreshToken: string): Promise<StoredToken | null> {
  try {
    const res = await fetch(OPENAI_TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: OPENAI_CLIENT_ID,
        refresh_token: refreshToken,
      }),
    });

    if (!res.ok) return null;

    const data = await res.json() as TokenResponse;
    const token: StoredToken = {
      access_token: data.access_token,
      refresh_token: data.refresh_token || refreshToken,
      expires_at: Date.now() + (data.expires_in || 3600) * 1000,
    };
    saveToken(token);
    console.log('[OpenAI Auth] Token refreshed');
    return token;
  } catch {
    return null;
  }
}

/**
 * Get valid OpenAI API key — either from env, cached token, or null
 */
export async function getOpenAIToken(): Promise<string | null> {
  // Priority 1: env var
  const envKey = process.env.OPENAI_API_KEY;
  if (envKey) return envKey;

  // Priority 2: cached token
  const cached = loadToken();
  if (cached) return cached.access_token;

  // Priority 3: try refresh
  try {
    if (existsSync(TOKEN_FILE)) {
      const data = JSON.parse(readFileSync(TOKEN_FILE, 'utf-8')) as StoredToken;
      if (data.refresh_token) {
        const refreshed = await refreshToken(data.refresh_token);
        if (refreshed) return refreshed.access_token;
      }
    }
  } catch {}

  return null;
}

/**
 * Store a token obtained externally (e.g., from browser device auth)
 */
export function storeExternalToken(accessToken: string, refreshToken?: string, expiresIn?: number) {
  const token: StoredToken = {
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_at: Date.now() + (expiresIn || 3600) * 1000,
  };
  saveToken(token);
}

/**
 * Check auth status
 */
export function getAuthStatus(): {
  authenticated: boolean;
  source: 'env' | 'oauth' | 'none';
  expiresAt?: number;
  pendingAuth?: boolean;
} {
  if (process.env.OPENAI_API_KEY) {
    return { authenticated: true, source: 'env' };
  }

  const cached = loadToken();
  if (cached) {
    return { authenticated: true, source: 'oauth', expiresAt: cached.expires_at };
  }

  return { authenticated: false, source: 'none', pendingAuth: !!_pendingDeviceAuth };
}
