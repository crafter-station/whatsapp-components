import type { CSSProperties, ReactNode } from "react";
import { cn } from "./cn";
import type { WhatsAppThemeId } from "./themes";

export type ChatWindowProps = {
  children: ReactNode;
  /** Sets data-wa-theme on the shell so the tokens resolve for everything inside. */
  theme?: WhatsAppThemeId | (string & {});
  className?: string;
  style?: CSSProperties;
};

export function ChatWindow({
  children,
  theme,
  className,
  style,
}: ChatWindowProps) {
  return (
    <div
      data-wa-theme={theme}
      className={cn(
        "flex h-full w-full flex-col overflow-hidden bg-wa-bg font-wa text-wa-text",
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}
