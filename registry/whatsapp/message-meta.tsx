import { cn } from "./cn";
import { formatMessageTime, type TimeFormatOptions } from "./format-time";
import { MessageTicks } from "./message-ticks";
import type { MessageStatus } from "./types";

export type MessageMetaProps = {
  timestamp: Date;
  /** Ticks render only for outgoing messages, matching WhatsApp. */
  status?: MessageStatus;
  edited?: boolean;
  editedLabel?: string;
  className?: string;
  timeFormat?: TimeFormatOptions;
};

export function MessageMeta({
  timestamp,
  status,
  edited,
  editedLabel = "edited",
  className,
  timeFormat,
}: MessageMetaProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap text-[11px] leading-[15px] text-wa-text-muted",
        className,
      )}
    >
      {edited ? <span>{editedLabel}</span> : null}
      <time dateTime={timestamp.toISOString()}>
        {formatMessageTime(timestamp, timeFormat)}
      </time>
      {status ? <MessageTicks status={status} /> : null}
    </span>
  );
}
