import { cn } from "./cn";
import type { ListSection, ListSectionRow } from "./types";

export type ListMessageProps = {
  body: string;
  buttonLabel: string;
  sections: ListSection[];
  title?: string;
  footer?: string;
  /** Controlled: shows the rows inline instead of only the button. */
  open?: boolean;
  onToggle?: () => void;
  onSelect?: (row: ListSectionRow) => void;
  className?: string;
};

export function ListMessage({
  body,
  buttonLabel,
  sections,
  title,
  footer,
  open = false,
  onToggle,
  onSelect,
  className,
}: ListMessageProps) {
  return (
    <span className={cn("block", className)}>
      {title ? (
        <span className="mb-0.5 block text-[15px] font-semibold leading-[20px] text-wa-text">
          {title}
        </span>
      ) : null}
      <span className="block">{body}</span>
      {footer ? (
        <span className="mt-1 block text-[12.5px] leading-[17px] text-wa-text-muted">
          {footer}
        </span>
      ) : null}

      {open ? (
        <span className="-mx-[5px] mt-2 block overflow-hidden rounded-[8px] bg-wa-surface">
          {sections.map((section, index) => (
            <span
              key={section.title ?? `section-${index}`}
              className="block border-wa-border [&:not(:first-child)]:border-t"
            >
              {section.title ? (
                <span className="block px-3 pt-2 text-[12.5px] font-semibold uppercase leading-[17px] tracking-wide text-wa-text-muted">
                  {section.title}
                </span>
              ) : null}
              {section.rows.map((row) => (
                <button
                  key={row.id}
                  type="button"
                  onClick={onSelect ? () => onSelect(row) : undefined}
                  className="block w-full px-3 py-2 text-left"
                >
                  <span className="block text-[14px] leading-[19px] text-wa-text">
                    {row.title}
                  </span>
                  {row.description ? (
                    <span className="block text-[12.5px] leading-[17px] text-wa-text-muted">
                      {row.description}
                    </span>
                  ) : null}
                </button>
              ))}
            </span>
          ))}
        </span>
      ) : null}

      <span className="-mx-[9px] -mb-[6px] mt-2 block border-t border-wa-border">
        <button
          type="button"
          onClick={onToggle}
          className="flex w-full items-center justify-center gap-2 py-2.5 font-wa text-[14px] font-medium leading-[19px] text-wa-tick-read"
        >
          <ListIcon />
          {buttonLabel}
        </button>
      </span>
    </span>
  );
}

function ListIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="17"
      height="17"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
    >
      <path d="M9 7h11M9 12h11M9 17h11M4.5 7h.01M4.5 12h.01M4.5 17h.01" />
    </svg>
  );
}
