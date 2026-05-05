import pino from 'pino';

const logger = pino({ name: 'tracing' });

// Sentry integration (error tracking)
let sentryInitialized = false;

export function initSentry() {
  const dsn = process.env.SENTRY_DSN;
  if (!dsn || sentryInitialized) return;

  try {
    // Dynamic import to avoid bundling if not configured
    import('@sentry/node').then((Sentry) => {
      Sentry.init({
        dsn,
        environment: process.env.NODE_ENV || 'development',
        release: `bookedai-api@${process.env.COMMIT_SHA || 'local'}`,
        tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.2 : 1.0,
        integrations: [
          Sentry.httpIntegration(),
          Sentry.expressIntegration(),
        ],
      });
      sentryInitialized = true;
      logger.info('Sentry initialized');
    }).catch(() => {
      logger.warn('Sentry SDK not installed, skipping');
    });
  } catch {
    logger.warn('Sentry init failed, continuing without error tracking');
  }
}

export function captureError(err: Error, context?: Record<string, unknown>) {
  logger.error({ err, ...context }, err.message);

  if (sentryInitialized) {
    import('@sentry/node').then((Sentry) => {
      Sentry.captureException(err, { extra: context });
    }).catch(() => {});
  }
}

// Request duration tracking middleware
export function requestDurationMiddleware() {
  return (req: any, res: any, next: any) => {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      const level = duration > 2000 ? 'warn' : 'info';
      logger[level]({
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        duration: `${duration}ms`,
        userAgent: req.headers['user-agent']?.substring(0, 80),
      }, `${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`);
    });
    next();
  };
}
