import { cn } from "./cn";
import { DEFAULT_WAVEFORM, formatDuration } from "./format-media";

export type AudioMessageProps = {
  durationSeconds: number;
  /** Bar heights from 0 to 1. Falls back to a stable stand-in. */
  waveform?: number[];
  /** Playback position from 0 to 1; bars before it are filled. */
  progress?: number;
  playing?: boolean;
  onPlayToggle?: () => void;
  /** Turns the unplayed dot on, as WhatsApp marks a new voice note. */
  unplayed?: boolean;
  className?: string;
};

export function AudioMessage({
  durationSeconds,
  waveform = DEFAULT_WAVEFORM,
  progress = 0,
  playing = false,
  onPlayToggle,
  unplayed = false,
  className,
}: AudioMessageProps) {
  const playedBars = Math.round(progress * waveform.length);

  return (
    <span className={cn("flex min-w-[210px] items-center gap-2.5", className)}>
      <button
        type="button"
        onClick={onPlayToggle}
        aria-label={playing ? "Pause" : "Play"}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-wa-text-muted"
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>

      <span className="flex h-8 flex-1 items-center gap-[2px]">
        {waveform.map((height, index) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: a waveform bar is its position; the array never reorders and the bars hold no state
            key={index}
            className={cn(
              "w-[3px] shrink-0 rounded-full",
              index < playedBars ? "bg-wa-tick-read" : "bg-wa-text-muted/45",
            )}
            style={{ height: `${Math.max(3, Math.round(height * 22))}px` }}
          />
        ))}
      </span>

      <span className="flex shrink-0 items-center gap-1.5">
        <span className="text-[11px] leading-[15px] text-wa-text-muted">
          {formatDuration(durationSeconds)}
        </span>
        {unplayed ? (
          <span className="inline-block h-[7px] w-[7px] rounded-full bg-wa-tick-read" />
        ) : null}
      </span>
    </span>
  );
}

function PlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="26"
      height="26"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M8.5 5.4v13.2c0 .5.55.8.97.54l10.4-6.6a.64.64 0 0 0 0-1.08L9.47 4.86a.64.64 0 0 0-.97.54z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="26"
      height="26"
      aria-hidden="true"
      fill="currentColor"
    >
      <rect x="7" y="5" width="4" height="14" rx="1.2" />
      <rect x="13" y="5" width="4" height="14" rx="1.2" />
    </svg>
  );
}
