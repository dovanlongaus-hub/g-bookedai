// Load .env file
const { readFileSync } = require('fs');
const { resolve } = require('path');
const dotenv = {};
try {
  const envFile = readFileSync(resolve(__dirname, '.env'), 'utf-8');
  envFile.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...vals] = trimmed.split('=');
      dotenv[key.trim()] = vals.join('=').trim();
    }
  });
} catch (e) {}

module.exports = {
  apps: [
    {
      name: 'api',
      script: 'npx',
      args: 'tsx services/api/src/index.ts',
      cwd: '/home/dovanlong/g.bookedai.au',
      env: {
        PORT: 8090,
        DATABASE_URL: dotenv.DATABASE_URL || 'postgresql://bookedai:localpass@localhost:5432/longcare',
        NODE_ENV: 'production',
        AGENT_SERVICE_URL: 'http://localhost:8091',
        GEMINI_API_KEY: dotenv.GEMINI_API_KEY || '',
        STRIPE_SECRET_KEY: dotenv.STRIPE_SECRET_KEY || '',
        STRIPE_WEBHOOK_SECRET: dotenv.STRIPE_WEBHOOK_SECRET || '',
        GOOGLE_CLIENT_ID: dotenv.GOOGLE_CLIENT_ID || '',
        GOOGLE_CLIENT_SECRET: dotenv.GOOGLE_CLIENT_SECRET || '',
        GOOGLE_APPLICATION_CREDENTIALS: dotenv.GOOGLE_APPLICATION_CREDENTIALS || '',
        GOOGLE_CLOUD_PROJECT: dotenv.GOOGLE_CLOUD_PROJECT || 'auschain-489904',
        WHATSAPP_ACCESS_TOKEN: dotenv.WHATSAPP_ACCESS_TOKEN || '',
        WHATSAPP_PHONE_NUMBER_ID: dotenv.WHATSAPP_PHONE_NUMBER_ID || '',
        WHATSAPP_VERIFY_TOKEN: dotenv.WHATSAPP_VERIFY_TOKEN || 'bookedai-whatsapp-verify-2026',
        ALLOWED_ORIGINS: 'https://longcare.au,https://book.longcare.au,https://app.longcare.au,https://admin.longcare.au,https://g.longcare.au,http://localhost:3000,http://localhost:3001,http://localhost:3002,http://localhost:3003,http://localhost:3004',
      },
    },
    {
      name: 'agent',
      script: 'npx',
      args: 'tsx services/agent/src/index.ts',
      cwd: '/home/dovanlong/g.bookedai.au',
      env: {
        PORT: 8091,
        GEMINI_API_KEY: dotenv.GEMINI_API_KEY || '',
      },
    },
    {
      name: 'web-g',
      script: 'npx',
      args: 'next dev -p 3000',
      cwd: '/home/dovanlong/g.bookedai.au/apps/web-g-bookedai',
      env: { API_URL: 'http://localhost:8090', NEXT_PUBLIC_GA4_ID: 'G-2L68DR1GD4', NEXT_PUBLIC_GTM_ID: dotenv.GTM_ID || '' },
    },
    {
      name: 'web-longcare',
      script: 'npx',
      args: 'next dev -p 3001',
      cwd: '/home/dovanlong/g.bookedai.au/apps/web-longcare',
      env: { NEXT_PUBLIC_GA4_ID: dotenv.GA4_MEASUREMENT_ID || '', NEXT_PUBLIC_GTM_ID: dotenv.GTM_ID || '' },
    },
    {
      name: 'booking',
      script: 'npx',
      args: 'next dev -p 3002',
      cwd: '/home/dovanlong/g.bookedai.au/apps/booking-web',
      env: { NEXT_PUBLIC_GA4_ID: dotenv.GA4_MEASUREMENT_ID || '', NEXT_PUBLIC_GTM_ID: dotenv.GTM_ID || '' },
    },
    {
      name: 'meet',
      script: 'npx',
      args: 'next dev -p 3005',
      cwd: '/home/dovanlong/g.bookedai.au/apps/meet',
    },
    {
      name: 'user-app',
      script: 'npx',
      args: 'next dev -p 3003',
      cwd: '/home/dovanlong/g.bookedai.au/apps/user-app',
      env: { NEXT_PUBLIC_GA4_ID: dotenv.GA4_MEASUREMENT_ID || '', NEXT_PUBLIC_GTM_ID: dotenv.GTM_ID || '' },
    },
    {
      name: 'admin',
      script: 'npx',
      args: 'next dev -p 3004',
      cwd: '/home/dovanlong/g.bookedai.au/apps/admin-app',
      env: { NEXT_PUBLIC_GA4_ID: dotenv.GA4_MEASUREMENT_ID || '', NEXT_PUBLIC_GTM_ID: dotenv.GTM_ID || '' },
    },
    {
      name: 'drive-sync',
      script: 'npx',
      args: 'tsx services/drive-sync/src/index.ts',
      cwd: '/home/dovanlong/g.bookedai.au',
      env: {
        PORT: 8083,
        DATABASE_URL: dotenv.DATABASE_URL || 'postgresql://bookedai:localpass@localhost:5432/longcare',
        CEO_EMAIL: 'ceo@longcare.au',
        GOOGLE_CLOUD_PROJECT: dotenv.GOOGLE_CLOUD_PROJECT || 'auschain-489904',
      },
    },
  ],
};
