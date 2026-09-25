import { MessageBubble } from "@/registry/whatsapp/message-bubble";
import { MessageMeta } from "@/registry/whatsapp/message-meta";
import { Reactions } from "@/registry/whatsapp/reactions";

export default function Demo() {
  return (
    <div className="flex flex-col gap-5">
      <MessageBubble
        direction="out"
        className="mb-3.5"
        meta={
          <MessageMeta timestamp={new Date(2025, 0, 6, 18, 14)} status="read" />
        }
      >
        ¡Ese mismo! Te mando la ficha 👇
        <Reactions
          direction="out"
          reactions={[{ emoji: "😍", count: 2 }, { emoji: "🔥" }]}
        />
      </MessageBubble>

      <MessageBubble direction="in" className="mb-3.5">
        Una sola reacción, sin contador.
        <Reactions reactions={[{ emoji: "👍", reactedByMe: true }]} />
      </MessageBubble>
    </div>
  );
}
