import { create } from 'zustand';
import { persist } from 'zustand/middleware';
// import { Locale } from '@/config/i18n.config';
import en from '@/i18n/locales/en';
import hr from '@/i18n/locales/hr';
import es from '@/i18n/locales/es';
import fr from '@/i18n/locales/fr';

interface LanguageState {
  locale: string;
  isHydrated: boolean;
  setLocale: (locale: string) => void;
  setHydrated: () => void;
}

interface TranslationValue {
  [key: string]: TranslationValue | string;
}

// interface Translations {
//   [locale: string]: TranslationValue;
// }

const translations = {
  en,
  hr,
  es,
  fr,
} as const;

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      locale: 'en',
      isHydrated: false,
      setLocale: (locale: string) => set({ locale }),
      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: 'language-store',
      skipHydration: true,
    }
  )
);

export function useTranslation() {
  const { locale } = useLanguageStore();
  
  function t(key: string) {
    const keys = key.split('.');
    let value: TranslationValue | string = translations[locale as keyof typeof translations];
    
    for (const k of keys) {
      if (typeof value === 'object' && value !== null) {
        value = value[k];
      } else {
        return key;
      }
      if (value === undefined) return key;
    }
    
    return value as string;
  }
  
  return { t, locale };
} 