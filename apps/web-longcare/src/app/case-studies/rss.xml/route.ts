import { NextResponse } from 'next/server';
import { getSortedCaseStudies } from '@/data/case-studies';

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
  const sorted = getSortedCaseStudies();
  const latestIso = sorted[0]
    ? new Date(sorted[0].updatedAt ?? sorted[0].publishedAt).toISOString()
    : new Date().toISOString();

  const entries = sorted
    .map((study) => {
      const updated = new Date(study.updatedAt ?? study.publishedAt).toISOString();
      const published = new Date(study.publishedAt).toISOString();
      const categories = [study.industry, study.serviceTier, ...study.tags]
        .map((c) => `      <category term="${escape(c)}"/>`)
        .join('\n');
      return `    <entry>
      <id>${SITE}/case-studies/${study.slug}</id>
      <title>${escape(study.title)}</title>
      <link href="${SITE}/case-studies/${study.slug}"/>
      <updated>${updated}</updated>
      <published>${published}</published>
      <author><name>${escape(study.customerName)}</name></author>
      <summary>${escape(study.excerpt)}</summary>
${categories}
    </entry>`;
    })
    .join('\n');

  const atom = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="en-AU">
  <id>${SITE}/case-studies/rss.xml</id>
  <title>LongCare AU — Case Studies</title>
  <subtitle>Measured outcomes from Australian SMEs using LongCare AI.</subtitle>
  <link href="${SITE}/case-studies/rss.xml" rel="self" type="application/atom+xml"/>
  <link href="${SITE}/case-studies" rel="alternate" type="text/html"/>
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
