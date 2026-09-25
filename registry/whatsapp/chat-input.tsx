"use client";

import { type FormEvent, type KeyboardEvent, useState } from "react";
import { cn } from "./cn";

export type ChatInputProps = {
  /** Controlled value. Omit to let the component hold its own. */
  value?: string;
  onValueChange?: (value: string) => void;
  onSend?: (value: string) => void;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  /** Shows the mic button while the field is empty, as WhatsApp does. */
  voice?: boolean;
  className?: string;
};

export function ChatInput({
  value,
  onValueChange,
  onSend,
  defaultValue = "",
  placeholder = "Type a message",
  disabled,
  voice = true,
  className,
}: ChatInputProps) {
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = value !== undefined;
  const text = isControlled ? value : internal;

  const update = (next: string) => {
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  };

  const submit = (event?: FormEvent) => {
    event?.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend?.(trimmed);
    update("");
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  };

  const showMic = voice && text.trim().length === 0;

  return (
    <form
      onSubmit={submit}
      className={cn(
        "flex items-end gap-2 bg-wa-panel px-3 py-2 font-wa",
        className,
      )}
    >
      <IconButton label="Emoji">
        <EmojiIcon />
      </IconButton>

      <div className="flex min-w-0 flex-1 items-end rounded-[20px] bg-wa-bubble-in px-3 py-2">
        <textarea
          rows={1}
          value={text}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(event) => update(event.target.value)}
          onKeyDown={onKeyDown}
          className="max-h-24 w-full resize-none bg-transparent text-[15px] leading-5 text-wa-text outline-none placeholder:text-wa-text-muted disabled:opacity-60"
        />
        <IconButton label="Attach" className="-mr-1 shrink-0">
          <AttachIcon />
        </IconButton>
      </div>

      <button
        type="submit"
        disabled={disabled}
        aria-label={showMic ? "Record voice message" : "Send"}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-wa-accent text-wa-accent-text transition-opacity disabled:opacity-60"
      >
        {showMic ? <MicIcon /> : <SendIcon />}
      </button>
    </form>
  );
}

function IconButton({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full text-wa-panel-muted",
        className,
      )}
    >
      {children}
    </button>
  );
}

function EmojiIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 14.5c2 2 5 2 7 0" />
      <path d="M9 9.5h.01M15 9.5h.01" />
    </svg>
  );
}

function AttachIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 11.5l-7.6 7.6a4.6 4.6 0 0 1-6.5-6.5l8-8a3.1 3.1 0 0 1 4.3 4.4l-8 8a1.6 1.6 0 0 1-2.2-2.2l7.3-7.3" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="21"
      height="21"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M12 14.5a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5.5a3 3 0 0 0 3 3z" />
      <path d="M17.6 11.2a.9.9 0 0 0-1.8 0 3.8 3.8 0 0 1-7.6 0 .9.9 0 1 0-1.8 0 5.6 5.6 0 0 0 4.7 5.5V19h-2a.9.9 0 0 0 0 1.8h5.8a.9.9 0 0 0 0-1.8h-2v-2.3a5.6 5.6 0 0 0 4.7-5.5z" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="21"
      height="21"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M3.2 20.6l18.1-8.1a.5.5 0 0 0 0-.9L3.2 3.4a.5.5 0 0 0-.7.6l2.4 6.6c.07.2.25.34.46.37l8.9 1.05-8.9 1.05a.6.6 0 0 0-.46.37L2.5 20a.5.5 0 0 0 .7.6z" />
    </svg>
  );
}
