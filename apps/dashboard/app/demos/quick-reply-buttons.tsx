import { MessageBubble } from "@/registry/whatsapp/message-bubble";
import { MessageGroup } from "@/registry/whatsapp/message-group";
import { MessageMeta } from "@/registry/whatsapp/message-meta";
import { QuickReplyButtons } from "@/registry/whatsapp/quick-reply-buttons";

export default function Demo() {
  return (
    <MessageGroup direction="in">
      <MessageBubble
        direction="in"
        tail
        meta={<MessageMeta timestamp={new Date(2025, 0, 6, 11, 6)} />}
      >
        ¿En qué te ayudo?
      </MessageBubble>
      <QuickReplyButtons
        direction="in"
        actions={[
          { id: "size", label: "Ver tallas" },
          { id: "ship", label: "Costo de envío" },
          { id: "human", label: "Hablar con una persona" },
        ]}
      />
    </MessageGroup>
  );
}
