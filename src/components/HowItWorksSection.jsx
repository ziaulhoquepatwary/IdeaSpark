import React from "react";
import { Lightbulb, MessagesSquare, ThumbsUp, Rocket, ArrowRight } from "lucide-react";

export default function HowItWorksSection() {
    const steps = [
        {
            id: "01",
            title: "Share Concepts",
            desc: "Submit your raw, innovative startup concepts or structured business blueprints into the ecosystem.",
            icon: Lightbulb,
            color: "from-orange-500 to-amber-500",
        },
        {
            id: "02",
            title: "Community Feedback",
            desc: "Engage with other brilliant minds through detailed comments, constructive critiques, and active discussions.",
            icon: MessagesSquare,
            color: "from-amber-500 to-orange-600",
        },
        {
            id: "03",
            title: "Validate & Refine",
            desc: "Track popularity parameters, discover trending rankings, and collectively refine your concept through community interaction.",
            icon: ThumbsUp,
            color: "from-orange-600 to-red-500",
        },
        {
            id: "04",
            title: "Accelerate Growth",
            desc: "Gain massive exposure, transform your validated ideas into potential MVPs, and catch the eye of future co-founders.",
            icon: Rocket,
            color: "from-red-500 to-orange-500",
        },
    ];

    return (
        <section className="py-20 bg-white dark:bg-[#0A0A0A] text-gray-900 dark:text-white transition-colors duration-300 relative overflow-hidden">

            {/* Background Decorative Mesh Layer */}
            <div className="absolute inset-0 opacity-10 dark:opacity-5 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500 rounded-full filter blur-[160px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
                    <span className="text-xs font-black uppercase tracking-widest text-orange-500 bg-orange-500/10 px-3 py-1.5 rounded-full inline-block">
                        Validation Pipeline
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-black tracking-tight">
                        How Inside <span className="text-orange-500">IdeaSpark</span> Works
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                        A dynamic pipeline designed to transition your visionary thoughts into community-validated tech blueprints.
                    </p>
                </div>

                {/* Steps Grid Block */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">

                    {/* Connecting Line Effect for Large Screens */}
                    <div className="hidden lg:block absolute top-1/4 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-transparent z-0" />

                    {steps.map((step, idx) => {
                        const IconComponent = step.icon;
                        return (
                            <div
                                key={step.id}
                                className="group bg-gray-50/60 dark:bg-[#111111]/40 border border-gray-100 dark:border-gray-900/60 p-6 rounded-3xl backdrop-blur-xl relative z-10 hover:border-orange-500/40 dark:hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-xl hover:shadow-orange-500/[0.02]"
                            >
                                {/* Upper Row: Badge Number & Flow Arrow */}
                                <div className="flex items-center justify-between mb-6">
                                    <span className={`text-3xl font-black bg-gradient-to-r ${step.color} bg-clip-text text-transparent opacity-80`}>
                                        {step.id}
                                    </span>
                                    {idx !== steps.length - 1 && (
                                        <ArrowRight className="hidden lg:block text-gray-300 dark:text-gray-800 group-hover:text-orange-500 group-hover:translate-x-1 transition-all duration-300" size={18} />
                                    )}
                                </div>

                                {/* Icon Wrapper Component */}
                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} p-[1px] mb-4 shadow-md shadow-orange-500/10 group-hover:scale-110 transition-transform duration-300`}>
                                    <div className="w-full h-full bg-white dark:bg-[#0A0A0A] rounded-[15px] flex items-center justify-center text-gray-700 dark:text-gray-300 group-hover:text-orange-500 transition-colors">
                                        <IconComponent size={20} strokeWidth={2.2} />
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="space-y-2">
                                    <h4 className="text-base font-bold tracking-tight group-hover:text-orange-500 transition-colors duration-200">
                                        {step.title}
                                    </h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                                        {step.desc}
                                    </p>
                                </div>

                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}