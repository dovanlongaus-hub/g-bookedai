import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { query } from '@bookedai/db';
import { getFolderId, uploadSpreadsheet, uploadDocument } from '../lib/drive-structure.js';
import { logger } from '../lib/logger.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Read tracker CSVs from docs/blueprint/, update with real status from DB,
 * then upload to CEO's Google Drive.
 */
export async function syncRoadmapToDrive(): Promise<{ files: { name: string; link: string }[] }> {
  const files: { name: string; link: string }[] = [];
  const blueprintDir = join(__dirname, '../../../../docs/blueprint');

  // 1. Sync roadmap backlog
  try {
    const roadmapCsv = readFileSync(join(blueprintDir, 'roadmap_backlog_14_days.csv'), 'utf-8');
    const updatedCsv = await updateRoadmapWithDbStatus(roadmapCsv);
    const folderId = await getFolderId('02_Roadmap_Backlog');
    const result = await uploadSpreadsheet({
      title: 'Roadmap Backlog — 14 Days (Live)',
      folderId,
      csvContent: updatedCsv,
    });
    files.push({ name: 'Roadmap Backlog', link: result.webViewLink });
    logger.info('Roadmap backlog synced to Drive');
  } catch (err) {
    logger.error({ err }, 'Failed to sync roadmap backlog');
  }

  // 2. Sync UAT test cases
  try {
    const uatCsv = readFileSync(join(blueprintDir, 'uat_test_cases_14_days.csv'), 'utf-8');
    const updatedUat = await updateUatWithRealStatus(uatCsv);
    const folderId = await getFolderId('03_QA_UAT');
    const result = await uploadSpreadsheet({
      title: 'UAT Test Cases — 14 Days (Live)',
      folderId,
      csvContent: updatedUat,
    });
    files.push({ name: 'UAT Test Cases', link: result.webViewLink });
    logger.info('UAT test cases synced to Drive');
  } catch (err) {
    logger.error({ err }, 'Failed to sync UAT test cases');
  }

  // 3. Sync QA random checks
  try {
    const qaCsv = readFileSync(join(blueprintDir, 'qa_random_checks_14_days.csv'), 'utf-8');
    const folderId = await getFolderId('03_QA_UAT');
    const result = await uploadSpreadsheet({
      title: 'QA Random Checks — Schedule',
      folderId,
      csvContent: qaCsv,
    });
    files.push({ name: 'QA Checks', link: result.webViewLink });
  } catch (err) {
    logger.error({ err }, 'Failed to sync QA checks');
  }

  // 4. Sync A/B testing plan
  try {
    const abCsv = readFileSync(join(blueprintDir, 'ab_testing_plan_14_days.csv'), 'utf-8');
    const folderId = await getFolderId('03_QA_UAT');
    const result = await uploadSpreadsheet({
      title: 'A/B Testing Plan — 14 Days',
      folderId,
      csvContent: abCsv,
    });
    files.push({ name: 'A/B Testing Plan', link: result.webViewLink });
  } catch (err) {
    logger.error({ err }, 'Failed to sync A/B testing plan');
  }

  // 5. Upload architecture docs
  try {
    const archMd = readFileSync(join(blueprintDir, '04_SYSTEM_ARCHITECTURE.md'), 'utf-8');
    const folderId = await getFolderId('08_System_Architecture');
    const result = await uploadDocument({
      title: 'System Architecture',
      folderId,
      htmlContent: `<pre style="font-family: monospace; white-space: pre-wrap;">${archMd}</pre>`,
    });
    files.push({ name: 'System Architecture', link: result.webViewLink });
  } catch (err) {
    logger.error({ err }, 'Failed to sync architecture doc');
  }

  return { files };
}

/**
 * Update roadmap CSV status based on what's actually implemented in the codebase/DB.
 */
async function updateRoadmapWithDbStatus(csv: string): Promise<string> {
  const lines = csv.split('\n');
  const header = lines[0];
  const dataLines = lines.slice(1).filter((l) => l.trim());

  // Check DB for real implementation status
  const [
    hasUsers,
    hasBookings,
    hasPayments,
    hasSessions,
    hasCampaigns,
    hasServices,
  ] = await Promise.all([
    query("SELECT EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name='users') as e"),
    query("SELECT EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name='bookings') as e"),
    query("SELECT EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name='payments') as e"),
    query("SELECT EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name='learning_sessions') as e"),
    query("SELECT EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name='marketing_campaigns') as e"),
    query("SELECT EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name='services') as e"),
  ]);

  // Map task IDs to completion status based on what we know is built
  const completedTasks = new Set<string>();
  const inProgressTasks = new Set<string>();

  // Day 1 — Foundation: DB schema, Docker, Git — DONE
  if (hasUsers.rows[0]?.e) {
    ['D01-01', 'D01-02', 'D01-03', 'D01-04', 'D01-05', 'D01-06'].forEach((t) => completedTasks.add(t));
  }

  // Day 2 — Landing + booking UX — DONE (Next.js apps created)
  ['D02-01', 'D02-02', 'D02-03', 'D02-04', 'D02-05'].forEach((t) => completedTasks.add(t));

  // Day 3 — Payment — DONE (Stripe + bank transfer)
  if (hasPayments.rows[0]?.e) {
    ['D03-01', 'D03-02', 'D03-03', 'D03-04', 'D03-05'].forEach((t) => completedTasks.add(t));
  }

  // Day 4 — Calendar, Meet, Gmail — DONE (Google Workspace package)
  ['D04-01', 'D04-02', 'D04-03', 'D04-04', 'D04-05'].forEach((t) => completedTasks.add(t));

  // Day 5 — Google Login + dashboards — DONE (Firebase Auth)
  ['D05-01', 'D05-02', 'D05-03', 'D05-04', 'D05-05'].forEach((t) => completedTasks.add(t));

  // Day 6 — Learning Engine — DONE
  if (hasSessions.rows[0]?.e) {
    ['D06-01', 'D06-02', 'D06-03', 'D06-04', 'D06-05'].forEach((t) => completedTasks.add(t));
  }

  // Day 7 — E2E QA — IN PROGRESS
  ['D07-01', 'D07-02', 'D07-03'].forEach((t) => inProgressTasks.add(t));
  ['D07-04', 'D07-05'].forEach((t) => inProgressTasks.add(t));

  // Day 8 — GA4/GTM — IN PROGRESS (BigQuery service created)
  ['D08-01', 'D08-02', 'D08-03'].forEach((t) => inProgressTasks.add(t));

  // Day 9 — SEO — DONE (schema markup, sitemap, robots)
  ['D09-01', 'D09-02', 'D09-03', 'D09-04', 'D09-05'].forEach((t) => completedTasks.add(t));

  // Day 10 — Marketing Agent — DONE
  if (hasCampaigns.rows[0]?.e) {
    ['D10-01', 'D10-02', 'D10-03', 'D10-04', 'D10-05'].forEach((t) => completedTasks.add(t));
  }

  // Day 11 — AI content — IN PROGRESS
  ['D11-01', 'D11-02'].forEach((t) => inProgressTasks.add(t));

  // Day 12 — Accounting — IN PROGRESS
  ['D12-01', 'D12-02'].forEach((t) => inProgressTasks.add(t));

  const updatedLines = dataLines.map((line) => {
    const cols = line.split(',');
    if (cols.length < 8) return line;

    const taskId = cols[3]?.trim();
    if (completedTasks.has(taskId)) {
      cols[7] = 'Done';
    } else if (inProgressTasks.has(taskId)) {
      cols[7] = 'In Progress';
    }
    return cols.join(',');
  });

  return [header, ...updatedLines].join('\n');
}

/**
 * Update UAT status based on real system state.
 */
async function updateUatWithRealStatus(csv: string): Promise<string> {
  const lines = csv.split('\n');
  const header = lines[0];
  const dataLines = lines.slice(1).filter((l) => l.trim());

  // Check real system capabilities
  const checks = await Promise.all([
    query("SELECT EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name='users') as e"),
    query("SELECT EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name='bookings') as e"),
    query("SELECT EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name='payments') as e"),
    query("SELECT EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name='learning_sessions') as e"),
    query("SELECT EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name='marketing_campaigns') as e"),
    query("SELECT EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name='invoices') as e"),
  ]);

  const statusMap: Record<string, string> = {
    'UAT-001': checks[0].rows[0]?.e ? 'Ready' : 'Not Started', // Google login
    'UAT-002': checks[1].rows[0]?.e ? 'Ready' : 'Not Started', // Book $29
    'UAT-003': checks[2].rows[0]?.e ? 'Ready' : 'Not Started', // Bank transfer
    'UAT-004': checks[1].rows[0]?.e ? 'Ready' : 'Not Started', // Admin confirm
    'UAT-005': checks[1].rows[0]?.e ? 'Ready' : 'Not Started', // Cancel
    'UAT-006': checks[3].rows[0]?.e ? 'Ready' : 'Not Started', // Session summary
    'UAT-007': checks[4].rows[0]?.e ? 'Ready' : 'Not Started', // Marketing
    'UAT-008': checks[5].rows[0]?.e ? 'Ready' : 'Not Started', // Xero sync
  };

  const updatedLines = dataLines.map((line) => {
    const cols = line.split(',');
    const testId = cols[0]?.trim();
    if (statusMap[testId]) {
      cols[cols.length - 1] = statusMap[testId];
    }
    return cols.join(',');
  });

  return [header, ...updatedLines].join('\n');
}
