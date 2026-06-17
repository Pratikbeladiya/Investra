module.exports = {
  languageOptions: {
    ecmaVersion: 2024,
    sourceType: 'module',
    parserOptions: { ecmaFeatures: { jsx: true } },
    globals: {
      window: 'readonly',
      document: 'readonly',
      localStorage: 'readonly',
      URLSearchParams: 'readonly',
      Event: 'readonly',
      alert: 'readonly',
      console: 'readonly',
      process: 'readonly'
    }
  },
  ignores: ['node_modules/**', 'frontend/build/**', 'dashboards/build/**', 'frontend/public/**', 'dashboards/public/**'],
  rules: {
    'no-unused-vars': 'warn',
    'no-undef': 'error'
  }
};
