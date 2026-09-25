import { LinkPreview } from "@/registry/whatsapp/link-preview";
import { MessageBubble } from "@/registry/whatsapp/message-bubble";
import { MessageMeta } from "@/registry/whatsapp/message-meta";

export default function Demo() {
  return (
    <div className="flex flex-col gap-3">
      <MessageBubble
        direction="out"
        meta={
          <MessageMeta timestamp={new Date(2025, 0, 6, 18, 20)} status="read" />
        }
      >
        <LinkPreview
          url="https://crafter.run/tienda"
          title="Violeta · Perfumería artesanal"
          description="Fragancias en pequeños lotes. Envíos el mismo día dentro de la ciudad."
          imageUrl="/perfume.svg"
        />
        Te dejo la tienda por si quieres pasar 🙂
      </MessageBubble>

      <MessageBubble direction="in">
        <LinkPreview
          url="https://crafter.run/violeta-50ml"
          title="Perfume Violeta 50 ml"
          imageUrl="/perfume.svg"
          large
        />
        Este es el enlace directo.
      </MessageBubble>
    </div>
  );
}
