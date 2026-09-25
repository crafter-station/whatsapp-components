import type { ReactNode } from "react";
import { cn } from "./cn";
import type { MessageDirection } from "./types";

export type MessageBubbleProps = {
  direction: MessageDirection;
  children: ReactNode;
  /**
   * Meta is rendered twice on purpose: once hidden inline so the last line of
   * text reserves room for it, once absolutely positioned where it is seen.
   * This is how WhatsApp itself gets the timestamp to sit inside the last line
   * when it fits and drop to its own line when it does not.
   */
  meta?: ReactNode;
  /** The little pointer. Turn it off for grouped follow-up messages. */
  tail?: boolean;
  className?: string;
};

const TAIL_OUT = "M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z";
const TAIL_IN =
  "M1.533,3.568L8,12.193V0H2.812C1.042,0,0.474,1.156,1.533,3.568z";

export function MessageBubble({
  direction,
  children,
  meta,
  tail = true,
  className,
}: MessageBubbleProps) {
  const isOut = direction === "out";

  return (
    <div className={cn("flex w-full", isOut ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "relative max-w-[min(65ch,85%)] px-[9px] py-[6px] font-wa text-[14.2px] leading-[19px]",
          "rounded-wa-bubble shadow-wa-bubble",
          isOut
            ? "bg-wa-bubble-out text-wa-bubble-out-text"
            : "bg-wa-bubble-in text-wa-bubble-in-text",
          tail && (isOut ? "rounded-tr-none" : "rounded-tl-none"),
          className,
        )}
      >
        {tail ? (
          <svg
            viewBox="0 0 8 13"
            width="8"
            height="13"
            aria-hidden="true"
            focusable="false"
            className={cn(
              "absolute top-0 block h-[13px] w-[8px]",
              isOut
                ? "right-[-8px] text-wa-bubble-out"
                : "left-[-8px] text-wa-bubble-in",
            )}
          >
            <path d={isOut ? TAIL_OUT : TAIL_IN} fill="currentColor" />
          </svg>
        ) : null}

        <span className="whitespace-pre-wrap break-words">{children}</span>

        {meta ? (
          <>
            <span
              aria-hidden="true"
              className="pointer-events-none invisible ml-2 inline-block select-none align-bottom"
            >
              {meta}
            </span>
            <span className="absolute bottom-[6px] right-[9px]">{meta}</span>
          </>
        ) : null}
      </div>
    </div>
  );
}
