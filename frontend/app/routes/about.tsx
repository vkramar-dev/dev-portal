import SheetPage from "../components/SheetPage";
import { aboutPrinciples, publicationCopy } from "../content";

export function meta() {
  return [{ title: "About | Programming in Depth" }];
}

export default function About() {
  return (
    <SheetPage
      index="SEC / ABT"
      title="About"
      definitions={[{ term: "PURPOSE", detail: publicationCopy }, ...aboutPrinciples]}
    />
  );
}
