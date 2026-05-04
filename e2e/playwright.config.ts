import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,
  use: {
    baseURL: 'https://longcare.au',
    headless: true,
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'longcare', use: { baseURL: 'https://longcare.au' } },
    { name: 'bookedai', use: { baseURL: 'https://g.longcare.au' } },
    { name: 'booking', use: { baseURL: 'https://book.longcare.au' } },
  ],
});
