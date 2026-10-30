import type { ReactNode } from "react";

export interface TocItem {
  id: string;
  label: string;
}

export function PublicationToc({ items }: { items: TocItem[] }) {
  return (
    <aside className="pub-sidebar">
      <nav className="toc" aria-label="On this page">
        <div className="toc-label">ON THIS PAGE</div>
        {items.map((item) => <a href={`#${item.id}`} key={item.id}>{item.label}</a>)}
        <div className="toc-bottom">Reading mode<br /><span>Comfortable · Focused</span></div>
      </nav>
    </aside>
  );
}

export default function PublicationBody({ children, toc }: { children: ReactNode; toc?: TocItem[] }) {
  return (
    <div className={`pub-grid${toc?.length ? "" : " pub-grid--full"}`}>
      <div className="pub-content">{children}</div>
      {toc?.length ? <PublicationToc items={toc} /> : null}
    </div>
  );
}
