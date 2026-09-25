import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const DESCRIPTION =
  "A WhatsApp chat in React that passes for the real thing. Tokens sampled from the app, bubble tails, blue ticks, three themes. Copy-paste components for shadcn.";

export const metadata: Metadata = {
  metadataBase: new URL("https://whatsapp-components.crafter.run"),
  title: {
    default: "WhatsApp Components",
    template: "%s · WhatsApp Components",
  },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "WhatsApp Components",
    title: "WhatsApp Components",
    description: DESCRIPTION,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
