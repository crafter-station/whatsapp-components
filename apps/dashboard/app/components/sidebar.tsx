import Link from "next/link";
import { DOC_SECTIONS, docItemsByName } from "../lib/docs";

export function Sidebar() {
  return (
    <nav aria-label="Components" className="space-y-6 text-sm">
      <Link
        href="/"
        className="block font-semibold tracking-tight hover:underline"
      >
        WhatsApp Components
      </Link>

      <Link
        href="/playground"
        className="block rounded-md border border-[var(--page-border)] px-3 py-2 text-[13px] font-medium hover:bg-black/[0.03]"
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
                    className="-mx-2 block rounded-md px-2 py-1 text-[13.5px] text-[var(--page-muted)] hover:bg-black/[0.03] hover:text-[var(--page-fg)]"
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
