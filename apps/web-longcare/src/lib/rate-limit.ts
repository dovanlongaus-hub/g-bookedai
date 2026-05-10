/**
 * In-memory token bucket rate limiter (per Cloud Run instance).
 *
 * NOTE: This is best-effort, per-instance state. It will not coordinate
 * across multiple Cloud Run replicas. For stricter limits, swap for
 * Redis/Upstash/Memorystore. Sufficient for basic abuse mitigation.
 */

type Bucket = { tokens: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  resetAt: number;
};

/**
 * Consume one token from the bucket identified by `key`.
 * Returns `{ ok: false }` when bucket is empty (within the window).
 */
export function rateLimit(
  key: string,
  limit = 10,
  windowMs = 60_000,
): RateLimitResult {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || b.resetAt < now) {
    buckets.set(key, { tokens: limit - 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, resetAt: now + windowMs };
  }
  if (b.tokens <= 0) {
    return { ok: false, remaining: 0, resetAt: b.resetAt };
  }
  b.tokens -= 1;
  return { ok: true, remaining: b.tokens, resetAt: b.resetAt };
}

/**
 * Best-effort client IP extraction. On Cloud Run / proxies, prefer
 * `x-forwarded-for` (left-most entry). Falls back to `x-real-ip`.
 */
export function getClientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) {
    const first = fwd.split(',')[0]?.trim();
    if (first) return first;
  }
  return req.headers.get('x-real-ip') || 'unknown';
}

// Periodic GC to prevent unbounded memory growth on long-lived instances.
// Guarded so this is a no-op in the edge runtime / build-time.
if (typeof setInterval !== 'undefined') {
  const GC_INTERVAL_MS = 5 * 60_000;
  // unref() so it does not keep the event loop alive.
  const handle = setInterval(() => {
    const now = Date.now();
    for (const [k, b] of buckets) {
      if (b.resetAt < now) buckets.delete(k);
    }
  }, GC_INTERVAL_MS) as unknown as { unref?: () => void };
  if (typeof handle?.unref === 'function') handle.unref();
}
