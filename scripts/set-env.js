#!/usr/bin/env node

/**
 * This script sets up the environment for development
 * Usage: node scripts/set-env.js [environment]
 * Example: node scripts/set-env.js test
 */

import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const env = args[0] || 'development';

// Validate environment
const validEnvs = ['development', 'test', 'production'];
if (!validEnvs.includes(env)) {
  console.error(`Error: Invalid environment "${env}". Valid options are: ${validEnvs.join(', ')}`);
  process.exit(1);
}

// Path to environment file
const envFile = path.join(process.cwd(), `.env.${env}`);

// Check if environment file exists
if (!fs.existsSync(envFile)) {
  console.error(`Error: Environment file not found: ${envFile}`);
  process.exit(1);
}

// Path to .env file
const dotEnvFile = path.join(process.cwd(), '.env');

// Copy environment file to .env
try {
  fs.copyFileSync(envFile, dotEnvFile);
  console.log(`Successfully set environment to ${env}`);
  console.log(`Copied ${envFile} to ${dotEnvFile}`);
} catch (error) {
  console.error(`Error setting environment: ${error.message}`);
  process.exit(1);
}

// Log environment variables
try {
  const envContent = fs.readFileSync(dotEnvFile, 'utf8');
  console.log('\nEnvironment variables:');
  console.log('--------------------');
  console.log(envContent);
  console.log('--------------------');
} catch (error) {
  console.error(`Error reading environment file: ${error.message}`);
}

console.log('\nYou can now run the application with: npm run dev'); 