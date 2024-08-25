module.exports = {
  extends: ['airbnb-typescript-prettier'],
  rules: {
    'no-console': 'off',
    'class-methods-use-this': 'error',
    'import/no-extraneous-dependencies': [
      'warn',
      {
        devDependencies: true,
      },
    ],
  },
  parserOptions: {
    sourceType: 'module',
    tsconfigRootDir: '',
    project: ['./tsconfig.eslint.json'],
  },
};
