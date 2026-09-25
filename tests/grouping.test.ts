import { describe, expect, test } from "bun:test";
import {
  groupChatItems,
  withDateDividers,
} from "../registry/whatsapp/grouping";
import type { ChatItem, Message } from "../registry/whatsapp/types";

const at = (hour: number, minute: number, day = 6) =>
  new Date(2025, 0, day, hour, minute, 0, 0);

const message = (
  id: string,
  direction: "in" | "out",
  timestamp: Date,
  author?: string,
): Message => ({
  kind: "message",
  id,
  direction,
  timestamp,
  author,
  content: { type: "text", text: id },
});

const runIds = (items: ReturnType<typeof groupChatItems>) =>
  items.map((item) =>
    item.kind === "run" ? item.messages.map((m) => m.id).join("+") : item.kind,
  );

describe("groupChatItems", () => {
  test("merges consecutive messages from the same direction", () => {
    const grouped = groupChatItems([
      message("a", "in", at(20, 0)),
      message("b", "in", at(20, 1)),
      message("c", "out", at(20, 2)),
    ]);
    expect(runIds(grouped)).toEqual(["a+b", "c"]);
  });

  test("starts a new run when the direction flips back", () => {
    const grouped = groupChatItems([
      message("a", "in", at(20, 0)),
      message("b", "out", at(20, 1)),
      message("c", "in", at(20, 2)),
    ]);
    expect(runIds(grouped)).toEqual(["a", "b", "c"]);
  });

  test("splits a run when the sender changes in a group chat", () => {
    const grouped = groupChatItems([
      message("a", "in", at(20, 0), "Ana"),
      message("b", "in", at(20, 1), "Beto"),
    ]);
    expect(runIds(grouped)).toEqual(["a", "b"]);
  });

  test("splits a run on a long pause", () => {
    const grouped = groupChatItems(
      [message("a", "in", at(20, 0)), message("b", "in", at(21, 30))],
      { maxGapMinutes: 60 },
    );
    expect(runIds(grouped)).toEqual(["a", "b"]);
  });

  test("keeps a run together inside the gap window", () => {
    const grouped = groupChatItems(
      [message("a", "in", at(20, 0)), message("b", "in", at(20, 59))],
      { maxGapMinutes: 60 },
    );
    expect(runIds(grouped)).toEqual(["a+b"]);
  });

  test("never merges across midnight, however small the gap", () => {
    const grouped = groupChatItems([
      message("a", "in", at(23, 59, 6)),
      message("b", "in", at(0, 1, 7)),
    ]);
    expect(runIds(grouped)).toEqual(["a", "b"]);
  });

  test("a system notice breaks the run around it", () => {
    const grouped = groupChatItems([
      message("a", "in", at(20, 0)),
      { kind: "system", id: "s", text: "Payment confirmed" },
      message("b", "in", at(20, 1)),
    ]);
    expect(runIds(grouped)).toEqual(["a", "system", "b"]);
  });

  test("returns nothing for no messages", () => {
    expect(groupChatItems([])).toEqual([]);
  });

  test("does not mutate the input array", () => {
    const items: ChatItem[] = [
      message("a", "in", at(20, 0)),
      message("b", "in", at(20, 1)),
    ];
    groupChatItems(items);
    expect(items).toHaveLength(2);
  });
});

describe("withDateDividers", () => {
  test("puts a divider before the first message", () => {
    const result = withDateDividers([message("a", "in", at(20, 0))]);
    expect(result.map((item) => item.kind)).toEqual(["date", "message"]);
  });

  test("adds one divider per new day, not per message", () => {
    const result = withDateDividers([
      message("a", "in", at(20, 0, 6)),
      message("b", "in", at(20, 1, 6)),
      message("c", "in", at(9, 0, 7)),
    ]);
    expect(result.map((item) => item.kind)).toEqual([
      "date",
      "message",
      "message",
      "date",
      "message",
    ]);
  });

  test("respects a divider the caller already placed", () => {
    const result = withDateDividers([
      { kind: "date", id: "mine", date: at(0, 0, 6) },
      message("a", "in", at(20, 0, 6)),
    ]);
    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({ kind: "date", id: "mine" });
  });

  test("derives a stable id from the calendar day", () => {
    const [divider] = withDateDividers([message("a", "in", at(20, 0, 6))]);
    expect(divider).toMatchObject({ kind: "date", id: "date-2025-1-6" });
  });

  test("leaves system notices alone", () => {
    const result = withDateDividers([
      { kind: "system", id: "s", text: "Messages are encrypted" },
    ]);
    expect(result.map((item) => item.kind)).toEqual(["system"]);
  });
});
