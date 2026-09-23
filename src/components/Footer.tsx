import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <Image className="h-10 w-10 rounded-xl" src="/logo.png" alt="Vybein Logo" width={40} height={40} />
                            <span className="font-heading font-bold text-2xl text-brand-dark">Vybein</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-6 max-w-sm">
                            Find nearby activity partners for gym, tea, study, and everyday plans. Private in-app chat, free browsing, and safety tools designed with women first.
                        </p>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li>Free &amp; open browsing — no photo paywall</li>
                            <li>Chat in-app — no phone or email sharing</li>
                            <li>ID verified profiles · share meetup details safely</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Company</h4>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li>
                                <Link href="/about" className="hover:text-brand transition">About Us</Link>
                            </li>
                            <li>
                                <Link href="/careers" className="hover:text-brand transition">Careers</Link>
                            </li>
                            <li>
                                <Link href="/faq" className="hover:text-brand transition">FAQ</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li><Link href="/privacy" className="hover:text-brand transition">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-brand transition">Terms of Service</Link></li>
                            <li><Link href="/cookies" className="hover:text-brand transition">Cookie Policy</Link></li>
                            <li><Link href="/account-deletion" className="hover:text-brand transition">Account Deletion</Link></li>
                            <li><Link href="/disclaimer" className="hover:text-brand transition">Disclaimer</Link></li>
                            <li><Link href="/child-safety" className="hover:text-brand transition">Child Safety</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Contact</h4>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li><a href="mailto:support@vybein.com" className="hover:text-brand transition">support@vybein.com</a></li>
                            <li className="leading-relaxed">62, Dayal Fort, Aliganj, Lucknow, Uttar Pradesh, 226022</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-gray-500">© 2026 Vybein Inc. All rights reserved.</p>
                    <p className="text-sm text-gray-500 mt-2 md:mt-0">Made for community connections</p>
                </div>
            </div>
        </footer>
    );
}
