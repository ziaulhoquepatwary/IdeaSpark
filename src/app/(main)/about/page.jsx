import React from "react";
import { Lightbulb, Users, Target, ArrowRight } from "lucide-react";

export default function AboutPage() {
    return (
        <section className="min-h-screen bg-white dark:bg-[#0A0A0A] py-16 px-4 text-gray-900 dark:text-white transition-colors duration-300">
            <div className="max-w-4xl mx-auto space-y-16">

                {/* Header Block */}
                <div className="text-center space-y-10">
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full">
                        About Our Platform
                    </span>
                    <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
                        Inside <span className="text-emerald-500">IdeaSpark</span>
                    </h1>
                    <p className="text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                        A web-based platform where users can share innovative startup ideas, explore concepts, and engage through community validation.
                    </p>
                </div>

                {/* Core Vision Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Card 01 */}
                    <div className="p-6 bg-gray-50 dark:bg-[#111111] border border-gray-100 dark:border-gray-900 rounded-2xl space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                            <Target size={20} />
                        </div>
                        <h3 className="text-lg font-bold">Our Core Mission</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                            Instead of booking or scheduling, we focus entirely on idea validation. We encourage creativity, collaboration, and collective refinement through community interaction.
                        </p>
                    </div>

                    {/* Card 02 */}
                    <div className="p-6 bg-gray-50 dark:bg-[#111111] border border-gray-100 dark:border-gray-900 rounded-2xl space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                            <Users size={20} />
                        </div>
                        <h3 className="text-lg font-bold">Community Engagement</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                            Discover trending ideas, provide constructive feedback, and connect with other brilliant minds to polish raw concepts into production-ready blueprints.
                        </p>
                    </div>

                </div>

                {/* Simple CTA Callout */}
                <div className="p-8 bg-gradient-to-r from-emerald-500/[0.03] to-orange-500/[0.03] border border-emerald-500/10 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                    <div className="space-y-1">
                        <h4 className="text-base font-bold">Have a groundbreaking concept?</h4>
                        <p className="text-xs text-gray-400">Don't let your innovation die in isolation. Spark it today.</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-emerald-500/10">
                        Share Your Idea <ArrowRight size={14} />
                    </button>
                </div>

            </div>
        </section>
    );
}