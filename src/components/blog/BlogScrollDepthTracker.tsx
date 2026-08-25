"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

type Props = {
  slug: string;
};

const DEPTH_MARKERS = [50, 90];

export default function BlogScrollDepthTracker({ slug }: Props) {
  useEffect(() => {
    const seen = new Set<number>();

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const viewport = window.innerHeight || doc.clientHeight || 0;
      const fullHeight = Math.max(doc.scrollHeight, document.body.scrollHeight);
      const maxScrollable = Math.max(fullHeight - viewport, 1);
      const depth = Math.round(((scrollTop + viewport) / maxScrollable) * 100);

      DEPTH_MARKERS.forEach((marker) => {
        if (depth >= marker && !seen.has(marker)) {
          seen.add(marker);
          trackEvent("blog_scroll_depth", {
            blog_slug: slug,
            depth_percent: marker,
            surface: "blog_detail",
          });
        }
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  return null;
}

