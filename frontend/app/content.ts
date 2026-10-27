export const publicationCopy =
  "Programming in Depth is an independent engineering publication for people who already ship software. It is written primarily about .NET development and software architecture, for experienced developers and architects who want a precise account of how a system actually behaves. Pieces are meant to be read slowly, checked against the runtime, and kept.";

export const articlesCopy =
  "Long-form examinations of a single mechanism, API, or design decision. An article shows the representation, the tradeoff, and the consequence — not a tour of the documentation.";

export const notesCopy =
  "Shorter working notes. A measurement, a nuance, a correction to something commonly repeated. Notes are for the detail that does not need a full essay.";

export const pitfallsCopy =
  "Failure modes that survive code review: the API that looks cheap, the default that is not, the pattern that works until the load or the locale changes.";

export const guidelinesCopy =
  "Editorial and engineering guidance for decisions in a codebase. A guideline states a preference, the condition where it applies, and when to break it.";

export const quizCopy =
  "Public questions for checking a mental model. No account is required. A question asks you to predict an outcome before the explanation is shown.";

export const videosCopy =
  "Talks and walkthroughs for material that is easier to follow while someone works through the code. Short, specific, and tied back to a written piece when one exists.";

export const eventsCopy =
  "Occasional live sessions: a reading of a new piece, a discussion of a design, a scheduled office hour. Events are announced when there is a date.";

export const aboutPrinciples = [
  { term: "01", detail: "Write for practitioners." },
  { term: "02", detail: "Prefer the primary source." },
  { term: "03", detail: "One subject at a time." },
  { term: "04", detail: "Show the tradeoff." },
  { term: "05", detail: "Correct in public." },
  {
    term: "06",
    detail: "Keep the door open — reading and the quiz do not require an account.",
  },
] as const;

export const previewNote =
  "This is a single preview question. A scored question bank is not available. No account is required.";

export const sheetListNote = "The sheet list starts with this essay.";

export const loginBody =
  "Accounts are not available yet. Articles, notes, and the quiz stay open without signing in. Log out will appear as a session control once an account exists.";

export const logoutBody = "No account is signed in. Accounts are not available yet.";

export const searchUnavailable = "Search is not available yet.";

export const liveEssay = {
  title: "How .NET Stores Strings",
  category: ".NET",
  publishedAt: "2026-10-23",
  path: "/articles/dotnet-strings",
} as const;

export function formatPublishedDate(publishedAt: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${publishedAt}T00:00:00Z`));
}
