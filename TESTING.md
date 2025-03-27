# Testing Guide

This project uses two types of tests:

- Unit/Integration tests with Vitest
- End-to-End (E2E) tests with Playwright

## Test Structure

````

## Running Tests

### Unit/Integration Tests (Vitest)
```bash
# Run unit tests in watch mode
npm test

# Run unit tests once
npm run test:run

# Run unit tests with coverage
npm run coverage
````

These tests are for:

- Component testing
- Store logic
- Utility functions
- Integration between components

Files should be named `*.test.ts` or `*.test.tsx` and placed next to the code they're testing.

### E2E Tests (Playwright)

```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui
```

These tests are for:

- User flows
- Browser interactions
- Multi-page scenarios
- Real API interactions

Files should be named `*.spec.ts` and placed in `src/e2e/`.

## Test File Naming

- Vitest tests: `ComponentName.test.tsx` or `utility.test.ts`
- Playwright tests: `feature.spec.ts`

## Examples

### Vitest Component Test

```typescript
// src/components/Button/Button.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

### Playwright E2E Test

```typescript
// src/e2e/navigation.spec.ts
import { test, expect } from '@playwright/test';

test('user can navigate through main flows', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Get Started');
  await expect(page).toHaveURL('/dashboard');
});
```

## Best Practices

### Unit Tests (Vitest)

- Keep tests close to the code they're testing
- Use meaningful test descriptions
- Test component behavior, not implementation
- Mock external dependencies
- Keep tests isolated

### E2E Tests (Playwright)

- Test complete user flows
- Use data-testid for stable selectors
- Test across different pages
- Minimize test interdependence
- Focus on critical user paths

## Configuration Files

- `vitest.config.ts` - Vitest configuration
- `playwright.config.ts` - Playwright configuration

## Continuous Integration

Tests are run automatically on:

- Pull requests
- Merges to main branch
- Release branches

## Getting Help

If you need help with tests:

1. Check the test configuration files
2. Review the examples in this guide
3. Consult the [Vitest](https://vitest.dev/) or [Playwright](https://playwright.dev/) documentation
4. Ask the team for assistance
