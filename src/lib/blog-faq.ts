export type BlogFaqItem = {
  question: string;
  answer: string;
};

const normalizeText = (value: unknown): string => {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" || typeof value === "boolean") return String(value).trim();
  return "";
};

const stripHtml = (value: string): string =>
  value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const toFaqItem = (value: unknown): BlogFaqItem | null => {
  if (!value || typeof value !== "object") return null;
  const row = value as Record<string, unknown>;
  const question = normalizeText(row.question ?? row.q ?? row.title ?? row.name);
  const answer = stripHtml(normalizeText(row.answer ?? row.a ?? row.content ?? row.description ?? row.value));
  if (!question || !answer) return null;
  return { question, answer };
};

const parseFaqArray = (value: unknown): BlogFaqItem[] => {
  if (!Array.isArray(value)) return [];
  return value.map(toFaqItem).filter((v): v is BlogFaqItem => Boolean(v));
};

const parseFaqJsonString = (value: unknown): BlogFaqItem[] => {
  if (typeof value !== "string") return [];
  const trimmed = value.trim();
  if (!trimmed || (!trimmed.startsWith("[") && !trimmed.startsWith("{"))) return [];
  try {
    return parseFaqLike(JSON.parse(trimmed));
  } catch {
    return [];
  }
};

const parseNumberedFaqFields = (obj: Record<string, unknown>): BlogFaqItem[] => {
  const out: BlogFaqItem[] = [];
  for (let i = 1; i <= 10; i += 1) {
    const q = normalizeText(
      obj[`faqQuestion${i}`] ??
        obj[`question${i}`] ??
        obj[`q${i}`],
    );
    const a = normalizeText(
      obj[`faqAnswer${i}`] ??
        obj[`answer${i}`] ??
        obj[`a${i}`],
    );
    if (q && a) out.push({ question: q, answer: a });
  }
  return out;
};

const parseFaqLike = (value: unknown): BlogFaqItem[] => {
  const fromArray = parseFaqArray(value);
  if (fromArray.length > 0) return fromArray;

  const fromJson = parseFaqJsonString(value);
  if (fromJson.length > 0) return fromJson;

  if (!value || typeof value !== "object") return [];
  const obj = value as Record<string, unknown>;

  const nestedKeys = [
    "faqs",
    "faq",
    "faqItems",
    "blogFaqs",
    "frequentlyAskedQuestions",
    "seoFaqs",
    "seoFAQ",
  ] as const;

  for (const key of nestedKeys) {
    const parsed = parseFaqLike(obj[key]);
    if (parsed.length > 0) return parsed;
  }

  return parseNumberedFaqFields(obj);
};

const decodeEntities = (value: string) =>
  value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();

const collectFaqs = (items: BlogFaqItem[], limit: number) => {
  const deduped: BlogFaqItem[] = [];
  const seen = new Set<string>();
  for (const row of items) {
    const question = decodeEntities(row.question);
    const answer = decodeEntities(row.answer);
    if (question.length < 8 || answer.length < 8 || !question.includes("?")) continue;
    const key = question.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push({ question, answer });
    if (deduped.length >= limit) break;
  }
  return deduped;
};

export function extractFaqsFromHtml(html: string, limit = 5): BlogFaqItem[] {
  if (!html) return [];

  const details: BlogFaqItem[] = [];
  const detailsRe =
    /<details[^>]*>\s*<summary[^>]*>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/gi;
  for (const match of html.matchAll(detailsRe)) {
    const item = {
      question: stripHtml(match[1] || ""),
      answer: stripHtml(match[2] || ""),
    };
    if (item.question && item.answer) details.push(item);
  }
  if (details.length > 0) return collectFaqs(details, limit);

  const faqHeadingRe =
    /<(h2|h3)[^>]*>\s*(?:.*?frequently asked questions.*?|.*?faqs?.*?)\s*<\/\1>([\s\S]*?)(?=<(?:h1|h2)[^>]*>|$)/i;
  const sectionMatch = html.match(faqHeadingRe);
  const section = sectionMatch?.[2] || html;
  const headingPairs: BlogFaqItem[] = [];
  const pairRe =
    /<(h3|h4|p|strong|button)[^>]*>([\s\S]*?\?)\s*<\/\1>\s*(?:<(?:p|div)[^>]*>)([\s\S]*?)(?:<\/(?:p|div)>)/gi;
  for (const match of section.matchAll(pairRe)) {
    const question = stripHtml(match[2] || "");
    const answer = stripHtml(match[3] || "");
    if (question && answer) headingPairs.push({ question, answer });
  }
  return collectFaqs(headingPairs, limit);
}

export function extractBlogFaqItems(blog: unknown, limit = 5): BlogFaqItem[] {
  const rows = parseFaqLike(blog).filter((item) => item.question.length > 2 && item.answer.length > 2);
  const deduped: BlogFaqItem[] = [];
  const seen = new Set<string>();
  for (const row of rows) {
    const key = row.question.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(row);
    if (deduped.length >= limit) break;
  }
  return deduped;
}

export function resolveBlogFaqItems(blog: unknown, limit = 5): BlogFaqItem[] {
  const fromFields = extractBlogFaqItems(blog, limit);
  if (fromFields.length > 0) return fromFields;
  if (!blog || typeof blog !== "object") return [];
  const content = (blog as { content?: unknown }).content;
  if (typeof content !== "string" || !content.trim()) return [];
  return extractFaqsFromHtml(content, limit);
}

export function buildBlogFaqJsonLd(items: BlogFaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
