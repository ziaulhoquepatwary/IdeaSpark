"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
    Heart, MessageSquare, Wallet, Users,
    Target, Lightbulb, Send, Loader2, AlertCircle,
    Clock,
    Edit2Icon,
    Trash2
} from "lucide-react";
import axios from "axios";
import Loading from "@/app/loading";
import { authClient } from "@/lib/auth-client";

const IdeaDetailsPage = () => {
    const { id } = useParams();
    const router = useRouter();

    const [idea, setIdea] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [liked, setLiked] = useState(false);

    const { data: session } = authClient.useSession();

    const [demoComments, setDemoComments] = useState([
        {
            id: 1,
            userName: "Sarkar Pro",
            text: "This is a fantastic concept! Rural health tech is booming right now. The offline-first feature is a lifesaver.",
            timestamp: "2 hours ago",
            isOwnComment: true,
        },
        {
            id: 2,
            userName: "Ziaul Hoque",
            text: "I think integration with local pharmacies could scale this even faster. Great work on the UI architecture!",
            timestamp: "5 hours ago",
            isOwnComment: false,
        }
    ]);

    // Login check
    useEffect(() => {
        if (session === null) {
            router.push("/login");
        }
    }, [session, router]);

    // 📡 Fetch idea
    useEffect(() => {
        if (!session) return;

        const fetchIdea = async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    `http://localhost:5000/api/ideas/${id}`,
                    { withCredentials: true }
                );
                setIdea(res.data.idea);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load idea.");
            } finally {
                setLoading(false);
            }
        };

        fetchIdea();
    }, [id, session]);

    // Loading State
    if (loading) {
        return <Loading />;
    }

    // Error State
    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#0A0A0A] gap-3 text-red-500">
                <AlertCircle size={36} />
                <p className="text-sm font-semibold">{error}</p>
            </div>
        );
    }

    if (!idea) return null;

    return (
        <section className="min-h-screen bg-white dark:bg-[#0A0A0A] py-12 px-4 sm:px-6 lg:px-8 text-gray-900 dark:text-white transition-colors duration-300">
            <div className="max-w-4xl mx-auto space-y-8">

                <div className="absolute inset-0 opacity-40 dark:opacity-20 pointer-events-none">
                    <div className="absolute top-12 left-15 w-80 h-80 bg-emerald-400 dark:bg-emerald-300 rounded-full filter blur-[100px]" />
                    <div className="absolute bottom-12 right-15 w-72 h-72 bg-orange-400 dark:bg-orange-300 rounded-full filter blur-[100px]" />
                </div>

                {/* Hero Image */}
                <div className="relative h-64 sm:h-96 w-full overflow-hidden rounded-3xl border border-gray-100 dark:border-gray-900 shadow-lg bg-gray-100 dark:bg-zinc-900">
                    <Image
                        src={idea.imageURL}
                        alt={idea.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />
                    <span className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-extrabold px-3 py-1.5 rounded-xl shadow-md uppercase tracking-wider">
                        {idea.category}
                    </span>
                </div>

                {/* Title & Info */}
                <div className="space-y-4">
                    <h1 className="text-3xl sm:text-4xl font-black font-heading tracking-tight text-gray-950 dark:text-white leading-tight">
                        {idea.title}
                    </h1>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                        {idea.shortDescription}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                        {idea.tags?.map((tag, i) => (
                            <span key={i} className="text-xs font-semibold px-3 py-1 bg-gray-100 dark:bg-zinc-900/60 text-gray-600 dark:text-gray-400 rounded-xl border border-gray-200/20">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex items-center gap-4 bg-gray-50 dark:bg-[#111111]/40 border border-gray-100 dark:border-gray-900/50 p-4 rounded-2xl">
                        <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
                            <Wallet size={20} />
                        </div>
                        <div>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">Est. Budget</span>
                            <span className="font-extrabold text-gray-950 dark:text-gray-200">{idea.estimatedBudget || "N/A"}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-gray-50 dark:bg-[#111111]/40 border border-gray-100 dark:border-gray-900/50 p-4 rounded-2xl">
                        <div className="p-3 bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-xl">
                            <Users size={20} />
                        </div>
                        <div className="min-w-0">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">Target Group</span>
                            <span className="font-extrabold text-gray-950 dark:text-gray-200 block truncate">{idea.targetAudience}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-gray-50 dark:bg-[#111111]/40 border border-gray-100 dark:border-gray-900/50 p-4 rounded-2xl">
                        <button
                            onClick={() => setLiked(!liked)}
                            className={`p-3 rounded-xl transition-all duration-300 cursor-pointer ${liked ? 'bg-red-500/20 text-red-500 scale-105' : 'bg-gray-200/50 dark:bg-zinc-800 text-gray-400 hover:text-red-500'}`}
                        >
                            <Heart size={20} fill={liked ? "currentColor" : "none"} />
                        </button>
                        <div>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">Appreciation</span>
                            <span className="font-extrabold text-gray-950 dark:text-gray-200">
                                {liked
                                    ? (idea.likes?.length || 0) + 1
                                    : (idea.likes?.length || 0)
                                } likes
                            </span>
                        </div>
                    </div>
                </div>

                {/* Problem & Solution */}
                <div className="space-y-6 pt-2">
                    <div className="bg-orange-50/30 dark:bg-orange-950/10 border border-orange-200/20 dark:border-orange-900/20 p-6 rounded-3xl space-y-3 relative overflow-hidden">
                        <div className="absolute right-4 top-4 opacity-5 text-orange-500 pointer-events-none">
                            <Target size={120} />
                        </div>
                        <h3 className="text-lg font-bold text-orange-600 dark:text-orange-400 flex items-center gap-2 font-heading">
                            <Target size={18} /> The Identified Problem
                        </h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                            {idea.problemStatement}
                        </p>
                    </div>

                    <div className="bg-emerald-50/30 dark:bg-emerald-950/10 border border-emerald-200/20 dark:border-emerald-900/20 p-6 rounded-3xl space-y-3 relative overflow-hidden">
                        <div className="absolute right-4 top-4 opacity-5 text-emerald-500 pointer-events-none">
                            <Lightbulb size={120} />
                        </div>
                        <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2 font-heading">
                            <Lightbulb size={18} /> Proposed Architecture Solution
                        </h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                            {idea.proposedSolution}
                        </p>
                    </div>
                </div>

                {/* 6. Requirement Feature: Interaction System (Comment Section) */}
                <div className="pt-6 border-t border-gray-100 dark:border-gray-900/60 space-y-6">
                    <h3 className="text-xl font-bold font-heading text-gray-950 dark:text-white flex items-center gap-2">
                        <MessageSquare size={20} className="text-emerald-500" /> Discussion Framework ({demoComments.length})
                    </h3>

                    {/* A. Add Comment Input Area */}
                    <form onSubmit={(e) => e.preventDefault()} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0 uppercase">
                            ZH
                        </div>
                        <div className="w-full relative">
                            <textarea
                                rows="2"
                                placeholder="Add a constructive critique or feedback on this framework..."
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-[#111111]/30 border border-gray-200 dark:border-gray-800 rounded-2xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all text-gray-900 dark:text-white placeholder-gray-400 resize-none pr-12"
                            />
                            <button
                                type="button"
                                className="absolute right-3 bottom-3 p-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 transition-colors shadow-sm cursor-pointer"
                                aria-label="Submit Comment"
                            >
                                <Send size={14} />
                            </button>
                        </div>
                    </form>

                    {/* B. Comments Feed Loop */}
                    <div className="space-y-4 pt-2">
                        {demoComments.map((comment) => (
                            <div
                                key={comment.id}
                                className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/50 dark:bg-[#111111]/20 border border-gray-100 dark:border-gray-900/40 relative group"
                            >
                                {/* User Initial Badge */}
                                <div className="w-9 h-9 rounded-xl bg-zinc-200 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 flex items-center justify-center font-bold text-xs uppercase shrink-0">
                                    {comment.userName.slice(0, 2)}
                                </div>

                                {/* Comment Content Box */}
                                <div className="space-y-1.5 w-full min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-gray-900 dark:text-gray-200">{comment.userName}</span>
                                            <span className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
                                                <Clock size={10} /> {comment.timestamp}
                                            </span>
                                        </div>

                                        {/* CRITICAL REQUIREMENT CHECK: Edit & Delete actions only for own comments */}
                                        {comment.isOwnComment && (
                                            <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                {/* Edit Button Option */}
                                                <button
                                                    type="button"
                                                    className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-500 hover:bg-emerald-500/10 transition-colors cursor-pointer"
                                                    title="Edit Comment"
                                                >
                                                    <Edit2Icon size={12} />
                                                </button>
                                                {/* Delete Button Option */}
                                                <button
                                                    type="button"
                                                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                                                    title="Delete Comment"
                                                >
                                                    <Trash2 size={12} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                                        {comment.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </section>
    );
};

export default IdeaDetailsPage;