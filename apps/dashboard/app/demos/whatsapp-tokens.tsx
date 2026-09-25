import { whatsappThemeList } from "@/registry/whatsapp/themes";

export default function Demo() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {whatsappThemeList.map((theme) => (
        <div key={theme.id} data-wa-theme={theme.id}>
          <p className="text-[13px] font-medium text-wa-text-muted">
            {theme.name}
          </p>
          <div className="mt-2 grid grid-cols-6 gap-1">
            {Object.entries(theme.tokens)
              .filter(([, value]) => value.startsWith("#"))
              .map(([name, value]) => (
                <span
                  key={name}
                  title={`--wa-${name}: ${value}`}
                  className="block aspect-square rounded border border-wa-border"
                  style={{ background: value }}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
