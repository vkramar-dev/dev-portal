import SheetPage from "../components/SheetPage";
import { videosCopy } from "../content";

export function meta() {
  return [{ title: "Videos | Programming in Depth" }];
}

export default function Videos() {
  return (
    <SheetPage
      index="SEC / VID"
      title="Videos"
      definitions={[{ term: "PURPOSE", detail: videosCopy }]}
      mark="IN PREPARATION"
    />
  );
}
