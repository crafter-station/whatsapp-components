import { DateDivider } from "@/registry/whatsapp/date-divider";
import { groupChatItems } from "@/registry/whatsapp/grouping";
import { MessageBubble } from "@/registry/whatsapp/message-bubble";
import { MessageGroup } from "@/registry/whatsapp/message-group";
import { MessageMeta } from "@/registry/whatsapp/message-meta";
import { SystemMessage } from "@/registry/whatsapp/system-message";
import type { ChatItem, MessageContent } from "@/registry/whatsapp/types";

/**
 * A preview of the declarative layer that ships in wave 3. For now it renders
 * text content only; the rich and commerce variants land with their
 * components.
 */
export function Transcript({ items }: { items: ChatItem[] }) {
  return (
    <>
      {groupChatItems(items).map((item) => {
        if (item.kind === "date") {
          return (
            <DateDivider key={item.id} date={item.date} label={item.label} />
          );
        }

        if (item.kind === "system") {
          return (
            <SystemMessage key={item.id} tone={item.tone}>
              {item.text}
            </SystemMessage>
          );
        }

        return (
          <MessageGroup
            key={item.id}
            direction={item.direction}
            author={item.author}
          >
            {item.messages.map((message, index) => (
              <MessageBubble
                key={message.id}
                direction={message.direction}
                tail={index === 0}
                meta={
                  <MessageMeta
                    timestamp={message.timestamp}
                    status={
                      message.direction === "out" ? message.status : undefined
                    }
                    edited={message.edited}
                  />
                }
              >
                {renderContent(message.content)}
              </MessageBubble>
            ))}
          </MessageGroup>
        );
      })}
    </>
  );
}

function renderContent(content: MessageContent) {
  return content.type === "text" ? content.text : null;
}
