'use client';

import { useEffect } from 'react';
import { useLanguageStore } from '@/stores/languageStore';
import { useCounterStore } from '@/stores/counterStore';

export function StoreHydration() {
  useEffect(() => {
    useLanguageStore.persist.rehydrate();
    useCounterStore.persist.rehydrate();
  }, []);

  return null;
} 