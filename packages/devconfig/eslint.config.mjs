import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import svelte from "eslint-plugin-svelte";
import * as svelteParser from "svelte-eslint-parser";
import * as typescriptParser from "@typescript-eslint/parser";

export default tseslint.config(
  { ignores: ["dist/*"] },
  js.configs.recommended,
  svelte.configs["flat/recommended"],
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: typescriptParser,
        extraFileExtensions: [".svelte"],
      },
      globals: {
        ...globals.browser,
      },
    },
  }
);
