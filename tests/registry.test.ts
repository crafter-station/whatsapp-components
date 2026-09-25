import { describe, expect, test } from "bun:test";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import registry from "../registry.json";

const root = new URL("../", import.meta.url);

const items = registry.items;
const names = new Set(items.map((item) => item.name));

describe("registry.json", () => {
  test("every declared file exists on disk", () => {
    for (const item of items) {
      for (const file of item.files) {
        expect({ item: item.name, path: file.path }).toMatchObject({
          item: item.name,
          path: file.path,
        });
        expect(existsSync(new URL(file.path, root))).toBe(true);
      }
    }
  });

  test("item names are unique", () => {
    expect(names.size).toBe(items.length);
  });

  /** Catches a component added to registry/whatsapp but never registered. */
  test("every source file is shipped by at least one item", () => {
    const shipped = new Set(
      items.flatMap((item) => item.files.map((file) => file.path)),
    );
    const sources = readdirSync(new URL("registry/whatsapp/", root)).map(
      (file) => `registry/whatsapp/${file}`,
    );
    for (const source of sources) {
      expect(shipped.has(source)).toBe(true);
    }
  });

  test("registryDependencies point at items in this registry", () => {
    for (const item of items) {
      const dependencies =
        "registryDependencies" in item ? item.registryDependencies : [];
      for (const dependency of dependencies ?? []) {
        expect(names.has(dependency)).toBe(true);
      }
    }
  });

  /**
   * A component whose source imports ./cn must ship cn.ts, directly or through
   * a registryDependency — otherwise `shadcn add` writes a file that cannot
   * resolve its own imports.
   */
  test("relative imports resolve to a file the item or its deps ship", () => {
    const shippedBy = new Map<string, Set<string>>();
    for (const item of items) {
      shippedBy.set(
        item.name,
        new Set(item.files.map((file) => file.path.split("/").pop() ?? "")),
      );
    }

    const resolve = (name: string, seen = new Set<string>()): Set<string> => {
      if (seen.has(name)) return new Set();
      seen.add(name);
      const item = items.find((candidate) => candidate.name === name);
      const own = new Set(shippedBy.get(name) ?? []);
      const dependencies =
        item && "registryDependencies" in item ? item.registryDependencies : [];
      for (const dependency of dependencies ?? []) {
        for (const file of resolve(dependency, seen)) own.add(file);
      }
      return own;
    };

    for (const item of items) {
      const available = resolve(item.name);
      for (const file of item.files) {
        if (!/\.tsx?$/.test(file.path)) continue;
        const source = readFileSync(new URL(file.path, root), "utf8");
        for (const match of source.matchAll(/from "\.\/([\w-]+)"/g)) {
          const hit = [...available].some(
            (candidate) => candidate.replace(/\.tsx?$/, "") === match[1],
          );
          expect({ item: item.name, imports: match[1], resolved: hit }).toEqual(
            {
              item: item.name,
              imports: match[1],
              resolved: true,
            },
          );
        }
      }
    }
  });
});
