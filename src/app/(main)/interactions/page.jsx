"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
    MessageSquare, Heart, Eye, Clock,
    Activity, Sparkles, Loader2, AlertCircle
} from "lucide-react";
import axios from "axios";
import { authClient } from "@/lib/auth-client";

const API = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function MyInteractions() {
    const { data: session, isPending } = authClient.useSession();

    const [interactions, setInteractions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isPending || !session) return;

        const fetchInteractions = async () => {
            try {
                setLoading(true);

                const [commentsRes, likedRes] = await Promise.all([
                    axios.get(`${API}/api/comments/my`, { withCredentials: true }),
                    axios.get(`${API}/api/ideas/liked`, { withCredentials: true }),
                ]);

                const commentItems = commentsRes.data.comments.map((c) => ({
                    id: c._id,
                    ideaId: c.ideaId,
                    type: "comment",
                    content: c.content,
                    ideaTitle: c.ideaTitle || "Untitled Idea",
                    createdAt: c.createdAt,
                }));

                const likeItems = likedRes.data.ideas.map((idea) => ({
                    id: idea._id,
                    ideaId: idea._id,
                    type: "like",
                    content: null,
                    ideaTitle: idea.title,
                    category: idea.category,
                    createdAt: idea.updatedAt,
                }));

                const merged = [...commentItems, ...likeItems].sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );

                setInteractions(merged);
            } catch (err) {
                setError("Failed to load your interactions.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchInteractions();
    }, [session, isPending]);

    // Timestamp format
    const formatTime = (dateStr) => {
        const diff = Date.now() - new Date(dateStr).getTime();
        const mins = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (mins < 60) return `${mins}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    };

    const likeCount = interactions.filter((i) => i.type === "like").length;
    const commentCount = interactions.filter((i) => i.type === "comment").length;

    return (
        <section className="min-h-screen bg-white dark:bg-[#0A0A0A] py-12 px-4 sm:px-6 lg:px-8 text-gray-900 dark:text-white transition-colors duration-300 relative overflow-hidden">

            {/* Background glow */}
            <div className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-emerald-500 rounded-full filter blur-[140px]" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-400 rounded-full filter blur-[120px]" />
            </div>

            <div className="max-w-5xl mx-auto space-y-10 relative z-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] border border-emerald-500/20">
                            <Activity size={12} /> User Telemetry
                        </div>
                        <h1 className="text-4xl font-black tracking-tight text-gray-950 dark:text-white leading-none">
                            My <span className="text-emerald-600 dark:text-emerald-500">Interactions</span>
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md font-medium">
                            Review your recent activity logs, contributions, and endorsements within the innovation framework.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 bg-gray-50/50 dark:bg-[#111111]/30 border border-gray-100 dark:border-gray-900/60 p-4 rounded-2xl backdrop-blur-md shadow-sm">
                        <div className="text-center px-4 border-r border-gray-200 dark:border-gray-800">
                            <span className="block text-xl font-black text-emerald-600 dark:text-emerald-500 leading-none">
                                {likeCount}
                            </span>
                            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Endorsed</span>
                        </div>
                        <div className="text-center px-4">
                            <span className="block text-xl font-black text-orange-500 leading-none">
                                {commentCount}
                            </span>
                            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Critiques</span>
                        </div>
                    </div>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="flex justify-center py-20">
                        <Loader2 size={32} className="animate-spin text-emerald-500" />
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="flex flex-col items-center gap-3 py-20 text-red-500">
                        <AlertCircle size={32} />
                        <p className="text-sm font-semibold">{error}</p>
                    </div>
                )}

                {/* Interaction List */}
                {!loading && !error && (
                    <div className="space-y-4">
                        {interactions.length > 0 ? (
                            interactions.map((item) => (
                                <div
                                    key={`${item.type}-${item.id}`}
                                    className="group relative bg-white dark:bg-[#111111]/30 border border-gray-100 dark:border-gray-900/60 p-5 sm:p-6 rounded-3xl transition-all duration-300 hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-600/[0.02] flex flex-col sm:flex-row sm:items-center gap-5 backdrop-blur-xl"
                                >
                                    {/* Icon */}
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border transition-transform group-hover:scale-105
                                        ${item.type === "like"
                                            ? "bg-rose-50 dark:bg-rose-500/10 text-rose-500 border-rose-100 dark:border-rose-900/30"
                                            : "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30"
                                        }`}
                                    >
                                        {item.type === "like"
                                            ? <Heart size={24} fill="currentColor" />
                                            : <MessageSquare size={24} />
                                        }
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 space-y-2 min-w-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md
                                                ${item.type === "like"
                                                    ? "bg-rose-100 dark:bg-rose-500/20 text-rose-600"
                                                    : "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400"
                                                }`}
                                            >
                                                {item.type === "like" ? "Endorsed Pipeline" : "Feedback Provided"}
                                            </span>
                                            <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1 uppercase tracking-wider">
                                                <Clock size={12} /> {formatTime(item.createdAt)}
                                            </span>
                                        </div>

                                        <h3 className="text-base font-bold text-gray-950 dark:text-white truncate pr-10">
                                            {item.ideaTitle}
                                        </h3>

                                        {/* Comment হলে content দেখাও */}
                                        {item.content && (
                                            <p className="text-sm text-gray-500 dark:text-gray-400 italic line-clamp-1 border-l-2 border-emerald-500/30 pl-3 py-0.5">
                                                &quot;{item.content}&quot;
                                            </p>
                                        )}

                                        {item.category && (
                                            <span className="inline-block text-[10px] font-bold text-gray-400 dark:text-gray-500">
                                                Node Classification:{" "}
                                                <span className="text-emerald-600 dark:text-emerald-500">
                                                    {item.category}
                                                </span>
                                            </span>
                                        )}
                                    </div>

                                    {/* Eye button — idea details এ নিয়ে যাবে */}
                                    <Link
                                        href={`/ideas/${item.ideaId}`}
                                        className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gray-50 dark:bg-[#0A0A0A] border border-gray-200 dark:border-gray-800 text-gray-500 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-500 transition-all shadow-sm shrink-0"
                                        title="View Idea"
                                    >
                                        <Eye size={20} />
                                    </Link>

                                    {/* Decorative */}
                                    <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none">
                                        <Sparkles size={40} className="text-emerald-500" />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-20 bg-gray-50/40 dark:bg-[#111111]/20 rounded-[40px] border border-dashed border-gray-200 dark:border-gray-800 space-y-4">
                                <div className="inline-flex p-5 rounded-3xl bg-gray-100 dark:bg-zinc-900 text-gray-400">
                                    <Activity size={40} />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-xl font-bold text-gray-950 dark:text-white">
                                        Static Node Detected
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                                        You haven&apos;t generated any telemetry signals or feedback loops yet.
                                    </p>
                                </div>
                                <Link
                                    href="/ideas"
                                    className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 hover:underline uppercase tracking-widest"
                                >
                                    Discover Blueprints
                                </Link>
                            </div>
                        )}
                    </div>
                )}

            </div>
        </section>
    );
}