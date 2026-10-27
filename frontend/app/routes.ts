import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("articles/dotnet-strings", "routes/articles/dotnet-strings.tsx"),
] satisfies RouteConfig;
