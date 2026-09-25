import type { PropDoc } from "../lib/docs";

export function PropsTable({
  props,
  typeName,
}: {
  props: PropDoc[];
  typeName: string;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--page-border)]">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <caption className="sr-only">{typeName}</caption>
        <thead>
          <tr className="border-b border-[var(--page-border)] bg-black/[0.02]">
            <th className="px-4 py-2 font-medium">Prop</th>
            <th className="px-4 py-2 font-medium">Type</th>
            <th className="px-4 py-2 font-medium">Default</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr
              key={prop.name}
              className="border-b border-[var(--page-border)] last:border-0 align-top"
            >
              <td className="px-4 py-2.5">
                <code className="font-mono text-[13px]">{prop.name}</code>
                {prop.required ? (
                  <span className="ml-1.5 text-[11px] text-[var(--page-muted)]">
                    required
                  </span>
                ) : null}
                {prop.description ? (
                  <p className="mt-1 max-w-sm text-[12.5px] leading-[18px] text-[var(--page-muted)]">
                    {prop.description}
                  </p>
                ) : null}
              </td>
              <td className="px-4 py-2.5">
                <code className="font-mono text-[12.5px] text-[var(--page-muted)]">
                  {prop.type}
                </code>
              </td>
              <td className="px-4 py-2.5">
                {prop.defaultValue ? (
                  <code className="font-mono text-[12.5px] text-[var(--page-muted)]">
                    {prop.defaultValue}
                  </code>
                ) : (
                  <span className="text-[var(--page-muted)]">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
