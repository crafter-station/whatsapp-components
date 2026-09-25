import { MessageBubble } from "@/registry/whatsapp/message-bubble";
import { MessageList } from "@/registry/whatsapp/message-list";

export default function Demo() {
  return (
    <MessageList className="h-[260px] rounded-lg">
      <MessageBubble direction="in">
        Scrolls on its own, wallpaper included.
      </MessageBubble>
      <MessageBubble direction="out">
        Pass pattern={false} for a flat wallpaper.
      </MessageBubble>
      <MessageBubble direction="in">
        Horizontal padding is a percentage, so the transcript keeps
        WhatsApp&rsquo;s margins at any width.
      </MessageBubble>
    </MessageList>
  );
}
