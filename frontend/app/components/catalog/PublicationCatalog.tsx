import { useEffect, useId, useMemo, useState } from "react";
import { Link } from "react-router";
import { visiblePublications, type Publication, type PublicationKind } from "../../content/publications";

export type CatalogDensity = "normal" | "compact";
export type CatalogSortOrder = "newest" | "oldest";
const CATALOG_DENSITY_KEY = "pind-catalog-density";

interface PublicationCatalogProps {
  section: PublicationKind;
  title: string;
}

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

function PublicationEntry({ entry, density }: { entry: Publication; density: CatalogDensity }) {
  const date = entry.publishedAt
    ? dateFormatter.format(new Date(`${entry.publishedAt}T12:00:00Z`))
    : null;

  return (
    <article className="publication-catalog-entry">
      <div className="publication-catalog-entry-meta">
        <span className="publication-catalog-entry-category">{entry.category}</span>
        {date ? (
          <time className="publication-catalog-entry-date" dateTime={entry.publishedAt}>{date}</time>
        ) : (
          <span className="publication-catalog-entry-unpublished">Unpublished</span>
        )}
      </div>
      <h2 className="publication-catalog-entry-title">
        <Link to={entry.url}>{entry.title}</Link>
      </h2>
      {density === "normal" && <p className="publication-catalog-entry-summary">{entry.summary}</p>}
    </article>
  );
}

/** One catalog UI for Articles and Notes. */
export default function PublicationCatalog({ section, title }: PublicationCatalogProps) {
  const [density, setDensity] = useState<CatalogDensity>("normal");
  useEffect(() => {
    // Restore after hydration: prerendered HTML must match the first React render.
    try {
      const stored = localStorage.getItem(CATALOG_DENSITY_KEY);
      if (stored === "normal" || stored === "compact") setDensity(stored);
    } catch { /* Storage can be blocked. */ }
  }, []);

  function changeDensity(next: CatalogDensity) {
    setDensity(next);
    try { localStorage.setItem(CATALOG_DENSITY_KEY, next); } catch { /* Optional persistence. */ }
  }
  const [topic, setTopic] = useState("all");
  const [sortOrder, setSortOrder] = useState<CatalogSortOrder>("newest");
  const topicId = useId();
  const sortId = useId();

  const entries = useMemo(() => visiblePublications(section), [section]);
  const topics = useMemo(() => [...new Set(entries.map((entry) => entry.category))].sort(), [entries]);
  const displayed = useMemo(() => {
    const filtered = entries.filter((entry) => topic === "all" || entry.category === topic);
    return filtered.sort((a, b) => {
      // Local draft entries follow published material.
      if (a.status !== b.status) return a.status === "draft" ? 1 : -1;
      if (a.publishedAt && b.publishedAt) {
        const result = a.publishedAt.localeCompare(b.publishedAt);
        if (result !== 0) return sortOrder === "newest" ? -result : result;
      }
      return a.title.localeCompare(b.title);
    });
  }, [entries, topic, sortOrder]);

  return (
    <section className={`site-shell publication-catalog publication-catalog--${density}`} aria-labelledby="publication-catalog-title">
      {/* The active Navbar item already identifies the section visually. */}
      <h1 id="publication-catalog-title" className="visually-hidden">{title}</h1>
      <div className="publication-catalog-toolbar">
        <div className="publication-catalog-filters">
          <div className="publication-catalog-control">
            <label htmlFor={topicId}>Topic</label>
            <select id={topicId} value={topic} onChange={(event) => setTopic(event.target.value)}>
              <option value="all">All topics</option>
              {topics.map((value) => <option key={value} value={value}>{value}</option>)}
            </select>
          </div>
          <div className="publication-catalog-control">
            <label htmlFor={sortId}>Sort</label>
            <select id={sortId} value={sortOrder} onChange={(event) => setSortOrder(event.target.value as CatalogSortOrder)}>
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>
        </div>
        <div className="publication-catalog-toolbar-right">
          <span className="publication-catalog-count" aria-live="polite">
            {displayed.length} {displayed.length === 1 ? "publication" : "publications"}
          </span>
          <div className="publication-catalog-density" role="group" aria-label="List appearance">
            <button type="button" className={density === "normal" ? "active" : ""}
              aria-pressed={density === "normal"} onClick={() => changeDensity("normal")}>Normal</button>
            <button type="button" className={density === "compact" ? "active" : ""}
              aria-pressed={density === "compact"} onClick={() => changeDensity("compact")}>Compact</button>
          </div>
        </div>
      </div>

      <div className="publication-catalog-list">
        {displayed.map((entry) => <PublicationEntry key={entry.url} entry={entry} density={density} />)}
        {displayed.length === 0 && (
          <div className="publication-catalog-empty">
            No publications for this topic.{' '}
            <button type="button" onClick={() => setTopic("all")}>Clear filter</button>
          </div>
        )}
      </div>
    </section>
  );
}
