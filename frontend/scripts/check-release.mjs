/** Run after `pnpm run build`: verifies prerendered HTML and deployable SEO files. */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const build = join(process.cwd(), "build", "client");
const origin = "https://programming-in-depth.com";
// Update this list when publishing a new article, together with sitemap.xml.
const routes = [
  "/", "/articles", "/about",
  "/articles/memory-in-dotnet",
  "/articles/dotnet-garbage-collection",
  "/articles/dotnet-11-csharp-15",
  "/articles/dotnet-strings",
];
const comingSoon = ["/notes", "/quiz", "/videos", "/events"];
let failures = 0;

function check(ok, description) {
  console.log(`${ok ? "✓" : "✗"} ${description}`);
  if (!ok) failures++;
}
function htmlPath(route) {
  return join(build, ...(route === "/" ? [] : route.slice(1).split("/")), "index.html");
}

check(existsSync(join(build, "web.config")), "Root IIS web.config was copied");
check(existsSync(join(build, "robots.txt")), "robots.txt was copied");
check(existsSync(join(build, "sitemap.xml")), "sitemap.xml was copied");
const sitemap = existsSync(join(build, "sitemap.xml"))
  ? readFileSync(join(build, "sitemap.xml"), "utf8") : "";
for (const route of routes) {
  const path = htmlPath(route);
  const url = `${origin}${route}`;
  check(existsSync(path), `${route} was pre-rendered`);
  if (existsSync(path)) {
    const html = readFileSync(path, "utf8");
    check(html.includes('rel="canonical"') && html.includes(url), `Canonical for ${route}`);
    check(html.includes('property="og:title"'), `Open Graph for ${route}`);
  }
  check(sitemap.includes(`<loc>${url}</loc>`), `${route} is in sitemap`);
}
for (const route of comingSoon) {
  const path = htmlPath(route);
  if (existsSync(path)) {
    check(readFileSync(path, "utf8").includes("noindex"), `${route} is noindex`);
  }
  check(!sitemap.includes(`<loc>${origin}${route}</loc>`), `${route} is excluded from sitemap`);
}
if (failures) {
  console.error(`\n${failures} release check(s) failed.`);
  process.exitCode = 1;
} else {
  console.log("\nStatic release checks passed. Live IIS behavior still requires production testing.");
}
