import { ChatHeader } from "@/registry/whatsapp/chat-header";
import { ChatInput } from "@/registry/whatsapp/chat-input";
import { ChatWindow } from "@/registry/whatsapp/chat-window";
import { MessageBubble } from "@/registry/whatsapp/message-bubble";
import { MessageList } from "@/registry/whatsapp/message-list";

export default function Demo() {
  return (
    <ChatWindow className="h-[360px] overflow-hidden rounded-lg">
      <ChatHeader name="Valeria · Agente IA" presence="online" />
      <MessageList>
        <MessageBubble direction="in">
          ChatWindow sets the theme, the wallpaper and the font.
        </MessageBubble>
        <MessageBubble direction="out">
          Everything inside inherits from it.
        </MessageBubble>
      </MessageList>
      <ChatInput placeholder="Escribe un mensaje" />
    </ChatWindow>
  );
}
