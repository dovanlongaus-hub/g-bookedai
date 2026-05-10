import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getClientIp, rateLimit } from '@/lib/rate-limit';
import { parseBody, rateLimitedResponse, requireEnv } from '@/lib/api-helpers';
import { hashForLog, logError, logInfo } from '@/lib/logger';

// Spec-required core fields. Extra optional fields preserve compatibility
// with the existing review form (role/company/service/consent).
const reviewSchema = z.object({
  name: z.string().min(1).max(100),
  rating: z.number().int().min(1).max(5),
  review: z.string().min(10).max(2000),
  role: z.string().max(100).optional(),
  company: z.string().max(200).optional(),
  service: z.string().max(200).optional(),
  consent: z.boolean().optional(),
});

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = rateLimit(`review:${ip}`);
  if (!rl.ok) return rateLimitedResponse(rl.resetAt - Date.now());

  const parsed = await parseBody(req, reviewSchema);
  if (!parsed.ok) return parsed.response;
  const { name, role, company, rating, review, service, consent } = parsed.data;

  const ip_hash = hashForLog(ip);
  logInfo('review.received', {
    route: '/api/review',
    rating,
    has_consent: consent || false,
    ip_hash,
  });

  let apiUrl: string;
  try {
    apiUrl = requireEnv('API_URL');
  } catch {
    logError('review.config_error', { route: '/api/review', error: 'API_URL not configured' });
    return NextResponse.json({ error: 'Service unavailable' }, { status: 500 });
  }

  try {
    await fetch(`${apiUrl}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'review',
        source: 'review-form',
        name,
        role,
        company,
        rating,
        review,
        service,
        consent_to_publish: consent || false,
        submitted_at: new Date().toISOString(),
      }),
    });
  } catch (err) {
    logError('review.upstream_failed', {
      route: '/api/review',
      ip_hash,
      error: err instanceof Error ? err.message : 'unknown',
    });
  }

  return NextResponse.json({ success: true });
}
