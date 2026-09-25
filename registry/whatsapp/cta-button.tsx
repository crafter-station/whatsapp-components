import { cn } from "./cn";
import type { CtaAction } from "./types";

export type CtaButtonProps = {
  action: CtaAction;
  onSelect?: (action: CtaAction) => void;
  /** Drops the divider above the button, for the first in a stack. */
  flush?: boolean;
  className?: string;
};

export function CtaButton({
  action,
  onSelect,
  flush = false,
  className,
}: CtaButtonProps) {
  const kind = action.kind ?? "reply";
  const shared = cn(
    "flex w-full items-center justify-center gap-2 py-2.5 text-center font-wa text-[14px] font-medium leading-[19px] text-wa-tick-read",
    !flush && "border-t border-wa-border",
    className,
  );

  const content = (
    <>
      <Icon kind={kind} />
      <span>{action.label}</span>
    </>
  );

  if (kind === "url" && action.url) {
    return (
      <a href={action.url} className={shared}>
        {content}
      </a>
    );
  }

  if (kind === "call" && action.url) {
    return (
      <a href={action.url} className={shared}>
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onSelect ? () => onSelect(action) : undefined}
      className={shared}
    >
      {content}
    </button>
  );
}

function Icon({ kind }: { kind: NonNullable<CtaAction["kind"]> }) {
  const paths = ICON_PATHS[kind];

  return (
    <svg
      viewBox="0 0 24 24"
      width="17"
      height="17"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {kind === "copy" ? (
        <rect x="9" y="9" width="11" height="11" rx="1.8" />
      ) : null}
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

const ICON_PATHS: Record<NonNullable<CtaAction["kind"]>, string[]> = {
  url: [
    "M14 4h6v6M20 4l-9 9",
    "M18 14v5a1.6 1.6 0 0 1-1.6 1.6H5.6A1.6 1.6 0 0 1 4 19V8.2A1.6 1.6 0 0 1 5.6 6.6h5",
  ],
  call: [
    "M21 16.4v2.6a1.7 1.7 0 0 1-1.9 1.7 17 17 0 0 1-7.4-2.6 16.7 16.7 0 0 1-5.1-5.1A17 17 0 0 1 4 5.5 1.7 1.7 0 0 1 5.7 3.6h2.6a1.7 1.7 0 0 1 1.7 1.5c.1.9.3 1.7.6 2.5a1.7 1.7 0 0 1-.4 1.8l-1.1 1.1a13.6 13.6 0 0 0 5.1 5.1l1.1-1.1a1.7 1.7 0 0 1 1.8-.4c.8.3 1.6.5 2.5.6a1.7 1.7 0 0 1 1.4 1.7z",
  ],
  copy: [
    "M5.5 15H5a1.6 1.6 0 0 1-1.6-1.6V5A1.6 1.6 0 0 1 5 3.4h8.4A1.6 1.6 0 0 1 15 5v.5",
  ],
  reply: ["M10 8.5L5.5 13 10 17.5", "M5.5 13h8a5 5 0 0 0 5-5v-1.5"],
};
