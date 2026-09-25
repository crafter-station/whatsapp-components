"use client";

import { useState } from "react";

export function CopyButton({
  value,
  label = "Copy",
}: {
  value: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(value).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        });
      }}
      className="shrink-0 rounded-md border border-[var(--page-border)] bg-white px-2 py-1 text-xs font-medium text-[var(--page-muted)] hover:text-[var(--page-fg)]"
    >
      {copied ? "Copied" : label}
    </button>
  );
}
