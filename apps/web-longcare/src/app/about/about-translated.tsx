'use client';

import { useState } from 'react';
import { NextIntlClientProvider, useTranslations } from 'next-intl';
import { LocaleSwitcher } from '@/components/locale-switcher';
import { HeroCommunity } from '@/components/illustrations/hero-community';
import en from '@/i18n/messages/en.json';
import vi from '@/i18n/messages/vi.json';
import zh from '@/i18n/messages/zh.json';
import { defaultLocale, type Locale } from '@/i18n/config';

// Type-cast JSON imports as message records — next-intl validates shape at runtime.
const messages: Record<Locale, Record<string, unknown>> = {
  'en-au': en as Record<string, unknown>,
  vi: vi as Record<string, unknown>,
  'zh-cn': zh as Record<string, unknown>,
};

export function AboutTranslated() {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages[locale]}>
      <div className="flex justify-end" style={{ marginBottom: '1.5rem' }}>
        <LocaleSwitcher current={locale} onChange={setLocale} />
      </div>
      <AboutContent />
    </NextIntlClientProvider>
  );
}

function ExpertiseTag({ label }: { label: string }) {
  return (
    <span style={{
      fontSize: '0.8rem', color: '#f8f9fa', fontWeight: 500,
      background: 'rgba(255,255,255,0.08)', padding: '0.3rem 0.75rem',
      borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)',
    }}>
      {label}
    </span>
  );
}

function TeamCard(props: {
  initials: string;
  color: string;
  name: string;
  title: string;
  bio: string;
  languages: string;
  languagesLabel: string;
  ctaLabel: string;
  ctaHref: string;
  available: boolean;
  expertise: [string, string, string];
}) {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          background: props.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, fontSize: '1.25rem', color: '#0b0c10', flexShrink: 0,
        }}>
          {props.initials}
        </div>
        <div>
          <h3 className="card-title" style={{ marginBottom: '0.25rem' }}>{props.name}</h3>
          <div style={{ fontSize: '0.9rem', color: 'var(--accent, #66fcf1)', fontWeight: 500 }}>
            {props.title}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {props.expertise.map((tag) => <ExpertiseTag key={tag} label={tag} />)}
      </div>

      <p className="card-desc" style={{ flex: 1 }}>{props.bio}</p>

      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        <span style={{ fontWeight: 600, color: '#f8f9fa' }}>{props.languagesLabel}</span> {props.languages}
      </div>

      <a
        href={props.ctaHref}
        className={props.available ? 'btn btn-primary' : 'btn btn-outline'}
        style={{ width: '100%', textAlign: 'center' }}
      >
        {props.ctaLabel}
      </a>
    </div>
  );
}

function AboutContent() {
  const t = useTranslations('about');
  const tTeam = useTranslations('about.team');
  const tValues = useTranslations('about.values');

  return (
    <article>
      {/* Hero / Mission */}
      <header className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center" style={{ maxWidth: 1120, margin: '0 auto' }}>
        <div style={{ maxWidth: 720 }}>
          <h1 className="hero-title" style={{ fontSize: '3rem' }}>{t('heroTitle')}</h1>
          <p className="hero-subtitle">{t('heroSubtitle')}</p>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginTop: '1.25rem' }}>
            {t('heroBody')}
          </p>
        </div>
        <div className="hidden lg:block">
          <HeroCommunity className="text-emerald-700" width={420} height={320} />
        </div>
      </header>

      {/* Mission */}
      <section className="card" style={{ marginTop: '3rem' }}>
        <h2 className="card-title">{t('missionTitle')}</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>{t('missionBody')}</p>
      </section>

      {/* Founder */}
      <section className="card" style={{ marginTop: '1.5rem' }}>
        <h2 className="card-title">{t('founderSectionTitle')}</h2>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap', marginTop: '0.75rem' }}>
          <div style={{
            width: 96, height: 96, borderRadius: '50%',
            background: '#66fcf1', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: '2rem', color: '#0b0c10', flexShrink: 0,
          }}>
            LD
          </div>
          <div style={{ flex: 1, minWidth: 260 }}>
            <h3 style={{ marginBottom: '0.25rem', fontSize: '1.25rem' }}>{t('founderName')}</h3>
            <div style={{ fontSize: '0.95rem', color: 'var(--accent, #66fcf1)', fontWeight: 500, marginBottom: '0.75rem' }}>
              {t('founderRole')}
            </div>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>{t('founderBio1')}</p>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginTop: '0.75rem' }}>
              {t('founderLanguages')}
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" style={{ marginTop: '3rem', scrollMarginTop: '6rem' }}>
        <h2 className="card-title" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{tTeam('title')}</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{tTeam('subtitle')}</p>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
          <TeamCard
            initials="LD"
            color="#66fcf1"
            name={tTeam('founder.name')}
            title={tTeam('founder.title')}
            bio={tTeam('founder.bio')}
            languages={tTeam('founder.languages')}
            languagesLabel={tTeam('languagesLabel')}
            ctaLabel={tTeam('founder.ctaLabel')}
            ctaHref="https://book.longcare.au"
            available
            expertise={[
              tTeam('founder.expertise1'),
              tTeam('founder.expertise2'),
              tTeam('founder.expertise3'),
            ]}
          />
          <TeamCard
            initials="AI"
            color="#45a29e"
            name={tTeam('assistant.name')}
            title={tTeam('assistant.title')}
            bio={tTeam('assistant.bio')}
            languages={tTeam('assistant.languages')}
            languagesLabel={tTeam('languagesLabel')}
            ctaLabel={tTeam('assistant.ctaLabel')}
            ctaHref="https://g.longcare.au"
            available
            expertise={[
              tTeam('assistant.expertise1'),
              tTeam('assistant.expertise2'),
              tTeam('assistant.expertise3'),
            ]}
          />
          <TeamCard
            initials="GM"
            color="#c5c6c7"
            name={tTeam('guests.name')}
            title={tTeam('guests.title')}
            bio={tTeam('guests.bio')}
            languages={tTeam('guests.languages')}
            languagesLabel={tTeam('languagesLabel')}
            ctaLabel={tTeam('guests.ctaLabel')}
            ctaHref="/contact"
            available={false}
            expertise={[
              tTeam('guests.expertise1'),
              tTeam('guests.expertise2'),
              tTeam('guests.expertise3'),
            ]}
          />
        </div>
      </section>

      {/* Values */}
      <section style={{ marginTop: '3rem' }}>
        <h2 className="card-title" style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>{tValues('title')}</h2>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
          {(['practical', 'smeFirst', 'responsibleAI', 'australian'] as const).map((key) => (
            <div key={key} className="card">
              <h3 className="card-title">{tValues(`${key}.title`)}</h3>
              <p className="card-desc">{tValues(`${key}.desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why LongCare */}
      <section className="card" style={{ marginTop: '3rem' }}>
        <h2 className="card-title">{t('whyTitle')}</h2>
        <ul style={{ color: 'var(--text-muted)', lineHeight: 1.9, paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
          <li>{t('why1')}</li>
          <li>{t('why2')}</li>
          <li>{t('why3')}</li>
          <li>{t('why4')}</li>
          <li>{t('why5')}</li>
        </ul>
      </section>

      {/* CTA */}
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <a href="https://book.longcare.au" className="btn btn-primary">{t('cta.button')}</a>
      </div>
    </article>
  );
}
