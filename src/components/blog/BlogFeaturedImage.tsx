"use client";

import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
};

/**
 * Wide banners (e.g. marketing headers) fit poorly in 16:9 — use a cinematic ratio
 * and a soft frame so letterboxing blends instead of harsh gray blocks.
 */
export default function BlogFeaturedImage({ src, alt, priority, sizes }: Props) {
  return (
    <div className="relative w-full overflow-hidden rounded-[1.75rem] border border-gray-200/70 bg-gradient-to-b from-slate-300/45 via-slate-100 to-slate-200/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] ring-1 ring-black/[0.04]">
      <div className="relative aspect-[2.15/1] w-full sm:aspect-[2.25/1] md:aspect-[2.35/1]">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-contain object-center"
          sizes={sizes ?? "(max-width: 1024px) 100vw, 840px"}
        />
      </div>
    </div>
  );
}
