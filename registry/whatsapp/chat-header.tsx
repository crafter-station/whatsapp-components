import type { ReactNode } from "react";
import { ChatAvatar } from "./chat-avatar";
import { cn } from "./cn";
import type { PresenceState } from "./types";

export type ChatHeaderProps = {
  name: string;
  avatarSrc?: string;
  avatarClassName?: string;
  presence?: PresenceState;
  /** Overrides the default label for the current presence. */
  presenceLabel?: string;
  /** Rendered before the avatar. A back arrow, usually. */
  leading?: ReactNode;
  /** Rendered at the far end: call, search, menu. */
  actions?: ReactNode;
  className?: string;
};

const PRESENCE_LABELS: Record<PresenceState, string> = {
  online: "online",
  typing: "typing…",
  recording: "recording audio…",
  offline: "",
};

export function ChatHeader({
  name,
  avatarSrc,
  avatarClassName,
  presence,
  presenceLabel,
  leading,
  actions,
  className,
}: ChatHeaderProps) {
  const label =
    presenceLabel ?? (presence ? PRESENCE_LABELS[presence] : undefined);

  return (
    <header
      className={cn(
        "flex items-center gap-3 bg-wa-panel px-4 py-2.5 font-wa text-wa-panel-text",
        className,
      )}
    >
      {leading}
      <ChatAvatar name={name} src={avatarSrc} className={avatarClassName} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[16px] font-medium leading-tight">{name}</p>
        {label ? (
          <p className="mt-0.5 flex items-center gap-1.5 text-[13px] leading-tight text-wa-panel-muted">
            {presence === "online" ? (
              <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-wa-online" />
            ) : null}
            <span className="truncate">{label}</span>
          </p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex shrink-0 items-center gap-1">{actions}</div>
      ) : null}
    </header>
  );
}
