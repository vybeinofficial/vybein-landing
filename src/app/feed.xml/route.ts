import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/site";
import { getAllPublishedBlogsForHubs } from "@/lib/blogs";
import { buildRssFeedXml } from "@/lib/blog-feed";

export const dynamic = "force-dynamic";

export async function GET() {
  const site = SITE_URL.replace(/\/$/, "");
  const feedUrl = `${site}/feed.xml`;
  const blogs = await getAllPublishedBlogsForHubs();
  const body = buildRssFeedXml(blogs, feedUrl);

  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600",
    },
  });
}
