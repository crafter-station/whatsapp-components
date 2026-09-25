import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { WA_TOKEN_NAMES, whatsappThemeList } from "../registry/whatsapp/themes";

/**
 * themes.ts and whatsapp.css carry the same values by necessity: the CSS makes
 * a copied component work with no provider, the TS makes the dashboard switcher
 * possible. These tests are what stop the two from drifting apart.
 */

const css = readFileSync(
  new URL("../registry/whatsapp/whatsapp.css", import.meta.url),
  "utf8",
);

const normalise = (value: string) => value.replace(/\s+/g, " ").trim();

function parseBlocks(source: string): Map<string, Map<string, string>> {
  const blocks = new Map<string, Map<string, string>>();
  const withoutComments = source.replace(/\/\*[\s\S]*?\*\//g, "");

  for (const match of withoutComments.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const declarations = new Map<string, string>();
    for (const line of match[2].split(";")) {
      const separator = line.indexOf(":");
      if (separator === -1) continue;
      const name = line.slice(0, separator).trim();
      if (!name.startsWith("--")) continue;
      declarations.set(name, normalise(line.slice(separator + 1)));
    }
    for (const selector of match[1].split(",")) {
      blocks.set(normalise(selector), declarations);
    }
  }

  return blocks;
}

const blocks = parseBlocks(css);

const selectorFor = (id: string) =>
  id === "light" ? ":root" : `[data-wa-theme="${id}"]`;

describe("whatsapp.css mirrors themes.ts", () => {
  for (const theme of whatsappThemeList) {
    describe(theme.id, () => {
      const declarations = blocks.get(selectorFor(theme.id));

      test("has a matching CSS block", () => {
        expect(declarations).toBeDefined();
      });

      test("declares every token with the same value", () => {
        for (const name of WA_TOKEN_NAMES) {
          expect(declarations?.get(`--wa-${name}`)).toBe(
            normalise(theme.tokens[name]),
          );
        }
      });

      test("declares no tokens beyond the known set", () => {
        const known = new Set(WA_TOKEN_NAMES.map((name) => `--wa-${name}`));
        for (const name of declarations?.keys() ?? []) {
          expect(known.has(name)).toBe(true);
        }
      });
    });
  }

  test("every theme id has its own data-wa-theme selector", () => {
    for (const theme of whatsappThemeList) {
      expect(blocks.has(`[data-wa-theme="${theme.id}"]`)).toBe(true);
    }
  });

  test("@theme inline exposes a Tailwind color for every colour token", () => {
    const themeBlock = blocks.get("@theme inline");
    expect(themeBlock).toBeDefined();
    for (const name of WA_TOKEN_NAMES) {
      const isScale =
        name.startsWith("radius-") ||
        name === "shadow-bubble" ||
        name === "font";
      if (isScale) continue;
      expect(themeBlock?.get(`--color-wa-${name}`)).toBe(`var(--wa-${name})`);
    }
  });
});
