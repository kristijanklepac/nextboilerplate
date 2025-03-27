/**
 * Application configuration based on environment
 */

// Define the types for our configuration
interface CommonConfig {
  appName: string;
}

interface EnvironmentConfig {
  apiUrl: string;
  logLevel: string;
  useMocks?: boolean;
}

interface AppConfig extends CommonConfig, EnvironmentConfig {
  env: string;
  useMocks: boolean;
}

// Get current environment
let env = process.env.NEXT_PUBLIC_ENV ?? 'development';
let useMocks = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';

// Check for environment override in localStorage if in browser
if (typeof window !== 'undefined') {
  try {
    const envOverride = localStorage.getItem('env_override');
    if (envOverride) {
      console.log(`Using environment override from localStorage: ${envOverride}`);
      env = envOverride;
      // Use mocks in test environment
      useMocks = envOverride === 'test' || process.env.NEXT_PUBLIC_USE_MOCKS === 'true';
    }
  } catch {
    // Ignore localStorage errors (might happen in test contexts)
  }
}

// Environment-specific configuration
const config = {
  // Common configuration for all environments
  common: {
    appName: 'Next App',
  } as CommonConfig,
  
  // Environment-specific overrides
  development: {
    apiUrl: process.env.NEXT_PUBLIC_API_URL ?? 'https://api.dev.example.com',
    logLevel: process.env.NEXT_PUBLIC_LOG_LEVEL ?? 'debug',
  } as EnvironmentConfig,
  
  test: {
    apiUrl: process.env.NEXT_PUBLIC_API_URL ?? 'https://api.test.example.com',
    logLevel: process.env.LOG_LEVEL ?? 'info',
    useMocks: true,
  } as EnvironmentConfig,
  
  production: {
    apiUrl: process.env.NEXT_PUBLIC_API_URL ?? 'https://api.example.com',
    logLevel: process.env.LOG_LEVEL ?? 'error',
  } as EnvironmentConfig,
};

// Ensure tests always use mock data
if (env === 'test') {
  useMocks = true;
}

// Merge common config with environment-specific config
const currentConfig = {
  ...config.common,
  ...(config[env as keyof typeof config] || config.development),
  env,
  // Override useMocks with environment-specific setting and explicit env var
  useMocks: (env === 'test') || useMocks,
} as AppConfig;

export default currentConfig; 