/**
 * A small TSX tokeniser. Not a parser — it colours the shapes that carry
 * meaning in these snippets and leaves everything else plain.
 *
 * Deliberately dependency-free: the playground re-highlights on every
 * keystroke in the browser, and shipping a TextMate grammar to do it would
 * cost more than the rest of the page.
 */

const KEYWORDS = [
  "import",
  "export",
  "from",
  "default",
  "function",
  "return",
  "const",
  "let",
  "var",
  "type",
  "interface",
  "as",
  "new",
  "if",
  "else",
  "for",
  "of",
  "in",
  "switch",
  "case",
  "break",
  "continue",
  "async",
  "await",
  "class",
  "extends",
  "null",
  "undefined",
  "true",
  "false",
].join("|");

const PATTERN = new RegExp(
  [
    String.raw`(?<comment>\/\/[^\n]*|\/\*[\s\S]*?\*\/|\{\/\*[\s\S]*?\*\/\})`,
    String.raw`(?<string>"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\`(?:[^\`\\]|\\.)*\`)`,
    String.raw`(?<tag><\/?[A-Za-z][\w.-]*)`,
    String.raw`(?<keyword>\b(?:${KEYWORDS})\b)`,
    String.raw`(?<attr>[A-Za-z_$][\w$]*(?=\s*=(?!=)))`,
    String.raw`(?<number>\b\d[\d_]*(?:\.\d+)?\b)`,
    String.raw`(?<punct>[{}()[\];,.<>/=|&?:+\-*!])`,
  ].join("|"),
  "g",
);

const CLASSES: Record<string, string> = {
  comment: "text-[#6a8a99] italic",
  string: "text-[#a3e39a]",
  tag: "text-[#7fd4f5]",
  keyword: "text-[#f191c4]",
  attr: "text-[#f3d68c]",
  number: "text-[#c3b0f2]",
  punct: "text-[#8aa0ab]",
};

export type Token = { text: string; kind?: string };

export function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  let last = 0;

  for (const match of code.matchAll(PATTERN)) {
    const index = match.index ?? 0;
    if (index > last) tokens.push({ text: code.slice(last, index) });

    const kind = Object.entries(match.groups ?? {}).find(
      ([, value]) => value !== undefined,
    )?.[0];
    tokens.push({ text: match[0], kind });
    last = index + match[0].length;
  }

  if (last < code.length) tokens.push({ text: code.slice(last) });
  return tokens;
}

export function Highlight({ code }: { code: string }) {
  return (
    <>
      {tokenize(code).map((token, index) =>
        token.kind ? (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: tokens are a positional slicing of one string; the list is rebuilt whole on every change and holds no state
            key={index}
            className={CLASSES[token.kind]}
          >
            {token.text}
          </span>
        ) : (
          token.text
        ),
      )}
    </>
  );
}
