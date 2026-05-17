import Link from 'next/link';
import { Mail, Phone, MapPin, Lightbulb, Layers } from 'lucide-react';
import { IoLogoFacebook } from 'react-icons/io';
import { FaSquareInstagram, FaXTwitter, FaLinkedinIn } from 'react-icons/fa6';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-50 dark:bg-[#0A0A0A] text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* ১. Brand & Identity Section */}
                    <div className="space-y-4">
                        <Link href="/" className="inline-block">
                            <h2 className="text-2xl font-bold font-heading tracking-tight">
                                <span className="text-emerald-600 dark:text-emerald-500">Idea</span>
                                <span className="text-orange-500">Spark</span>
                            </h2>
                        </Link>
                        <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                            A community-driven startup idea sharing and validation platform. Connect, collaborate, and spark your next big venture.
                        </p>
                        {/* Social Links */}
                        <div className="flex items-center gap-3 pt-2">
                            <a href="#" aria-label="Facebook" className="p-2 rounded-lg bg-gray-200/60 dark:bg-gray-900 text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all duration-300">
                                <IoLogoFacebook size={18} />
                            </a>
                            <a href="#" aria-label="Instagram" className="p-2 rounded-lg bg-gray-200/60 dark:bg-gray-900 text-[#E4405F] hover:bg-[#E4405F] hover:text-white transition-all duration-300">
                                <FaSquareInstagram size={18} />
                            </a>
                            <a href="#" aria-label="X (Twitter)" className="p-2 rounded-lg bg-gray-200/60 dark:bg-gray-900 text-black dark:text-white hover:bg-gray-600 dark:hover:bg-white dark:hover:text-black transition-all duration-300">
                                <FaXTwitter size={18} />
                            </a>
                            <a href="#" aria-label="LinkedIn" className="p-2 rounded-lg bg-gray-200/60 dark:bg-gray-900 text-[#0077B5] hover:bg-[#0077B5] hover:text-white transition-all duration-300">
                                <FaLinkedinIn size={18} />
                            </a>
                        </div>
                    </div>

                    {/* ২. Platform Links Section */}
                    <div>
                        <h3 className="text-gray-900 dark:text-gray-200 font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Lightbulb size={16} className="text-emerald-600 dark:text-emerald-500" /> Platform
                        </h3>
                        <ul className="space-y-2.5 text-sm">
                            <li><Link href="/#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Browse Ideas</Link></li>
                            <li><Link href="/#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Submit an Idea</Link></li>
                            <li><Link href="/#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">My Dashboard</Link></li>
                            <li><Link href="/#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Recent Interactions</Link></li>
                        </ul>
                    </div>

                    {/* ৩. Categories Section */}
                    <div>
                        <h3 className="text-gray-900 dark:text-gray-200 font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Layers size={16} className="text-emerald-600 dark:text-emerald-500" /> Categories
                        </h3>
                        <ul className="space-y-2.5 text-sm">
                            <li><Link href="/#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">SaaS & Software</Link></li>
                            <li><Link href="/#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Fintech</Link></li>
                            <li><Link href="/#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">AI & Machine Learning</Link></li>
                            <li><Link href="/#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">E-Commerce</Link></li>
                        </ul>
                    </div>

                    {/* ৪. Contact Info Section  */}
                    <div>
                        <h3 className="text-gray-900 dark:text-gray-200 font-bold text-sm uppercase tracking-wider mb-4">
                            Contact Us
                        </h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-start gap-3">
                                <MapPin size={18} className="text-emerald-600 dark:text-emerald-500 shrink-0 mt-0.5" />
                                <span>Innovation Hub, Level 4, Tech District, Dhaka-1212</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={18} className="text-emerald-600 dark:text-emerald-500 shrink-0" />
                                <span>+880 1712 345 678</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail size={18} className="text-emerald-600 dark:text-emerald-500 shrink-0" />
                                <span>support@ideaspark.com</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar & Copyright */}
                <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-900 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-500 dark:text-gray-500 text-center sm:text-left">
                        © {currentYear} <span className="font-semibold text-gray-700 dark:text-gray-400">IdeaSpark</span>. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs text-gray-400 dark:text-gray-500">
                        <Link href="/#" className="hover:text-emerald-600 transition-colors">Privacy Policy</Link>
                        <Link href="/#" className="hover:text-emerald-600 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;