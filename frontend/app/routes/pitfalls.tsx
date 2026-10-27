import SectionLanding from "../components/SectionLanding";

export function meta() {
  return [
    { title: "Common Pitfalls | Programming in Depth" },
    { name: "description", content: "Explore common pitfalls on Programming in Depth, an independent .NET and software engineering publication." },
  ];
}

export default function PitfallsPage() {
  return <SectionLanding slug="pitfalls" />;
}
