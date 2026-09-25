import { MessageBubble } from "@/registry/whatsapp/message-bubble";
import { MessageGroup } from "@/registry/whatsapp/message-group";
import { MessageMeta } from "@/registry/whatsapp/message-meta";

const at = (minute: number) => new Date(2025, 0, 6, 20, minute);

export default function Demo() {
  return (
    <div className="flex flex-col gap-3">
      <MessageGroup direction="in" author="Camila">
        <MessageBubble direction="in" tail>
          Primero del grupo: lleva cola.
        </MessageBubble>
        <MessageBubble direction="in" tail={false}>
          Los siguientes no.
        </MessageBubble>
        <MessageBubble
          direction="in"
          tail={false}
          meta={<MessageMeta timestamp={at(4)} />}
        >
          Y el espaciado se aprieta dentro del grupo.
        </MessageBubble>
      </MessageGroup>

      <MessageGroup direction="out">
        <MessageBubble
          direction="out"
          tail
          meta={<MessageMeta timestamp={at(5)} status="read" />}
        >
          Cambia el remitente, empieza otro grupo.
        </MessageBubble>
      </MessageGroup>
    </div>
  );
}
