import { Logging } from '@google-cloud/logging';

let _logging: Logging | null = null;

function getLogging(): Logging {
  if (!_logging) {
    _logging = new Logging({ projectId: process.env.GOOGLE_CLOUD_PROJECT });
  }
  return _logging;
}

export const cloudLogging = {
  async log(logName: string, severity: string, message: string, data?: Record<string, unknown>) {
    const logging = getLogging();
    const log = logging.log(logName);

    const entry = log.entry(
      {
        resource: { type: 'cloud_run_revision' },
        severity,
      },
      { message, ...data, timestamp: new Date().toISOString() },
    );

    await log.write(entry);
  },

  info: (msg: string, data?: Record<string, unknown>) => cloudLogging.log('bookedai-api', 'INFO', msg, data),
  warn: (msg: string, data?: Record<string, unknown>) => cloudLogging.log('bookedai-api', 'WARNING', msg, data),
  error: (msg: string, data?: Record<string, unknown>) => cloudLogging.log('bookedai-api', 'ERROR', msg, data),
};
