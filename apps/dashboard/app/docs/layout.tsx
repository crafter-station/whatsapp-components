import type { ReactNode } from "react";
import { Sidebar } from "../components/sidebar";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex max-w-[1180px] gap-10 px-6 py-10">
      <aside className="sticky top-10 hidden h-[calc(100vh-5rem)] w-56 shrink-0 overflow-y-auto lg:block">
        <Sidebar />
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
