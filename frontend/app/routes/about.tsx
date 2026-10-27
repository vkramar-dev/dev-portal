import SectionLanding from "../components/SectionLanding";

export function meta() {
  return [
    { title: "About | Programming in Depth" },
    { name: "description", content: "Explore about on Programming in Depth, an independent .NET and software engineering publication." },
  ];
}

export default function AboutPage() {
  return <SectionLanding slug="about" />;
}
