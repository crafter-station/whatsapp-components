import { MessageBubble } from "@/registry/whatsapp/message-bubble";
import { MessageMeta } from "@/registry/whatsapp/message-meta";

const sentAt = new Date(2025, 0, 6, 20, 2);

export default function Demo() {
  return (
    <div className="flex flex-col gap-3">
      <MessageBubble
        direction="out"
        meta={<MessageMeta timestamp={sentAt} status="read" />}
      >
        Corto: la hora entra en la última línea.
      </MessageBubble>

      <MessageBubble
        direction="out"
        meta={<MessageMeta timestamp={sentAt} status="delivered" edited />}
      >
        Cuando el texto llena el ancho hasta el borde mismo del globo, la hora
        baja sola a su propia línea.
      </MessageBubble>

      <MessageBubble
        direction="out"
        meta={
          <MessageMeta
            timestamp={sentAt}
            status="sent"
            timeFormat={{ hour12: false }}
          />
        }
      >
        Reloj de 24 horas.
      </MessageBubble>
    </div>
  );
}
