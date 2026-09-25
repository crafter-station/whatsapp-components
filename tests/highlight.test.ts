import { describe, expect, test } from "bun:test";
import { tokenize } from "../apps/dashboard/app/components/highlight";

const kindOf = (code: string, text: string) =>
  tokenize(code).find((token) => token.text === text)?.kind;

describe("tokenize", () => {
  test("reassembles the input exactly", () => {
    const code = `import { X } from "y";\n// note\nconst a = <Tag prop={1} />;\n`;
    expect(
      tokenize(code)
        .map((token) => token.text)
        .join(""),
    ).toBe(code);
  });

  test("never emits an empty token", () => {
    for (const token of tokenize(`const a = "b"; // c`)) {
      expect(token.text.length).toBeGreaterThan(0);
    }
  });

  test("marks keywords", () => {
    expect(kindOf("import x", "import")).toBe("keyword");
    expect(kindOf("const a = 1", "const")).toBe("keyword");
  });

  test("marks strings whole, quotes included", () => {
    expect(kindOf('const a = "hola";', '"hola"')).toBe("string");
  });

  test("keeps an escaped quote inside the string token", () => {
    expect(kindOf('x = "a\\"b"', '"a\\"b"')).toBe("string");
  });

  test("marks template literals", () => {
    // biome-ignore lint/suspicious/noTemplateCurlyInString: the placeholder is the input under test, not an interpolation that got away
    expect(kindOf("x = `a${b}c`", "`a${b}c`")).toBe("string");
  });

  test("does not tokenize inside a string", () => {
    const tokens = tokenize('const a = "import const";');
    expect(tokens.filter((token) => token.kind === "keyword")).toHaveLength(1);
  });

  test("does not tokenize inside a comment", () => {
    const tokens = tokenize("// const import return\nlet a");
    expect(tokens.filter((token) => token.kind === "keyword")).toHaveLength(1);
  });

  test("marks opening and closing JSX tags", () => {
    expect(kindOf("<MessageBubble />", "<MessageBubble")).toBe("tag");
    expect(kindOf("</MessageBubble>", "</MessageBubble")).toBe("tag");
  });

  test("marks a JSX attribute name", () => {
    expect(kindOf('<Tag direction="in" />', "direction")).toBe("attr");
  });

  test("does not mistake an equality check for an attribute", () => {
    expect(kindOf("if (a === b)", "a")).toBeUndefined();
  });

  test("marks numbers, including separated ones", () => {
    expect(kindOf("byteSize={486_000}", "486_000")).toBe("number");
  });

  test("marks a block comment across lines", () => {
    expect(kindOf("/* a\nb */\nlet x", "/* a\nb */")).toBe("comment");
  });

  test("marks a JSX comment", () => {
    expect(kindOf("{/* hola */}", "{/* hola */}")).toBe("comment");
  });

  test("handles an empty string", () => {
    expect(tokenize("")).toEqual([]);
  });
});
