"use client";

import Link from 'next/link.js';
import { usePathname } from 'next/navigation.js';
import { versionDisplay } from "@/lib/version";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from "@/stores/languageStore";
import { useLanguageStore } from '@/stores/languageStore';

export default function Navigation() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const { isHydrated } = useLanguageStore();

  // Show a simple version during server render and hydration
  if (!isHydrated) {
    return (
      <nav className="w-full py-4 px-8 sm:px-20 bg-background border-b">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link href="/">Next App</Link>
        </div>
      </nav>
    );
  }

  // Show full navigation after hydration
  return (
    <nav className="w-full py-4 px-8 sm:px-20 bg-background border-b dark:bg-gray-900 dark:border-gray-800">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="font-bold text-lg text-gray-900 dark:text-white">
          Next App <span className="text-xs text-gray-500 dark:text-gray-400 font-normal">{versionDisplay}</span>
        </Link>
        
        <div className="flex items-center space-x-6">
          <ul className="flex space-x-6">
            <li>
              <Link 
                href="/" 
                className={`${pathname === "/" ? "font-medium text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"}`}
                data-testid="nav-home"
              >
                {t('common.navigation.home')}
              </Link>
            </li>
            <li>
              <Link 
                href="/counter" 
                className={`${pathname === "/counter" ? "font-medium text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"}`}
                data-testid="nav-counter"
              >
                {t('common.navigation.counter')}
              </Link>
            </li>
            <li>
              <Link 
                href="/about" 
                className={`${pathname === "/about" ? "font-medium text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"}`}
                data-testid="nav-about"
              >
                {t('common.navigation.about')}
              </Link>
            </li>
            <li>
              <Link 
                href="/examples/logging" 
                className={`${pathname === "/examples/logging" ? "font-medium text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"}`}
                data-testid="nav-logging"
              >
                {t('common.navigation.logging')}
              </Link>
            </li>
            <li>
              <Link 
                href="/version" 
                className={`${pathname === "/version" ? "font-medium text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"}`}
                data-testid="nav-version"
              >
                {t('common.navigation.version')}
              </Link>
            </li>
          </ul>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
} 