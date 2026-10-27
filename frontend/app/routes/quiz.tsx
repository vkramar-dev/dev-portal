import SectionLanding from "../components/SectionLanding";

export function meta() {
  return [
    { title: "Quiz | Programming in Depth" },
    { name: "description", content: "Explore quiz on Programming in Depth, an independent .NET and software engineering publication." },
  ];
}

export default function QuizPage() {
  return <SectionLanding slug="quiz" />;
}
