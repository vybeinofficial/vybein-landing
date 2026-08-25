import Header from "@/components/Header";
import Footer from "@/components/Footer";

type LegalSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  subHeading?: string;
};

type LegalPageTemplateProps = {
  title: string;
  sections: LegalSection[];
};

export default function LegalPageTemplate({ title, sections }: LegalPageTemplateProps) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <section className="hero-gradient pt-24 pb-12 md:pt-28 md:pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {title}
            </h1>
          </div>
        </section>

        <section className="py-10 md:py-14">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-gray-200 bg-white shadow-sm p-6 md:p-10">
              <div className="space-y-8">
                {sections.map((section) => (
                  <article key={section.heading} className="space-y-3">
                    <h2 className="text-2xl font-bold text-gray-900">{section.heading}</h2>
                    {section.paragraphs?.map((paragraph) => (
                      <p key={paragraph} className="text-gray-700 leading-7">
                        {paragraph}
                      </p>
                    ))}
                    {section.subHeading && (
                      <h3 className="text-xl font-semibold text-gray-800">{section.subHeading}</h3>
                    )}

                    {!section.bullets ? null : (
                      <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-7">
                        {section.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}