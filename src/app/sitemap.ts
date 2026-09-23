import type { MetadataRoute } from "next";
import { buildTopicHubIndex } from "@/lib/blog-topics";
import { fetchAllPublishedBlogsForSitemap } from "@/lib/blogs";
import { SITE_URL } from "@/lib/site";

/** Avoid prerendering at build (API often unavailable) and stale Data Cache that dropped all blog URLs. */
export const dynamic = "force-dynamic";

const staticPaths: Array<{
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[0]["changeFrequency"]>;
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/account-deletion", changeFrequency: "yearly", priority: 0.3 },
  { path: "/blogs", changeFrequency: "weekly", priority: 0.9 },
  { path: "/blogs/topics", changeFrequency: "weekly", priority: 0.75 },
  { path: "/careers", changeFrequency: "monthly", priority: 0.7 },
  { path: "/child-safety", changeFrequency: "yearly", priority: 0.4 },
  { path: "/cookies", changeFrequency: "yearly", priority: 0.3 },
  { path: "/disclaimer", changeFrequency: "yearly", priority: 0.3 },
  { path: "/download", changeFrequency: "monthly", priority: 0.9 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.75 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.5 },
  { path: "/refer", changeFrequency: "monthly", priority: 0.8 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.5 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE_URL.replace(/\/$/, "");

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map(
    ({ path, changeFrequency, priority }) => ({
      url: path === "/" ? base : `${base}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    }),
  );

  const blogs = await fetchAllPublishedBlogsForSitemap();
  const blogEntries: MetadataRoute.Sitemap = blogs
    .filter((blog) => !blog.noIndex && blog.slug)
    .map((blog) => ({
      url: `${base}/blogs/${encodeURIComponent(blog.slug)}`,
      lastModified: blog.updatedAt
        ? new Date(blog.updatedAt)
        : blog.createdAt
          ? new Date(blog.createdAt)
          : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  const topicIndex = buildTopicHubIndex(blogs);
  const topicEntries: MetadataRoute.Sitemap = Array.from(topicIndex.values())
    .filter((hub) => hub.blogs.length >= 2)
    .map((hub) => ({
      url: `${base}/blogs/topics/${encodeURIComponent(hub.slug)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.72,
    }));

  return [...staticEntries, ...blogEntries, ...topicEntries];
}
