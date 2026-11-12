import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

const apiUrl = import.meta.env.VITE_API_URL;

export default function VisitTracker() {
  const { pathname } = useLocation();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    // Do not track repeated effects or hash-only navigation.
    if (lastTrackedPath.current === pathname) return;
    lastTrackedPath.current = pathname;

    // Tracking must never interfere with navigation or rendering.
    void fetch(`${apiUrl}/api/app/visit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "omit",
      keepalive: true,
      body: JSON.stringify({
        path: pathname,
        referrer: document.referrer,
      }),
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Visit tracking failed: ${response.status}`);
      })
      .catch((error: unknown) => {
        if (import.meta.env.DEV) console.warn("Visit tracking failed", error);
      });
  }, [pathname]);

  return null;
}
