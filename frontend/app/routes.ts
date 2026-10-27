import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("articles", "routes/articles.tsx"),
  route("articles/dotnet-strings", "routes/articles/dotnet-strings.tsx"),
  route("notes", "routes/notes.tsx"),
  route("pitfalls", "routes/pitfalls.tsx"),
  route("guidelines", "routes/guidelines.tsx"),
  route("quiz", "routes/quiz.tsx"),
  route("videos", "routes/videos.tsx"),
  route("events", "routes/events.tsx"),
  route("about", "routes/about.tsx"),
] satisfies RouteConfig;
