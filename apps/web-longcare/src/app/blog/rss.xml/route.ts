import { NextResponse } from 'next/server';
import { getSortedPosts } from '@/data/blog-posts';

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
  const sorted = getSortedPosts();
  const latestIso = sorted[0]
    ? new Date(sorted[0].updatedAt ?? sorted[0].publishedAt).toISOString()
    : new Date().toISOString();

  const entries = sorted
    .map((post) => {
      const updated = new Date(post.updatedAt ?? post.publishedAt).toISOString();
      const published = new Date(post.publishedAt).toISOString();
      const categories = [post.category, ...post.tags]
        .map((c) => `      <category term="${escape(c)}"/>`)
        .join('\n');
      return `    <entry>
      <id>${SITE}/blog/${post.slug}</id>
      <title>${escape(post.title)}</title>
      <link href="${SITE}/blog/${post.slug}"/>
      <updated>${updated}</updated>
      <published>${published}</published>
      <author><name>${escape(post.author.name)}</name></author>
      <summary>${escape(post.excerpt)}</summary>
${categories}
    </entry>`;
    })
    .join('\n');

  const atom = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="en-AU">
  <id>${SITE}/blog/rss.xml</id>
  <title>LongCare AU — Blog</title>
  <subtitle>Practical AI for Australian SMEs.</subtitle>
  <link href="${SITE}/blog/rss.xml" rel="self" type="application/atom+xml"/>
  <link href="${SITE}/blog" rel="alternate" type="text/html"/>
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
