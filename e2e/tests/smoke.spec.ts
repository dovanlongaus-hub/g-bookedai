import { test, expect } from '@playwright/test';

test.describe('Longcare AU Smoke Tests', () => {
  test('landing page loads', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Longcare/);
  });

  test('services page loads', async ({ page }) => {
    await page.goto('/services');
    await expect(page).toHaveTitle(/Services/);
  });

  test('pricing page loads', async ({ page }) => {
    await page.goto('/pricing');
    await expect(page).toHaveTitle(/Pricing/);
  });

  test('FAQ page loads with accordion', async ({ page }) => {
    await page.goto('/faq');
    await expect(page).toHaveTitle(/FAQ/);
  });

  test('blog listing loads', async ({ page }) => {
    await page.goto('/blog');
    await expect(page).toHaveTitle(/Blog/);
  });

  test('blog post loads', async ({ page }) => {
    await page.goto('/blog/getting-started-with-ai');
    await expect(page).toHaveTitle(/Getting Started/);
  });

  test('contact page shows Sydney', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.locator('body')).toContainText('Sydney');
  });

  test('terms page loads', async ({ page }) => {
    await page.goto('/terms');
    await expect(page).toHaveTitle(/Terms/);
  });
});

test.describe('BookedAI Platform Smoke Tests', () => {
  test('platform landing loads', async ({ page }) => {
    await page.goto('https://g.longcare.au');
    await expect(page).toHaveTitle(/BookedAI/);
  });

  test('features page loads', async ({ page }) => {
    await page.goto('https://g.longcare.au/features');
    await expect(page).toHaveTitle(/BookedAI/);
  });

  test('docs page loads', async ({ page }) => {
    await page.goto('https://g.longcare.au/docs');
    await expect(page).toHaveTitle(/Documentation/);
  });
});

test.describe('Booking Flow Smoke Tests', () => {
  test('booking page loads services from API', async ({ page }) => {
    await page.goto('https://book.longcare.au');
    await expect(page).toHaveTitle(/Book/);
    // Wait for services to load
    await page.waitForTimeout(3000);
    await expect(page.locator('body')).toContainText('AI');
  });
});

test.describe('API Smoke Tests', () => {
  test('health endpoint', async ({ request }) => {
    const res = await request.get('https://longcare.au/api/health');
    expect(res.ok()).toBeTruthy();
    const data = await res.json();
    expect(data.status).toBe('healthy');
  });

  test('services endpoint', async ({ request }) => {
    const res = await request.get('https://longcare.au/api/services');
    expect(res.ok()).toBeTruthy();
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.data.length).toBeGreaterThan(0);
  });

  test('chat endpoint', async ({ request }) => {
    const res = await request.post('https://longcare.au/api/chat', {
      data: { message: 'hello', language: 'en' },
    });
    expect(res.ok()).toBeTruthy();
    const data = await res.json();
    expect(data.data.reply).toBeTruthy();
  });

  test('whatsapp webhook verification', async ({ request }) => {
    const res = await request.get('https://longcare.au/whatsapp?hub.mode=subscribe&hub.verify_token=bookedai-whatsapp-verify-2026&hub.challenge=TEST');
    expect(await res.text()).toBe('TEST');
  });
});
