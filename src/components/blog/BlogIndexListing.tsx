import Link from "next/link";
import type { Blog } from "@/types/blog";
import { decodeHtmlEntities, formatBlogDate } from "@/lib/blogs";
import BlogThumbImage from "@/components/blog/BlogThumbImage";

const placeholder = "https://placehold.co/1200x700/e5ecef/74828a?text=Vybein+Blog";

type Props = {
  blogs: Blog[];
  /** Page 1 shows the first post as a featured hero + grid for the rest. */
  page: number;
};

export default function BlogIndexListing({ blogs, page }: Props) {
  if (blogs.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 p-10 text-center text-gray-500">
        No blog posts available right now.
      </div>
    );
  }

  const showFeatured = page === 1;
  const featuredBlog = showFeatured ? blogs[0] : undefined;
  const gridBlogs = showFeatured ? blogs.slice(1) : blogs;

  return (
    <>
      {!featuredBlog ? null : (
        <article className="mb-8 md:mb-10 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
          <div className="grid lg:grid-cols-2">
            <BlogThumbImage
              src={featuredBlog.thumbnail || placeholder}
              alt={featuredBlog.title}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="bg-gradient-to-b from-slate-100 to-slate-200/60 lg:h-full lg:min-h-64"
            />
            <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10">
              <p className="mb-3 text-xs uppercase tracking-wide text-gray-500">
                Featured — {formatBlogDate(featuredBlog.createdAt)}
              </p>
              <h2 className="mb-4 text-2xl font-bold leading-tight text-gray-900 md:text-3xl">{featuredBlog.title}</h2>
              <p className="mb-6 line-clamp-4 text-sm text-gray-600 md:text-base">
                {decodeHtmlEntities(featuredBlog.excerpt || "Read the full article for details.")}
              </p>
              <Link href={`/blogs/${featuredBlog.slug}`} className="font-semibold text-brand hover:text-brand-dark transition">
                Read Featured Story →
              </Link>
            </div>
          </div>
        </article>
      )}

      {gridBlogs.length === 0 ? null : (
        <div className="grid gap-6 sm:grid-cols-2 md:gap-8 xl:grid-cols-3">
          {gridBlogs.map((blog) => (
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
                <p className="mb-2 text-xs uppercase tracking-wide text-gray-500">{formatBlogDate(blog.createdAt)}</p>
                <h2 className="mb-2 line-clamp-2 text-xl font-bold text-gray-900">{blog.title}</h2>
                <p className="mb-6 line-clamp-3 flex-1 text-sm text-gray-600">
                  {decodeHtmlEntities(blog.excerpt || "Read the full article for details.")}
                </p>
                <Link href={`/blogs/${blog.slug}`} className="font-semibold text-brand hover:text-brand-dark transition">
                  Read more →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
