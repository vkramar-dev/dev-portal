import PublicationCatalog from "../components/catalog/PublicationCatalog";

export function meta() {
  return [
    { title: "Notes | Programming in Depth" },
    { name: "description", content: "Explore notes on Programming in Depth, an independent .NET and software engineering publication." },
  ];
}

export default function NotesPage() {
  return <PublicationCatalog section="notes" title="Notes" />;
}
