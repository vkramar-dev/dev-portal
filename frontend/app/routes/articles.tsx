import SectionLanding from "../components/SectionLanding";

export function meta() {
  return [
    { title: "Articles | Programming in Depth" },
    { name: "description", content: "Explore articles on Programming in Depth, an independent .NET and software engineering publication." },
  ];
}

export default function ArticlesPage() {
  return <SectionLanding slug="articles" />;
}
