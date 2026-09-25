import { CtaButton } from "@/registry/whatsapp/cta-button";
import { MessageBubble } from "@/registry/whatsapp/message-bubble";
import { MessageMeta } from "@/registry/whatsapp/message-meta";

export default function Demo() {
  return (
    <MessageBubble
      direction="out"
      meta={
        <MessageMeta
          timestamp={new Date(2025, 0, 6, 20, 6)}
          status="delivered"
        />
      }
    >
      Perfecto, lo despachamos hoy mismo 📦
      <span className="-mx-[9px] -mb-[6px] mt-2 block">
        <CtaButton
          action={{
            id: "track",
            label: "Seguir mi pedido",
            kind: "url",
            url: "#",
          }}
        />
        <CtaButton
          action={{ id: "copy", label: "Copiar N.° de orden", kind: "copy" }}
        />
        <CtaButton
          action={{
            id: "call",
            label: "Llamar a la tienda",
            kind: "call",
            url: "tel:+5115550000",
          }}
        />
      </span>
    </MessageBubble>
  );
}
