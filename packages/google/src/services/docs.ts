import { google } from 'googleapis';
import { getGoogleAuth } from '../lib/auth.js';

function getDocs() {
  return google.docs({ version: 'v1', auth: getGoogleAuth(['https://www.googleapis.com/auth/documents']) });
}

function getDrive() {
  return google.drive({ version: 'v3', auth: getGoogleAuth(['https://www.googleapis.com/auth/drive.file']) });
}

export const docsService = {
  async createSessionNotes(params: {
    title: string;
    summary: string;
    keyIdeas: string[];
    qaItems: { question: string; answer: string }[];
    improvementAreas: { area: string; suggestion: string }[];
    nextCta: string;
    shareWithEmail: string;
  }): Promise<{ docId: string; docUrl: string }> {
    const docs = getDocs();
    const drive = getDrive();

    // Create document
    const doc = await docs.documents.create({
      requestBody: { title: params.title },
    });

    const docId = doc.data.documentId!;

    // Build content
    const requests: any[] = [];
    let index = 1;

    // Summary section
    requests.push(
      { insertText: { location: { index }, text: 'Session Summary\n' } },
      { updateParagraphStyle: { range: { startIndex: index, endIndex: index + 16 }, paragraphStyle: { namedStyleType: 'HEADING_1' }, fields: 'namedStyleType' } },
    );
    index += 16;
    requests.push({ insertText: { location: { index }, text: params.summary + '\n\n' } });
    index += params.summary.length + 2;

    // Key ideas
    requests.push(
      { insertText: { location: { index }, text: 'Key Ideas\n' } },
      { updateParagraphStyle: { range: { startIndex: index, endIndex: index + 10 }, paragraphStyle: { namedStyleType: 'HEADING_2' }, fields: 'namedStyleType' } },
    );
    index += 10;
    for (const idea of params.keyIdeas) {
      const text = `• ${idea}\n`;
      requests.push({ insertText: { location: { index }, text } });
      index += text.length;
    }
    requests.push({ insertText: { location: { index }, text: '\n' } });
    index += 1;

    // Q&A
    requests.push(
      { insertText: { location: { index }, text: 'Questions & Answers\n' } },
      { updateParagraphStyle: { range: { startIndex: index, endIndex: index + 20 }, paragraphStyle: { namedStyleType: 'HEADING_2' }, fields: 'namedStyleType' } },
    );
    index += 20;
    for (const qa of params.qaItems) {
      const text = `Q: ${qa.question}\nA: ${qa.answer}\n\n`;
      requests.push({ insertText: { location: { index }, text } });
      index += text.length;
    }

    // Improvement areas
    requests.push(
      { insertText: { location: { index }, text: 'Improvement Areas\n' } },
      { updateParagraphStyle: { range: { startIndex: index, endIndex: index + 18 }, paragraphStyle: { namedStyleType: 'HEADING_2' }, fields: 'namedStyleType' } },
    );
    index += 18;
    for (const area of params.improvementAreas) {
      const text = `${area.area}: ${area.suggestion}\n`;
      requests.push({ insertText: { location: { index }, text } });
      index += text.length;
    }
    requests.push({ insertText: { location: { index }, text: '\n' } });
    index += 1;

    // Next steps CTA
    requests.push(
      { insertText: { location: { index }, text: 'Next Steps\n' } },
      { updateParagraphStyle: { range: { startIndex: index, endIndex: index + 11 }, paragraphStyle: { namedStyleType: 'HEADING_2' }, fields: 'namedStyleType' } },
    );
    index += 11;
    requests.push({ insertText: { location: { index }, text: params.nextCta + '\n' } });

    await docs.documents.batchUpdate({
      documentId: docId,
      requestBody: { requests },
    });

    // Share document
    await drive.permissions.create({
      fileId: docId,
      requestBody: {
        type: 'user',
        role: 'reader',
        emailAddress: params.shareWithEmail,
      },
      sendNotificationEmail: true,
    });

    return {
      docId,
      docUrl: `https://docs.google.com/document/d/${docId}/edit`,
    };
  },
};
