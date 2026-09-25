import { MessageBubble } from "@/registry/whatsapp/message-bubble";
import { MessageMeta } from "@/registry/whatsapp/message-meta";
import { Poll } from "@/registry/whatsapp/poll";

export default function Demo() {
  return (
    <MessageBubble
      direction="in"
      meta={<MessageMeta timestamp={new Date(2025, 0, 6, 9, 30)} />}
    >
      <Poll
        question="¿Qué aroma lanzamos primero?"
        options={[
          { id: "a", label: "Violeta nocturna", votes: 42 },
          { id: "b", label: "Cítrico andino", votes: 27, votedByMe: true },
          { id: "c", label: "Madera húmeda", votes: 11 },
        ]}
        labels={{ single: "Elige una", votes: (n) => `${n} votos` }}
      />
    </MessageBubble>
  );
}
