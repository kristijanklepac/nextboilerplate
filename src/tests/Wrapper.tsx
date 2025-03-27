import { ThemeProvider } from '@/providers/ThemeProvider';
import { useEffect } from 'react';
import { useLanguageStore } from '@/stores/languageStore';

export const Wrapper = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Set hydrated state for tests
    useLanguageStore.setState({ locale: 'en', isHydrated: true });
  }, []);

  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}; 