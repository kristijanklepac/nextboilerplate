"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link.js';
import { usePathname } from 'next/navigation.js';
import { versionDisplay } from "@/lib/version";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from "@/stores/languageStore";
import { useLanguageStore } from '@/stores/languageStore';
import { VersionDisplay } from './VersionDisplay';

export default function Navigation() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const { isHydrated } = useLanguageStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const prevPathRef = useRef(pathname);

  // Close menu when changing routes or escape key pressed
  useEffect(() => {
    // Close menu when route changes
    if (prevPathRef.current !== pathname) {
      setIsMenuOpen(false);
      prevPathRef.current = pathname;
    }

    // Close menu when pressing escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [pathname]);

  // Handle body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Show a simple version during server render and hydration
  if (!isHydrated) {
    return (
      <nav className="w-full py-4 px-4 sm:px-8 lg:px-20 bg-background border-b">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link href="/">Next App</Link>
        </div>
      </nav>
    );
  }

  const navLinkClasses = (isActive: boolean) => 
    `transition-colors duration-200 ${
      isActive
        ? 'font-medium text-gray-900 dark:text-white'
        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
    }`;

  const navLinks = [
    { href: "/", label: t('common.navigation.home'), testId: "nav-home-link" },
    { href: "/counter", label: t('common.navigation.counter'), testId: "nav-counter" },
    { href: "/about", label: t('common.navigation.about'), testId: "nav-about" },
    { href: "/examples/logging", label: t('common.navigation.logging'), testId: "nav-logging" },
    { href: "/version", label: t('common.navigation.version'), testId: "nav-version" },
    { href: "/contact", label: t('common.navigation.contact'), testId: "nav-contact" },
  ];

  const handleOverlayKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setIsMenuOpen(false);
    }
  };

  // Show full navigation after hydration
  return (
    <nav className="w-full py-4 px-4 sm:px-8 lg:px-20 bg-background border-b dark:bg-gray-900 dark:border-gray-800 relative z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link 
          href="/" 
          className="font-bold text-lg text-gray-900 dark:text-white flex items-center"
          data-testid="nav-logo"
        >
          Next App <span className="text-xs text-gray-500 dark:text-gray-400 font-normal ml-1">{versionDisplay}</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <ul className="flex space-x-6">
            {navLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  data-testid={link.testId}
                  className={navLinkClasses(pathname === link.href)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center space-x-4">
            <VersionDisplay />
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex md:hidden items-center space-x-4">
          <VersionDisplay />
          <ThemeToggle />
          <button 
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            data-testid="mobile-menu-button"
          >
            <div className="relative w-6 h-5">
              <span 
                className={`absolute block w-6 h-0.5 bg-gray-900 dark:bg-white transform transition-all duration-300 ease-in-out ${
                  isMenuOpen ? 'rotate-45 top-2' : 'top-0'
                }`}
              />
              <span 
                className={`absolute block w-6 h-0.5 bg-gray-900 dark:bg-white transform transition-all duration-300 ease-in-out top-2 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span 
                className={`absolute block w-6 h-0.5 bg-gray-900 dark:bg-white transform transition-all duration-300 ease-in-out ${
                  isMenuOpen ? '-rotate-45 top-2' : 'top-4'
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`fixed inset-0 z-40 transform transition-all duration-300 ease-in-out md:hidden ${
          isMenuOpen 
            ? 'translate-x-0 opacity-100' 
            : 'translate-x-full opacity-0 pointer-events-none'
        }`}
      >
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={() => setIsMenuOpen(false)}
          role="button"
          tabIndex={0}
          onKeyDown={handleOverlayKeyDown}
          aria-label="Close menu"
        />
        <div className="absolute right-0 top-0 w-3/4 h-full bg-white dark:bg-gray-900 shadow-xl py-4 px-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <Link 
              href="/" 
              className="font-bold text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Next App
            </Link>
            <button 
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Close menu"
            >
              <svg 
                className="w-6 h-6 text-gray-900 dark:text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                title="Close"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <ul className="space-y-6">
            {navLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block text-lg ${navLinkClasses(pathname === link.href)}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-center space-x-4">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
} 