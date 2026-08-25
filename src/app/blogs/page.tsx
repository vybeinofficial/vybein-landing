import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/site";
import BlogTopicsExplorer from "@/components/blog/BlogTopicsExplorer";
import BlogSearchBar from "@/components/blog/BlogSearchBar";
import BlogSearchResults from "@/components/blog/BlogSearchResults";
import BlogIndexListing from "@/components/blog/BlogIndexListing";
import BlogPagination from "@/components/blog/BlogPagination";
import {
  BLOG_LIST_PAGE_SIZE,
  fetchPublishedBlogsListPage,
  fetchPublishedBlogsSearchListPage,
} from "@/lib/blogs";
import { blogListHref, parseBlogListPageParam } from "@/lib/blog-list-nav";

type PageProps = { searchParams: Promise<{ q?: string; page?: string }> };

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const sp = await searchParams;
  const raw = sp.q?.trim() ?? "";
  const label = raw.length > 56 ? `${raw.slice(0, 56)}…` : raw;
  const base = SITE_URL.replace(/\/$/, "");
  const page = parseBlogListPageParam(sp.page);

  return {
    title: raw ? `“${label}” — Blog search` : page > 1 ? `Blog — Page ${page}` : "Blog",
    description: raw
      ? `Vybein blog posts matching “${label}”.`
      : "Read Vybein stories, event tips, and activity updates.",
    alternates: {
      canonical: raw ? `${SITE_URL}/blogs` : page > 1 ? `${SITE_URL}/blogs?page=${page}` : `${SITE_URL}/blogs`,
      types: {
        "application/rss+xml": `${base}/feed.xml`,
        "application/atom+xml": `${base}/atom.xml`,
      },
    },
    ...(raw
      ? {
          robots: { index: false, follow: true },
        }
      : {}),
  };
}

export default async function BlogsPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const q = sp.q?.trim() ?? "";
  const page = parseBlogListPageParam(sp.page);

  const listResult = q
    ? await fetchPublishedBlogsSearchListPage(q, page, BLOG_LIST_PAGE_SIZE)
    : await fetchPublishedBlogsListPage(page, BLOG_LIST_PAGE_SIZE);

  if (!listResult) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white px-4 py-24">
          <div className="mx-auto max-w-lg text-center text-gray-600">
            <p className="font-medium text-gray-900">Unable to load posts</p>
            <p className="mt-2 text-sm">Please try again in a moment.</p>
            <Link href="/blogs" className="mt-6 inline-block font-semibold text-brand hover:text-brand-dark transition">
              Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const { data, pagination } = listResult;
  if (pagination.totalPages > 0 && page > pagination.totalPages) {
    redirect(blogListHref(pagination.totalPages, q || undefined));
  }

  const rangeStart = pagination.total === 0 ? 0 : (page - 1) * pagination.limit + 1;
  const rangeEnd = pagination.total === 0 ? 0 : Math.min(pagination.total, (page - 1) * pagination.limit + data.length);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <section className="hero-gradient pt-24 pb-16 md:pt-28 md:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/" className="text-sm text-brand font-semibold hover:text-brand-dark transition">
              ← Back to Home
            </Link>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-gray-900 mt-4 leading-tight">Vybein Blog</h1>
            <p className="text-gray-600 mt-4 max-w-2xl text-base md:text-lg">
              Fresh stories and practical updates around events, activities, and community experiences.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BlogSearchBar defaultQuery={q} />

            {q ? (
              <>
                <BlogSearchResults
                  query={q}
                  blogs={data}
                  page={page}
                  total={pagination.total}
                  totalPages={pagination.totalPages}
                  rangeStart={rangeStart}
                  rangeEnd={rangeEnd}
                />
                <BlogPagination page={page} totalPages={pagination.totalPages} searchQuery={q} />
              </>
            ) : (
              <>
                {pagination.total > 0 ? (
                  <p className="mb-6 text-sm text-gray-600">
                    Showing{" "}
                    <span className="font-semibold text-gray-900">
                      {rangeStart}–{rangeEnd}
                    </span>{" "}
                    of <span className="font-semibold text-gray-900">{pagination.total}</span> posts
                  </p>
                ) : null}
                <BlogIndexListing blogs={data} page={page} />
                <BlogPagination page={page} totalPages={pagination.totalPages} />
              </>
            )}

            <div className="h-8 md:h-12" aria-hidden="true" />

            <BlogTopicsExplorer />
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
