# Next.js Boilerplate Usage Guide

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Version Management](#version-management)
- [Testing](#testing)
- [Environment Configuration](#environment-configuration)
- [Committing Changes](#committing-changes)

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Set up environment:

```bash
npm run env:dev  # For development
npm run env:test # For testing
npm run env:prod # For production
```

3. Start development server:

```bash
npm run dev           # Standard development
npm run dev:verbose   # With debug logging
npm run dev:test     # Test environment
npm run dev:prod     # Production environment
```

## Development Workflow

### Branch Structure

- `main`: Production-ready code
- `development`: Main development branch
- `test`: Testing and QA
- Feature branches: `feature/feature-name`
- Release branches: `release/v1.0.0`

### Creating New Features

1. Create feature branch:

```bash
git checkout -b feature/your-feature-name development
```

2. Develop and test your feature
3. Commit using conventional commits:

```bash
npm run commit
```

4. Create pull request to `development`

## Version Management

### Version Format

- Format: `MAJOR.MINOR.PATCH[-PRERELEASE][+BUILD]`
- Example: `1.2.3-beta.1+20240321`

### Version Commands

```bash
# Bump major version (breaking changes)
npm run version:major

# Bump minor version (new features)
npm run version:minor

# Bump patch version (bug fixes)
npm run version:patch

# Create pre-release versions
npm run version:rc     # Release candidate
npm run version:beta   # Beta version
npm run version:alpha  # Alpha version
```

### Release Process

1. Create release branch:

```bash
git checkout -b release/v1.2.0 development
```

2. Test and stabilize:

```bash
npm run version:rc
npm run test:run
```

3. Final release:

```bash
npm run version:patch  # or appropriate version bump
git checkout main
git merge release/v1.2.0
```

## Testing

### Unit Tests

```bash
npm run test      # Watch mode
npm run test:ui   # Visual test runner
npm run test:run  # Single run
npm run coverage  # Coverage report
```

### E2E Tests

```bash
npm run test:e2e      # Run all E2E tests
npm run test:e2e:ui   # Visual E2E runner
npm run test:e2e:debug # Debug mode
```

## Environment Configuration

### Available Environments

- Development: `npm run env:dev`
- Testing: `npm run env:test`
- Production: `npm run env:prod`

### Environment Variables

Configure in `.env` files:

- `.env.development`
- `.env.test`
- `.env.production`

## Committing Changes

### Commit Process

1. Stage your changes:

```bash
git add .
```

2. Commit using Commitizen:

```bash
npm run commit
```

3. Follow the prompts:

- Type: feature, fix, docs, etc.
- Scope: component, test, etc.
- Description: Clear, concise message

### Commit Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

## Features

### Theme Support

- Light/Dark mode toggle
- Automatic system preference detection
- Persistent theme selection

### Internationalization

- Language switching
- Automatic locale detection
- Translation management

### Navigation

- Responsive design
- Active route highlighting
- Version display
- Theme toggle
- Language switcher

### Component Library

- Radix UI integration
- Custom themed components
- Responsive layouts
- Tailwind CSS styling

## Detailed Features

### Theme System

#### Configuration

```tsx
// tailwind.config.ts
const config = {
  darkMode: ["class"],
  theme: {
    // Your theme configuration
  }
}
```

#### Usage in Components

```tsx
// Using theme-aware styles
<div className="bg-background text-foreground">
  <h1 className="text-primary">Theme Aware Heading</h1>
</div>

// Force theme
<div className="dark:bg-slate-900 light:bg-white">
  Theme Specific Content
</div>
```

#### Theme Store

```tsx
import { useTheme } from '@/stores/themeStore';

// Access theme state
const { theme, setTheme } = useTheme();

// Toggle theme
setTheme(theme === 'dark' ? 'light' : 'dark');
```

### Internationalization System

#### Adding New Languages

1. Create language file in `src/locales/[lang].json`
2. Add translations:

```json
{
  "common": {
    "welcome": "Welcome",
    "login": "Login"
  },
  "errors": {
    "required": "This field is required"
  }
}
```

3. Register in `src/config/i18n.ts`

#### Using Translations

```tsx
import { useTranslation } from '@/hooks/useTranslation';

const { t } = useTranslation();
<h1>{t('common.welcome')}</h1>
```

### Component Library

#### Button Variants

```tsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
```

#### Form Components

```tsx
<Form onSubmit={handleSubmit}>
  <Input name="email" type="email" required />
  <Select name="country" options={countries} />
  <Checkbox name="terms" label="Accept Terms" />
</Form>
```

#### Layout Components

```tsx
<Container>
  <Grid cols={2}>
    <Card>Content</Card>
    <Card>Content</Card>
  </Grid>
</Container>
```

## Troubleshooting Guide

### Common Issues

#### Build Errors

1. **Module Not Found Errors**

```bash
Error: Cannot find module '@/components/...'
```

Solution:

- Check `tsconfig.json` paths
- Verify import path is correct
- Run `npm install` to update dependencies

2. **Type Errors**

```bash
Type '...' is not assignable to type '...'
```

Solution:

- Check component prop types
- Update type definitions
- Verify TypeScript version

#### Runtime Errors

1. **Hydration Mismatch**

```bash
Hydration failed because the initial UI does not match what was rendered on the server
```

Solution:

- Use `useEffect` for client-side only code
- Add `suppressHydrationWarning` to dynamic elements
- Check for `undefined` values during SSR

2. **API Routes Not Found**

```bash
404 - API route not found
```

Solution:

- Verify API route path in `app/api/`
- Check route handler export
- Ensure correct HTTP method

#### Testing Issues

1. **Test Timeouts**

```bash
Test timed out in 5000ms
```

Solution:

- Increase timeout in test config
- Check for async operations
- Verify test cleanup

2. **Mock Failures**

```bash
Cannot find module to mock
```

Solution:

- Update mock path
- Check mock implementation
- Verify module exists

### Performance Optimization

#### Bundle Size Issues

- Run `npm run analyze` to check bundle size
- Use dynamic imports for large components
- Implement code splitting

#### Memory Leaks

- Clean up event listeners
- Unsubscribe from stores
- Cancel async operations

### Environment Issues

#### Environment Variables

- Check `.env` file exists
- Verify variable naming (NEXT*PUBLIC*\*)
- Restart dev server after changes

#### Node Version Conflicts

- Use `nvm` to manage Node versions
- Check `package.json` engines field
- Update npm to latest version

## Security Best Practices

### API Security

- Use rate limiting
- Implement CORS policies
- Validate input data

### Authentication

- Use secure session management
- Implement proper token handling
- Follow OAuth best practices

### Data Protection

- Sanitize user input
- Encrypt sensitive data
- Use secure headers

## Deployment

### Vercel Deployment

```bash
npm run build
vercel --prod
```

### Docker Deployment

```bash
docker build -t nextboilerplate .
docker run -p 3000:3000 nextboilerplate
```

### Environment Setup

- Configure production variables
- Set up monitoring
- Enable error tracking
