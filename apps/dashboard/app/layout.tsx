import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "WhatsApp Components",
  description:
    "Copy-paste WhatsApp chat components for shadcn. Real WhatsApp tokens, three themes, React 19.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
