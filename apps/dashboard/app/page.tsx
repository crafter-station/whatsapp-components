import { ChatHeader } from "@/registry/whatsapp/chat-header";
import { ChatInput } from "@/registry/whatsapp/chat-input";
import { ChatWindow } from "@/registry/whatsapp/chat-window";
import { Conversation } from "@/registry/whatsapp/conversation";
import { MessageBubble } from "@/registry/whatsapp/message-bubble";
import { MessageList } from "@/registry/whatsapp/message-list";
import { PhoneFrame } from "@/registry/whatsapp/phone-frame";
import { Poll } from "@/registry/whatsapp/poll";
import { QuickReplyButtons } from "@/registry/whatsapp/quick-reply-buttons";
import { SystemMessage } from "@/registry/whatsapp/system-message";
import { whatsappThemeList } from "@/registry/whatsapp/themes";
import { TypingIndicator } from "@/registry/whatsapp/typing-indicator";
import { demoConversation } from "./demo-conversation";
import { renderProductLead } from "./render-product-lead";
import { richConversation } from "./rich-conversation";

const INSTALL =
  "npx shadcn@latest add https://whatsapp-components.crafter.run/r/whatsapp-kit.json";

export default function Page() {
  return (
    <main className="mx-auto max-w-[1180px] px-6 py-16">
      <header className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--page-muted)]">
          Crafter Station
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          WhatsApp Components
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-[var(--page-muted)]">
          Copy-paste chat components for shadcn. Real WhatsApp tokens, three
          themes, React 19 — no runtime package.
        </p>
        <code className="mt-6 inline-block max-w-full overflow-x-auto rounded-md border border-[var(--page-border)] bg-white px-3 py-2 font-mono text-sm">
          {INSTALL}
        </code>
      </header>

      <section className="mt-16">
        <SectionTitle>Selling over WhatsApp, in three themes</SectionTitle>
        <p className="mt-2 max-w-2xl text-[var(--page-muted)]">
          One <code className="font-mono text-[13px]">ChatItem[]</code>, three
          values of <code className="font-mono text-[13px]">data-wa-theme</code>
          . Nothing below changes but the tokens.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-10">
          {whatsappThemeList.map((theme) => (
            <figure key={theme.id} className="flex flex-col items-center gap-3">
              <PhoneFrame width={304} ratio={1.95}>
                <ChatWindow theme={theme.id} className="pt-6">
                  <ChatHeader
                    name="Valeria · Agente IA"
                    presence="online"
                    presenceLabel="en línea"
                    avatarClassName={
                      theme.id === "brand"
                        ? "bg-[#f2e04f] text-[#3b2f00]"
                        : undefined
                    }
                  />
                  <MessageList>
                    <Conversation
                      items={demoConversation}
                      renderContent={renderProductLead}
                    />
                    <SystemMessage
                      tone="neutral"
                      icon={null}
                      className="[&>span]:bg-wa-accent [&>span]:font-semibold [&>span]:text-wa-accent-text"
                    >
                      Venta cerrada
                    </SystemMessage>
                    <MessageBubble direction="in" tail>
                      <TypingIndicator />
                    </MessageBubble>
                  </MessageList>
                  <ChatInput placeholder="Escribe un mensaje" />
                </ChatWindow>
              </PhoneFrame>
              <figcaption className="text-center">
                <p className="text-sm font-medium">{theme.name}</p>
                <p className="mt-0.5 font-mono text-xs text-[var(--page-muted)]">
                  data-wa-theme=&quot;{theme.id}&quot;
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <SectionTitle>Rich content</SectionTitle>
        <p className="mt-2 max-w-2xl text-[var(--page-muted)]">
          Photos, voice notes, documents, locations, unfurled links, quoted
          replies and reactions. Quoting and reacting live on the message
          envelope, not on the content — so they work the same whatever the
          bubble holds.
        </p>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {(["light", "dark"] as const).map((theme) => (
            <ChatWindow
              key={theme}
              theme={theme}
              className="h-[640px] overflow-hidden rounded-xl border border-[var(--page-border)]"
            >
              <ChatHeader name="Camila" presence="typing" />
              <MessageList>
                <Conversation items={richConversation} />
              </MessageList>
              <ChatInput placeholder="Escribe un mensaje" />
            </ChatWindow>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <SectionTitle>Interactive</SectionTitle>
        <p className="mt-2 max-w-2xl text-[var(--page-muted)]">
          Quick replies, list messages, CTAs and polls. All controlled — no
          component holds hidden state, so the transcript stays yours.
        </p>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <ChatWindow
            theme="light"
            className="overflow-hidden rounded-xl border border-[var(--page-border)]"
          >
            <MessageList className="min-h-[340px] flex-none">
              <Conversation items={interactiveItems} />
              <QuickReplyButtons
                direction="in"
                actions={[
                  { id: "size", label: "Ver tallas" },
                  { id: "ship", label: "Costo de envío" },
                  { id: "human", label: "Hablar con una persona" },
                ]}
              />
            </MessageList>
          </ChatWindow>

          <ChatWindow
            theme="dark"
            className="overflow-hidden rounded-xl border border-[var(--page-border)]"
          >
            <MessageList className="min-h-[340px] flex-none">
              <MessageBubble direction="in" tail>
                <Poll
                  question="¿Qué aroma lanzamos primero?"
                  options={[
                    { id: "a", label: "Violeta nocturna", votes: 42 },
                    {
                      id: "b",
                      label: "Cítrico andino",
                      votes: 27,
                      votedByMe: true,
                    },
                    { id: "c", label: "Madera húmeda", votes: 11 },
                  ]}
                  labels={{
                    single: "Elige una",
                    votes: (n) => `${n} votos`,
                  }}
                />
              </MessageBubble>
            </MessageList>
          </ChatWindow>
        </div>
      </section>

      <section className="mt-20">
        <SectionTitle>Tokens</SectionTitle>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {whatsappThemeList.map((theme) => (
            <article
              key={theme.id}
              className="overflow-hidden rounded-xl border border-[var(--page-border)] bg-white"
            >
              <div className="border-b border-[var(--page-border)] px-4 py-3">
                <h3 className="text-sm font-semibold">{theme.name}</h3>
                <p className="mt-0.5 text-xs text-[var(--page-muted)]">
                  {theme.description}
                </p>
              </div>
              <dl className="divide-y divide-[var(--page-border)]">
                {Object.entries(theme.tokens)
                  .filter(([, value]) => value.startsWith("#"))
                  .map(([name, value]) => (
                    <div
                      key={name}
                      className="flex items-center gap-3 px-4 py-2"
                    >
                      <span
                        className="h-5 w-5 shrink-0 rounded border border-[var(--page-border)]"
                        style={{ background: value }}
                      />
                      <dt className="flex-1 truncate font-mono text-xs">
                        --wa-{name}
                      </dt>
                      <dd className="font-mono text-xs text-[var(--page-muted)]">
                        {value}
                      </dd>
                    </div>
                  ))}
              </dl>
            </article>
          ))}
        </div>
      </section>

      <footer className="mt-20 border-t border-[var(--page-border)] pt-6 text-sm text-[var(--page-muted)]">
        Wave 3 — every component is in. Per-component docs pages and the
        conversation playground land next.
      </footer>
    </main>
  );
}

const interactiveItems: Parameters<typeof Conversation>[0]["items"] = [
  {
    kind: "message",
    id: "i1",
    direction: "out",
    timestamp: new Date(2025, 0, 6, 11, 4),
    status: "read",
    content: {
      type: "list",
      title: "Catálogo Violeta",
      body: "Estos son los formatos disponibles esta semana.",
      buttonLabel: "Ver formatos",
      sections: [
        {
          title: "Eau de parfum",
          rows: [
            { id: "30", title: "30 ml", description: "$ 42.000" },
            { id: "50", title: "50 ml", description: "$ 65.000" },
          ],
        },
        {
          title: "Kits",
          rows: [
            { id: "kit", title: "Kit descubrimiento", description: "5 × 2 ml" },
          ],
        },
      ],
      footer: "Precios con IVA incluido.",
    },
  },
  {
    kind: "message",
    id: "i2",
    direction: "in",
    timestamp: new Date(2025, 0, 6, 11, 6),
    content: { type: "text", text: "¿Tienen el de 50 ml en stock?" },
  },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--page-muted)]">
      {children}
    </h2>
  );
}
