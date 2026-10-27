import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import AppLayout from "./components/AppLayout";
import "./styles/site.css";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
