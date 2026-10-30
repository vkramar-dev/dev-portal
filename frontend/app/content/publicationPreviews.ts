/** Not yet editorially reviewed. Keep out of Home's publishedArticles list and search-engine indexes. */
export const publicationPreviews = [
  {
    section: "articles",
    title: "Memory in .NET",
    url: "/articles/memory-in-dotnet",
    category: ".NET · Runtime",
    summary:
      "An overview of thread stacks, managed heaps, static storage, native memory, and executable code.",
  },
  {
    section: "articles",
    title: "Understanding .NET Garbage Collection",
    url: "/articles/dotnet-garbage-collection",
    category: ".NET · Runtime",
    summary: "Diagrams, code, a synthetic chart and a methodology example.",
  },
  {
    section: "notes",
    title: "What Does String.Length Measure?",
    url: "/notes/string-length",
    category: ".NET · Strings",
    summary: "A concise observation about code units and Unicode text.",
  },
  {
    section: "pitfalls",
    title: "Blocking on Async Code",
    url: "/pitfalls/blocking-on-async",
    category: ".NET · Concurrency",
    summary: "Sync-over-async pitfalls and their context-dependent consequences.",
  },
  {
    section: "guidelines",
    title: "Choosing EF Core Query Tracking",
    url: "/guidelines/ef-core-tracking",
    category: "EF Core · Data Access",
    summary: "A small engineering decision guide with code and a trade-off table.",
  },
] as const;
