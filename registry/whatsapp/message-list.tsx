import type { ReactNode } from "react";
import { ChatBackground } from "./chat-background";
import { cn } from "./cn";

export type MessageListProps = {
  children: ReactNode;
  /** Hide the doodles behind the transcript. */
  pattern?: boolean;
  className?: string;
};

export function MessageList({
  children,
  pattern = true,
  className,
}: MessageListProps) {
  return (
    <div className={cn("relative flex-1 overflow-y-auto", className)}>
      <ChatBackground pattern={pattern} />
      <div className="relative flex flex-col gap-3 px-[5%] py-3">
        {children}
      </div>
    </div>
  );
}
