import PublicationCatalog from "../components/catalog/PublicationCatalog";

export function meta() {
  return [
    { title: "Guidelines | Programming in Depth" },
    { name: "description", content: "Explore guidelines on Programming in Depth, an independent .NET and software engineering publication." },
  ];
}

export default function GuidelinesPage() {
  return <PublicationCatalog section="guidelines" title="Guidelines" />;
}
