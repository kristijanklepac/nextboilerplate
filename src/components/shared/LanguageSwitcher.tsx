"use client";

import { useEffect, useState } from 'react';
import { useLanguageStore } from '@/stores/languageStore';

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguageStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Handle hydration
    setMounted(true);
  }, []);

  // Don't render anything until after hydration
  if (!mounted) {
    return <select disabled><option value="en">English</option></select>;
  }

  return (
    <select 
      name="language"
      value={locale}
      onChange={(e) => setLocale(e.target.value)}
      className="p-2 rounded-lg bg-background border border-input hover:bg-accent hover:text-accent-foreground"
    >
      <option value="en">English</option>
      <option value="hr">Hrvatski</option>
      <option value="es">Español</option>
      <option value="fr">Français</option>
    </select>
  );
} 