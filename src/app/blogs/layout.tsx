import BlogStickyChrome from "@/components/blog/BlogStickyChrome";

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pb-6 md:pb-8">
      {children}
      <BlogStickyChrome />
    </div>
  );
}
