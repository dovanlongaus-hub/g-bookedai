'use client';

import { useEffect, useCallback, useRef } from 'react';

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
    _gtInitialized?: boolean;
  }
}

export const GT_LANG_MAP: Record<string, string> = {
  en: 'en',
  vi: 'vi',
  zh: 'zh-CN',
  ja: 'ja',
  ko: 'ko',
  th: 'th',
  fr: 'fr',
  de: 'de',
  es: 'es',
};

function clearGoogTransCookies() {
  const hostname = window.location.hostname;
  const expiry = 'expires=Thu, 01 Jan 1970 00:00:00 UTC';
  document.cookie = `googtrans=; path=/; ${expiry}`;
  document.cookie = `googtrans=; path=/; domain=${hostname}; ${expiry}`;
  document.cookie = `googtrans=; path=/; domain=.${hostname}; ${expiry}`;
  // Also clear for parent domain (e.g., .bookedai.au)
  const parts = hostname.split('.');
  if (parts.length > 2) {
    const parent = parts.slice(-2).join('.');
    document.cookie = `googtrans=; path=/; domain=.${parent}; ${expiry}`;
  }
}

function setGoogTransCookie(targetLang: string) {
  const hostname = window.location.hostname;
  const val = `/en/${targetLang}`;
  document.cookie = `googtrans=${val}; path=/`;
  document.cookie = `googtrans=${val}; path=/; domain=${hostname}`;
  document.cookie = `googtrans=${val}; path=/; domain=.${hostname}`;
  const parts = hostname.split('.');
  if (parts.length > 2) {
    const parent = parts.slice(-2).join('.');
    document.cookie = `googtrans=${val}; path=/; domain=.${parent}`;
  }
}

/**
 * Directly trigger the hidden Google Translate <select> element.
 * This is more reliable than cookie + reload.
 */
function triggerGoogleTranslateCombo(targetLang: string): boolean {
  const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
  if (!combo) return false;

  combo.value = targetLang;
  combo.dispatchEvent(new Event('change', { bubbles: true }));
  return true;
}

export function useGoogleTranslate() {
  const readyRef = useRef(false);

  useEffect(() => {
    if (window._gtInitialized) return;
    window._gtInitialized = true;

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: Object.values(GT_LANG_MAP).join(','),
          autoDisplay: false,
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        'google_translate_element'
      );
      readyRef.current = true;
    };

    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    // Hide Google Translate UI chrome but keep the combo functional
    const style = document.createElement('style');
    style.id = 'gt-custom-styles';
    style.textContent = `
      .goog-te-banner-frame { display: none !important; }
      body { top: 0 !important; position: static !important; }
      #google_translate_element { position: absolute; top: -9999px; left: -9999px; opacity: 0; pointer-events: none; }
      .goog-te-gadget { font-size: 0 !important; line-height: 0 !important; }
      .goog-tooltip, .goog-tooltip:hover { display: none !important; }
      .goog-text-highlight { background: none !important; box-shadow: none !important; }
      .skiptranslate { height: 0 !important; overflow: hidden !important; }
      .VIpgJd-ZVi9od-ORHb-OEVmcd { display: none !important; }
    `;
    document.head.appendChild(style);
  }, []);

  const switchLanguage = useCallback((langCode: string) => {
    const googleLang = GT_LANG_MAP[langCode] || langCode;

    if (googleLang === 'en') {
      // Reset to original English
      clearGoogTransCookies();

      // Try combo first
      const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (combo) {
        combo.value = 'en';
        combo.dispatchEvent(new Event('change', { bubbles: true }));
        // Give it a moment, then reload if page isn't restored
        setTimeout(() => {
          if (document.documentElement.lang !== 'en') {
            window.location.reload();
          }
        }, 500);
      } else {
        window.location.reload();
      }
      return;
    }

    // Set cookies for the target language
    setGoogTransCookie(googleLang);

    // Try direct combo trigger (no reload needed)
    const triggered = triggerGoogleTranslateCombo(googleLang);

    if (!triggered) {
      // Combo not ready yet - wait and retry, then reload as last resort
      let retries = 0;
      const interval = setInterval(() => {
        retries++;
        if (triggerGoogleTranslateCombo(googleLang)) {
          clearInterval(interval);
        } else if (retries > 10) {
          clearInterval(interval);
          window.location.reload();
        }
      }, 300);
    }
  }, []);

  return { switchLanguage };
}

export function GoogleTranslateElement() {
  return <div id="google_translate_element" />;
}
