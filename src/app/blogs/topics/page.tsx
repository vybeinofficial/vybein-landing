import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/site";
import { getAllPublishedBlogsForHubs } from "@/lib/blogs";
import { listTopicHubsSorted } from "@/lib/blog-topics";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog topics",
  description: "Explore Vybein blog posts by topic — curated from each article’s keywords.",
  alternates: {
    canonical: `${SITE_URL}/blogs/topics`,
  },
};

const placeholder = "https://placehold.co/1200x700/e5ecef/74828a?text=Vybein+Blog";

export default async function BlogTopicsIndexPage() {
  const blogs = await getAllPublishedBlogsForHubs();
  const topics = listTopicHubsSorted(blogs);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <section className="hero-gradient pt-24 pb-12 md:pt-28 md:pb-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/blogs" className="text-sm text-brand font-semibold hover:text-brand-dark transition">
              ← Back to Blog
            </Link>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mt-4 leading-tight">Topics</h1>
            <p className="text-gray-600 mt-3 max-w-2xl text-base md:text-lg">
              Every topic below links to a hub of posts that share the same keyword in the article’s SEO metadata.
            </p>
          </div>
        </section>

        <section className="pb-16 md:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {topics.length === 0 ? (
              <p className="rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center text-gray-600">
                No topics yet. Add comma-separated keywords when editing posts in the admin panel.
              </p>
            ) : (
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {topics.map((t) => (
                  <li key={t.slug}>
                    <Link
                      href={`/blogs/topics/${encodeURIComponent(t.slug)}`}
                      className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-brand/30 hover:shadow-md"
                    >
                      <span className="font-heading text-lg font-bold text-gray-900">{t.label}</span>
                      <span className="mt-1 text-sm text-gray-500">
                        {t.blogs.length} {t.blogs.length === 1 ? "post" : "posts"}
                      </span>
                      <div className="mt-4 flex -space-x-2">
                        {t.blogs.slice(0, 4).map((b) => (
                          <div
                            key={b.id}
                            className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-gray-100 ring-1 ring-gray-100"
                          >
                            <Image
                              src={b.thumbnail || placeholder}
                              alt=""
                              aria-hidden
                              fill
                              className="object-cover"
                              sizes="40px"
                            />
                          </div>
                        ))}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
