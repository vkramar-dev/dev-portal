import SectionLanding from "../components/SectionLanding";

export function meta() {
  return [
    { title: "Videos | Programming in Depth" },
    { name: "description", content: "Explore videos on Programming in Depth, an independent .NET and software engineering publication." },
  ];
}

export default function VideosPage() {
  return <SectionLanding slug="videos" />;
}
