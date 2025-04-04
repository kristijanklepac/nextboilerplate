"use client";

import { useTheme } from '@/providers/ThemeProvider';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Sun 
          className="w-5 h-5 text-gray-600 dark:text-gray-400" 
          role="img"
          aria-label="Light mode"
        />
      ) : (
        <Moon 
          className="w-5 h-5 text-gray-600 dark:text-gray-400"
          role="img"
          aria-label="Dark mode"
        />
      )}
    </button>
  );
} 