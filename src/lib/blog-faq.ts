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
