export type FaqItem = {
  question: string;
  answer: string;
};

/** Single source of truth for marketing FAQ (homepage + `/faq`). */
export const SITE_FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is Vybein?",
    answer:
      "Vybein helps you find people nearby who match your vibe — for gym, meals, study, travel, and everyday life. It is built for real meetups, not endless scrolling.",
  },
  {
    question: "Who should use Vybein?",
    answer:
      "Vybein is for anyone who feels isolated in daily life and wants genuine social connection. Students, working professionals, newcomers in a city, and people rebuilding their routine can all use it to meet like-minded people nearby.",
  },
  {
    question: "How does Vybein help me make real friends nearby?",
    answer:
      "You pick your current vibe and activity interests, then discover people around you who want to do similar things in real life. Instead of endless online chats, Vybein is designed to move toward practical, local meetups.",
  },
  {
    question: "Is my personal information shared?",
    answer:
      "We are designed for privacy: no unnecessary personal data exposure, and you connect on your terms. Safety and genuine profiles are core to the experience.",
  },
  {
    question: "Is Vybein safe for meeting new people?",
    answer:
      "Safety is a core product focus. Vybein is built around private-by-design behavior, meaningful profiles, and respectful interactions so users can connect with confidence before meeting in person.",
  },
  {
    question: "Is Vybein a dating app?",
    answer:
      "No. Vybein is primarily a real-life social connection app for everyday activities and shared routines. You can find people for gym, tea, study sessions, travel plans, and community-style meetups based on vibe compatibility.",
  },
  {
    question: "Is Vybein available on iOS?",
    answer: "iOS is coming soon. You can install Vybein from the Google Play Store today.",
  },
  {
    question: "How is Vybein different from social media?",
    answer:
      "Social media often keeps people in passive scrolling mode. Vybein is focused on active, real-world connection by helping you discover compatible people nearby and actually meet for shared activities.",
  },
  {
    question: "Can I find people for gym, study, travel, or tea meetups?",
    answer:
      "Yes. Vybein supports everyday interests like gym partners, study circles, tea hangouts, dinner plans, weekend travel, and other lifestyle activities where people want genuine companionship.",
  },
  {
    question: "How does Vybein reduce loneliness and social stress?",
    answer:
      "Vybein helps convert emotional isolation into meaningful interaction by matching you with people who share your pace and interests. Small, natural meetups can make routines feel lighter, more social, and more emotionally supportive.",
  },
  {
    question: "How is Vybein different from dating or chat apps?",
    answer:
      "Vybein is not about swipes for romance alone — it is about finding partners and groups for real activities: workouts, dinners, trips, study circles, and more.",
  },
  {
    question: "Can I use Vybein when I am new in a city?",
    answer:
      "Absolutely. Many users join Vybein to build a local circle after relocating for work or college. It helps you discover nearby people with similar interests so you can settle in faster and feel connected.",
  },
  {
    question: "Why does Vybein publish blogs and social connection guides?",
    answer:
      "Our blogs share practical advice on friendship, routine building, social confidence, and offline connection so users can make healthier social choices. The app plus educational content work together to support real-life bonding.",
  },
  {
    question: "Where can I read Vybein blogs and tips?",
    answer:
      "You can explore the latest guides and articles on the Vybein blog section. It includes topic-based posts around emotional wellbeing, social habits, meetups, and real-life connection strategies.",
  },
];

export function buildFaqPageJsonLd(items: FaqItem[] = SITE_FAQ_ITEMS) {
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
