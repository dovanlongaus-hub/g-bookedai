// Structured JSON logger for API routes. Cloud Logging-compatible.
// Usage:
//   logInfo('newsletter.subscribe', { source: 'toolkit-waitlist', ip_hash: '...' });
//   logError('chat.upstream_failed', { route: '/api/chat', err });

type Level = 'INFO' | 'WARN' | 'ERROR';

function emit(severity: Level, event: string, fields: Record<string, unknown>) {
  const line = JSON.stringify({
    severity,
    event,
    timestamp: new Date().toISOString(),
    ...fields,
  });
  if (severity === 'ERROR') console.error(line);
  else if (severity === 'WARN') console.warn(line);
  else console.log(line);
}

// Hash a value for privacy-safe logging. Use for IPs, partial emails.
// Simple non-cryptographic hash — good enough for log correlation, not for security.
export function hashForLog(input: string): string {
  let h = 5381;
  for (let i = 0; i < input.length; i++) h = ((h << 5) + h) ^ input.charCodeAt(i);
  return (h >>> 0).toString(16);
}

export const logInfo = (event: string, fields: Record<string, unknown> = {}) =>
  emit('INFO', event, fields);
export const logWarn = (event: string, fields: Record<string, unknown> = {}) =>
  emit('WARN', event, fields);
export const logError = (event: string, fields: Record<string, unknown> = {}) =>
  emit('ERROR', event, fields);
