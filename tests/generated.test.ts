import { describe, expect, test } from "bun:test";
import demos from "../apps/dashboard/app/demos.generated.json";
import props from "../apps/dashboard/app/props.generated.json";
import registry from "../registry.json";

/**
 * These files are generated and committed, and CI fails on a dirty tree after
 * the build. That only works if the generators are deterministic: readdir
 * order differs between APFS and ext4, so an unsorted walk produces a file
 * that can never be clean on both a Mac and the runner.
 */

const isSorted = (keys: string[]) =>
  keys.every((key, index) => index === 0 || keys[index - 1] <= key);

describe("generated artefacts are deterministic", () => {
  test("props.generated.json keys are sorted", () => {
    expect(isSorted(Object.keys(props))).toBe(true);
  });

  test("demos.generated.json keys are sorted", () => {
    expect(isSorted(Object.keys(demos))).toBe(true);
  });

  test("each prop list is sorted: required first, then by name", () => {
    for (const [type, list] of Object.entries(props)) {
      const order = list.map(
        (prop) => `${prop.required ? "0" : "1"}${prop.name}`,
      );
      expect({ type, sorted: isSorted(order) }).toEqual({ type, sorted: true });
    }
  });
});

describe("generated artefacts cover the registry", () => {
  const visual = registry.items.filter((item) =>
    item.files.some((file) => file.path.endsWith(".tsx")),
  );

  test("every item that renders has a demo", () => {
    for (const item of visual) {
      expect({ item: item.name, hasDemo: item.name in demos }).toEqual({
        item: item.name,
        hasDemo: true,
      });
    }
  });

  test("no demo is left behind by a removed item", () => {
    const names = new Set(registry.items.map((item) => item.name));
    for (const demo of Object.keys(demos)) {
      expect({ demo, known: names.has(demo) }).toEqual({ demo, known: true });
    }
  });
});
