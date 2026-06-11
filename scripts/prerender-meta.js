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
const DEFAULT_IMAGE = `${SITE}/og-default.png`;

const routes = [
  {
    path: "agentic-bi",
    title: "Agentic BI | Smith Avenue Insights",
    description:
      "Stop building dashboards. Start building agents. Cut BI costs and surface the data your legacy tools miss, with analytics delivered in natural language.",
    image: `${SITE}/og-agentic-bi.png`,
  },
  {
    path: "company",
    title: "About | Smith Avenue Insights",
    description:
      "Smith Avenue Insights is a Chicago-based software and data consultancy. We scope honestly, build for production, and hand off so your team can run it.",
    image: DEFAULT_IMAGE,
  },
  {
    path: "portfolio",
    title: "The work | Smith Avenue Insights",
    description:
      "Production systems Smith Avenue Insights has shipped: a satellite imagery lakehouse for Airbus, a geospatial platform for Apollo Mapping, and more.",
    image: DEFAULT_IMAGE,
  },
  {
    path: "how-we-work",
    title: "Process | Smith Avenue Insights",
    description:
      "How a Smith Avenue Insights engagement runs, from scoping call to production handoff: the phases, the crew, and what your team owns at the end.",
    image: DEFAULT_IMAGE,
  },
  {
    path: "blog",
    title: "Writing | Smith Avenue Insights",
    description:
      "Field notes from Smith Avenue Insights on data systems, cloud architecture, cost optimization, and building software that lasts in production.",
    image: DEFAULT_IMAGE,
  },
  {
    path: "support",
    title: "FAQ | Smith Avenue Insights",
    description:
      "Answers to what buyers usually ask Smith Avenue Insights before reaching out: what we build, how engagements start, team size, NDAs, and timelines.",
    image: DEFAULT_IMAGE,
  },
  {
    path: "demo",
    title: "Start a project | Smith Avenue Insights",
    description:
      "Scope your next build with Smith Avenue Insights. Most engagements start with a 30-minute call. We send a written scope with timeline and cost.",
    image: DEFAULT_IMAGE,
  },
  {
    path: "accessibility",
    title: "Accessibility | Smith Avenue Insights",
    description:
      "Smith Avenue Insights builds to WCAG 2.1 AA: keyboard navigation, screen reader support, high contrast, and reduced-motion safe interfaces across the site.",
    image: DEFAULT_IMAGE,
  },
  {
    path: "privacy",
    title: "Privacy Policy | Smith Avenue Insights",
    description:
      "How Smith Avenue Insights collects, uses, and protects your information, the data we gather on this site, and the rights you have over your personal data.",
    image: DEFAULT_IMAGE,
  },
  {
    path: "shopify-profit-recovery",
    title: "Shopify Profit Recovery | Smith Avenue Insights",
    description:
      "Recover margin leaking out of your Shopify store. Smith Avenue Insights finds the hidden costs and rebuilds the data so you can see true profit per order.",
    image: DEFAULT_IMAGE,
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
