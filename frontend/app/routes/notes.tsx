import SheetPage from "../components/SheetPage";
import { notesCopy } from "../content";

export function meta() {
  return [{ title: "Notes | Programming in Depth" }];
}

export default function Notes() {
  return (
    <SheetPage
      index="SEC / NOT"
      title="Notes"
      definitions={[{ term: "PURPOSE", detail: notesCopy }]}
      mark="IN PREPARATION"
    />
  );
}
