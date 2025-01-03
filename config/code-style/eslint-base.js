/** @type {import("eslint").Linter.Config} */
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest', 'prettier'],
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    project: true,
  },
  settings: {
    'import/core-modules': ['aws-sdk'],
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    'no-console': 'error',
    quotes: [2, 'single', 'avoid-escape'],
    'no-loss-of-precision': 2,
    'no-duplicate-imports': 2,
    'import/no-named-as-default': 2,
    'import/no-named-as-default-member': 'off',
    'import/no-extraneous-dependencies': [2, {}],
    'import/no-unresolved': [
      2,
      {
        ignore: ['aws-lambda'],
      },
    ],
    'import/order': 2,
    'prefer-const': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-base-to-string': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/triple-slash-reference': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
      },
    ],
  },
  extends: [
    // Rules which recommended for all projects by the ESLint Team
    'eslint:recommended',
    // Make all eslint rules compatible with TS
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    // for type-checking to work properly with highly-valuable rules
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
  ],
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        // note you must disable the base rule as it can report incorrect errors
        '@typescript-eslint/restrict-template-expressions': [
          'off',
          {
            allowNullish: true,
          },
        ],
      },
    },
    {
      files: ['*.js'],
      rules: {
        'no-unused-vars': 'error',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
      },
    },
  ],
}
