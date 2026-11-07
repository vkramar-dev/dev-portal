import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("articles", "routes/articles.tsx"),
  route("articles/dotnet-garbage-collection", "routes/articles/dotnet-garbage-collection.tsx"),
  route("articles/memory-in-dotnet", "routes/articles/memory-in-dotnet.tsx"),
  route("notes", "routes/notes.tsx"),
  route("notes/dotnet-strings", "routes/notes/dotnet-strings.tsx"),
  route("quiz", "routes/quiz.tsx"),
  route("videos", "routes/videos.tsx"),
  route("events", "routes/events.tsx"),
  route("about", "routes/about.tsx"),
] satisfies RouteConfig;
