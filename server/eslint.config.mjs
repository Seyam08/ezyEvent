import pluginJs from '@eslint/js';
import globals from 'globals';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export default [
  {
    languageOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
      globals: globals.node,
    },
    env: {
      commonjs: true,
      node: true,
    },
    plugins: {
      prettier: require('eslint-plugin-prettier'),
    },
    extends: ['airbnb-base', 'prettier', pluginJs.configs.recommended],
    rules: {
      'no-console': 'off',
      indent: 'off',
      'linebreak-style': 'off',
      'prettier/prettier': 'error',
    },
  },
];
