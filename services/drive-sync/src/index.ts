import express from 'express';
import cors from 'cors';
import { logger } from './lib/logger.js';
import { syncAllToDrive } from './reports/sync-all.js';
import { syncRoadmapToDrive } from './reports/roadmap-sync.js';
import { generateProgressSnapshot } from './reports/progress-report.js';
import { syncDocsToDrive, syncChangeLogToSheets, syncMetricsToSheets } from './reports/docs-sync.js';
import { syncToNotebookLM } from './reports/notebooklm-sync.js';
import { initDriveFolders } from './lib/drive-structure.js';
import { closePool } from '@bookedai/db';

const app = express();
const port = Number(process.env.PORT) || 8083;

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'drive-sync' });
});

// Full sync — generates all reports and uploads to CEO Drive
app.post('/sync/all', async (_req, res) => {
  logger.info('Full Drive sync triggered');
  try {
    const result = await syncAllToDrive();
    res.json({ success: true, data: result });
  } catch (err: any) {
    logger.error({ err }, 'Sync failed');
    res.status(500).json({ success: false, error: err.message });
  }
});

// Sync roadmap/trackers only
app.post('/sync/roadmap', async (_req, res) => {
  try {
    const result = await syncRoadmapToDrive();
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get progress snapshot (without uploading)
app.get('/progress', async (_req, res) => {
  try {
    const snapshot = await generateProgressSnapshot();
    res.json({ success: true, data: snapshot });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Initialize Drive folder structure
app.post('/init-folders', async (_req, res) => {
  try {
    const folders = await initDriveFolders();
    const folderList = Array.from(folders.entries()).map(([path, id]) => ({ path, id }));
    res.json({ success: true, data: { folders: folderList } });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Sync project docs (PRD, Roadmap, Architecture) to Google Drive
app.post('/sync/docs', async (_req, res) => {
  logger.info('Document sync triggered');
  try {
    const result = await syncDocsToDrive();
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Sync Change Request log to Google Sheets
app.post('/sync/changelog', async (_req, res) => {
  try {
    const result = await syncChangeLogToSheets();
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Sync CEO metrics dashboard to Google Sheets
app.post('/sync/metrics', async (_req, res) => {
  try {
    const snapshot = await generateProgressSnapshot();
    const result = await syncMetricsToSheets(snapshot);
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Sync knowledge base to NotebookLM-optimized Google Doc
app.post('/sync/notebooklm', async (_req, res) => {
  logger.info('NotebookLM sync triggered');
  try {
    const result = await syncToNotebookLM();
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Full sync: ALL docs + metrics + changelog + notebooklm
app.post('/sync/everything', async (_req, res) => {
  logger.info('Full everything sync triggered');
  try {
    const [allResult, docsResult, clResult, nlmResult] = await Promise.allSettled([
      syncAllToDrive(),
      syncDocsToDrive(),
      syncChangeLogToSheets(),
      syncToNotebookLM(),
    ]);

    const files: { name: string; link: string }[] = [];
    const errors: string[] = [];

    if (allResult.status === 'fulfilled') files.push(...allResult.value.driveFiles);
    else errors.push(`sync-all: ${allResult.reason}`);

    if (docsResult.status === 'fulfilled') files.push(...docsResult.value.files);
    else errors.push(`docs: ${docsResult.reason}`);

    if (clResult.status === 'fulfilled' && clResult.value) files.push(clResult.value);
    else if (clResult.status === 'rejected') errors.push(`changelog: ${clResult.reason}`);

    if (nlmResult.status === 'fulfilled' && nlmResult.value) files.push(nlmResult.value);
    else if (nlmResult.status === 'rejected') errors.push(`notebooklm: ${nlmResult.reason}`);

    res.json({ success: errors.length === 0, data: { files, errors } });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Cloud Scheduler / Cloud Tasks callback endpoint
app.post('/cron/daily-report', async (_req, res) => {
  logger.info('Daily report cron triggered');
  try {
    const result = await syncAllToDrive();
    // Send email notification to CEO
    try {
      const { gmailService } = await import('@bookedai/google');
      await gmailService.sendEmail({
        to: process.env.CEO_EMAIL || 'ceo@longcare.au',
        subject: `📊 Daily Progress Report — ${new Date().toLocaleDateString('en-AU')}`,
        html: `
          <p>Hi,</p>
          <p>Your daily progress report has been synced to Google Drive.</p>
          <h3>Files Updated:</h3>
          <ul>
            ${result.driveFiles.map((f) => `<li><a href="${f.link}">${f.name}</a></li>`).join('')}
          </ul>
          ${result.errors.length > 0 ? `<p style="color: red;">⚠️ ${result.errors.length} error(s) occurred during sync.</p>` : '<p style="color: green;">✅ All files synced successfully.</p>'}
          <p>— BookedAI Drive Sync</p>
        `,
      });
    } catch (emailErr) {
      logger.error({ emailErr }, 'Failed to send daily report email');
    }
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/cron/weekly-report', async (_req, res) => {
  logger.info('Weekly report cron triggered');
  try {
    const result = await syncAllToDrive();
    // Send weekly summary email
    try {
      const snapshot = await generateProgressSnapshot();
      const { gmailService } = await import('@bookedai/google');
      await gmailService.sendEmail({
        to: process.env.CEO_EMAIL || 'ceo@longcare.au',
        subject: `📈 Weekly Summary — Week of ${new Date().toLocaleDateString('en-AU')}`,
        html: `
          <h1>Weekly Summary — Longcare AU</h1>
          <table style="border-collapse: collapse; width: 100%;">
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Total Revenue</strong></td><td style="padding: 8px; border: 1px solid #ddd; text-align: right;"><strong>$${(snapshot.totalRevenueCents / 100).toFixed(2)} AUD</strong></td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;">Total Bookings</td><td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${snapshot.totalBookings}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;">Confirmed</td><td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${snapshot.confirmedBookings}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;">Total Users</td><td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${snapshot.totalUsers}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;">Learning Sessions</td><td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${snapshot.totalSessions}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;">Campaigns</td><td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${snapshot.totalCampaigns} (${snapshot.publishedCampaigns} published)</td></tr>
          </table>
          <p><a href="https://drive.google.com">Open Google Drive</a> for full reports.</p>
        `,
      });
    } catch (emailErr) {
      logger.error({ emailErr }, 'Failed to send weekly report email');
    }
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const server = app.listen(port, () => {
  logger.info({ port }, 'Drive Sync service started');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  server.close(async () => {
    await closePool();
    process.exit(0);
  });
});
