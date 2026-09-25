import { ChatHeader } from "@/registry/whatsapp/chat-header";
import { ChatInput } from "@/registry/whatsapp/chat-input";
import { ChatWindow } from "@/registry/whatsapp/chat-window";
import { MessageBubble } from "@/registry/whatsapp/message-bubble";
import { MessageList } from "@/registry/whatsapp/message-list";
import { PhoneFrame } from "@/registry/whatsapp/phone-frame";
import { whatsappThemeList } from "@/registry/whatsapp/themes";
import { TypingIndicator } from "@/registry/whatsapp/typing-indicator";
import { demoConversation } from "./demo-conversation";
import { richConversation } from "./rich-conversation";
import { Transcript } from "./transcript";

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
        <SectionTitle>The whole thing, in three themes</SectionTitle>
        <div className="mt-6 flex flex-wrap justify-center gap-10">
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
                    <Transcript items={demoConversation} />
                    <MessageBubble direction="in" tail>
                      <TypingIndicator />
                    </MessageBubble>
                  </MessageList>
                  <ChatInput placeholder="Escribe un mensaje" />
                </ChatWindow>
              </PhoneFrame>
              <figcaption className="text-center">
                <p className="text-sm font-medium">{theme.name}</p>
                <p className="mt-0.5 text-xs text-[var(--page-muted)]">
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
              className="h-[620px] overflow-hidden rounded-xl border border-[var(--page-border)]"
            >
              <ChatHeader name="Camila" presence="typing" />
              <MessageList>
                <Transcript items={richConversation} />
              </MessageList>
              <ChatInput placeholder="Escribe un mensaje" />
            </ChatWindow>
          ))}
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
        Wave 1 — chat core. Rich content, commerce components and the playground
        land next.
      </footer>
    </main>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--page-muted)]">
      {children}
    </h2>
  );
}
