import { MessageBubble } from "@/registry/whatsapp/message-bubble";
import { MessageMeta } from "@/registry/whatsapp/message-meta";
import { ProductCard } from "@/registry/whatsapp/product-card";

export default function Demo() {
  return (
    <div className="flex flex-col gap-3">
      <MessageBubble
        direction="out"
        meta={
          <MessageMeta timestamp={new Date(2025, 0, 6, 20, 2)} status="read" />
        }
      >
        <span className="mb-1.5 block">
          ¡Sí! Nos queda en stock 😍 Te lo muestro:
        </span>
        <ProductCard
          title="Perfume Violeta · 50 ml"
          price="$ 65.000"
          imageUrl="/perfume.svg"
          imageAlt="Perfume Violeta"
        />
      </MessageBubble>

      <MessageBubble direction="in">
        <ProductCard
          stacked
          title="Kit descubrimiento"
          price="$ 38.000"
          imageUrl="/perfume.svg"
          description="Cinco muestras de 2 ml, una por familia olfativa."
        />
      </MessageBubble>
    </div>
  );
}
