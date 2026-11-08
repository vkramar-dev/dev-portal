import { Navigate } from "react-router";

/** Backward compatibility with the previous Note preview URL. */
export function meta() {
  return [{ name: "robots", content: "noindex, nofollow" }];
}

export default function LegacyDotNetStringsNote() {
  return <Navigate to="/articles/dotnet-strings" replace />;
}
