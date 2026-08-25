"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GOOGLE_PLAY_URL } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsHydrated(true);
    }, []);

    return (
        <nav className="fixed w-full z-50 glass-nav transition-all duration-300" id="navbar">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Link href="/" className="flex-shrink-0 flex items-center gap-3">
                        <Image className="h-10 w-10 rounded-xl" src="/logo.png" alt="Vybein Logo" width={40} height={40} priority />
                        <span className="font-heading font-bold text-2xl text-brand-dark tracking-tight">Vybein</span>
                    </Link>

                    <div className="hidden md:flex space-x-8 items-center">
                        <Link href="/#solution" className="text-gray-900 hover:text-brand font-medium transition">
                            Your vibe
                        </Link>
                        <Link href="/#trust" className="text-gray-900 hover:text-brand font-medium transition">
                            Safety
                        </Link>
                        <Link href="/blogs" className="text-gray-900 hover:text-brand font-medium transition">
                            Blog
                        </Link>
                        <Link href="/faq" className="text-gray-900 hover:text-brand font-medium transition">
                            FAQ
                        </Link>
                        <a
                            href={GOOGLE_PLAY_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() =>
                                trackEvent("download_click", {
                                    cta_name: "header_download_cta",
                                    surface: "global_header",
                                })
                            }
                            className="bg-brand hover:bg-brand-dark text-white px-6 py-2.5 rounded-full font-medium transition shadow-lg shadow-brand/20"
                        >
                            Download App
                        </a>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            type="button"
                            className="text-gray-900"
                            aria-controls="mobileMenu"
                            aria-expanded={isHydrated ? mobileMenuOpen : false}
                            onClick={() => setMobileMenuOpen((value) => !value)}
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                {isHydrated && mobileMenuOpen ? (
                    <div
                        id="mobileMenu"
                        className="md:hidden border-t border-gray-200/80 bg-white/95 backdrop-blur px-4 py-4 shadow-lg shadow-black/5"
                    >
                        <div className="flex flex-col gap-3">
                            <Link href="/#solution" className="text-gray-900 hover:text-brand font-medium transition py-2" onClick={() => setMobileMenuOpen(false)}>
                                Your vibe
                            </Link>
                            <Link href="/#trust" className="text-gray-900 hover:text-brand font-medium transition py-2" onClick={() => setMobileMenuOpen(false)}>
                                Safety
                            </Link>
                            <Link href="/blogs" className="text-gray-900 hover:text-brand font-medium transition py-2" onClick={() => setMobileMenuOpen(false)}>
                                Blog
                            </Link>
                            <Link href="/faq" className="text-gray-900 hover:text-brand font-medium transition py-2" onClick={() => setMobileMenuOpen(false)}>
                                FAQ
                            </Link>
                            <a
                                href={GOOGLE_PLAY_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => {
                                    trackEvent("download_click", {
                                        cta_name: "mobile_header_download_cta",
                                        surface: "global_header_mobile",
                                    });
                                    setMobileMenuOpen(false);
                                }}
                                className="bg-brand hover:bg-brand-dark text-white px-6 py-3 rounded-xl font-medium transition text-center shadow-lg shadow-brand/20"
                            >
                                Download App
                            </a>
                        </div>
                    </div>
                ) : null}
            </div>
        </nav>
    );
}
