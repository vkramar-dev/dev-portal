/** Shared, absolute SEO URLs for the public static site. */
export const SITE_URL = "https://programming-in-depth.com";
export const SITE_NAME = "Programming in Depth";

export interface PageSeo {
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
  noindex?: boolean;
}

export function pageMeta({ path, title, description, type = "website", noindex = false }: PageSeo) {
  const url = `${SITE_URL}${path === "/" ? "/" : path.replace(/\/$/, "")}`;
  return [
    { title },
    { name: "description", content: description },
    { tagName: "link" as const, rel: "canonical", href: url },
    { property: "og:type", content: type },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: "en_US" },
    { property: "og:url", content: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: `${SITE_URL}/og-image.png` },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: "Programming in Depth — .NET Engineering in Detail" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: `${SITE_URL}/og-image.png` },
    ...(noindex ? [{ name: "robots", content: "noindex, follow" }] : []),
  ];
}
