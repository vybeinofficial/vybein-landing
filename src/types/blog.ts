export type Blog = {
  id: string;
  title: string;
  slug: string;
  content?: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoKeywords?: string | null;
  ogImage?: string | null;
  noIndex?: boolean;
  thumbnail?: string | null;
  author?: string;
  createdAt?: string;
  updatedAt?: string;
  excerpt?: string;
  isPublished?: boolean;
  faqs?: Array<{
    question?: string;
    answer?: string;
    q?: string;
    a?: string;
    title?: string;
    content?: string;
  }> | null;
  faq?: unknown;
  faqItems?: unknown;
  frequentlyAskedQuestions?: unknown;
};

export type BlogsResponse = {
  success: boolean;
  data: Blog[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type BlogResponse = {
  success: boolean;
  data: Blog;
};
