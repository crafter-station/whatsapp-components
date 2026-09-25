import type { ReactNode } from "react";
import { cn } from "./cn";
import type { MessageDirection } from "./types";

export type MessageGroupProps = {
  direction: MessageDirection;
  children: ReactNode;
  /** Shown above the first bubble, for group chats. */
  author?: string;
  className?: string;
};

/**
 * Tightens the spacing inside a run of messages from one sender. Which bubble
 * carries the tail is the caller's decision — pass `tail` to the first
 * MessageBubble only, or let `groupChatItems` work it out for you.
 */
export function MessageGroup({
  direction,
  children,
  author,
  className,
}: MessageGroupProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-0.5",
        direction === "out" ? "items-end" : "items-start",
        className,
      )}
    >
      {author ? (
        <span className="px-2 font-wa text-[12.5px] font-medium text-wa-text-muted">
          {author}
        </span>
      ) : null}
      {children}
    </div>
  );
}
