import { ChatHeader } from "@/registry/whatsapp/chat-header";
import { ChatInput } from "@/registry/whatsapp/chat-input";
import { ChatWindow } from "@/registry/whatsapp/chat-window";
import { Conversation } from "@/registry/whatsapp/conversation";
import { MessageList } from "@/registry/whatsapp/message-list";
import { PhoneFrame } from "@/registry/whatsapp/phone-frame";
import { demoConversation } from "../demo-conversation";
import { renderProductLead } from "../render-product-lead";

export default function Demo() {
  return (
    <div className="flex justify-center">
      <PhoneFrame width={300} ratio={1.95}>
        <ChatWindow>
          <ChatHeader
            className="pt-9"
            name="Valeria · Agente IA"
            presence="online"
            presenceLabel="en línea"
          />
          <MessageList>
            <Conversation
              items={demoConversation}
              renderContent={renderProductLead}
            />
          </MessageList>
          <ChatInput placeholder="Escribe un mensaje" />
        </ChatWindow>
      </PhoneFrame>
    </div>
  );
}
