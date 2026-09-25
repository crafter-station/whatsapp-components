import { cn } from "./cn";

export type ChatBackgroundProps = {
  /** Hide the doodles and keep the flat wallpaper colour. */
  pattern?: boolean;
  className?: string;
};

/**
 * The wallpaper layer. The doodles are a CSS mask tinted with
 * --wa-bg-pattern rather than an image, so they follow the theme and need no
 * unique SVG id per instance — three themed previews can sit side by side.
 */
export function ChatBackground({
  pattern = true,
  className,
}: ChatBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 bg-wa-bg", className)}
    >
      {pattern ? <div className="wa-doodle absolute inset-0" /> : null}
    </div>
  );
}
