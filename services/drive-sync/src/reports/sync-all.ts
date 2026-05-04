import { initDriveFolders, getFolderId, uploadDocument, uploadSpreadsheet } from '../lib/drive-structure.js';
import { generateProgressSnapshot } from './progress-report.js';
import { formatDailyReportHtml, formatRoadmapCsv } from './format-html.js';
import { syncRoadmapToDrive } from './roadmap-sync.js';
import { logger } from '../lib/logger.js';

export interface SyncResult {
  success: boolean;
  timestamp: string;
  driveFiles: { name: string; link: string }[];
  errors: string[];
}

/**
 * Full sync: generate all reports and upload to CEO Drive.
 */
export async function syncAllToDrive(): Promise<SyncResult> {
  const result: SyncResult = {
    success: true,
    timestamp: new Date().toISOString(),
    driveFiles: [],
    errors: [],
  };

  try {
    // Step 1: Ensure Drive folder structure exists
    await initDriveFolders();
    logger.info('Drive folders initialized');

    // Step 2: Generate progress snapshot from DB
    const snapshot = await generateProgressSnapshot();

    // Step 3: Upload daily progress report (HTML → Google Doc)
    try {
      const html = formatDailyReportHtml(snapshot);
      const folderId = await getFolderId('01_Progress_Reports/Daily');
      const doc = await uploadDocument({
        title: `Progress Report — ${snapshot.date}`,
        folderId,
        htmlContent: html,
      });
      result.driveFiles.push({ name: `Daily Report ${snapshot.date}`, link: doc.webViewLink });
    } catch (err: any) {
      result.errors.push(`Daily report: ${err.message}`);
      logger.error({ err }, 'Failed to upload daily report');
    }

    // Step 4: Upload metrics spreadsheet (CSV → Google Sheets)
    try {
      const csv = formatRoadmapCsv(snapshot);
      const folderId = await getFolderId('04_Revenue_Reports');
      const sheet = await uploadSpreadsheet({
        title: `Metrics Dashboard — ${snapshot.date}`,
        folderId,
        csvContent: csv,
      });
      result.driveFiles.push({ name: `Metrics ${snapshot.date}`, link: sheet.webViewLink });
    } catch (err: any) {
      result.errors.push(`Metrics sheet: ${err.message}`);
      logger.error({ err }, 'Failed to upload metrics sheet');
    }

    // Step 5: Sync roadmap/UAT/QA trackers
    try {
      const roadmapResult = await syncRoadmapToDrive();
      result.driveFiles.push(...roadmapResult.files);
    } catch (err: any) {
      result.errors.push(`Roadmap sync: ${err.message}`);
      logger.error({ err }, 'Failed to sync roadmap');
    }

    // Step 6: Upload cumulative revenue tracker (append-only Google Sheet)
    try {
      const revenueCsv = [
        'Date,Revenue (AUD),Bookings,Users,Sessions,Campaigns',
        `${snapshot.date},${(snapshot.totalRevenueCents / 100).toFixed(2)},${snapshot.totalBookings},${snapshot.totalUsers},${snapshot.totalSessions},${snapshot.totalCampaigns}`,
      ].join('\n');

      const folderId = await getFolderId('04_Revenue_Reports');
      const sheet = await uploadSpreadsheet({
        title: 'Revenue Tracker — Cumulative',
        folderId,
        csvContent: revenueCsv,
      });
      result.driveFiles.push({ name: 'Revenue Tracker', link: sheet.webViewLink });
    } catch (err: any) {
      result.errors.push(`Revenue tracker: ${err.message}`);
    }

    result.success = result.errors.length === 0;
    logger.info({ fileCount: result.driveFiles.length, errors: result.errors.length }, 'Drive sync complete');
  } catch (err: any) {
    result.success = false;
    result.errors.push(`Fatal: ${err.message}`);
    logger.error({ err }, 'Drive sync failed');
  }

  return result;
}
