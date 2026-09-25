"use client";

import { useMemo, useState } from "react";
import { ChatHeader } from "@/registry/whatsapp/chat-header";
import { ChatWindow } from "@/registry/whatsapp/chat-window";
import { Conversation } from "@/registry/whatsapp/conversation";
import { MessageList } from "@/registry/whatsapp/message-list";
import { whatsappThemeList } from "@/registry/whatsapp/themes";
import type {
  ChatItem,
  MessageDirection,
  MessageStatus,
} from "@/registry/whatsapp/types";
import { CopyButton } from "../components/copy-button";
import { Highlight } from "../components/highlight";
import { toCompoundSource, toDeclarativeSource } from "./export";

const at = (hour: number, minute: number) =>
  new Date(2025, 0, 6, hour, minute, 0, 0);

const INITIAL: ChatItem[] = [
  { kind: "date", id: "d0", date: at(0, 0), label: "Today" },
  {
    kind: "message",
    id: "m0",
    direction: "in",
    timestamp: at(20, 2),
    content: { type: "text", text: "¡Hola! ¿Tienen el perfume Violeta?" },
  },
  {
    kind: "message",
    id: "m1",
    direction: "out",
    timestamp: at(20, 2),
    status: "read",
    content: {
      type: "product",
      title: "Perfume Violeta · 50 ml",
      price: "$ 65.000",
      imageUrl: "/perfume.svg",
      caption: "¡Sí! Nos queda en stock 😍",
    },
  },
  { kind: "system", id: "s0", tone: "success", text: "Pago confirmado" },
];

type Tab = "declarative" | "compound";

export function Builder() {
  const [items, setItems] = useState<ChatItem[]>(INITIAL);
  const [theme, setTheme] = useState("light");
  const [tab, setTab] = useState<Tab>("declarative");
  const [nextId, setNextId] = useState(1);

  const source = useMemo(
    () =>
      tab === "declarative"
        ? toDeclarativeSource(items)
        : toCompoundSource(items),
    [items, tab],
  );

  const add = (item: ChatItem) => {
    setItems((current) => [...current, item]);
    setNextId((value) => value + 1);
  };

  const lastTime = () => {
    const messages = items.filter((item) => item.kind === "message");
    const last = messages.at(-1);
    const base = last?.kind === "message" ? last.timestamp : at(20, 0);
    return new Date(base.getTime() + 60_000);
  };

  const update = (id: string, patch: Partial<ChatItem>) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? ({ ...item, ...patch } as ChatItem) : item,
      ),
    );
  };

  const remove = (id: string) =>
    setItems((current) => current.filter((item) => item.id !== id));

  const move = (index: number, delta: number) => {
    setItems((current) => {
      const next = [...current];
      const target = index + delta;
      if (target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  return (
    /*
      grid-cols-1 is not redundant: without an explicit track the single
      column sizes to max-content, and the code block's longest line drags
      the whole builder past the viewport on a phone.
    */
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_380px]">
      <div className="min-w-0 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            onClick={() =>
              add({
                kind: "message",
                id: `m${nextId}`,
                direction: "in",
                timestamp: lastTime(),
                content: { type: "text", text: "Mensaje entrante" },
              })
            }
          >
            + Incoming
          </Button>
          <Button
            onClick={() =>
              add({
                kind: "message",
                id: `m${nextId}`,
                direction: "out",
                timestamp: lastTime(),
                status: "read",
                content: { type: "text", text: "Mensaje saliente" },
              })
            }
          >
            + Outgoing
          </Button>
          <Button
            onClick={() =>
              add({
                kind: "message",
                id: `m${nextId}`,
                direction: "out",
                timestamp: lastTime(),
                status: "delivered",
                content: {
                  type: "product",
                  title: "Producto nuevo",
                  price: "$ 0",
                  imageUrl: "/perfume.svg",
                },
              })
            }
          >
            + Product
          </Button>
          <Button
            onClick={() =>
              add({
                kind: "system",
                id: `s${nextId}`,
                tone: "success",
                text: "Pago confirmado",
              })
            }
          >
            + System
          </Button>
          <Button onClick={() => setItems(INITIAL)}>Reset</Button>
        </div>

        <ul className="space-y-2">
          {items.map((item, index) => (
            <li
              key={item.id}
              className="rounded-lg border border-[var(--page-border)] bg-white p-3"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded bg-black/[0.05] px-1.5 py-0.5 font-mono text-[11px] uppercase tracking-wide text-[var(--page-muted)]">
                  {item.kind === "message" ? item.content.type : item.kind}
                </span>

                {item.kind === "message" ? (
                  <>
                    <Select
                      value={item.direction}
                      onChange={(value) =>
                        update(item.id, {
                          direction: value as MessageDirection,
                        })
                      }
                      options={["in", "out"]}
                    />
                    {item.direction === "out" ? (
                      <Select
                        value={item.status ?? "read"}
                        onChange={(value) =>
                          update(item.id, { status: value as MessageStatus })
                        }
                        options={["pending", "sent", "delivered", "read"]}
                      />
                    ) : null}
                  </>
                ) : null}

                <span className="flex-1" />
                <IconAction label="Move up" onClick={() => move(index, -1)}>
                  ↑
                </IconAction>
                <IconAction label="Move down" onClick={() => move(index, 1)}>
                  ↓
                </IconAction>
                <IconAction label="Remove" onClick={() => remove(item.id)}>
                  ✕
                </IconAction>
              </div>

              {item.kind === "message" && item.content.type === "text" ? (
                <input
                  value={item.content.text}
                  onChange={(event) =>
                    update(item.id, {
                      content: { type: "text", text: event.target.value },
                    } as Partial<ChatItem>)
                  }
                  className="mt-2 w-full rounded border border-[var(--page-border)] px-2 py-1.5 text-sm"
                />
              ) : null}

              {item.kind === "message" && item.content.type === "product" ? (
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <input
                    value={item.content.title}
                    onChange={(event) =>
                      update(item.id, {
                        content: {
                          ...item.content,
                          title: event.target.value,
                        },
                      } as Partial<ChatItem>)
                    }
                    className="rounded border border-[var(--page-border)] px-2 py-1.5 text-sm"
                  />
                  <input
                    value={item.content.price}
                    onChange={(event) =>
                      update(item.id, {
                        content: {
                          ...item.content,
                          price: event.target.value,
                        },
                      } as Partial<ChatItem>)
                    }
                    className="rounded border border-[var(--page-border)] px-2 py-1.5 text-sm"
                  />
                </div>
              ) : null}

              {item.kind === "system" ? (
                <input
                  value={item.text}
                  onChange={(event) =>
                    update(item.id, { text: event.target.value })
                  }
                  className="mt-2 w-full rounded border border-[var(--page-border)] px-2 py-1.5 text-sm"
                />
              ) : null}
            </li>
          ))}
        </ul>

        <div className="overflow-hidden rounded-lg border border-[var(--page-border)] bg-[#0b141a]">
          <div className="flex items-center gap-1 border-b border-white/10 px-2 py-1.5">
            {(["declarative", "compound"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setTab(option)}
                className={
                  tab === option
                    ? "rounded px-2 py-1 text-xs font-medium text-white"
                    : "rounded px-2 py-1 text-xs font-medium text-white/45 hover:text-white/70"
                }
              >
                {option}
              </button>
            ))}
            <span className="flex-1" />
            <CopyButton value={source} />
          </div>
          <pre className="max-h-[420px] overflow-auto px-4 py-3">
            <code className="font-mono text-[12px] leading-[19px] text-[#e9edef]">
              <Highlight code={source} />
            </code>
          </pre>
        </div>
      </div>

      <div className="space-y-3 xl:sticky xl:top-10 xl:self-start">
        <div className="flex items-center gap-1">
          {whatsappThemeList.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setTheme(option.id)}
              aria-pressed={theme === option.id}
              className={
                theme === option.id
                  ? "rounded-md bg-[var(--page-fg)] px-2.5 py-1 text-xs font-medium text-white"
                  : "rounded-md px-2.5 py-1 text-xs font-medium text-[var(--page-muted)] hover:bg-black/[0.04]"
              }
            >
              {option.name}
            </button>
          ))}
        </div>

        <ChatWindow
          theme={theme}
          className="h-[600px] overflow-hidden rounded-xl border border-[var(--page-border)]"
        >
          <ChatHeader
            name="Valeria · Agente IA"
            presence="online"
            presenceLabel="en línea"
          />
          <MessageList>
            <Conversation items={items} />
          </MessageList>
        </ChatWindow>
      </div>
    </div>
  );
}

function Button({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-md border border-[var(--page-border)] bg-white px-2.5 py-1.5 text-[13px] font-medium hover:bg-black/[0.03]"
    >
      {children}
    </button>
  );
}

function IconAction({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="h-6 w-6 rounded text-[var(--page-muted)] hover:bg-black/[0.05] hover:text-[var(--page-fg)]"
    >
      {children}
    </button>
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="rounded border border-[var(--page-border)] bg-white px-1.5 py-0.5 text-[12px]"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
