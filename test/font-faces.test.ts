import path from "path";
import { fileURLToPath } from "url";
import { beforeAll, describe, expect, it } from "vitest";
import pluginPurgeCss from "../src";
import { viteBuildCss } from "./util/vite-build";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const root = path.resolve(__dirname, "./fixtures/font-faces");

describe("purgecss font-face", () => {
	let output: string;

	beforeAll(async () => {
		const results = await viteBuildCss(root, [
			pluginPurgeCss({ fontFace: true }),
		]);
		output = results["index.css"];
	});

	it("keep @font-face 'Cerebri Bold'", () => {
		expect(output).toMatch(
			/src:\s*url\("\.\.\/fonts\/CerebriSans-Bold\.eot\?"\)/
		);
	});

	it("keep @font-face 'Cerebri Sans'", () => {
		expect(output).toMatch(
			/src:\s*url\("\.\.\/fonts\/CerebriSans-Regular\.eot\?"\)/
		);
	});

	it("remove @font-face 'OtherFont'", () => {
		expect(output).not.toContain("xxx");
	});
});
