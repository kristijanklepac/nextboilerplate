import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Navigation from './Navigation';
import { useLanguageStore } from '@/stores/languageStore';
import { ThemeProvider } from '@/providers/ThemeProvider';

// Mock next/navigation
const usePathname = vi.fn(() => '/');
vi.mock('next/navigation.js', () => ({
  usePathname: () => usePathname(),
}));

// Mock next/link
vi.mock('next/link.js', () => {
  return {
    __esModule: true,
    default: ({ children, ...props }: { children: React.ReactNode } & Record<string, unknown>) => {
      return <a {...props}>{children}</a>;
    }
  };
});

// Create a wrapper component with necessary providers
const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>
    {children}
  </ThemeProvider>
);

describe('Navigation', () => {
  beforeEach(() => {
    // Reset language store before each test
    useLanguageStore.setState({ locale: 'en', isHydrated: false });
    // Reset pathname mock
    usePathname.mockReturnValue('/');
  });

  it('should render minimal navigation before hydration', () => {
    render(<Navigation />, { wrapper: Wrapper });
    expect(screen.getByText('Next App')).toBeInTheDocument();
    expect(screen.queryByText('Counter')).not.toBeInTheDocument();
  });

  it('should render full navigation after hydration', () => {
    // Set hydrated state
    useLanguageStore.setState({ locale: 'en', isHydrated: true });
    
    render(<Navigation />, { wrapper: Wrapper });
    
    // Check if all navigation links are present by their text content
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Counter')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Logging')).toBeInTheDocument();
    expect(screen.getByText('Version')).toBeInTheDocument();
  });

  it('should highlight active link based on current path', () => {
    // Mock pathname as /counter
    usePathname.mockReturnValue('/counter');
    useLanguageStore.setState({ locale: 'en', isHydrated: true });

    render(<Navigation />, { wrapper: Wrapper });
    
    // Find the Counter link and check its class
    const counterLink = screen.getByText('Counter').closest('a');
    // Check for the active class
    expect(counterLink).toHaveClass('text-gray-900');
    expect(counterLink).toHaveClass('font-medium');
    expect(counterLink).toHaveClass('dark:text-white');
  });

  it('should render version display', () => {
    useLanguageStore.setState({ locale: 'en', isHydrated: true });
    render(<Navigation />, { wrapper: Wrapper });
    
    expect(screen.getByText(/v\d+\.\d+\.\d+/)).toBeInTheDocument();
  });
}); 