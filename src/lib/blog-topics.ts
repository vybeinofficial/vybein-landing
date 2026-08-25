import type { Blog } from "@/types/blog";
import { decodeHtmlEntities } from "@/lib/blogs";

/** URL slug for a topic hub (lowercase, hyphenated). */
export function slugifyBlogTopic(label: string): string {
  const decoded = decodeHtmlEntities(label.trim());
  return decoded
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Labels from `seoKeywords` only (comma-separated), for hub assignment and linking. */
export function getBlogTopicKeywordLabels(blog: Blog): string[] {
  if (!blog.seoKeywords?.trim()) return [];
  const parts = blog.seoKeywords.split(",").map((p) => decodeHtmlEntities(p.trim())).filter(Boolean);
  return Array.from(new Set(parts));
}

export type TopicHubEntry = {
  slug: string;
  label: string;
  blogs: Blog[];
};

function mergeBlogUnique(existing: Blog[], blog: Blog): Blog[] {
  if (existing.some((b) => b.id === blog.id)) return existing;
  return [...existing, blog];
}

/** Maps topic slug → display label and posts (from SEO keywords on each blog). */
export function buildTopicHubIndex(blogs: Blog[]): Map<string, TopicHubEntry> {
  const map = new Map<string, TopicHubEntry>();

  for (const blog of blogs) {
    if (blog.noIndex) continue;
    const labels = getBlogTopicKeywordLabels(blog);
    const seenSlugThisBlog = new Set<string>();

    for (const label of labels) {
      const slug = slugifyBlogTopic(label);
      if (!slug || seenSlugThisBlog.has(slug)) continue;
      seenSlugThisBlog.add(slug);

      const current = map.get(slug);
      if (!current) {
        map.set(slug, { slug, label, blogs: [blog] });
      } else {
        current.blogs = mergeBlogUnique(current.blogs, blog);
        if (label.length < current.label.length) {
          current.label = label;
        }
      }
    }
  }

  return map;
}

export function listTopicHubsSorted(blogs: Blog[]): TopicHubEntry[] {
  const index = buildTopicHubIndex(blogs);
  return Array.from(index.values()).sort((a, b) => {
    if (b.blogs.length !== a.blogs.length) return b.blogs.length - a.blogs.length;
    return a.label.localeCompare(b.label, "en", { sensitivity: "base" });
  });
}

export function getTopicHubBySlug(blogs: Blog[], topicSlug: string): TopicHubEntry | null {
  const index = buildTopicHubIndex(blogs);
  return index.get(topicSlug) ?? null;
}

export function sortBlogsNewestFirst(blogs: Blog[]): Blog[] {
  return [...blogs].sort((a, b) => {
    const aDate = new Date(a.createdAt || 0).getTime();
    const bDate = new Date(b.createdAt || 0).getTime();
    return bDate - aDate;
  });
}

const createdMs = (d?: string) => new Date(d || 0).getTime();

function titleTokens(title: string): Set<string> {
  return new Set(
    title
      .toLowerCase()
      .split(/\s+/)
      .map((w) => w.replace(/[^a-z0-9]/g, ""))
      .filter((w) => w.length > 3),
  );
}

/**
 * Pick related posts using shared SEO topic keywords (slug match) and title word overlap,
 * then fill with newest remaining posts (excluding current).
 */
export function pickRelatedBlogsByTopicRelevance(current: Blog, candidates: Blog[], limit: number): Blog[] {
  const pool = candidates.filter((b) => b.slug && b.slug !== current.slug && !b.noIndex);
  const labels = getBlogTopicKeywordLabels(current);
  const topicSlugs = new Set(labels.map(slugifyBlogTopic).filter(Boolean));
  const currentTitleWords = titleTokens(current.title);

  if (labels.length === 0 && topicSlugs.size === 0) {
    return sortBlogsNewestFirst(pool).slice(0, limit);
  }

  const scored = pool.map((blog) => {
    let score = 0;
    for (const ol of getBlogTopicKeywordLabels(blog)) {
      const s = slugifyBlogTopic(ol);
      if (s && topicSlugs.has(s)) score += 5;
    }
    for (const w of titleTokens(blog.title)) {
      if (currentTitleWords.has(w)) score += 1;
    }
    return { blog, score, date: createdMs(blog.createdAt) };
  });

  const ranked = scored.sort((a, b) => (b.score !== a.score ? b.score - a.score : b.date - a.date));
  const picked: Blog[] = [];
  const seen = new Set<string>();

  for (const row of ranked) {
    if (picked.length >= limit) break;
    if (row.score === 0) break;
    if (seen.has(row.blog.id)) continue;
    seen.add(row.blog.id);
    picked.push(row.blog);
  }

  if (picked.length < limit) {
    for (const blog of sortBlogsNewestFirst(pool)) {
      if (picked.length >= limit) break;
      if (seen.has(blog.id)) continue;
      seen.add(blog.id);
      picked.push(blog);
    }
  }

  return picked.slice(0, limit);
}
