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

  // Bank transfer
  BANK_TRANSFER_PAYID: z.string().default('ceo@longcare.au'),
  BANK_TRANSFER_BSB: z.string().optional(),
  BANK_TRANSFER_ACCOUNT_NUMBER: z.string().optional(),
  BANK_TRANSFER_ACCOUNT_NAME: z.string().default('Longcare AU'),

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
  }
  return _env;
}
