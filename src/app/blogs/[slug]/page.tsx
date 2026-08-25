import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogDownloadCta from "@/components/blog/BlogDownloadCta";
import BlogScrollDepthTracker from "@/components/blog/BlogScrollDepthTracker";
import BlogFeaturedImage from "@/components/blog/BlogFeaturedImage";
import BlogReadingAssist from "@/components/blog/BlogReadingAssist";
import BlogShareRow from "@/components/blog/BlogShareRow";
import BlogDetailClientFallback from "./BlogDetailClientFallback";
import { getBlogTopicKeywordLabels, pickRelatedBlogsByTopicRelevance, slugifyBlogTopic } from "@/lib/blog-topics";
import { buildBlogFaqJsonLd, extractBlogFaqItems } from "@/lib/blog-faq";
import {
    blogTitleFromSlug,
    decodeHtmlEntities,
    formatBlogDate,
    getBlogDetailPageData,
    getBlogDisplayTags,
    getPublishedBlogs,
    sanitizeBlogHtml,
    extractHeadings,
    injectHeadingIds,
} from "@/lib/blogs";
import { SITE_URL } from "@/lib/site";

type BlogPageProps = {
    params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";
export const dynamicParams = true;

const fallbackImage = "https://placehold.co/1400x800/e5ecef/74828a?text=Vybein+Blog";

const toPlainText = (html?: string) =>
    decodeHtmlEntities(
        String(html || "")
            .replace(/<[^>]*>/g, " ")
            .replace(/\s+/g, " ")
            .trim(),
    );

const sortNewestFirst = (blogs: Awaited<ReturnType<typeof getPublishedBlogs>>, currentSlug: string) =>
    [...blogs]
        .filter((blog) => blog.slug !== currentSlug)
        .sort((a, b) => {
            const aDate = new Date(a.createdAt || 0).getTime();
            const bDate = new Date(b.createdAt || 0).getTime();
            return bDate - aDate;
        });

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
    const { slug } = await params;
    const { blog } = await getBlogDetailPageData(slug);

    if (!blog) {
        // Server may fail on Vercel while the client fallback still loads the post — avoid a false "Blog Not Found" tab title.
        const provisional = blogTitleFromSlug(slug);
        return {
            title: provisional,
            description: `Read "${provisional}" and more on the Vybein blog.`,
            alternates: {
                canonical: `${SITE_URL}/blogs/${slug}`,
            },
            robots: { index: true, follow: true },
        };
    }

    const title = blog.seoTitle || blog.title;
    const description = blog.seoDescription || blog.excerpt || blog.title;
    const image = blog.ogImage || blog.thumbnail || "/logo.png";
    const canonical = `${SITE_URL}/blogs/${blog.slug}`;

    return {
        title,
        description,
        alternates: {
            canonical,
        },
        robots: blog.noIndex ? { index: false, follow: false } : { index: true, follow: true },
        openGraph: {
            title,
            description,
            url: canonical,
            type: "article",
            images: [{ url: image }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
        },
    };
}

function BlogCard({ blog, compact = false }: { blog: Awaited<ReturnType<typeof getPublishedBlogs>>[number]; compact?: boolean }) {
    const summary = toPlainText(blog.excerpt || blog.content || "Read the full story for complete details.");

    return (
        <article className={`group rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md ${compact ? "p-4" : "overflow-hidden"}`}>
            {compact ? (
                <div className="relative mb-3 aspect-[1600/654] overflow-hidden rounded-xl bg-gray-100">
                    <Image
                        src={blog.thumbnail || fallbackImage}
                        alt={blog.title}
                        fill
                        className="object-cover transition duration-300 group-hover:scale-[1.02]"
                        sizes="(max-width: 1024px) 100vw, 340px"
                    />
                </div>
            ) : (
                <div className="relative aspect-[1600/654] overflow-hidden bg-gray-100">
                    <Image
                        src={blog.thumbnail || fallbackImage}
                        alt={blog.title}
                        fill
                        className="object-cover transition duration-300 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 320px"
                    />
                </div>
            )}
            <div className={compact ? "space-y-2" : "p-5 space-y-3"}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand/80">
                    {formatBlogDate(blog.createdAt)}
                </p>
                <h3 className={`font-heading font-bold text-gray-900 leading-tight ${compact ? "text-base" : "text-xl"}`}>
                    <Link href={`/blogs/${blog.slug}`} className="hover:text-brand-dark transition">
                        {blog.title}
                    </Link>
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                    {summary}
                </p>
                <Link href={`/blogs/${blog.slug}`} className="inline-flex text-sm font-semibold text-brand hover:text-brand-dark transition">
                    Read article →
                </Link>
            </div>
        </article>
    );
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
    const { slug } = await params;
    const { blog, allBlogs } = await getBlogDetailPageData(slug);

    if (!blog) {
        return (
            <>
                <Header />
                <BlogDetailClientFallback slug={slug} />
                <Footer />
            </>
        );
    }

    const tags = getBlogDisplayTags(blog);
    const topicKeywordLower = new Set(getBlogTopicKeywordLabels(blog).map((l) => l.toLowerCase()));
    const sortedBlogs = sortNewestFirst(allBlogs, slug);
    const recentBlogs = sortedBlogs.slice(0, 4);
    const pastBlogs = sortedBlogs.slice(-4).reverse();
    const relatedBlogs = pickRelatedBlogsByTopicRelevance(blog, allBlogs, 3);
    const publishedDate = formatBlogDate(blog.createdAt);
    const contentWithIds = injectHeadingIds(blog.content || "");
    const contentHtml = sanitizeBlogHtml(contentWithIds || "");
    const headings = extractHeadings(contentWithIds);
    const canonicalUrl = `${SITE_URL}/blogs/${blog.slug}`;
    const articleImage = blog.ogImage || blog.thumbnail || `${SITE_URL}/logo.png`;
    const createdAtIso = new Date(blog.createdAt || Date.now()).toISOString();
    const updatedAtIso = new Date(blog.updatedAt || blog.createdAt || Date.now()).toISOString();
    const articleDescription = decodeHtmlEntities(
        blog.seoDescription || blog.excerpt || "Explore the latest Vybein story, ideas, and community updates.",
    );
    const postFaqs = extractBlogFaqItems(blog, 5);
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: blog.seoTitle || blog.title,
        description: articleDescription,
        image: [articleImage],
        datePublished: createdAtIso,
        dateModified: updatedAtIso,
        author: {
            "@type": "Person",
            name: blog.author || "Vybein",
        },
        publisher: {
            "@type": "Organization",
            name: "Vybein",
            logo: {
                "@type": "ImageObject",
                url: `${SITE_URL}/logo.png`,
            },
        },
        mainEntityOfPage: canonicalUrl,
    };
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: SITE_URL,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Blogs",
                item: `${SITE_URL}/blogs`,
            },
            {
                "@type": "ListItem",
                position: 3,
                name: blog.title,
                item: canonicalUrl,
            },
        ],
    };
    const blogFaqSchema = postFaqs.length > 0 ? buildBlogFaqJsonLd(postFaqs) : null;

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {!blogFaqSchema ? null : (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(blogFaqSchema) }}
                />
            )}
            <BlogScrollDepthTracker slug={blog.slug} />
            <BlogReadingAssist tocItems={headings} />
            <Header />
            <main className="min-h-screen hero-gradient text-gray-900">
                <section className="hero-gradient pt-28 md:pt-32 pb-10 md:pb-14">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Link href="/blogs" className="inline-flex text-sm font-semibold text-brand hover:text-brand-dark transition">
                            ← Back to Blogs
                        </Link>

                        <div className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
                            <div className="max-w-4xl">
                                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">
                                    <span>{blog.author || "Vybein"}</span>
                                    <span className="h-1 w-1 rounded-full bg-gray-400" />
                                    <span>{publishedDate}</span>
                                </div>

                                <h1 className="mt-4 font-heading text-4xl md:text-6xl font-bold tracking-tight text-gray-900 leading-tight" style={{ fontSize: "clamp(2.5rem, 5vw, 3.75rem)" }}>
                                    {blog.title}
                                </h1>

                                <p className="mt-5 max-w-3xl text-base md:text-lg text-gray-600 leading-8">
                                    {decodeHtmlEntities(blog.seoDescription || blog.excerpt || "Explore the latest Vybein story, ideas, and community updates.")}
                                </p>
                                <BlogShareRow url={canonicalUrl} title={blog.title} className="mt-6" />

                            </div>


                        </div>
                    </div>
                </section>

                <section className="pb-16 md:pb-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
                            <article className="min-w-0 rounded-[2rem] border border-gray-200 bg-white p-5 sm:p-7 md:p-10 shadow-sm">
                                <div className="shadow-lg shadow-brand/10">
                                    <BlogFeaturedImage
                                        src={blog.thumbnail || fallbackImage}
                                        alt={blog.title}
                                        priority
                                    />
                                </div>

                                {headings.length > 0 ? (
                                    <section className="mt-8 rounded-[1.75rem] border border-gray-200 bg-slate-50 p-5 sm:p-6">
                                        <h2 className="text-lg font-bold text-gray-900">Table of Contents</h2>
                                        <nav className="mt-4 space-y-2 text-sm">
                                            {headings.map((heading) => (
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
                                    className="blog-content mt-8 max-w-none text-[17px] leading-8 text-gray-700 [&_p]:my-4 [&_h1]:mt-10 [&_h2]:mt-8 [&_h3]:mt-6 [&_img]:my-6 [&_img]:h-auto [&_img]:max-h-[520px] [&_img]:w-auto [&_img]:max-w-full [&_img]:rounded-2xl [&_img]:object-contain [&_img]:shadow-sm [&_img]:mx-auto [&_table]:my-6 [&_table]:w-full [&_table]:overflow-x-auto [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-2xl [&_pre]:bg-slate-950 [&_pre]:p-4 [&_pre]:text-slate-100 [&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-brand [&_blockquote]:pl-4 [&_blockquote]:italic [&_a]:font-semibold [&_a]:text-brand [&_a]:no-underline hover:[&_a]:text-brand-dark hover:[&_a]:underline"
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
                                        {tags.length > 0 ? tags.map((tag) => {
                                            const isTopicKeyword = topicKeywordLower.has(tag.toLowerCase());
                                            const topicSlug = slugifyBlogTopic(tag);
                                            if (isTopicKeyword && topicSlug) {
                                                return (
                                                    <Link
                                                        key={tag}
                                                        href={`/blogs/topics/${encodeURIComponent(topicSlug)}`}
                                                        className="rounded-full border border-gray-200 bg-white px-3 py-1 text-sm font-medium text-brand hover:border-brand/40 hover:text-brand-dark transition"
                                                    >
                                                        {tag}
                                                    </Link>
                                                );
                                            }
                                            return (
                                                <span key={tag} className="rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-700">
                                                    {tag}
                                                </span>
                                            );
                                        }) : (
                                            <span className="text-sm text-gray-500">No tags available for this post.</span>
                                        )}
                                    </div>
                                </div>
                                <BlogShareRow url={canonicalUrl} title={blog.title} className="mt-8" />

                                <BlogDownloadCta />
                            </article>

                            <aside className="space-y-6">
                                <section className="rounded-[1.75rem] border border-gray-200 bg-white p-5 shadow-sm">
                                    <div className="flex items-center justify-between gap-4">
                                        <h2 className="text-lg font-bold text-gray-900">Recent Blogs</h2>
                                        <Link href="/blogs" className="text-sm font-semibold text-brand hover:text-brand-dark transition">
                                            View all
                                        </Link>
                                    </div>
                                    <div className="mt-4 space-y-4">
                                        {recentBlogs.map((item) => (
                                            <BlogCard key={item.id} blog={item} compact />
                                        ))}
                                    </div>
                                </section>

                                <section className="rounded-[1.75rem] border border-gray-200 bg-white p-5 shadow-sm">
                                    <h2 className="text-lg font-bold text-gray-900">Past Blogs</h2>
                                    <div className="mt-4 space-y-4">
                                        {pastBlogs.length > 0 ? pastBlogs.map((item) => (
                                            <BlogCard key={item.id} blog={item} compact />
                                        )) : (
                                            <p className="text-sm text-gray-500">No older posts available yet.</p>
                                        )}
                                    </div>
                                </section>

                                <section className="rounded-[1.75rem] border border-gray-200 bg-gradient-to-br from-brand/10 to-white p-5 shadow-sm">
                                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">Why Vybein Blog</p>
                                    <p className="mt-3 text-sm leading-7 text-gray-700">
                                        Practical stories about social discovery, community experiences, and the product ideas behind Vybein.
                                    </p>
                                </section>
                            </aside>
                        </div>

                        {relatedBlogs.length > 0 ? (
                            <section className="mt-12 md:mt-16">
                                <div className="flex items-end justify-between gap-4">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">More Stories</p>
                                        <h2 className="mt-2 font-heading text-2xl md:text-3xl font-bold text-gray-900">Related posts</h2>
                                        <p className="mt-1 text-sm text-gray-500">Picked by shared topics and title overlap.</p>
                                    </div>
                                    <Link href="/blogs" className="text-sm font-semibold text-brand hover:text-brand-dark transition">
                                        Browse all
                                    </Link>
                                </div>

                                <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                    {relatedBlogs.map((item) => (
                                        <BlogCard key={item.id} blog={item} />
                                    ))}
                                </div>
                            </section>
                        ) : null}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}