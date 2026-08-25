"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Blog, BlogResponse } from "@/types/blog";
import BlogDownloadCta from "@/components/blog/BlogDownloadCta";
import BlogFeaturedImage from "@/components/blog/BlogFeaturedImage";
import BlogReadingAssist from "@/components/blog/BlogReadingAssist";
import BlogShareRow from "@/components/blog/BlogShareRow";
import { extractBlogFaqItems } from "@/lib/blog-faq";
import { decodeHtmlEntities, extractHeadings, formatBlogDate, getBlogDisplayTags, injectHeadingIds, sanitizeBlogHtml } from "@/lib/blogs";
import { API_BASE_URL, SITE_URL } from "@/lib/site";

const fallbackImage = "https://placehold.co/1400x800/e5ecef/74828a?text=Vybein+Blog";

type Props = {
    slug: string;
};

export default function BlogDetailClientFallback({ slug }: Props) {
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}/blogs/${encodeURIComponent(slug)}`)
            .then((res) => {
                if (res.status === 404) {
                    throw new Error("Blog not found");
                }
                if (!res.ok) {
                    throw new Error(`Blog API failed: ${res.status} ${res.statusText}`);
                }
                return res.json() as Promise<BlogResponse>;
            })
            .then((result) => {
                if (!result?.success || !result.data) {
                    throw new Error("Invalid blog response");
                }
                setBlog(result.data);
            })
            .catch((err) => {
                console.error("BLOG DETAIL CLIENT FALLBACK ERROR:", err);
                setError("The blog could not be loaded right now.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [slug]);

    useEffect(() => {
        if (blog) {
            document.title = `${blog.seoTitle || blog.title} | Vybein`;
        }
    }, [blog]);

    useEffect(() => {
        if (!loading && error) {
            document.title = "Blog not found | Vybein";
        }
    }, [loading, error]);

    const contentWithIds = useMemo(
        () => (blog?.content ? injectHeadingIds(blog.content) : ""),
        [blog],
    );
    const contentHtml = useMemo(() => sanitizeBlogHtml(contentWithIds), [contentWithIds]);
    const tocItems = useMemo(() => extractHeadings(contentWithIds), [contentWithIds]);
    const displayTags = useMemo(() => (blog ? getBlogDisplayTags(blog) : []), [blog]);
    const postFaqs = useMemo(() => (blog ? extractBlogFaqItems(blog, 5) : []), [blog]);
    const shareUrl = useMemo(
        () => (typeof window !== "undefined" ? window.location.href : `${SITE_URL}/blogs/${blog?.slug || slug}`),
        [blog?.slug, slug],
    );

    if (loading) {
        return (
            <main className="min-h-screen hero-gradient text-gray-900">
                <section className="pt-28 pb-16">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-500">Loading blog...</div>
                    </div>
                </section>
            </main>
        );
    }

    if (error || !blog) {
        return (
            <main className="min-h-screen hero-gradient text-gray-900">
                <section className="pt-28 pb-16">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center text-red-700">
                            {error || "Blog not found."}
                        </div>
                        <div className="mt-6 text-center">
                            <Link href="/blogs" className="inline-flex rounded-xl bg-brand px-5 py-3 font-semibold text-white hover:bg-brand-dark transition">
                                Back to Blogs
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main className="min-h-screen hero-gradient text-gray-900">
            <BlogReadingAssist tocItems={tocItems} />
            <section className="hero-gradient pt-28 md:pt-32 pb-10 md:pb-14">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link href="/blogs" className="inline-flex text-sm font-semibold text-brand hover:text-brand-dark transition">
                        ← Back to Blogs
                    </Link>
                    <h1 className="mt-4 font-heading text-4xl md:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
                        {blog.title}
                    </h1>
                    <p className="mt-4 text-sm text-gray-500">
                        {blog.author || "Vybein"} • {formatBlogDate(blog.createdAt)}
                    </p>
                    <BlogShareRow url={shareUrl} title={blog.title} className="mt-6" />
                </div>
            </section>

            <section className="pb-16 md:pb-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <article className="rounded-[2rem] border border-gray-200 bg-white p-5 sm:p-7 md:p-10 shadow-sm">
                        <div className="shadow-lg shadow-brand/10">
                            <BlogFeaturedImage
                                src={blog.thumbnail || fallbackImage}
                                alt={blog.title}
                                priority
                            />
                        </div>
                        <p className="mt-6 text-base md:text-lg text-gray-600 leading-8">
                            {decodeHtmlEntities(blog.seoDescription || blog.excerpt || "Explore the latest Vybein story.")}
                        </p>
                        {tocItems.length > 0 ? (
                            <section className="mt-8 rounded-[1.75rem] border border-gray-200 bg-slate-50 p-5 sm:p-6">
                                <h2 className="text-lg font-bold text-gray-900">Table of Contents</h2>
                                <nav className="mt-4 space-y-2 text-sm">
                                    {tocItems.map((heading) => (
                                        <a
                                            key={heading.id}
                                            href={heading.anchor}
                                            className={`block truncate transition hover:text-brand-dark ${heading.level === 1 ? "font-semibold text-gray-900" :
                                                heading.level === 2 ? "font-medium text-gray-700 pl-3" :
                                                    "text-gray-600 pl-6"
                                                }`}
                                        >
                                            {heading.text}
                                        </a>
                                    ))}
                                </nav>
                            </section>
                        ) : null}
                        <div
                            className="blog-content mt-8 max-w-none text-[17px] leading-8 text-gray-700 [&_p]:my-4 [&_h1]:mt-10 [&_h2]:mt-8 [&_h3]:mt-6 [&_img]:my-6 [&_img]:h-auto [&_img]:max-h-[520px] [&_img]:w-auto [&_img]:max-w-full [&_img]:rounded-2xl [&_img]:object-contain [&_img]:shadow-sm [&_img]:mx-auto [&_table]:my-6 [&_table]:w-full [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-2xl [&_pre]:bg-slate-950 [&_pre]:p-4 [&_pre]:text-slate-100"
                            dangerouslySetInnerHTML={{ __html: contentHtml }}
                        />
                        {postFaqs.length === 0 ? null : (
                            <section className="mt-12 rounded-[1.75rem] border border-gray-200 bg-white p-5 sm:p-6" id="post-faq">
                                <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
                                <div className="mt-5 space-y-3">
                                    {postFaqs.map((faq) => (
                                        <details
                                            key={faq.question}
                                            className="group overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-sm open:ring-2 open:ring-brand/20"
                                        >
                                            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-left marker:content-none hover:bg-gray-50/80 sm:px-5">
                                                <span className="text-base font-semibold text-gray-900">{faq.question}</span>
                                                <span className="text-brand text-lg font-bold leading-none group-open:hidden">+</span>
                                                <span className="text-brand text-lg font-bold leading-none hidden group-open:inline">−</span>
                                            </summary>
                                            <div className="border-t border-gray-100 bg-gray-50/50 px-4 py-4 text-gray-700 sm:px-5">
                                                {faq.answer}
                                            </div>
                                        </details>
                                    ))}
                                </div>
                            </section>
                        )}

                        <div className="mt-12 rounded-[1.75rem] bg-slate-50 p-5 sm:p-6">
                            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-500">Tags</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {displayTags.length > 0 ? (
                                    displayTags.map((tag) => (
                                        <span key={tag} className="rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-700">
                                            {tag}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-sm text-gray-500">No tags available for this post.</span>
                                )}
                            </div>
                        </div>
                        <BlogShareRow url={shareUrl} title={blog.title} className="mt-8" />

                        <div className="flex justify-center">
                            <BlogDownloadCta />
                        </div>
                   
                    </article>
                </div>
            </section>
        </main>
    );
}