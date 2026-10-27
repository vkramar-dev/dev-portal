/** Public sections used by the Home overview, navigation and header search. */
export const siteSections = [
  { slug: "articles", title: "Articles", kicker: "In-depth investigations", description: "Deep research into .NET internals, runtimes, databases, performance and the engineering decisions behind modern software.", symbol: "A" },
  { slug: "notes", title: "Notes", kicker: "Concise observations", description: "Focused technical explanations, surprising details and practical insights — one subject at a time.", symbol: "N" },
  { slug: "pitfalls", title: "Common Pitfalls", kicker: "What can go wrong", description: "Frequent coding mistakes, misleading assumptions and unexpected consequences, explained with evidence.", symbol: "!" },
  { slug: "guidelines", title: "Guidelines", kicker: "Engineering judgment", description: "Recommendations, design criteria and trade-offs to help make informed technical decisions.", symbol: "↗" },
  { slug: "quiz", title: "Quiz", kicker: "Challenge your assumptions", description: "Assess your understanding of .NET and related technologies. No registration required.", symbol: "?" },
  { slug: "videos", title: "Videos", kicker: "See how it works", description: "Technical walkthroughs, focused shorts and visual demonstrations supporting our research.", symbol: "▶" },
  { slug: "events", title: "Events", kicker: "Engineering conversations", description: "Discussions, live sessions and recordings that bring technical questions into the open.", symbol: "◉" },
  { slug: "about", title: "About", kicker: "What PinD stands for", description: "An independent engineering publication built around curiosity, technical rigor and thoughtful research.", symbol: "P" },
] as const;

export type SiteSection = (typeof siteSections)[number];

export const publishedArticles = [
  {
    title: "How .NET Stores Strings",
    url: "/articles/dotnet-strings",
    summary: "UTF-16, string length, immutability and memory behavior in .NET.",
    category: ".NET",
  },
] as const;
