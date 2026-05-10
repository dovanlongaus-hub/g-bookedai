import type { ZodSchema } from 'zod';
import { NextResponse } from 'next/server';

/**
 * Parse a JSON body and validate it against a Zod schema.
 *
 * Returns a discriminated union so callers can early-return the prebuilt
 * 400 response when validation fails, or proceed with `data` on success.
 */
export type ParseResult<T> =
  | { ok: true; data: T }
  | { ok: false; response: NextResponse };

export async function parseBody<T>(
  req: Request,
  schema: ZodSchema<T>,
): Promise<ParseResult<T>> {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }),
    };
  }
  const result = schema.safeParse(raw);
  if (!result.success) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: 'Validation failed', issues: result.error.issues },
        { status: 400 },
      ),
    };
  }
  return { ok: true, data: result.data };
}

/**
 * Standard 429 response with a Retry-After header (seconds).
 */
export function rateLimitedResponse(retryAfterMs: number): NextResponse {
  const seconds = Math.max(1, Math.ceil(retryAfterMs / 1000));
  return NextResponse.json(
    { error: 'Too many requests' },
    {
      status: 429,
      headers: { 'Retry-After': seconds.toString() },
    },
  );
}

/**
 * Throw at request time if a required env var is missing.
 * Use inside route handlers so the error becomes a 5xx rather than a
 * silent fallback to localhost.
 */
export function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env: ${name}`);
  return v;
}
