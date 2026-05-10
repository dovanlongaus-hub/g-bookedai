import { getPageMetadata } from '@/lib/metadata';

export const metadata = getPageMetadata({
  title: 'Free Guide — 5 AI Automations for AU SMEs | LongCare',
  description:
    'Download our free practical guide: 5 AI automations every Australian SME should ship first. Setup time, cost, and ROI for each.',
  path: '/guide',
});

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return children;
}
