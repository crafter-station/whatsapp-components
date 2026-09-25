import { isSameDay } from "./format-time";
import type {
  ChatItem,
  DateDividerItem,
  Message,
  MessageDirection,
  SystemNotice,
} from "./types";

/**
 * A run of consecutive messages from the same sender. Only the first message
 * of a run gets a tail, and the gap inside a run is tighter than between
 * runs — the two details that make a transcript read as WhatsApp rather than
 * as a stack of coloured boxes.
 */
export type MessageRun = {
  kind: "run";
  id: string;
  direction: MessageDirection;
  author?: string;
  messages: Message[];
};

export type GroupedChatItem = MessageRun | SystemNotice | DateDividerItem;

export type GroupOptions = {
  /** A longer pause starts a new run even from the same sender. */
  maxGapMinutes?: number;
};

export function groupChatItems(
  items: ChatItem[],
  options: GroupOptions = {},
): GroupedChatItem[] {
  const { maxGapMinutes = 60 } = options;
  const grouped: GroupedChatItem[] = [];
  let run: MessageRun | null = null;

  for (const item of items) {
    if (item.kind !== "message") {
      run = null;
      grouped.push(item);
      continue;
    }

    const previous = run?.messages.at(-1);
    const continues =
      run !== null &&
      previous !== undefined &&
      run.direction === item.direction &&
      run.author === item.author &&
      isSameDay(previous.timestamp, item.timestamp) &&
      item.timestamp.getTime() - previous.timestamp.getTime() <=
        maxGapMinutes * 60_000;

    if (continues && run) {
      run.messages.push(item);
      continue;
    }

    run = {
      kind: "run",
      id: `run-${item.id}`,
      direction: item.direction,
      author: item.author,
      messages: [item],
    };
    grouped.push(run);
  }

  return grouped;
}

export type DateDividerInsertOptions = {
  /** Id prefix for the generated dividers. */
  idPrefix?: string;
};

/**
 * Inserts a divider before the first message of each new calendar day,
 * including the first. Existing dividers in the input are left alone and
 * suppress a generated one for that same day.
 */
export function withDateDividers(
  items: ChatItem[],
  options: DateDividerInsertOptions = {},
): ChatItem[] {
  const { idPrefix = "date" } = options;
  const result: ChatItem[] = [];
  let currentDay: Date | null = null;

  for (const item of items) {
    if (item.kind === "date") {
      currentDay = item.date;
      result.push(item);
      continue;
    }

    if (item.kind !== "message") {
      result.push(item);
      continue;
    }

    if (currentDay === null || !isSameDay(currentDay, item.timestamp)) {
      currentDay = item.timestamp;
      result.push({
        kind: "date",
        id: `${idPrefix}-${item.timestamp.getFullYear()}-${item.timestamp.getMonth() + 1}-${item.timestamp.getDate()}`,
        date: item.timestamp,
      });
    }

    result.push(item);
  }

  return result;
}
