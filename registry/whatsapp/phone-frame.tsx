import type { CSSProperties, ReactNode } from "react";
import { cn } from "./cn";

export type PhoneFrameProps = {
  children: ReactNode;
  /**
   * Target screen width in pixels. The frame shrinks below it in a narrow
   * column rather than overflowing; the height follows from `ratio`.
   */
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
    /*
      `width` is the target, not a floor: max-w-full lets the frame shrink
      inside a narrow column instead of pushing the page sideways, and the
      screen keeps its shape from aspect-ratio rather than a fixed height.
    */
    <div
      className={cn(
        "relative max-w-full rounded-[2.6rem] bg-[color-mix(in_srgb,var(--wa-panel)_18%,white)] p-3 shadow-[0_24px_60px_-20px_rgba(11,20,26,0.35)]",
        className,
      )}
      style={{ width: width + 24, ...style }}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-[2rem] bg-wa-bg",
          screenClassName,
        )}
        style={{ aspectRatio: `1 / ${ratio}` }}
      >
        {notch ? (
          <div className="pointer-events-none absolute left-1/2 top-2 z-10 h-6 w-[36%] -translate-x-1/2 rounded-full bg-black/85" />
        ) : null}
        {children}
      </div>
    </div>
  );
}
