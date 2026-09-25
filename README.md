# WhatsApp Components

Copy-paste WhatsApp chat components for [shadcn](https://ui.shadcn.com). Real WhatsApp tokens, three themes, React 19 — no runtime package.

**[whatsapp-components.crafter.run](https://whatsapp-components.crafter.run)**

```bash
npx shadcn@latest add https://whatsapp-components.crafter.run/r/whatsapp-kit.json
```

Or take a single component:

```bash
npx shadcn@latest add https://whatsapp-components.crafter.run/r/message-bubble.json
```

## Themes

Three themes ship as CSS custom properties. Set `data-wa-theme` on any ancestor:

| Theme | What it is |
| --- | --- |
| `light` | WhatsApp Web's light theme, sampled |
| `dark` | WhatsApp Web's dark theme, sampled |
| `brand` | Rounder corners, deeper teal — for product shots |

```tsx
<div data-wa-theme="dark">
  <MessageBubble direction="out" meta={<MessageMeta timestamp={sentAt} status="read" />}>
    ¡Sí! Nos queda en stock 😍
  </MessageBubble>
</div>
```

After adding, import the tokens once, after Tailwind:

```css
@import "tailwindcss";
@import "@/components/ui/whatsapp/whatsapp.css";
```

## Development

```bash
bun install
bun run dev        # builds the registry, then serves the dashboard on :4320
bun test
bun run typecheck
bun run lint
bun run build
```

`registry/whatsapp` is the canonical source. The dashboard imports it directly — there is no build step between the two, so what you see on the site is exactly what `shadcn add` writes into your project.

## License

MIT
