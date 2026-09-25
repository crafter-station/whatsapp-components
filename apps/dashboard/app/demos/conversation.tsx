import { Conversation } from "@/registry/whatsapp/conversation";
import { MessageList } from "@/registry/whatsapp/message-list";
import type { ChatItem } from "@/registry/whatsapp/types";

const items: ChatItem[] = [
  { kind: "date", id: "d", date: new Date(2025, 0, 6), label: "Today" },
  {
    kind: "message",
    id: "1",
    direction: "in",
    timestamp: new Date(2025, 0, 6, 20, 2),
    content: { type: "text", text: "¡Hola! ¿Tienen el perfume Violeta?" },
  },
  {
    kind: "message",
    id: "2",
    direction: "out",
    timestamp: new Date(2025, 0, 6, 20, 2),
    status: "read",
    content: {
      type: "product",
      title: "Perfume Violeta · 50 ml",
      price: "$ 65.000",
      imageUrl: "/perfume.svg",
      caption: "¡Sí! Nos queda en stock 😍",
    },
  },
  {
    kind: "message",
    id: "3",
    direction: "in",
    timestamp: new Date(2025, 0, 6, 20, 5),
    content: { type: "text", text: "¡Listo, ya pagué!" },
    reactions: [{ emoji: "🎉" }],
  },
  { kind: "system", id: "s", tone: "success", text: "Pago confirmado" },
];

export default function Demo() {
  return (
    <MessageList className="rounded-lg">
      <Conversation items={items} />
    </MessageList>
  );
}
