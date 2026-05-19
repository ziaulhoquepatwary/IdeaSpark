"use client";

import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal, ArrowUpDown, LayoutGrid, Lightbulb } from "lucide-react";
import IdeaCart from "@/components/IdeaCart";

function IdeasPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("default");

    const allIdeas = [
        {
            id: "idea-1",
            title: "MediConnect: AI-Driven Rural Health Diagnostics",
            shortDesc: "Bridging the gap between rural clinics and expert doctors using lightweight AI diagnostic tools.",
            category: "Health",
            tags: ["Telehealth", "AI", "RuralCare"],
            imageUrl: "/banner1.jpg",
            budget: "$15,000",
            reaction: 120,
            targetAudience: "Rural patients",
            problem: "Lack of specialized doctors in remote villages leads to delayed and incorrect treatments.",
            solution: "An offline-first AI tablet app that performs preliminary diagnostics and syncs with city specialists."
        },
        {
            id: "idea-2",
            title: "EduSphere: Decentralized Peer Learning",
            shortDesc: "A blockchain-powered learning ecosystem where students teach and earn secure micro-incentives.",
            category: "Education",
            tags: ["Web3", "EdTech", "P2P"],
            imageUrl: "/banner2.jpg",
            budget: "$8,500",
            reaction: 95,
            targetAudience: "University students",
            problem: "Traditional online courses have a 90% drop-out rate due to a lack of motivation and interaction.",
            solution: "A gamified, peer-to-peer micro-learning network incentivized through community-backed tokens."
        },
        {
            id: "idea-3",
            title: "EcoRoute: Green Logistics Router",
            shortDesc: "An enterprise API reducing fleet carbon footprints through real-time traffic and eco-data analysis.",
            category: "Tech",
            tags: ["SaaS", "GreenTech", "Logistics"],
            imageUrl: "/banner3.jpg",
            budget: "$22,000",
            reaction: 85,
            targetAudience: "E-commerce giants",
            problem: "Inefficient route mapping causes millions of tons of excess CO2 emissions in urban deliveries.",
            solution: "An advanced machine-learning algorithm that predicts emission-heavy zones and reroutes fleets dynamically."
        },
        {
            id: "idea-4",
            title: "ScribeAI: Automated Legal Document Auditor",
            shortDesc: "Instantly audit complex corporate contracts for hidden risks and compliance flaws using LLMs.",
            category: "AI",
            tags: ["LegalTech", "LLM", "B2B"],
            imageUrl: "/banner1.jpg",
            budget: "$12,000",
            reaction: 75,
            targetAudience: "Startup founders",
            problem: "Hiring lawyers for initial document vetting is prohibitively expensive for early-stage companies.",
            solution: "A finely-tuned AI model trained on regional corporate laws that highlights risk parameters in seconds."
        },
        {
            id: "idea-5",
            title: "AquaMonitor: IoT Smart FinTech Farming",
            shortDesc: "IoT water sensors combined with micro-credit scoring for small-scale shrimp farmers.",
            category: "Tech",
            tags: ["IoT", "AgriTech", "FinTech"],
            imageUrl: "/banner2.jpg",
            budget: "$18,500",
            reaction: 65,
            targetAudience: "Aquaculture farmers",
            budget: "$18,500",
            targetAudience: "Aquaculture farmers",
            problem: "Sudden water contamination ruins entire harvests, making farmers high-risk for traditional bank loans.",
            solution: "IoT sensors track water pH/oxygen, alerting farmers and generating a trust score for instant bank credits."
        },
        {
            id: "idea-6",
            title: "MindBuddy: Corporate Burnout Preventer",
            shortDesc: "An anonymous slack integration tracking mental health trends through semantic analysis.",
            category: "Health",
            tags: ["HR-Tech", "AI", "Wellness"],
            imageUrl: "/banner3.jpg",
            budget: "$6,000",
            reaction: 55,
            targetAudience: "HR heads",
            problem: "High employee turnover caused by silent workplace burnout that companies fail to detect early.",
            solution: "An AI slack-bot that safely reviews public channels' sentiment to give HRs real-time aggregated team mood data."
        }
    ];

    const categories = ["All", "Health", "Education", "Tech", "AI"];

    const filteredAndSortedIdeas = useMemo(() => {
        return allIdeas
            .filter((idea) => {
                const matchesSearch = idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    idea.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesCategory = selectedCategory === "All" || idea.category === selectedCategory;
                return matchesSearch && matchesCategory;
            })
            .sort((a, b) => {
                if (sortBy === "budget-high") return b.budgetValue - a.budgetValue;
                if (sortBy === "budget-low") return a.budgetValue - b.budgetValue;
                if (sortBy === "popular") return b.views - a.views;
                return 0; // default sorting (original state)
            });
    }, [searchQuery, selectedCategory, sortBy]);


    return (
        <section className="min-h-screen bg-white dark:bg-[#0A0A0A] py-12 px-4 sm:px-6 lg:px-8 text-gray-900 dark:text-white transition-colors duration-300">

            <div className="absolute inset-0 opacity-40 dark:opacity-20 pointer-events-none">
                <div className="absolute top-12 left-12 w-80 h-80 bg-emerald-400 dark:bg-emerald-300 rounded-full filter blur-[100px]" />
                <div className="absolute bottom-12 right-12 w-72 h-72 bg-orange-400 dark:bg-orange-300 rounded-full filter blur-[100px]" />
            </div>
            <div className="max-w-7xl mx-auto space-y-10">

                {/* 1. Header Hero Section */}
                <div className="text-center md:text-left space-y-3 max-w-3xl">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider border border-emerald-200/20">
                        <Lightbulb className="w-3.5 h-3.5" /> Discovery Hub
                    </div>
                    <h1 className="text-4xl font-extrabold font-heading tracking-tight text-gray-950 dark:text-white sm:text-5xl">
                        All Innovation <span className="text-emerald-600 dark:text-emerald-500">Pipelines</span>
                    </h1>
                    <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed">
                        Browse, filter, and sort through the highest potential tech-frameworks and startup concepts submitted by elite global developers.
                    </p>
                </div>

                {/* 2. Interactive Control Center (Search, Filter & Sort) */}
                <div className="bg-gray-50/50 dark:bg-[#111111]/30 border border-gray-100 dark:border-gray-900/80 p-5 rounded-3xl backdrop-blur-md space-y-4 shadow-sm">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">

                        {/* A. Dynamic Search Bar */}
                        <div className="relative w-full lg:max-w-md">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                                <Search size={18} />
                            </span>
                            <input
                                type="text"
                                placeholder="Search by idea title or keywords..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-gray-800 rounded-2xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-400"
                            />
                        </div>

                        {/* B. Filter and Sort Actions Group */}
                        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-start lg:justify-end">

                            {/* Category Filter Dropdown */}
                            <div className="flex items-center gap-2 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-gray-800 px-3.5 py-2.5 rounded-2xl text-sm shadow-sm">
                                <SlidersHorizontal size={14} className="text-gray-400" />
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="bg-transparent text-gray-700 dark:text-gray-300 focus:outline-none cursor-pointer pr-2 font-medium text-xs uppercase tracking-wider"
                                >
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat} className="bg-white dark:bg-[#111111] text-gray-900 dark:text-white normal-case tracking-normal">
                                            {cat === "All" ? "All Categories" : cat}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Sorting Dropdown */}
                            <div className="flex items-center gap-2 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-gray-800 px-3.5 py-2.5 rounded-2xl text-sm shadow-sm">
                                <ArrowUpDown size={14} className="text-gray-400" />
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="bg-transparent text-gray-700 dark:text-gray-300 focus:outline-none cursor-pointer pr-2 font-medium text-xs uppercase tracking-wider"
                                >
                                    <option value="default" className="bg-white dark:bg-[#111111] text-gray-900 dark:text-white">Sort By: Default</option>
                                    <option value="budget-high" className="bg-white dark:bg-[#111111] text-gray-900 dark:text-white">Budget: High to Low</option>
                                    <option value="budget-low" className="bg-white dark:bg-[#111111] text-gray-900 dark:text-white">Budget: Low to High</option>
                                    <option value="popular" className="bg-white dark:bg-[#111111] text-gray-900 dark:text-white">Popularity (Views)</option>
                                </select>
                            </div>

                            {/* View Meta Indicator */}
                            <div className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-gray-100 dark:bg-zinc-900 text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">
                                <LayoutGrid size={14} /> {filteredAndSortedIdeas.length} Found
                            </div>
                        </div>

                    </div>
                </div>

                {/* 3. Dynamic Idea Cards Grid Section */}
                {filteredAndSortedIdeas.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {filteredAndSortedIdeas.map((idea) => (
                            <IdeaCart key={idea.id} idea={idea} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50/30 dark:bg-[#111111]/10 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800 max-w-xl mx-auto space-y-4">
                        <div className="inline-flex p-4 rounded-2xl bg-orange-500/10 text-orange-500">
                            <Search size={32} />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-lg font-bold text-gray-950 dark:text-white tracking-tight">No Startup Ideas Found</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                                We couldn&apos;t find any results matching &quot;{searchQuery}&quot;. Try checking for typos or changing filters.
                            </p>
                        </div>
                        <button
                            onClick={() => { setSearchQuery(""); setSelectedCategory("All"); setSortBy("default"); }}
                            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline uppercase tracking-wider cursor-pointer"
                        >
                            Reset All Filters
                        </button>
                    </div>
                )}

            </div>
        </section>
    )
}

export default IdeasPage