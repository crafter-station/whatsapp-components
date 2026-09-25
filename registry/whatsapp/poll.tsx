import { cn } from "./cn";
import type { PollOption } from "./types";

export type PollProps = {
  question: string;
  options: PollOption[];
  multiple?: boolean;
  /** Overrides the sum of per-option votes. */
  totalVotes?: number;
  onSelect?: (option: PollOption) => void;
  className?: string;
  /** Labels, so the component can speak another language. */
  labels?: {
    single?: string;
    multiple?: string;
    votes?: (n: number) => string;
  };
};

export function Poll({
  question,
  options,
  multiple = false,
  totalVotes,
  onSelect,
  className,
  labels,
}: PollProps) {
  const counted = options.reduce((sum, option) => sum + (option.votes ?? 0), 0);
  const total = totalVotes ?? counted;
  const votesLabel =
    labels?.votes ?? ((n: number) => `${n} ${n === 1 ? "vote" : "votes"}`);

  return (
    <span className={cn("block min-w-[240px]", className)}>
      <span className="block text-[15px] font-medium leading-[20px] text-wa-text">
        {question}
      </span>
      <span className="mt-0.5 block text-[12.5px] leading-[17px] text-wa-text-muted">
        {multiple
          ? (labels?.multiple ?? "Select one or more")
          : (labels?.single ?? "Select one")}
      </span>

      <span className="mt-2 block space-y-2">
        {options.map((option) => {
          const votes = option.votes ?? 0;
          const share = total > 0 ? Math.round((votes / total) * 100) : 0;

          return (
            <button
              key={option.id}
              type="button"
              onClick={onSelect ? () => onSelect(option) : undefined}
              className="flex w-full items-center gap-2.5 text-left"
            >
              <span
                className={cn(
                  "flex h-[18px] w-[18px] shrink-0 items-center justify-center border-2 border-wa-text-muted/60",
                  multiple ? "rounded-[4px]" : "rounded-full",
                  option.votedByMe && "border-wa-accent bg-wa-accent",
                )}
              >
                {option.votedByMe ? <TickIcon /> : null}
              </span>

              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-2">
                  <span className="truncate text-[14px] leading-[19px] text-wa-text">
                    {option.label}
                  </span>
                  <span className="shrink-0 text-[12.5px] leading-[17px] text-wa-text-muted">
                    {votes}
                  </span>
                </span>
                <span className="mt-1 block h-[4px] overflow-hidden rounded-full bg-wa-text-muted/25">
                  <span
                    className="block h-full rounded-full bg-wa-accent"
                    style={{ width: `${share}%` }}
                  />
                </span>
              </span>
            </button>
          );
        })}
      </span>

      <span className="mt-2 block border-t border-wa-border pt-1.5 text-[12.5px] leading-[17px] text-wa-text-muted">
        {votesLabel(total)}
      </span>
    </span>
  );
}

function TickIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="12"
      height="12"
      aria-hidden="true"
      fill="none"
      stroke="var(--wa-accent-text)"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.4 8.4l3 3 6.2-6.6" />
    </svg>
  );
}
