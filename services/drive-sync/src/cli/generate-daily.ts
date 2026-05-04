/**
 * CLI: Generate daily report locally (for testing without Drive upload)
 * Usage: pnpm --filter @bookedai/drive-sync report:daily
 */
import { generateProgressSnapshot } from '../reports/progress-report.js';
import { formatDailyReportHtml } from '../reports/format-html.js';
import { writeFileSync } from 'fs';
import { closePool } from '@bookedai/db';

async function main() {
  console.log('📊 Generating daily progress report...\n');

  const snapshot = await generateProgressSnapshot();
  const html = formatDailyReportHtml(snapshot);

  const filename = `daily-report-${snapshot.date}.html`;
  writeFileSync(filename, html);
  console.log(`✅ Report saved to: ${filename}`);

  console.log('\n--- Summary ---');
  console.log(`Revenue: $${(snapshot.totalRevenueCents / 100).toFixed(2)} AUD`);
  console.log(`Bookings: ${snapshot.totalBookings} (${snapshot.confirmedBookings} confirmed)`);
  console.log(`Users: ${snapshot.totalUsers} (+${snapshot.newUsersToday} today)`);
  console.log(`Sessions: ${snapshot.totalSessions}`);
  console.log(`Campaigns: ${snapshot.totalCampaigns}`);

  await closePool();
}

main().catch((err) => {
  console.error('Report generation failed:', err);
  process.exit(1);
});
