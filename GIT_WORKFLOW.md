# Git Workflow Guide

## Branch Structure

```
main (production)
└── test (pre-production testing)
    └── development (main development branch)
        └── feature/* (feature branches)
        └── fix/* (bug fixes)
        └── hotfix/* (urgent fixes)
        └── release/* (release preparation)
        └── chore/* (maintenance)
        └── docs/* (documentation)
        └── test/* (testing)
        └── refactor/* (refactoring)
```

## Branch Naming Convention

All branches must follow the pattern: `<type>/<description>`

Allowed types:

- `feature/` - New features (e.g., `feature/add-login`)
- `fix/` - Bug fixes (e.g., `fix/login-validation`)
- `hotfix/` - Urgent production fixes (e.g., `hotfix/security-patch`)
- `release/` - Release preparation (e.g., `release/v1.0.0`)
- `chore/` - Maintenance tasks (e.g., `chore/update-deps`)
- `docs/` - Documentation (e.g., `docs/api-docs`)
- `test/` - Test additions/changes (e.g., `test/user-auth`)
- `refactor/` - Code refactoring (e.g., `refactor/database`)

## Common Git Commands

### Branch Management

1. Create and switch to a new branch:

```bash
# Modern way (recommended)
git switch -c feature/my-feature

# Traditional way
git checkout -b feature/my-feature
```

2. Switch between existing branches:

```bash
# Modern way (recommended)
git switch development

# Traditional way
git checkout development
```

3. List all branches:

```bash
# List local branches
git branch

# List all branches including remote
git branch -a
```

### Daily Workflow

1. Start your work:

```bash
# Update your local main/development
git switch development
git pull origin development

# Create your feature branch
git switch -c feature/your-feature
```

2. Make changes and commit:

```bash
# Stage specific files
git add file1 file2

# Stage all changes
git add .

# Commit changes
git commit -m "feat: add new feature"
```

3. Push your changes:

```bash
# First time pushing a new branch
git push -u origin feature/your-feature

# Subsequent pushes
git push
```

### Syncing Branches

1. Update your branch with latest development:

```bash
# While on your feature branch
git fetch origin development
git merge origin/development

# Or in one command
git pull origin development
```

2. Merge between protected branches:

```bash
# Merge development into test
git switch test
git pull origin test
git merge origin/development
git push origin test

# Merge test into main
git switch main
git pull origin main
git merge origin/test
git push origin main
```

### Handling Conflicts

1. When conflicts occur:

```bash
# After a merge conflict
git status  # Check which files have conflicts

# After resolving conflicts in the files
git add .  # Stage resolved files
git commit -m "chore: resolve merge conflicts"
git push
```

2. If you need to abort a merge:

```bash
git merge --abort
```

### Useful Commands

1. Check status:

```bash
git status
```

2. View commit history:

```bash
# Full history
git log

# Compact history
git log --oneline

# Graph view
git log --graph --oneline --all
```

3. Discard changes:

```bash
# Discard unstaged changes
git restore file-name

# Discard all unstaged changes
git restore .

# Discard staged changes
git restore --staged file-name

# Reset to remote state (CAREFUL!)
git reset --hard origin/branch-name
```

## Protected Branches

The following branches are protected and require pull requests:

- `main` (production)
- `test` (pre-production testing)
- `development` (main development branch)

### Workflow Rules

1. All new work must start from `development`
2. Direct commits to protected branches are forbidden
3. Changes must flow: `feature/*` → `development` → `test` → `main`
4. All merges to protected branches require pull requests and approvals

## Automatic Branch Protection

Our pre-commit hook ensures:

1. Branch naming convention compliance
2. Protection of main branches
3. New branches are created from latest development
4. All tests pass before commit

## Best Practices

1. Keep branches short-lived
2. One feature/fix per branch
3. Pull from development frequently
4. Write clear commit messages
5. Delete branches after merging
6. Always create pull requests for review
7. Keep commits atomic and focused
8. Test before pushing

## Getting Help

View branch protection rules:

```bash
cat .husky/pre-commit
```

For more Git commands and help:

```bash
git --help
git command --help  # e.g., git switch --help
```
