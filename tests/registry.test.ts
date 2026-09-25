import { describe, expect, test } from "bun:test";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import registry from "../registry.json";

const root = new URL("../", import.meta.url);

const items = registry.items;
const names = new Set(items.map((item) => item.name));

/** Items are self-contained today, so the JSON import types this key away. */
function registryDependenciesOf(item: (typeof items)[number]): string[] {
  const value = (item as { registryDependencies?: unknown })
    .registryDependencies;
  return Array.isArray(value) ? (value as string[]) : [];
}

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
      for (const dependency of registryDependenciesOf(item)) {
        expect(names.has(dependency)).toBe(true);
      }
    }
  });

  /** Items are self-contained, so anything that renders must carry the tokens. */
  test("every item shipping a component also ships whatsapp.css", () => {
    for (const item of items) {
      const paths = item.files.map((file) => file.path);
      if (!paths.some((path) => path.endsWith(".tsx"))) continue;
      expect({
        item: item.name,
        shipsCss: paths.includes("registry/whatsapp/whatsapp.css"),
      }).toEqual({ item: item.name, shipsCss: true });
    }
  });

  test("every item ships the licence", () => {
    for (const item of items) {
      expect({
        item: item.name,
        licensed: item.files.some((file) => file.path === "LICENSE"),
      }).toEqual({ item: item.name, licensed: true });
    }
  });

  /** A client component keeps its directive wherever it is copied. */
  test("chat-input is marked as a client component", () => {
    const source = readFileSync(
      new URL("registry/whatsapp/chat-input.tsx", root),
      "utf8",
    );
    expect(source.startsWith('"use client";')).toBe(true);
  });

  /** Everything else must stay server-renderable. */
  test("no other component opts into the client", () => {
    const sources = readdirSync(new URL("registry/whatsapp/", root)).filter(
      (file) => file.endsWith(".tsx") && file !== "chat-input.tsx",
    );
    for (const file of sources) {
      const source = readFileSync(
        new URL(`registry/whatsapp/${file}`, root),
        "utf8",
      );
      expect({ file, client: source.includes('"use client"') }).toEqual({
        file,
        client: false,
      });
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
      for (const dependency of item ? registryDependenciesOf(item) : []) {
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

describe("README", () => {
  const readme = readFileSync(new URL("README.md", root), "utf8");

  /** The catalogue in the README is hand-written and goes stale in silence. */
  test("names every registry item", () => {
    for (const item of items) {
      expect({
        item: item.name,
        inReadme: readme.includes(`\`${item.name}\``),
      }).toEqual({ item: item.name, inReadme: true });
    }
  });

  test("quotes the real file count for the kit", () => {
    const kit = items.find((item) => item.name === "whatsapp-kit");
    expect(readme).toContain(`writes ${kit?.files.length} files`);
  });

  test("lists the dependencies the kit actually installs", () => {
    const kit = items.find((item) => item.name === "whatsapp-kit");
    for (const dependency of kit?.dependencies ?? []) {
      expect(readme).toContain(`\`${dependency}\``);
    }
  });
});
