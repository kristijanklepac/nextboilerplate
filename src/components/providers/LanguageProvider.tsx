'use client';

import { useEffect } from 'react';
import { useLanguageStore } from '@/stores/languageStore';
import type { Locale } from '@/i18n/types';

const LANGUAGE_COOKIE = 'preferred-language';

function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

function setCookie(name: string, value: string, days: number) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { setLocale, setHydrated } = useLanguageStore();

  useEffect(() => {
    // Get language from cookie or browser preference
    const savedLanguage = getCookie(LANGUAGE_COOKIE);
    const browserLanguage = navigator.language.split('-')[0];
    
    let selectedLanguage: Locale = 'en';
    
    if (savedLanguage === 'hr' || browserLanguage === 'hr') {
      selectedLanguage = 'hr';
    }
    
    setLocale(selectedLanguage);
    setCookie(LANGUAGE_COOKIE, selectedLanguage, 365);
    setHydrated();
  }, [setLocale, setHydrated]);

  return <>{children}</>;
} 