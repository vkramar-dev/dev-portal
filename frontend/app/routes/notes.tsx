import SectionLanding from "../components/SectionLanding";

export function meta() {
  return [
    { title: "Notes | Programming in Depth" },
    { name: "description", content: "Explore notes on Programming in Depth, an independent .NET and software engineering publication." },
  ];
}

export default function NotesPage() {
  return <SectionLanding slug="notes" />;
}
