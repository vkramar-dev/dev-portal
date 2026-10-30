import { publicationPreviews } from "./publicationPreviews";
import { publishedArticles } from "./siteSections";

/** The four editorial catalogs share one source of metadata and one layout. */
export type PublicationCatalogSection = "articles" | "notes" | "pitfalls" | "guidelines";

export interface CatalogEntry {
  section: PublicationCatalogSection;
  url: string;
  title: string;
  summary: string;
  category: string;
  topic: string;
  publishedAt?: string;
  preview: boolean;
}

const articles: CatalogEntry[] = publishedArticles.map((item) => ({
  section: "articles",
  url: item.url,
  title: item.title,
  summary: item.summary,
  category: `${item.category} · ${item.topic}`,
  topic: item.category,
  publishedAt: item.publishedAt,
  preview: false,
}));

const previews: CatalogEntry[] = publicationPreviews.map((item) => ({
  section: item.section,
  url: item.url,
  title: item.title,
  summary: item.summary,
  category: item.category,
  topic: item.category.split(" · ")[0],
  // A design preview is not published: do not invent a publication date.
  preview: true,
}));

export const catalogEntries: CatalogEntry[] = [...articles, ...previews];
