import { google } from 'googleapis';
import { getGoogleAuth } from '../lib/auth.js';
import { Readable } from 'stream';

function getDrive() {
  return google.drive({ version: 'v3', auth: getGoogleAuth(['https://www.googleapis.com/auth/drive.file']) });
}

// Longcare Drive folder structure
const DRIVE_FOLDERS = {
  ROOT: process.env.LONGCARE_DRIVE_ROOT_FOLDER_ID || '',
  TRANSCRIPTS: process.env.LONGCARE_DRIVE_TRANSCRIPTS_FOLDER_ID || '',
  SESSION_NOTES: process.env.LONGCARE_DRIVE_NOTES_FOLDER_ID || '',
  MARKETING: process.env.LONGCARE_DRIVE_MARKETING_FOLDER_ID || '',
  INVOICES: process.env.LONGCARE_DRIVE_INVOICES_FOLDER_ID || '',
  NOTEBOOKS: process.env.LONGCARE_DRIVE_NOTEBOOKS_FOLDER_ID || '',
} as const;

export const driveService = {
  /**
   * Upload a file to Google Drive and return shareable link
   */
  async uploadFile(params: {
    fileName: string;
    content: string;
    folderId?: string;
    mimeType?: string;
  }): Promise<{ fileId: string; webViewLink: string; driveLink: string }> {
    const drive = getDrive();

    const res = await drive.files.create({
      requestBody: {
        name: params.fileName,
        mimeType: params.mimeType || 'text/plain',
        parents: params.folderId ? [params.folderId] : undefined,
      },
      media: {
        mimeType: params.mimeType || 'text/plain',
        body: Readable.from([params.content]),
      },
      fields: 'id,webViewLink,webContentLink',
    });

    const fileId = res.data.id || '';
    return {
      fileId,
      webViewLink: res.data.webViewLink || '',
      driveLink: `https://drive.google.com/file/d/${fileId}/view`,
    };
  },

  /**
   * Upload session transcript to the Transcripts folder
   */
  async uploadTranscript(params: {
    bookingId: string;
    sessionDate: string;
    serviceName: string;
    content: string;
  }): Promise<{ fileId: string; webViewLink: string; driveLink: string }> {
    return this.uploadFile({
      fileName: `Transcript — ${params.serviceName} — ${params.sessionDate} (${params.bookingId.slice(0, 8)}).txt`,
      content: params.content,
      folderId: DRIVE_FOLDERS.TRANSCRIPTS || undefined,
    });
  },

  /**
   * Create or get a user-specific folder in Drive
   */
  async getOrCreateUserFolder(userId: string, userEmail: string): Promise<string> {
    const drive = getDrive();
    const folderName = `Longcare — ${userEmail}`;

    // Check if folder exists
    const existing = await drive.files.list({
      q: `name='${folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
      fields: 'files(id)',
    });

    if (existing.data.files && existing.data.files.length > 0) {
      return existing.data.files[0].id!;
    }

    // Create new folder
    const folder = await drive.files.create({
      requestBody: {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
        parents: DRIVE_FOLDERS.ROOT ? [DRIVE_FOLDERS.ROOT] : undefined,
      },
      fields: 'id',
    });

    const folderId = folder.data.id!;

    // Share folder with user
    await drive.permissions.create({
      fileId: folderId,
      requestBody: { type: 'user', role: 'reader', emailAddress: userEmail },
      sendNotificationEmail: false,
    });

    return folderId;
  },

  /**
   * Share a file with a specific user
   */
  async shareFile(fileId: string, email: string, role: 'reader' | 'writer' = 'reader'): Promise<void> {
    const drive = getDrive();
    await drive.permissions.create({
      fileId,
      requestBody: { type: 'user', role, emailAddress: email },
    });
  },

  /**
   * Generate a shareable Drive link for a file
   */
  async createShareLink(fileId: string): Promise<string> {
    const drive = getDrive();
    await drive.permissions.create({
      fileId,
      requestBody: { type: 'anyone', role: 'reader' },
    });
    return `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
  },

  /**
   * List files in a specific folder
   */
  async listFolderFiles(folderId: string): Promise<{ id: string; name: string; webViewLink: string; createdTime: string }[]> {
    const drive = getDrive();
    const res = await drive.files.list({
      q: `'${folderId}' in parents and trashed=false`,
      fields: 'files(id,name,webViewLink,createdTime)',
      orderBy: 'createdTime desc',
    });
    return (res.data.files || []).map((f) => ({
      id: f.id || '',
      name: f.name || '',
      webViewLink: f.webViewLink || '',
      createdTime: f.createdTime || '',
    }));
  },

  /** Drive folder IDs for reference */
  FOLDERS: DRIVE_FOLDERS,
};
