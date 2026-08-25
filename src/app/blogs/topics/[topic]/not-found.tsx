import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function BlogTopicNotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white px-4 py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="font-heading text-2xl font-bold text-gray-900">Topic not found</h1>
          <p className="mt-3 text-gray-600">This topic does not exist or has no published posts.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/blogs/topics" className="inline-flex rounded-xl bg-brand px-5 py-3 font-semibold text-white hover:bg-brand-dark transition">
              All topics
            </Link>
            <Link href="/blogs" className="inline-flex rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-800 hover:bg-gray-50 transition">
              Blog home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
