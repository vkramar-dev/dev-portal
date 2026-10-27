import { Link } from "react-router";
import SheetPage from "../../components/SheetPage";
import { articlesCopy, formatPublishedDate, liveEssay, sheetListNote } from "../../content";

export function meta() {
  return [{ title: "Articles | Programming in Depth" }];
}

export default function Articles() {
  return (
    <SheetPage
      index="SEC / ART"
      title="Articles"
      definitions={[{ term: "PURPOSE", detail: articlesCopy }]}
    >
      <table className="index-table">
        <caption>{sheetListNote}</caption>
        <thead>
          <tr>
            <th scope="col">DATE</th>
            <th scope="col">CATEGORY</th>
            <th scope="col">TITLE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <time dateTime={liveEssay.publishedAt}>{formatPublishedDate(liveEssay.publishedAt)}</time>
            </td>
            <td>{liveEssay.category}</td>
            <td>
              <Link to={liveEssay.path}>{liveEssay.title}</Link>
            </td>
          </tr>
        </tbody>
      </table>
    </SheetPage>
  );
}
