import type { ReactNode } from "react";
import { SidebarLayout } from "../components/sidebar";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return <SidebarLayout>{children}</SidebarLayout>;
}
