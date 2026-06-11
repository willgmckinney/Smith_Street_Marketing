import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "dist");
const rootDir = join(__dirname, "..");

const SITE = "https://smithaveinsights.com";
const DEFAULT_IMAGE = `${SITE}/og-default.png`;

/** Truncate for OG / meta description (140–160 chars). */
const clip = (text, max = 155) =>
  text.length <= max ? text : `${text.slice(0, max - 3).trimEnd()}...`;

/** Escape for HTML attribute values. */
const esc = (s) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");

/**
 * Pull id, title, and excerpt from each entry in blogPosts.ts without a TS
 * runtime. Handles single- and double-quoted titles.
 */
function parseBlogPosts() {
  const raw = readFileSync(join(rootDir, "src/data/blogPosts.ts"), "utf8");
  const start = raw.indexOf("export const blogPosts");
  const arrayBody = raw.slice(start);

  const idRe = /id:\s*"([^"]+)"/g;
  const anchors = [];
  let m;
  while ((m = idRe.exec(arrayBody)) !== null) {
    anchors.push({ id: m[1], index: m.index });
  }

  const readQuoted = (chunk, field) => {
    const inline = chunk.match(
      new RegExp(`${field}:\\s*("([^"]*)"|'([^']*)')`)
    );
    if (inline) return inline[2] ?? inline[3] ?? "";

    const multiline = chunk.match(
      new RegExp(`${field}:\\s*\\n\\s*("([^"]*)"|'([^']*)')`)
    );
    return multiline?.[2] ?? multiline?.[3] ?? "";
  };

  return anchors.map((anchor, i) => {
    const end = anchors[i + 1]?.index ?? arrayBody.length;
    const chunk = arrayBody.slice(anchor.index, end);
    const title = readQuoted(chunk, "title");
    const excerpt = readQuoted(chunk, "excerpt");
    return { id: anchor.id, title, excerpt };
  });
}

/**
 * Per-route crawlable HTML shells. Social/link crawlers (LinkedIn, X, etc.) do
 * not run JavaScript, so each route that needs its own link preview gets a
 * static index.html with route-specific Open Graph tags.
 */
const staticRoutes = [
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
  },
  {
    path: "portfolio",
    title: "The work | Smith Avenue Insights",
    description:
      "Production systems Smith Avenue Insights has shipped: a satellite imagery lakehouse for Airbus, a geospatial platform for Apollo Mapping, and more.",
  },
  {
    path: "how-we-work",
    title: "Process | Smith Avenue Insights",
    description:
      "How a Smith Avenue Insights engagement runs, from scoping call to production handoff: the phases, the crew, and what your team owns at the end.",
  },
  {
    path: "blog",
    title: "Writing | Smith Avenue Insights",
    description:
      "Field notes from Smith Avenue Insights on data systems, cloud architecture, cost optimization, and building software that lasts in production.",
  },
  {
    path: "support",
    title: "FAQ | Smith Avenue Insights",
    description:
      "Answers to what buyers usually ask Smith Avenue Insights before reaching out: what we build, how engagements start, team size, NDAs, and timelines.",
  },
  {
    path: "demo",
    title: "Start a project | Smith Avenue Insights",
    description:
      "Scope your next build with Smith Avenue Insights. Most engagements start with a 30-minute call. We send a written scope with timeline and cost.",
  },
  {
    path: "accessibility",
    title: "Accessibility | Smith Avenue Insights",
    description:
      "Smith Avenue Insights builds to WCAG 2.1 AA: keyboard navigation, screen reader support, high contrast, and reduced-motion safe interfaces across the site.",
  },
  {
    path: "privacy",
    title: "Privacy Policy | Smith Avenue Insights",
    description:
      "How Smith Avenue Insights collects, uses, and protects your information, the data we gather on this site, and the rights you have over your personal data.",
  },
  {
    path: "shopify-profit-recovery",
    title: "Shopify Profit Recovery | Smith Avenue Insights",
    description:
      "Recover margin leaking out of your Shopify store. Smith Avenue Insights finds the hidden costs and rebuilds the data so you can see true profit per order.",
  },
  {
    path: "ascent-pharmaceuticals-landing",
    title: "Ascent Pharmaceuticals | Smith Avenue Insights",
    description:
      "A production web build for Ascent Pharmaceuticals: compliance-ready, collaborative, and handed off to their team.",
  },
  {
    path: "construction-dashboard",
    title: "Construction Dashboard Demo | Smith Avenue Insights",
    description:
      "Interactive demo of a construction operations dashboard built by Smith Avenue Insights.",
  },
  {
    path: "real-estate-dashboard",
    title: "Real Estate Dashboard Demo | Smith Avenue Insights",
    description:
      "Interactive demo of a real estate analytics dashboard built by Smith Avenue Insights.",
  },
  {
    path: "security-scheduling-dashboard",
    title: "Security Scheduling Dashboard Demo | Smith Avenue Insights",
    description:
      "Interactive demo of a security crew scheduling dashboard built by Smith Avenue Insights.",
  },
];

const blogPosts = parseBlogPosts();
const blogRoutes = blogPosts.map((post) => ({
  path: `blog/${post.id}`,
  title: `${post.title} | Smith Avenue Insights`,
  description: clip(post.excerpt),
  image: DEFAULT_IMAGE,
}));

const routes = [
  ...staticRoutes.map((r) => ({ image: DEFAULT_IMAGE, ...r })),
  ...blogRoutes,
];

const indexHtml = readFileSync(join(distDir, "index.html"), "utf8");

const setMeta = (html, attr, key, value) => {
  const safeKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(
    `(<meta\\s+${attr}="${safeKey}"\\s+content=")[^"]*(")`,
    "i"
  );
  if (re.test(html)) {
    return html.replace(re, `$1${esc(value)}$2`);
  }
  const tag = `<meta ${attr}="${key}" content="${esc(value)}" />`;
  return html.replace(/<\/head>/i, `  ${tag}\n</head>`);
};

for (const route of routes) {
  let html = indexHtml;
  const url = `${SITE}/${route.path}`;
  const description = clip(route.description);

  html = html.replace(
    /<title>[^<]*<\/title>/i,
    `<title>${esc(route.title)}</title>`
  );

  html = setMeta(html, "name", "description", description);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "property", "og:title", route.title);
  html = setMeta(html, "property", "og:description", description);
  html = setMeta(html, "property", "og:image", route.image);
  html = setMeta(html, "name", "twitter:title", route.title);
  html = setMeta(html, "name", "twitter:description", description);
  html = setMeta(html, "name", "twitter:image", route.image);

  // Normalize trailing slash so the SPA router sees the canonical path.
  const normalize = `<script>if(location.pathname==='/${route.path}/'){history.replaceState(null,'','/${route.path}');}</script>`;
  html = html.replace(/<\/head>/i, `${normalize}</head>`);

  const outDir = join(distDir, route.path);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), html, "utf8");
  console.log(`\u2713 Prerendered meta shell for /${route.path}`);
}

console.log(`\n  ${routes.length} routes total (${blogRoutes.length} blog posts)`);
