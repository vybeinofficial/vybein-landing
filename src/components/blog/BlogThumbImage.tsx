import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

/**
 * List/card thumbnail: full banner visible, consistent 16:9 frame.
 * Letterboxing uses the same soft slate fill as featured cards — not object-cover crop.
 */
export default function BlogThumbImage({ src, alt, priority, sizes, className = "" }: Props) {
  return (
    <div
      className={`relative aspect-video w-full overflow-hidden bg-gradient-to-b from-slate-100 to-slate-200/60 ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-contain object-center"
        sizes={sizes}
      />
    </div>
  );
}
