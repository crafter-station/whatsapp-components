import type { ReactNode } from "react";
import { cn } from "./cn";
import type { SystemNoticeTone } from "./types";

export type SystemMessageProps = {
  children: ReactNode;
  tone?: SystemNoticeTone;
  /** Rendered before the text. Pass `null` to drop the tone's default icon. */
  icon?: ReactNode | null;
  className?: string;
};

const TONE_CLASSES: Record<SystemNoticeTone, string> = {
  neutral: "text-wa-system-text",
  success: "text-wa-system-text font-medium",
  warning: "text-wa-system-text",
  encryption: "text-wa-system-text",
};

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="15"
      height="15"
      aria-hidden="true"
      focusable="false"
      className="shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="8" r="6.4" />
      <path d="M5.2 8.2l1.9 1.9 3.7-4" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="13"
      height="13"
      aria-hidden="true"
      focusable="false"
      className="shrink-0"
      fill="currentColor"
    >
      <path d="M8 1.5a3.2 3.2 0 0 0-3.2 3.2V6H4.4A1.4 1.4 0 0 0 3 7.4v5.2a1.4 1.4 0 0 0 1.4 1.4h7.2a1.4 1.4 0 0 0 1.4-1.4V7.4A1.4 1.4 0 0 0 11.6 6h-.4V4.7A3.2 3.2 0 0 0 8 1.5zm0 1.4a1.8 1.8 0 0 1 1.8 1.8V6H6.2V4.7A1.8 1.8 0 0 1 8 2.9z" />
    </svg>
  );
}

const TONE_ICONS: Record<SystemNoticeTone, ReactNode> = {
  neutral: null,
  success: <CheckIcon />,
  warning: null,
  encryption: <LockIcon />,
};

export function SystemMessage({
  children,
  tone = "neutral",
  icon,
  className,
}: SystemMessageProps) {
  const resolvedIcon = icon === undefined ? TONE_ICONS[tone] : icon;

  return (
    <div className={cn("flex justify-center py-1", className)}>
      <span
        className={cn(
          "inline-flex max-w-[85%] items-center justify-center gap-1.5 rounded-lg bg-wa-system-bg px-3 py-1.5 text-center font-wa text-[12.5px] leading-[18px] shadow-wa-bubble",
          TONE_CLASSES[tone],
        )}
      >
        {resolvedIcon}
        <span>{children}</span>
      </span>
    </div>
  );
}
