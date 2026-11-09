import { pageMeta } from "../content/seo";
import SectionLanding from "../components/SectionLanding";

export function meta() {
  return pageMeta({ path: "/about", title: "About | Programming in Depth", description: "About Programming in Depth, an independent engineering publication focused on .NET internals, rigorous experiments and practical engineering trade-offs." });
}

export default function AboutPage() {
  return <SectionLanding slug="about" />;
}
