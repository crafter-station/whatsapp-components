import { ChatHeader } from "@/registry/whatsapp/chat-header";
import { ChatWindow } from "@/registry/whatsapp/chat-window";
import { MessageBubble } from "@/registry/whatsapp/message-bubble";
import { MessageList } from "@/registry/whatsapp/message-list";
import { PhoneFrame } from "@/registry/whatsapp/phone-frame";

export default function Demo() {
  return (
    <div className="flex flex-wrap justify-center gap-8">
      <PhoneFrame width={260} ratio={1.9}>
        <ChatWindow className="pt-6">
          <ChatHeader name="Valeria" presence="online" />
          <MessageList>
            <MessageBubble direction="in">Con notch</MessageBubble>
          </MessageList>
        </ChatWindow>
      </PhoneFrame>

      <PhoneFrame width={260} ratio={1.9} notch={false}>
        <ChatWindow>
          <ChatHeader name="Valeria" presence="online" />
          <MessageList>
            <MessageBubble direction="in">Sin notch</MessageBubble>
          </MessageList>
        </ChatWindow>
      </PhoneFrame>
    </div>
  );
}
