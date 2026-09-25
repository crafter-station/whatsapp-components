import { LocationMessage } from "@/registry/whatsapp/location-message";
import { MessageBubble } from "@/registry/whatsapp/message-bubble";
import { MessageMeta } from "@/registry/whatsapp/message-meta";

export default function Demo() {
  return (
    <div className="flex flex-col gap-3">
      <MessageBubble
        direction="out"
        meta={
          <MessageMeta
            timestamp={new Date(2025, 0, 6, 18, 21)}
            status="delivered"
          />
        }
      >
        <LocationMessage
          latitude={-12.12094}
          longitude={-77.0305}
          name="Violeta · Miraflores"
          address="Av. La Paz 1043, Lima"
        />
      </MessageBubble>

      <MessageBubble direction="in">
        <LocationMessage latitude={-12.0464} longitude={-77.0428} />
      </MessageBubble>
    </div>
  );
}
