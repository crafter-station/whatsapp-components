import { AudioMessage } from "@/registry/whatsapp/audio-message";
import { MessageBubble } from "@/registry/whatsapp/message-bubble";
import { MessageMeta } from "@/registry/whatsapp/message-meta";

export default function Demo() {
  return (
    <div className="flex flex-col gap-3">
      <MessageBubble
        direction="in"
        meta={<MessageMeta timestamp={new Date(2025, 0, 6, 18, 18)} />}
      >
        <AudioMessage durationSeconds={27} unplayed />
      </MessageBubble>

      <MessageBubble
        direction="out"
        meta={
          <MessageMeta timestamp={new Date(2025, 0, 6, 18, 19)} status="read" />
        }
      >
        <AudioMessage durationSeconds={95} progress={0.45} playing />
      </MessageBubble>
    </div>
  );
}
