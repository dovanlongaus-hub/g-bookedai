/**
 * CLI: Manual sync trigger
 * Usage: pnpm --filter @bookedai/drive-sync sync
 */
import { syncAllToDrive } from '../reports/sync-all.js';
import { closePool } from '@bookedai/db';

async function main() {
  console.log('🔄 Starting Drive sync for ceo@longcare.au ...\n');

  const result = await syncAllToDrive();

  console.log('\n📁 Files synced to Google Drive:');
  for (const file of result.driveFiles) {
    console.log(`  ✅ ${file.name}`);
    console.log(`     ${file.link}`);
  }

  if (result.errors.length > 0) {
    console.log('\n⚠️ Errors:');
    for (const err of result.errors) {
      console.log(`  ❌ ${err}`);
    }
  }

  console.log(`\n${result.success ? '✅ Sync completed successfully' : '⚠️ Sync completed with errors'}`);

  await closePool();
}

main().catch((err) => {
  console.error('Sync failed:', err);
  process.exit(1);
});
