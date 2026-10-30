import type { ReactNode } from "react";

export interface PublicationHeaderProps {
  category: string;
  title: string;
  summary: string;
  publishedAt?: string;
  illustration?: ReactNode | null;
}

/** Visual identity shared by Articles, Notes, Pitfalls and Guidelines. */
export function PublicationIcon() {
  return (
    <span className="pub-icon" aria-hidden="true">
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 18 10 32l14 14" />
        <path d="m40 18 14 14-14 14" />
        <path d="m37 14-10 36" />
      </svg>
    </span>
  );
}

function formatDate(iso: string) {
  // Explicit UTC avoids changing the displayed date in different time zones.
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}

export default function PublicationHeader({
  category, title, summary, publishedAt, illustration = <PublicationIcon />,
}: PublicationHeaderProps) {
  return (
    <header className="pub-header pub-header-v2">
      <div className={`pub-heading-row${illustration === null ? " pub-heading-row--no-art" : ""}`}>
        {illustration}
        <div className="pub-heading-copy">
          <div className="pub-heading-meta">
            <span className="pub-category-pill">{category}</span>
            {publishedAt ? (
              <span className="pub-published">Published: <time dateTime={publishedAt}>{formatDate(publishedAt)}</time></span>
            ) : (
              <span className="pub-preview-status">Design preview · Unpublished</span>
            )}
          </div>
          <h1>{title}</h1>
          <p className="pub-deck">{summary}</p>
        </div>
      </div>
    </header>
  );
}
