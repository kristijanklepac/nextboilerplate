# Environment Configuration

This application supports three different environments: development, test, and production. Each environment has its own configuration settings and can be run separately.

## Available Environments

- **Development**: The default environment for local development
- **Test**: A testing environment with mock data
- **Production**: The production environment with optimized settings

## Environment Files

The application uses environment files to manage environment-specific variables. Each environment has its own file:

- `.env.local`: Local overrides (not tracked in Git)
- `.env.development`: Configuration for development environment
- `.env.test`: Configuration for test environment
- `.env.production`: Configuration for production environment

## Example Environment Files

We provide example environment files that you can use as templates:

- `.env.example`: A complete example with all available environment variables
- `.env.development.example`: Example settings for the development environment
- `.env.test.example`: Example settings for the test environment
- `.env.production.example`: Example settings for the production environment

You can copy these files to create your own environment configuration:

```bash
# General use
cp .env.example .env

# For specific environments
cp .env.development.example .env.development
cp .env.test.example .env.test
cp .env.production.example .env.production
```

## Logging Configuration

The application implements a flexible logging system that automatically adjusts based on the environment:

- **Development**: Debug level logging by default (all logs displayed)
- **Test**: Info level logging by default (info, warn, error logs displayed)
- **Production**: Error level logging by default (only error logs displayed)

### Log Levels

The system supports the following log levels, in order of verbosity:

1. `debug` - Detailed information for debugging purposes
2. `info` - General information about application operation
3. `warn` - Warning messages that don't prevent the application from working
4. `error` - Error messages for issues that need attention

### Overriding Log Levels

You can override the default log level by setting the `LOG_LEVEL` environment variable:

```bash
# Running with verbose logging in any environment
LOG_LEVEL=debug npm run dev

# Using the verbose script
npm run dev:verbose
```

### Logging Features

- Automatic log level adjustment based on environment
- Timestamps and log level indicators in log messages
- API request and response logging in development mode
- Error stack traces in development mode

## Running Different Environments

You can run the application in different environments using the following commands:

```bash
# Development environment (default)
npm run dev

# Development with verbose logging
npm run dev:verbose

# Test environment
npm run dev:test

# Production environment
npm run dev:prod
```

## Building for Different Environments

You can build the application for different environments using the following commands:

```bash
# Development environment (default)
npm run build

# Test environment
npm run build:test

# Production environment
npm run build:prod
```

## Starting the Built Application

After building, you can start the application using the following commands:

```bash
# Development environment (default)
npm run start

# Test environment
npm run start:test

# Production environment
npm run start:prod
```

## Environment Override

You can temporarily override the environment using the browser's local storage. This is useful for testing different environments without changing your configuration.

1. Open the browser console (F12 or Ctrl+Shift+J)
2. Set the environment override:
   ```javascript
   localStorage.setItem('env_override', 'test'); // For test environment
   ```
3. Refresh the page

To remove the override:

```javascript
localStorage.removeItem('env_override');
```

## Adding New Environment Variables

To add a new environment variable:

1. Add it to the `.env.example` file and document its purpose
2. Add it to the environment-specific example files with appropriate default values
3. Update the `src/lib/config.ts` file to include the new variable

## Environment Variables

| Variable              | Description                    | Default                      |
| --------------------- | ------------------------------ | ---------------------------- |
| NODE_ENV              | Node environment type          | `development`                |
| NEXT_PUBLIC_ENV       | Frontend environment indicator | Same as NODE_ENV             |
| NEXT_PUBLIC_API_URL   | API endpoint URL               | Varies by environment        |
| NEXT_PUBLIC_USE_MOCKS | Whether to use mock data       | `false` (except in test env) |
| LOG_LEVEL             | Logging verbosity              | Varies by environment        |

## Quick Environment Switching

The application includes a helper script to quickly switch between environments:

```bash
# Switch to development environment
npm run env:dev

# Switch to test environment
npm run env:test

# Switch to production environment
npm run env:prod

# Or specify an environment directly
npm run env [environment]
```

This script:

1. Copies the appropriate `.env.[environment]` file to `.env`
2. Displays the current environment variables
3. Allows you to run the application with `npm run dev`

## Running with Explicit Environment

You can also run the application directly in a specific environment without changing the `.env` file:

```bash
# Run in development environment
npm run dev

# Run in test environment (uses mock data)
npm run dev:test

# Run in production environment
npm run dev:prod
```

This is useful for temporarily running in a different environment without changing your configuration.

## Building for Different Environments

```bash
# Build for development
npm run build

# Build for test
npm run build:test

# Build for production
npm run build:prod
```

## Environment Features

### Development Environment

- Debug logs enabled
- Development API endpoints used
- Real data from development API

### Test Environment

- Mock data instead of real API calls
- Optimized for testing
- Visual indicator showing "test (mock data)"

### Production Environment

- Error logs only
- Production API endpoints
- Performance optimizations
- No mock data

## Visual Indicators

The application includes a visual environment indicator in the bottom-right corner that shows which environment is currently active. This helps developers ensure they're working in the intended environment.

## Mocked Data (Test Environment)

In the test environment, the application uses mock data instead of making actual API calls. This allows for:

1. Consistent, predictable data for tests
2. Independence from external services
3. Faster test execution
4. Offline testing capabilities

The mock data is defined in `src/lib/api/mockData.ts`.

## How API Mocking Works

The application has an API service (`src/lib/api/api.ts`) that:

1. Checks the current environment
2. Uses mock data ONLY for the test environment
3. Makes real API calls for development and production environments

In development and production environments, mock data is explicitly disabled to ensure real API endpoints are always used.

To add a new API endpoint with mocking:

1. Add the real API call logic to `ApiService` class
2. Add corresponding mock data to `mockData.ts`
3. Return the mock data when `this.useMocks` is true (will only be true in test environment)
