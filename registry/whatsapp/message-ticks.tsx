import { cn } from "./cn";
import type { MessageStatus } from "./types";

export type MessageTicksProps = {
  status: MessageStatus;
  className?: string;
  label?: string;
};

const LABELS: Record<MessageStatus, string> = {
  pending: "Pending",
  sent: "Sent",
  delivered: "Delivered",
  read: "Read",
};

const SINGLE_CHECK =
  "M10.91 3.316l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z";

const DOUBLE_CHECK =
  "M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z";

export function MessageTicks({ status, className, label }: MessageTicksProps) {
  const title = label ?? LABELS[status];

  if (status === "pending") {
    return (
      <svg
        viewBox="0 0 16 15"
        width="16"
        height="15"
        aria-label={title}
        role="img"
        className={cn("inline-block text-wa-tick", className)}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <circle cx="8" cy="7.5" r="5.4" />
        <path d="M8 4.6v3.1l2.1 1.3" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 16 15"
      width="16"
      height="15"
      aria-label={title}
      role="img"
      className={cn(
        "inline-block",
        status === "read" ? "text-wa-tick-read" : "text-wa-tick",
        className,
      )}
      fill="currentColor"
    >
      <path d={status === "sent" ? SINGLE_CHECK : DOUBLE_CHECK} />
    </svg>
  );
}
