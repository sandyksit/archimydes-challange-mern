module.exports = {
  env: {
    node: true,
    browser: true,
    commonjs: true,
    es2021: true,
    mocha: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-undef': 'error',
    'no-unused-vars': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'arrow-parens': 'error',
    'no-use-before-define': 'error',
    'dot-notation': 'warn',
    'consistent-return': 'warn',
    'no-else-return': 'warn',
    'prefer-template': 'warn',
    'prefer-destructuring': 'warn',
  },
};
