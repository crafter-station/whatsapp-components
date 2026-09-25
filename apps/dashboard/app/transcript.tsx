import { AudioMessage } from "@/registry/whatsapp/audio-message";
import { DateDivider } from "@/registry/whatsapp/date-divider";
import { DocumentMessage } from "@/registry/whatsapp/document-message";
import { groupChatItems } from "@/registry/whatsapp/grouping";
import { ImageMessage } from "@/registry/whatsapp/image-message";
import { LinkPreview } from "@/registry/whatsapp/link-preview";
import { LocationMessage } from "@/registry/whatsapp/location-message";
import { MessageBubble } from "@/registry/whatsapp/message-bubble";
import { MessageGroup } from "@/registry/whatsapp/message-group";
import { MessageMeta } from "@/registry/whatsapp/message-meta";
import { Reactions } from "@/registry/whatsapp/reactions";
import { ReplyQuote } from "@/registry/whatsapp/reply-quote";
import { SystemMessage } from "@/registry/whatsapp/system-message";
import type {
  ChatItem,
  Message,
  MessageContent,
} from "@/registry/whatsapp/types";

/**
 * A preview of the declarative layer that ships in wave 3. Commerce content
 * still falls through; everything else renders.
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
              <Bubble key={message.id} message={message} tail={index === 0} />
            ))}
          </MessageGroup>
        );
      })}
    </>
  );
}

function Bubble({ message, tail }: { message: Message; tail: boolean }) {
  const hasReactions = (message.reactions?.length ?? 0) > 0;

  return (
    <MessageBubble
      direction={message.direction}
      tail={tail}
      className={hasReactions ? "mb-3.5" : undefined}
      meta={
        <MessageMeta
          timestamp={message.timestamp}
          status={message.direction === "out" ? message.status : undefined}
          edited={message.edited}
        />
      }
    >
      {message.replyTo ? (
        <ReplyQuote
          author={message.replyTo.author}
          preview={message.replyTo.preview}
          direction={message.replyTo.direction}
          thumbnailUrl={message.replyTo.thumbnailUrl}
        />
      ) : null}
      {renderContent(message.content)}
      {hasReactions ? (
        <Reactions
          reactions={message.reactions ?? []}
          direction={message.direction}
        />
      ) : null}
    </MessageBubble>
  );
}

function renderContent(content: MessageContent) {
  switch (content.type) {
    case "text":
      return (
        <>
          {content.preview ? <LinkPreview {...content.preview} /> : null}
          {content.text}
        </>
      );
    case "image":
      return (
        <ImageMessage
          src={content.url}
          alt={content.alt}
          caption={content.caption}
          width={content.width}
          height={content.height}
        />
      );
    case "audio":
      return (
        <AudioMessage
          durationSeconds={content.durationSeconds}
          waveform={content.waveform}
          unplayed={content.played === false}
        />
      );
    case "document":
      return (
        <DocumentMessage
          fileName={content.fileName}
          extension={content.extension}
          pageCount={content.pageCount}
          byteSize={content.byteSize}
          href={content.url}
          caption={content.caption}
        />
      );
    case "location":
      return (
        <LocationMessage
          latitude={content.latitude}
          longitude={content.longitude}
          name={content.name}
          address={content.address}
          previewUrl={content.previewUrl}
        />
      );
    default:
      return null;
  }
}
