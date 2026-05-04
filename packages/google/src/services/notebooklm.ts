/**
 * Google NotebookLM Integration
 *
 * NotebookLM is used to create AI-powered study notebooks from session transcripts,
 * course materials, and learning notes. It enables:
 * - Auto-generated audio overviews of session content
 * - AI Q&A based on uploaded source materials
 * - Study guides from mentoring session transcripts
 * - Cross-referencing between multiple learning sessions
 *
 * NotebookLM currently uses a web-based interface and shared links.
 * This module manages notebook creation via Drive and generates share links.
 */

import { google } from 'googleapis';
import { getGoogleAuth } from '../lib/auth.js';

function getDrive() {
  return google.drive({
    version: 'v3',
    auth: getGoogleAuth(['https://www.googleapis.com/auth/drive.file']),
  });
}

export interface NotebookLMSource {
  title: string;
  content: string;
  type: 'transcript' | 'notes' | 'course_material' | 'qa_document';
}

export const notebookLMService = {
  /**
   * Create a Google Doc formatted for NotebookLM import.
   * Users can then add this doc as a source in NotebookLM.
   */
  async createNotebookSource(params: {
    title: string;
    sources: NotebookLMSource[];
    folderId?: string;
    shareWithEmail: string;
  }): Promise<{ docId: string; docUrl: string; notebookLMUrl: string }> {
    const drive = getDrive();
    const docs = google.docs({ version: 'v1', auth: getGoogleAuth() });

    // Create a Google Doc optimized for NotebookLM
    const doc = await docs.documents.create({
      requestBody: { title: `📓 ${params.title}` },
    });

    const docId = doc.data.documentId!;

    // Build structured content for NotebookLM
    const requests: any[] = [];
    let index = 1;

    for (const source of params.sources) {
      // Section header
      const header = `[${source.type.toUpperCase()}] ${source.title}\n`;
      requests.push(
        { insertText: { location: { index }, text: header } },
        {
          updateParagraphStyle: {
            range: { startIndex: index, endIndex: index + header.length },
            paragraphStyle: { namedStyleType: 'HEADING_2' },
            fields: 'namedStyleType',
          },
        },
      );
      index += header.length;

      // Content
      const content = source.content + '\n\n---\n\n';
      requests.push({ insertText: { location: { index }, text: content } });
      index += content.length;
    }

    if (requests.length > 0) {
      await docs.documents.batchUpdate({
        documentId: docId,
        requestBody: { requests },
      });
    }

    // Share with user
    await drive.permissions.create({
      fileId: docId,
      requestBody: {
        type: 'user',
        role: 'reader',
        emailAddress: params.shareWithEmail,
      },
      sendNotificationEmail: false,
    });

    // Move to folder if specified
    if (params.folderId) {
      await drive.files.update({
        fileId: docId,
        addParents: params.folderId,
        fields: 'id,parents',
      });
    }

    const docUrl = `https://docs.google.com/document/d/${docId}/edit`;
    // NotebookLM URL — users can add this Google Doc as a source
    const notebookLMUrl = `https://notebooklm.google.com`;

    return { docId, docUrl, notebookLMUrl };
  },

  /**
   * Create a learning session notebook combining transcript, notes, and Q&A
   * into a single NotebookLM-ready document.
   */
  async createSessionNotebook(params: {
    sessionDate: string;
    serviceName: string;
    transcript: string;
    summary: string;
    qaItems: { question: string; answer: string }[];
    improvementAreas: { area: string; suggestion: string }[];
    nextCta: string;
    shareWithEmail: string;
    folderId?: string;
  }) {
    const sources: NotebookLMSource[] = [
      {
        title: `Session Summary — ${params.sessionDate}`,
        content: params.summary,
        type: 'notes',
      },
      {
        title: 'Full Transcript',
        content: params.transcript,
        type: 'transcript',
      },
      {
        title: 'Questions & Answers',
        content: params.qaItems
          .map((qa) => `Q: ${qa.question}\nA: ${qa.answer}`)
          .join('\n\n'),
        type: 'qa_document',
      },
      {
        title: 'Improvement Plan & Next Steps',
        content: [
          ...params.improvementAreas.map((a) => `• ${a.area}: ${a.suggestion}`),
          '',
          `Next Step: ${params.nextCta}`,
        ].join('\n'),
        type: 'course_material',
      },
    ];

    return this.createNotebookSource({
      title: `${params.serviceName} — ${params.sessionDate}`,
      sources,
      shareWithEmail: params.shareWithEmail,
      folderId: params.folderId,
    });
  },

  /**
   * Generate a share link for NotebookLM study materials.
   * The link points users to NotebookLM where they can add the Google Doc as a source.
   */
  generateNotebookLMInstructions(docUrl: string): string {
    return [
      '📓 Your AI Study Notebook is ready!',
      '',
      'To use with Google NotebookLM:',
      '1. Open https://notebooklm.google.com',
      '2. Create a new notebook',
      `3. Add this Google Doc as a source: ${docUrl}`,
      '4. Ask questions, generate audio overview, or create study guides',
      '',
      'NotebookLM will use your session notes to create personalised study materials.',
    ].join('\n');
  },
};
