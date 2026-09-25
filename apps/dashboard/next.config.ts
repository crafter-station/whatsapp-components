import type { NextConfig } from "next";

const config: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: `${import.meta.dirname}/../..`,
  // Next writes its own AGENTS.md and CLAUDE.md into this app on every
  // `next dev` otherwise; the repo's guidance lives in one file at the root.
  agentRules: false,
  devIndicators: false,
  poweredByHeader: false,
};

export default config;
