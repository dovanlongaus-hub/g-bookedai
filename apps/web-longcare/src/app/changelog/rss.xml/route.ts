import { NextResponse } from 'next/server';
import { changelog } from '@/data/changelog';

export const dynamic = 'force-static';
export const revalidate = 3600;

const SITE = 'https://longcare.au';

function escape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  // Reverse-chronological (newest first)
  const sorted = [...changelog].sort((a, b) => b.date.localeCompare(a.date));
  const latestIso = sorted[0]
    ? new Date(sorted[0].date).toISOString()
    : new Date().toISOString();

  const entries = sorted
    .map((entry) => {
      const updated = new Date(entry.date).toISOString();
      const summary = entry.changes.join(' ');
      const categories = entry.categories
        .map((c) => `      <category term="${escape(c)}"/>`)
        .join('\n');
      const contentHtml = `<ul>${entry.changes
        .map((c) => `<li>${escape(c)}</li>`)
        .join('')}</ul>`;
      return `    <entry>
      <id>${SITE}/changelog#${escape(entry.version)}</id>
      <title>${escape(`v${entry.version} — ${entry.title}`)}</title>
      <link href="${SITE}/changelog#${escape(entry.version)}"/>
      <updated>${updated}</updated>
      <published>${updated}</published>
      <author><name>LongCare AU</name></author>
      <summary>${escape(summary)}</summary>
      <content type="html">${escape(contentHtml)}</content>
${categories}
    </entry>`;
    })
    .join('\n');

  const atom = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="en-AU">
  <id>${SITE}/changelog/rss.xml</id>
  <title>LongCare AU — Changelog</title>
  <subtitle>Release notes and product updates for LongCare AU.</subtitle>
  <link href="${SITE}/changelog/rss.xml" rel="self" type="application/atom+xml"/>
  <link href="${SITE}/changelog" rel="alternate" type="text/html"/>
  <updated>${latestIso}</updated>
  <author><name>LongCare AU</name></author>
  <rights>© ${new Date().getFullYear()} LongCare AU. All rights reserved.</rights>
${entries}
</feed>`;

  return new NextResponse(atom, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
