export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation
        'style',    // Styling
        'refactor', // Code refactoring
        'perf',     // Performance improvements
        'test',     // Adding tests
        'chore',    // Maintenance
        'ci',       // CI/CD
        'build',    // Build system
        'revert',   // Revert changes
      ],
    ],
    'scope-case': [0],
    'subject-case': [0],
  },
}; 