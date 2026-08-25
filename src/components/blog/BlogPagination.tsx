import Link from "next/link";
import { blogListHref } from "@/lib/blog-list-nav";

type Props = {
  page: number;
  totalPages: number;
  /** When set, pagination links preserve title search. */
  searchQuery?: string;
};

export default function BlogPagination({ page, totalPages, searchQuery }: Props) {
  if (totalPages <= 1) return null;

  const prevHref = blogListHref(page - 1, searchQuery);
  const nextHref = blogListHref(page + 1, searchQuery);

  return (
    <nav className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center" aria-label="Blog list pagination">
      <div className="flex items-center gap-2">
        {page <= 1 ? (
          <span className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-400">Previous</span>
        ) : (
          <Link
            href={prevHref}
            className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm transition hover:border-brand/40 hover:text-brand-dark"
          >
            Previous
          </Link>
        )}
        {page >= totalPages ? (
          <span className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-400">Next</span>
        ) : (
          <Link
            href={nextHref}
            className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm transition hover:border-brand/40 hover:text-brand-dark"
          >
            Next
          </Link>
        )}
      </div>
      <p className="text-sm text-gray-600">
        Page <span className="font-semibold text-gray-900">{page}</span> of{" "}
        <span className="font-semibold text-gray-900">{totalPages}</span>
      </p>
    </nav>
  );
}
