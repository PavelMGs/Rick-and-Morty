module.exports = {
  root: 'true',
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    semi: ['error', 'always'],
    'prettier/prettier': 'error', '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        // We don't want unused variables (noise) - XXX Note that this will be a duplicate of "no-unused-vars" rule
        vars: 'all',
        // Sometimes it's useful to have unused arguments for later use, such as describing what args are available (DX)
        args: 'none',
        //  Sometimes it's useful to have unused props for later use, such as describing what props are available (DX)
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
      },
    ],
  },
};
