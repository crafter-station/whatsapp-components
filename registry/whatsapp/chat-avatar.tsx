import type { CSSProperties } from "react";
import { cn } from "./cn";

export type ChatAvatarProps = {
  name: string;
  src?: string;
  /** Diameter in pixels. */
  size?: number;
  className?: string;
  style?: CSSProperties;
};

export function ChatAvatar({
  name,
  src,
  size = 40,
  className,
  style,
}: ChatAvatarProps) {
  const initial = name.trim().charAt(0).toUpperCase();

  return (
    <span
      className={cn(
        "inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-full bg-wa-accent font-wa font-semibold text-wa-accent-text",
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.42, ...style }}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          width={size}
          height={size}
          className="h-full w-full object-cover"
        />
      ) : (
        <span aria-hidden="true">{initial}</span>
      )}
    </span>
  );
}
