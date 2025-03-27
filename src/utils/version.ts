interface Version {
  current: string;
  major: number;
  minor: number;
  patch: number;
  prerelease?: string;
  build?: string;
}

function parseVersion(version: string): Version {
  // Match version parts using regex
  const match = version.match(/^(\d+)\.(\d+)\.(\d+)(?:-([^+]+))?(?:\+(.+))?$/);
  
  if (!match) {
    return {
      current: '0.0.0',
      major: 0,
      minor: 0,
      patch: 0
    };
  }

  const [, major, minor, patch, prerelease, build] = match;

  return {
    current: version,
    major: parseInt(major, 10),
    minor: parseInt(minor, 10),
    patch: parseInt(patch, 10),
    prerelease,
    build
  };
}

// Get version from package.json
const packageVersion = process.env.npm_package_version || '0.0.0';

export const VERSION: Version = parseVersion(packageVersion);

export function isPrerelease(): boolean {
  return !!VERSION.prerelease;
}

export function isStable(): boolean {
  return !isPrerelease();
}

export function getVersionString(): string {
  let version = `v${VERSION.major}.${VERSION.minor}.${VERSION.patch}`;
  if (VERSION.prerelease) {
    version += `-${VERSION.prerelease}`;
  }
  if (VERSION.build) {
    version += `+${VERSION.build}`;
  }
  return version;
} 