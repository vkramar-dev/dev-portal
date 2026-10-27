import SectionLanding from "../components/SectionLanding";

export function meta() {
  return [
    { title: "Guidelines | Programming in Depth" },
    { name: "description", content: "Explore guidelines on Programming in Depth, an independent .NET and software engineering publication." },
  ];
}

export default function GuidelinesPage() {
  return <SectionLanding slug="guidelines" />;
}
