import { pageMeta } from "../content/seo";
import SectionLanding from "../components/SectionLanding";

export function meta() {
  return pageMeta({ path: "/quiz", title: "Quiz | Programming in Depth", description: "Explore quiz on Programming in Depth, an independent .NET and software engineering publication.", noindex: true });
}

export default function QuizPage() {
  return <SectionLanding slug="quiz" />;
}
