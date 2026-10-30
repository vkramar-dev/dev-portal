import type { ReactNode } from "react";
import { Link } from "react-router";
import PublicationHeader from "./PublicationHeader";
import type { PublicationHeaderProps } from "./PublicationHeader";
import PublicationBody from "./PublicationBody";
import type { TocItem } from "./PublicationBody";
import { PublicationReferences, PublicationRelated } from "./PublicationElements";
import type { PublicationLink } from "./PublicationElements";

export type PublicationKind = "article" | "note" | "pitfall" | "guideline";

const backLinks: Record<PublicationKind, { to: string; label: string }> = {
  article: { to: "/articles", label: "Articles" },
  note: { to: "/notes", label: "Notes" },
  pitfall: { to: "/pitfalls", label: "Common Pitfalls" },
  guideline: { to: "/guidelines", label: "Guidelines" },
};

export interface PublicationLayoutProps extends PublicationHeaderProps {
  kind: PublicationKind;
  children: ReactNode;
  toc?: TocItem[];
  references?: PublicationLink[];
  related?: { title: string; to: string }[];
}

/** Identical publication header + rich shared body across all editorial formats. */
export default function PublicationLayout({
  children, kind, toc, references = [], related = [],
  title, summary, category, publishedAt, illustration,
}: PublicationLayoutProps) {
  const back = backLinks[kind];
  return <div className="site-shell pub-shell">
    <article className={`publication publication--${kind}`}>
      <PublicationHeader title={title} summary={summary} category={category} publishedAt={publishedAt} illustration={illustration} />
      <PublicationBody toc={toc}>
        {children}
        <PublicationReferences items={references} />
        <PublicationRelated links={related} />
        <Link className="back-link" to={back.to}>← Back to {back.label}</Link>
      </PublicationBody>
    </article>
  </div>;
}
