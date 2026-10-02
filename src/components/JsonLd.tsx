import { serializeJsonLd } from "@/lib/json-ld";

/** Server-only JSON-LD. Keep this out of client components so it is in the first HTML for mobile Googlebot. */
export default function JsonLd({ data, id }: { data: unknown; id?: string }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
