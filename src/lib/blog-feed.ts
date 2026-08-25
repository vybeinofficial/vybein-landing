import type { Blog } from "@/types/blog";
import { SITE_URL } from "@/lib/site";
import { decodeHtmlEntities } from "@/lib/blogs";

export function escapeXml(text: string): string {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function rfc822Date(iso?: string): string {
  const d = iso ? new Date(iso) : new Date();
  if (Number.isNaN(d.getTime())) return new Date().toUTCString();
  return d.toUTCString();
}

function iso8601(iso?: string): string {
  const d = iso ? new Date(iso) : new Date();
  if (Number.isNaN(d.getTime())) return new Date().toISOString();
  return d.toISOString();
}

function plainDescription(blog: Blog): string {
  const raw = blog.excerpt || "";
  return decodeHtmlEntities(raw.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()).slice(0, 800);
}

function blogPermalink(slug: string): string {
  const site = SITE_URL.replace(/\/$/, "");
  return `${site}/blogs/${encodeURIComponent(slug)}`;
}

function feedEligibleSorted(blogs: Blog[]): Blog[] {
  return [...blogs]
    .filter((b) => !b.noIndex && b.slug)
    .sort((a, b) => {
      const bt = new Date(b.createdAt || 0).getTime();
      const at = new Date(a.createdAt || 0).getTime();
      return bt - at;
    });
}

/** RSS 2.0 with Atom self link (common reader compatibility). */
export function buildRssFeedXml(blogs: Blog[], feedUrl: string): string {
  const site = SITE_URL.replace(/\/$/, "");
  const channelTitle = "Vybein Blog";
  const channelDesc = "Stories, event tips, and activity updates from Vybein.";
  const items = feedEligibleSorted(blogs)
    .map((blog) => {
      const link = blogPermalink(blog.slug);
      return [
        "<item>",
        `<title>${escapeXml(blog.title)}</title>`,
        `<link>${escapeXml(link)}</link>`,
        `<guid isPermaLink="true">${escapeXml(link)}</guid>`,
        `<pubDate>${rfc822Date(blog.createdAt)}</pubDate>`,
        `<description>${escapeXml(plainDescription(blog))}</description>`,
        "</item>",
      ].join("");
    })
    .join("");

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">`,
    "<channel>",
    `<title>${escapeXml(channelTitle)}</title>`,
    `<link>${escapeXml(`${site}/blogs`)}</link>`,
    `<description>${escapeXml(channelDesc)}</description>`,
    "<language>en-in</language>",
    `<lastBuildDate>${rfc822Date()}</lastBuildDate>`,
    `<atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml"/>`,
    items,
    "</channel>",
    "</rss>",
  ].join("");
}

/** Atom 1.0 feed. */
export function buildAtomFeedXml(blogs: Blog[], feedUrl: string): string {
  const site = SITE_URL.replace(/\/$/, "");
  const title = "Vybein Blog";
  const subtitle = "Stories, event tips, and activity updates from Vybein.";
  const list = feedEligibleSorted(blogs);
  const updated = list[0]?.updatedAt || list[0]?.createdAt;

  const entries = list
    .map((blog) => {
      const href = blogPermalink(blog.slug);
      return [
        "<entry>",
        `<title type="text">${escapeXml(blog.title)}</title>`,
        `<link rel="alternate" type="text/html" href="${escapeXml(href)}"/>`,
        `<id>${escapeXml(href)}</id>`,
        `<updated>${iso8601(blog.updatedAt || blog.createdAt)}</updated>`,
        `<published>${iso8601(blog.createdAt)}</published>`,
        `<summary type="text">${escapeXml(plainDescription(blog))}</summary>`,
        "</entry>",
      ].join("");
    })
    .join("");

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<feed xmlns="http://www.w3.org/2005/Atom">`,
    `<title>${escapeXml(title)}</title>`,
    `<subtitle>${escapeXml(subtitle)}</subtitle>`,
    `<link href="${escapeXml(`${site}/blogs`)}" rel="alternate"/>`,
    `<link href="${escapeXml(feedUrl)}" rel="self"/>`,
    `<id>${escapeXml(feedUrl)}</id>`,
    `<updated>${iso8601(updated)}</updated>`,
    entries,
    "</feed>",
  ].join("");
}
