import trezoaConfig from '@trezoa/eslint-config-trezoa';

export default [
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/*.tsbuildinfo', '**/__tests__/**'],
  },
  ...trezoaConfig,
  {
    languageOptions: {
      parserOptions: {
        trezoa: ['./packages/*/tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },

    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
];
