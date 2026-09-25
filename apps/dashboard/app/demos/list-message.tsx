import { ListMessage } from "@/registry/whatsapp/list-message";
import { MessageBubble } from "@/registry/whatsapp/message-bubble";
import { MessageMeta } from "@/registry/whatsapp/message-meta";

const sections = [
  {
    title: "Eau de parfum",
    rows: [
      { id: "30", title: "30 ml", description: "$ 42.000" },
      { id: "50", title: "50 ml", description: "$ 65.000" },
    ],
  },
  {
    title: "Kits",
    rows: [{ id: "kit", title: "Kit descubrimiento", description: "5 × 2 ml" }],
  },
];

export default function Demo() {
  return (
    <div className="flex flex-col gap-4">
      <MessageBubble
        direction="out"
        meta={
          <MessageMeta timestamp={new Date(2025, 0, 6, 11, 4)} status="read" />
        }
      >
        <ListMessage
          title="Catálogo Violeta"
          body="Estos son los formatos disponibles esta semana."
          buttonLabel="Ver formatos"
          footer="Precios con IVA incluido."
          sections={sections}
        />
      </MessageBubble>

      <MessageBubble direction="out">
        <ListMessage
          body="Abierto: open es controlado, así que el estado vive en tu app."
          buttonLabel="Ver formatos"
          sections={sections}
          open
        />
      </MessageBubble>
    </div>
  );
}
