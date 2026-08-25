import Link from "next/link";
import { getAllPublishedBlogsForHubs } from "@/lib/blogs";
import { listTopicHubsSorted } from "@/lib/blog-topics";

const MAX_CHIPS = 14;

export default async function BlogTopicsExplorer() {
  const blogs = await getAllPublishedBlogsForHubs();
  const topics = listTopicHubsSorted(blogs);

  if (topics.length === 0) {
    return null;
  }

  const chips = topics.slice(0, MAX_CHIPS);

  return (
    <section className="mb-10 md:mb-12 rounded-2xl border border-gray-200 bg-white/80 p-5 sm:p-6 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">Browse by topic</p>
        </div>
        <Link
          href="/blogs/topics"
          className="shrink-0 text-sm font-semibold text-brand hover:text-brand-dark transition"
        >
          All topics →
        </Link>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {chips.map((t) => (
          <Link
            key={t.slug}
            href={`/blogs/topics/${encodeURIComponent(t.slug)}`}
            className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-800 shadow-sm transition hover:border-brand/40 hover:text-brand-dark"
          >
            {t.label}
            <span className="ml-1.5 text-xs font-normal text-gray-500">({t.blogs.length})</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
