/** Build `/blogs` URL with optional search query and page (page 1 omits `page`). */
export function blogListHref(page: number, q?: string): string {
  const params = new URLSearchParams();
  const qt = q?.trim();
  if (qt) params.set("q", qt);
  if (page > 1) params.set("page", String(page));
  const s = params.toString();
  return s ? `/blogs?${s}` : "/blogs";
}

export function parseBlogListPageParam(raw: string | string[] | undefined): number {
  const v = Array.isArray(raw) ? raw[0] : raw;
  const n = parseInt(String(v ?? ""), 10);
  if (!Number.isFinite(n) || n < 1) return 1;
  return Math.floor(n);
}
