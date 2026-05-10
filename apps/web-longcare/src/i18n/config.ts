// Locale configuration for LongCare AU.
// Wired in when next-intl is installed (Phase 4). See docs/longcare/I18N_GUIDE.md.

export const locales = ['en-au', 'vi', 'zh-cn'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en-au';

export const localeLabels: Record<Locale, { native: string; english: string; flag: string }> = {
  'en-au': { native: 'English', english: 'English (Australia)', flag: '🇦🇺' },
  vi: { native: 'Tiếng Việt', english: 'Vietnamese', flag: '🇻🇳' },
  'zh-cn': { native: '简体中文', english: 'Chinese (Simplified)', flag: '🇨🇳' },
};

// When wired with next-intl, these are imported in app/[locale]/layout.tsx.
