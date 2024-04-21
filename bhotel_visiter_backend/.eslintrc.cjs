module.exports = {
  root: true,
  env: { es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'global.d.ts'],
  parser: '@typescript-eslint/parser',
}
