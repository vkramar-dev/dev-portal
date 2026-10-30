/** Compatibility wrapper for pre-existing article imports. New routes should use PublicationLayout directly. */
import type { ReactNode } from "react";
import PublicationLayout from "./publications/PublicationLayout";
import type { PublicationLink } from "./publications/PublicationElements";

interface ArticleLayoutProps {
  title: string;
  category: string;
  publishedAt: string;
  summary?: string;
  references?: PublicationLink[];
  children: ReactNode;
}

export default function ArticleLayout({ title, category, publishedAt, summary, references, children }: ArticleLayoutProps) {
  return <PublicationLayout kind="article" title={title} category={category} publishedAt={publishedAt}
    summary={summary ?? ""} references={references}>{children}</PublicationLayout>;
}
