module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'import', 'unused-imports', 'simple-import-sort'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier
  ],
  root: true,
  env: {
    node: true,
    es2020: true,
  },
  rules: {
    // Prettier integration
    'prettier/prettier': 'error',

    // NestJS style
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

    // Unused imports
    'unused-imports/no-unused-imports': 'error',

    // Import sorting
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    // Consistent imports
    'import/order': 'off',

    // Optional tweaks
    '@typescript-eslint/no-unused-vars': ['warn', {
      varsIgnorePattern: '^_',
      argsIgnorePattern: '^_',
      caughtErrorsIgnorePattern: '^_'
    }],
  },
  ignorePatterns: ['dist', 'node_modules'],
};
