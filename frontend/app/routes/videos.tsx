import { pageMeta } from "../content/seo";
import SectionLanding from "../components/SectionLanding";

export function meta() {
  return pageMeta({ path: "/videos", title: "Videos | Programming in Depth", description: "Explore videos on Programming in Depth, an independent .NET and software engineering publication.", noindex: true });
}

export default function VideosPage() {
  return <SectionLanding slug="videos" />;
}
