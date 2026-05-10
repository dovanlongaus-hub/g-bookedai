import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getClientIp, rateLimit } from '@/lib/rate-limit';
import { parseBody, rateLimitedResponse, requireEnv } from '@/lib/api-helpers';
import { hashForLog, logError, logInfo } from '@/lib/logger';

const guideLeadSchema = z.object({
  email: z.string().email(),
  source: z.string().max(100).optional(),
});

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = rateLimit(`guide-lead:${ip}`);
  if (!rl.ok) return rateLimitedResponse(rl.resetAt - Date.now());

  const parsed = await parseBody(req, guideLeadSchema);
  if (!parsed.ok) return parsed.response;
  const { email, source } = parsed.data;

  const ip_hash = hashForLog(ip);
  const email_hash = hashForLog(email.toLowerCase());
  logInfo('guide_lead.received', {
    route: '/api/guide-lead',
    source: source || 'guide-download',
    ip_hash,
    email_hash,
  });

  let apiUrl: string;
  try {
    apiUrl = requireEnv('API_URL');
  } catch {
    logError('guide_lead.config_error', { route: '/api/guide-lead', error: 'API_URL not configured' });
    return NextResponse.json({ error: 'Service unavailable' }, { status: 500 });
  }

  try {
    await fetch(`${apiUrl}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source: source || 'guide-download' }),
    });
  } catch (err) {
    logError('guide_lead.upstream_failed', {
      route: '/api/guide-lead',
      ip_hash,
      error: err instanceof Error ? err.message : 'unknown',
    });
  }

  return NextResponse.json({ ok: true });
}
