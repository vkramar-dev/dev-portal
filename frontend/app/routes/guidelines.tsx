import SheetPage from "../components/SheetPage";
import { guidelinesCopy } from "../content";

export function meta() {
  return [{ title: "Guidelines | Programming in Depth" }];
}

export default function Guidelines() {
  return (
    <SheetPage
      index="SEC / GDL"
      title="Guidelines"
      definitions={[{ term: "PURPOSE", detail: guidelinesCopy }]}
      mark="IN PREPARATION"
    />
  );
}
