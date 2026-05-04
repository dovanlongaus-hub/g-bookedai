import { getPool, closePool } from './index.js';

async function seed() {
  const pool = getPool();

  // Seed Longcare tenant
  await pool.query(`
    INSERT INTO tenants (id, domain, name) VALUES
      ('00000000-0000-0000-0000-000000000001', 'longcare.au', 'Longcare AU')
    ON CONFLICT (domain) DO NOTHING
  `);

  // Seed services (idempotent — skip if already exists)
  const services = [
    { name: '30-min AI Starter Session', desc: 'Quick introduction to AI tools', price: 2900 },
    { name: '1-hour AI Mentor', desc: 'Deep-dive mentoring session', price: 9900 },
    { name: '5-Session Package', desc: 'Structured AI learning path', price: 45000 },
    { name: '10-Session Package', desc: 'Comprehensive AI mastery', price: 85000 },
    { name: 'AI Business Transformation Program', desc: 'Premium B2B transformation', price: 150000 },
  ];

  for (const s of services) {
    await pool.query(`
      INSERT INTO services (tenant_id, name, description, price_cents, currency)
      SELECT '00000000-0000-0000-0000-000000000001', $1, $2, $3, 'AUD'
      WHERE NOT EXISTS (SELECT 1 FROM services WHERE name = $1 AND tenant_id = '00000000-0000-0000-0000-000000000001')
    `, [s.name, s.desc, s.price]);
  }

  await closePool();
  console.log('Seed complete');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
