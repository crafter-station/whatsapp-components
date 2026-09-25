import type { ChatItem } from "@/registry/whatsapp/types";

const at = (hour: number, minute: number) =>
  new Date(2025, 0, 6, hour, minute, 0, 0);

/** Exercises every rich content type against the envelope fields. */
export const richConversation: ChatItem[] = [
  {
    kind: "message",
    id: "r1",
    direction: "in",
    timestamp: at(18, 12),
    content: {
      type: "image",
      url: "/perfume.svg",
      alt: "Perfume Violeta",
      caption: "¿Es este el que tienen?",
    },
  },
  {
    kind: "message",
    id: "r2",
    direction: "out",
    timestamp: at(18, 14),
    status: "read",
    replyTo: {
      id: "r1",
      author: "Camila",
      direction: "in",
      preview: "📷 Foto",
      thumbnailUrl: "/perfume.svg",
    },
    content: { type: "text", text: "¡Ese mismo! Te mando la ficha 👇" },
    reactions: [{ emoji: "😍", count: 2 }, { emoji: "🔥" }],
  },
  {
    kind: "message",
    id: "r3",
    direction: "out",
    timestamp: at(18, 15),
    status: "read",
    content: {
      type: "document",
      fileName: "ficha-violeta-50ml.pdf",
      pageCount: 3,
      byteSize: 486_000,
      caption: "Notas olfativas y duración.",
    },
  },
  {
    kind: "message",
    id: "r4",
    direction: "in",
    timestamp: at(18, 18),
    content: { type: "audio", durationSeconds: 27, played: false },
  },
  {
    kind: "message",
    id: "r5",
    direction: "out",
    timestamp: at(18, 20),
    status: "delivered",
    content: {
      type: "text",
      text: "Te dejo la tienda por si quieres pasar 🙂",
      preview: {
        url: "https://crafter.run/tienda",
        title: "Violeta · Perfumería artesanal",
        description:
          "Fragancias en pequeños lotes. Envíos el mismo día dentro de la ciudad.",
        siteName: "crafter.run",
      },
    },
  },
  {
    kind: "message",
    id: "r6",
    direction: "out",
    timestamp: at(18, 21),
    status: "sent",
    content: {
      type: "location",
      latitude: -12.12094,
      longitude: -77.0305,
      name: "Violeta · Miraflores",
      address: "Av. La Paz 1043, Lima",
    },
  },
];
