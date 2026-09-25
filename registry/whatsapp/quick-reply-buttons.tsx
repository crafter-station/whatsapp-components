import { cn } from "./cn";
import type { CtaAction } from "./types";

export type QuickReplyButtonsProps = {
  actions: CtaAction[];
  onSelect?: (action: CtaAction) => void;
  /** Side to align with. Matches the bubble it hangs under. */
  direction?: "in" | "out";
  className?: string;
};

/**
 * The stack of reply chips WhatsApp attaches under a message. Place it as a
 * sibling of the bubble inside a MessageGroup, not inside the bubble.
 */
export function QuickReplyButtons({
  actions,
  onSelect,
  direction = "in",
  className,
}: QuickReplyButtonsProps) {
  if (actions.length === 0) return null;

  return (
    <div
      className={cn(
        "flex w-full flex-col gap-0.5",
        direction === "out" ? "items-end" : "items-start",
        className,
      )}
    >
      {actions.map((action) => (
        <button
          key={action.id}
          type="button"
          onClick={onSelect ? () => onSelect(action) : undefined}
          className={cn(
            "w-full max-w-[min(65ch,85%)] rounded-wa-bubble bg-wa-bubble-in px-3 py-2 text-center font-wa text-[14px] font-medium leading-[19px] text-wa-tick-read shadow-wa-bubble",
          )}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}
