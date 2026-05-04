import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { getFolderId, uploadDocument, uploadSpreadsheet } from '../lib/drive-structure.js';
import { logger } from '../lib/logger.js';

const DOCS_ROOT = process.env.DOCS_ROOT || '/app/docs';

interface DocSyncResult {
  files: { name: string; link: string }[];
  errors: string[];
}

/**
 * Reads a local markdown file and returns its content
 */
function readDocFile(filename: string): string | null {
  const paths = [
    join(DOCS_ROOT, filename),
    join('/home/dovanlong/g.bookedai.au/docs', filename),
    join(process.cwd(), '../../docs', filename),
  ];
  for (const p of paths) {
    if (existsSync(p)) return readFileSync(p, 'utf-8');
  }
  return null;
}

/**
 * Convert markdown to basic HTML for Google Docs upload
 */
function mdToHtml(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/^\- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/\| (.+) \|/g, (match) => {
      const cells = match.split('|').filter(c => c.trim());
      return '<tr>' + cells.map(c => `<td style="padding:4px 8px;border:1px solid #ddd">${c.trim()}</td>`).join('') + '</tr>';
    })
    .replace(/(<tr>.*<\/tr>\n?)+/g, '<table style="border-collapse:collapse;width:100%">$&</table>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/```[\s\S]*?```/g, (match) => `<pre style="background:#f5f5f5;padding:12px;border-radius:6px;font-size:13px">${match.replace(/```\w*\n?/g, '').replace(/```/g, '')}</pre>`);
}

/**
 * Sync project documentation to Google Drive
 * Uploads: PRD, Roadmap, Architecture docs, Change Log
 */
export async function syncDocsToDrive(): Promise<DocSyncResult> {
  const result: DocSyncResult = { files: [], errors: [] };

  const docsToSync = [
    { file: 'PRD.md', title: 'bookedai.au — PRD (Product Requirements Document)', folder: '08_System_Architecture' },
    { file: 'IMPLEMENTATION_ROADMAP.md', title: 'bookedai.au — Implementation Roadmap', folder: '08_System_Architecture' },
    { file: 'architecture.md', title: 'bookedai.au — System Architecture', folder: '08_System_Architecture' },
    { file: 'implementation-plan.md', title: 'bookedai.au — Implementation Plan (Phases)', folder: '08_System_Architecture' },
  ];

  for (const doc of docsToSync) {
    try {
      const content = readDocFile(doc.file);
      if (!content) {
        result.errors.push(`File not found: ${doc.file}`);
        continue;
      }

      const html = mdToHtml(content);
      const folderId = await getFolderId(doc.folder);
      const uploaded = await uploadDocument({
        title: doc.title,
        folderId,
        htmlContent: `
          <html><body style="font-family:Arial,sans-serif;max-width:800px;margin:0 auto;padding:24px;color:#333">
            <div style="border-bottom:2px solid #0d9488;padding-bottom:12px;margin-bottom:24px">
              <h1 style="color:#0f2942;margin:0">${doc.title}</h1>
              <p style="color:#888;font-size:13px;margin:8px 0 0">Last synced: ${new Date().toLocaleString('en-AU')}</p>
            </div>
            ${html}
          </body></html>
        `,
      });
      result.files.push({ name: doc.title, link: uploaded.webViewLink });
      logger.info({ file: doc.file, link: uploaded.webViewLink }, 'Document synced to Drive');
    } catch (err: any) {
      result.errors.push(`${doc.file}: ${err.message}`);
      logger.error({ err, file: doc.file }, 'Failed to sync document');
    }
  }

  return result;
}

/**
 * Create/update a Google Sheets project tracker
 * Columns: CR#, Date, Description, Priority, Status
 */
export async function syncChangeLogToSheets(): Promise<{ name: string; link: string } | null> {
  try {
    const prd = readDocFile('PRD.md');
    if (!prd) throw new Error('PRD.md not found');

    // Extract Change Request table from PRD
    const crSection = prd.split('## 9. Change Request Log')[1] || '';
    const rows = crSection
      .split('\n')
      .filter(line => line.startsWith('| CR-'))
      .map(line => {
        const cells = line.split('|').filter(c => c.trim()).map(c => c.trim());
        return cells.join(',');
      });

    const csv = [
      'CR#,Date,Description,Priority,Status',
      ...rows,
    ].join('\n');

    const folderId = await getFolderId('08_System_Architecture');
    const sheet = await uploadSpreadsheet({
      title: 'bookedai.au — Change Request Tracker',
      folderId,
      csvContent: csv,
    });

    logger.info({ link: sheet.webViewLink }, 'Change log sheet synced');
    return { name: 'Change Request Tracker', link: sheet.webViewLink };
  } catch (err: any) {
    logger.error({ err }, 'Failed to sync change log');
    return null;
  }
}

/**
 * Create/update a Google Sheets metrics tracker
 * For CEO dashboard in Google Sheets
 */
export async function syncMetricsToSheets(snapshot: Record<string, unknown>): Promise<{ name: string; link: string } | null> {
  try {
    const date = new Date().toLocaleDateString('en-AU');
    const csv = [
      'Metric,Value,Target (Month 1),Target (Month 3)',
      `Revenue (AUD),$${((snapshot.totalRevenueCents as number || 0) / 100).toFixed(2)},$5000-$10000,$20000-$50000`,
      `Total Bookings,${snapshot.totalBookings || 0},50-100,200-500`,
      `Total Users,${snapshot.totalUsers || 0},200+,1000+`,
      `Confirmed Bookings,${snapshot.confirmedBookings || 0},-,-`,
      `Learning Sessions,${snapshot.totalSessions || 0},40-80,200+`,
      `Marketing Campaigns,${snapshot.totalCampaigns || 0},10+,30+`,
      `Published Campaigns,${snapshot.publishedCampaigns || 0},-,-`,
      `Date,${date},-,-`,
    ].join('\n');

    const folderId = await getFolderId('04_Revenue_Reports');
    const sheet = await uploadSpreadsheet({
      title: `bookedai.au — CEO Dashboard — ${date}`,
      folderId,
      csvContent: csv,
    });

    logger.info({ link: sheet.webViewLink }, 'Metrics sheet synced');
    return { name: `CEO Dashboard ${date}`, link: sheet.webViewLink };
  } catch (err: any) {
    logger.error({ err }, 'Failed to sync metrics sheet');
    return null;
  }
}
