import { cache } from "react";
import type { Blog, BlogResponse, BlogsResponse } from "@/types/blog";
import { API_BASE_URL } from "@/lib/site";

const BLOGS_ENDPOINT = `${API_BASE_URL}/blogs`;

/** Page size for `/blogs` listing and search (API max 50). */
export const BLOG_LIST_PAGE_SIZE = 12;

export type BlogListPageResult = {
  data: Blog[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
};

// Decode HTML entities in text
export const decodeHtmlEntities = (text: string): string => {
  if (!text) return "";
  const htmlEntities: Record<string, string> = {
    "&nbsp;": " ",
    "&quot;": '"',
    "&apos;": "'",
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&ldquo;": '"',
    "&rdquo;": '"',
    "&ndash;": "-",
    "&mdash;": "-",
    "&hellip;": "...",
  };

  let decoded = text;
  for (const [entity, char] of Object.entries(htmlEntities)) {
    decoded = decoded.replace(new RegExp(entity, "g"), char);
  }
  // Handle numeric entities like &#160;
  decoded = decoded.replace(/&#(\d+);/g, (_match, code) => String.fromCharCode(Number(code)));
  // Handle hex entities like &#x00A0;
  decoded = decoded.replace(/&#x([0-9a-f]+);/gi, (_match, code) => String.fromCharCode(Number("0x" + code)));
  return decoded;
};

/** Tags for blog UI (keywords + a few words from title). */
export function getBlogDisplayTags(blog: Blog): string[] {
  const keywordTags = blog.seoKeywords
    ? blog.seoKeywords
        .split(",")
        .map((tag) => decodeHtmlEntities(tag.trim()))
        .filter(Boolean)
    : [];

  const titleTags = blog.title
    .split(/\s+/)
    .map((tag) => tag.replace(/[^a-zA-Z0-9-]/g, ""))
    .filter((tag) => tag.length > 3)
    .slice(0, 4);

  return Array.from(new Set([...keywordTags, ...titleTags])).slice(0, 8);
}

export const sanitizeBlogHtml = (html?: string) => {
  if (!html) return "";

  return html
    .replace(/\sstyle="[^"]*"/gi, "")
    .replace(/\swidth="[^"]*"/gi, "")
    .replace(/\sheight="[^"]*"/gi, "")
    .replace(/\sstyle='[^']*'/gi, "")
    .replace(/\swidth='[^']*'/gi, "")
    .replace(/\sheight='[^']*'/gi, "");
};

export const formatBlogDate = (dateValue?: string) => {
  if (!dateValue) return "";
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

async function fetchPublishedBlogsUncached(): Promise<Blog[]> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

  try {
    console.log(`[${new Date().toISOString()}] API URL: ${API_BASE_URL}`);
    console.log(`[${new Date().toISOString()}] Fetching blogs from ${BLOGS_ENDPOINT}`);

    const response = await fetch(BLOGS_ENDPOINT, {
      next: { revalidate: 120 },
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`[${new Date().toISOString()}] Failed to fetch blogs: ${response.status} ${response.statusText} - ${BLOGS_ENDPOINT}`);
      return [];
    }

    const result = (await response.json()) as BlogsResponse;
    if (!result?.success || !Array.isArray(result.data)) {
      console.warn(`[${new Date().toISOString()}] Invalid blogs response format:`, { success: result?.success, hasData: !!result?.data });
      return [];
    }

    console.log(`[${new Date().toISOString()}] Successfully fetched ${result.data.length} blogs`);
    return result.data;
  } catch (error) {
    clearTimeout(timeoutId);
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`[${new Date().toISOString()}] Error fetching blogs from ${BLOGS_ENDPOINT}:`, errorMsg);
    console.warn(`[${new Date().toISOString()}] Returning empty blogs array - API may be unavailable during build or deployment`);
    return [];
  }
}

/** Deduplicated per request (e.g. `generateMetadata` + page both call it). */
export const getPublishedBlogs = cache(fetchPublishedBlogsUncached);

function normalizeBlogListPagination(
  data: Blog[],
  pagination: BlogsResponse["pagination"],
  limit: number,
): BlogListPageResult["pagination"] {
  const p = pagination ?? {
    page: 1,
    limit,
    total: data.length,
    totalPages: Math.max(1, Math.ceil(data.length / limit) || 1),
  };
  return {
    page: p.page,
    limit: p.limit,
    total: p.total,
    totalPages: Math.max(1, p.totalPages),
  };
}

/** Single page of published blogs (public list API). */
export async function fetchPublishedBlogsListPage(
  page: number,
  limit: number = BLOG_LIST_PAGE_SIZE,
): Promise<BlogListPageResult | null> {
  const safePage = Number.isFinite(page) && page >= 1 ? Math.floor(page) : 1;
  const params = new URLSearchParams({
    page: String(safePage),
    limit: String(Math.min(Math.max(1, limit), 50)),
  });
  const url = `${BLOGS_ENDPOINT}?${params.toString()}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 120 },
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) return null;
    const result = (await response.json()) as BlogsResponse;
    if (!result?.success || !Array.isArray(result.data)) return null;
    return {
      data: result.data,
      pagination: normalizeBlogListPagination(result.data, result.pagination, limit),
    };
  } catch {
    return null;
  }
}

/** Single page of title search results (public list API). */
export async function fetchPublishedBlogsSearchListPage(
  search: string,
  page: number,
  limit: number = BLOG_LIST_PAGE_SIZE,
): Promise<BlogListPageResult | null> {
  const trimmed = search.trim();
  if (!trimmed) return null;
  const safePage = Number.isFinite(page) && page >= 1 ? Math.floor(page) : 1;
  const lim = Math.min(Math.max(1, limit), 50);
  const params = new URLSearchParams({
    page: String(safePage),
    limit: String(lim),
    search: trimmed,
  });
  const url = `${BLOGS_ENDPOINT}?${params.toString()}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 60 },
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) return null;
    const result = (await response.json()) as BlogsResponse;
    if (!result?.success || !Array.isArray(result.data)) return null;
    return {
      data: result.data,
      pagination: normalizeBlogListPagination(result.data, result.pagination, lim),
    };
  } catch {
    return null;
  }
}

type FetchAllBlogsInit = Pick<RequestInit, "cache" | "headers"> & { next?: { revalidate?: number } };

type FetchAllBlogPagesOptions = {
  /** Server-side title search (public `/blogs` API). */
  search?: string;
};

async function fetchAllPublishedBlogPages(
  init: FetchAllBlogsInit,
  options?: FetchAllBlogPagesOptions,
): Promise<Blog[]> {
  const pageSize = 50;
  const maxPages = 500;
  const collected: Blog[] = [];

  for (let page = 1; page <= maxPages; page += 1) {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(pageSize),
    });
    if (options?.search?.trim()) {
      params.set("search", options.search.trim());
    }
    const url = `${BLOGS_ENDPOINT}?${params.toString()}`;

    try {
      const response = await fetch(url, {
        ...init,
        headers: { "Content-Type": "application/json", ...init.headers },
      });

      if (!response.ok) break;

      const result = (await response.json()) as BlogsResponse;
      if (!result?.success || !Array.isArray(result.data)) break;

      collected.push(...result.data);

      const totalPages = result.pagination?.totalPages ?? 1;
      if (page >= totalPages) break;
      if (result.data.length < pageSize) break;
    } catch {
      break;
    }
  }

  return collected;
}

/** Public blogs API is paginated (default 12, max 50 per page). Used by `/sitemap.xml` so every post is listed. */
export async function fetchAllPublishedBlogsForSitemap(): Promise<Blog[]> {
  return fetchAllPublishedBlogPages(
    {
      cache: "no-store",
      headers: {},
    },
    undefined,
  );
}

/** Full published list for topic hubs and SEO (same pagination as sitemap, ISR-friendly). */
async function fetchAllPublishedBlogsForHubsUncached(): Promise<Blog[]> {
  return fetchAllPublishedBlogPages(
    {
      next: { revalidate: 120 },
      headers: {},
    },
    undefined,
  );
}

export const getAllPublishedBlogsForHubs = cache(fetchAllPublishedBlogsForHubsUncached);

async function fetchPublishedBlogBySlugUncached(slug: string): Promise<Blog | null> {
  try {
    console.log(`[${new Date().toISOString()}] API URL: ${API_BASE_URL}`);
    const url = `${BLOGS_ENDPOINT}/${encodeURIComponent(slug)}`;
    console.log(`[${new Date().toISOString()}] Fetching blog slug: ${slug} from ${url}`);

    const response = await fetch(url, {
      next: { revalidate: 120 },
    });

    if (response.status === 404) {
      console.log(`[${new Date().toISOString()}] Blog not found: ${slug}`);
      return null;
    }

    if (!response.ok) {
      console.error(`[${new Date().toISOString()}] Failed to fetch blog ${slug}: ${response.status}`);
      return null;
    }

    const result = (await response.json()) as BlogResponse;
    if (!result?.success || !result.data) {
      console.warn(`[${new Date().toISOString()}] Invalid blog response for slug ${slug}`);
      return null;
    }

    console.log(`[${new Date().toISOString()}] Successfully fetched blog: ${slug}`);
    return result.data;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`[${new Date().toISOString()}] Error fetching blog by slug ${slug}:`, errorMsg);
    return null;
  }
}

/** Deduplicated per request (e.g. `generateMetadata` + page both call it). */
export const getPublishedBlogBySlug = cache(fetchPublishedBlogBySlugUncached);

/** Readable title from URL slug when API data is not available yet (e.g. client fallback). */
export function blogTitleFromSlug(slug: string): string {
  try {
    const s = decodeURIComponent(slug).replace(/\+/g, " ");
    const words = s
      .split("-")
      .map((w) => w.trim())
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
    return words.length > 0 ? words.join(" ") : "Blog";
  } catch {
    return "Blog";
  }
}

export type BlogDetailPageData = {
  slugBlog: Blog | null;
  allBlogs: Blog[];
  blog: Blog | null;
};

/** Single parallel fetch for blog detail + list; shared by `generateMetadata` and the page. */
export const getBlogDetailPageData = cache(async (slug: string): Promise<BlogDetailPageData> => {
  const [slugBlog, allBlogs] = await Promise.all([getPublishedBlogBySlug(slug), getPublishedBlogs()]);
  // Always trust direct slug lookup for detail page rendering.
  // If the slug endpoint says "not found" (e.g. deleted/unpublished), do not revive it from a potentially stale list cache.
  const blog = slugBlog ?? null;
  return { slugBlog, allBlogs, blog };
});

export type HeadingItem = {
  id: string;
  level: number;
  text: string;
  anchor: string;
};

const headingInnerPlainText = (innerHtml: string): string =>
  decodeHtmlEntities(innerHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());

const headingBaseIdFromPlain = (plain: string, fallbackIndex: number): string =>
  plain
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || `heading-${fallbackIndex}`;

const existingHeadingId = (attrs: string): string | undefined => {
  const m = attrs.match(/\bid\s*=\s*["']([^"']+)["']/i);
  const raw = m?.[1]?.trim();
  return raw ? raw.replace(/^#/, "") : undefined;
};

/** Matches h1–h3 including nested markup (TipTap / rich HTML). */
const HEADING_BLOCK_RE = /<h([1-3])([^>]*)>([\s\S]*?)<\/h\1>/gi;

export const extractHeadings = (html?: string): HeadingItem[] => {
  if (!html) return [];

  try {
    HEADING_BLOCK_RE.lastIndex = 0;
    const headings: HeadingItem[] = [];
    const headingCounts = new Map<string, number>();
    let index = 0;

    for (const match of html.matchAll(HEADING_BLOCK_RE)) {
      const level = parseInt(match[1], 10);
      const attrs = match[2] || "";
      const inner = match[3] || "";
      const plain = headingInnerPlainText(inner);

      if (!plain) {
        index++;
        continue;
      }

      const fromAttr = existingHeadingId(attrs);
      let id: string;
      let text: string;

      if (fromAttr) {
        id = fromAttr;
        text = plain;
      } else {
        const baseId = headingBaseIdFromPlain(plain, index);
        const count = (headingCounts.get(baseId) || 0) + 1;
        headingCounts.set(baseId, count);
        id = count === 1 ? baseId : `${baseId}-${count}`;
        text = plain;
      }

      headings.push({ id, level, text, anchor: `#${id}` });
      index++;
    }

    return headings;
  } catch (error) {
    console.error("Error extracting headings:", error);
    return [];
  }
};

export const injectHeadingIds = (html?: string): string => {
  if (!html) return "";

  try {
    HEADING_BLOCK_RE.lastIndex = 0;
    const headingCounts = new Map<string, number>();
    let index = 0;

    return html.replace(HEADING_BLOCK_RE, (match, level: string, attrs: string, inner: string) => {
      const attrStr = String(attrs || "");
      const plain = headingInnerPlainText(String(inner));

      if (!plain) {
        index++;
        return match;
      }

      if (/\bid\s*=\s*["'][^"']*["']/i.test(attrStr)) {
        index++;
        return match;
      }

      const baseId = headingBaseIdFromPlain(plain, index);
      const count = (headingCounts.get(baseId) || 0) + 1;
      headingCounts.set(baseId, count);
      const id = count === 1 ? baseId : `${baseId}-${count}`;
      index++;

      const trimmed = attrStr.trim();
      const afterTag = trimmed ? `${trimmed} id="${id}"` : `id="${id}"`;
      return `<h${level} ${afterTag}>${inner}</h${level}>`;
    });
  } catch (error) {
    console.error("Error injecting heading IDs:", error);
    return html;
  }
};
