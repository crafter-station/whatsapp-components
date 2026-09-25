import { ImageMessage } from "@/registry/whatsapp/image-message";
import { MessageBubble } from "@/registry/whatsapp/message-bubble";
import { MessageMeta } from "@/registry/whatsapp/message-meta";

export default function Demo() {
  return (
    <div className="flex flex-col gap-3">
      <MessageBubble
        direction="in"
        meta={<MessageMeta timestamp={new Date(2025, 0, 6, 18, 12)} />}
      >
        <ImageMessage
          src="/perfume.svg"
          alt="Perfume Violeta"
          caption="¿Es este el que tienen?"
        />
      </MessageBubble>

      <MessageBubble
        direction="out"
        meta={
          <MessageMeta timestamp={new Date(2025, 0, 6, 18, 13)} status="read" />
        }
      >
        <ImageMessage src="/perfume.svg" alt="Perfume Violeta" />
      </MessageBubble>
    </div>
  );
}
