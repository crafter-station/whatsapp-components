import { DocumentMessage } from "@/registry/whatsapp/document-message";
import { MessageBubble } from "@/registry/whatsapp/message-bubble";
import { MessageMeta } from "@/registry/whatsapp/message-meta";

export default function Demo() {
  return (
    <div className="flex flex-col gap-3">
      <MessageBubble
        direction="out"
        meta={
          <MessageMeta timestamp={new Date(2025, 0, 6, 18, 15)} status="read" />
        }
      >
        <DocumentMessage
          fileName="ficha-violeta-50ml.pdf"
          pageCount={3}
          byteSize={486_000}
          caption="Notas olfativas y duración."
        />
      </MessageBubble>

      <MessageBubble direction="in">
        <DocumentMessage fileName="orden-2291.csv" byteSize={2_400} />
      </MessageBubble>
    </div>
  );
}
