/**
 * Provides application version information
 */

import packageInfo from '../../package.json';

interface AppVersion {
  version: string;
  versionDisplay: string;
  major: number;
  minor: number;
  patch: number;
  isDevelopment: boolean;
}

// Parse the semantic version parts
const parseVersion = (version: string): AppVersion => {
  // Extract major.minor.patch
  const parts = version.split('.');
  const major = Number.parseInt(parts[0], 10);
  const minor = Number.parseInt(parts[1], 10);
  const patch = Number.parseInt(parts[2], 10);
  
  return {
    version,
    versionDisplay: `v${version}`,
    major,
    minor,
    patch,
    isDevelopment: major === 0 // Consider any 0.x.y version as development
  };
};

// Export the version information
export const appVersion = parseVersion(packageInfo.version);

// Export a convenient formatted string for display
export const versionDisplay = appVersion.versionDisplay;

// Default export for simplified imports
export default appVersion; 