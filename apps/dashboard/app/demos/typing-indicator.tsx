import { MessageBubble } from "@/registry/whatsapp/message-bubble";
import { TypingIndicator } from "@/registry/whatsapp/typing-indicator";

export default function Demo() {
  return (
    <div className="flex flex-col gap-3">
      <MessageBubble direction="in">
        <TypingIndicator />
      </MessageBubble>
      <span className="text-[13px] text-wa-text-muted">
        Sin globo: <TypingIndicator />
      </span>
    </div>
  );
}
