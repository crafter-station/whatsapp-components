import { cn } from "./cn";
import type { MessageDirection } from "./types";

export type ReplyQuoteProps = {
  author: string;
  preview: string;
  /** Direction of the quoted message — it picks the accent colour. */
  direction?: MessageDirection;
  thumbnailUrl?: string;
  className?: string;
};

export function ReplyQuote({
  author,
  preview,
  direction = "in",
  thumbnailUrl,
  className,
}: ReplyQuoteProps) {
  return (
    <span
      className={cn(
        "-mx-[5px] mb-1 flex overflow-hidden rounded-[5px] bg-wa-text/[0.06]",
        className,
      )}
    >
      <span
        className={cn(
          "w-[4px] shrink-0",
          direction === "out" ? "bg-wa-accent" : "bg-wa-tick-read",
        )}
      />
      <span className="min-w-0 flex-1 px-2 py-1.5">
        <span
          className={cn(
            "block truncate text-[13px] font-medium leading-[18px]",
            direction === "out" ? "text-wa-accent" : "text-wa-tick-read",
          )}
        >
          {author}
        </span>
        <span className="block truncate text-[13px] leading-[18px] text-wa-text-muted">
          {preview}
        </span>
      </span>
      {thumbnailUrl ? (
        <img
          src={thumbnailUrl}
          alt=""
          className="h-[52px] w-[52px] shrink-0 object-cover"
        />
      ) : null}
    </span>
  );
}
