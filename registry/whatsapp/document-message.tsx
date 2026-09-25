import type { ReactNode } from "react";
import { cn } from "./cn";
import { formatBytes } from "./format-media";

export type DocumentMessageProps = {
  fileName: string;
  extension?: string;
  pageCount?: number;
  byteSize?: number;
  href?: string;
  caption?: ReactNode;
  className?: string;
};

export function DocumentMessage({
  fileName,
  extension,
  pageCount,
  byteSize,
  href,
  caption,
  className,
}: DocumentMessageProps) {
  const type = (extension ?? fileName.split(".").pop() ?? "").toUpperCase();

  const details = [
    pageCount ? `${pageCount} ${pageCount === 1 ? "page" : "pages"}` : null,
    type || null,
    byteSize ? formatBytes(byteSize) : null,
  ].filter(Boolean);

  const Wrapper = href ? "a" : "span";

  return (
    <span className={cn("block min-w-[230px]", className)}>
      <Wrapper
        href={href}
        className="-mx-[5px] -mt-[2px] mb-1 flex items-center gap-3 rounded-[6px] bg-wa-surface/70 px-3 py-2.5"
      >
        <span className="relative flex h-10 w-10 shrink-0 items-center justify-center text-wa-text-muted">
          <FileIcon />
          {type ? (
            <span className="absolute bottom-[5px] text-[7px] font-bold tracking-tight text-wa-surface">
              {type.slice(0, 4)}
            </span>
          ) : null}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14px] leading-[19px] text-wa-text">
            {fileName}
          </span>
          {details.length > 0 ? (
            <span className="mt-0.5 block text-[11px] leading-[15px] text-wa-text-muted">
              {details.join(" · ")}
            </span>
          ) : null}
        </span>
      </Wrapper>
      {caption ? <span className="block">{caption}</span> : null}
    </span>
  );
}

function FileIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="34"
      height="34"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M6 2.5h7.2L19 8.3V20a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 20V4a1.5 1.5 0 0 1 1-1.5z" />
      <path d="M13.2 2.5L19 8.3h-4.8a1 1 0 0 1-1-1V2.5z" opacity="0.45" />
    </svg>
  );
}
