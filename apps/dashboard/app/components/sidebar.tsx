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

/**
 * The two-column shell shared by the docs pages and the playground.
 *
 * Below lg the rail becomes a disclosure rather than a drawer: a `details`
 * element needs no client component and no state, and only one of the two
 * copies is ever in the accessibility tree because the other is display:none.
 */
export function SidebarLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-[1180px] px-6 py-10">
      <details className="group mb-8 overflow-hidden rounded-lg border border-[var(--page-border)] bg-white lg:hidden">
        <summary className="cursor-pointer list-none px-4 py-3 text-sm font-medium [&::-webkit-details-marker]:hidden">
          <span className="flex items-center justify-between gap-3">
            Browse components
            <Chevron />
          </span>
        </summary>
        <div className="max-h-[60vh] overflow-y-auto border-t border-[var(--page-border)] px-2 py-4">
          <Sidebar />
        </div>
      </details>

      <div className="flex gap-10">
        <aside className="sticky top-10 hidden h-[calc(100vh-5rem)] w-56 shrink-0 overflow-y-auto overflow-x-hidden lg:block">
          <Sidebar />
        </aside>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}

function Chevron() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      aria-hidden="true"
      focusable="false"
      className="shrink-0 text-[var(--page-muted)] transition-transform duration-150 group-open:rotate-180"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
