import { ImageResponse } from "next/og";
import { whatsappThemes } from "@/registry/whatsapp/themes";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "WhatsApp Components: a WhatsApp chat in React that passes for the real thing";

/**
 * Colours come from the theme tokens rather than literals: Satori does not
 * run the stylesheet, so this is the one place the palette would otherwise
 * be copied by hand and quietly drift.
 */
const t = whatsappThemes.dark.tokens;

function Bubble({
  children,
  direction,
  time,
  read,
}: {
  children: string;
  direction: "in" | "out";
  time: string;
  read?: boolean;
}) {
  const out = direction === "out";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 10,
        maxWidth: 380,
        alignSelf: out ? "flex-end" : "flex-start",
        background: out ? t["bubble-out"] : t["bubble-in"],
        color: out ? t["bubble-out-text"] : t["bubble-in-text"],
        padding: "14px 16px",
        fontSize: 26,
        lineHeight: 1.3,
        borderRadius: 14,
        borderTopLeftRadius: out ? 14 : 2,
        borderTopRightRadius: out ? 2 : 14,
      }}
    >
      <span>{children}</span>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          fontSize: 17,
          color: t["text-muted"],
          whiteSpace: "nowrap",
        }}
      >
        {time}
        {read ? (
          // aria-hidden rather than a <title>: Satori rasterises this and
          // would paint the title text into the image, but it ignores aria.
          <svg
            viewBox="0 0 16 15"
            width="19"
            height="18"
            aria-hidden="true"
            fill={t["tick-read"]}
          >
            <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" />
          </svg>
        ) : null}
      </span>
    </div>
  );
}

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: t.bg,
        color: t.text,
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 26,
          padding: "0 64px",
          width: 700,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 20,
            letterSpacing: 4,
            color: t["text-muted"],
          }}
        >
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: t.online,
            }}
          />
          CRAFTER STATION
        </div>

        {/* Two rows, not a <br />: Satori lays a flex row out on one line. */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.05,
          }}
        >
          <span>WhatsApp</span>
          <span>Components</span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 28,
            lineHeight: 1.4,
            color: t["text-muted"],
          }}
        >
          A chat in React that passes for the real thing. Tokens sampled from
          the app, bubble tails, blue ticks, three themes.
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 8,
            padding: "14px 20px",
            borderRadius: 10,
            background: t["system-bg"],
            border: `1px solid ${t.border}`,
            color: t.text,
            fontSize: 21,
            fontFamily: "monospace",
            whiteSpace: "nowrap",
          }}
        >
          npx shadcn@latest add .../whatsapp-kit.json
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 14,
          flex: 1,
          padding: "0 56px",
          borderLeft: `1px solid ${t.border}`,
        }}
      >
        <Bubble direction="in" time="8:02 p.m.">
          ¿Tienen el perfume Violeta?
        </Bubble>
        <Bubble direction="out" time="8:02 p.m." read>
          Sí, nos queda en stock. Te lo muestro:
        </Bubble>
        <Bubble direction="in" time="8:05 p.m.">
          Listo, ya pagué
        </Bubble>
        <div
          style={{
            display: "flex",
            alignSelf: "center",
            marginTop: 6,
            padding: "10px 18px",
            borderRadius: 10,
            background: t["system-bg"],
            color: t["system-text"],
            fontSize: 20,
          }}
        >
          Pago confirmado
        </div>
      </div>
    </div>,
    size,
  );
}
