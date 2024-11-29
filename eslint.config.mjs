import typescriptEslint from "@typescript-eslint/eslint-plugin";
import _import from "eslint-plugin-import";
import filenames from "eslint-plugin-filenames";
import { fixupPluginRules } from "@eslint/compat";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default [
	{
		ignores: ["**/dist", "**/node_modules", "**/*.d.ts", "**/dist"],
	},
	...compat.extends(
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended"
	),
	{
		plugins: {
			"@typescript-eslint": typescriptEslint,
			import: fixupPluginRules(_import),
			filenames,
		},

		languageOptions: {
			parser: tsParser,
		},
	},
];
