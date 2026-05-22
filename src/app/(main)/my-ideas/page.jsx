"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import {
    Lightbulb, Layers, ThumbsUp, Calendar, ArrowRight, ShieldAlert, Plus
} from "lucide-react";
import ActivityButton from "./DeleteIdeaButton";
import Loading from "@/app/loading";


const API = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function MyIdeasPage() {
    const [ideas, setIdeas] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIdeas = async () => {
            try {
                const { data } = await axios.get(`${API}/api/ideas/my-ideas`, {
                    withCredentials: true,
                });
                if (data.success) {
                    setIdeas(data.ideas);
                } else {
                    setError("Failed to load ideas.");
                }
            } catch (err) {
                setError(err.response?.data?.message || "Failed to connect to server.");
            } finally {
                setLoading(false);
            }
        };

        fetchIdeas();
    }, []);

    const totalIdeas = ideas.length;
    const totalReactions = ideas.reduce((acc, idea) => acc + (idea.likes?.length || 0), 0);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <section className="min-h-screen bg-white dark:bg-[#0A0A0A] flex items-center justify-center text-gray-900 dark:text-white">
                <div className="text-center space-y-3">
                    <div className="inline-flex p-4 rounded-2xl bg-red-500/10 text-red-500">
                        <ShieldAlert size={32} />
                    </div>
                    <p className="text-sm font-semibold text-red-500">{error}</p>
                    <Link
                        href="/my-ideas"
                        className="inline-block text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline uppercase tracking-wider"
                    >
                        Retry
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-white dark:bg-[#0A0A0A] py-12 px-4 sm:px-6 lg:px-8 text-gray-900 dark:text-white transition-colors duration-300 relative overflow-hidden">

            {/* Background Light Glow */}
            <div className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none overflow-hidden">
                <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-emerald-500 rounded-full filter blur-[150px]" />
                <div className="absolute bottom-20 left-1/4 w-[350px] h-[350px] bg-orange-400 rounded-full filter blur-[130px]" />
            </div>

            <div className="max-w-6xl mx-auto space-y-6 relative z-10">

                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-black tracking-tight text-gray-950 dark:text-white">
                            My Innovation <span className="text-emerald-600 dark:text-emerald-500">Pipelines</span>
                        </h1>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
                            Manage and monitor your proprietary blueprints and architectural startup systems.
                        </p>
                    </div>

                    <Link
                        href="/add-idea"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/10 transition-all shrink-0"
                    >
                        <Plus size={14} /> Launch New Idea
                    </Link>
                </div>

                {/* Analytics Widgets */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-5 bg-gray-50/50 dark:bg-[#111111]/40 border border-gray-100 dark:border-gray-900/60 rounded-2xl backdrop-blur-md">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-1">Active Modules</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-black tracking-tight text-gray-950 dark:text-white">{totalIdeas}</span>
                            <span className="text-xs font-semibold text-emerald-500">Total launched</span>
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

                {/* Main Data Architecture Area */}
                {ideas.length > 0 ? (
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
                                    {ideas.map((idea) => (
                                        <tr key={idea._id} className="hover:bg-gray-50/40 dark:hover:bg-[#111111]/30 transition-colors group">

                                            <td className="py-5 px-6 min-w-[280px]">
                                                <div className="space-y-1">
                                                    <span className="text-sm font-bold text-gray-950 dark:text-gray-100 group-hover:text-emerald-500 transition-colors block leading-snug">
                                                        {idea.title}
                                                    </span>
                                                    <span className="text-[11px] text-gray-400 dark:text-gray-500 flex items-center gap-1">
                                                        <Calendar size={11} /> Released: {new Date(idea.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="py-5 px-4 whitespace-nowrap">
                                                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-zinc-900 text-gray-600 dark:text-gray-400">
                                                    <Layers size={11} className="text-emerald-500" /> {idea.category}
                                                </span>
                                            </td>

                                            <td className="py-5 px-4 whitespace-nowrap text-xs font-bold text-gray-900 dark:text-gray-300">
                                                {idea.budget ? `$${idea.budget.toLocaleString()}` : "N/A"}
                                            </td>

                                            <td className="py-5 px-4 whitespace-nowrap">
                                                <span className="text-xs font-bold text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                                    <ThumbsUp size={12} className="text-orange-500" /> {idea.likes?.length || 0}
                                                </span>
                                            </td>

                                            <td className="py-5 px-6 text-right whitespace-nowrap">
                                                <ActivityButton ideaId={idea._id} ideaTitle={idea.title} />
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
                            <h3 className="text-lg font-bold text-gray-950 dark:text-white tracking-tight">No Pipelines Found</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                                You haven't launched any ideas yet. Start by creating your first pipeline.
                            </p>
                        </div>
                        <Link
                            href="/ideas/add"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline uppercase tracking-wider"
                        >
                            Launch Your First Idea <ArrowRight size={12} />
                        </Link>
                    </div>
                )}

            </div>
        </section>
    );
}