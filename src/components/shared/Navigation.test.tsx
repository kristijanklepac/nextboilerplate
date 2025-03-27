import { render, screen } from '@testing-library/react';
import Navigation from './Navigation';
import { Wrapper } from '@/tests/Wrapper';
import { vi } from 'vitest';

// Mock next/navigation
vi.mock('next/navigation.js', () => ({
  usePathname: () => '/'
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

describe('Navigation', () => {
  it('should render minimal navigation before hydration', () => {
    render(<Navigation />, { wrapper: Wrapper });
    expect(screen.getByTestId('nav-logo')).toBeInTheDocument();
  });

  it('should render full navigation after hydration', () => {
    render(<Navigation />, { wrapper: Wrapper });
    expect(screen.getByTestId('nav-counter')).toBeInTheDocument();
    expect(screen.getByTestId('nav-about')).toBeInTheDocument();
  });

  it('should highlight active link based on current path', () => {
    render(<Navigation />, { wrapper: Wrapper });
    const homeLink = screen.getByTestId('nav-home-link');
    expect(homeLink).toHaveClass('font-medium text-gray-900 dark:text-white');
  });

  it('should render version display', () => {
    render(<Navigation />, { wrapper: Wrapper });
    const versionElements = screen.getAllByTitle(/Stable version|Pre-release version/);
    expect(versionElements.length).toBeGreaterThan(0);
    expect(versionElements[0]).toBeInTheDocument();
  });
}); 