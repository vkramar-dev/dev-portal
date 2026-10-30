import PublicationCatalog from "../components/catalog/PublicationCatalog";

export function meta() {
  return [
    { title: "Articles | Programming in Depth" },
    { name: "description", content: "Explore articles on Programming in Depth, an independent .NET and software engineering publication." },
  ];
}

export default function ArticlesPage() {
  return <PublicationCatalog section="articles" title="Articles" />;
}
