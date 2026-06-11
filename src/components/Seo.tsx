import { useEffect } from "react";

const SITE = "https://smithaveinsights.com";
const DEFAULT_IMAGE = `${SITE}/og-default.png`;

interface SeoProps {
  /** Page name, prepended to the brand: "About | Smith Avenue Insights". */
  title: string;
  /** 140–160 character meta description, specific to the page. */
  description: string;
  /** Absolute route path, e.g. "/company". */
  path: string;
  /** Absolute OG image URL. Defaults to the brand lockup. */
  image?: string;
}

const setMeta = (attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setCanonical = (url: string) => {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", url);
};

/**
 * Runtime document head manager. Sets a unique title, meta description, and
 * Open Graph / Twitter tags per page. Crawlers that execute JS and real
 * browsers both get correct values; static shells in scripts/prerender-meta.js
 * cover the no-JS crawlers for the primary routes.
 */
export const Seo = ({ title, description, path, image = DEFAULT_IMAGE }: SeoProps) => {
  const fullTitle = `${title} | Smith Avenue Insights`;
  const url = `${SITE}${path}`;

  useEffect(() => {
    document.title = fullTitle;
    setMeta("name", "description", description);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", image);
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", image);
    setCanonical(url);
  }, [fullTitle, description, url, image]);

  return null;
};
