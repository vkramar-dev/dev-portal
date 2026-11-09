import { pageMeta } from "../content/seo";
import PublicationCatalog from "../components/catalog/PublicationCatalog";

export function meta() {
  return pageMeta({ path: "/articles", title: "Articles | Programming in Depth", description: "Explore articles on Programming in Depth, an independent .NET and software engineering publication." });
}

export default function ArticlesPage() {
  return <PublicationCatalog section="article" title="Articles" />;
}
