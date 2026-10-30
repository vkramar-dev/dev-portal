import PublicationCatalog from "../components/catalog/PublicationCatalog";

export function meta() {
  return [
    { title: "Common Pitfalls | Programming in Depth" },
    { name: "description", content: "Explore common pitfalls on Programming in Depth, an independent .NET and software engineering publication." },
  ];
}

export default function PitfallsPage() {
  return <PublicationCatalog section="pitfalls" title="Common Pitfalls" />;
}
