import Link from "next/link";

type Props = {
  defaultQuery?: string;
};

export default function BlogSearchBar({ defaultQuery = "" }: Props) {
  return (
    <div className="mb-8 md:mb-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <form action="/blogs" method="get" className="flex w-full max-w-xl gap-2">
        <label htmlFor="blog-search" className="sr-only">
          Search blog posts
        </label>
        <input
          id="blog-search"
          name="q"
          type="search"
          defaultValue={defaultQuery}
          placeholder="Search by title…"
          autoComplete="off"
          className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
        <button
          type="submit"
          className="shrink-0 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark"
        >
          Search
        </button>
      </form>
      {defaultQuery ? (
        <Link href="/blogs" className="text-sm font-semibold text-brand hover:text-brand-dark transition sm:shrink-0">
          Clear search
        </Link>
      ) : null}
    </div>
  );
}
