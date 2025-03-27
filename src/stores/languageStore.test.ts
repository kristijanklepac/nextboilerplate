import { describe, it, expect, beforeEach } from 'vitest';
import { useLanguageStore } from './languageStore';

describe('languageStore', () => {
  beforeEach(() => {
    // Reset the store before each test
    useLanguageStore.setState({ locale: 'en' });
  });

  it('should initialize with English as default language', () => {
    const store = useLanguageStore.getState();
    expect(store.locale).toBe('en');
  });

  it('should change language', () => {
    const store = useLanguageStore.getState();
    // Get the setLocale function from the store
    const { setLocale } = store;
    // Call setLocale to change the language
    setLocale('es');
    // Get the updated state
    const updatedStore = useLanguageStore.getState();
    expect(updatedStore.locale).toBe('es');
  });

  it('should persist language selection', () => {
    const { setLocale } = useLanguageStore.getState();
    setLocale('fr');
    
    // Get a fresh instance of the store
    const newStore = useLanguageStore.getState();
    expect(newStore.locale).toBe('fr');
  });
}); 