import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getClientIp, rateLimit } from '@/lib/rate-limit';
import { parseBody, rateLimitedResponse, requireEnv } from '@/lib/api-helpers';
import { hashForLog, logError, logInfo } from '@/lib/logger';

const referralSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  referredEmail: z.string().email().optional(),
  notes: z.string().max(1000).optional(),
});

function generateReferralCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'LC-';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = rateLimit(`referral:${ip}`);
  if (!rl.ok) return rateLimitedResponse(rl.resetAt - Date.now());

  const parsed = await parseBody(req, referralSchema);
  if (!parsed.ok) return parsed.response;
  const { name, email, referredEmail, notes } = parsed.data;

  const referralCode = generateReferralCode();
  const ip_hash = hashForLog(ip);
  const referrer_email_hash = hashForLog(email.toLowerCase());

  logInfo('referral.received', {
    route: '/api/referral',
    has_referred: Boolean(referredEmail),
    has_notes: Boolean(notes),
    referral_code: referralCode,
    ip_hash,
    referrer_email_hash,
  });

  let apiUrl: string;
  try {
    apiUrl = requireEnv('API_URL');
  } catch {
    logError('referral.config_error', { route: '/api/referral', error: 'API_URL not configured' });
    return NextResponse.json({ error: 'Service unavailable' }, { status: 500 });
  }

  try {
    await fetch(`${apiUrl}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        referrer_name: name,
        referred_email: referredEmail,
        notes,
        referral_code: referralCode,
        source: 'referral-program',
        type: 'referral',
        created_at: new Date().toISOString(),
      }),
    });
  } catch (err) {
    logError('referral.upstream_failed', {
      route: '/api/referral',
      ip_hash,
      error: err instanceof Error ? err.message : 'unknown',
    });
  }

  return NextResponse.json({ success: true, referralCode });
}
