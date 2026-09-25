import { CopyButton } from "./copy-button";

export function CodeBlock({
  code,
  label,
  className,
}: {
  code: string;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-lg border border-[var(--page-border)] bg-[#0b141a] ${className ?? ""}`}
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-3 py-1.5">
        <span className="truncate font-mono text-[11px] uppercase tracking-widest text-white/45">
          {label ?? "tsx"}
        </span>
        <CopyButton value={code} />
      </div>
      <pre className="overflow-x-auto px-4 py-3">
        <code className="font-mono text-[12.5px] leading-[20px] text-[#e9edef]">
          {code}
        </code>
      </pre>
    </div>
  );
}

export function InstallBlock({ command }: { command: string }) {
  return (
    <div className="flex items-center gap-3 overflow-hidden rounded-lg border border-[var(--page-border)] bg-white px-3 py-2">
      <code className="flex-1 overflow-x-auto whitespace-nowrap font-mono text-[12.5px]">
        {command}
      </code>
      <CopyButton value={command} />
    </div>
  );
}
