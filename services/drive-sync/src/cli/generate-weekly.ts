/**
 * CLI: Generate weekly summary report
 * Usage: pnpm --filter @bookedai/drive-sync report:weekly
 */
import { generateProgressSnapshot } from '../reports/progress-report.js';
import { closePool } from '@bookedai/db';

async function main() {
  console.log('📈 Generating weekly summary...\n');

  const snapshot = await generateProgressSnapshot();

  console.log('='.repeat(50));
  console.log('  WEEKLY SUMMARY — LONGCARE AU');
  console.log(`  Week ending: ${snapshot.date}`);
  console.log('='.repeat(50));
  console.log('');
  console.log('  💰 REVENUE');
  console.log(`     Total:        $${(snapshot.totalRevenueCents / 100).toFixed(2)} AUD`);
  console.log(`     Stripe:       $${(snapshot.stripeRevenueCents / 100).toFixed(2)}`);
  console.log(`     Bank Transfer: $${(snapshot.bankTransferRevenueCents / 100).toFixed(2)}`);
  console.log('');
  console.log('  📅 BOOKINGS');
  console.log(`     Total:     ${snapshot.totalBookings}`);
  console.log(`     Confirmed: ${snapshot.confirmedBookings}`);
  console.log(`     Cancelled: ${snapshot.cancelledBookings}`);
  console.log(`     Pending:   ${snapshot.pendingBookings}`);
  console.log('');
  console.log('  👥 USERS');
  console.log(`     Total: ${snapshot.totalUsers}`);
  console.log('');
  console.log('  📚 LEARNING');
  console.log(`     Sessions: ${snapshot.totalSessions}`);
  console.log(`     With AI Summary: ${snapshot.sessionsWithSummary}`);
  console.log('');
  console.log('  📢 MARKETING');
  console.log(`     Campaigns: ${snapshot.totalCampaigns}`);
  console.log(`     Published: ${snapshot.publishedCampaigns}`);
  console.log('');

  if (snapshot.serviceBreakdown.length > 0) {
    console.log('  📦 BY SERVICE');
    for (const s of snapshot.serviceBreakdown) {
      console.log(`     ${s.name}: ${s.bookings} bookings, $${(s.revenue / 100).toFixed(2)}`);
    }
  }

  console.log('');
  console.log('='.repeat(50));

  await closePool();
}

main().catch((err) => {
  console.error('Report generation failed:', err);
  process.exit(1);
});
