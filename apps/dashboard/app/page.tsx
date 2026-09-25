import { MessageBubble } from "@/registry/whatsapp/message-bubble";
import { MessageMeta } from "@/registry/whatsapp/message-meta";
import { whatsappThemeList } from "@/registry/whatsapp/themes";
import type { MessageStatus } from "@/registry/whatsapp/types";

const at = (hour: number, minute: number) =>
  new Date(2025, 0, 6, hour, minute, 0, 0);

const DEMO: {
  id: string;
  direction: "in" | "out";
  text: string;
  at: Date;
  status?: MessageStatus;
}[] = [
  {
    id: "1",
    direction: "in",
    text: "¡Hola! ¿Tienen el perfume Violeta?",
    at: at(20, 2),
  },
  {
    id: "2",
    direction: "out",
    text: "¡Sí! Nos queda en stock 😍 Te lo muestro:",
    at: at(20, 2),
    status: "read",
  },
  { id: "3", direction: "in", text: "¡Listo, ya pagué!", at: at(20, 5) },
  {
    id: "4",
    direction: "out",
    text: "Perfecto, lo despachamos hoy mismo 📦",
    at: at(20, 6),
    status: "delivered",
  },
];

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
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
        <code className="mt-6 inline-block rounded-md border border-[var(--page-border)] bg-white px-3 py-2 font-mono text-sm">
          npx shadcn@latest add
          https://whatsapp-components.crafter.run/r/whatsapp-kit.json
        </code>
      </header>

      <section className="mt-14">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--page-muted)]">
          Themes
        </h2>
        <div className="mt-5 grid gap-6 md:grid-cols-3">
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
              <div
                data-wa-theme={theme.id}
                className="flex flex-col gap-2 bg-wa-bg px-4 py-5"
              >
                {DEMO.map((message, index) => (
                  <MessageBubble
                    key={message.id}
                    direction={message.direction}
                    tail={DEMO[index - 1]?.direction !== message.direction}
                    meta={
                      <MessageMeta
                        timestamp={message.at}
                        status={message.status}
                      />
                    }
                  >
                    {message.text}
                  </MessageBubble>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="mt-16 border-t border-[var(--page-border)] pt-6 text-sm text-[var(--page-muted)]">
        Wave 0 — pipeline only. Chat core, rich content, commerce components and
        the playground land next.
      </footer>
    </main>
  );
}
