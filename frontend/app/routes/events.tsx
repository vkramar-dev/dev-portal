import { pageMeta } from "../content/seo";
import SectionLanding from "../components/SectionLanding";

export function meta() {
  return pageMeta({ path: "/events", title: "Events | Programming in Depth", description: "Explore events on Programming in Depth, an independent .NET and software engineering publication.", noindex: true });
}

export default function EventsPage() {
  return <SectionLanding slug="events" />;
}
