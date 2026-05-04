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

  // Seed availability slots for next 14 days
  const serviceResult = await pool.query("SELECT id FROM services WHERE tenant_id = '00000000-0000-0000-0000-000000000001' LIMIT 5");
  const serviceIds = serviceResult.rows.map((r: any) => r.id);

  if (serviceIds.length > 0) {
    const now = new Date();
    let slotsCreated = 0;

    for (let day = 1; day <= 14; day++) {
      const date = new Date(now);
      date.setDate(date.getDate() + day);

      // Skip weekends
      if (date.getDay() === 0 || date.getDay() === 6) continue;

      // Create slots at 9am, 10am, 11am, 1pm, 2pm, 3pm, 4pm
      for (const hour of [9, 10, 11, 13, 14, 15, 16]) {
        const startsAt = new Date(date);
        startsAt.setHours(hour, 0, 0, 0);
        const endsAt = new Date(startsAt);
        endsAt.setHours(hour + 1);

        // Assign to random service
        const serviceId = serviceIds[Math.floor(Math.random() * serviceIds.length)];

        const existing = await pool.query(
          'SELECT 1 FROM availability_slots WHERE service_id = $1 AND starts_at = $2',
          [serviceId, startsAt.toISOString()]
        );

        if (existing.rows.length === 0) {
          await pool.query(
            `INSERT INTO availability_slots (service_id, starts_at, ends_at, status)
             VALUES ($1, $2, $3, 'AVAILABLE')`,
            [serviceId, startsAt.toISOString(), endsAt.toISOString()]
          );
          slotsCreated++;
        }
      }
    }
    console.log(`Seeded ${slotsCreated} availability slots`);
  }

  await closePool();
  console.log('Seed complete');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
