import { useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router";

export function PublicationSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <section id={id}><h2>{title}</h2>{children}</section>;
}

export function CodeExample({ code, language = "C#" }: { code: string; language?: string }) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
  }
  return (
    <div className="code-panel">
      <div className="code-top">
        <span>{language}</span>
        <button type="button" onClick={() => void copy()} aria-label={`Copy ${language} code`}>
          {copyStatus === "copied" ? "Copied" : copyStatus === "failed" ? "Select text" : "Copy"}
        </button>
      </div>
      <pre><code>{code}</code></pre>
    </div>
  );
}

export function PublicationCallout({ title, tone = "note", children }: {
  title: string; tone?: "note" | "warning"; children: ReactNode;
}) {
  return <aside className={`callout ${tone}`}><div className="callout-head">{title}</div><p>{children}</p></aside>;
}

export function PublicationFigure({ caption, note, children }: {
  caption: string; note?: string; children: ReactNode;
}) {
  return <figure className="diagram"><figcaption>{caption}</figcaption>{children}{note && <p className="figure-note">{note}</p>}</figure>;
}

export function PublicationTable({ children }: { children: ReactNode }) {
  return <div className="table-scroll"><table className="pub-table">{children}</table></div>;
}

export interface PublicationLink { title: string; url: string }

export function PublicationReferences({ items }: { items: PublicationLink[] }) {
  if (!items.length) return null;
  return <section className="pub-references" id="references" aria-labelledby="references-title">
    <h2 id="references-title">References</h2>
    <ol>{items.map((item) => <li key={item.url}><a href={item.url} rel="noopener noreferrer" target="_blank">{item.title}</a></li>)}</ol>
  </section>;
}

export function PublicationRelated({ title = "Related publications", description, links }: {
  title?: string; description?: string; links: { title: string; to: string }[];
}) {
  if (!links.length) return null;
  return <section className="pub-related" aria-label="Related publications">
    <div className="related-top">KEEP EXPLORING</div>
    <h3>{title}</h3>
    {description && <p>{description}</p>}
    <ul>{links.map((link) => <li key={link.to}><Link to={link.to}>{link.title} ↗</Link></li>)}</ul>
  </section>;
}
