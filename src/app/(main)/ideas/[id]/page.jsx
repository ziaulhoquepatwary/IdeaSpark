"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Heart, MessageSquare, Wallet, Users, Target, Lightbulb, Loader2, AlertCircle, } from "lucide-react";
import axios from "axios";
import Loading from "@/app/loading";
import { authClient } from "@/lib/auth-client";
import CommentsSection from "@/components/CommentsSection";

const API = process.env.NEXT_PUBLIC_BACKEND_URL;

const IdeaDetailsPage = () => {
    const { id } = useParams();
    const router = useRouter();

    const [idea, setIdea] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [likeLoading, setLikeLoading] = useState(false);

    const { data: session, isPending } = authClient.useSession();

    // Redirect if not login
    useEffect(() => {
        if (isPending) return;
        if (!session) router.push("/login");
    }, [session, isPending, router]);

    // Idea fetch
    useEffect(() => {
        if (!session) return;

        const fetchIdea = async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    `${API}/api/ideas/${id}`,
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

    // idea load after like state 
    useEffect(() => {
        if (!idea) return;
        setLikeCount(idea.likes?.length || 0);
        setLiked(idea.likes?.includes(session?.user?.id) || false);
    }, [idea, session]);

    // Like toggle
    const handleLike = async () => {
        if (!session) return;
        setLikeLoading(true);
        try {
            const res = await axios.put(
                `${API}/api/ideas/${id}/like`,
                {},
                { withCredentials: true }
            );
            setLikeCount(res.data.likes);
            setLiked((prev) => !prev);
        } catch (error) {
            console.error("Like failed", error);
        } finally {
            setLikeLoading(false);
        }
    };

    if (loading) return <Loading />;

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

                {/* Background glow */}
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

                {/* Title & Tags */}
                <div className="space-y-4">
                    <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-950 dark:text-white leading-tight">
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

                    {/* Budget */}
                    <div className="flex items-center gap-4 bg-gray-50 dark:bg-[#111111]/40 border border-gray-100 dark:border-gray-900/50 p-4 rounded-2xl">
                        <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
                            <Wallet size={20} />
                        </div>
                        <div>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">Est. Budget</span>
                            <span className="font-extrabold text-gray-950 dark:text-gray-200">
                                {idea.estimatedBudget || "N/A"}
                            </span>
                        </div>
                    </div>

                    {/* Target Audience */}
                    <div className="flex items-center gap-4 bg-gray-50 dark:bg-[#111111]/40 border border-gray-100 dark:border-gray-900/50 p-4 rounded-2xl">
                        <div className="p-3 bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-xl">
                            <Users size={20} />
                        </div>
                        <div className="min-w-0">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">Target Group</span>
                            <span className="font-extrabold text-gray-950 dark:text-gray-200 block truncate">
                                {idea.targetAudience}
                            </span>
                        </div>
                    </div>

                    {/* Like */}
                    <div className="flex items-center gap-4 bg-gray-50 dark:bg-[#111111]/40 border border-gray-100 dark:border-gray-900/50 p-4 rounded-2xl">
                        <button
                            onClick={handleLike}
                            disabled={likeLoading || !session}
                            className={`p-3 rounded-xl transition-all duration-300 cursor-pointer ${liked
                                ? "bg-red-500/20 text-red-500 scale-105"
                                : "bg-gray-200/50 dark:bg-zinc-800 text-gray-400 hover:text-red-500"
                                }`}
                        >
                            {likeLoading
                                ? <Loader2 size={20} className="animate-spin" />
                                : <Heart size={20} fill={liked ? "currentColor" : "none"} />
                            }
                        </button>
                        <div>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">
                                Appreciation
                            </span>
                            <span className="font-extrabold text-gray-950 dark:text-gray-200">
                                {likeCount} likes
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
                        <h3 className="text-lg font-bold text-orange-600 dark:text-orange-400 flex items-center gap-2">
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
                        <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                            <Lightbulb size={18} /> Proposed Architecture Solution
                        </h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                            {idea.proposedSolution}
                        </p>
                    </div>
                </div>

                {/* Comment Section */}
                <div className="pt-6 border-t border-gray-100 dark:border-gray-900/60">
                    <CommentsSection ideaId={id} />
                </div>

            </div>
        </section>
    );
};

export default IdeaDetailsPage;