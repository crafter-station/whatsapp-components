import { AudioMessage, type AudioMessageProps } from "./audio-message";
import { ChatAvatar } from "./chat-avatar";
import { cn } from "./cn";

export type VoiceNoteProps = AudioMessageProps & {
  /** Sender shown beside the waveform, with the little mic badge. */
  senderName: string;
  senderAvatarUrl?: string;
};

export function VoiceNote({
  senderName,
  senderAvatarUrl,
  className,
  ...audio
}: VoiceNoteProps) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <span className="relative shrink-0">
        <ChatAvatar name={senderName} src={senderAvatarUrl} size={44} />
        <span
          className={cn(
            "absolute -bottom-0.5 -right-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full",
            audio.unplayed ? "text-wa-tick-read" : "text-wa-text-muted",
          )}
        >
          <MicBadge />
        </span>
      </span>
      <AudioMessage {...audio} />
    </span>
  );
}

function MicBadge() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M12 14.2a2.8 2.8 0 0 0 2.8-2.8V6.1a2.8 2.8 0 1 0-5.6 0v5.3a2.8 2.8 0 0 0 2.8 2.8z" />
      <path d="M17.2 11.1a.85.85 0 0 0-1.7 0 3.5 3.5 0 0 1-7 0 .85.85 0 1 0-1.7 0 5.2 5.2 0 0 0 4.35 5.13V18.6a.85.85 0 0 0 1.7 0v-2.37A5.2 5.2 0 0 0 17.2 11.1z" />
    </svg>
  );
}
