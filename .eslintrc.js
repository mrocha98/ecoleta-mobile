module.exports = {
  env: {
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'universe/native',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier', 'react-hooks'],
  rules: {
    'react-hooks/exhaustive-deps': 'warn',
    'import/prefer-default-export': 'off',
    'no-console': 'warn',
    'react/prop-types': 'off',
    'import/extensions': 'off',
    'react/jsx-filename-extension': 'off',
    'global-require': 'off',
    camelcase: 'off',
    'func-names': 'off',
  },
};
