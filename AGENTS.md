# WhatsApp Components

- Copy-paste WhatsApp chat components for shadcn, with a Next.js dashboard by Crafter Station.
- Use Bun, TypeScript, React 19, Tailwind v4 and Biome. No npm, ESLint or Prettier.
- Do not add code comments that restate the code, and no AI coauthor trailers. Comments explain a non-obvious *why*.
- The canonical source lives in `registry/whatsapp`. The dashboard imports that source directly via `@/registry/*`. Never publish a runtime package.
- Code, identifiers and docs in English. Demo conversation content in Spanish.
- Presentation components stay server-renderable. Add `"use client"` only to components that need state or events.
- `themes.ts` is the source of truth for tokens; `whatsapp.css` mirrors it so a copied component works with no provider. `tests/themes.test.ts` enforces the mirror — update both or the build fails.
- Every new file in `registry/whatsapp` must be shipped by an item in `registry.json`, and any `./x` import must resolve through that item or its `registryDependencies`. `tests/registry.test.ts` enforces both.
- Verification before every push: `bun test`, `bun run typecheck`, `bun run lint`, `bun run build`. No automatic Playwright gates.
- Deploy: commit per logical change, push to `main`, then `vps app deploy` and confirm the domain returns 200. The webhook alone is fire-and-forget and hides failed builds.
- Production: https://whatsapp-components.crafter.run
