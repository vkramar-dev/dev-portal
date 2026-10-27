import SheetPage from "../components/SheetPage";
import { pitfallsCopy } from "../content";

export function meta() {
  return [{ title: "Common Pitfalls | Programming in Depth" }];
}

export default function CommonPitfalls() {
  return (
    <SheetPage
      index="SEC / PIT"
      title="Common Pitfalls"
      definitions={[{ term: "PURPOSE", detail: pitfallsCopy }]}
      mark="IN PREPARATION"
    />
  );
}
