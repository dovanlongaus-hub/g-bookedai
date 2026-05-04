import { logger } from './lib/logger.js';
import { initDriveFolders, getFolderId, uploadDocument, uploadSpreadsheet } from './lib/drive-structure.js';
import { generateProgressSnapshot, type ProgressSnapshot } from './reports/progress-report.js';
import { formatDailyReportHtml, formatRoadmapCsv } from './reports/format-html.js';
import { syncRoadmapToDrive } from './reports/roadmap-sync.js';

export interface SyncResult {
  success: boolean;
  timestamp: string;
  reports: {
    name: string;
    url: string;
    folder: string;
  }[];
  errors: string[];
}

/**
 * Run a full sync: generate reports and upload to CEO's Google Drive.
 */
export async function runFullSync(): Promise<SyncResult> {
  const result: SyncResult = {
    success: true,
    timestamp: new Date().toISOString(),
    reports: [],
    errors: [],
  };

  try {
    // 1. Initialize Drive folder structure
    logger.info('Starting full Drive sync...');
    await initDriveFolders();

    // 2. Generate and upload daily progress report
    try {
      const snapshot = await generateProgressSnapshot();
      const html = formatDailyReportHtml(snapshot);
      const folderId = await getFolderId('01_Progress_Reports/Daily');

      const doc = await uploadDocument({
        title: `Daily Report — ${snapshot.date}`,
        folderId,
        htmlContent: html,
      });

      result.reports.push({
        name: `Daily Report — ${snapshot.date}`,
        url: doc.webViewLink,
        folder: '01_Progress_Reports/Daily',
      });

      // Also upload metrics as spreadsheet
      const csv = formatRoadmapCsv(snapshot);
      const sheet = await uploadSpreadsheet({
        title: `Metrics — ${snapshot.date}`,
        folderId,
        csvContent: csv,
      });

      result.reports.push({
        name: `Metrics — ${snapshot.date}`,
        url: sheet.webViewLink,
        folder: '01_Progress_Reports/Daily',
      });

      logger.info({ date: snapshot.date }, 'Daily progress report uploaded');
    } catch (err) {
      const msg = `Failed to generate daily report: ${err}`;
      logger.error(msg);
      result.errors.push(msg);
    }

    // 3. Sync roadmap + trackers via syncRoadmapToDrive
    try {
      const roadmapResult = await syncRoadmapToDrive();
      for (const f of roadmapResult.files) {
        result.reports.push({ name: f.name, url: f.link, folder: '02_Roadmap_Backlog' });
      }
      logger.info({ files: roadmapResult.files.length }, 'Roadmap synced');
    } catch (err) {
      const msg = `Failed to sync roadmap: ${err}`;
      logger.error(msg);
      result.errors.push(msg);
    }

    result.success = result.errors.length === 0;
  } catch (err) {
    result.success = false;
    result.errors.push(`Sync failed: ${err}`);
    logger.error({ err }, 'Full sync failed');
  }

  return result;
}

/**
 * Sync only the daily progress report.
 */
export async function syncDailyReport(): Promise<SyncResult> {
  const result: SyncResult = { success: true, timestamp: new Date().toISOString(), reports: [], errors: [] };

  try {
    await initDriveFolders();
    const snapshot = await generateProgressSnapshot();
    const html = formatDailyReportHtml(snapshot);
    const folderId = await getFolderId('01_Progress_Reports/Daily');

    const doc = await uploadDocument({
      title: `Daily Report — ${snapshot.date}`,
      folderId,
      htmlContent: html,
    });

    result.reports.push({ name: `Daily Report — ${snapshot.date}`, url: doc.webViewLink, folder: '01_Progress_Reports/Daily' });
    logger.info({ date: snapshot.date }, 'Daily report synced');
  } catch (err) {
    result.success = false;
    result.errors.push(`${err}`);
  }

  return result;
}

/**
 * Sync weekly summary report.
 */
export async function syncWeeklyReport(): Promise<SyncResult> {
  const result: SyncResult = { success: true, timestamp: new Date().toISOString(), reports: [], errors: [] };

  try {
    await initDriveFolders();
    const snapshot = await generateProgressSnapshot();

    const weekNum = getISOWeek(new Date());
    const folderId = await getFolderId('01_Progress_Reports/Weekly');

    const weeklyHtml = generateWeeklyReportHtml(snapshot, weekNum);
    const doc = await uploadDocument({
      title: `Weekly Report — W${weekNum} ${new Date().getFullYear()}`,
      folderId,
      htmlContent: weeklyHtml,
    });

    result.reports.push({
      name: `Weekly Report — W${weekNum}`,
      url: doc.webViewLink,
      folder: '01_Progress_Reports/Weekly',
    });

    logger.info({ week: weekNum }, 'Weekly report synced');
  } catch (err) {
    result.success = false;
    result.errors.push(`${err}`);
  }

  return result;
}

// ── Helpers ──

function generateWeeklyReportHtml(snapshot: ProgressSnapshot, weekNum: number): string {
  const revenue = (snapshot.totalRevenueCents / 100).toFixed(2);

  return `
<!DOCTYPE html><html><body style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
<h1 style="color: #0070f3;">Weekly Executive Report — W${weekNum} ${new Date().getFullYear()}</h1>
<p style="color: #666;">Generated: ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })}</p>
<table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
  <tr style="background: #f5f5f5;"><td style="padding: 10px; border: 1px solid #ddd;"><strong>Revenue</strong></td><td style="padding: 10px; border: 1px solid #ddd; text-align: right; font-weight: bold; color: #22c55e;">$${revenue} AUD</td></tr>
  <tr><td style="padding: 10px; border: 1px solid #ddd;">Total Bookings</td><td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${snapshot.totalBookings}</td></tr>
  <tr><td style="padding: 10px; border: 1px solid #ddd;">Confirmed</td><td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${snapshot.confirmedBookings}</td></tr>
  <tr><td style="padding: 10px; border: 1px solid #ddd;">Users</td><td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${snapshot.totalUsers}</td></tr>
  <tr><td style="padding: 10px; border: 1px solid #ddd;">Learning Sessions</td><td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${snapshot.totalSessions}</td></tr>
  <tr><td style="padding: 10px; border: 1px solid #ddd;">Campaigns</td><td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${snapshot.totalCampaigns} (${snapshot.publishedCampaigns} published)</td></tr>
</table>
<h2>Revenue by Service</h2>
<table style="width: 100%; border-collapse: collapse;">
  <tr style="background: #0070f3; color: white;"><th style="padding: 10px; text-align: left;">Service</th><th style="padding: 10px; text-align: right;">Bookings</th><th style="padding: 10px; text-align: right;">Revenue</th></tr>
  ${snapshot.serviceBreakdown.map((s: { name: string; bookings: number; revenue: number }) => `<tr><td style="padding: 10px; border: 1px solid #ddd;">${s.name}</td><td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${s.bookings}</td><td style="padding: 10px; border: 1px solid #ddd; text-align: right;">$${(s.revenue / 100).toFixed(2)}</td></tr>`).join('')}
</table>
<hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
<p style="color: #999; font-size: 12px;">Auto-generated by BookedAI Drive Sync — ceo@longcare.au</p>
</body></html>`;
}

function getISOWeek(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}