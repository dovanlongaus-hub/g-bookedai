'use client';

import { useEffect, useCallback } from 'react';

declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: {
          new (options: Record<string, unknown>, elementId: string): void;
          InlineLayout: { SIMPLE: number };
        };
      };
    };
    googleTranslateElementInit: () => void;
  }
}

const LANG_MAP: Record<string, string> = {
  en: 'en',
  vi: 'vi',
  zh: 'zh-CN',
  ja: 'ja',
  ko: 'ko',
  th: 'th',
  hi: 'hi',
  ar: 'ar',
  fr: 'fr',
  de: 'de',
  es: 'es',
  pt: 'pt',
  id: 'id',
  ms: 'ms',
  tl: 'tl',
};

export function useGoogleTranslate() {
  useEffect(() => {
    // Only load once
    if (document.getElementById('google-translate-script')) return;

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: Object.values(LANG_MAP).join(','),
          autoDisplay: false,
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        'google_translate_element'
      );
    };

    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    // Hide Google Translate banner
    const style = document.createElement('style');
    style.textContent = `
      .goog-te-banner-frame, .goog-te-balloon-frame { display: none !important; }
      body { top: 0 !important; }
      .goog-te-gadget { font-size: 0 !important; }
      .goog-te-gadget .goog-te-combo { display: none !important; }
      #google_translate_element { display: none !important; }
      .goog-tooltip, .goog-tooltip:hover { display: none !important; }
      .goog-text-highlight { background: none !important; box-shadow: none !important; }
      .skiptranslate { display: none !important; }
      body { top: 0 !important; position: static !important; }
    `;
    document.head.appendChild(style);
  }, []);

  const switchLanguage = useCallback((langCode: string) => {
    const googleLang = LANG_MAP[langCode] || langCode;

    // Method 1: Use the Google Translate cookie
    const domain = window.location.hostname;
    document.cookie = `googtrans=/en/${googleLang}; path=/; domain=${domain}`;
    document.cookie = `googtrans=/en/${googleLang}; path=/`;

    // Method 2: Find and trigger the Google Translate select
    const frame = document.querySelector('.goog-te-menu-frame') as HTMLIFrameElement;
    if (frame) {
      const items = frame.contentDocument?.querySelectorAll('.goog-te-menu2-item');
      items?.forEach((item) => {
        const text = item.textContent?.toLowerCase() || '';
        if (
          (googleLang === 'vi' && text.includes('vietnam')) ||
          (googleLang === 'zh-CN' && (text.includes('chinese') || text.includes('中文'))) ||
          (googleLang === 'ja' && text.includes('japan')) ||
          (googleLang === 'ko' && text.includes('korean')) ||
          (googleLang === 'en' && text.includes('english'))
        ) {
          (item as HTMLElement).click();
        }
      });
    }

    // Method 3: Direct cookie + reload approach (most reliable)
    if (googleLang === 'en') {
      // Reset to English
      document.cookie = 'googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC';
      document.cookie = `googtrans=; path=/; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
      // Try to find and click restore
      const restoreEl = document.querySelector('.goog-te-banner-frame');
      if (restoreEl) {
        const iframeDoc = (restoreEl as HTMLIFrameElement).contentDocument;
        const restoreBtn = iframeDoc?.querySelector('.goog-te-banner-frame-content .goog-te-button button');
        if (restoreBtn) (restoreBtn as HTMLElement).click();
        else window.location.reload();
      } else {
        window.location.reload();
      }
    } else {
      window.location.reload();
    }
  }, []);

  return { switchLanguage, LANG_MAP };
}

export function GoogleTranslateElement() {
  return <div id="google_translate_element" />;
}
