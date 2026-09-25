import { MessageTicks } from "@/registry/whatsapp/message-ticks";
import type { MessageStatus } from "@/registry/whatsapp/types";

const STATUSES: MessageStatus[] = ["pending", "sent", "delivered", "read"];

export default function Demo() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      {STATUSES.map((status) => (
        <span key={status} className="flex items-center gap-2">
          <MessageTicks status={status} />
          <code className="text-[13px] text-wa-text-muted">{status}</code>
        </span>
      ))}
    </div>
  );
}
