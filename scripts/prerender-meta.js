import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "dist");

const SITE = "https://smithaveinsights.com";

/**
 * Per-route crawlable HTML shells. Social/link crawlers (LinkedIn, X, etc.) do
 * not run JavaScript, so each route that needs its own link preview gets a
 * static index.html with route-specific Open Graph tags. We clone the built
 * dist/index.html (keeping its hashed asset tags current) and only swap the
 * <head> meta, so the SPA still boots normally for real visitors.
 */
const routes = [
  {
    path: "agentic-bi",
    title: "Agentic BI — Smith Avenue Insights",
    description:
      "Stop building dashboards. Start building agents. Slash BI costs by 60% and index the 80% of data your legacy tools can't see.",
    image: `${SITE}/og-agentic-bi.png`,
  },
];

const indexHtml = readFileSync(join(distDir, "index.html"), "utf8");

const setMeta = (html, attr, key, value) => {
  // Replace the content of an existing <meta {attr}="{key}" content="..."> tag.
  const re = new RegExp(
    `(<meta\\s+${attr}="${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"\\s+content=")[^"]*(")`,
    "i"
  );
  return html.replace(re, `$1${value}$2`);
};

for (const route of routes) {
  let html = indexHtml;
  const url = `${SITE}/${route.path}`;

  // <title>
  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${route.title}</title>`);

  // Open Graph
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "property", "og:title", route.title);
  html = setMeta(html, "property", "og:description", route.description);
  html = setMeta(html, "property", "og:image", route.image);

  // Twitter/X
  html = setMeta(html, "name", "twitter:title", route.title);
  html = setMeta(html, "name", "twitter:description", route.description);
  html = setMeta(html, "name", "twitter:image", route.image);

  // Normalize the trailing slash client-side (GitHub Pages serves this file at
  // /<path>/) so the SPA router sees the canonical /<path> with no extra round
  // trip. Runs before the deferred module bundle.
  const normalize = `<script>if(location.pathname==='/${route.path}/'){history.replaceState(null,'','/${route.path}');}</script>`;
  html = html.replace(/<\/head>/i, `${normalize}</head>`);

  const outDir = join(distDir, route.path);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), html, "utf8");
  console.log(`\u2713 Prerendered meta shell for /${route.path}`);
}
