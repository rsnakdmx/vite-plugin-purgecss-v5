import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import tsParser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";
import typescriptEslint from "@typescript-eslint/eslint-plugin";

export default [
	js.configs.recommended,
	...tseslint.configs.recommended,
	importPlugin.flatConfigs.recommended,
	{ ignores: ["**/dist", "**/node_modules", "**/*.d.ts"] },
	{ files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
	{
		languageOptions: {
			globals: { ...globals.browser, ...globals.node },
			ecmaVersion: 12,
			parser: tsParser,
			sourceType: "module",
		},
		plugins: {
			"@typescript-eslint": typescriptEslint,
		},
		rules: {
			"no-unused-vars": "off",
			"import/no-unresolved": "off",
			"import/no-dynamic-require": "warn",
		},
	},
	eslintConfigPrettier,
];
