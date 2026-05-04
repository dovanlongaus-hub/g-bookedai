/**
 * Creates Stripe products and prices matching the services in the database.
 * Run: STRIPE_SECRET_KEY=sk_live_... npx tsx scripts/setup-stripe-products.ts
 */
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

const SERVICES = [
  { name: '30-min AI Starter Session', priceCents: 2900, description: 'Quick introduction to AI tools — 30 minutes via Google Meet' },
  { name: '1-hour AI Mentor', priceCents: 9900, description: 'Deep-dive personalised AI mentoring — 60 minutes via Google Meet' },
  { name: '5-Session Package', priceCents: 45000, description: 'Structured AI learning path — 5 x 60min sessions via Google Meet' },
  { name: '10-Session Package', priceCents: 85000, description: 'Comprehensive AI mastery — 10 x 60min sessions via Google Meet' },
  { name: 'AI Business Transformation Program', priceCents: 150000, description: 'Premium B2B AI transformation program — custom duration' },
];

async function setup() {
  console.log('Creating Stripe products for Longcare AU...\n');

  for (const svc of SERVICES) {
    // Check if product already exists
    const existing = await stripe.products.search({ query: `name:"${svc.name}"` });

    if (existing.data.length > 0) {
      console.log(`  ⏭  ${svc.name} — already exists (${existing.data[0].id})`);
      continue;
    }

    const product = await stripe.products.create({
      name: svc.name,
      description: svc.description,
      metadata: { provider: 'longcare.au', platform: 'bookedai.au' },
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: svc.priceCents,
      currency: 'aud',
    });

    console.log(`  ✅ ${svc.name} — $${svc.priceCents / 100} AUD (product: ${product.id}, price: ${price.id})`);
  }

  console.log('\nDone! Products created in Stripe Dashboard.');
  console.log('View at: https://dashboard.stripe.com/products');
}

setup().catch(err => { console.error('Error:', err.message); process.exit(1); });
