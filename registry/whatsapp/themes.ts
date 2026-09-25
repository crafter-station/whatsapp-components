/**
 * Source of truth for the theme tokens. `whatsapp.css` ships the same values
 * as `[data-wa-theme]` blocks so a copied component is styled without a
 * provider; `tests/themes.test.ts` asserts the two never drift.
 */

export const WA_TOKEN_NAMES = [
  "bg",
  "bg-pattern",
  "panel",
  "panel-text",
  "panel-muted",
  "bubble-in",
  "bubble-out",
  "bubble-in-text",
  "bubble-out-text",
  "surface",
  "border",
  "text",
  "text-muted",
  "link",
  "tick",
  "tick-read",
  "online",
  "accent",
  "accent-text",
  "system-bg",
  "system-text",
  "radius-bubble",
  "radius-panel",
  "shadow-bubble",
  "font",
] as const;

export type WhatsAppTokenName = (typeof WA_TOKEN_NAMES)[number];

export type WhatsAppTokens = Record<WhatsAppTokenName, string>;

export type WhatsAppTheme = {
  id: string;
  name: string;
  description: string;
  tokens: WhatsAppTokens;
};

const SYSTEM_FONT =
  'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif';

/** Sampled from WhatsApp Web's light theme. */
const light: WhatsAppTheme = {
  id: "light",
  name: "WhatsApp Light",
  description: "The real thing. Sampled from WhatsApp Web.",
  tokens: {
    bg: "#efeae2",
    "bg-pattern": "rgba(17, 27, 33, 0.06)",
    panel: "#f0f2f5",
    "panel-text": "#111b21",
    "panel-muted": "#667781",
    "bubble-in": "#ffffff",
    "bubble-out": "#d9fdd3",
    "bubble-in-text": "#111b21",
    "bubble-out-text": "#111b21",
    surface: "#ffffff",
    border: "rgba(17, 27, 33, 0.08)",
    text: "#111b21",
    "text-muted": "#667781",
    link: "#027eb5",
    tick: "#667781",
    "tick-read": "#53bdeb",
    online: "#25d366",
    accent: "#00a884",
    "accent-text": "#ffffff",
    "system-bg": "#ffffff",
    "system-text": "#54656f",
    "radius-bubble": "8px",
    "radius-panel": "0px",
    "shadow-bubble": "0 1px 0.5px rgba(11, 20, 26, 0.13)",
    font: SYSTEM_FONT,
  },
};

/** Sampled from WhatsApp Web's dark theme. */
const dark: WhatsAppTheme = {
  id: "dark",
  name: "WhatsApp Dark",
  description: "The real thing, after hours.",
  tokens: {
    bg: "#0b141a",
    "bg-pattern": "rgba(255, 255, 255, 0.04)",
    panel: "#202c33",
    "panel-text": "#e9edef",
    "panel-muted": "#8696a0",
    "bubble-in": "#202c33",
    "bubble-out": "#005c4b",
    "bubble-in-text": "#e9edef",
    "bubble-out-text": "#e9edef",
    surface: "#111b21",
    border: "rgba(233, 237, 239, 0.08)",
    text: "#e9edef",
    "text-muted": "#8696a0",
    link: "#53bdeb",
    tick: "#8696a0",
    "tick-read": "#53bdeb",
    online: "#25d366",
    accent: "#00a884",
    "accent-text": "#111b21",
    "system-bg": "#182229",
    "system-text": "#8696a0",
    "radius-bubble": "8px",
    "radius-panel": "0px",
    "shadow-bubble": "0 1px 0.5px rgba(11, 20, 26, 0.38)",
    font: SYSTEM_FONT,
  },
};

/** A softer, rounder take for branded product shots. */
const brand: WhatsAppTheme = {
  id: "brand",
  name: "Brand",
  description: "Rounder corners, deeper teal. For product shots and landings.",
  tokens: {
    bg: "#ece7df",
    "bg-pattern": "rgba(7, 94, 84, 0.05)",
    panel: "#075e54",
    "panel-text": "#ffffff",
    "panel-muted": "#a7d5cd",
    "bubble-in": "#ffffff",
    "bubble-out": "#d9f8c4",
    "bubble-in-text": "#1a1a1a",
    "bubble-out-text": "#1a1a1a",
    surface: "#f4fbef",
    border: "rgba(7, 94, 84, 0.1)",
    text: "#1a1a1a",
    "text-muted": "#8b8b8b",
    link: "#075e54",
    tick: "#8b8b8b",
    "tick-read": "#34b7f1",
    online: "#25d366",
    accent: "#f2e04f",
    "accent-text": "#1f3d2b",
    "system-bg": "#ffffff",
    "system-text": "#1e8e3e",
    "radius-bubble": "18px",
    "radius-panel": "0px",
    "shadow-bubble": "0 1px 2px rgba(7, 94, 84, 0.1)",
    font: SYSTEM_FONT,
  },
};

export const whatsappThemes = { light, dark, brand } satisfies Record<
  string,
  WhatsAppTheme
>;

export type WhatsAppThemeId = keyof typeof whatsappThemes;

export const whatsappThemeList: WhatsAppTheme[] = [light, dark, brand];

/** Tokens as inline styles, for previewing a theme without a stylesheet. */
export function themeStyle(theme: WhatsAppTheme): Record<string, string> {
  const style: Record<string, string> = {};
  for (const name of WA_TOKEN_NAMES) {
    style[`--wa-${name}`] = theme.tokens[name];
  }
  return style;
}
