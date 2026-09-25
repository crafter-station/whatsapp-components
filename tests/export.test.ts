import { describe, expect, test } from "bun:test";
import {
  toCompoundSource,
  toDeclarativeSource,
} from "../apps/dashboard/app/playground/export";
import type { ChatItem } from "../registry/whatsapp/types";

const at = (hour: number, minute: number) =>
  new Date(2025, 0, 6, hour, minute, 0, 0);

const items: ChatItem[] = [
  { kind: "date", id: "d0", date: at(0, 0), label: "Today" },
  {
    kind: "message",
    id: "m0",
    direction: "in",
    timestamp: at(20, 2),
    content: { type: "text", text: "¡Hola!" },
  },
  {
    kind: "message",
    id: "m1",
    direction: "in",
    timestamp: at(20, 3),
    content: { type: "text", text: "¿Tienen el Violeta?" },
  },
  {
    kind: "message",
    id: "m2",
    direction: "out",
    timestamp: at(20, 4),
    status: "read",
    content: { type: "product", title: "Violeta 50 ml", price: "$ 65.000" },
  },
  { kind: "system", id: "s0", tone: "success", text: "Pago confirmado" },
];

describe("toDeclarativeSource", () => {
  const source = toDeclarativeSource(items);

  test("imports Conversation and the ChatItem type", () => {
    expect(source).toContain("import { Conversation }");
    expect(source).toContain("import type { ChatItem }");
  });

  test("writes dates as constructor calls, not ISO strings", () => {
    expect(source).toContain("new Date(2025, 0, 6, 20, 2)");
    expect(source).not.toContain("2025-01-06T");
  });

  test("carries every item through", () => {
    for (const id of ["d0", "m0", "m1", "m2", "s0"]) {
      expect(source).toContain(`id: "${id}"`);
    }
  });

  test("keeps the content discriminant", () => {
    expect(source).toContain('type: "product"');
    expect(source).toContain('title: "Violeta 50 ml"');
  });

  test("escapes a quote in the text rather than breaking the literal", () => {
    const withQuote = toDeclarativeSource([
      {
        kind: "message",
        id: "q",
        direction: "in",
        timestamp: at(9, 0),
        content: { type: "text", text: 'Dijo "hola"' },
      },
    ]);
    expect(withQuote).toContain('text: "Dijo \\"hola\\""');
  });
});

describe("toCompoundSource", () => {
  const source = toCompoundSource(items);

  test("collapses the two consecutive incoming messages into one group", () => {
    expect(source.match(/<MessageGroup/g)).toHaveLength(2);
  });

  test("drops the tail on every bubble after the first of a run", () => {
    expect(source.match(/tail=\{false\}/g)).toHaveLength(1);
  });

  test("only imports ProductCard when a product is present", () => {
    expect(source).toContain("product-card");
    const withoutProduct = toCompoundSource([items[1]]);
    expect(withoutProduct).not.toContain("product-card");
  });

  test("renders ticks only for outgoing messages", () => {
    expect(source).toContain('status="read"');
    expect(source.match(/status=/g)).toHaveLength(1);
  });

  test("emits the date divider and the system notice", () => {
    expect(source).toContain("<DateDivider");
    expect(source).toContain("<SystemMessage");
  });

  test("handles an empty conversation without crashing", () => {
    expect(toCompoundSource([])).toContain("<MessageList>");
  });
});
