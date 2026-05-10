import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getClientIp, rateLimit } from '@/lib/rate-limit';
import { parseBody, rateLimitedResponse, requireEnv } from '@/lib/api-helpers';
import { hashForLog, logError, logInfo } from '@/lib/logger';

const chatSchema = z.object({
  message: z.string().min(1).max(500),
  sessionId: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = rateLimit(`chat:${ip}`);
  if (!rl.ok) return rateLimitedResponse(rl.resetAt - Date.now());

  const parsed = await parseBody(req, chatSchema);
  if (!parsed.ok) return parsed.response;

  const ip_hash = hashForLog(ip);
  logInfo('chat.received', {
    route: '/api/chat',
    ip_hash,
    msg_len: parsed.data.message.length,
  });

  let apiUrl: string;
  try {
    apiUrl = requireEnv('API_URL');
  } catch {
    logError('chat.config_error', { route: '/api/chat', error: 'API_URL not configured' });
    return NextResponse.json(
      { success: false, error: { code: 'CONFIG_ERROR', message: 'API_URL not configured' } },
      { status: 500 },
    );
  }

  try {
    const res = await fetch(`${apiUrl}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed.data),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    logError('chat.upstream_failed', {
      route: '/api/chat',
      ip_hash,
      error: err instanceof Error ? err.message : 'unknown',
    });
    return NextResponse.json(
      { success: false, error: { code: 'PROXY_ERROR', message: 'Failed to reach API' } },
      { status: 502 },
    );
  }
}
