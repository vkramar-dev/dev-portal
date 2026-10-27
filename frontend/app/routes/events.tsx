import SectionLanding from "../components/SectionLanding";

export function meta() {
  return [
    { title: "Events | Programming in Depth" },
    { name: "description", content: "Explore events on Programming in Depth, an independent .NET and software engineering publication." },
  ];
}

export default function EventsPage() {
  return <SectionLanding slug="events" />;
}
