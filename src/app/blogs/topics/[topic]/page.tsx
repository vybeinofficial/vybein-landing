import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/site";
import { decodeHtmlEntities, formatBlogDate, getAllPublishedBlogsForHubs } from "@/lib/blogs";
import { getTopicHubBySlug, sortBlogsNewestFirst } from "@/lib/blog-topics";
import BlogThumbImage from "@/components/blog/BlogThumbImage";

type Props = { params: Promise<{ topic: string }> };

export const dynamic = "force-dynamic";
export const dynamicParams = true;

const placeholder = "https://placehold.co/1200x700/e5ecef/74828a?text=Vybein+Blog";

const toPlainText = (html?: string) =>
  decodeHtmlEntities(
    String(html || "")
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic } = await params;
  const decoded = decodeURIComponent(topic);
  const blogs = await getAllPublishedBlogsForHubs();
  const hub = getTopicHubBySlug(blogs, decoded);

  if (!hub) {
    return {
      title: "Topic",
      robots: { index: false, follow: true },
    };
  }

  const title = `${hub.label} — Blog`;
  const description = `Read ${hub.blogs.length} Vybein article${hub.blogs.length === 1 ? "" : "s"} about ${hub.label}.`;
  const canonical = `${SITE_URL}/blogs/topics/${encodeURIComponent(hub.slug)}`;

  return {
    title,
    description,
    alternates: { canonical },
    robots:
      hub.blogs.length < 2
        ? { index: false, follow: true }
        : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
    },
  };
}

export default async function BlogTopicHubPage({ params }: Props) {
  const { topic } = await params;
  const topicKey = decodeURIComponent(topic);
  const allBlogs = await getAllPublishedBlogsForHubs();
  const hub = getTopicHubBySlug(allBlogs, topicKey);

  if (!hub) {
    notFound();
  }

  const posts = sortBlogsNewestFirst(hub.blogs);
  const canonical = `${SITE_URL}/blogs/topics/${encodeURIComponent(hub.slug)}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blogs` },
      { "@type": "ListItem", position: 3, name: "Topics", item: `${SITE_URL}/blogs/topics` },
      { "@type": "ListItem", position: 4, name: hub.label, item: canonical },
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${hub.label} — Vybein Blog`,
    description: `Articles tagged with “${hub.label}”.`,
    url: canonical,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: posts.length,
      itemListElement: posts.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/blogs/${encodeURIComponent(b.slug)}`,
        name: b.title,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <Header />
      <main className="min-h-screen bg-white">
        <section className="hero-gradient pt-24 pb-10 md:pt-28 md:pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-sm text-gray-600">
              <Link href="/blogs" className="font-semibold text-brand hover:text-brand-dark transition">
                Blog
              </Link>
              <span className="mx-2 text-gray-400">/</span>
              <Link href="/blogs/topics" className="font-semibold text-brand hover:text-brand-dark transition">
                Topics
              </Link>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-900">{hub.label}</span>
            </nav>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mt-4 leading-tight">{hub.label}</h1>
            <p className="text-gray-600 mt-3 max-w-2xl text-base md:text-lg">
              {posts.length} {posts.length === 1 ? "article" : "articles"} in this topic.
            </p>
          </div>
        </section>

        <section className="pb-16 md:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {posts.map((blog) => (
                <article
                  key={blog.id}
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
                >
                  <BlogThumbImage
                    src={blog.thumbnail || placeholder}
                    alt={blog.title}
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs uppercase tracking-wide text-gray-500">{formatBlogDate(blog.createdAt)}</p>
                    <h2 className="mt-2 text-xl font-bold text-gray-900 line-clamp-2 leading-snug">
                      <Link href={`/blogs/${blog.slug}`} className="hover:text-brand-dark transition">
                        {blog.title}
                      </Link>
                    </h2>
                    <p className="mt-2 flex-1 text-sm text-gray-600 line-clamp-3">
                      {decodeHtmlEntities(blog.excerpt || toPlainText(blog.content) || "Read the full article.")}
                    </p>
                    <Link href={`/blogs/${blog.slug}`} className="mt-4 font-semibold text-brand hover:text-brand-dark transition">
                      Read more →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
