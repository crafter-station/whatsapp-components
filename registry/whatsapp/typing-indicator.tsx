import { cn } from "./cn";

export type TypingIndicatorProps = {
  className?: string;
  label?: string;
};

/**
 * The three bouncing dots. Renders the dots only — wrap it in a MessageBubble
 * to get the incoming bubble around them.
 */
export function TypingIndicator({
  className,
  label = "Typing",
}: TypingIndicatorProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn("inline-flex items-center gap-1 py-1", className)}
    >
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          className="wa-typing-dot inline-block h-[7px] w-[7px] rounded-full bg-wa-text-muted"
          style={{ animationDelay: `${index * 160}ms` }}
        />
      ))}
    </span>
  );
}
