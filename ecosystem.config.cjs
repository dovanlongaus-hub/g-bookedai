module.exports = {
  apps: [
    {
      name: 'api',
      script: 'npx',
      args: 'tsx services/api/src/index.ts',
      cwd: '/home/dovanlong/g.bookedai.au',
      env: {
        PORT: 8090,
        DATABASE_URL: 'postgresql://bookedai:localpass@localhost:5432/longcare',
        NODE_ENV: 'production',
        AGENT_SERVICE_URL: 'http://localhost:8091',
        GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || '',
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
        GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
      },
    },
    {
      name: 'web-g',
      script: 'npx',
      args: 'next dev -p 3000',
      cwd: '/home/dovanlong/g.bookedai.au/apps/web-g-bookedai',
      env: { API_URL: 'http://localhost:8090' },
    },
    {
      name: 'web-longcare',
      script: 'npx',
      args: 'next dev -p 3001',
      cwd: '/home/dovanlong/g.bookedai.au/apps/web-longcare',
    },
    {
      name: 'booking',
      script: 'npx',
      args: 'next dev -p 3002',
      cwd: '/home/dovanlong/g.bookedai.au/apps/booking-web',
    },
    {
      name: 'user-app',
      script: 'npx',
      args: 'next dev -p 3003',
      cwd: '/home/dovanlong/g.bookedai.au/apps/user-app',
    },
    {
      name: 'admin',
      script: 'npx',
      args: 'next dev -p 3004',
      cwd: '/home/dovanlong/g.bookedai.au/apps/admin-app',
    },
  ],
};
