import { Children, isValidElement, type ReactNode } from "react";
import { Link } from "react-router";
import { formatPublishedDate } from "../content";

interface ArticleLink {
  title: string;
  url: string;
}

interface ArticleLayoutProps {
  title: string;
  category: string;
  publishedAt: string;
  summary?: string;
  references?: ArticleLink[];
  children: ReactNode;
}

function renderBody(children: ReactNode) {
  return Children.map(children, (child) => {
    if (isValidElement(child) && child.type === "pre") {
      return (
        <figure className="fig">
          <figcaption>FIG.</figcaption>
          {child}
        </figure>
      );
    }

    return child;
  });
}

export default function ArticleLayout({
  title,
  category,
  publishedAt,
  summary,
  references,
  children,
}: ArticleLayoutProps) {
  const formattedDate = formatPublishedDate(publishedAt);

  return (
    <article className="article-page">
      <p className="sheet-index">ART / 001</p>
      <table className="meta-table">
        <tbody>
          <tr>
            <th scope="row">TITLE</th>
            <td>
              <h1>{title}</h1>
            </td>
          </tr>
          <tr>
            <th scope="row">CATEGORY</th>
            <td>{category}</td>
          </tr>
          <tr>
            <th scope="row">DATE</th>
            <td>
              <time dateTime={publishedAt}>{formattedDate}</time>
            </td>
          </tr>
          {summary ? (
            <tr>
              <th scope="row">SUMMARY</th>
              <td>{summary}</td>
            </tr>
          ) : null}
        </tbody>
      </table>

      <div className="article-body">{renderBody(children)}</div>

      {references && references.length > 0 ? (
        <section className="refs" aria-label="References">
          <h2>References</h2>
          <ul>
            {references.map((reference) => (
              <li key={reference.url}>
                <a href={reference.url}>{reference.title}</a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <p className="return-line">
        <Link to="/">Back to Home</Link>
      </p>
    </article>
  );
}
