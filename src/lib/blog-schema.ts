import type { Blog } from "@/types/blog";
import { SITE_URL } from "@/lib/site";
import { decodeHtmlEntities } from "@/lib/blogs";
import { buildBlogFaqJsonLd, resolveBlogFaqItems } from "@/lib/blog-faq";

const fallbackLogo = `${SITE_URL}/logo.png`;

export function blogCanonicalUrl(blog: Pick<Blog, "slug">) {
  return `${SITE_URL}/blogs/${blog.slug}`;
}

export function buildBlogArticleSchema(blog: Blog) {
  const canonicalUrl = blogCanonicalUrl(blog);
  const articleImage = blog.ogImage || blog.thumbnail || fallbackLogo;
  const createdAtIso = new Date(blog.createdAt || Date.now()).toISOString();
  const updatedAtIso = new Date(blog.updatedAt || blog.createdAt || Date.now()).toISOString();
  const articleDescription = decodeHtmlEntities(
    blog.seoDescription || blog.excerpt || blog.title,
  );

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: decodeHtmlEntities(blog.seoTitle || blog.title),
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
        url: fallbackLogo,
      },
    },
    mainEntityOfPage: canonicalUrl,
    url: canonicalUrl,
  };
}

export function buildBlogBreadcrumbSchema(blog: Blog) {
  const canonicalUrl = blogCanonicalUrl(blog);
  return {
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
        name: decodeHtmlEntities(blog.title),
        item: canonicalUrl,
      },
    ],
  };
}

export function buildBlogStructuredData(blog: Blog) {
  const faqItems = resolveBlogFaqItems(blog, 5);
  return {
    article: buildBlogArticleSchema(blog),
    breadcrumb: buildBlogBreadcrumbSchema(blog),
    faq: faqItems.length > 0 ? buildBlogFaqJsonLd(faqItems) : null,
  };
}
