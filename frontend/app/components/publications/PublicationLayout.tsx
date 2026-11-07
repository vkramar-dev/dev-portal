import type { ReactNode } from "react";
import { Link } from "react-router";
import type { Publication, PublicationKind } from "../../content/publications";
import PublicationHeader from "./PublicationHeader";
import PublicationBody from "./PublicationBody";
import type { TocItem } from "./PublicationBody";
import { PublicationReferences, PublicationRelated } from "./PublicationElements";
import type { PublicationLink } from "./PublicationElements";

const backLinks: Record<PublicationKind, { to: string; label: string }> = {
  article: { to: "/articles", label: "Articles" },
  note: { to: "/notes", label: "Notes" },
};

export interface PublicationLayoutProps {
  publication: Publication;
  children: ReactNode;
  toc?: TocItem[];
  references?: PublicationLink[];
  related?: { title: string; to: string }[];
  illustration?: ReactNode | null;
}

/** Shared article/note layout; all public metadata lives in publications.ts. */
export default function PublicationLayout({
  publication, children, toc, references = [], related = [], illustration,
}: PublicationLayoutProps) {
  const back = backLinks[publication.kind];
  return <div className="site-shell pub-shell">
    <article className={`publication publication--${publication.kind}`}>
      <PublicationHeader
        title={publication.title}
        summary={publication.summary}
        category={publication.category}
        publishedAt={publication.publishedAt}
        illustration={illustration}
      />
      <PublicationBody toc={toc}>
        {children}
        <PublicationReferences items={references} />
        <PublicationRelated links={related} />
        <Link className="back-link" to={back.to}>← Back to {back.label}</Link>
      </PublicationBody>
    </article>
  </div>;
}
