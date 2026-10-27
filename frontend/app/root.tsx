import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import AppLayout from "./components/AppLayout";
import theme from "./theme";
import "./sheet.css";

const fontHref =
  "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap";

export default function App() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href={fontHref} />
        <Meta />
        <Links />
        <InitColorSchemeScript
          attribute="data-mui-color-scheme"
          defaultMode="light"
          modeStorageKey="pind-mode-grid"
          colorSchemeStorageKey="pind-scheme-grid"
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider
          theme={theme}
          defaultMode="light"
          modeStorageKey="pind-mode-grid"
          colorSchemeStorageKey="pind-scheme-grid"
        >
          <CssBaseline enableColorScheme />
          <AppLayout>
            <Outlet />
          </AppLayout>
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
