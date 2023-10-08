module.exports = {
    root: true,
    env: {
      node: true,
    },
    extends: [
      'plugin:vue/recommended',
      '@vue/typescript',
    ],
    parserOptions: {
      parser: '@typescript-eslint/parser',
    },
    rules: {},
  };
  