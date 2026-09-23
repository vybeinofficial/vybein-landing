import Link from "next/link";
import type { Blog } from "@/types/blog";
import { decodeHtmlEntities, formatBlogDate } from "@/lib/blogs";
import BlogThumbImage from "@/components/blog/BlogThumbImage";

const placeholder = "https://placehold.co/1200x700/e5ecef/74828a?text=Vybein+Blog";

type Props = {
  query: string;
  blogs: Blog[];
  page: number;
  total: number;
  totalPages: number;
  rangeStart: number;
  rangeEnd: number;
};

export default function BlogSearchResults({ query, blogs, page, total, totalPages, rangeStart, rangeEnd }: Props) {
  if (blogs.length === 0 && total === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-10 text-center text-gray-600">
        <p className="font-medium text-gray-900">No posts found</p>
        <p className="mt-2 text-sm">
          Nothing matched <span className="font-semibold">&quot;{query}&quot;</span>. Try different keywords or browse all posts below.
        </p>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-10 text-center text-gray-600">
        <p className="font-medium text-gray-900">No posts on this page</p>
        <p className="mt-2 text-sm">
          Page {page} is out of range for this search ({total} {total === 1 ? "result" : "results"}).
        </p>
        <Link href={`/blogs?q=${encodeURIComponent(query)}`} className="mt-4 inline-block font-semibold text-brand hover:text-brand-dark transition">
          Go to first page
        </Link>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-6 text-sm text-gray-600">
        <span className="font-semibold text-gray-900">{total}</span> {total === 1 ? "match" : "matches"} for{" "}
        <span className="font-semibold">&quot;{query}&quot;</span>
        {totalPages > 1 ? (
          <>
            {" "}
            · Showing{" "}
            <span className="font-semibold text-gray-900">
              {rangeStart}–{rangeEnd}
            </span>{" "}
            (page {page} of {totalPages})
          </>
        ) : null}
      </p>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {blogs.map((blog) => (
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
                {decodeHtmlEntities(blog.excerpt || "Read the full article for details.")}
              </p>
              <Link href={`/blogs/${blog.slug}`} className="mt-4 font-semibold text-brand hover:text-brand-dark transition">
                Read more →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
