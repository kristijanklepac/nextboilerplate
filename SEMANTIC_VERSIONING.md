# Semantic Versioning (SemVer) Guide

## Version Format

`MAJOR.MINOR.PATCH[-PRERELEASE][+BUILD]`

Example: `1.2.3-beta.1+20240321`

## Version Components

1. MAJOR version (1.x.x)

   - Incremented for incompatible API changes
   - Breaking changes that require updates to dependent code

2. MINOR version (x.2.x)

   - Added functionality in a backward-compatible manner
   - New features that don't break existing functionality

3. PATCH version (x.x.3)

   - Backward-compatible bug fixes
   - No new features, only fixes

4. PRERELEASE (-beta.1)

   - Optional identifier for pre-release versions
   - Examples: -alpha.1, -beta.2, -rc.1

5. BUILD (+20240321)
   - Optional build metadata
   - Examples: +20240321, +git.hash

## Release Process

1. Prepare Release:

   ```bash
   # Create release branch
   git checkout -b release/v1.2.0 development

   # Update version
   npm version 1.2.0-rc.1

   # Push changes
   git push origin release/v1.2.0 --tags
   ```

2. Testing Phase:

   ```bash
   # Bug fixes in release branch
   git commit -m "fix: address release feedback"
   npm version 1.2.0-rc.2
   ```

3. Final Release:

   ```bash
   # Update to final version
   npm version 1.2.0

   # Merge to main
   git checkout main
   git merge release/v1.2.0
   git push origin main --tags

   # Merge back to development
   git checkout development
   git merge release/v1.2.0
   git push origin development
   ```

## Version Bumping Rules

1. MAJOR version bump when:

   - Breaking API changes
   - Removing deprecated features
   - Major UI overhaul
   - Incompatible database schema changes
     Example: 1.2.3 → 2.0.0

2. MINOR version bump when:

   - New feature addition
   - Deprecating functionality
   - Substantial new functionality
   - Backward-compatible changes
     Example: 1.2.3 → 1.3.0

3. PATCH version bump when:
   - Bug fixes
   - Performance improvements
   - Small tweaks
   - Documentation updates
     Example: 1.2.3 → 1.2.4

## Best Practices

1. Version Control:

   - Always tag releases in Git
   - Use release branches for version preparation
   - Keep version history in CHANGELOG.md

2. Communication:

   - Document breaking changes clearly
   - Provide migration guides for major versions
   - Maintain a changelog

3. Automation:

   - Use automated version bumping
   - Implement CI/CD for releases
   - Automate changelog generation

4. Backward Compatibility:
   - Maintain deprecated features through one major version
   - Document deprecations clearly
   - Provide migration paths
