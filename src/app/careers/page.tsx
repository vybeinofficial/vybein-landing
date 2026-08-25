import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
    title: "Careers",
    description: "Join the Vybein team and help us connect communities through premium events and activities.",
    alternates: {
        canonical: `${SITE_URL}/careers`,
    },
};

export default function CareersPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-white">
                <section className="hero-gradient pt-24 pb-12 md:pt-28 md:pb-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                            Join Our Team
                        </h1>
                        <p className="text-gray-600 mt-4 max-w-2xl text-base md:text-lg">
                            Help us build the future of event discovery and community connection.
                        </p>
                    </div>
                </section>

                <section className="py-12 md:py-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="rounded-3xl border border-gray-200 bg-white shadow-sm p-6 md:p-10">
                            <div className="space-y-8">
                                <article className="space-y-3">
                                    <h2 className="text-2xl font-bold text-gray-900">Why Join Vybein?</h2>
                                    <p className="text-gray-700 leading-7">
                                        At Vybein, we&apos;re building a platform that connects people to meaningful experiences and community. If you&apos;re passionate about events, community, and technology, we&apos;d love to meet you.
                                    </p>
                                </article>

                                <article className="space-y-3">
                                    <h2 className="text-2xl font-bold text-gray-900">Open Positions</h2>
                                    <p className="text-gray-700 leading-7">
                                        Currently, we don&apos;t have open positions listed. Check back soon or reach out to us to express your interest.
                                    </p>
                                </article>

                                <article className="space-y-3">
                                    <h2 className="text-2xl font-bold text-gray-900">What We Look For</h2>
                                    <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-7">
                                        <li>Passion for community and events</li>
                                        <li>Strong problem-solving skills</li>
                                        <li>Collaborative mindset</li>
                                        <li>Commitment to quality and user experience</li>
                                    </ul>
                                </article>

                                <article className="space-y-3">
                                    <h2 className="text-2xl font-bold text-gray-900">How to Apply</h2>
                                    <p className="text-gray-700 leading-7">
                                        Interested in joining the Vybein team? Send your resume and cover letter to <a href="mailto:careers@vybein.com" className="text-brand font-semibold hover:text-brand-dark">careers@vybein.com</a>. We review all submissions and will get back to you shortly.
                                    </p>
                                </article>

                                <article className="space-y-3">
                                    <h2 className="text-2xl font-bold text-gray-900">Our Culture</h2>
                                    <p className="text-gray-700 leading-7">
                                        We believe in fostering a workplace where every team member can grow, contribute their best ideas, and feel valued. We&apos;re committed to building a diverse and inclusive team that reflects the communities we serve.
                                    </p>
                                </article>

                                <article className="space-y-3">
                                    <p className="text-gray-700 leading-7">
                                        Have questions? Contact us at <a href="mailto:support@vybein.com" className="text-brand font-semibold hover:text-brand-dark">support@vybein.com</a>
                                    </p>
                                </article>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </main>
        </>
    );
}
