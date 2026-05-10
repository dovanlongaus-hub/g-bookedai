import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getClientIp, rateLimit } from '@/lib/rate-limit';
import { parseBody, rateLimitedResponse, requireEnv } from '@/lib/api-helpers';
import { hashForLog, logError, logInfo } from '@/lib/logger';

const quizLeadSchema = z.object({
  email: z.string().email(),
  score: z.number().optional(),
  level: z.string().max(100).optional(),
  answers: z.record(z.string(), z.unknown()).optional(),
});

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = rateLimit(`quiz-lead:${ip}`);
  if (!rl.ok) return rateLimitedResponse(rl.resetAt - Date.now());

  const parsed = await parseBody(req, quizLeadSchema);
  if (!parsed.ok) return parsed.response;
  const { email, score, level, answers } = parsed.data;

  const ip_hash = hashForLog(ip);
  const email_hash = hashForLog(email.toLowerCase());
  logInfo('quiz_lead.received', {
    route: '/api/quiz-lead',
    score,
    level,
    ip_hash,
    email_hash,
  });

  let apiUrl: string;
  try {
    apiUrl = requireEnv('API_URL');
  } catch {
    logError('quiz_lead.config_error', { route: '/api/quiz-lead', error: 'API_URL not configured' });
    return NextResponse.json({ error: 'Service unavailable' }, { status: 500 });
  }

  try {
    await fetch(`${apiUrl}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        source: 'ai-readiness-quiz',
        metadata: { score, level, answers },
      }),
    });
  } catch (err) {
    logError('quiz_lead.upstream_failed', {
      route: '/api/quiz-lead',
      ip_hash,
      error: err instanceof Error ? err.message : 'unknown',
    });
  }

  return NextResponse.json({ ok: true });
}
