import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {ignores: [ // Ignore these directories because I am not allowed to edit them to fix mistakes
    "mock-server",
    "**/mock-server/**",
    "mockServer",
    "**/mockServer/**",
    "dist",
    "dist/**",
    "**/coverage/**",// Ignore coverage directory
    "coverage",
  ]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];