import { cn } from "./cn";
import type { MessageDirection, Reaction } from "./types";

export type ReactionsProps = {
  reactions: Reaction[];
  /** Direction of the message being reacted to. Picks the side. */
  direction?: MessageDirection;
  onToggle?: (emoji: string) => void;
  className?: string;
};

/**
 * The pill that overhangs the bottom edge of a bubble. Give the bubble
 * `mb-3` so the pill has somewhere to sit.
 */
export function Reactions({
  reactions,
  direction = "in",
  onToggle,
  className,
}: ReactionsProps) {
  if (reactions.length === 0) return null;

  const total = reactions.reduce(
    (sum, reaction) => sum + (reaction.count ?? 1),
    0,
  );
  const mine = reactions.some((reaction) => reaction.reactedByMe);

  return (
    <span
      className={cn(
        "absolute -bottom-3 z-10 inline-flex items-center gap-0.5 rounded-full border px-1.5 py-[2px] shadow-wa-bubble",
        "border-wa-border bg-wa-bubble-in",
        mine && "border-wa-tick-read/50",
        direction === "out" ? "right-2" : "left-2",
        className,
      )}
    >
      {reactions.map((reaction) => (
        <button
          key={reaction.emoji}
          type="button"
          onClick={onToggle ? () => onToggle(reaction.emoji) : undefined}
          aria-label={`${reaction.emoji} ${reaction.count ?? 1}`}
          className="text-[13px] leading-[17px]"
        >
          {reaction.emoji}
        </button>
      ))}
      {total > 1 ? (
        <span className="ml-0.5 text-[11.5px] leading-[17px] text-wa-text-muted">
          {total}
        </span>
      ) : null}
    </span>
  );
}
