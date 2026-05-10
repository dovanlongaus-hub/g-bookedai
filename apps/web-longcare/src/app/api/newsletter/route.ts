import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getClientIp, rateLimit } from '@/lib/rate-limit';
import { parseBody, rateLimitedResponse, requireEnv } from '@/lib/api-helpers';
import { hashForLog, logError, logInfo } from '@/lib/logger';
import { getAutoResponseForSource } from '@/data/auto-responses';
import { getLeadMagnetBySource } from '@/data/lead-magnets';

const newsletterSchema = z.object({
  email: z.string().email(),
  source: z.string().max(100).optional().default('newsletter'),
});

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = rateLimit(`newsletter:${ip}`);
  if (!rl.ok) return rateLimitedResponse(rl.resetAt - Date.now());

  const parsed = await parseBody(req, newsletterSchema);
  if (!parsed.ok) return parsed.response;
  const { email } = parsed.data;
  // `.default('newsletter')` in the schema means parsed.data.source is
  // populated, but we narrow defensively for older Zod inference paths.
  const source = parsed.data.source ?? 'newsletter';

  const ip_hash = hashForLog(ip);
  const email_hash = hashForLog(email.toLowerCase());

  // Look up the matching lead magnet (for sequence routing) and auto-response
  // (for the in-page success message). Both lookups are pure data and never
  // throw — falls back to a generic newsletter response if the source is new.
  const magnet = getLeadMagnetBySource(source);
  const autoResponse = getAutoResponseForSource(source);
  const sequenceId = magnet?.emailSequence;

  logInfo('newsletter.received', {
    route: '/api/newsletter',
    source,
    sequence_id: sequenceId ?? null,
    magnet_id: magnet?.id ?? null,
    ip_hash,
    email_hash,
  });

  let apiUrl: string;
  try {
    apiUrl = requireEnv('API_URL');
  } catch {
    logError('newsletter.config_error', { route: '/api/newsletter', error: 'API_URL not configured' });
    return NextResponse.json({ error: 'Service unavailable' }, { status: 500 });
  }

  try {
    await fetch(`${apiUrl}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        source,
        type: 'newsletter',
        // Pass through routing metadata so the upstream notification service
        // can pick the right sequence and confirmation email. Backwards
        // compatible — extra fields are safely ignored by older receivers.
        sequence_id: sequenceId ?? null,
        magnet_id: magnet?.id ?? null,
        subscribed_at: new Date().toISOString(),
      }),
    });
  } catch (err) {
    // Log without leaking PII; downstream failure must not break UX.
    logError('newsletter.upstream_failed', {
      route: '/api/newsletter',
      ip_hash,
      source,
      error: err instanceof Error ? err.message : 'unknown',
    });
  }

  return NextResponse.json({
    success: true,
    response: {
      title: autoResponse.successTitle,
      message: autoResponse.successMessage,
    },
  });
}
