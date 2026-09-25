import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "WhatsApp Components",
  description:
    "A WhatsApp chat in React that passes for the real thing. Tokens sampled from the app, bubble tails, blue ticks, three themes. Copy-paste components for shadcn.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
