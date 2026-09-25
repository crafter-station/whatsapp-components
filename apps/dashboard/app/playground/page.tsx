import type { Metadata } from "next";
import { Sidebar } from "../components/sidebar";
import { Builder } from "./builder";

export const metadata: Metadata = {
  title: "Playground — WhatsApp Components",
  description:
    "Build a WhatsApp conversation and export it as JSX, declarative or composed by hand.",
};

export default function Page() {
  return (
    <div className="mx-auto flex max-w-[1180px] gap-10 px-6 py-10">
      <aside className="sticky top-10 hidden h-[calc(100vh-5rem)] w-56 shrink-0 overflow-y-auto lg:block">
        <Sidebar />
      </aside>
      <div className="min-w-0 flex-1">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">Playground</h1>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[var(--page-muted)]">
            Build a conversation, switch the theme, and take the JSX. Export it
            declaratively over a <code className="font-mono">ChatItem[]</code>,
            or composed out of the primitives — both render the same thing.
          </p>
        </header>
        <Builder />
      </div>
    </div>
  );
}
