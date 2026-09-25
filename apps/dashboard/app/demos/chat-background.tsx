import { ChatBackground } from "@/registry/whatsapp/chat-background";
import { MessageBubble } from "@/registry/whatsapp/message-bubble";

export default function Demo() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="relative h-40 overflow-hidden rounded-lg">
        <ChatBackground />
        <div className="relative p-3">
          <MessageBubble direction="in">Con garabatos</MessageBubble>
        </div>
      </div>
      <div className="relative h-40 overflow-hidden rounded-lg">
        <ChatBackground pattern={false} />
        <div className="relative p-3">
          <MessageBubble direction="in">Sin garabatos</MessageBubble>
        </div>
      </div>
    </div>
  );
}
