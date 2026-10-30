import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("articles", "routes/articles.tsx"),
  route("articles/dotnet-strings", "routes/articles/dotnet-strings.tsx"),
  route("articles/dotnet-garbage-collection", "routes/articles/dotnet-garbage-collection.tsx"),
  route("articles/memory-in-dotnet", "routes/articles/memory-in-dotnet.tsx"),
  route("notes", "routes/notes.tsx"),
  route("notes/string-length", "routes/notes/string-length.tsx"),
  route("pitfalls", "routes/pitfalls.tsx"),
  route("pitfalls/blocking-on-async", "routes/pitfalls/blocking-on-async.tsx"),
  route("guidelines", "routes/guidelines.tsx"),
  route("guidelines/ef-core-tracking", "routes/guidelines/ef-core-tracking.tsx"),
  route("quiz", "routes/quiz.tsx"),
  route("videos", "routes/videos.tsx"),
  route("events", "routes/events.tsx"),
  route("about", "routes/about.tsx"),
] satisfies RouteConfig;
