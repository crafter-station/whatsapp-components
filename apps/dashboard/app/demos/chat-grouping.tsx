import { groupChatItems, withDateDividers } from "@/registry/whatsapp/grouping";
import type { ChatItem } from "@/registry/whatsapp/types";

const at = (day: number, hour: number, minute: number) =>
  new Date(2025, 0, day, hour, minute);

const items: ChatItem[] = [
  {
    kind: "message",
    id: "a",
    direction: "in",
    timestamp: at(6, 20, 0),
    content: { type: "text", text: "a" },
  },
  {
    kind: "message",
    id: "b",
    direction: "in",
    timestamp: at(6, 20, 1),
    content: { type: "text", text: "b" },
  },
  {
    kind: "message",
    id: "c",
    direction: "out",
    timestamp: at(6, 20, 2),
    content: { type: "text", text: "c" },
  },
  {
    kind: "message",
    id: "d",
    direction: "out",
    timestamp: at(7, 9, 0),
    content: { type: "text", text: "d" },
  },
];

export default function Demo() {
  const grouped = groupChatItems(withDateDividers(items));

  return (
    <ol className="space-y-1 font-mono text-[13px] text-wa-text">
      {grouped.map((item) => (
        <li key={item.id}>
          {item.kind === "run"
            ? `run(${item.direction}) → ${item.messages.map((m) => m.id).join(", ")}`
            : `${item.kind}(${item.id})`}
        </li>
      ))}
    </ol>
  );
}
