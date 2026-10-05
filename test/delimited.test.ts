import path from "path";
import { fileURLToPath } from "url";
import { beforeAll, describe, expect, it } from "vitest";
import pluginPurgeCss from "../src";
import { viteBuildCss } from "./util/vite-build";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const root = path.resolve(__dirname, "./fixtures/delimited");

describe("purgecss delimited", () => {
	let output: string;

	beforeAll(async () => {
		const results = await viteBuildCss(root, [pluginPurgeCss()]);
		output = results["index.css"];
	});

	it("removes the extra comma", () => {
		const commaCount = output
			.split("")
			.reduce((total, chr) => (chr === "," ? total + 1 : total), 0);
		expect(commaCount).toBe(0);
	});

	it("finds h1", () => {
		expect(output.includes("h1")).toBe(true);
	});

	it("removes p", () => {
		expect(output.includes("p")).toBe(false);
	});

	it("removes .unused-class-name", () => {
		expect(output.includes(".unused-class-name")).toBe(false);
	});
});
