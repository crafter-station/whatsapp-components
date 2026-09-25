import { groupChatItems } from "@/registry/whatsapp/grouping";
import type { ChatItem, MessageContent } from "@/registry/whatsapp/types";

/**
 * Turns the builder's state back into source. Two shapes, because the library
 * has two: the declarative Conversation over a ChatItem[], and the primitives
 * written out by hand.
 */

const quote = (value: string) =>
  `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;

const dateLiteral = (date: Date) =>
  `new Date(${date.getFullYear()}, ${date.getMonth()}, ${date.getDate()}, ${date.getHours()}, ${date.getMinutes()})`;

function contentLiteral(content: MessageContent, indent: string): string {
  const entries: string[] = [`type: ${quote(content.type)}`];

  for (const [key, value] of Object.entries(content)) {
    if (key === "type" || value === undefined) continue;
    entries.push(
      `${key}: ${typeof value === "string" ? quote(value) : JSON.stringify(value)}`,
    );
  }

  return `{\n${entries.map((entry) => `${indent}  ${entry},`).join("\n")}\n${indent}}`;
}

function itemLiteral(item: ChatItem): string {
  const indent = "    ";
  const lines: string[] = [];

  if (item.kind === "date") {
    lines.push(
      `kind: "date"`,
      `id: ${quote(item.id)}`,
      `date: ${dateLiteral(item.date)}`,
    );
    if (item.label) lines.push(`label: ${quote(item.label)}`);
  } else if (item.kind === "system") {
    lines.push(
      `kind: "system"`,
      `id: ${quote(item.id)}`,
      `text: ${quote(item.text)}`,
    );
    if (item.tone) lines.push(`tone: ${quote(item.tone)}`);
  } else {
    lines.push(
      `kind: "message"`,
      `id: ${quote(item.id)}`,
      `direction: ${quote(item.direction)}`,
      `timestamp: ${dateLiteral(item.timestamp)}`,
    );
    if (item.status) lines.push(`status: ${quote(item.status)}`);
    if (item.author) lines.push(`author: ${quote(item.author)}`);
    lines.push(`content: ${contentLiteral(item.content, indent)}`);
  }

  return `  {\n${lines.map((line) => `${indent}${line},`).join("\n")}\n  }`;
}

export function toDeclarativeSource(items: ChatItem[]): string {
  return `import { ChatWindow } from "@/components/ui/whatsapp/chat-window";
import { Conversation } from "@/components/ui/whatsapp/conversation";
import { MessageList } from "@/components/ui/whatsapp/message-list";
import type { ChatItem } from "@/components/ui/whatsapp/types";

const items: ChatItem[] = [
${items.map(itemLiteral).join(",\n")},
];

export function Chat() {
  return (
    <ChatWindow className="h-[600px]">
      <MessageList>
        <Conversation items={items} />
      </MessageList>
    </ChatWindow>
  );
}
`;
}

function contentJsx(content: MessageContent): string {
  switch (content.type) {
    case "text":
      return content.text;
    case "product":
      return `<ProductCard title=${quote(content.title)} price=${quote(content.price)}${
        content.imageUrl ? ` imageUrl=${quote(content.imageUrl)}` : ""
      } />`;
    default:
      return `{/* ${content.type}: see the ${content.type} component */}`;
  }
}

export function toCompoundSource(items: ChatItem[]): string {
  const body = groupChatItems(items)
    .map((item) => {
      if (item.kind === "date") {
        return `        <DateDivider date={${dateLiteral(item.date)}}${
          item.label ? ` label=${quote(item.label)}` : ""
        } />`;
      }

      if (item.kind === "system") {
        return `        <SystemMessage${item.tone ? ` tone=${quote(item.tone)}` : ""}>${item.text}</SystemMessage>`;
      }

      const bubbles = item.messages
        .map((message, index) => {
          const meta = `<MessageMeta timestamp={${dateLiteral(message.timestamp)}}${
            message.direction === "out" && message.status
              ? ` status=${quote(message.status)}`
              : ""
          } />`;
          return `          <MessageBubble
            direction=${quote(message.direction)}${index === 0 ? "" : "\n            tail={false}"}
            meta={${meta}}
          >
            ${contentJsx(message.content)}
          </MessageBubble>`;
        })
        .join("\n");

      return `        <MessageGroup direction=${quote(item.direction)}>\n${bubbles}\n        </MessageGroup>`;
    })
    .join("\n");

  const usesProduct = items.some(
    (item) => item.kind === "message" && item.content.type === "product",
  );

  const imports = [
    "chat-window",
    "date-divider",
    "message-bubble",
    "message-group",
    "message-list",
    "message-meta",
    ...(usesProduct ? ["product-card"] : []),
    "system-message",
  ]
    .sort()
    .map((file) => {
      const symbol = file
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join("");
      return `import { ${symbol} } from "@/components/ui/whatsapp/${file}";`;
    })
    .join("\n");

  return `${imports}

export function Chat() {
  return (
    <ChatWindow className="h-[600px]">
      <MessageList>
${body}
      </MessageList>
    </ChatWindow>
  );
}
`;
}
