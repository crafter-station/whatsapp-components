/**
 * The envelope fields below are orthogonal to content: a voice note and a
 * product card are forwarded, quoted and read-receipted identically. Keeping
 * them out of the content union is what lets MessageGroup and MessageTicks
 * read a message without narrowing on what it contains.
 */

export type MessageDirection = "in" | "out";

export type MessageStatus = "pending" | "sent" | "delivered" | "read";

export type Reaction = {
  emoji: string;
  count?: number;
  reactedByMe?: boolean;
};

export type QuotedMessage = {
  id: string;
  author: string;
  direction: MessageDirection;
  preview: string;
  thumbnailUrl?: string;
};

export type LinkPreview = {
  url: string;
  title: string;
  description?: string;
  imageUrl?: string;
  siteName?: string;
};

export type TextContent = {
  type: "text";
  text: string;
  preview?: LinkPreview;
};

export type ImageContent = {
  type: "image";
  url: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
};

export type AudioContent = {
  type: "audio";
  durationSeconds: number;
  url?: string;
  /** Normalised 0..1 bar heights. Omitted renders a flat placeholder. */
  waveform?: number[];
  voiceNote?: boolean;
  played?: boolean;
  avatarUrl?: string;
};

export type DocumentContent = {
  type: "document";
  fileName: string;
  extension?: string;
  pageCount?: number;
  byteSize?: number;
  url?: string;
  caption?: string;
};

export type LocationContent = {
  type: "location";
  latitude: number;
  longitude: number;
  name?: string;
  address?: string;
  previewUrl?: string;
};

export type ProductContent = {
  type: "product";
  title: string;
  price: string;
  imageUrl?: string;
  imageAlt?: string;
  description?: string;
  caption?: string;
};

export type ListSectionRow = {
  id: string;
  title: string;
  description?: string;
};

export type ListSection = {
  title?: string;
  rows: ListSectionRow[];
};

export type ListContent = {
  type: "list";
  body: string;
  buttonLabel: string;
  sections: ListSection[];
  title?: string;
  footer?: string;
};

export type CtaAction = {
  id: string;
  label: string;
  kind?: "reply" | "url" | "call" | "copy";
  url?: string;
};

export type CtaContent = {
  type: "cta";
  body: string;
  actions: CtaAction[];
  title?: string;
  footer?: string;
};

export type PollOption = {
  id: string;
  label: string;
  votes?: number;
  votedByMe?: boolean;
};

export type PollContent = {
  type: "poll";
  question: string;
  options: PollOption[];
  multiple?: boolean;
  totalVotes?: number;
};

export type MessageContent =
  | TextContent
  | ImageContent
  | AudioContent
  | DocumentContent
  | LocationContent
  | ProductContent
  | ListContent
  | CtaContent
  | PollContent;

export type Message = {
  kind: "message";
  id: string;
  timestamp: Date;
  direction: MessageDirection;
  content: MessageContent;
  /** Only rendered for outgoing messages, matching WhatsApp. */
  status?: MessageStatus;
  author?: string;
  replyTo?: QuotedMessage;
  reactions?: Reaction[];
  forwarded?: boolean;
  starred?: boolean;
  edited?: boolean;
};

export type SystemNoticeTone = "neutral" | "success" | "warning" | "encryption";

export type SystemNotice = {
  kind: "system";
  id: string;
  text: string;
  tone?: SystemNoticeTone;
};

export type DateDividerItem = {
  kind: "date";
  id: string;
  date: Date;
  /** Overrides the derived Today / Yesterday / date label. */
  label?: string;
};

export type ChatItem = Message | SystemNotice | DateDividerItem;

export type PresenceState = "online" | "typing" | "recording" | "offline";
