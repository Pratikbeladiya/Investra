module.exports = {
  env: { browser: true, es2024: true, node: true },
  parserOptions: { ecmaVersion: 2024, sourceType: 'module', ecmaFeatures: { jsx: true } },
  rules: { 'no-unused-vars': 'warn', 'no-undef': 'error' },
  ignorePatterns: ['node_modules/', 'frontend/build/', 'dashboards/build/', 'frontend/public/', 'dashboards/public/']
};
