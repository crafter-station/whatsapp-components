import { MessageBubble } from "@/registry/whatsapp/message-bubble";
import { MessageMeta } from "@/registry/whatsapp/message-meta";

export default function Demo() {
  return (
    <div className="flex flex-col gap-3">
      <MessageBubble
        direction="in"
        meta={<MessageMeta timestamp={new Date(2025, 0, 6, 20, 2)} />}
      >
        ¡Hola! ¿Tienen el perfume Violeta?
      </MessageBubble>

      <MessageBubble
        direction="out"
        meta={
          <MessageMeta timestamp={new Date(2025, 0, 6, 20, 2)} status="read" />
        }
      >
        ¡Sí! Nos queda en stock 😍
      </MessageBubble>

      <MessageBubble direction="out" tail={false}>
        Sin cola, para los mensajes seguidos del mismo remitente.
      </MessageBubble>
    </div>
  );
}
