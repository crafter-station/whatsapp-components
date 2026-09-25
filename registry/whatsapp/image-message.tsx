import type { ReactNode } from "react";
import { cn } from "./cn";

export type ImageMessageProps = {
  src: string;
  alt?: string;
  caption?: ReactNode;
  width?: number;
  height?: number;
  /**
   * Bleeds the image past the bubble's padding, as WhatsApp does. Turn it off
   * when placing the image somewhere other than directly inside a bubble.
   */
  flush?: boolean;
  className?: string;
};

export function ImageMessage({
  src,
  alt = "",
  caption,
  width,
  height,
  flush = true,
  className,
}: ImageMessageProps) {
  return (
    <span className={cn("block", className)}>
      <span
        className={cn(
          "block overflow-hidden rounded-[6px]",
          flush && "-mx-[6px] -mt-[3px]",
          flush && !caption && "-mb-[3px]",
          caption && "mb-1.5",
        )}
      >
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="block h-auto w-full max-w-[330px] object-cover"
        />
      </span>
      {caption ? <span className="block">{caption}</span> : null}
    </span>
  );
}
