import { getPageMetadata } from '@/lib/metadata';

export const metadata = getPageMetadata({
  title: 'Referral Program — Give $25, Get $25 | LongCare AU',
  description:
    'Refer a colleague to LongCare AI mentoring and you both receive $25 credit. Tiered rewards up to $50 per referral with no limit.',
  path: '/referral',
});

export default function ReferralLayout({ children }: { children: React.ReactNode }) {
  return children;
}
