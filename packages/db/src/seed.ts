import { getPool, closePool } from './index.js';

async function seed() {
  const pool = getPool();

  // Seed Longcare tenant
  await pool.query(`
    INSERT INTO tenants (id, domain, name) VALUES
      ('00000000-0000-0000-0000-000000000001', 'longcare.au', 'Longcare AU')
    ON CONFLICT (domain) DO NOTHING
  `);

  // Seed services
  await pool.query(`
    INSERT INTO services (tenant_id, name, description, price_cents, currency) VALUES
      ('00000000-0000-0000-0000-000000000001', '30-min AI Starter Session', 'Quick introduction to AI tools', 2900, 'AUD'),
      ('00000000-0000-0000-0000-000000000001', '1-hour AI Mentor', 'Deep-dive mentoring session', 9900, 'AUD'),
      ('00000000-0000-0000-0000-000000000001', '5-Session Package', 'Structured AI learning path', 45000, 'AUD'),
      ('00000000-0000-0000-0000-000000000001', '10-Session Package', 'Comprehensive AI mastery', 85000, 'AUD'),
      ('00000000-0000-0000-0000-000000000001', 'AI Business Transformation Program', 'Premium B2B transformation', 150000, 'AUD')
    ON CONFLICT DO NOTHING
  `);

  await closePool();
  console.log('Seed complete');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
