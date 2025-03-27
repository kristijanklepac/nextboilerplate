This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Testing

This project uses Playwright for end-to-end and component testing. For detailed information on how to write and run tests, please refer to the [Testing Documentation](./TESTING.md).

Quick start:

```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# View test report
npm run test:report
```

## Environment Configuration

This application supports three different environments:

- **Development**: Default environment for local development with real data
- **Test**: Testing environment with mock data
- **Production**: Production-ready environment with real data

For detailed information on environment setup and usage, please refer to the [Environment Documentation](./ENVIRONMENTS.md).

### Environment Setup

To set up your local environment:

1. Copy the example environment file to create your own:

   ```bash
   cp .env.example .env
   ```

2. Choose an environment to run in:

   ```bash
   # Development environment (default)
   npm run env:dev

   # Test environment (uses mock data)
   npm run env:test

   # Production environment
   npm run env:prod
   ```

3. Run the application:
   ```bash
   npm run dev
   ```

Alternatively, you can run directly in a specific environment without changing the `.env` file:

```bash
# Run in development environment (default)
npm run dev

# Run in test environment (uses mock data)
npm run dev:test

# Run in production environment
npm run dev:prod
```

## Logging

This application includes a flexible logging system that adjusts based on the environment:

- **Development**: Debug level logging (all logs displayed)
- **Test**: Info level logging (info, warn, error logs displayed)
- **Production**: Error level logging (only error logs displayed)

### Using the Logger

The logger can be imported and used anywhere in the application:

```typescript
import logger from '@/lib/logger';

// Different log levels
logger.debug('Debug message', { metaData: 'example' });
logger.info('Info message');
logger.warn('Warning message');
logger.error('Error message', new Error('Something went wrong'));

// API logging (automatically used in API requests in development)
logger.logApiRequest('GET', '/api/endpoint', { query: 'param' });
logger.logApiResponse('GET', '/api/endpoint', 200, { data: 'response' });
```

For more details about logging, see the [Environments Documentation](ENVIRONMENTS.md#logging-configuration).
