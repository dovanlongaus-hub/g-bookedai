import { google } from 'googleapis';
import { getGoogleAuth, getImpersonatedAuth } from '@bookedai/google';
import { logger } from './logger.js';

const CEO_EMAIL = process.env.CEO_EMAIL || 'ceo@longcare.au';
const USE_IMPERSONATION = process.env.USE_IMPERSONATION !== 'false';

/**
 * Drive folder structure for CEO:
 *
 * 📁 BookedAI — Longcare AU (shared root)
 * ├── 📁 01_Progress_Reports
 * │   ├── 📁 Daily
 * │   └── 📁 Weekly
 * ├── 📁 02_Roadmap_Backlog
 * ├── 📁 03_QA_UAT
 * ├── 📁 04_Revenue_Reports
 * ├── 📁 05_Marketing_Campaigns
 * ├── 📁 06_Learning_Sessions
 * │   ├── 📁 Transcripts
 * │   └── 📁 Notes
 * ├── 📁 07_Accounting_Invoices
 * └── 📁 08_System_Architecture
 */

export interface DriveFolder {
  id: string;
  name: string;
  webViewLink: string;
}

const FOLDER_STRUCTURE = [
  'BookedAI — Longcare AU',
  'BookedAI — Longcare AU/01_Progress_Reports',
  'BookedAI — Longcare AU/01_Progress_Reports/Daily',
  'BookedAI — Longcare AU/01_Progress_Reports/Weekly',
  'BookedAI — Longcare AU/02_Roadmap_Backlog',
  'BookedAI — Longcare AU/03_QA_UAT',
  'BookedAI — Longcare AU/04_Revenue_Reports',
  'BookedAI — Longcare AU/05_Marketing_Campaigns',
  'BookedAI — Longcare AU/06_Learning_Sessions',
  'BookedAI — Longcare AU/06_Learning_Sessions/Transcripts',
  'BookedAI — Longcare AU/06_Learning_Sessions/Notes',
  'BookedAI — Longcare AU/07_Accounting_Invoices',
  'BookedAI — Longcare AU/08_System_Architecture',
] as const;

// Cache folder IDs after first lookup
let _folderCache: Map<string, string> | null = null;

let _driveClient: ReturnType<typeof google.drive> | null = null;

function getDrive() {
  if (_driveClient) return _driveClient;

  // Always create fresh auth with full Drive scope
  const auth = new google.auth.GoogleAuth({
    scopes: [
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/documents',
      'https://www.googleapis.com/auth/spreadsheets',
    ],
  });

  _driveClient = google.drive({ version: 'v3', auth });
  return _driveClient;
}

async function findFolder(name: string, parentId?: string): Promise<string | null> {
  const drive = getDrive();
  const q = parentId
    ? `name='${name}' and mimeType='application/vnd.google-apps.folder' and '${parentId}' in parents and trashed=false`
    : `name='${name}' and mimeType='application/vnd.google-apps.folder' and trashed=false`;

  const res = await drive.files.list({ q, fields: 'files(id)', spaces: 'drive' });
  return res.data.files?.[0]?.id || null;
}

async function createFolder(name: string, parentId?: string): Promise<string> {
  const drive = getDrive();
  const res = await drive.files.create({
    requestBody: {
      name,
      mimeType: 'application/vnd.google-apps.folder',
      parents: parentId ? [parentId] : undefined,
    },
    fields: 'id',
  });
  const folderId = res.data.id!;

  // Share with CEO
  await drive.permissions.create({
    fileId: folderId,
    requestBody: {
      type: 'user',
      role: 'writer',
      emailAddress: CEO_EMAIL,
    },
    sendNotificationEmail: false,
  });

  return folderId;
}

/**
 * Initialize the full Drive folder structure.
 * Idempotent — only creates folders that don't exist yet.
 */
export async function initDriveFolders(): Promise<Map<string, string>> {
  if (_folderCache) return _folderCache;

  const cache = new Map<string, string>();
  logger.info('Initializing Google Drive folder structure for %s', CEO_EMAIL);

  for (const path of FOLDER_STRUCTURE) {
    const parts = path.split('/');
    let parentId: string | undefined;

    for (let i = 0; i < parts.length; i++) {
      const name = parts[i];
      const fullPath = parts.slice(0, i + 1).join('/');

      if (cache.has(fullPath)) {
        parentId = cache.get(fullPath);
        continue;
      }

      let folderId = await findFolder(name, parentId);
      if (!folderId) {
        folderId = await createFolder(name, parentId);
        logger.info({ folder: fullPath }, 'Created Drive folder');
      }

      cache.set(fullPath, folderId);
      parentId = folderId;
    }
  }

  _folderCache = cache;
  logger.info({ folderCount: cache.size }, 'Drive folder structure ready');
  return cache;
}

/**
 * Get a specific folder ID by logical path.
 */
export async function getFolderId(path: string): Promise<string> {
  const cache = await initDriveFolders();
  const fullPath = path.startsWith('BookedAI') ? path : `BookedAI — Longcare AU/${path}`;
  const id = cache.get(fullPath);
  if (!id) throw new Error(`Drive folder not found: ${fullPath}`);
  return id;
}

/**
 * Upload or update a Google Sheets spreadsheet in a specific folder.
 */
export async function uploadSpreadsheet(params: {
  title: string;
  folderId: string;
  csvContent: string;
}): Promise<{ fileId: string; webViewLink: string }> {
  const drive = getDrive();

  // Check if file already exists (update instead of create duplicate)
  const existing = await drive.files.list({
    q: `name='${params.title}' and '${params.folderId}' in parents and trashed=false`,
    fields: 'files(id)',
  });

  if (existing.data.files && existing.data.files.length > 0) {
    // Update existing file
    const fileId = existing.data.files[0].id!;
    await drive.files.update({
      fileId,
      media: {
        mimeType: 'text/csv',
        body: params.csvContent,
      },
    });
    return {
      fileId,
      webViewLink: `https://docs.google.com/spreadsheets/d/${fileId}/edit`,
    };
  }

  // Create new as Google Sheets
  const res = await drive.files.create({
    requestBody: {
      name: params.title,
      mimeType: 'application/vnd.google-apps.spreadsheet',
      parents: [params.folderId],
    },
    media: {
      mimeType: 'text/csv',
      body: params.csvContent,
    },
    fields: 'id,webViewLink',
  });

  return {
    fileId: res.data.id || '',
    webViewLink: res.data.webViewLink || '',
  };
}

/**
 * Upload or update a Google Doc in a specific folder.
 */
export async function uploadDocument(params: {
  title: string;
  folderId: string;
  htmlContent: string;
}): Promise<{ fileId: string; webViewLink: string }> {
  const drive = getDrive();

  // Check existing
  const existing = await drive.files.list({
    q: `name='${params.title}' and '${params.folderId}' in parents and trashed=false`,
    fields: 'files(id)',
  });

  if (existing.data.files && existing.data.files.length > 0) {
    const fileId = existing.data.files[0].id!;
    await drive.files.update({
      fileId,
      media: {
        mimeType: 'text/html',
        body: params.htmlContent,
      },
    });
    return {
      fileId,
      webViewLink: `https://docs.google.com/document/d/${fileId}/edit`,
    };
  }

  const res = await drive.files.create({
    requestBody: {
      name: params.title,
      mimeType: 'application/vnd.google-apps.document',
      parents: [params.folderId],
    },
    media: {
      mimeType: 'text/html',
      body: params.htmlContent,
    },
    fields: 'id,webViewLink',
  });

  return {
    fileId: res.data.id || '',
    webViewLink: res.data.webViewLink || '',
  };
}
