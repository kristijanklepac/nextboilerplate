# Release Process Guide

This document outlines the detailed process for creating and managing releases in this project.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Branch Structure](#branch-structure)
- [Release Types](#release-types)
- [Step-by-Step Release Process](#step-by-step-release-process)
- [Automated Release Process](#automated-release-process)
- [Post-Release Steps](#post-release-steps)
- [Hotfix Process](#hotfix-process)
- [Release Flow Visualization](#release-flow-visualization)
- [Examples](#examples)
- [Troubleshooting Guide](#troubleshooting-guide)

## Prerequisites

Before starting a release, ensure:

1. All features for the release are merged into `development`
2. All tests are passing
3. Code review is complete
4. Documentation is up to date

## Branch Structure

```
main
├── development (main development branch)
└── test (testing/QA branch)
```

Feature branches are created from and merged back into `development`.

## Release Types

### Major Release (X.0.0)

- Breaking changes
- Major new features
- Architectural changes

### Minor Release (0.X.0)

- New features
- Non-breaking changes
- Substantial improvements

### Patch Release (0.0.X)

- Bug fixes
- Small improvements
- Security updates

## Step-by-Step Release Process

### 1. Prepare for Release

```bash
# Fetch latest changes
git fetch origin

# Switch to development and update
git checkout development
git pull origin development

# Create release branch
git checkout -b release/vX.Y.Z
```

### 2. Update Version and Documentation

1. Update version in package.json:

```json
{
  "name": "your-project",
  "version": "X.Y.Z"
  // ...
}
```

2. Update CHANGELOG.md:

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added

- List new features
- List new capabilities

### Changed

- List changes in existing functionality

### Fixed

- List bug fixes

### Deprecated

- List deprecated features
```

3. Update any version-dependent documentation

### 3. Test the Release

```bash
# Run all tests
npm run test:run

# Build the project
npm run build

# Test in different environments
npm run dev:test
npm run dev:prod
```

### 4. Commit and Push Release

```bash
# Commit version changes
git add package.json CHANGELOG.md
git commit -m "chore: prepare release X.Y.Z"

# Push release branch
git push -u origin release/vX.Y.Z
```

### 5. Merge to Main Branch

```bash
# Switch to main
git checkout main
git pull origin main

# Merge release (no fast-forward)
git merge release/vX.Y.Z --no-ff -m "chore: release version X.Y.Z"

# Push to main
git push origin main
```

### 6. Sync All Branches

```bash
# Update development
git checkout development
git merge release/vX.Y.Z --no-ff -m "chore: merge release X.Y.Z back to development"
git push origin development

# Update test
git checkout test
git merge release/vX.Y.Z --no-ff -m "chore: merge release X.Y.Z to test"
git push origin test
```

## Post-Release Steps

1. Create GitHub Release

   - Tag: vX.Y.Z
   - Title: Version X.Y.Z
   - Description: Copy from CHANGELOG.md

2. Deploy to Production

   ```bash
   # Deploy from main branch
   git checkout main
   npm run build:prod
   # Follow deployment process
   ```

3. Announce Release
   - Update documentation
   - Notify team members
   - Update release notes in project management tools

## Hotfix Process

For urgent fixes to production:

```bash
# Create hotfix branch from main
git checkout main
git checkout -b hotfix/issue-description

# Make fixes and commit
git add .
git commit -m "fix: description of the fix"

# Merge to main
git checkout main
git merge hotfix/issue-description --no-ff
git push origin main

# Sync with other branches
git checkout development
git merge hotfix/issue-description --no-ff
git push origin development

git checkout test
git merge hotfix/issue-description --no-ff
git push origin test
```

## Release Flow Visualization

### Normal Release Flow

```
     development
         |
         v
  release/vX.Y.Z
    |    |    |
    v    v    v
  main  dev  test
    |
    v
  deploy
```

### Hotfix Flow

```
     main
      |
      v
hotfix/issue
   |  |  |
   v  v  v
main dev test
   |
   v
 deploy
```

### Branch Protection Rules

```
main
├── Require pull request reviews
├── Require status checks
└── No direct pushes

development
├── Require pull request reviews
└── Require status checks

test
└── Require status checks
```

## Automated Release Process

### GitHub Actions Workflow

1. Create `.github/workflows/release.yml`:

```yaml
name: Release Process
on:
  push:
    branches:
      - 'release/*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20.x'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test:run

      - name: Build
        run: npm run build

      - name: Create GitHub Release
        if: success()
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          body_path: CHANGELOG.md
          draft: true
```

### Automated Version Management

1. Install automatic versioning tools:

```bash
npm install --save-dev standard-version
```

2. Add scripts to package.json:

```json
{
  "scripts": {
    "release:auto": "standard-version",
    "release:auto:major": "standard-version --release-as major",
    "release:auto:minor": "standard-version --release-as minor",
    "release:auto:patch": "standard-version --release-as patch"
  }
}
```

3. Configure in `.versionrc`:

```json
{
  "types": [
    { "type": "feat", "section": "Features" },
    { "type": "fix", "section": "Bug Fixes" },
    { "type": "docs", "section": "Documentation" },
    { "type": "style", "section": "Styling" },
    { "type": "refactor", "section": "Refactors" },
    { "type": "perf", "section": "Performance" },
    { "type": "test", "section": "Tests" }
  ]
}
```

### Automated Testing Pipeline

1. Pre-release testing:

```yaml
name: Pre-release Tests
on:
  pull_request:
    branches:
      - 'release/*'

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Tests
        run: |
          npm ci
          npm run test:run
          npm run test:e2e
```

## Extended Troubleshooting Guide

### Git Issues

#### Detached HEAD State

```bash
# Problem: HEAD is detached
git checkout development
git pull origin development
git checkout -b temp-branch
git branch -f development temp-branch
git checkout development
git branch -d temp-branch
```

#### Accidental Commits to Wrong Branch

```bash
# Save your changes
git stash

# Switch to correct branch
git checkout correct-branch

# Apply changes
git stash pop

# Clean up wrong branch
git checkout wrong-branch
git reset --hard origin/wrong-branch
```

### Build Issues

#### Node Module Resolution

```bash
# Clear node_modules and lock file
rm -rf node_modules package-lock.json

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
npm install
```

#### TypeScript Compilation Errors

```bash
# Clear TypeScript cache
rm -rf .next
rm -rf tsconfig.tsbuildinfo

# Rebuild
npm run build
```

### Deployment Issues

#### Environment Variables

1. Check environment variable presence:

```bash
# List all env variables
printenv | grep NEXT_PUBLIC

# Verify .env files
cat .env.production
```

2. Verify environment-specific builds:

```bash
# Test production build locally
NODE_ENV=production npm run build
```

#### Stale Cache

1. Clear build cache:

```bash
# Clear Next.js cache
rm -rf .next

# Clear CDN cache (if applicable)
curl -X PURGE https://your-cdn-url/*
```

### Database Migration Issues

1. Check migration status:

```bash
# List pending migrations
npm run migration:status

# Roll back failed migration
npm run migration:revert

# Apply specific migration
npm run migration:run --name=YYYYMMDDHHMMSS-migration-name
```

### Performance Issues

1. Analyze bundle size:

```bash
# Run bundle analyzer
npm run analyze

# Check specific chunk sizes
npm run analyze:chunk
```

2. Check for memory leaks:

```bash
# Run memory profiler
NODE_OPTIONS="--inspect" npm run dev
```

### Security Issues

1. Audit dependencies:

```bash
# Run security audit
npm audit

# Fix security issues
npm audit fix

# Generate security report
npm audit --json > security-report.json
```

2. Check for exposed secrets:

```bash
# Scan for secrets
git secrets --scan

# Check commit history
git secrets --scan-history
```

## Examples

### Example: Major Release (1.0.0)

```bash
# Start release
git checkout development
git pull origin development
git checkout -b release/v1.0.0

# Update version
# Edit package.json: "version": "1.0.0"
# Update CHANGELOG.md with 1.0.0 changes

# Commit and push
git add package.json CHANGELOG.md
git commit -m "chore: prepare release 1.0.0"
git push -u origin release/v1.0.0

# Merge to main
git checkout main
git pull origin main
git merge release/v1.0.0 --no-ff -m "chore: release version 1.0.0"
git push origin main

# Sync branches
git checkout development
git merge release/v1.0.0 --no-ff -m "chore: merge release 1.0.0 back to development"
git push origin development

git checkout test
git merge release/v1.0.0 --no-ff -m "chore: merge release 1.0.0 to test"
git push origin test
```

### Example: Minor Release (1.1.0)

```bash
git checkout -b release/v1.1.0
# Update version to 1.1.0
# Update CHANGELOG.md
# Follow same process as major release
```

### Example: Patch Release (1.0.1)

```bash
git checkout -b release/v1.0.1
# Update version to 1.0.1
# Update CHANGELOG.md with bug fixes
# Follow same process as major release
```

## Common Issues and Solutions

### Merge Conflicts

If you encounter merge conflicts:

1. Resolve conflicts locally

```bash
git status
# Edit conflicting files
git add .
git commit -m "chore: resolve merge conflicts for version X.Y.Z"
```

2. Continue with merge

```bash
git merge --continue
```

### Failed Tests

If tests fail during release:

1. Fix issues in release branch
2. Commit fixes
3. Re-run tests
4. Continue with release process

### Version Mismatch

If versions are inconsistent:

1. Check all version references:
   - package.json
   - CHANGELOG.md
   - Documentation
2. Update all references to match
3. Commit fixes
4. Continue with release process
