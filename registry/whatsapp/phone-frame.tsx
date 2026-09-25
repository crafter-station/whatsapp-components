import type { CSSProperties, ReactNode } from "react";
import { cn } from "./cn";

export type PhoneFrameProps = {
  children: ReactNode;
  /** Screen width in pixels; the height follows from `ratio`. */
  width?: number;
  /** Screen aspect ratio, height over width. */
  ratio?: number;
  notch?: boolean;
  className?: string;
  screenClassName?: string;
  style?: CSSProperties;
};

export function PhoneFrame({
  children,
  width = 320,
  ratio = 2.06,
  notch = true,
  className,
  screenClassName,
  style,
}: PhoneFrameProps) {
  return (
    <div
      className={cn(
        "relative rounded-[2.6rem] bg-[color-mix(in_srgb,var(--wa-panel)_18%,white)] p-3 shadow-[0_24px_60px_-20px_rgba(11,20,26,0.35)]",
        className,
      )}
      style={{ width: width + 24, ...style }}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-[2rem] bg-wa-bg",
          screenClassName,
        )}
        style={{ width, height: Math.round(width * ratio) }}
      >
        {notch ? (
          <div className="pointer-events-none absolute left-1/2 top-2 z-10 h-6 w-[36%] -translate-x-1/2 rounded-full bg-black/85" />
        ) : null}
        {children}
      </div>
    </div>
  );
}
