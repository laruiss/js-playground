module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'standard',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
  },
}
