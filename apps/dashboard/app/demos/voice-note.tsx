import { MessageBubble } from "@/registry/whatsapp/message-bubble";
import { MessageMeta } from "@/registry/whatsapp/message-meta";
import { VoiceNote } from "@/registry/whatsapp/voice-note";

export default function Demo() {
  return (
    <div className="flex flex-col gap-3">
      <MessageBubble
        direction="in"
        meta={<MessageMeta timestamp={new Date(2025, 0, 6, 18, 18)} />}
      >
        <VoiceNote senderName="Camila" durationSeconds={27} unplayed />
      </MessageBubble>

      <MessageBubble
        direction="out"
        meta={
          <MessageMeta timestamp={new Date(2025, 0, 6, 18, 20)} status="read" />
        }
      >
        <VoiceNote
          senderName="Valeria"
          durationSeconds={41}
          progress={0.6}
          playing
        />
      </MessageBubble>
    </div>
  );
}
