import type { ComponentType } from "react";
import AudioMessageDemo from "./audio-message";
import ChatAvatarDemo from "./chat-avatar";
import ChatBackgroundDemo from "./chat-background";
import ChatGroupingDemo from "./chat-grouping";
import ChatHeaderDemo from "./chat-header";
import ChatInputDemo from "./chat-input";
import ChatWindowDemo from "./chat-window";
import ConversationDemo from "./conversation";
import CtaButtonDemo from "./cta-button";
import DateDividerDemo from "./date-divider";
import DocumentMessageDemo from "./document-message";
import ImageMessageDemo from "./image-message";
import LinkPreviewDemo from "./link-preview";
import ListMessageDemo from "./list-message";
import LocationMessageDemo from "./location-message";
import MessageBubbleDemo from "./message-bubble";
import MessageGroupDemo from "./message-group";
import MessageListDemo from "./message-list";
import MessageMetaDemo from "./message-meta";
import MessageTicksDemo from "./message-ticks";
import PhoneFrameDemo from "./phone-frame";
import PollDemo from "./poll";
import ProductCardDemo from "./product-card";
import QuickReplyButtonsDemo from "./quick-reply-buttons";
import ReactionsDemo from "./reactions";
import ReplyQuoteDemo from "./reply-quote";
import SystemMessageDemo from "./system-message";
import TypingIndicatorDemo from "./typing-indicator";
import VoiceNoteDemo from "./voice-note";
import WhatsappKitDemo from "./whatsapp-kit";
import WhatsappTokensDemo from "./whatsapp-tokens";

/** Explicit, because a dynamic import path defeats bundler static analysis. */
export const demos: Record<string, ComponentType> = {
  "audio-message": AudioMessageDemo,
  "chat-avatar": ChatAvatarDemo,
  "chat-background": ChatBackgroundDemo,
  "chat-grouping": ChatGroupingDemo,
  "chat-header": ChatHeaderDemo,
  "chat-input": ChatInputDemo,
  "chat-window": ChatWindowDemo,
  conversation: ConversationDemo,
  "cta-button": CtaButtonDemo,
  "date-divider": DateDividerDemo,
  "document-message": DocumentMessageDemo,
  "image-message": ImageMessageDemo,
  "link-preview": LinkPreviewDemo,
  "list-message": ListMessageDemo,
  "location-message": LocationMessageDemo,
  "message-bubble": MessageBubbleDemo,
  "message-group": MessageGroupDemo,
  "message-list": MessageListDemo,
  "message-meta": MessageMetaDemo,
  "message-ticks": MessageTicksDemo,
  "phone-frame": PhoneFrameDemo,
  poll: PollDemo,
  "product-card": ProductCardDemo,
  "quick-reply-buttons": QuickReplyButtonsDemo,
  reactions: ReactionsDemo,
  "reply-quote": ReplyQuoteDemo,
  "system-message": SystemMessageDemo,
  "typing-indicator": TypingIndicatorDemo,
  "voice-note": VoiceNoteDemo,
  "whatsapp-kit": WhatsappKitDemo,
  "whatsapp-tokens": WhatsappTokensDemo,
};
