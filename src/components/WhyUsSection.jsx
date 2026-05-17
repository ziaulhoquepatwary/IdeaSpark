import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const WhyUsSection = () => {
    const benefits = [
        "Validate ideas with real community feedback.",
        "Connect with potential co-founders & tech partners.",
        "Protect your concepts while gaining early traction."
    ];

    return (
        <section className="w-full bg-white dark:bg-[#0A0A0A] py-16 md:py-24 text-gray-900 dark:text-white transition-colors duration-300 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Main Grid: Pure Server-Side Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                    {/* LEFT SIDE: Content (Server Rendered) */}
                    <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-semibold tracking-wide uppercase border border-emerald-200/40 dark:border-emerald-900/30">
                            Why IdeaSpark?
                        </div>

                        <h2 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight text-gray-950 dark:text-white leading-[1.2]">
                            Turn Your Raw Sparks Into <br className="hidden sm:block" />
                            <span className="text-emerald-600 dark:text-emerald-500">Market-Ready Startups</span>
                        </h2>

                        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            IdeaSpark bridges the gap between brilliant concepts and successful execution. Whether you are an aspiring founder looking for validation or a builder searching for the next big thing, we provide the ultimate ecosystem to grow.
                        </p>

                        <ul className="space-y-3 max-w-md mx-auto lg:mx-0 text-left">
                            {benefits.map((benefit, index) => (
                                <li key={index} className="flex items-center gap-3 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-500 shrink-0" />
                                    <span>{benefit}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="pt-4">
                            <Link
                                href="/about"
                                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-medium px-6 py-3 rounded-xl transition-all duration-200 shadow-md shadow-emerald-600/10 group text-sm sm:text-base"
                            >
                                Learn More About Us
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* RIGHT SIDE: CSS-Driven Animated Images (No Framer Motion) */}
                    <div className="lg:col-span-6 grid grid-cols-2 gap-4 sm:gap-6 items-center h-[450px] sm:h-[500px]">

                        {/* 1st Image Card with pure Tailwind Hover Animation */}
                        <div className="relative w-full h-[90%] rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-900 shadow-xl bg-gray-50 dark:bg-zinc-900 group transition-all duration-500 hover:-translate-y-2">
                            <Image
                                src="/banner1.jpg"
                                alt="Innovation and Collaboration"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-w-1024px) 50vw, 25vw"
                            />
                            {/* Gradient overlay: Bottom colorized, top clean */}
                            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-emerald-950/20 to-transparent opacity-80 dark:opacity-90 pointer-events-none transition-opacity duration-500 group-hover:opacity-95" />
                        </div>

                        {/* 2nd Image Card (Asymmetric Layout with top margin) */}
                        <div className="relative w-full h-[90%] mt-8 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-900 shadow-xl bg-gray-50 dark:bg-zinc-900 group transition-all duration-500 hover:-translate-y-2">
                            <Image
                                src="/banner3.jpg"
                                alt="Startup Validation"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-w-1024px) 50vw, 25vw"
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-orange-950/80 via-orange-950/20 to-transparent opacity-80 dark:opacity-90 pointer-events-none transition-opacity duration-500 group-hover:opacity-95" />
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default WhyUsSection;