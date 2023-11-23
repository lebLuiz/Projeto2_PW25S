module.exports = {
    env: {
      commonjs: true,
      es2021: true,
      node: true,
    },
    extends: 'airbnb-base',
    overrides: [
    ],
    parserOptions: {
      ecmaVersion: 'latest',
    },
    rules: {
      'linebreak-style': 0,
      'class-methods-use-this': 'off',
      'import/no-extraneous-dependencies': 'off',
      'consistent-return': 'off',
      camelcase: 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
      'no-underscore-dangle': 'off',
      'no-console': 'off',
      ident: 'off',
      'prefer-promise-reject-errors': 'off',
    },
  };