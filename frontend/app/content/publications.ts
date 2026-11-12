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
import { pageMeta, SITE_NAME, SITE_URL } from "./seo";

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
    status: "published",
    publishedAt: "2026-11-10",
  },
  "dotnet-garbage-collection": {
    kind: "article",
    url: "/articles/dotnet-garbage-collection",
    title: "Understanding .NET Garbage Collection",
    category: ".NET · Runtime",
    summary: "Allocations, generations, and object survival.",
    description:
      "How .NET garbage collection works: managed heap allocation, Gen 0/1/2, object survival, compaction, and the large object heap.",
    status: "published",
    publishedAt: "2026-11-10",
  },
  "dotnet-11-csharp-15": {
    kind: "article",
    url: "/articles/dotnet-11-csharp-15",
    title: ".NET 11 / C# 15",
    category: ".NET · C#",
    summary:
      "Runtime Async, decimal numeric types, unions, extension indexers, and labeled loops — which .NET 11 and C# 15 changes are actually useful?",
    description:
      "An engineer's practical take on .NET 11 and C# 15: Runtime Async, Decimal32/64/128, union return types, extension indexers, and labeled break/continue.",
    status: "published",
    publishedAt: "2026-11-10",
  },
  "dotnet-strings": {
    kind: "article",
    url: "/articles/dotnet-strings",
    title: ".NET Strings & the Two-Byte Tax",
    category: ".NET · Runtime Internals",
    summary:
      "What .NET strings really cost in memory, how other runtimes handle ASCII, and ways to avoid unnecessary UTF-16 storage.",
    description:
      "Explore the memory layout of .NET strings, UTF-16 overhead, string interning, Java/Python/Node.js comparisons and practical UTF-8 alternatives.",
    status: "published",
    publishedAt: "2026-11-10",
  },
  "when-to-use-valuetask": {
    kind: "article",
    url: "/articles/when-to-use-valuetask",
    title: "When to use ValueTask?",
    category: ".NET · Runtime Internals",
    summary: "When ValueTask reduces allocations — and why Task should remain the default choice.",
    description:
      "When to use ValueTask instead of Task in .NET, how synchronous completion reduces managed heap allocations, and how IValueTaskSource enables pooling.",
    status: "published",
    publishedAt: "2026-11-12",
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

/** Search and social metadata for an individual, pre-rendered publication. */
export function publicationMeta(publication: Publication) {
  const description = publication.description ?? publication.summary;
  const title = `${publication.title} | ${SITE_NAME}`;
  return [
    ...pageMeta({
      path: publication.url,
      title,
      description,
      type: "article",
      noindex: publication.status === "draft",
    }),
    ...(publication.publishedAt
      ? [
          { property: "article:published_time", content: publication.publishedAt },
          {
            "script:ld+json": {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: publication.title,
              description,
              url: `${SITE_URL}${publication.url}`,
              datePublished: publication.publishedAt,
              inLanguage: "en",
              author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
              publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
            },
          },
        ]
      : []),
  ];
}
