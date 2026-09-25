import type { ChatItem } from "@/registry/whatsapp/types";

const at = (hour: number, minute: number) =>
  new Date(2025, 0, 6, hour, minute, 0, 0);

/** The reference conversation: an AI agent closing a sale over WhatsApp. */
export const demoConversation: ChatItem[] = [
  { kind: "date", id: "day", date: at(0, 0), label: "Today" },
  {
    kind: "system",
    id: "encryption",
    tone: "encryption",
    text: "Messages are end-to-end encrypted.",
  },
  {
    kind: "message",
    id: "m1",
    direction: "in",
    timestamp: at(20, 2),
    content: { type: "text", text: "¡Hola! ¿Tienen el perfume Violeta?" },
  },
  {
    kind: "message",
    id: "m2",
    direction: "out",
    timestamp: at(20, 2),
    status: "read",
    content: {
      type: "text",
      text: "¡Sí! Nos queda en stock 😍 Te lo muestro:",
    },
  },
  {
    kind: "message",
    id: "m3",
    direction: "out",
    timestamp: at(20, 3),
    status: "read",
    content: { type: "text", text: "Perfume Violeta · 50 ml — $ 65.000" },
  },
  {
    kind: "message",
    id: "m4",
    direction: "in",
    timestamp: at(20, 5),
    content: { type: "text", text: "¡Listo, ya pagué!" },
  },
  {
    kind: "system",
    id: "paid",
    tone: "success",
    text: "Pago confirmado",
  },
  {
    kind: "message",
    id: "m5",
    direction: "out",
    timestamp: at(20, 6),
    status: "delivered",
    content: { type: "text", text: "Perfecto, lo despachamos hoy mismo 📦" },
  },
];
