"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Lightbulb, Eye, Edit3, Trash2, Plus, Search, SlidersHorizontal,
    Layers, ThumbsUp, Calendar, ArrowRight, ShieldAlert
} from "lucide-react";

export default function MyIdeas() {
    const [myIdeas, setMyIdeas] = useState([
        {
            id: "idea-1",
            title: "MediConnect: AI-Driven Rural Health Diagnostics",
            category: "Health",
            budget: "$15,000",
            reaction: 120,
            stage: "Concept / Idea",
            createdAt: "May 12, 2026"
        },
        {
            id: "idea-3",
            title: "EcoRoute: Green Logistics Router",
            category: "Tech",
            budget: "$22,000",
            reaction: 345,
            stage: "Validation",
            createdAt: "April 28, 2026"
        },
        {
            id: "idea-6",
            title: "MindBuddy: Corporate Burnout Preventer",
            category: "Health",
            budget: "$6,000",
            reaction: 89,
            stage: "Prototype",
            createdAt: "March 15, 2026"
        }
    ]);

    const [searchQuery, setSearchQuery] = useState("");

    const handleDeleteIdea = (id, title) => {
        const confirmDelete = window.confirm(`Are you sure you want to terminate the pipeline: "${title}"?`);
        if (confirmDelete) {
            setMyIdeas(myIdeas.filter(idea => idea.id !== id));
            console.log(`🗑️ Deleted Idea ID: ${id}`);
        }
    };

    const filteredIdeas = myIdeas.filter(idea =>
        idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        idea.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalIdeas = filteredIdeas.length;
    const totalReactions = filteredIdeas.reduce((sum, idea) => sum + idea.reaction, 0);

    return (
        <section className="min-h-screen bg-white dark:bg-[#0A0A0A] py-12 px-4 sm:px-6 lg:px-8 text-gray-900 dark:text-white transition-colors duration-300 relative overflow-hidden">

            {/* Background Light Glow */}
            <div className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none overflow-hidden">
                <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-emerald-500 rounded-full filter blur-[150px]" />
                <div className="absolute bottom-20 left-1/4 w-[350px] h-[350px] bg-orange-400 rounded-full filter blur-[130px]" />
            </div>

            <div className="max-w-6xl mx-auto space-y-6 relative z-10">

                {/* 1. Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-black font-heading tracking-tight text-gray-950 dark:text-white">
                            My Innovation <span className="text-emerald-600 dark:text-emerald-500">Pipelines</span>
                        </h1>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
                            Manage, monitor telemetry, and update your proprietary blueprints and architectural startup systems.
                        </p>
                    </div>

                    {/* Quick Create Redirect Button */}
                    <Link
                        href="/ideas/add"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/10 transition-all shrink-0 cursor-pointer"
                    >
                        <Plus size={14} /> Launch New Idea
                    </Link>
                </div>

                {/* 2. Advanced Controls (Search Bar & Refine Button) */}
                <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-gray-50/50 dark:bg-[#111111]/30 border border-gray-100 dark:border-gray-900/60 p-4 rounded-2xl backdrop-blur-xl">
                    {/* Integrated Search Controller */}
                    <div className="relative w-full sm:max-w-sm">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400 dark:text-gray-500">
                            <Search size={16} />
                        </span>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-gray-800 rounded-xl text-xs font-medium focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600"
                            placeholder="Filter pipelines by title or track..."
                        />
                    </div>

                    {/* Meta Controls */}
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        <button className="flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-gray-800 rounded-xl text-xs font-bold text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-700 transition-all shadow-sm">
                            <SlidersHorizontal size={14} /> Refine Matrix
                        </button>
                    </div>
                </div>

                {/* 3. Mini Analytics Widgets */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-5 bg-gray-50/50 dark:bg-[#111111]/40 border border-gray-100 dark:border-gray-900/60 rounded-2xl backdrop-blur-md">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-1">Active Modules</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-black tracking-tight text-gray-950 dark:text-white">{totalIdeas}</span>
                            <span className="text-xs font-semibold text-emerald-500">Nodes matched</span>
                        </div>
                    </div>
                    <div className="p-5 bg-gray-50/50 dark:bg-[#111111]/40 border border-gray-100 dark:border-gray-900/60 rounded-2xl backdrop-blur-md">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-1">Accumulated Traction</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-black tracking-tight text-gray-950 dark:text-white">{totalReactions}</span>
                            <span className="text-xs font-semibold text-orange-500">Endorsements</span>
                        </div>
                    </div>
                    <div className="p-5 bg-gray-50/50 dark:bg-[#111111]/40 border border-gray-100 dark:border-gray-900/60 rounded-2xl backdrop-blur-md">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-1">Pipeline Clearance</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-black tracking-tight text-emerald-600 dark:text-emerald-400">100%</span>
                            <span className="text-xs font-semibold text-gray-400">Active Node</span>
                        </div>
                    </div>
                </div>

                {/* 4. Main Data Architecture Area */}
                {filteredIdeas.length > 0 ? (
                    <div className="bg-white dark:bg-[#111111]/20 border border-gray-100 dark:border-gray-900/60 rounded-3xl shadow-xl overflow-hidden backdrop-blur-xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-100 dark:border-gray-900 bg-gray-50/70 dark:bg-[#111111]/60 text-[10px] uppercase font-black tracking-widest text-gray-400 dark:text-gray-500">
                                        <th className="py-4 px-6">Framework Title</th>
                                        <th className="py-4 px-4">Classification</th>
                                        <th className="py-4 px-4">Est. Budget</th>
                                        <th className="py-4 px-4">Metrics</th>
                                        <th className="py-4 px-6 text-right">Actions Dashboard</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-900 text-sm font-medium">
                                    {filteredIdeas.map((idea) => (
                                        <tr key={idea.id} className="hover:bg-gray-50/40 dark:hover:bg-[#111111]/30 transition-colors group">

                                            {/* Column A: Title & Deployment Date */}
                                            <td className="py-5 px-6 min-w-[280px]">
                                                <div className="space-y-1">
                                                    <span className="text-sm font-bold text-gray-950 dark:text-gray-100 group-hover:text-emerald-500 transition-colors block leading-snug">
                                                        {idea.title}
                                                    </span>
                                                    <span className="text-[11px] text-gray-400 dark:text-gray-500 flex items-center gap-1">
                                                        <Calendar size={11} /> Released: {idea.createdAt}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Column B: Category Badge */}
                                            <td className="py-5 px-4 whitespace-nowrap">
                                                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-zinc-900 text-gray-600 dark:text-gray-400 border border-gray-200/10">
                                                    <Layers size={11} className="text-emerald-500" /> {idea.category}
                                                </span>
                                            </td>

                                            {/* Column C: Budget */}
                                            <td className="py-5 px-4 whitespace-nowrap text-xs font-bold text-gray-900 dark:text-gray-300">
                                                {idea.budget}
                                            </td>

                                            {/* Column D: Reactions Indicator */}
                                            <td className="py-5 px-4 whitespace-nowrap">
                                                <span className="text-xs font-bold text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                                    <ThumbsUp size={12} className="text-orange-500" /> {idea.reaction}
                                                </span>
                                            </td>

                                            {/* Column E: Management Control Options */}
                                            <td className="py-5 px-6 text-right whitespace-nowrap">
                                                <div className="flex items-center justify-end gap-1.5">

                                                    {/* View Detail Link */}
                                                    <Link
                                                        href={`/ideas/${idea.id}`}
                                                        className="p-2 text-gray-400 hover:text-emerald-500 hover:bg-emerald-500/10 rounded-xl transition-all"
                                                        title="Inspect Blueprint"
                                                    >
                                                        <Eye size={15} />
                                                    </Link>

                                                    {/* Edit Route Link */}
                                                    <Link
                                                        href={`/ideas/edit/${idea.id}`}
                                                        className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-500/10 rounded-xl transition-all"
                                                        title="Modify Source"
                                                    >
                                                        <Edit3 size={15} />
                                                    </Link>

                                                    {/* Delete Functional Trigger */}
                                                    <button
                                                        type="button"
                                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all cursor-pointer"
                                                        title="Terminate Pipeline"
                                                    >
                                                        <Trash2 size={15} />
                                                    </button>
                                                </div>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50/30 dark:bg-[#111111]/10 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800 max-w-xl mx-auto space-y-4">
                        <div className="inline-flex p-4 rounded-2xl bg-orange-500/10 text-orange-500">
                            <Lightbulb size={32} />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-lg font-bold text-gray-950 dark:text-white tracking-tight">No Matching Pipelines Found</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                                No system modules or tracks match the keyword &quot;{searchQuery}&quot;. Try modifying your query parameters.
                            </p>
                        </div>
                        <button
                            onClick={() => setSearchQuery("")}
                            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline uppercase tracking-wider"
                        >
                            Clear Search Query
                        </button>
                    </div>
                )}

            </div>
        </section>
    );
}