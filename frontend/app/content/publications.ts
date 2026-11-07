/**
 * The single source of metadata for Articles and Notes.
 *
 * To publish an item, set status to "published" and add its real publishedAt date.
 * Drafts are visible in local development catalogs, but are hidden from public
 * catalogs/search and receive a noindex directive on their article pages.
 *
 * Route components contain the article BODY only; do not repeat titles,
 * summaries, publication dates or publication status in the route files.
 */
export type PublicationKind = "article" | "note";
interface PublicationDetails {
  kind: PublicationKind;
  url: string;
  title: string;
  category: string;
  summary: string;
  description?: string;
}

// A published item must have a date; drafts cannot accidentally carry one.
export type Publication = PublicationDetails &
  ({ status: "draft"; publishedAt?: never } | { status: "published"; publishedAt: string });

export const publications = {
  "memory-in-dotnet": {
    kind: "article",
    url: "/articles/memory-in-dotnet",
    title: "Memory in .NET — Overview",
    category: ".NET · Runtime",
    summary:
      "Where .NET data lives, what controls its lifetime, and which choices are actually yours.",
    description:
      "A practical map of memory in CoreCLR: thread stacks, managed heaps (SOH, LOH, POH), static storage, native memory and executable code.",
    status: "draft",
  },
  "dotnet-garbage-collection": {
    kind: "article",
    url: "/articles/dotnet-garbage-collection",
    title: "Understanding .NET Garbage Collection",
    category: ".NET · Runtime",
    summary: "Allocations, generations, and object survival.",
    description:
      "How .NET garbage collection works: managed heap allocation, Gen 0/1/2, object survival, compaction, and the large object heap.",
    status: "draft",
  },
  "dotnet-strings": {
    kind: "note",
    url: "/notes/dotnet-strings",
    title: ".NET Strings & the Two-Byte Tax",
    category: ".NET · Runtime Internals",
    summary: "UTF-16 representation, string immutability, and the details behind .NET strings.",
    description:
      "Explore how .NET strings use UTF-16, how Length works, and why strings are immutable.",
    status: "draft",
  },
} satisfies Record<string, Publication>;

export type PublicationId = keyof typeof publications;

export function getPublication(id: PublicationId): Publication {
  return publications[id];
}

export const allPublications: Publication[] = Object.values(publications);

/** Show draft entries on localhost only, never in production lists or search. */
export function visiblePublications(kind?: PublicationKind): Publication[] {
  return allPublications.filter(
    (publication) =>
      (kind === undefined || publication.kind === kind) &&
      (import.meta.env.DEV || publication.status === "published"),
  );
}

/** Page SEO comes from the same metadata as the visible article heading. */
export function publicationMeta(publication: Publication) {
  return [
    { title: `${publication.title} | Programming in Depth` },
    { name: "description", content: publication.description ?? publication.summary },
    ...(publication.status === "draft" ? [{ name: "robots", content: "noindex, nofollow" }] : []),
  ];
}
