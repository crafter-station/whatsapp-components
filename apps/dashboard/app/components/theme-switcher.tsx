"use client";

import { type ReactNode, useState } from "react";
import { whatsappThemeList } from "@/registry/whatsapp/themes";

export function ThemeSwitcher({
  children,
  initial = "light",
}: {
  children: ReactNode;
  initial?: string;
}) {
  const [theme, setTheme] = useState(initial);

  return (
    <div>
      <div className="flex items-center gap-1 border-b border-[var(--page-border)] px-3 py-2">
        {whatsappThemeList.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => setTheme(option.id)}
            aria-pressed={theme === option.id}
            className={
              theme === option.id
                ? "rounded-md bg-[var(--page-fg)] px-2.5 py-1 text-xs font-medium text-white"
                : "rounded-md px-2.5 py-1 text-xs font-medium text-[var(--page-muted)] hover:bg-black/[0.04]"
            }
          >
            {option.name}
          </button>
        ))}
      </div>
      <div data-wa-theme={theme} className="bg-wa-bg p-6">
        {children}
      </div>
    </div>
  );
}
