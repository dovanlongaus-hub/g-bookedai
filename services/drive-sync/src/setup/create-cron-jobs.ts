/**
 * Setup script: Create Cloud Scheduler cron jobs for automatic Drive sync.
 *
 * Usage: tsx src/setup/create-cron-jobs.ts
 *
 * Creates:
 * - Daily report at 8:00 AM AEST (Mon-Fri)
 * - Weekly summary at 9:00 AM AEST (Monday)
 */
import { CloudSchedulerClient } from '@google-cloud/scheduler';

const PROJECT = process.env.GOOGLE_CLOUD_PROJECT || 'longcare-prod';
const LOCATION = process.env.CLOUD_SCHEDULER_LOCATION || 'australia-southeast1';
const DRIVE_SYNC_URL = process.env.DRIVE_SYNC_URL || 'https://drive-sync.g.bookedai.au';

async function createCronJobs() {
  const client = new CloudSchedulerClient();
  const parent = `projects/${PROJECT}/locations/${LOCATION}`;

  const jobs = [
    {
      name: `${parent}/jobs/daily-progress-report`,
      description: 'Daily progress report sync to CEO Google Drive',
      schedule: '0 8 * * 1-5', // 8:00 AM Mon-Fri
      timeZone: 'Australia/Sydney',
      httpTarget: {
        uri: `${DRIVE_SYNC_URL}/cron/daily-report`,
        httpMethod: 'POST' as const,
        headers: { 'Content-Type': 'application/json' },
      },
    },
    {
      name: `${parent}/jobs/weekly-progress-summary`,
      description: 'Weekly summary report sync to CEO Google Drive',
      schedule: '0 9 * * 1', // 9:00 AM Monday
      timeZone: 'Australia/Sydney',
      httpTarget: {
        uri: `${DRIVE_SYNC_URL}/cron/weekly-report`,
        httpMethod: 'POST' as const,
        headers: { 'Content-Type': 'application/json' },
      },
    },
  ];

  for (const job of jobs) {
    try {
      await client.createJob({ parent, job });
      console.log(`✅ Created: ${job.name}`);
    } catch (err: any) {
      if (err.code === 6) { // ALREADY_EXISTS
        await client.updateJob({ job });
        console.log(`🔄 Updated: ${job.name}`);
      } else {
        console.error(`❌ Failed: ${job.name}`, err.message);
      }
    }
  }

  console.log('\nCron jobs configured:');
  console.log('  - Daily report: 8:00 AM AEST (Mon-Fri)');
  console.log('  - Weekly summary: 9:00 AM AEST (Monday)');
  console.log(`  - Target: ${DRIVE_SYNC_URL}`);
  console.log(`  - Drive owner: ceo@longcare.au`);
}

createCronJobs().catch((err) => {
  console.error('Failed to create cron jobs:', err);
  process.exit(1);
});
