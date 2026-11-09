import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import AppLayout from "./components/AppLayout";
import "./styles/site.css";
import "./styles/publication.css";
import "./styles/catalog.css";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon-96x96.png" type="image/png" sizes="96x96" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <Meta />
        <Links />
      </head>
      <body>
        <AppLayout><Outlet /></AppLayout>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
