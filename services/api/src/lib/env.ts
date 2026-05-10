import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'staging', 'production']).default('development'),
  PORT: z.coerce.number().default(8080),

  // Database
  DATABASE_URL: z.string().url().optional(),

  // Google
  GEMINI_API_KEY: z.string().optional(),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),

  // Stripe
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  // Comma-separated. Each must be enabled in Stripe Dashboard → Payment methods first.
  STRIPE_PAYMENT_METHODS: z.string().default('card'),

  // Bank transfer — PayID / BSB+Account (Westpac, NAB, etc.)
  BANK_TRANSFER_PAYID: z.string().default('ceo@longcare.au'),
  BANK_TRANSFER_BSB: z.string().optional(),
  BANK_TRANSFER_ACCOUNT_NUMBER: z.string().optional(),
  BANK_TRANSFER_ACCOUNT_NAME: z.string().default('Longcare AU'),
  BANK_TRANSFER_BANK_NAME: z.string().default('Westpac'),

  // BPAY
  BPAY_BILLER_CODE: z.string().optional(),

  // VietQR (Vietnamese bank only — see https://api.vietqr.io for bank BIN list)
  VIETQR_BANK_BIN: z.string().optional(),
  VIETQR_ACCOUNT_NUMBER: z.string().optional(),
  VIETQR_ACCOUNT_NAME: z.string().optional(),

  // Pay-on-arrival — toggle to enable "Book now, pay at appointment" flow
  PAY_ON_ARRIVAL_ENABLED: z.coerce.boolean().default(false),

  // URLs
  APP_BASE_URL: z.string().default('http://localhost:3000'),
  API_BASE_URL: z.string().default('http://localhost:8080'),

  // Google Cloud
  GOOGLE_CLOUD_PROJECT: z.string().default('longcare-prod'),
  MENTOR_EMAIL: z.string().email().default('ceo@longcare.au'),
  BIGQUERY_DATASET: z.string().default('bookedai_analytics'),
  CLOUD_SCHEDULER_LOCATION: z.string().default('australia-southeast1'),
  CLOUD_TASKS_LOCATION: z.string().default('australia-southeast1'),
  CLOUD_TASKS_QUEUE: z.string().default('bookedai-default'),

  // OpenAI OAuth (fallback auth)
  OPENAI_CLIENT_ID: z.string().optional(),
  OPENAI_CLIENT_SECRET: z.string().optional(),
  OPENAI_REDIRECT_URI: z.string().default('https://api.g.bookedai.au/auth/openai/callback'),

  // JWT for session (fallback when Firebase unavailable)
  JWT_SECRET: z.string().default('dev-secret-change-in-production'),

  // CORS
  ALLOWED_ORIGINS: z.string().default('http://localhost:3000,http://localhost:3001,http://localhost:3002,http://localhost:3003,http://localhost:3004'),
});

export type Env = z.infer<typeof envSchema>;

let _env: Env | null = null;

export function getEnv(): Env {
  if (!_env) {
    const result = envSchema.safeParse(process.env);
    if (!result.success) {
      console.error('Invalid environment variables:', result.error.flatten().fieldErrors);
      process.exit(1);
    }
    _env = result.data;
    assertStripeModeMatchesEnv(_env);
  }
  return _env;
}

// Refuse to boot if a live Stripe key is used outside production, or a test key in production.
// This prevents accidental real charges in dev/staging and accidental missed charges in prod.
function assertStripeModeMatchesEnv(env: Env): void {
  const key = env.STRIPE_SECRET_KEY;
  if (!key) return;
  const isLiveKey = key.startsWith('sk_live_') || key.startsWith('rk_live_');
  const isTestKey = key.startsWith('sk_test_') || key.startsWith('rk_test_');
  if (!isLiveKey && !isTestKey) return; // unrecognised — let Stripe SDK reject at call time

  if (isLiveKey && env.NODE_ENV !== 'production') {
    console.error(`FATAL: Stripe LIVE key detected in NODE_ENV=${env.NODE_ENV}. Refusing to start.`);
    process.exit(1);
  }
  if (isTestKey && env.NODE_ENV === 'production') {
    console.error('FATAL: Stripe TEST key detected in NODE_ENV=production. Refusing to start.');
    process.exit(1);
  }
}
