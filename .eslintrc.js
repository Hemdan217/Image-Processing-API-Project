// .eslintrc.js
module.exports = {
  env: {
    jasmine: true,
  },
  rules: {
    'import/no-unresolved': [2, { caseSensitive: false }],
  },

  parser: '@typescript-eslint/parser',
  extends: ['eslint-config-airbnb-base', 'eslint-config-prettier'],
};
