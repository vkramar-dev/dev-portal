import { pageMeta } from "../content/seo";
import PublicationCatalog from "../components/catalog/PublicationCatalog";

export function meta() {
  return pageMeta({ path: "/notes", title: "Notes | Programming in Depth", description: "Explore notes on Programming in Depth, an independent .NET and software engineering publication.", noindex: true });
}

export default function NotesPage() {
  return <PublicationCatalog section="note" title="Notes" />;
}
