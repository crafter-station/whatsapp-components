import type { ReactNode } from "react";
import { AudioMessage } from "./audio-message";
import { cn } from "./cn";
import { CtaButton } from "./cta-button";
import { DateDivider } from "./date-divider";
import { DocumentMessage } from "./document-message";
import type { DateDividerOptions, TimeFormatOptions } from "./format-time";
import { type GroupOptions, groupChatItems } from "./grouping";
import { ImageMessage } from "./image-message";
import { LinkPreview } from "./link-preview";
import { ListMessage } from "./list-message";
import { LocationMessage } from "./location-message";
import { MessageBubble } from "./message-bubble";
import { MessageGroup } from "./message-group";
import { MessageMeta } from "./message-meta";
import { Poll } from "./poll";
import { ProductCard } from "./product-card";
import { Reactions } from "./reactions";
import { ReplyQuote } from "./reply-quote";
import { SystemMessage } from "./system-message";
import type { ChatItem, Message, MessageContent } from "./types";

export type ConversationProps = {
  items: ChatItem[];
  /** Reference point for Today / Yesterday. */
  now?: Date;
  dateLabels?: DateDividerOptions;
  timeFormat?: TimeFormatOptions;
  groupOptions?: GroupOptions;
  /** Return undefined to fall through to the built-in renderer. */
  renderContent?: (
    content: MessageContent,
    message: Message,
  ) => ReactNode | undefined;
  className?: string;
};

/**
 * The thin declarative layer over the primitives. Everything it does you can
 * do by hand with MessageGroup and MessageBubble; this exists so a serialised
 * ChatItem[] can be rendered without writing the map yourself.
 */
export function Conversation({
  items,
  now,
  dateLabels,
  timeFormat,
  groupOptions,
  renderContent,
  className,
}: ConversationProps) {
  const body = groupChatItems(items, groupOptions).map((item) => {
    if (item.kind === "date") {
      return (
        <DateDivider
          key={item.id}
          date={item.date}
          label={item.label}
          now={now}
          labels={dateLabels}
        />
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
          <ConversationBubble
            key={message.id}
            message={message}
            tail={index === 0}
            timeFormat={timeFormat}
            renderContent={renderContent}
          />
        ))}
      </MessageGroup>
    );
  });

  if (className) {
    return <div className={cn("flex flex-col gap-3", className)}>{body}</div>;
  }

  return body;
}

function ConversationBubble({
  message,
  tail,
  timeFormat,
  renderContent,
}: {
  message: Message;
  tail: boolean;
  timeFormat?: TimeFormatOptions;
  renderContent?: ConversationProps["renderContent"];
}) {
  const hasReactions = (message.reactions?.length ?? 0) > 0;
  const custom = renderContent?.(message.content, message);

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
          timeFormat={timeFormat}
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
      {custom === undefined ? defaultContent(message.content) : custom}
      {hasReactions ? (
        <Reactions
          reactions={message.reactions ?? []}
          direction={message.direction}
        />
      ) : null}
    </MessageBubble>
  );
}

function defaultContent(content: MessageContent): ReactNode {
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

    case "product":
      return (
        <>
          <ProductCard
            title={content.title}
            price={content.price}
            imageUrl={content.imageUrl}
            imageAlt={content.imageAlt}
            description={content.description}
          />
          {content.caption}
        </>
      );

    case "list":
      return (
        <ListMessage
          body={content.body}
          buttonLabel={content.buttonLabel}
          sections={content.sections}
          title={content.title}
          footer={content.footer}
        />
      );

    case "cta":
      return (
        <>
          {content.title ? (
            <span className="mb-0.5 block text-[15px] font-semibold leading-[20px]">
              {content.title}
            </span>
          ) : null}
          <span className="block">{content.body}</span>
          {content.footer ? (
            <span className="mt-1 block text-[12.5px] leading-[17px] text-wa-text-muted">
              {content.footer}
            </span>
          ) : null}
          <span className="-mx-[9px] -mb-[6px] mt-2 block">
            {content.actions.map((action) => (
              <CtaButton key={action.id} action={action} />
            ))}
          </span>
        </>
      );

    case "poll":
      return (
        <Poll
          question={content.question}
          options={content.options}
          multiple={content.multiple}
          totalVotes={content.totalVotes}
        />
      );
  }
}
