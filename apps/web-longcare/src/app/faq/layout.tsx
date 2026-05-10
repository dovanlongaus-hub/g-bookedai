import { getPageMetadata } from '@/lib/metadata';

export const metadata = getPageMetadata({
  title: 'FAQ — AI Mentoring Questions | LongCare AU',
  description:
    'Frequently asked questions about LongCare AI mentoring sessions: booking, payment, technology, mentors, and more.',
  path: '/faq',
});

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
