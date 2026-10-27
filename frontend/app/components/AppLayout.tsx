import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavBar from "./NavBar";

interface AppLayoutProps { children: ReactNode }

type ColorMode = "light" | "dark";
const THEME_KEY = "pind-theme";

export default function AppLayout({ children }: AppLayoutProps) {
  const [colorMode, setColorMode] = useState<ColorMode>("light");
  useEffect(() => {
    let stored: string | null = null;
    try { stored = localStorage.getItem(THEME_KEY); } catch { /* Storage can be blocked. */ }
    if (stored === "dark") setColorMode("dark");
  }, []);

  useEffect(() => { document.documentElement.dataset.theme = colorMode; }, [colorMode]);
  const theme = useMemo(() => createTheme({
    palette: {
      mode: colorMode,
      primary: { main: colorMode === "dark" ? "#71c4df" : "#155c74" },
      background: { default: colorMode === "dark" ? "#111b22" : "#f7f8f7", paper: colorMode === "dark" ? "#1b2a33" : "#ffffff" },
      text: { primary: colorMode === "dark" ? "#f0f5f6" : "#192735", secondary: colorMode === "dark" ? "#abbec7" : "#506273" },
    },
    typography: { fontFamily: 'Inter, "Segoe UI", Arial, sans-serif' },
  }), [colorMode]);

  function toggleTheme() {
    setColorMode((mode) => {
      const next = mode === "light" ? "dark" : "light";
      try { localStorage.setItem(THEME_KEY, next); } catch { /* Optional persistence. */ }
      return next;
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="site-layout">
        <NavBar dark={colorMode === "dark"} onToggleTheme={toggleTheme} />
        <main className="site-main" id="main-content">{children}</main>
        <footer className="site-shell site-footer">
          <span><strong>Programming in Depth</strong> · An independent engineering publication</span>
          <span>Research · Reason · Share</span>
        </footer>
      </div>
    </ThemeProvider>
  );
}
