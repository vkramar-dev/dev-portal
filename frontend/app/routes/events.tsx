import SheetPage from "../components/SheetPage";
import { eventsCopy } from "../content";

export function meta() {
  return [{ title: "Events | Programming in Depth" }];
}

export default function Events() {
  return (
    <SheetPage
      index="SEC / EVT"
      title="Events"
      definitions={[{ term: "PURPOSE", detail: eventsCopy }]}
      mark="NOT SCHEDULED"
    />
  );
}
