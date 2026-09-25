import type { NextConfig } from "next";

const config: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: `${import.meta.dirname}/../..`,
  devIndicators: false,
  poweredByHeader: false,
};

export default config;
