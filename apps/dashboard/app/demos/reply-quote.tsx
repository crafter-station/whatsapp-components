import { MessageBubble } from "@/registry/whatsapp/message-bubble";
import { MessageMeta } from "@/registry/whatsapp/message-meta";
import { ReplyQuote } from "@/registry/whatsapp/reply-quote";

export default function Demo() {
  return (
    <div className="flex flex-col gap-3">
      <MessageBubble
        direction="out"
        meta={
          <MessageMeta timestamp={new Date(2025, 0, 6, 18, 14)} status="read" />
        }
      >
        <ReplyQuote
          author="Camila"
          preview="📷 Foto"
          direction="in"
          thumbnailUrl="/perfume.svg"
        />
        ¡Ese mismo! Te mando la ficha 👇
      </MessageBubble>

      <MessageBubble direction="in">
        <ReplyQuote
          author="Valeria · Agente IA"
          preview="Perfecto, lo despachamos hoy mismo 📦"
          direction="out"
        />
        ¡Gracias!
      </MessageBubble>
    </div>
  );
}
