import registry from "@/registry.json";
import propsByType from "../props.generated.json";

export type PropDoc = {
  name: string;
  type: string;
  required: boolean;
  description?: string;
  defaultValue?: string;
};

export type DocItem = {
  name: string;
  title: string;
  description: string;
  type: string;
  tags: string[];
  files: string[];
  dependencies: string[];
  propsTypeName?: string;
  props: PropDoc[];
};

const PROPS: Record<string, PropDoc[]> = propsByType;

const pascal = (name: string) =>
  name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");

export const docItems: DocItem[] = registry.items.map((item) => {
  const propsTypeName = `${pascal(item.name)}Props`;
  const props = PROPS[propsTypeName];

  return {
    name: item.name,
    title: item.title,
    description: item.description,
    type: item.type,
    tags: item.meta?.tags ?? [],
    files: item.files.map((file) => file.path),
    dependencies: "dependencies" in item ? (item.dependencies ?? []) : [],
    ...(props ? { propsTypeName } : {}),
    props: props ?? [],
  };
});

export const docItemsByName = new Map(
  docItems.map((item) => [item.name, item]),
);

/** Sidebar order: the whole kit first, then the pieces by role. */
export const DOC_SECTIONS: { title: string; items: string[] }[] = [
  { title: "Start here", items: ["whatsapp-kit", "conversation"] },
  {
    title: "Shell",
    items: [
      "chat-window",
      "chat-header",
      "chat-avatar",
      "chat-background",
      "message-list",
      "chat-input",
      "phone-frame",
    ],
  },
  {
    title: "Messages",
    items: [
      "message-bubble",
      "message-group",
      "message-meta",
      "message-ticks",
      "date-divider",
      "system-message",
      "typing-indicator",
      "reply-quote",
      "reactions",
    ],
  },
  {
    title: "Rich content",
    items: [
      "image-message",
      "audio-message",
      "voice-note",
      "document-message",
      "location-message",
      "link-preview",
    ],
  },
  {
    title: "Commerce",
    items: [
      "product-card",
      "quick-reply-buttons",
      "cta-button",
      "list-message",
      "poll",
    ],
  },
  { title: "Foundations", items: ["whatsapp-tokens", "chat-grouping"] },
];

export function installCommand(name: string): string {
  return `npx shadcn@latest add https://whatsapp-components.crafter.run/r/${name}.json`;
}
