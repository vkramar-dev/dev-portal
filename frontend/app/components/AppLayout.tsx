import type { ReactNode } from "react";
import NavBar from "./NavBar";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <NavBar />

      <main style={{ flex: 1 }}>{children}</main>

      <footer>© 2026 Programming in Depth</footer>
    </div>
  );
}
