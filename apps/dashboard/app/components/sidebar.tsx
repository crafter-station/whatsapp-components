import Link from "next/link";
import type { ReactNode } from "react";
import { DOC_SECTIONS, docItemsByName } from "../lib/docs";

export function Sidebar() {
  return (
    /*
      px-2 pairs with the -mx-2 on each link: without it the links' border
      boxes stick 8px past the nav on both sides, and since the aside scrolls
      vertically the browser cannot keep overflow-x visible — you get a
      horizontal scrollbar under the whole sidebar.
    */
    <nav aria-label="Components" className="space-y-6 px-2 text-sm">
      <Link
        href="/"
        className="block font-semibold tracking-tight hover:underline"
      >
        WhatsApp Components
      </Link>

      <Link
        href="/playground"
        className="-mx-2 block rounded-md border border-[var(--page-border)] px-3 py-2 text-[13px] font-medium hover:bg-black/[0.03]"
      >
        Playground →
      </Link>

      {DOC_SECTIONS.map((section) => (
        <div key={section.title}>
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-[var(--page-muted)]">
            {section.title}
          </p>
          <ul className="space-y-0.5">
            {section.items.map((name) => {
              const item = docItemsByName.get(name);
              if (!item) return null;
              return (
                <li key={name}>
                  <Link
                    href={`/docs/${name}`}
                    className="-mx-2 block truncate rounded-md px-2 py-1 text-[13.5px] text-[var(--page-muted)] hover:bg-black/[0.03] hover:text-[var(--page-fg)]"
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

/** The two-column shell shared by the docs pages and the playground. */
export function SidebarLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex max-w-[1180px] gap-10 px-6 py-10">
      <aside className="sticky top-10 hidden h-[calc(100vh-5rem)] w-56 shrink-0 overflow-y-auto overflow-x-hidden lg:block">
        <Sidebar />
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
