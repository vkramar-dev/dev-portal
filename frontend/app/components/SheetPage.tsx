import type { ReactNode } from "react";

export interface DefinitionItem {
  term: string;
  detail: string;
}

interface SheetPageProps {
  index: string;
  title: string;
  definitions: readonly DefinitionItem[];
  mark?: "IN PREPARATION" | "NOT SCHEDULED";
  children?: ReactNode;
}

export default function SheetPage({ index, title, definitions, mark, children }: SheetPageProps) {
  return (
    <article className="sheet-section">
      <p className="sheet-index">{index}</p>
      <h1>{title}</h1>
      <dl className="def-list">
        {definitions.map((item) => (
          <div key={item.term}>
            <dt>{item.term}</dt>
            <dd>{item.detail}</dd>
          </div>
        ))}
      </dl>
      {mark ? <p className="prep-mark">{mark}</p> : null}
      {children}
    </article>
  );
}
