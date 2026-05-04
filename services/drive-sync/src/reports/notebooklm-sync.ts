import { readFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';
import { getFolderId, uploadDocument } from '../lib/drive-structure.js';
import { logger } from '../lib/logger.js';

const DOCS_ROOT = process.env.DOCS_ROOT || '/app/docs';

function readDocFile(filename: string): string | null {
  const paths = [
    join(DOCS_ROOT, filename),
    join('/home/dovanlong/g.bookedai.au/docs', filename),
  ];
  for (const p of paths) {
    if (existsSync(p)) return readFileSync(p, 'utf-8');
  }
  return null;
}

/**
 * Creates a consolidated Google Doc optimized for NotebookLM import.
 * NotebookLM works best with structured, well-organized documents.
 * This combines PRD + Roadmap + Architecture into one NotebookLM source.
 */
export async function syncToNotebookLM(): Promise<{ name: string; link: string } | null> {
  try {
    const prd = readDocFile('PRD.md') || '';
    const roadmap = readDocFile('IMPLEMENTATION_ROADMAP.md') || '';
    const architecture = readDocFile('architecture.md') || '';

    const now = new Date().toLocaleString('en-AU');
    const title = `bookedai.au — Complete Project Knowledge Base`;

    // Build a well-structured document optimized for NotebookLM
    const html = `
      <html><body style="font-family:Arial,sans-serif;max-width:900px;margin:0 auto;padding:24px;color:#333">
        <h1 style="color:#0f2942;border-bottom:3px solid #0d9488;padding-bottom:12px">
          bookedai.au — Project Knowledge Base
        </h1>
        <p style="color:#888;font-size:13px">
          Auto-generated for NotebookLM | Last updated: ${now}<br>
          This document is automatically synced from the project repository.
        </p>

        <hr style="border:0;height:1px;background:#ddd;margin:24px 0">

        <h1 style="color:#0f2942">PART 1: Product Requirements (PRD)</h1>
        <div style="white-space:pre-wrap;font-size:14px;line-height:1.7">
${prd.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
        </div>

        <hr style="border:0;height:1px;background:#ddd;margin:24px 0">

        <h1 style="color:#0f2942">PART 2: Implementation Roadmap</h1>
        <div style="white-space:pre-wrap;font-size:14px;line-height:1.7">
${roadmap.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
        </div>

        <hr style="border:0;height:1px;background:#ddd;margin:24px 0">

        <h1 style="color:#0f2942">PART 3: System Architecture</h1>
        <div style="white-space:pre-wrap;font-size:14px;line-height:1.7">
${architecture.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
        </div>

        <hr style="border:0;height:1px;background:#ddd;margin:24px 0">

        <h1 style="color:#0f2942">PART 4: Key Decisions & Context</h1>

        <h2>Technology Stack</h2>
        <ul>
          <li><strong>Frontend:</strong> Next.js 15, React 19, Tailwind CSS v4, Inter font</li>
          <li><strong>Backend:</strong> Express 5, TypeScript, tsx runtime</li>
          <li><strong>Database:</strong> PostgreSQL 16 (4 migrations)</li>
          <li><strong>Cache:</strong> Redis 7</li>
          <li><strong>AI:</strong> Gemini 2.0 Flash (Google)</li>
          <li><strong>Auth:</strong> Firebase Auth (primary) + OpenAI OAuth (fallback)</li>
          <li><strong>Payments:</strong> Stripe + Bank Transfer (PayID)</li>
          <li><strong>Hosting:</strong> GCE (Docker Compose) → Cloud Run (planned)</li>
          <li><strong>DNS:</strong> Cloudflare</li>
          <li><strong>SSL:</strong> Let's Encrypt</li>
        </ul>

        <h2>Brand Identity</h2>
        <ul>
          <li><strong>Name:</strong> bookedai.au (lowercase always)</li>
          <li><strong>Tagline:</strong> The AI Revenue Engine</li>
          <li><strong>Colors:</strong> Navy #0f2942, Teal #0d9488, Cyan #2dd4bf, Green #4ade80</li>
          <li><strong>Design:</strong> Dark premium theme (Vercel/Linear inspired)</li>
          <li><strong>Font:</strong> Inter (UI) / Outfit (brand)</li>
          <li><strong>Logo:</strong> Bar chart with growth arrow (teal gradient → green)</li>
        </ul>

        <h2>Key Principles</h2>
        <ol>
          <li>AI may recommend, but only Booking Truth Engine can confirm</li>
          <li>Every paid booking must generate an auditable revenue event</li>
          <li>Every learning session must create a next-step CTA</li>
          <li>Every campaign must use UTM links and track booking/payment outcome</li>
          <li>Google-first: use Google Cloud services wherever possible</li>
          <li>Australian Privacy Act compliance (APP 1-13)</li>
          <li>GST-inclusive pricing (10%)</li>
          <li>WCAG 2.2 AA accessibility target</li>
        </ol>

        <h2>Team</h2>
        <ul>
          <li>CEO/Founder: ceo@longcare.au</li>
          <li>First tenant: longcare.au (AI Mentor & Learning)</li>
          <li>Target market: Australian SMEs, professionals, educators</li>
        </ul>

        <p style="color:#888;margin-top:40px;font-size:12px;border-top:1px solid #ddd;padding-top:12px">
          This document is automatically synced by bookedai.au Drive Sync Service.
          To ask questions about this project, import this document into NotebookLM.
        </p>
      </body></html>
    `;

    const folderId = await getFolderId('06_Learning_Sessions/Notes');
    const doc = await uploadDocument({
      title,
      folderId,
      htmlContent: html,
    });

    logger.info({ link: doc.webViewLink }, 'NotebookLM knowledge base synced');
    return { name: title, link: doc.webViewLink };
  } catch (err: any) {
    logger.error({ err }, 'Failed to sync to NotebookLM');
    return null;
  }
}
