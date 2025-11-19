import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import { fixupConfigRules } from '@eslint/compat';
import globals from 'globals';
import prettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';

export default tseslint.config(
  js.configs.recommended, // base JS rules
  ...tseslint.configs.recommendedTypeChecked, // TypeScript rules (requires parserOptions.project)
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json']
      },
      globals: globals.node
    },
    plugins: {
      prettier: pluginPrettier
    },
    rules: {
      'prettier/prettier': 'error'
    }
  },
  prettier // keeps Prettier at the end of extends
);
