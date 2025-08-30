import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tailwindcss from 'eslint-plugin-tailwindcss';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react,
      prettier,
      'simple-import-sort': simpleImportSort,
      import: importPlugin,
      tailwindcss,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        global: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...tailwindcss.configs.recommended.rules,
      'sort-vars': 'error',
      'no-irregular-whitespace': 'off',
      'react/jsx-sort-props': ['error'],
      'react/prop-types': 0,
      'prettier/prettier': 'error',
      'react/jsx-curly-brace-presence': [
        'error',
        { props: 'never', children: 'ignore', propElementValues: 'always' },
      ],
      'tailwindcss/no-custom-classname': 0,
      'no-unused-vars': 0,
      'import/first': 'error',
      'import/no-duplicates': 'error',
      'import/newline-after-import': 'error',
      'simple-import-sort/imports': 'error',
    },
  },
  {
    ignores: ['**/aws-exports.js', 'build/**', 'node_modules/**'],
  },
  prettierConfig,
];
