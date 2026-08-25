import Link from "next/link";

export default function BlogNotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="text-center max-w-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Blog Not Found</h1>
        <p className="text-gray-600 mb-6">
          The blog you requested is unavailable or unpublished.
        </p>
        <Link href="/blogs" className="inline-flex px-5 py-3 rounded-xl bg-brand text-white font-semibold hover:bg-brand-dark transition">
          Browse Blogs
        </Link>
      </div>
    </main>
  );
}
