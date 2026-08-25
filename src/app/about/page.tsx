import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
    title: "About Us | Vybein",
    description: "Learn about Vybein's mission to create safe, interest-based communities where people connect, learn, and grow through controlled digital interaction.",
    alternates: {
        canonical: `${SITE_URL}/about`,
    },
};

export default function AboutPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-white">
                {/* Hero Section */}
                <section className="bg-gradient-to-b from-[#E6F2F1] to-white pt-32 pb-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="font-heading text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                            About Vybein
                        </h1>
                        <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
                            An Indian digital social interaction intermediary platform designed to enable safe, respectful, and controlled communication.
                        </p>
                    </div>
                </section>

                {/* Main Content */}
                <section className="pb-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-14 border border-gray-100 prose prose-slate max-w-none">
                            
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">About Vybein</h2>
                            <p className="mb-8 text-gray-700 leading-relaxed">
                                Vybein is strictly a technical intermediary platform and does not provide any dating, matrimonial, healthcare, medical, counseling, therapy, or mental health services, nor does it organize or conduct offline meet-ups, webinars, seminars, or events.
                            </p>

                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Purpose of the Platform</h2>
                            <p className="text-gray-700 mb-6">
                                Vybein provides users with a safe digital medium where they can communicate, discuss, and socially interact using features available within the application, without sharing their personal contact information (e.g., mobile number).
                            </p>
                            <p className="font-bold text-gray-900 mb-4">Vybein offers opportunities for individuals who:</p>
                            <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-700">
                                <li>Feel hesitant, lack confidence, or face limited opportunities to express their interests, talents, or knowledge;</li>
                                <li>Wish to connect with like-minded people;</li>
                                <li>Want to organize their own activities, programs, or events;</li>
                                <li>Want to participate in motivational seminars or webinars.</li>
                            </ul>
                            <p className="text-gray-700 mb-8">This helps users enhance their skills and talents, contributing both to personal development and national progress.</p>

                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Role of Vybein</h2>
                            <p className="text-gray-700 mb-4">Vybein is strictly a digital intermediary (Intermediary) providing:</p>
                            <ul className="list-none p-0 grid grid-cols-1 md:grid-cols-2 gap-2 mb-6 text-gray-700 font-medium">
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand rounded-full"></span> In-app chat rooms</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand rounded-full"></span> Voice-based interactions</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand rounded-full"></span> Profile-based social interaction</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand rounded-full"></span> Safe and controlled communication tools</li>
                            </ul>
                            <p className="text-gray-700 mb-8">Vybein does not generate any content. Vybein does not store private conversations, voice messages, or chat recordings. Vybein does not guarantee any personal, business, or legal relationship between users.</p>

                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Scope of Services</h2>
                            <p className="text-gray-700 mb-8">
                                Vybein provides digital services only in India. Vybein does not organize or conduct any offline meet-ups, events, or activities. Use of the application is entirely at the user’s own discretion and risk.
                            </p>

                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy and Security</h2>
                            <p className="text-gray-700 mb-8">
                                Personal information is collected only for lawful and necessary purposes. Vybein does not record or store chats, voice messages, or private conversations. User information is not shared with third parties without consent. Security measures comply with Indian laws (IT Act 2000, IT Rules 2011).
                            </p>

                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Age Limit and Eligibility</h2>
                            <p className="text-gray-700 mb-8">
                                Vybein is available only to users who are 18 years or older. Vybein does not knowingly collect personal information from children under 13 years of age.
                            </p>

                            <div className="bg-red-50 p-6 rounded-2xl border border-red-100 mb-8">
                                <h2 className="text-xl font-bold text-red-900 mb-2">Disclaimer</h2>
                                <p className="text-red-800 text-sm mb-4">
                                    Vybein is not responsible for any mental, emotional, or personal outcomes. Vybein does not provide mental health, therapy, or medical advice/services. Vybein is not responsible for any third-party links, apps, or services.
                                </p>
                                <p className="text-red-900 font-bold text-sm">
                                    Users experiencing self-harm, mental instability, or severe emotional distress should stop using Vybein and seek professional help immediately.
                                </p>
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Legal Compliance</h2>
                            <p className="text-gray-700 mb-4">Vybein operates in compliance with:</p>
                            <ul className="list-disc pl-6 mb-8 space-y-1 text-sm text-gray-600">
                                <li>Information Technology Act, 2000</li>
                                <li>IT (Intermediary Guidelines) Rules, 2011</li>
                                <li>IT (Reasonable Security Practices & Sensitive Personal Data or Information) Rules, 2011</li>
                            </ul>

                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>
                            <p className="text-gray-700 mb-0">
                                Vybein is a secure, limited, and responsible digital platform that provides users with technical tools for social communication and digital participation — not a guarantee, advice, or service of any kind. Users are advised to carefully read Vybein’s Privacy Policy, Terms of Usage, and all applicable rules before using the platform.
                            </p>

                        </div>
                    </div>
                </section>
                <Footer />
            </main>
        </>
    );
}