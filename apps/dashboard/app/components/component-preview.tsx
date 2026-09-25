import { demos } from "../demos";
import demoSources from "../demos.generated.json";
import { CodeBlock } from "./code-block";
import { ThemeSwitcher } from "./theme-switcher";

const SOURCES: Record<string, string> = demoSources;

export function ComponentPreview({ name }: { name: string }) {
  const Demo = demos[name];
  const source = SOURCES[name];

  if (!Demo) return null;

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl border border-[var(--page-border)] bg-white">
        <ThemeSwitcher>
          <Demo />
        </ThemeSwitcher>
      </div>
      {source ? <CodeBlock code={source} label={`demos/${name}.tsx`} /> : null}
    </div>
  );
}
