import Link from "next/link";
import { ArrowLeft, MapPinOff } from "lucide-react";

export default function NotFound() {
    return (
        <section className="min-h-screen bg-white dark:bg-[#0A0A0A] flex items-center justify-center px-6 transition-colors duration-300 relative overflow-hidden">

            {/* Background decorative glows */}
            <div className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/20 rounded-full filter blur-[120px]" />
            </div>

            <div className="max-w-md w-full text-center space-y-8 relative z-10">
                {/* Icon & Error Code */}
                <div className="space-y-4">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-orange-50 dark:bg-orange-950/20 border border-orange-200/30 dark:border-orange-900/30 text-orange-500 animate-bounce">
                        <MapPinOff size={48} />
                    </div>
                    <h1 className="text-8xl font-black font-heading tracking-tighter text-gray-900 dark:text-white opacity-10 absolute -top-10 left-1/2 -translate-x-1/2 select-none">
                        404
                    </h1>
                </div>

                {/* Content */}
                <div className="space-y-3">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                        Oops! This Idea <span className="text-emerald-600 dark:text-emerald-500">Hasn't Sparked Yet</span>
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed">
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>
                </div>

                {/* Back to Home Button */}
                <div className="pt-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-semibold px-8 py-3.5 rounded-2xl transition-all duration-300 shadow-lg shadow-emerald-600/20 group"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                </div>

                {/* Subtle Footer Link */}
                <p className="text-xs text-gray-400 dark:text-gray-600 pt-8 uppercase tracking-widest font-bold">
                    IdeaSpark — Innovation Ecosystem
                </p>
            </div>
        </section>
    );
}